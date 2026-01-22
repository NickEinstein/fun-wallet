<template>
  <div
    class="w-full max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-xl transition-colors duration-300"
  >
    <!-- Header -->
    <div
      class="flex justify-between items-center mb-4 md:mb-6 bg-white dark:bg-gray-900 p-2 px-4 md:px-2 transition-colors duration-300"
    >
      <h2 class="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-200">
        EDIT PROFILE
      </h2>
      <!-- <button
        @click="handleSave"
        :disabled="isLoading"
        class="px-4 md:px-6 py-2 bg-gray-200 text-gray-500 rounded-full text-sm md:text-base font-semibold hover:bg-gray-300 transition disabled:opacity-50"
      >
        SAVE
      </button> -->
    </div>

    <!-- Profile Image Section -->
    <div
      class="relative bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 h-32 md:h-40 rounded-t-lg flex items-center justify-center transition-colors duration-300"
    >
      <button
        class="text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100 transition"
      >
        <svg class="w-8 h-8 md:w-10 md:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>

      <!-- Profile Avatar -->
      <div class="absolute -bottom-10 md:-bottom-12 left-4 md:left-6">
        <div class="relative">
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            @change="handleImageUpload"
            class="hidden"
          />
          <div
            @click="$refs.fileInput.click()"
            v-if="profileData.profile_image"
            class="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white dark:border-gray-900 bg-white dark:bg-gray-800 cursor-pointer hover:opacity-80 transition"
          >
            <img
              :src="profileData.profile_image"
              alt="Profile"
              class="w-full h-full object-cover"
            />
          </div>
          <div
            @click="$refs.fileInput.click()"
            v-else
            class="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center border-4 border-white dark:border-gray-900 bg-[#e82264] text-white text-xl md:text-2xl font-bold cursor-pointer hover:opacity-80 transition"
          >
            {{ initials }}
          </div>
          <button
            @click="$refs.fileInput.click()"
            class="absolute bottom-0 right-0 bg-white dark:bg-gray-800 rounded-full p-1.5 md:p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <svg
              class="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Form Section -->
    <div
      class="bg-white dark:bg-gray-900 pt-12 md:pt-16 pb-6 px-4 md:px-6 space-y-4 md:space-y-6 transition-colors duration-300"
    >
      <!-- Username -->
      <div class="relative">
        <label class="block text-xs text-gray-500 dark:text-gray-300 mb-1">Username</label>
        <div class="flex items-center border-b border-gray-300 dark:border-gray-700 pb-2">
          <input
            v-model="profileData.username"
            type="text"
            class="flex-1 outline-none text-gray-800 dark:text-gray-200 bg-transparent text-sm md:text-base"
            placeholder="@username"
          />
          <svg
            class="w-4 h-4 md:w-5 md:h-5 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div class="text-xs text-gray-400 dark:text-gray-300 mt-1">
          {{ profileUrl }}
        </div>
      </div>

      <!-- Display Name -->
      <div class="relative">
        <label class="block text-xs text-gray-500 dark:text-gray-300 mb-1">Display name</label>
        <div
          class="flex items-center justify-between border-b border-gray-300 dark:border-gray-700 pb-2"
        >
          <input
            v-model="profileData.name"
            type="text"
            maxlength="40"
            class="flex-1 outline-none text-gray-800 dark:text-gray-200 bg-transparent text-sm md:text-base"
            placeholder="Your display name"
          />
          <span class="text-xs text-gray-400 dark:text-gray-300"
            >{{ profileData.name.length }}/40</span
          >
        </div>
      </div>

      <!-- Bio -->
      <div class="relative">
        <label class="block text-xs text-gray-500 dark:text-gray-300 mb-1">Bio</label>
        <div class="flex flex-col border-b border-gray-300 dark:border-gray-700 pb-2">
          <textarea
            v-model="profileData.bio"
            rows="4"
            maxlength="1000"
            class="flex-1 outline-none text-gray-800 dark:text-gray-200 bg-transparent text-sm md:text-base resize-none"
            placeholder="Tell your fans about yourself..."
          ></textarea>
          <div class="flex justify-end mt-2">
            <span class="text-xs text-gray-400 dark:text-gray-300"
              >{{ profileData.bio.length }}/1000</span
            >
          </div>
        </div>
      </div>

      <!-- Location -->
      <div class="relative">
        <label class="block text-xs text-gray-500 dark:text-gray-300 mb-1">Location</label>
        <div
          class="flex items-center justify-between border-b border-gray-300 dark:border-gray-700 pb-2"
        >
          <input
            v-model="profileData.location"
            type="text"
            maxlength="100"
            class="flex-1 outline-none text-gray-800 dark:text-gray-200 bg-transparent text-sm md:text-base"
            placeholder="Your location"
          />
          <span class="text-xs text-gray-400 dark:text-gray-300"
            >{{ profileData.location.length }}/100</span
          >
        </div>
      </div>

      <!-- Website URL -->
      <div class="relative">
        <label class="block text-xs text-gray-500 dark:text-gray-300 mb-1">Website URL</label>
        <div
          class="flex items-center justify-between border-b border-gray-300 dark:border-gray-700 pb-2"
        >
          <input
            v-model="profileData.website"
            type="url"
            maxlength="100"
            class="flex-1 outline-none text-gray-800 dark:text-gray-200 bg-transparent text-sm md:text-base"
            placeholder="https://yourwebsite.com"
          />
          <span class="text-xs text-gray-400 dark:text-gray-300"
            >{{ profileData.website.length }}/100</span
          >
        </div>
      </div>

      <!-- Amazon Wishlist -->
      <div class="relative">
        <label class="block text-xs text-gray-500 dark:text-gray-300 mb-1">Amazon Wishlist</label>
        <div
          class="flex items-center justify-between border-b border-gray-300 dark:border-gray-700 pb-2"
        >
          <input
            v-model="profileData.amazonWishlist"
            type="url"
            maxlength="100"
            class="flex-1 outline-none text-gray-800 dark:text-gray-200 bg-transparent text-sm md:text-base"
            placeholder="https://amazon.com/wishlist/..."
          />
          <span class="text-xs text-gray-400 dark:text-gray-300"
            >{{ profileData.amazonWishlist.length }}/100</span
          >
        </div>
      </div>

      <!-- Social Media Links Section -->
      <div class="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
        <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">Social Media</h3>

        <div class="space-y-4">
          <div
            v-for="platform in [
              {
                key: 'twitter',
                label: 'X (Twitter)',
                icon: 'fa-brands fa-x-twitter',
                placeholder: 'https://x.com/username'
              },
              {
                key: 'instagram',
                label: 'Instagram',
                icon: 'fa-brands fa-instagram',
                placeholder: 'https://instagram.com/username'
              },
              {
                key: 'thread',
                label: 'Threads',
                icon: 'fa-brands fa-threads',
                placeholder: 'https://threads.net/@username'
              },
              {
                key: 'snapchat',
                label: 'Snapchat',
                icon: 'fa-brands fa-snapchat',
                placeholder: 'https://snapchat.com/add/username'
              },
              {
                key: 'tiktok',
                label: 'TikTok',
                icon: 'fa-brands fa-tiktok',
                placeholder: 'https://tiktok.com/@username'
              },
              {
                key: 'facebook',
                label: 'Facebook',
                icon: 'fa-brands fa-facebook',
                placeholder: 'https://facebook.com/username'
              }
            ]"
            :key="platform.key"
          >
            <label class="block text-xs text-gray-500 dark:text-gray-300 mb-1">{{
              platform.label
            }}</label>
            <div
              class="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-2 border border-gray-200 dark:border-gray-700 focus-within:ring-2 focus-within:ring-[#e82264] transition-colors duration-300"
            >
              <font-awesome-icon
                :icon="platform.icon"
                class="text-xl text-gray-500 dark:text-gray-400"
              />
              <input
                v-model="socialMedia[platform.key]"
                @input="updateSocialMedia(platform.key)"
                type="url"
                maxlength="100"
                :placeholder="platform.placeholder"
                class="flex-1 bg-transparent outline-none text-gray-800 dark:text-gray-200 text-sm md:text-base px-2"
              />
              <span class="text-xs text-gray-400 dark:text-gray-300"
                >{{ socialMedia[platform.key]?.length || 0 }}/100</span
              >
            </div>
          </div>
        </div>
      </div>
      <!-- End Social Media Links Section -->
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { post } from '@/api-services/fetchDocuments'

const router = useRouter()
const userStore = useUserStore()
const isLoading = ref(false)
const fileInput = ref(null)

const profileData = ref({
  username: '',
  name: '',
  bio: '',
  location: '',
  website: '',
  amazonWishlist: '',
  profile_image: ''
})

const socialMedia = ref({
  twitter: '',
  instagram: '',
  thread: '',
  snapchat: '',
  tiktok: '',
  facebook: ''
})

const user = ref(null)

onMounted(() => {
  if (userStore.user) {
    user.value = userStore.user
    profileData.value = {
      username: userStore.user.username || '',
      name: userStore.user.name || '',
      bio: userStore.user.bio || '',
      location: userStore.user.relationships?.city || '',
      website: userStore.user.website || '',
      amazonWishlist: userStore.user.amazon_wishlist || '',
      profile_image: userStore.user.profile_image || ''
    }

    // Load social media from settings
    if (userStore.settings) {
      socialMedia.value = {
        twitter: userStore.settings.twitter || '',
        instagram: userStore.settings.instagram || '',
        thread: userStore.settings.thread || '',
        snapchat: userStore.settings.snapchat || '',
        tiktok: userStore.settings.tiktok || '',
        facebook: userStore.settings.facebook || ''
      }
    }
  }
})

const initials = computed(() => {
  if (!profileData.value.name) return ''
  const parts = profileData.value.name.trim().split(' ')
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
})

const profileUrl = computed(() => {
  return `https://fansngage.com/${profileData.value.username || 'username'}`
})

// Debounce timer for auto-save
let debounceTimer = null

async function handleImageUpload(event) {
  const file = event.target.files[0]
  if (!file) return

  // Validate file type
  if (!file.type.startsWith('image/')) {
    alert('Please select an image file')
    return
  }

  // Validate file size (e.g., max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    alert('Image size should be less than 5MB')
    return
  }

  isLoading.value = true
  try {
    // Create FormData
    const formData = new FormData()
    formData.append('profileImage', file)

    // Upload image

    const response = await post({
      endpoint: '/users/profile/image',
      body: formData,
      auth: true
      // multipart: true
    })

    if (response?.data?.success) {
      // Update profile image in local state
      profileData.value.profile_image =
        response.data.data.profile_image || response.data.data.image_url

      // Update user store
      userStore.updateUser({
        profile_image: profileData.value.profile_image
      })

      alert('Profile image updated successfully!')
    } else {
      alert(response?.data?.message || 'Failed to upload image')
    }
  } catch (error) {
    console.error('Error uploading image:', error)
    alert('An error occurred while uploading the image')
  } finally {
    isLoading.value = false
  }
}

function updateSocialMedia(platform) {
  // Clear existing timer
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }

  // Set new timer to update store after 500ms of no typing
  debounceTimer = setTimeout(() => {
    // Update store directly without API call
    userStore.updateSettings({
      [platform]: socialMedia.value[platform]
    })
  }, 500)
}

const handleSave = async () => {
  isLoading.value = true
  try {
    // Save social media links
    const result = await userStore.updatePartialSettings({
      twitter: socialMedia.value.twitter,
      instagram: socialMedia.value.instagram,
      thread: socialMedia.value.thread,
      snapchat: socialMedia.value.snapchat,
      tiktok: socialMedia.value.tiktok,
      facebook: socialMedia.value.facebook
    })

    if (result.success) {
      // Update user profile data
      if (userStore.user) {
        userStore.updateUser({
          username: profileData.value.username,
          name: profileData.value.name,
          bio: profileData.value.bio,
          website: profileData.value.website,
          amazon_wishlist: profileData.value.amazonWishlist
        })
      }
      alert('Profile saved successfully!')
    } else {
      alert('Failed to save profile: ' + result.error)
    }
  } catch (error) {
    console.error('Error saving profile:', error)
    alert('An error occurred while saving profile')
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
input::placeholder,
textarea::placeholder {
  color: #9ca3af;
}
</style>
