<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 py-12"
  >
    <!-- Background Effects -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/4 -right-40 w-80 h-80 bg-green-500/20 rounded-full blur-3xl"></div>
      <div
        class="absolute bottom-1/4 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
      ></div>
    </div>

    <div class="relative max-w-lg w-full">
      <!-- Success Card -->
      <div class="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 text-center">
        <!-- Success Animation -->
        <div class="mb-6">
          <div
            class="w-24 h-24 mx-auto bg-green-500/20 rounded-full flex items-center justify-center animate-bounce-slow"
          >
            <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <svg
                class="w-10 h-10 text-white"
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
        </div>

        <!-- Title -->
        <h1 class="text-3xl md:text-4xl font-extrabold text-white mb-2">Payment Successful! 🎉</h1>
        <p class="text-purple-200 mb-8">
          Thank you for your purchase. Your FUN Wallet has been credited!
        </p>

        <!-- Transaction Summary -->
        <div class="bg-white/5 rounded-2xl p-6 mb-8 text-left">
          <h3 class="text-sm font-medium text-purple-300 uppercase tracking-wider mb-4">
            Transaction Summary
          </h3>

          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-purple-200">Amount Paid</span>
              <span class="text-xl font-bold text-white">€{{ paymentDetails.amount }}</span>
            </div>
            <div class="flex justify-between items-center text-green-400">
              <span>Bonus Credits (+100%)</span>
              <span class="font-bold">+€{{ paymentDetails.bonus }}</span>
            </div>
            <div class="border-t border-white/20 pt-3 mt-3">
              <div class="flex justify-between items-center">
                <span class="text-purple-100 font-medium">Total Credited</span>
                <span
                  class="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
                >
                  €{{ paymentDetails.total }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Locked Notice -->
        <div class="bg-purple-500/20 border border-purple-500/30 rounded-xl p-4 mb-8">
          <div class="flex items-center justify-center gap-3">
            <svg class="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clip-rule="evenodd"
              />
            </svg>
            <div class="text-left">
              <p class="text-purple-100 font-medium">Credits Locked</p>
              <p class="text-sm text-purple-300">Available when platform launches</p>
            </div>
          </div>
        </div>

        <!-- Email Notice -->
        <div class="flex items-center justify-center gap-2 text-purple-300 mb-8">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <span class="text-sm">Confirmation sent to your email</span>
        </div>

        <!-- Actions -->
        <div class="space-y-3">
          <router-link
            to="/topup"
            class="block w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-purple-500/30"
          >
            Top Up More Credits
          </router-link>
          <router-link
            to="/"
            class="block w-full py-4 px-6 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-all border border-white/20"
          >
            Return to Home
          </router-link>
        </div>

        <!-- Transaction ID -->
        <p v-if="sessionId" class="mt-6 text-xs text-purple-400">
          Transaction ID: {{ sessionId.slice(0, 20) }}...
        </p>
      </div>

      <!-- Share Section -->
      <div class="mt-6 text-center">
        <p class="text-purple-300 text-sm mb-3">Share your excitement!</p>
        <div class="flex justify-center gap-3">
          <button
            @click="shareOnTwitter"
            class="w-10 h-10 bg-white/10 hover:bg-blue-500/30 rounded-full flex items-center justify-center transition-all"
          >
            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
              />
            </svg>
          </button>
          <button
            @click="shareOnFacebook"
            class="w-10 h-10 bg-white/10 hover:bg-blue-600/30 rounded-full flex items-center justify-center transition-all"
          >
            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTopupStore } from '@/stores/topupStore'
import { useTracking } from '@/composables/useTracking'
import { verifyTopupPayment } from '@/api-services/topupApi'

const route = useRoute()
const topupStore = useTopupStore()
const { trackPurchase } = useTracking()

const sessionId = ref('')
const isVerifying = ref(false)

// Payment details from store or verified response
const paymentDetails = computed(() => {
  if (topupStore.checkoutSession) {
    return {
      amount: topupStore.checkoutSession.amount || 0,
      bonus: topupStore.checkoutSession.bonus || 0,
      total: topupStore.checkoutSession.total || 0
    }
  }
  // Default fallback
  return {
    amount: 50,
    bonus: 50,
    total: 100
  }
})

onMounted(async () => {
  // Get session ID from URL
  sessionId.value = route.query.session_id || ''

  if (sessionId.value) {
    isVerifying.value = true
    try {
      // Verify payment with backend
      const response = await verifyTopupPayment(sessionId.value)

      if (response?.data?.success) {
        // Track purchase event
        trackPurchase({
          value: paymentDetails.value.amount,
          currency: 'EUR',
          packageId: topupStore.selectedPackageId || 'unknown',
          transactionId: sessionId.value,
          bonusAmount: paymentDetails.value.bonus,
          totalCredits: paymentDetails.value.total
        })
      }
    } catch (error) {
      console.error('Payment verification error:', error)
    } finally {
      isVerifying.value = false
    }
  }

  // Clear the checkout session after success
  // topupStore.resetForm()
  // topupStore.clearSelection()
})

// Share functions
const shareOnTwitter = () => {
  const text = encodeURIComponent(
    `Just topped up my FUN Wallet and got +100% bonus credits! 🎉 Can't wait for the platform launch!`
  )
  window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank')
}

const shareOnFacebook = () => {
  const url = encodeURIComponent(window.location.origin)
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
}
</script>

<style scoped>
@keyframes bounce-slow {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-bounce-slow {
  animation: bounce-slow 2s ease-in-out infinite;
}
</style>
