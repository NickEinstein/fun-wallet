<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
    <!-- Hero Section -->
    <HeroSection />

    <!-- Package Cards Section -->
    <section class="px-4 py-8 md:py-12">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-2xl md:text-3xl font-bold text-white text-center mb-2">
          Choose Your Credit Package
        </h2>
        <p class="text-purple-200 text-center mb-8">Get +100% FAN bonus credits on all packages!</p>

        <PackageCards />
      </div>
    </section>

    <!-- Checkout Form Section -->
    <section v-if="topupStore.selectedPackageId" class="px-4 py-8 bg-black/20">
      <div class="max-w-2xl mx-auto">
        <CheckoutForm @submit="handleCheckout" />
      </div>
    </section>

    <!-- FAQ Section -->
    <FaqSection />

    <!-- Sticky Cart -->
    <StickyCart @checkout="scrollToForm" />

    <!-- Loading Overlay -->
    <div
      v-if="topupStore.isLoading"
      class="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
    >
      <div class="text-center">
        <div
          class="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent mx-auto mb-4"
        ></div>
        <p class="text-white text-lg">Redirecting to Stripe...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useTopupStore } from '@/stores/topupStore'
import { useTracking } from '@/composables/useTracking'

import HeroSection from '@/components/topup/HeroSection.vue'
import PackageCards from '@/components/topup/PackageCards.vue'
import StickyCart from '@/components/topup/StickyCart.vue'
import CheckoutForm from '@/components/topup/CheckoutForm.vue'
import FaqSection from '@/components/topup/FaqSection.vue'

const route = useRoute()
const topupStore = useTopupStore()
const { trackViewContent, trackInitiateCheckout } = useTracking()

// Handle URL params on mount
onMounted(() => {
  // Track page view
  trackViewContent({
    contentName: 'FUN Wallet - Buy Credits',
    currency: 'EUR'
  })

  // Check for URL preselect: /topup?pkg=20
  const pkgParam = route.query.pkg
  if (pkgParam) {
    topupStore.selectPackageByAmount(pkgParam)
  }

  // Check for referral code: /topup?ref=CODE123
  const refParam = route.query.ref
  if (refParam) {
    topupStore.setReferralCode(refParam.toUpperCase())
  }

  // Check for user_id (if logged in user)
  const userIdParam = route.query.user_id
  if (userIdParam) {
    topupStore.setUserId(userIdParam)
  }
})

// Scroll to form when package selected
const scrollToForm = () => {
  if (topupStore.selectedPackageId) {
    const formSection = document.querySelector('.checkout-form')
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' })
    }
  }
}

// Handle checkout - redirect to Stripe Payment Link
const handleCheckout = () => {
  if (!topupStore.isFormValid) return

  topupStore.setLoading(true)

  // Track initiate checkout
  trackInitiateCheckout({
    value: topupStore.payNowAmount,
    currency: 'EUR',
    packageId: topupStore.selectedPackageId,
    referralCode: topupStore.referralCode
  })

  // Store checkout session info for success page
  topupStore.setCheckoutSession({
    packageId: topupStore.selectedPackageId,
    amount: topupStore.payNowAmount,
    realCredits: topupStore.realCredits,
    bonus: topupStore.bonusAmount,
    total: topupStore.totalCredits,
    referralCode: topupStore.referralCode
  })

  // Get Stripe redirect URL and redirect
  const stripeUrl = topupStore.getStripeRedirectUrl()
  
  if (stripeUrl) {
    // Small delay for UX
    setTimeout(() => {
      window.location.href = stripeUrl
    }, 500)
  } else {
    topupStore.setLoading(false)
    alert('Please select a package first.')
  }
}
</script>
