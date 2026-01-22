<template>
  <div class="w-full max-w-3xl mx-auto">
    <div class="p-2 bg-white dark:bg-gray-900 transition-colors">
      <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
        PRIVACY AND SAFETY
      </h2>
      <hr class="border-gray-200 dark:border-gray-700 transition-colors" />
    </div>

    <!-- Profile Section -->
    <div class="bg-white dark:bg-gray-900 border-b dark:border-gray-700 transition-colors">
      <div class="px-6 py-4">
        <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">Profile</h3>

        <!-- Show Activity Status -->
        <div class="flex items-center justify-between py-3">
          <div>
            <div class="text-sm text-gray-800 dark:text-gray-100">Show activity status</div>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              v-model="privacySettings.showActivityStatus"
              class="sr-only peer"
              @change="saveSetting('showActivityStatus')"
            />
            <div
              class="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-900 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white dark:after:bg-gray-900 after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500 dark:peer-checked:bg-blue-600"
            ></div>
          </label>
        </div>

        <!-- Show Subscription Offers -->
        <div
          class="flex items-center justify-between py-3 border-t border-gray-200 dark:border-gray-700"
        >
          <div>
            <div class="text-sm text-gray-800 dark:text-gray-100">Show subscription offers</div>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              v-model="privacySettings.showSubscriptionOffers"
              class="sr-only peer"
              @change="saveSetting('showSubscriptionOffers')"
            />
            <div
              class="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-900 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white dark:after:bg-gray-900 after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500 dark:peer-checked:bg-blue-600"
            ></div>
          </label>
        </div>
      </div>
    </div>

    <!-- Posts Section -->
    <div class="bg-white dark:bg-gray-900 border-b dark:border-gray-700 mt-6 transition-colors">
      <div class="px-6 py-4">
        <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">Posts</h3>

        <!-- Who Can Comment -->
        <button
          @click="toggleSection('comments')"
          class="w-full flex items-center justify-between py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <div>
            <div class="text-sm text-gray-800 dark:text-gray-100">
              Who can comment on your posts
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400">
              {{ privacySettings.whoCanComment }}
            </div>
          </div>
          <svg
            class="w-5 h-5 text-gray-400 dark:text-gray-500"
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
        </button>
        <div v-if="expandedSection === 'comments'" class="px-4 pb-4 space-y-3">
          <label class="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              value="Everyone"
              v-model="privacySettings.whoCanComment"
              class="w-4 h-4 text-[#e82264] focus:ring-[#e82264] dark:bg-gray-800 dark:border-gray-700"
              @change="saveSetting('whoCanComment')"
            />
            <span class="text-sm text-gray-800 dark:text-gray-100">Everyone</span>
          </label>
          <label class="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              value="Subscribers only"
              v-model="privacySettings.whoCanComment"
              class="w-4 h-4 text-[#e82264] focus:ring-[#e82264] dark:bg-gray-800 dark:border-gray-700"
              @change="saveSetting('whoCanComment')"
            />
            <span class="text-sm text-gray-800 dark:text-gray-100">Subscribers only</span>
          </label>
          <label class="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              value="No one"
              v-model="privacySettings.whoCanComment"
              class="w-4 h-4 text-[#e82264] focus:ring-[#e82264] dark:bg-gray-800 dark:border-gray-700"
              @change="saveSetting('whoCanComment')"
            />
            <span class="text-sm text-gray-800 dark:text-gray-100">No one</span>
          </label>
        </div>

        <!-- Watermark Posts -->
        <div
          class="flex items-center justify-between py-3 border-t border-gray-200 dark:border-gray-700"
        >
          <div>
            <div class="text-sm text-gray-800 dark:text-gray-100">Watermark posts</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">
              Add watermark to protect your content
            </div>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              v-model="privacySettings.watermarkPosts"
              class="sr-only peer"
              @change="saveSetting('watermarkPosts')"
            />
            <div
              class="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-900 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white dark:after:bg-gray-900 after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500 dark:peer-checked:bg-blue-600"
            ></div>
          </label>
        </div>
      </div>
    </div>

    <!-- Messages Section -->
    <div class="bg-white dark:bg-gray-900 border-b dark:border-gray-700 mt-6 transition-colors">
      <div class="px-6 py-4">
        <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">Messages</h3>

        <!-- Who Can Message You -->
        <button
          @click="toggleSection('messages')"
          class="w-full flex items-center justify-between py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <div>
            <div class="text-sm text-gray-800 dark:text-gray-100">Who can send you messages</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">
              {{ privacySettings.whoCanMessage }}
            </div>
          </div>
          <svg
            class="w-5 h-5 text-gray-400 dark:text-gray-500"
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
        </button>
        <div v-if="expandedSection === 'messages'" class="px-4 pb-4 space-y-3">
          <label class="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              value="Everyone"
              v-model="privacySettings.whoCanMessage"
              class="w-4 h-4 text-[#e82264] focus:ring-[#e82264] dark:bg-gray-800 dark:border-gray-700"
              @change="saveSetting('whoCanMessage')"
            />
            <span class="text-sm text-gray-800 dark:text-gray-100">Everyone</span>
          </label>
          <label class="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              value="Subscribers only"
              v-model="privacySettings.whoCanMessage"
              class="w-4 h-4 text-[#e82264] focus:ring-[#e82264] dark:bg-gray-800 dark:border-gray-700"
              @change="saveSetting('whoCanMessage')"
            />
            <span class="text-sm text-gray-800 dark:text-gray-100">Subscribers only</span>
          </label>
          <label class="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              value="No one"
              v-model="privacySettings.whoCanMessage"
              class="w-4 h-4 text-[#e82264] focus:ring-[#e82264] dark:bg-gray-800 dark:border-gray-700"
              @change="saveSetting('whoCanMessage')"
            />
            <span class="text-sm text-gray-800 dark:text-gray-100">No one</span>
          </label>
        </div>
      </div>
    </div>

    <!-- Blocking Section -->
    <div class="bg-white dark:bg-gray-900 border-b dark:border-gray-700 mt-6 transition-colors">
      <div class="px-6 py-4">
        <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">Blocking</h3>

        <!-- Blocked Users -->
        <button
          @click="toggleSection('blocked')"
          class="w-full flex items-center justify-between py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <div>
            <div class="text-sm text-gray-800 dark:text-gray-100">Blocked users</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">
              {{ blockedUsers.length }} users blocked
            </div>
          </div>
          <svg
            class="w-5 h-5 text-gray-400 dark:text-gray-500"
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
        </button>
        <div v-if="expandedSection === 'blocked'" class="px-4 pb-4 space-y-3">
          <div
            v-if="blockedUsers.length === 0"
            class="text-sm text-gray-500 dark:text-gray-400 py-2"
          >
            No blocked users
          </div>
          <div
            v-for="user in blockedUsers"
            :key="user.id"
            class="flex items-center justify-between py-2"
          >
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700"></div>
              <div>
                <div class="text-sm font-medium text-gray-800 dark:text-gray-100">
                  {{ user.name }}
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400">@{{ user.username }}</div>
              </div>
            </div>
            <button
              @click="unblockUser(user.id)"
              class="px-4 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Unblock
            </button>
          </div>
        </div>

        <!-- Restricted Users -->
        <button
          @click="toggleSection('restricted')"
          class="w-full flex items-center justify-between py-3 text-left border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <div>
            <div class="text-sm text-gray-800 dark:text-gray-100">Restricted users</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">
              {{ restrictedUsers.length }} users restricted
            </div>
          </div>
          <svg
            class="w-5 h-5 text-gray-400 dark:text-gray-500"
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
        </button>
        <div v-if="expandedSection === 'restricted'" class="px-4 pb-4 space-y-3">
          <div
            v-if="restrictedUsers.length === 0"
            class="text-sm text-gray-500 dark:text-gray-400 py-2"
          >
            No restricted users
          </div>
          <div
            v-for="user in restrictedUsers"
            :key="user.id"
            class="flex items-center justify-between py-2"
          >
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700"></div>
              <div>
                <div class="text-sm font-medium text-gray-800 dark:text-gray-100">
                  {{ user.name }}
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400">@{{ user.username }}</div>
              </div>
            </div>
            <button
              @click="unrestrictUser(user.id)"
              class="px-4 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Unrestrict
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Preferences Section -->
    <div class="bg-white dark:bg-gray-900 border-b dark:border-gray-700 mt-6 transition-colors">
      <div class="px-6 py-4">
        <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Content preferences
        </h3>

        <!-- Show Sensitive Content -->
        <div class="flex items-center justify-between py-3">
          <div>
            <div class="text-sm text-gray-800 dark:text-gray-100">Show sensitive content</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">
              Display content marked as sensitive
            </div>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              v-model="privacySettings.showSensitiveContent"
              class="sr-only peer"
              @change="saveSetting('showSensitiveContent')"
            />
            <div
              class="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-900 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white dark:after:bg-gray-900 after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500 dark:peer-checked:bg-blue-600"
            ></div>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { updateSettings } from '@/api-services/settingsApi'

const userStore = useUserStore()
const expandedSection = ref(null)
const privacySettings = ref({
  showActivityStatus: true,
  showSubscriptionOffers: true,
  whoCanComment: 'Everyone',
  watermarkPosts: false,
  whoCanMessage: 'Subscribers only',
  showSensitiveContent: false
})

const blockedUsers = ref([])
const restrictedUsers = ref([])

onMounted(() => {
  if (userStore.userSettings) {
    // Load privacy settings from user settings if available
    const settings = userStore.userSettings
    // Map existing settings to component state
    privacySettings.value = {
      showActivityStatus: settings.show_activity_status ?? true,
      showSubscriptionOffers: settings.show_subscription_offers ?? true,
      whoCanComment: settings.who_can_comment ?? 'Everyone',
      watermarkPosts: settings.watermark_posts ?? false,
      whoCanMessage: settings.who_can_message ?? 'Subscribers only',
      showSensitiveContent: settings.show_sensitive_content ?? false
    }
  }
})

function toggleSection(section) {
  expandedSection.value = expandedSection.value === section ? null : section
}

async function saveSetting(setting) {
  try {
    // Map component setting names to API field names
    const settingMap = {
      showActivityStatus: 'show_activity_status',
      showSubscriptionOffers: 'show_subscription_offers',
      whoCanComment: 'who_can_comment',
      watermarkPosts: 'watermark_posts',
      whoCanMessage: 'who_can_message',
      showSensitiveContent: 'show_sensitive_content'
    }

    const apiField = settingMap[setting]
    const response = await updateSettings({
      [apiField]: privacySettings.value[setting]
    })

    if (response?.data?.success) {
      userStore.updateSettings({ [apiField]: privacySettings.value[setting] })
    } else {
      console.error('Failed to save setting')
    }
  } catch (error) {
    console.error('Error saving setting:', error)
  }
}

function unblockUser(userId) {
  blockedUsers.value = blockedUsers.value.filter((u) => u.id !== userId)
  console.log(`Unblocked user: ${userId}`)
  // TODO: Implement API call to unblock user
}

function unrestrictUser(userId) {
  restrictedUsers.value = restrictedUsers.value.filter((u) => u.id !== userId)
  console.log(`Unrestricted user: ${userId}`)
  // TODO: Implement API call to unrestrict user
}
</script>

<style scoped></style>
