<template>
  <div class="flex w-full h-full">
    <!-- Sidebar -->
    <div
      class="w-full md:w-64 bg-white dark:bg-gray-900 md:border-r dark:md:border-gray-700 min-h-screen transition-colors h-full"
      :class="{ 'hidden md:block': showContent }"
    >
      <div
        class="flex items-center h-14 px-4 md:px-6 border-b bg-white dark:bg-gray-900 dark:border-gray-700 sticky md:top-0 z-10 transition-colors"
      >
        <button @click="handleBack" class="mr-4 focus:outline-none">
          <svg
            class="w-5 h-5 md:w-6 md:h-6 text-gray-700 dark:text-gray-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <span class="text-base md:text-lg font-bold tracking-wide text-gray-800 dark:text-gray-100"
          >SETTINGS</span
        >
      </div>
      <div class="flex flex-col pt-4 md:pt-8">
        <button
          v-for="item in settingsItems"
          :key="item.page"
          @click="goToPage(item.page)"
          :class="[
            'text-left px-4 md:px-6 py-3 w-full text-sm md:text-base font-medium transition-colors',
            page === item.page
              ? 'bg-[#e82264]/10 dark:bg-[#e82264]/20 text-[#e82264] dark:text-[#e82264]'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200'
          ]"
        >
          {{ item.label }}

          <span class="float-right">
            <svg
              class="w-4 h-4 md:w-5 md:h-5 inline ml-2"
              :class="{
                'text-[#e82264] dark:text-[#e82264]': page === item.page,
                'text-gray-400 dark:text-gray-500': page !== item.page
              }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div
      class="flex-1 w-full md:w-auto bg-white dark:bg-gray-900 transition-colors"
      :class="{ 'hidden md:block': !showContent }"
    >
      <!-- Mobile Back Button -->
      <div
        class="md:hidden flex items-center h-14 px-4 border-b bg-white dark:bg-gray-900 dark:border-gray-700 sticky md:top-14 z-10 transition-colors"
      >
        <button @click="showContent = false" class="mr-4 focus:outline-none">
          <svg
            class="w-5 h-5 text-gray-700 dark:text-gray-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <span class="text-base font-bold tracking-wide text-gray-800 dark:text-gray-100">{{
          currentPageLabel
        }}</span>
      </div>

      <div
        class="px-4 md:px-6 pt-1 border-t dark:border-gray-700 absolute top-0 right-4 md:right-10 flex justify-end z-[100] transition-colors"
      >
        <button
          @click="submitAllSettings"
          :disabled="isSaving"
          class="w-auto px-4 md:px-6 py-2 md:py-3 text-sm md:text-base bg-[#e82264] text-white font-semibold rounded-lg hover:bg-[#d01f56] transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase"
        >
          {{ isSaving ? 'Saving...' : 'Save Settings' }}
        </button>
      </div>
      <component :is="currentComponent" />
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import ProfileSettings from '@/components/settings/ProfileSettings.vue'
import AccountSettings from '@/components/settings/AccountSettings.vue'
import PrivacySettings from '@/components/settings/PrivacySettings.vue'
import SubscriptionSettings from '@/components/settings/SubscriptionSettings.vue'
import NotificationSettings from '@/components/settings/NotificationSettings.vue'
import VerificationSettings from '@/components/settings/VerificationSettings.vue'
import { useUserStore } from '@/stores/userStore'

// Dummy components for demonstration
// const GeneralSettings = {
//   template: '<div><h2 class="text-2xl font-bold mb-4">General</h2><p>General settings.</p></div>'
// }
// const DisplaySettings = {
//   template: '<div><h2 class="text-2xl font-bold mb-4">Display</h2><p>Display preferences.</p></div>'
// }

let user = null
try {
  const userData = localStorage.getItem('user')
  if (userData) {
    user = JSON.parse(userData).user
  }
} catch (e) {
  user = null
}

let settingsItems = [
  { label: 'Profile', page: 'profile', component: ProfileSettings },
  { label: 'Account', page: 'account', component: AccountSettings },
  { label: 'Privacy and safety', page: 'privacy', component: PrivacySettings },
  { label: 'Subscription price', page: 'subscription', component: SubscriptionSettings },
  { label: 'Notifications', page: 'notifications', component: NotificationSettings },
  { label: 'KYC Verification', page: 'verification', component: VerificationSettings }
  // { label: 'General', page: 'general', component: GeneralSettings },
  // { label: 'Display', page: 'display', component: DisplaySettings }
]

if (user && user.role === 'user') {
  settingsItems = settingsItems.filter((item) => item.label !== 'Subscription price')
}

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const isSaving = ref(false)
const showContent = ref(false)

const page = computed(() => route.query.page || 'profile')

const currentComponent = computed(() => {
  const found = settingsItems.find((item) => item.page === page.value)
  return found ? found.component : ProfileSettings
})

const currentPageLabel = computed(() => {
  const found = settingsItems.find((item) => item.page === page.value)
  return found ? found.label : 'Settings'
})

function goToPage(pageName) {
  router.replace({ path: '/settings', query: { page: pageName } })
  showContent.value = true // Show content on mobile when a page is selected
}

function handleBack() {
  if (window.innerWidth < 768 && showContent.value) {
    // On mobile, if showing content, go back to sidebar
    showContent.value = false
  } else {
    // Otherwise, go back in browser history
    router.back()
  }
}

async function submitAllSettings() {
  isSaving.value = true
  try {
    const result = await userStore.saveSettings()
    if (result.success) {
      alert('All settings saved successfully!')
    } else {
      alert('Failed to save settings: ' + result.error)
    }
  } catch (error) {
    console.error('Error saving settings:', error)
    alert('An error occurred while saving settings')
  } finally {
    isSaving.value = false
  }
}
</script>

<style scoped></style>
