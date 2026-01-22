<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
    <!-- Hero Section -->
    <HeroSection />

    <!-- Package Cards Section -->
    <section class="px-4 py-8 md:py-12">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-2xl md:text-3xl font-bold text-white text-center mb-2">
          Choose Your Package
        </h2>
        <p class="text-purple-200 text-center mb-8">Get +100% bonus credits on all packages!</p>

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
        <p class="text-white text-lg">Preparing your checkout...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useTopupStore } from '@/stores/topupStore'
import { useTracking } from '@/composables/useTracking'
import { createTopupCheckout } from '@/api-services/topupApi'

import HeroSection from '@/components/topup/HeroSection.vue'
import PackageCards from '@/components/topup/PackageCards.vue'
import StickyCart from '@/components/topup/StickyCart.vue'
import CheckoutForm from '@/components/topup/CheckoutForm.vue'
import FaqSection from '@/components/topup/FaqSection.vue'

const route = useRoute()
const topupStore = useTopupStore()
const { trackViewContent, trackInitiateCheckout } = useTracking()

// Handle URL preselect
onMounted(() => {
  // Track page view
  trackViewContent({
    contentName: 'Topup Landing Page',
    currency: 'EUR'
  })

  // Check for URL preselect: /topup?pkg=50
  const pkgParam = route.query.pkg
  if (pkgParam) {
    topupStore.selectPackageByAmount(pkgParam)
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

// Handle checkout submission
const handleCheckout = async () => {
  if (!topupStore.isFormValid) return

  topupStore.setLoading(true)

  try {
    // Track initiate checkout
    trackInitiateCheckout({
      value: topupStore.payNowAmount,
      currency: 'EUR',
      packageId: topupStore.selectedPackageId,
      userType: topupStore.userForm.userType
    })

    // Create checkout session
    const response = await createTopupCheckout({
      packageId: topupStore.selectedPackageId,
      amount: topupStore.payNowAmount,
      name: topupStore.userForm.name,
      email: topupStore.userForm.email,
      country: topupStore.userForm.country,
      userType: topupStore.userForm.userType,
      bonusPercent: topupStore.selectedPackage.bonusPercent,
      totalCredits: topupStore.totalCredits,
      successUrl: `${window.location.origin}/topup/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${window.location.origin}/topup/fail`
    })

    if (response?.data?.checkout_url) {
      // Store session info
      topupStore.setCheckoutSession({
        sessionId: response.data.session_id,
        amount: topupStore.payNowAmount,
        bonus: topupStore.bonusAmount,
        total: topupStore.totalCredits
      })

      // Redirect to Stripe
      window.location.href = response.data.checkout_url
    } else {
      throw new Error('Failed to create checkout session')
    }
  } catch (error) {
    console.error('Checkout error:', error)
    alert('Failed to create checkout. Please try again.')
  } finally {
    topupStore.setLoading(false)
  }
}
</script>
