<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
    <div
      v-for="pkg in topupStore.packages"
      :key="pkg.id"
      @click="selectPackage(pkg)"
      :class="[
        'relative cursor-pointer rounded-2xl p-5 md:p-6 transition-all duration-300 transform',
        'border-2',
        isSelected(pkg.id)
          ? 'bg-gradient-to-br from-purple-600 to-pink-600 border-transparent scale-[1.02] shadow-xl shadow-purple-500/30'
          : 'bg-white/10 backdrop-blur-sm border-white/20 hover:border-purple-400/50 hover:scale-[1.01]',
        pkg.popular && !isSelected(pkg.id) ? 'ring-2 ring-yellow-400' : ''
      ]"
    >
      <!-- Badge -->
      <div
        v-if="pkg.badge"
        :class="[
          'absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap shadow-lg',
          pkg.popular 
            ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black' 
            : 'bg-gradient-to-r from-green-400 to-emerald-500 text-black'
        ]"
      >
        {{ pkg.badge === 'Most Popular' ? '⭐ ' : '💎 ' }}{{ pkg.badge }}
      </div>

      <!-- Package Content -->
      <div class="text-center pt-3">
        <!-- Price -->
        <div class="mb-4">
          <span class="text-4xl md:text-5xl font-extrabold text-white">€{{ pkg.amount }}</span>
        </div>

        <!-- What you get breakdown -->
        <div class="space-y-3 text-sm">
          <!-- Real Credits -->
          <div class="flex items-center justify-between px-2 py-2 bg-white/5 rounded-lg">
            <span class="text-purple-200 flex items-center gap-2">
              <span class="text-lg">💰</span> Real Credits
            </span>
            <span class="font-bold text-white">€{{ pkg.realCredits }}</span>
          </div>
          
          <!-- FAN Bonus Credits -->
          <div class="flex items-center justify-between px-2 py-2 bg-green-500/10 rounded-lg border border-green-500/30">
            <span class="text-green-300 flex items-center gap-2">
              <span class="text-lg">🎁</span> FAN Bonus
            </span>
            <span class="font-bold text-green-400">+€{{ pkg.bonusCredits }}</span>
          </div>

          <!-- Total -->
          <div class="pt-3 border-t border-white/20">
            <div class="text-purple-100 text-xs mb-1">Total Credits</div>
            <div class="text-2xl md:text-3xl font-bold text-white">
              €{{ pkg.realCredits + pkg.bonusCredits }}
            </div>
          </div>
        </div>

        <!-- Selection Indicator -->
        <div class="mt-4">
          <div
            :class="[
              'w-8 h-8 mx-auto rounded-full border-2 flex items-center justify-center transition-all',
              isSelected(pkg.id) ? 'bg-white border-white' : 'border-white/40'
            ]"
          >
            <svg
              v-if="isSelected(pkg.id)"
              class="w-5 h-5 text-purple-600"
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
    </div>
  </div>
</template>

<script setup>
import { useTopupStore } from '@/stores/topupStore'
import { useTracking } from '@/composables/useTracking'

const topupStore = useTopupStore()
const { trackAddToCart } = useTracking()

// Check if package is selected
const isSelected = (packageId) => {
  return topupStore.selectedPackageId === packageId
}

// Select a package
const selectPackage = (pkg) => {
  topupStore.selectPackage(pkg.id)

  // Track add to cart
  trackAddToCart({
    value: pkg.amount,
    currency: 'EUR',
    packageId: pkg.id,
    bonusAmount: pkg.bonusCredits
  })
}
</script>
