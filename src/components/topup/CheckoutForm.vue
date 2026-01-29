<template>
  <div
    class="checkout-form bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10"
  >
    <h3 class="text-xl md:text-2xl font-bold text-white mb-6">Complete Your Purchase</h3>

    <form @submit.prevent="handleSubmit" class="space-y-5">
      <!-- Email Field (Optional - for prefill) -->
      <div>
        <label class="block text-sm font-medium text-purple-200 mb-2">
          Email Address <span class="text-purple-400">(optional)</span>
        </label>
        <input
          v-model="form.email"
          type="email"
          placeholder="your@email.com"
          class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
        />
        <p class="mt-1 text-xs text-purple-400">We'll prefill this on checkout for convenience</p>
      </div>

      <!-- Referral Code Field -->
      <div>
        <label class="block text-sm font-medium text-purple-200 mb-2">
          Referral Code <span class="text-purple-400">(optional)</span>
        </label>
        <div class="relative">
          <input
            v-model="referralCode"
            type="text"
            placeholder="Enter referral code"
            class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all uppercase"
          />
          <div v-if="referralCode" class="absolute right-3 top-1/2 -translate-y-1/2">
            <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
        </div>
        <p class="mt-1 text-xs text-purple-400">Have a friend's code? Enter it here!</p>
      </div>

      <!-- Order Summary -->
      <div class="bg-white/5 rounded-xl p-4 border border-white/10">
        <h4 class="text-sm font-medium text-purple-300 uppercase tracking-wider mb-3">Order Summary</h4>
        <div class="space-y-2">
          <div class="flex justify-between text-sm">
            <span class="text-purple-200">Package</span>
            <span class="text-white font-medium">€{{ topupStore.payNowAmount }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-purple-200">Real Credits</span>
            <span class="text-white font-medium">€{{ topupStore.realCredits }}</span>
          </div>
          <div class="flex justify-between text-sm text-green-400">
            <span>FAN Bonus Credits</span>
            <span class="font-medium">+€{{ topupStore.bonusAmount }}</span>
          </div>
          <div class="border-t border-white/20 pt-2 mt-2">
            <div class="flex justify-between">
              <span class="text-purple-100 font-medium">Total Credits</span>
              <span class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                €{{ topupStore.totalCredits }}
              </span>
            </div>
          </div>
        </div>
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
            >.
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
            Redirecting to Stripe...
          </span>
          <span v-else class="flex items-center justify-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
            Buy Credits - €{{ topupStore.payNowAmount }}
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
import { computed, watch, reactive, ref } from 'vue'
import { useTopupStore } from '@/stores/topupStore'

const emit = defineEmits(['submit'])

const topupStore = useTopupStore()

// Local form state
const form = reactive({
  email: topupStore.userForm.email || '',
  consent: topupStore.userForm.consent || false
})

// Referral code
const referralCode = ref(topupStore.referralCode || '')

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

// Watch referral code and update store
watch(referralCode, (newCode) => {
  topupStore.setReferralCode(newCode.toUpperCase())
})

// Computed validation
const errors = computed(() => {
  const errs = {}
  if (!form.consent) errs.consent = 'You must agree to continue'
  return errs
})

const isValid = computed(() => {
  return form.consent && topupStore.selectedPackageId
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
