<template>
  <div class="w-full max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 transition-colors">
    <!-- Header with Back Arrow -->
    <div class="flex items-center mb-6">
      <svg
        class="w-5 h-5 text-gray-700 dark:text-gray-200 mr-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100 uppercase">
        Push Notifications
      </h2>
    </div>

    <!-- Push Notifications Toggle -->
    <div
      class="bg-white dark:bg-gray-900 border-b dark:border-gray-700 py-6 px-2 transition-colors"
    >
      <div class="flex items-center justify-between">
        <div class="flex-1">
          <h3 class="text-base font-semibold text-gray-800 dark:text-gray-100 mb-1">
            Push notifications
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Get push notifications to find out what's going on when you're not on FansNgage. You can
            turn them off anytime.
          </p>
        </div>
        <div class="ml-6">
          <label class="relative inline-flex items-center cursor-pointer">
            <input
              v-model="pushNotificationsEnabled"
              @change="togglePushNotifications"
              type="checkbox"
              class="sr-only peer"
            />
            <div
              class="w-11 h-6 bg-gray-300 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#e82264] dark:peer-focus:ring-pink-900 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white dark:after:bg-gray-900 after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#e82264] dark:peer-checked:bg-pink-700"
            ></div>
          </label>
        </div>
      </div>
    </div>

    <!-- Two-Factor Authentication Section -->
    <div
      class="bg-white dark:bg-gray-900 border-b dark:border-gray-700 py-6 px-2 transition-colors"
    >
      <h3 class="text-base font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Two-Factor Authentication
      </h3>

      <!-- 2FA Enabled Toggle -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex-1">
          <label class="text-sm font-medium text-gray-700 dark:text-gray-200"
            >Enable Two-Factor Authentication</label
          >
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Add an extra layer of security to your account
          </p>
        </div>
        <div class="ml-6">
          <label class="relative inline-flex items-center cursor-pointer">
            <input
              v-model="twoFaEnabled"
              @change="updateTwoFaEnabled"
              type="checkbox"
              class="sr-only peer"
            />
            <div
              class="w-11 h-6 bg-gray-300 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#e82264] dark:peer-focus:ring-pink-900 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white dark:after:bg-gray-900 after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#e82264] dark:peer-checked:bg-pink-700"
            ></div>
          </label>
        </div>
      </div>

      <!-- 2FA Type Selection -->
      <div v-if="twoFaEnabled" class="mb-4">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
          Two-Factor Authentication Method
        </label>
        <select
          v-model="twoFaType"
          @change="updateTwoFaType"
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-[#e82264] focus:border-[#e82264] outline-none transition-colors"
        >
          <option value="email">Email</option>
          <option value="sms">SMS</option>
          <option value="authenticator">Authenticator App</option>
        </select>
      </div>

      <!-- PIN Section -->
      <div v-if="twoFaEnabled" class="mb-4">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
          >Security PIN</label
        >
        <input
          v-model="pin"
          @input="updatePin"
          type="text"
          maxlength="6"
          pattern="[0-9]*"
          placeholder="Enter 4-6 digit PIN"
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-[#e82264] focus:border-[#e82264] outline-none transition-colors"
        />
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Create a PIN for additional security (4-6 digits)
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const pushNotificationsEnabled = ref(false)
const twoFaEnabled = ref(false)
const twoFaType = ref('email')
const pin = ref('')

let debounceTimer = null

onMounted(() => {
  // Load settings from store
  if (userStore.settings) {
    pushNotificationsEnabled.value = userStore.settings.notification || false
    twoFaEnabled.value = userStore.settings.two_fa_enabled || false
    twoFaType.value = userStore.settings.two_fa_type || 'email'
    pin.value = userStore.settings.pin || ''
  }
})

function togglePushNotifications() {
  // Update store immediately
  userStore.updateSettings({
    notification: pushNotificationsEnabled.value
  })
}

function updateTwoFaEnabled() {
  userStore.updateSettings({
    two_fa_enabled: twoFaEnabled.value
  })
}

function updateTwoFaType() {
  userStore.updateSettings({
    two_fa_type: twoFaType.value
  })
}

function updatePin() {
  if (debounceTimer) clearTimeout(debounceTimer)

  debounceTimer = setTimeout(() => {
    userStore.updateSettings({
      pin: pin.value
    })
  }, 500)
}
</script>

<style scoped></style>
