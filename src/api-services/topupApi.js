/**
 * Topup API Service
 * Handles API calls for the topup funnel
 */
import { post, get } from './fetch'

// API Endpoints
const TOPUP_ENDPOINTS = {
  createCheckout: '/topup/checkout',
  verifyPayment: '/topup/verify',
  getPackages: '/topup/packages'
}

/**
 * Create a Stripe Checkout session
 * @param {Object} data - Checkout data
 * @param {string} data.packageId - Selected package ID
 * @param {number} data.amount - Package amount
 * @param {string} data.name - Customer name
 * @param {string} data.email - Customer email
 * @param {string} data.country - Customer country
 * @param {string} data.userType - User type (fan/creator)
 * @param {string} data.successUrl - Success redirect URL
 * @param {string} data.cancelUrl - Cancel redirect URL
 * @returns {Promise} - Checkout session response
 */
export const createTopupCheckout = async (data) => {
  try {
    const response = await post({
      endpoint: TOPUP_ENDPOINTS.createCheckout,
      body: {
        package_id: data.packageId,
        amount: data.amount,
        customer_name: data.name,
        customer_email: data.email,
        country: data.country,
        user_type: data.userType,
        success_url: data.successUrl,
        cancel_url: data.cancelUrl,
        metadata: {
          bonus_percent: data.bonusPercent || 100,
          total_credits: data.totalCredits
        }
      },
      auth: false // No auth required for topup
    })

    return response
  } catch (error) {
    console.error('[TopupAPI] Create checkout error:', error)
    throw error
  }
}

/**
 * Verify a completed payment
 * @param {string} sessionId - Stripe session ID
 * @returns {Promise} - Payment verification response
 */
export const verifyTopupPayment = async (sessionId) => {
  try {
    const response = await get({
      endpoint: TOPUP_ENDPOINTS.verifyPayment,
      pQuery: { session_id: sessionId },
      auth: false
    })

    return response
  } catch (error) {
    console.error('[TopupAPI] Verify payment error:', error)
    throw error
  }
}

/**
 * Get available topup packages
 * @returns {Promise} - Packages list
 */
export const getTopupPackages = async () => {
  try {
    const response = await get({
      endpoint: TOPUP_ENDPOINTS.getPackages,
      auth: false
    })

    return response
  } catch (error) {
    console.error('[TopupAPI] Get packages error:', error)
    throw error
  }
}

export default {
  createTopupCheckout,
  verifyTopupPayment,
  getTopupPackages
}
