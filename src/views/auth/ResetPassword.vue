<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4"
  >
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-md p-8 space-y-6">
      <!-- Header -->
      <div class="text-center">
        <h1 class="text-2xl font-bold text-gray-900">Reset Password</h1>
        <p class="text-sm text-gray-600 mt-2">Enter your new password below</p>
      </div>

      <!-- Success Message -->
      <div
        v-if="successMessage"
        class="text-center text-sm text-green-600 font-semibold bg-green-50 border border-green-500 rounded-lg py-3 px-4"
      >
        {{ successMessage }}
      </div>

      <!-- Error Message -->
      <div
        v-if="errorMessage"
        class="text-center text-sm text-[#e82264] font-semibold bg-[#fbe9f2] border border-[#e82264] rounded-lg py-3 px-4"
      >
        {{ errorMessage }}
      </div>

      <!-- Form -->
      <form @submit.prevent="handleResetPassword" class="space-y-5">
        <!-- Email Display (Read-only) -->
        <div class="relative">
          <input
            type="email"
            id="email"
            :value="email"
            disabled
            class="w-full px-4 pt-6 pb-2 border-2 border-gray-300 bg-gray-50 rounded-lg outline-none cursor-not-allowed"
          />
          <label
            for="email"
            class="absolute left-4 top-2 text-gray-500 text-xs pointer-events-none"
          >
            E-mail
          </label>
        </div>

        <!-- Password Input -->
        <div class="relative">
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="New Password"
            minlength="8"
            class="w-full px-4 pt-6 pb-2 border-2 border-primary-blue rounded-lg placeholder-transparent outline-none transition duration-200 peer focus:ring-2 focus:ring-[#e82264] focus:border-[#e82264]"
            required
          />
          <label
            for="password"
            class="absolute left-4 top-2 text-primary-blue text-xs transition-all duration-200 pointer-events-none transform origin-left peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary-blue"
          >
            New Password
          </label>
        </div>

        <!-- Confirm Password Input -->
        <div class="relative">
          <input
            type="password"
            id="password_confirmation"
            v-model="password_confirmation"
            placeholder="Confirm Password"
            minlength="8"
            class="w-full px-4 pt-6 pb-2 border-2 border-primary-blue rounded-lg placeholder-transparent outline-none transition duration-200 peer focus:ring-2 focus:ring-[#e82264] focus:border-[#e82264]"
            required
          />
          <label
            for="password_confirmation"
            class="absolute left-4 top-2 text-primary-blue text-xs transition-all duration-200 pointer-events-none transform origin-left peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary-blue"
          >
            Confirm Password
          </label>
        </div>

        <!-- Password Match Validation -->
        <div
          v-if="password && password_confirmation && password !== password_confirmation"
          class="text-sm text-[#e82264] font-medium"
        >
          Passwords do not match
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="!canSubmit || isLoading"
          class="w-full py-3 px-4 bg-[#e82264] text-white font-semibold rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#d01c54] focus:ring-2 focus:ring-[#e82264] focus:ring-offset-2"
        >
          <span v-if="isLoading" class="flex items-center justify-center">
            <span class="loader mr-2"></span>
            Resetting...
          </span>
          <span v-else>Reset Password</span>
        </button>

        <!-- Back to Login -->
        <div class="text-center">
          <router-link
            to="/login"
            class="text-sm text-primary-blue hover:text-[#e82264] font-medium transition duration-150"
          >
            Back to Login
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { post } from '@/api-services/fetch'

const route = useRoute()
const router = useRouter()

const email = ref('')
const token = ref('')
const password = ref('')
const password_confirmation = ref('')
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const canSubmit = computed(() => {
  return (
    email.value &&
    token.value &&
    password.value &&
    password_confirmation.value &&
    password.value === password_confirmation.value &&
    password.value.length >= 8
  )
})

onMounted(() => {
  // Extract email and token from URL query parameters
  email.value = route.query.email || ''
  token.value = route.query.token || ''

  // Validate required parameters
  if (!email.value || !token.value) {
    errorMessage.value = 'Invalid or missing reset link parameters'
  }
})

const handleResetPassword = async () => {
  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const response = await post({
      endpoint: '/forgot-password/reset',
      body: {
        email: email.value,
        token: token.value,
        password: password.value,
        password_confirmation: password_confirmation.value
      },
      auth: false
    })

    if (response?.data?.success) {
      successMessage.value = 'Password reset successful! Redirecting to login...'

      // Clear form
      password.value = ''
      password_confirmation.value = ''

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } else {
      errorMessage.value = response?.data?.message || 'Failed to reset password'
    }
  } catch (error) {
    errorMessage.value = error?.response?.data?.message || 'An error occurred. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.loader {
  border: 2px solid #ffffff;
  border-top: 2px solid transparent;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 0.8s linear infinite;
  display: inline-block;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
