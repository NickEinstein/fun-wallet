import { post } from '@/api-services/fetch'

/**
 * Update user settings
 * @param {Object} settingsData - Settings object
 * @returns {Promise} API response
 */
export async function updateSettings(settingsData) {
  try {
    const response = await post({
      endpoint: 'settings/update',
      body: settingsData,
      auth: true
    })
    return response
  } catch (error) {
    console.error('Error updating settings:', error)
    throw error
  }
}

/**
 * Helper to update specific setting fields
 * @param {Object} updates - Partial settings object to update
 * @returns {Promise} API response
 */
export async function updatePartialSettings(updates) {
  return updateSettings(updates)
}
