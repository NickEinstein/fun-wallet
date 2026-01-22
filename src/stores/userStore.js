import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { post } from '@/api-services/fetch'

export const useUserStore = defineStore(
  'user',
  () => {
    // State
    const user = ref(null)
    const token = ref(null)
    
    // Settings State
    const settings = ref({
      two_fa_type: '',
      two_fa_enabled: false,
      pin: '',
      notification: false,
      fcm_token: '',
      twitter: '',
      instagram: '',
      thread: '',
      snapchat: '',
      tiktok: '',
      facebook: '',
      three_months_cost: 0,
      six_months_cost: 0,
      one_year_cost: 0
    })

    // Getters
    const isAuthenticated = computed(() => !!token.value)
    const userName = computed(() => user.value?.name || '')
    const userEmail = computed(() => user.value?.email || '')
    const userRole = computed(() => user.value?.role || '')
    const userInitials = computed(() => {
      if (!user.value?.name) return ''
      const parts = user.value.name.trim().split(' ')
      if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    })
    const profileImage = computed(() => user.value?.profile_image || '')
    const userSettings = computed(() => user.value?.relationships?.settings || null)
    const userWallet = computed(() => user.value?.relationships?.wallet || null)

    // Actions
    function setUser(userData) {
      user.value = userData
    }

    function setToken(tokenValue) {
      token.value = tokenValue
    }

    function login(userData, tokenValue) {
      user.value = userData
      token.value = tokenValue
      // Initialize settings from user data
      if (userData?.relationships?.settings) {
        loadSettingsFromUser(userData.relationships.settings)
      }
    }

    function logout() {
      user.value = null
      token.value = null
      settings.value = {
        two_fa_type: '',
        two_fa_enabled: false,
        pin: '',
        notification: false,
        fcm_token: '',
        twitter: '',
        instagram: '',
        thread: '',
        snapchat: '',
        tiktok: '',
        facebook: '',
        three_months_cost: 0,
        six_months_cost: 0,
        one_year_cost: 0
      }
      localStorage.clear()
    }

    function updateUser(updates) {
      if (user.value) {
        user.value = { ...user.value, ...updates }
      }
    }

    function updateSettings(settingsUpdate) {
      if (user.value?.relationships) {
        user.value.relationships.settings = { ...user.value.relationships.settings, ...settingsUpdate }
      }
      // Also update local settings state
      settings.value = { ...settings.value, ...settingsUpdate }
    }

    function loadSettingsFromUser(userSettings) {
      settings.value = {
        two_fa_type: userSettings.two_fa_type || '',
        two_fa_enabled: userSettings.two_fa_enabled || false,
        pin: userSettings.pin || '',
        notification: userSettings.notification || false,
        fcm_token: userSettings.fcm_token || '',
        twitter: userSettings.twitter || '',
        instagram: userSettings.instagram || '',
        thread: userSettings.thread || '',
        snapchat: userSettings.snapchat || '',
        tiktok: userSettings.tiktok || '',
        facebook: userSettings.facebook || '',
        three_months_cost: userSettings.three_months_cost || 0,
        six_months_cost: userSettings.six_months_cost || 0,
        one_year_cost: userSettings.one_year_cost || 0
      }
    }

    async function saveSettings(settingsData = null) {
      try {
        // Use provided data or current settings state
        const payload = settingsData || settings.value
        
        const response = await post({
          endpoint: '/settings/update',
          body: {...payload, fcm_token:'hdhdhgdhd87484hhdh'},
          auth: true
        })

        if (response?.data?.success) {
          // Update local settings and user data
          updateSettings(payload)
          return { success: true, data: response.data }
        } else {
          return { success: false, error: response?.data?.message || 'Failed to update settings' }
        }
      } catch (error) {
        console.error('Error saving settings:', error)
        return { success: false, error: error.message || 'An error occurred' }
      }
    }

    async function updatePartialSettings(partialSettings) {
      try {
        const response = await post({
          endpoint: 'settings/update',
          body: partialSettings,
          auth: true
        })

        if (response?.data?.success) {
          updateSettings(partialSettings)
          return { success: true, data: response.data }
        } else {
          return { success: false, error: response?.data?.message || 'Failed to update settings' }
        }
      } catch (error) {
        console.error('Error updating partial settings:', error)
        return { success: false, error: error.message || 'An error occurred' }
      }
    }

    return {
      // State
      user,
      token,
      settings,
      // Getters
      isAuthenticated,
      userName,
      userEmail,
      userRole,
      userInitials,
      profileImage,
      userSettings,
      userWallet,
      // Actions
      setUser,
      setToken,
      login,
      logout,
      updateUser,
      updateSettings,
      loadSettingsFromUser,
      saveSettings,
      updatePartialSettings
    }
  },
  {
    persist: {
      storage: localStorage,
      paths: ['user', 'token', 'settings']
    }
  }
)
