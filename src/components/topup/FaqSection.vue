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
    question: 'What is the +100% bonus?',
    answer:
      "When you top up your FUN Wallet now, we'll double your credits! For example, if you purchase €50, you'll receive €100 in total credits. This is a limited-time offer available only during our pre-launch period."
  },
  {
    question: 'What are locked wallet credits?',
    answer:
      "Your purchased credits (including the bonus) will be securely stored in your FUN Wallet but will be 'locked' until our platform officially launches. Once we go live, your credits will be instantly available to use for tipping creators, unlocking exclusive content, and accessing premium features."
  },
  {
    question: 'When will the platform launch?',
    answer:
      "We're working hard to launch as soon as possible! All pre-launch customers will receive email notifications with launch updates. Your credits will be automatically unlocked and ready to use on launch day."
  },
  {
    question: 'Is my payment secure?',
    answer:
      "Absolutely! We use Stripe, one of the world's most trusted payment processors. Your payment details are encrypted and never stored on our servers. Stripe is PCI-DSS compliant, ensuring the highest level of security for your transactions."
  },
  {
    question: 'Can I get a refund?',
    answer:
      "Since these are pre-launch credits at a special bonus rate, all purchases are final. However, if you have any issues or concerns, please contact our support team and we'll do our best to help."
  },
  {
    question: 'What can I use FUN Wallet credits for?',
    answer:
      'Once the platform launches, you can use your credits to: tip your favorite creators, unlock exclusive premium content, access special features, subscribe to creator channels, and much more!'
  },
  {
    question: 'Do credits expire?',
    answer:
      "No, your FUN Wallet credits never expire! Once unlocked at launch, they'll remain in your account until you use them."
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
