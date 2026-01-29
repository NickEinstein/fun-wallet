<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-12"
  >
    <!-- Background Effects -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/4 -right-40 w-80 h-80 bg-green-500/20 rounded-full blur-3xl"></div>
      <div
        class="absolute bottom-1/4 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
      ></div>
    </div>

    <div class="relative max-w-2xl mx-auto">
      <!-- Success Card -->
      <div class="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 text-center mb-6">
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
          Your FUN Wallet has been credited with your purchase!
        </p>

        <!-- Transaction Summary -->
        <div class="bg-white/5 rounded-2xl p-6 mb-6 text-left">
          <h3 class="text-sm font-medium text-purple-300 uppercase tracking-wider mb-4">
            Transaction Summary
          </h3>

          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-purple-200">Amount Paid</span>
              <span class="text-xl font-bold text-white">€{{ paymentDetails.amount }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-purple-200">Real Credits</span>
              <span class="font-bold text-white">€{{ paymentDetails.realCredits }}</span>
            </div>
            <div class="flex justify-between items-center text-green-400">
              <span>FAN Bonus Credits</span>
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

        <!-- Email Notice -->
        <div class="flex items-center justify-center gap-2 text-purple-300 mb-6">
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
      </div>

      <!-- Wallet Balances Card -->
      <div class="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 mb-6">
        <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <span class="text-2xl">💰</span> Your Wallet Balances
        </h3>
        
        <div class="grid grid-cols-2 gap-4">
          <!-- Real Wallet -->
          <div class="bg-white/5 rounded-xl p-4 border border-white/10">
            <div class="text-purple-300 text-sm mb-1">Real Wallet</div>
            <div class="text-2xl font-bold text-white">€{{ walletBalances.realWallet }}</div>
            <div class="text-xs text-purple-400 mt-1">Withdrawable</div>
          </div>
          
          <!-- FAN Bonus Wallet -->
          <div class="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
            <div class="text-green-300 text-sm mb-1">FAN Bonus Wallet</div>
            <div class="text-2xl font-bold text-green-400">€{{ walletBalances.bonusWallet }}</div>
            <div class="text-xs text-green-400/70 mt-1">Spendable credits</div>
          </div>
        </div>

        <!-- Total Balance -->
        <div class="mt-4 pt-4 border-t border-white/10 text-center">
          <div class="text-purple-300 text-sm">Total Balance</div>
          <div class="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            €{{ walletBalances.realWallet + walletBalances.bonusWallet }}
          </div>
        </div>
      </div>

      <!-- Transaction History -->
      <div class="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 mb-6">
        <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <span class="text-2xl">📜</span> Transaction History
        </h3>
        
        <div class="space-y-3">
          <div
            v-for="(txn, index) in transactions"
            :key="index"
            class="flex items-center justify-between p-3 bg-white/5 rounded-xl"
          >
            <div class="flex items-center gap-3">
              <div :class="[
                'w-10 h-10 rounded-full flex items-center justify-center',
                txn.type === 'purchase' ? 'bg-green-500/20' : 'bg-purple-500/20'
              ]">
                <span class="text-lg">{{ txn.type === 'purchase' ? '💳' : '🎁' }}</span>
              </div>
              <div>
                <div class="text-white font-medium text-sm">{{ txn.description }}</div>
                <div class="text-purple-400 text-xs">{{ txn.date }}</div>
              </div>
            </div>
            <div :class="[
              'font-bold',
              txn.amount > 0 ? 'text-green-400' : 'text-red-400'
            ]">
              {{ txn.amount > 0 ? '+' : '' }}€{{ txn.amount }}
            </div>
          </div>

          <div v-if="transactions.length === 0" class="text-center py-4 text-purple-400">
            <p>Your recent transaction will appear here.</p>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="space-y-3">
        <router-link
          to="/topup"
          class="block w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-purple-500/30 text-center"
        >
          Buy More Credits
        </router-link>
        <router-link
          to="/"
          class="block w-full py-4 px-6 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-all border border-white/20 text-center"
        >
          Return to Home
        </router-link>
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
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTopupStore } from '@/stores/topupStore'
import { useTracking } from '@/composables/useTracking'

const route = useRoute()
const topupStore = useTopupStore()
const { trackPurchase } = useTracking()

// Payment details from store or URL params
const paymentDetails = computed(() => {
  if (topupStore.checkoutSession) {
    return {
      amount: topupStore.checkoutSession.amount || 0,
      realCredits: topupStore.checkoutSession.realCredits || topupStore.checkoutSession.amount || 0,
      bonus: topupStore.checkoutSession.bonus || 0,
      total: topupStore.checkoutSession.total || 0
    }
  }
  
  // Fallback to URL params
  const amount = parseInt(route.query.amount) || 20
  return {
    amount: amount,
    realCredits: amount,
    bonus: amount,
    total: amount * 2
  }
})

// Wallet balances
const walletBalances = computed(() => {
  // Start with existing balances and add new purchase
  const existing = topupStore.walletBalances
  return {
    realWallet: existing.realWallet + paymentDetails.value.realCredits,
    bonusWallet: existing.bonusWallet + paymentDetails.value.bonus
  }
})

// Transaction history
const transactions = computed(() => {
  const txns = [...topupStore.transactions]
  
  // Add current transaction if not already there
  if (txns.length === 0 || txns[0]?.amount !== paymentDetails.value.total) {
    txns.unshift({
      type: 'purchase',
      description: `Credit Package - €${paymentDetails.value.amount}`,
      amount: paymentDetails.value.total,
      date: new Date().toLocaleDateString('en-GB', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    })
  }
  
  return txns.slice(0, 5) // Show last 5 transactions
})

onMounted(() => {
  // Update wallet balances in store
  topupStore.updateWalletBalances(
    walletBalances.value.realWallet,
    walletBalances.value.bonusWallet
  )

  // Add transaction to store
  if (paymentDetails.value.amount > 0) {
    topupStore.addTransaction({
      type: 'purchase',
      description: `Credit Package - €${paymentDetails.value.amount}`,
      amount: paymentDetails.value.total,
      date: new Date().toLocaleDateString('en-GB', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    })

    // Track purchase event
    trackPurchase({
      value: paymentDetails.value.amount,
      currency: 'EUR',
      packageId: route.query.package_id || topupStore.checkoutSession?.packageId || 'unknown',
      transactionId: route.query.session_id || Date.now().toString(),
      bonusAmount: paymentDetails.value.bonus,
      totalCredits: paymentDetails.value.total
    })
  }
})

// Share functions
const shareOnTwitter = () => {
  const text = encodeURIComponent(`Just topped up my FUN Wallet and got +100% bonus credits! 🎉`)
  window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank')
}

const shareOnFacebook = () => {
  const url = encodeURIComponent(window.location.origin)
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
}
</script>

<style scoped>
@keyframes bounce-slow {
  0%, 100% {
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
