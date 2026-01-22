<template>
  <div
    class="checkout-form bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10"
  >
    <h3 class="text-xl md:text-2xl font-bold text-white mb-6">Complete Your Purchase</h3>

    <form @submit.prevent="handleSubmit" class="space-y-5">
      <!-- Name Field -->
      <div>
        <label class="block text-sm font-medium text-purple-200 mb-2"> Full Name * </label>
        <input
          v-model="form.name"
          type="text"
          placeholder="Enter your full name"
          :class="[
            'w-full px-4 py-3 rounded-xl bg-white/10 border text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all',
            errors.name ? 'border-red-500' : 'border-white/20'
          ]"
        />
        <p v-if="errors.name" class="mt-1 text-sm text-red-400">{{ errors.name }}</p>
      </div>

      <!-- Email Field -->
      <div>
        <label class="block text-sm font-medium text-purple-200 mb-2"> Email Address * </label>
        <input
          v-model="form.email"
          type="email"
          placeholder="your@email.com"
          :class="[
            'w-full px-4 py-3 rounded-xl bg-white/10 border text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all',
            errors.email ? 'border-red-500' : 'border-white/20'
          ]"
        />
        <p v-if="errors.email" class="mt-1 text-sm text-red-400">{{ errors.email }}</p>
      </div>

      <!-- Country Field -->
      <div>
        <label class="block text-sm font-medium text-purple-200 mb-2"> Country * </label>
        <select
          v-model="form.country"
          :class="[
            'w-full px-4 py-3 rounded-xl bg-white/10 border text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all',
            errors.country ? 'border-red-500' : 'border-white/20',
            !form.country ? 'text-purple-300/50' : ''
          ]"
        >
          <option value="" disabled class="bg-slate-800">Select your country</option>
          <option
            v-for="country in countries"
            :key="country.code"
            :value="country.code"
            class="bg-slate-800"
          >
            {{ country.name }}
          </option>
        </select>
        <p v-if="errors.country" class="mt-1 text-sm text-red-400">{{ errors.country }}</p>
      </div>

      <!-- User Type Field -->
      <div>
        <label class="block text-sm font-medium text-purple-200 mb-2"> I am a... * </label>
        <div class="grid grid-cols-2 gap-3">
          <button
            type="button"
            @click="form.userType = 'fan'"
            :class="[
              'py-3 px-4 rounded-xl border-2 font-medium transition-all',
              form.userType === 'fan'
                ? 'bg-purple-600 border-purple-600 text-white'
                : 'bg-white/5 border-white/20 text-purple-200 hover:border-purple-400/50'
            ]"
          >
            <span class="text-lg mr-2">👤</span> Fan
          </button>
          <button
            type="button"
            @click="form.userType = 'creator'"
            :class="[
              'py-3 px-4 rounded-xl border-2 font-medium transition-all',
              form.userType === 'creator'
                ? 'bg-purple-600 border-purple-600 text-white'
                : 'bg-white/5 border-white/20 text-purple-200 hover:border-purple-400/50'
            ]"
          >
            <span class="text-lg mr-2">⭐</span> Creator
          </button>
        </div>
        <p v-if="errors.userType" class="mt-1 text-sm text-red-400">{{ errors.userType }}</p>
      </div>

      <!-- Consent Checkbox -->
      <div class="pt-2">
        <label class="flex items-start gap-3 cursor-pointer group">
          <div class="relative mt-0.5">
            <input v-model="form.consent" type="checkbox" class="sr-only peer" />
            <div
              :class="[
                'w-5 h-5 rounded border-2 flex items-center justify-center transition-all',
                form.consent
                  ? 'bg-purple-600 border-purple-600'
                  : 'bg-white/10 border-white/30 group-hover:border-purple-400'
              ]"
            >
              <svg
                v-if="form.consent"
                class="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <span class="text-sm text-purple-200">
            I agree to the
            <a
              href="/terms-of-service"
              target="_blank"
              class="text-purple-400 hover:text-purple-300 underline"
              >Terms of Service</a
            >
            and
            <a
              href="/privacy-policy"
              target="_blank"
              class="text-purple-400 hover:text-purple-300 underline"
              >Privacy Policy</a
            >. I understand that credits are
            <span class="font-semibold text-purple-100">locked until launch</span>.
          </span>
        </label>
        <p v-if="errors.consent" class="mt-1 text-sm text-red-400">{{ errors.consent }}</p>
      </div>

      <!-- Submit Button -->
      <div class="pt-4">
        <button
          type="submit"
          :disabled="!isValid || isLoading"
          :class="[
            'w-full py-4 px-6 rounded-xl font-bold text-lg transition-all',
            isValid && !isLoading
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-500/30'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          ]"
        >
          <span v-if="isLoading" class="flex items-center justify-center gap-2">
            <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </span>
          <span v-else class="flex items-center justify-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            Proceed to Payment
          </span>
        </button>
      </div>

      <!-- Security Notice -->
      <p class="text-center text-xs text-purple-400 pt-2">
        🔒 Secured by Stripe. Your payment details are never stored on our servers.
      </p>
    </form>
  </div>
</template>

<script setup>
import { computed, watch, reactive } from 'vue'
import { useTopupStore } from '@/stores/topupStore'

const emit = defineEmits(['submit'])

const topupStore = useTopupStore()

// Local form state
const form = reactive({
  name: topupStore.userForm.name,
  email: topupStore.userForm.email,
  country: topupStore.userForm.country,
  userType: topupStore.userForm.userType,
  consent: topupStore.userForm.consent
})

// Countries list
const countries = [
  { code: 'AT', name: 'Austria' },
  { code: 'BE', name: 'Belgium' },
  { code: 'BG', name: 'Bulgaria' },
  { code: 'HR', name: 'Croatia' },
  { code: 'CY', name: 'Cyprus' },
  { code: 'CZ', name: 'Czech Republic' },
  { code: 'DK', name: 'Denmark' },
  { code: 'EE', name: 'Estonia' },
  { code: 'FI', name: 'Finland' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'GR', name: 'Greece' },
  { code: 'HU', name: 'Hungary' },
  { code: 'IE', name: 'Ireland' },
  { code: 'IT', name: 'Italy' },
  { code: 'LV', name: 'Latvia' },
  { code: 'LT', name: 'Lithuania' },
  { code: 'LU', name: 'Luxembourg' },
  { code: 'MT', name: 'Malta' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'PL', name: 'Poland' },
  { code: 'PT', name: 'Portugal' },
  { code: 'RO', name: 'Romania' },
  { code: 'SK', name: 'Slovakia' },
  { code: 'SI', name: 'Slovenia' },
  { code: 'ES', name: 'Spain' },
  { code: 'SE', name: 'Sweden' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'NO', name: 'Norway' },
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'NZ', name: 'New Zealand' },
  { code: 'OTHER', name: 'Other' }
]

// Watch form changes and update store
watch(
  form,
  (newForm) => {
    Object.keys(newForm).forEach((key) => {
      topupStore.updateFormField(key, newForm[key])
    })
  },
  { deep: true }
)

// Computed validation
const errors = computed(() => {
  const errs = {}
  if (!form.name.trim()) errs.name = 'Name is required'
  if (!form.email.trim()) errs.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Please enter a valid email'
  if (!form.country) errs.country = 'Please select your country'
  if (!form.userType) errs.userType = 'Please select user type'
  if (!form.consent) errs.consent = 'You must agree to continue'
  return errs
})

const isValid = computed(() => {
  return Object.keys(errors.value).length === 0 && topupStore.selectedPackageId
})

const isLoading = computed(() => topupStore.isLoading)

// Handle form submission
const handleSubmit = () => {
  if (isValid.value) {
    emit('submit')
  }
}
</script>

<style scoped>
/* Fix for select option styling */
select option {
  background-color: #1e293b;
  color: white;
}
</style>
