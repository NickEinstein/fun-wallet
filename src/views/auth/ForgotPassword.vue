<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black/50" @click="$emit('close')"></div>
    <!-- Modal -->
    <div class="relative p-0 rounded-xl shadow-2xl w-11/12 max-w-sm z-10 animate-fadeIn">
      <div class="p-6 bg-white space-y-4">
        <h2 class="text-base font-medium text-gray-900">RESTORE ACCESS</h2>
        <p class="text-gray-700 text-sm">
          If you have an account, you will receive a password reset link to this e-mail.
        </p>

        <!-- Success Message -->
        <div
          v-if="successMessage"
          class="text-center text-sm text-green-600 font-semibold bg-green-50 border border-green-500 rounded-lg py-2 px-4"
        >
          {{ successMessage }}
        </div>

        <!-- Error Message -->
        <div
          v-if="errorMessage"
          class="text-center text-sm text-[#e82264] font-semibold bg-[#fbe9f2] border border-[#e82264] rounded-lg py-2 px-4"
        >
          {{ errorMessage }}
        </div>

        <form @submit.prevent="handleForgotPassword">
          <div class="relative mb-2">
            <input
              type="email"
              id="restoreEmail"
              v-model="email"
              maxlength="100"
              placeholder="E-mail"
              @input="updateCharCount"
              class="w-full px-4 pt-6 pb-2 border-2 border-primary-blue rounded-lg placeholder-transparent outline-none transition duration-200 peer focus:ring-2 focus:ring-[#e82264] focus:border-[#e82264]"
              required
            />
            <!-- Floating Label -->
            <label
              for="restoreEmail"
              class="absolute left-4 top-2 text-primary-blue text-xs transition-all duration-200 pointer-events-none transform origin-left peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary-blue"
            >
              E-mail
            </label>
          </div>
          <!-- Character Count -->
          <div class="text-right text-xs text-gray-400">{{ charCount }}/100</div>
          <!-- Action Buttons -->
          <div class="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              @click="$emit('close')"
              class="text-primary-blue font-semibold px-4 py-2 rounded hover:bg-gray-100 transition duration-150 uppercase"
            >
              CANCEL
            </button>
            <button
              type="submit"
              :disabled="!email || isLoading"
              class="font-semibold px-4 py-2 rounded transition duration-150 uppercase disabled:opacity-50 disabled:cursor-not-allowed"
              :class="email && !isLoading ? 'text-primary-blue hover:bg-gray-100' : 'text-gray-500'"
            >
              <span v-if="isLoading" class="loader mr-2 align-middle"></span>
              <span v-else>SEND</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { post } from '@/api-services/fetch'
import { ref, computed } from 'vue'

const emit = defineEmits(['close'])

const email = ref('')
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const charCount = computed(() => email.value.length)

const updateCharCount = () => {
  // Character count is automatically updated via computed property
}

const handleForgotPassword = async () => {
  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const response = await post({
      endpoint: '/forgot-password/request',
      body: { email: email.value },
      auth: false
    })

    if (response?.data?.success) {
      successMessage.value = 'Password reset link sent to your email!'
      email.value = ''

      // Auto-close modal after 2 seconds
      setTimeout(() => {
        emit('close')
      }, 2000)
    } else {
      errorMessage.value = response?.data?.message || 'Failed to send reset link'
    }
  } catch (error) {
    errorMessage.value = 'An error occurred. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.loader {
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3b82f6;
  border-radius: 50%;
  width: 14px;
  height: 14px;
  animation: spin 0.8s linear infinite;
  display: inline-block;
  vertical-align: middle;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.2s ease-out;
}
</style>
