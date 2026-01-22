<template>
  <div>
    <Header />
    <template v-if="currentView === 'thankyou'">
      <ThankYouPage :onBackToHome="handleBackToHome" />
      <Footer />
    </template>
    <template v-else-if="currentView === 'form'">
      <main class="min-h-screen bg-gradient-hero py-8 md:py-12">
        <div class="container">
          <ClaimForm :onComplete="handleFormComplete" :onCancel="handleBackToHome" />
        </div>
      </main>
      <Footer />
    </template>
    <template v-else>
      <main>
        <HeroSection :onStartClaim="handleStartClaim" />
        <ProcessSection />
        <BenefitsSection />
        <CTASection :onStartClaim="handleStartClaim" />
      </main>
      <Footer />
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Header from '@/components/Header.vue'
import HeroSection from '@/components/HeroSection.vue'
import ProcessSection from '@/components/ProcessSection.vue'
import BenefitsSection from '@/components/Benefit.vue'
import CTASection from '@/components/CTASection.vue'
import ClaimForm from '@/components/ClaimForm.vue'
import ThankYouPage from '@/components/ThankYouPage.vue'
import Footer from '@/components/Footer.vue'

const currentView = ref('landing')

function handleStartClaim() {
  currentView.value = 'form'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function handleFormComplete() {
  currentView.value = 'thankyou'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function handleBackToHome() {
  currentView.value = 'landing'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
</style>
