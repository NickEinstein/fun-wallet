<template>
  <section class="px-4 py-12 md:py-16 bg-black/20">
    <div class="max-w-3xl mx-auto">
      <h2 class="text-2xl md:text-3xl font-bold text-white text-center mb-8">
        Frequently Asked Questions
      </h2>

      <div class="space-y-4">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden"
        >
          <button
            @click="toggleFaq(index)"
            class="w-full flex items-center justify-between px-6 py-4 text-left"
          >
            <span class="font-medium text-white pr-4">{{ faq.question }}</span>
            <svg
              :class="[
                'w-5 h-5 text-purple-400 transition-transform flex-shrink-0',
                openIndex === index ? 'rotate-180' : ''
              ]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <Transition name="accordion">
            <div v-if="openIndex === index" class="px-6 pb-4">
              <p class="text-purple-200 text-sm leading-relaxed">{{ faq.answer }}</p>
            </div>
          </Transition>
        </div>
      </div>

      <!-- Additional Info -->
      <div class="mt-12 text-center">
        <div
          class="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-6 py-3"
        >
          <svg
            class="w-5 h-5 text-purple-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span class="text-purple-200 text-sm">
            Questions? Contact us at
            <a
              href="mailto:support@funwallet.com"
              class="text-purple-400 hover:text-purple-300 underline"
              >support@funwallet.com</a
            >
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const openIndex = ref(0) // First FAQ open by default

const faqs = [
  {
    question: 'What is the +100% FAN Bonus?',
    answer:
      "When you top up your FUN Wallet, we give you FREE bonus credits! For example, if you purchase €20, you'll receive 20 Real Credits PLUS 20 FAN Bonus Credits - that's 40 credits total to use on the platform!"
  },
  {
    question: "What's the difference between Real Credits and FAN Bonus Credits?",
    answer:
      "Real Credits are what you pay for and can be used for anything on the platform. FAN Bonus Credits are FREE extra credits we give you as a reward - they work the same way but are added on top of your purchase!"
  },
  {
    question: 'When will I receive my credits?',
    answer:
      "Instantly! As soon as your payment is confirmed by Stripe, your credits will be immediately available in your FUN Wallet. You can start using them right away."
  },
  {
    question: 'Is my payment secure?',
    answer:
      "Absolutely! We use Stripe, one of the world's most trusted payment processors. Your payment details are encrypted and never stored on our servers. Stripe is PCI-DSS compliant, ensuring the highest level of security for your transactions."
  },
  {
    question: 'What is a referral code?',
    answer:
      "Referral codes are special codes shared by creators or friends. When you use a referral code during checkout, both you and the referrer may receive bonus benefits. Enter a referral code if you have one, or leave it blank."
  },
  {
    question: 'What can I use FUN Wallet credits for?',
    answer:
      'You can use your credits to: tip your favorite creators, unlock exclusive premium content, access special features, subscribe to creator channels, purchase digital items, and much more!'
  },
  {
    question: 'Do credits expire?',
    answer:
      "No, your FUN Wallet credits never expire! They'll remain in your account until you choose to use them."
  },
  {
    question: 'Can I get a refund?',
    answer:
      "Digital credits are non-refundable once purchased. However, if you experience any issues with your payment or have concerns, please contact our support team and we'll do our best to help."
  }
]

const toggleFaq = (index) => {
  openIndex.value = openIndex.value === index ? -1 : index
}
</script>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.accordion-enter-to,
.accordion-leave-from {
  opacity: 1;
  max-height: 200px;
}
</style>
