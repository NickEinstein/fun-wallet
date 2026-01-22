<template>
  <div class="w-full max-w-3xl mx-auto">
    <div class="p-2 bg-white dark:bg-gray-900 transition-colors">
      <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6">ACCOUNT</h2>
      <hr class="border-gray-200 dark:border-gray-700 transition-colors" />
    </div>

    <!-- Account Info Section -->
    <div class="bg-white dark:bg-gray-900 border-b dark:border-gray-700 transition-colors">
      <div class="px-6 py-4">
        <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">Account info</h3>

        <!-- Username -->
        <button
          @click="toggleSection('username')"
          class="w-full flex items-center justify-between py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <div>
            <div class="text-sm text-gray-800 dark:text-gray-100">Username</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">
              {{ accountData.username || '@username' }}
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
        <div v-if="expandedSection === 'username'" class="px-4 pb-4 space-y-4">
          <input
            v-model="accountData.username"
            type="text"
            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-[#e82264] focus:border-[#e82264] outline-none transition-colors"
            placeholder="@username"
          />
          <button
            @click="saveSection('username')"
            class="px-6 py-2 bg-[#e82264] text-white rounded-lg font-semibold hover:bg-[#d01f56] transition-colors"
          >
            Save
          </button>
        </div>

        <!-- Email -->
        <button
          @click="toggleSection('email')"
          class="w-full flex items-center justify-between py-3 text-left border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <div>
            <div class="text-sm text-gray-800 dark:text-gray-100">Email</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">
              {{ accountData.email || 'email@example.com' }}
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
        <div v-if="expandedSection === 'email'" class="px-4 pb-4 space-y-4">
          <input
            v-model="accountData.email"
            type="email"
            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-[#e82264] focus:border-[#e82264] outline-none transition-colors"
            placeholder="email@example.com"
          />
          <button
            @click="saveSection('email')"
            class="px-6 py-2 bg-[#e82264] text-white rounded-lg font-semibold hover:bg-[#d01f56] transition-colors"
          >
            Save
          </button>
        </div>

        <!-- Phone Number -->
        <button
          @click="toggleSection('phone')"
          class="w-full flex items-center justify-between py-3 text-left border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <div>
            <div class="text-sm text-gray-800 dark:text-gray-100">Phone number</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">
              {{ accountData.phone_number || 'Not set' }}
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
        <div v-if="expandedSection === 'phone'" class="px-4 pb-4 space-y-4">
          <input
            v-model="accountData.phone_number"
            type="tel"
            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-[#e82264] focus:border-[#e82264] outline-none transition-colors"
            placeholder="+1234567890"
          />
          <button
            @click="saveSection('phone')"
            class="px-6 py-2 bg-[#e82264] text-white rounded-lg font-semibold hover:bg-[#d01f56] transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>

    <!-- Linked Accounts Section -->
    <div class="bg-white dark:bg-gray-900 border-b dark:border-gray-700 mt-6 transition-colors">
      <div class="px-6 py-4">
        <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">Linked accounts</h3>

        <!-- X Account -->
        <button
          @click="toggleSection('xaccount')"
          class="w-full flex items-center justify-between py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <div>
            <div class="text-sm text-gray-800 dark:text-gray-100">X account</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">
              {{ accountData.twitter || 'Not connected' }}
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
        <div v-if="expandedSection === 'xaccount'" class="px-4 pb-4 space-y-4">
          <input
            v-model="accountData.twitter"
            type="text"
            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-[#e82264] focus:border-[#e82264] outline-none transition-colors"
            placeholder="@twitter_handle"
          />
          <button
            @click="saveSection('xaccount')"
            class="px-6 py-2 bg-[#e82264] text-white rounded-lg font-semibold hover:bg-[#d01f56] transition-colors"
          >
            Save
          </button>
        </div>

        <!-- Google Account -->
        <button
          @click="toggleSection('google')"
          class="w-full flex items-center justify-between py-3 text-left border-t hover:bg-gray-50 transition"
        >
          <div>
            <div class="text-sm text-gray-800">Google account</div>
            <div class="text-xs text-gray-500">
              {{ accountData.google_email || 'Not connected' }}
            </div>
          </div>
          <svg class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
        <div v-if="expandedSection === 'google'" class="px-4 pb-4 space-y-4">
          <input
            v-model="accountData.google_email"
            type="email"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e82264] focus:border-[#e82264] outline-none"
            placeholder="google@example.com"
          />
          <button
            @click="saveSection('google')"
            class="px-6 py-2 bg-[#e82264] text-white rounded-lg font-semibold hover:bg-[#d01f56] transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>

    <!-- Social Media Links Section -->
    <div class="pt-6 mt-6">
      <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">
        Social Media Links
      </h3>
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
            <span class="text-xs text-gray-400 dark:text-gray-300">
              {{ socialMedia[platform.key]?.length || 0 }}/100
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- End Social Media Links Section -->

    <!-- Connected Accounts Section -->
    <div class="bg-white dark:bg-gray-900 border-b dark:border-gray-700 mt-6 transition-colors">
      <div class="px-6 py-4">
        <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Connected accounts
        </h3>

        <!-- Connect Another OnlyFans Account -->
        <button
          @click="toggleSection('onlyfans')"
          class="w-full flex items-center justify-between py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <div>
            <div class="text-sm text-gray-800 dark:text-gray-100">
              Connect another account
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
        <div v-if="expandedSection === 'onlyfans'" class="px-4 pb-4 space-y-4">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Connect your other account to manage multiple profiles.
          </p>
          <button
            @click="connectOnlyFans"
            class="px-6 py-2 bg-[#e82264] text-white rounded-lg font-semibold hover:bg-[#d01f56] transition-colors"
          >
            Connect Account
          </button>
        </div>
      </div>
    </div>

    <!-- Security Section -->
    <div class="bg-white dark:bg-gray-900 border-b dark:border-gray-700 mt-6 transition-colors">
      <div class="px-6 py-4">
        <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">Security</h3>

        <!-- Password -->
        <button
          @click="toggleSection('password')"
          class="w-full flex items-center justify-between py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <div>
            <div class="text-sm text-gray-800 dark:text-gray-100">Password</div>
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
        <div v-if="expandedSection === 'password'" class="px-4 pb-4 space-y-4">
          <input
            v-model="passwordData.current"
            type="password"
            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-[#e82264] focus:border-[#e82264] outline-none transition-colors"
            placeholder="Current password"
          />
          <input
            v-model="passwordData.new"
            type="password"
            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-[#e82264] focus:border-[#e82264] outline-none transition-colors"
            placeholder="New password"
          />
          <input
            v-model="passwordData.confirm"
            type="password"
            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-[#e82264] focus:border-[#e82264] outline-none transition-colors"
            placeholder="Confirm new password"
          />
          <button
            @click="saveSection('password')"
            class="px-6 py-2 bg-[#e82264] text-white rounded-lg font-semibold hover:bg-[#d01f56] transition-colors"
          >
            Update Password
          </button>
        </div>

        <!-- Login Sessions -->
        <button
          @click="toggleSection('sessions')"
          class="w-full flex items-center justify-between py-3 text-left border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <div>
            <div class="text-sm text-gray-800 dark:text-gray-100">Login sessions</div>
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
        <div v-if="expandedSection === 'sessions'" class="px-4 pb-4 space-y-4">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Manage your active login sessions across devices.
          </p>
          <button
            @click="viewSessions"
            class="px-6 py-2 bg-[#e82264] text-white rounded-lg font-semibold hover:bg-[#d01f56] transition-colors"
          >
            View Sessions
          </button>
        </div>

        <!-- Two-Step Authentication -->
        <button
          @click="toggleSection('2fa')"
          class="w-full flex items-center justify-between py-3 text-left border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <div>
            <div class="text-sm text-gray-800 dark:text-gray-100">Two-Step Authentication</div>
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
        <div v-if="expandedSection === '2fa'" class="px-4 pb-4 space-y-4">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Enable two-step authentication for extra security.
          </p>
          <button
            @click="toggle2FA"
            class="px-6 py-2 bg-[#e82264] text-white rounded-lg font-semibold hover:bg-[#d01f56] transition-colors"
          >
            {{ accountData.two_fa_enabled ? 'Disable' : 'Enable' }} 2FA
          </button>
        </div>

        <!-- Passwordless Sign In -->
        <button
          @click="toggleSection('passwordless')"
          class="w-full flex items-center justify-between py-3 text-left border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <div>
            <div class="text-sm text-gray-800 dark:text-gray-100">Passwordless sign in</div>
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
        <div v-if="expandedSection === 'passwordless'" class="px-4 pb-4 space-y-4">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Enable passwordless authentication using biometrics.
          </p>
          <button
            @click="setupPasswordless"
            class="px-6 py-2 bg-[#e82264] text-white rounded-lg font-semibold hover:bg-[#d01f56] transition-colors"
          >
            Setup Passwordless
          </button>
        </div>
      </div>
    </div>

    <!-- Account Management Section -->
    <div class="bg-white dark:bg-gray-900 border-b dark:border-gray-700 mt-6 transition-colors">
      <div class="px-6 py-4">
        <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Account management
        </h3>

        <!-- Delete Account -->
        <button
          @click="toggleSection('delete')"
          class="w-full flex items-center justify-between py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <div>
            <div class="text-sm text-gray-800 dark:text-gray-100">Delete account</div>
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
        <div v-if="expandedSection === 'delete'" class="px-4 pb-4 space-y-4">
          <p class="text-sm text-red-600 font-semibold">Warning: This action cannot be undone!</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Deleting your account will permanently remove all your data.
          </p>
          <button
            @click="deleteAccount"
            class="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Delete My Account
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { updateSettings } from '@/api-services/settingsApi'
import { put } from '@/api-services/fetch'

const userStore = useUserStore()
const expandedSection = ref(null)
const accountData = ref({
  username: '',
  email: '',
  phone_number: '',
  twitter: '',
  google_email: '',
  two_fa_enabled: false,
  two_fa_type: ''
})

const socialMedia = ref({
  twitter: '',
  instagram: '',
  thread: '',
  snapchat: '',
  tiktok: '',
  facebook: ''
})

const passwordData = ref({
  current: '',
  new: '',
  confirm: ''
})

let debounceTimer = null

onMounted(() => {
  if (userStore.user) {
    accountData.value = {
      username: userStore.user.username || '',
      email: userStore.user.email || '',
      phone_number: userStore.user.phone_number || '',
      twitter: userStore.user.twitter || '',
      google_email: userStore.user.google_email || '',
      two_fa_enabled: userStore.userSettings?.two_fa_enabled || false,
      two_fa_type: userStore.userSettings?.two_fa_type || ''
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

function toggleSection(section) {
  expandedSection.value = expandedSection.value === section ? null : section
}

function updateSocialMedia(platform) {
  if (debounceTimer) clearTimeout(debounceTimer)

  debounceTimer = setTimeout(() => {
    userStore.updateSettings({
      [platform]: socialMedia.value[platform]
    })
  }, 500)
}

async function saveSection(section) {
  // alert(`Saving changes for ${section}...`)
  try {
    // Handle password change separately
    if (section === 'password') {
      if (passwordData.value.new !== passwordData.value.confirm) {
        alert('New passwords do not match')
        return
      }

      if (!passwordData.value.current || !passwordData.value.new) {
        alert('Please fill in all password fields')
        return
      }

      const response = await put(
        {
          endpoint: '/settings/change/password',
          body: {
            old_password: passwordData.value.current,
            password: passwordData.value.new,
            password_confirmation: passwordData.value.confirm
          },
          auth: true
        },

        true
      )

      if (response?.data?.success) {
        passwordData.value = { current: '', new: '', confirm: '' }
        expandedSection.value = null
        alert('Password updated successfully!')
      } else {
        alert(response?.data?.message || 'Failed to update password')
      }
      return
    }

    let updateData = {}

    // Map section to appropriate update data
    if (
      section === 'twitter' ||
      section === 'instagram' ||
      section === 'facebook' ||
      section === 'tiktok' ||
      section === 'snapchat' ||
      section === 'thread'
    ) {
      updateData = { [section]: accountData.value[section] }
    } else if (section === 'username' || section === 'email' || section === 'phone') {
      // These might need different endpoint for user profile updates
      console.log('Update user profile:', section, accountData.value[section])
      // TODO: Implement user profile update endpoint
      expandedSection.value = null
      return
    }

    const response = await updateSettings(updateData)

    if (response?.data?.success) {
      userStore.updateSettings(updateData)
      expandedSection.value = null
      alert('Settings updated successfully!')
    } else {
      alert('Failed to update settings')
    }
  } catch (error) {
    console.error('Error saving section:', error)
    alert('An error occurred while updating settings')
  }
}

function connectOnlyFans() {
  console.log('Connecting account')
  // TODO: Implement OnlyFans connection
}

function viewSessions() {
  console.log('Viewing login sessions')
  // TODO: Implement session viewing
}

async function toggle2FA() {
  const newValue = !accountData.value.two_fa_enabled
  try {
    const response = await updateSettings({
      two_fa_enabled: newValue,
      two_fa_type: newValue ? 'email' : ''
    })

    if (response?.data?.success) {
      accountData.value.two_fa_enabled = newValue
      userStore.updateSettings({
        two_fa_enabled: newValue,
        two_fa_type: newValue ? 'email' : ''
      })
      alert(`2FA ${newValue ? 'enabled' : 'disabled'} successfully!`)
    }
  } catch (error) {
    console.error('Error toggling 2FA:', error)
    alert('An error occurred while updating 2FA settings')
  }
}

function setupPasswordless() {
  console.log('Setting up passwordless authentication')
  // TODO: Implement passwordless setup
}

function deleteAccount() {
  if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
    console.log('Deleting account')
    // TODO: Implement account deletion
  }
}
</script>

<style scoped></style>
