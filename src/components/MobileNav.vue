<template>
  <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden">
    <div class="flex items-center justify-around h-16 px-2">
      <!-- Home -->
      <button
        @click="navigateTo('/dashboard')"
        :class="[
          'flex flex-col items-center justify-center flex-1 h-full transition',
          isActive('/') ? 'text-[#e82264]' : 'text-gray-600 hover:text-gray-800'
        ]"
      >
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      </button>

      <!-- Notifications -->
      <button
        @click="navigateTo('/notifications')"
        :class="[
          'flex flex-col items-center justify-center flex-1 h-full transition relative',
          isActive('/notifications') ? 'text-[#e82264]' : 'text-gray-600 hover:text-gray-800'
        ]"
      >
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        <!-- Notification Badge -->
        <span
          v-if="notificationCount > 0"
          class="absolute top-2 right-1/4 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
        >
          {{ notificationCount > 9 ? '9+' : notificationCount }}
        </span>
      </button>

      <!-- New Post -->
      <button
        @click="openNewPost"
        class="flex flex-col items-center justify-center flex-1 h-full text-gray-600 hover:text-gray-800 transition"
      >
        <div
          class="w-12 h-12 bg-[#e82264] rounded-full flex items-center justify-center shadow-lg hover:bg-[#d01f56] transition"
        >
          <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
      </button>

      <!-- Messages -->
      <button
        @click="navigateTo('/messages')"
        :class="[
          'flex flex-col items-center justify-center flex-1 h-full transition relative',
          isActive('/messages') ? 'text-[#e82264]' : 'text-gray-600 hover:text-gray-800'
        ]"
      >
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        <!-- Message Badge -->
        <span
          v-if="messageCount > 0"
          class="absolute top-2 right-1/4 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
        >
          {{ messageCount > 9 ? '9+' : messageCount }}
        </span>
      </button>

      <!-- Profile -->
      <button
        @click="navigateTo('/profile')"
        :class="[
          'flex flex-col items-center justify-center flex-1 h-full transition',
          isActive('/profile') ? 'text-[#e82264]' : 'text-gray-600 hover:text-gray-800'
        ]"
      >
        <div
          v-if="user?.profile_image"
          class="w-7 h-7 rounded-full overflow-hidden border-2"
          :class="isActive('/profile') ? 'border-[#e82264]' : 'border-gray-300'"
        >
          <img :src="user.profile_image" alt="Profile" class="w-full h-full object-cover" />
        </div>
        <div
          v-else
          class="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold border-2"
          :class="
            isActive('/profile') ? 'bg-[#e82264] border-[#e82264]' : 'bg-gray-400 border-gray-300'
          "
        >
          {{ userInitials }}
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const user = computed(() => userStore.user)
const notificationCount = computed(() => 0) // TODO: Connect to actual notification count
const messageCount = computed(() => 0) // TODO: Connect to actual message count

const userInitials = computed(() => {
  if (!user.value?.name) return 'U'
  const parts = user.value.name.trim().split(' ')
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
})

function isActive(path) {
  if (path === '/') {
    return route.path === '/' || route.path === '/home'
  }
  return route.path.startsWith(path)
}

function navigateTo(path) {
  router.push(path)
}

function openNewPost() {
  // TODO: Open new post modal or navigate to new post page
  router.push('/create-post')
}
</script>

<style scoped>
/* Add safe area padding for devices with notches */
@supports (padding-bottom: env(safe-area-inset-bottom)) {
  .fixed.bottom-0 {
    padding-bottom: env(safe-area-inset-bottom);
  }
}
</style>
