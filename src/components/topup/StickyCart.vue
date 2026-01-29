<template>
  <!-- Sticky Cart - Mobile -->
  <Transition name="slide-up">
    <div
      v-if="topupStore.selectedPackageId"
      class="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-t border-purple-500/30 p-4 z-40 md:hidden"
    >
      <div class="flex items-center justify-between gap-4">
        <!-- Cart Summary -->
        <div class="flex-1">
          <div class="flex items-baseline gap-2">
            <span class="text-sm text-purple-300">Pay Now:</span>
            <span class="text-xl font-bold text-white">€{{ topupStore.payNowAmount }}</span>
          </div>
          <div class="flex items-center gap-2 text-sm mt-1">
            <span class="text-purple-200">💰 {{ topupStore.realCredits }}</span>
            <span class="text-purple-400">+</span>
            <span class="text-green-400">🎁 {{ topupStore.bonusAmount }}</span>
            <span class="text-purple-400">=</span>
            <span class="font-semibold text-white">{{ topupStore.totalCredits }} credits</span>
          </div>
        </div>

        <!-- CTA Button -->
        <button
          @click="handleCheckout"
          class="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-purple-500/30 transition-all whitespace-nowrap"
        >
          Continue
        </button>
      </div>

      <!-- Instant Credits Notice -->
      <div class="mt-2 text-center text-xs text-green-400">
        <svg class="w-3 h-3 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
          />
        </svg>
        Credits available instantly after payment
      </div>
    </div>
  </Transition>

  <!-- Floating Cart - Desktop -->
  <Transition name="slide-right">
    <div
      v-if="topupStore.selectedPackageId"
      class="hidden md:block fixed right-6 top-1/2 -translate-y-1/2 w-72 bg-slate-900/95 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-6 shadow-2xl shadow-purple-500/20 z-40"
    >
      <!-- Header -->
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-bold text-white">Your Cart</h3>
        <button @click="clearCart" class="text-purple-400 hover:text-purple-300 text-sm">
          Clear
        </button>
      </div>

      <!-- Package Info -->
      <div class="bg-white/5 rounded-xl p-4 mb-4">
        <div class="flex items-center justify-between mb-3">
          <span class="text-purple-300">Package</span>
          <span class="font-semibold text-white">€{{ topupStore.payNowAmount }}</span>
        </div>
        <div class="flex items-center justify-between mb-2">
          <span class="text-purple-300 flex items-center gap-1">💰 Real Credits</span>
          <span class="font-semibold text-white">{{ topupStore.realCredits }}</span>
        </div>
        <div class="flex items-center justify-between text-green-400">
          <span class="flex items-center gap-1">🎁 FAN Bonus</span>
          <span class="font-semibold">+{{ topupStore.bonusAmount }}</span>
        </div>
      </div>

      <!-- Total -->
      <div class="border-t border-white/10 pt-4 mb-4">
        <div class="flex items-center justify-between mb-1">
          <span class="text-purple-200">Pay Now</span>
          <span class="text-xl font-bold text-white">€{{ topupStore.payNowAmount }}</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-purple-200">Total Credits</span>
          <span
            class="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
          >
            {{ topupStore.totalCredits }}
          </span>
        </div>
      </div>

      <!-- Instant Credits Notice -->
      <div class="bg-green-500/10 border border-green-500/30 rounded-lg p-3 mb-4">
        <div class="flex items-start gap-2">
          <svg
            class="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
          <p class="text-xs text-green-300">
            Credits will be <span class="font-semibold text-green-200">instantly available</span> in your FUN Wallet after payment.
          </p>
        </div>
      </div>

      <!-- CTA Button -->
      <button
        @click="handleCheckout"
        class="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-purple-500/30 transition-all"
      >
        Proceed to Checkout
      </button>

      <!-- Trust Badges -->
      <div class="flex items-center justify-center gap-4 mt-4 text-xs text-purple-400">
        <span class="flex items-center gap-1">
          <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
          Secure
        </span>
        <span class="flex items-center gap-1">
          <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
              clip-rule="evenodd"
            />
          </svg>
          Stripe
        </span>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { useTopupStore } from '@/stores/topupStore'

const emit = defineEmits(['checkout'])

const topupStore = useTopupStore()

const handleCheckout = () => {
  emit('checkout')
  // Scroll to form on mobile
  const formSection = document.querySelector('.checkout-form')
  if (formSection) {
    formSection.scrollIntoView({ behavior: 'smooth' })
  }
}

const clearCart = () => {
  topupStore.clearSelection()
}
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
