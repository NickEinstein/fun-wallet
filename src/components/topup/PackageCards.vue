<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
    <div
      v-for="pkg in topupStore.packages"
      :key="pkg.id"
      @click="selectPackage(pkg)"
      :class="[
        'relative cursor-pointer rounded-2xl p-4 md:p-6 transition-all duration-300 transform',
        'border-2',
        isSelected(pkg.id)
          ? 'bg-gradient-to-br from-purple-600 to-pink-600 border-transparent scale-[1.02] shadow-xl shadow-purple-500/30'
          : 'bg-white/10 backdrop-blur-sm border-white/20 hover:border-purple-400/50 hover:scale-[1.01]',
        pkg.popular && !isSelected(pkg.id) ? 'ring-2 ring-yellow-400' : ''
      ]"
    >
      <!-- Most Popular Badge -->
      <div
        v-if="pkg.popular"
        class="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap shadow-lg"
      >
        ⭐ Most Popular
      </div>

      <!-- Bonus Badge -->
      <div
        class="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg"
      >
        +100% BONUS
      </div>

      <!-- Package Content -->
      <div class="text-center pt-2">
        <!-- Amount -->
        <div class="mb-3">
          <span class="text-3xl md:text-4xl font-extrabold text-white">€{{ pkg.amount }}</span>
        </div>

        <!-- Breakdown -->
        <div class="space-y-1 text-sm">
          <div class="text-purple-200">
            Pay: <span class="font-semibold text-white">€{{ pkg.amount }}</span>
          </div>
          <div class="text-green-300">
            Bonus: <span class="font-semibold">+€{{ getBonus(pkg) }}</span>
          </div>
          <div class="pt-2 border-t border-white/20">
            <div class="text-purple-100 text-xs">Total Credits</div>
            <div class="text-xl md:text-2xl font-bold text-white">€{{ getTotal(pkg) }}</div>
          </div>
        </div>

        <!-- Selection Indicator -->
        <div class="mt-4">
          <div
            :class="[
              'w-6 h-6 mx-auto rounded-full border-2 flex items-center justify-center transition-all',
              isSelected(pkg.id) ? 'bg-white border-white' : 'border-white/40'
            ]"
          >
            <svg
              v-if="isSelected(pkg.id)"
              class="w-4 h-4 text-purple-600"
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

// Calculate bonus for a package
const getBonus = (pkg) => {
  return (pkg.amount * pkg.bonusPercent) / 100
}

// Calculate total for a package
const getTotal = (pkg) => {
  return pkg.amount + getBonus(pkg)
}

// Select a package
const selectPackage = (pkg) => {
  topupStore.selectPackage(pkg.id)

  // Track add to cart
  trackAddToCart({
    value: pkg.amount,
    currency: 'EUR',
    packageId: pkg.id,
    bonusAmount: getBonus(pkg)
  })
}
</script>
