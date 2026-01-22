<template>
  <div class="min-h-screen bg-white py-10 px-4">
    <div class="max-w-3xl mx-auto">
      <div class="flex items-center justify-between mb-2">
        <button
          @click="$router.back()"
          class="flex items-center gap-1 text-[#e82264] font-semibold hover:underline focus:outline-none"
        >
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back
        </button>
      
      </div>
        <div class="flex justify-center">
            <router-link to="/">
              <img
                src="@/assets/logo.png"
                alt="Fansngage Logo"
                class="h-16 w-auto"
                style="cursor: pointer"
              />
            </router-link>
        </div>
      <h1 class="text-3xl font-bold text-[#e82264] mb-6 text-center">
        Help &amp; FAQs – Fansngage
      </h1>
      <p class="text-gray-700 mb-8 text-center">
        Welcome to Fansngage Help Center. Below are some of the most commonly asked questions to
        help you get started and resolve any issues you may face.
      </p>
      <div class="mb-6 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <input
          v-model="search"
          type="text"
          placeholder="Search for help..."
          class="w-full sm:w-2/3 border rounded-lg px-4 py-2 text-gray-700"
        />
      </div>
      <div v-if="filteredFaqs.length === 0" class="text-gray-500 text-center py-10">
        No results found.
      </div>
      <div v-else>
        <div v-for="(faq, idx) in filteredFaqs" :key="idx" class="mb-6 border-b pb-4">
          <button @click="toggle(idx)" class="w-full text-left flex items-center justify-between">
            <span class="font-semibold text-lg text-gray-800">{{ faq.question }}</span>
            <span class="ml-2 text-[#e82264]">{{ openIndex === idx ? '-' : '+' }}</span>
          </button>
          <div v-if="openIndex === idx" class="mt-2 text-gray-700 text-base">
            <div v-html="faq.answer"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const search = ref('')
const openIndex = ref(null)
const faqs = ref([
  // General
  {
    question: 'What is Fansngage?',
    answer:
      'Fansngage is a creator-first content platform where creators can connect directly with fans, monetize their content through subscriptions and tips, and grow their community in a safe, supportive environment.'
  },
  {
    question: 'Is Fansngage free to use?',
    answer:
      'Yes, registering as a fan or creator is free. However, accessing premium content may require a paid subscription.'
  },
  {
    question: 'Who can join Fansngage?',
    answer: 'Anyone aged 18 or older is welcome to join Fansngage.'
  },
  // Account Management
  {
    question: 'How do I sign up?',
    answer:
      'Click on "Sign Up" on the homepage and choose to register as either a fan or a creator. You’ll need a valid email address and password to begin.'
  },
  {
    question: 'What’s the difference between a Personal and Creator account?',
    answer:
      'Creator accounts get access to monetization tools, analytics, and brand deals. Personal accounts are mainly for browsing and engaging.'
  },
  {
    question: 'How can I delete my account?',
    answer:
      'Go to your account settings, scroll to the bottom, and click on "Delete Account". For assistance, contact <a href="mailto:support@fansngage.com" class="text-[#e82264] underline">support@fansngage.com</a>.'
  },
  {
    question: 'I forgot my password. How can I reset it?',
    answer:
      'Click "Forgot Password" on the login page and follow the steps to reset your password via email.'
  },
  // Creators
  {
    question: 'How do I become a creator?',
    answer:
      'After signing up, go to your profile settings and verify your identity. You’ll need a valid government-issued ID and a payment method.'
  },
  {
    question: 'How do I earn on Fansngage?',
    answer:
      'Creators earn revenue through subscriptions, tips, and paid posts. Withdrawal requests can be made at any time via PayPal or Bank Transfer. To ensure security, all withdrawals are manually processed. Platform fees or tax deductions may apply, depending on the admin settings, and creators can view their detailed earnings reports within their dashboard.'
  },
  {
    question: 'When do I get paid?',
    answer:
      'Payments are processed weekly. Payouts can be requested once your balance reaches the minimum payout threshold.'
  },
  {
    question: 'Can I see my performance analytics?',
    answer:
      'Yes. Go to your dashboard to view followers, engagement, growth, and earning trends across platforms.'
  },
  // Payments
  {
    question: 'What payment methods are accepted?',
    answer:
      'Fans can use credit/debit cards and supported digital wallets. All transactions are securely processed.'
  },
  {
    question: 'Can I get a refund?',
    answer:
      'All sales are final. Refunds are only issued in cases of fraudulent transactions or billing errors.'
  },
  // Safety & Security
  {
    question: 'Is my data safe on Fansngage?',
    answer:
      'Yes. We use encrypted connections and secure servers. You can learn more in our <a href="/auth/PrivacyPolicy" class="text-[#e82264] underline">Privacy Policy</a>.'
  },
  {
    question: 'How do I report a user or content?',
    answer:
      'Use the "Report" button on a user’s profile or content. You can also contact our Trust & Safety team at <a href="mailto:safety@fansngage.com" class="text-[#e82264] underline">safety@fansngage.com</a>.'
  },
  // Referral Program
  {
    question: 'Do you offer a referral program?',
    answer:
      'Yes. Invite new creators to Fansngage and earn a percentage of their earnings for the first 12 months.'
  },
  // Troubleshooting & Support
  {
    question: 'I’m having trouble logging in — what should I do?',
    answer:
      'Click “Forgot Password” or contact <a href="mailto:support@fansngage.com" class="text-[#e82264] underline">support@fansngage.com</a> if you\'re still locked out.'
  },
  {
    question: 'How do I report a bug or technical issue?',
    answer:
      'Go to Help &gt; Report a Problem or email us directly with screenshots and a description.'
  },
  {
    question: 'Is there a tutorial or guide to get started?',
    answer:
      'Yes. Visit our Help Center for video guides, walkthroughs, and tips for growing your creator brand.'
  }
])
const filteredFaqs = computed(() => {
  if (!search.value) return faqs.value
  return faqs.value.filter(
    (faq) =>
      faq.question.toLowerCase().includes(search.value.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.value.toLowerCase())
  )
})
function toggle(idx) {
  openIndex.value = openIndex.value === idx ? null : idx
}
</script>

<style scoped></style>
