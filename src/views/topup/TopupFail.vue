<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 py-12"
  >
    <!-- Background Effects -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/4 -right-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl"></div>
      <div
        class="absolute bottom-1/4 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
      ></div>
    </div>

    <div class="relative max-w-lg w-full">
      <!-- Failure Card -->
      <div class="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 text-center">
        <!-- Failure Icon -->
        <div class="mb-6">
          <div
            class="w-24 h-24 mx-auto bg-red-500/20 rounded-full flex items-center justify-center"
          >
            <div
              class="w-16 h-16 bg-red-500/30 rounded-full flex items-center justify-center border-2 border-red-500"
            >
              <svg
                class="w-10 h-10 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
        </div>

        <!-- Title -->
        <h1 class="text-3xl md:text-4xl font-extrabold text-white mb-2">
          Payment {{ failureReason }}
        </h1>
        <p class="text-purple-200 mb-8">
          {{ failureMessage }}
        </p>

        <!-- Info Box -->
        <div class="bg-white/5 rounded-xl p-4 mb-8 text-left">
          <h3 class="text-sm font-medium text-purple-300 mb-3">What happened?</h3>
          <ul class="space-y-2 text-sm text-purple-200">
            <li class="flex items-start gap-2">
              <svg
                class="w-4 h-4 mt-0.5 text-purple-400 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>Your card was not charged</span>
            </li>
            <li class="flex items-start gap-2">
              <svg
                class="w-4 h-4 mt-0.5 text-purple-400 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>No credits have been added to your wallet</span>
            </li>
            <li class="flex items-start gap-2">
              <svg
                class="w-4 h-4 mt-0.5 text-purple-400 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>You can try again anytime</span>
            </li>
          </ul>
        </div>

        <!-- Common Issues -->
        <div class="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-8 text-left">
          <h3 class="text-sm font-medium text-yellow-300 mb-2 flex items-center gap-2">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
            Common Issues
          </h3>
          <ul class="space-y-1 text-sm text-yellow-200/80">
            <li>• Insufficient funds in your account</li>
            <li>• Card declined by your bank</li>
            <li>• Incorrect card details entered</li>
            <li>• 3D Secure verification failed</li>
          </ul>
        </div>

        <!-- Actions -->
        <div class="space-y-3">
          <router-link
            to="/topup"
            class="block w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-purple-500/30"
          >
            Try Again
          </router-link>
          <a
            href="mailto:support@funwallet.com?subject=Payment%20Issue"
            class="block w-full py-4 px-6 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-all border border-white/20"
          >
            Contact Support
          </a>
          <router-link
            to="/"
            class="block w-full py-3 px-6 text-purple-300 hover:text-white font-medium transition-all"
          >
            Return to Home
          </router-link>
        </div>
      </div>

      <!-- Help Section -->
      <div class="mt-6 text-center">
        <p class="text-purple-400 text-sm">
          Need help? Email us at
          <a href="mailto:support@funwallet.com" class="text-purple-300 hover:text-white underline">
            support@funwallet.com
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTracking } from '@/composables/useTracking'

const route = useRoute()
const { trackCustomEvent } = useTracking()

// Determine failure reason from URL params
const failureReason = computed(() => {
  const reason = route.query.reason
  switch (reason) {
    case 'canceled':
      return 'Canceled'
    case 'declined':
      return 'Declined'
    case 'expired':
      return 'Expired'
    default:
      return 'Failed'
  }
})

// Failure message based on reason
const failureMessage = computed(() => {
  const reason = route.query.reason
  switch (reason) {
    case 'canceled':
      return 'You canceled the payment process. No worries - your selection is still saved!'
    case 'declined':
      return 'Your payment was declined. Please try a different payment method.'
    case 'expired':
      return 'The checkout session expired. Please try again.'
    default:
      return "Something went wrong with your payment. Don't worry - you haven't been charged."
  }
})

// Track failure event
trackCustomEvent('PaymentFailed', {
  reason: route.query.reason || 'unknown'
})
</script>
