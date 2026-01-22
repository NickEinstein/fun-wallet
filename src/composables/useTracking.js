/**
 * Tracking Composable for Meta Pixel / Google Analytics Events
 * Handles ViewContent, AddToCart, InitiateCheckout, Purchase events
 */

export function useTracking() {
  // Check if Meta Pixel is loaded
  const isMetaPixelLoaded = () => {
    return typeof window !== 'undefined' && typeof window.fbq === 'function'
  }

  // Check if Google Analytics is loaded
  const isGALoaded = () => {
    return typeof window !== 'undefined' && typeof window.gtag === 'function'
  }

  /**
   * Track ViewContent event - When user views the topup page
   * @param {Object} params - Event parameters
   * @param {number} params.value - Package value (optional, if preselected)
   * @param {string} params.currency - Currency code (EUR)
   * @param {string} params.contentName - Content name
   */
  const trackViewContent = (params = {}) => {
    const eventData = {
      content_name: params.contentName || 'Topup Page',
      content_category: 'Topup',
      currency: params.currency || 'EUR',
      ...(params.value && { value: params.value })
    }

    // Meta Pixel
    if (isMetaPixelLoaded()) {
      window.fbq('track', 'ViewContent', eventData)
      console.log('[Tracking] Meta Pixel ViewContent:', eventData)
    }

    // Google Analytics
    if (isGALoaded()) {
      window.gtag('event', 'view_item', {
        currency: eventData.currency,
        value: eventData.value || 0,
        items: [
          {
            item_name: eventData.content_name,
            item_category: eventData.content_category
          }
        ]
      })
      console.log('[Tracking] GA view_item:', eventData)
    }
  }

  /**
   * Track AddToCart event - When user selects a package
   * @param {Object} params - Event parameters
   * @param {number} params.value - Package value
   * @param {string} params.currency - Currency code (EUR)
   * @param {string} params.packageId - Package identifier
   * @param {number} params.bonusAmount - Bonus amount
   */
  const trackAddToCart = (params) => {
    const eventData = {
      content_name: `Package €${params.value}`,
      content_ids: [params.packageId],
      content_type: 'product',
      currency: params.currency || 'EUR',
      value: params.value,
      bonus_amount: params.bonusAmount || 0
    }

    // Meta Pixel
    if (isMetaPixelLoaded()) {
      window.fbq('track', 'AddToCart', {
        content_name: eventData.content_name,
        content_ids: eventData.content_ids,
        content_type: eventData.content_type,
        currency: eventData.currency,
        value: eventData.value
      })
      console.log('[Tracking] Meta Pixel AddToCart:', eventData)
    }

    // Google Analytics
    if (isGALoaded()) {
      window.gtag('event', 'add_to_cart', {
        currency: eventData.currency,
        value: eventData.value,
        items: [
          {
            item_id: params.packageId,
            item_name: eventData.content_name,
            item_category: 'Topup Package',
            price: params.value,
            quantity: 1
          }
        ]
      })
      console.log('[Tracking] GA add_to_cart:', eventData)
    }
  }

  /**
   * Track InitiateCheckout event - When user clicks proceed to payment
   * @param {Object} params - Event parameters
   * @param {number} params.value - Package value
   * @param {string} params.currency - Currency code (EUR)
   * @param {string} params.packageId - Package identifier
   * @param {string} params.userType - User type (fan/creator)
   */
  const trackInitiateCheckout = (params) => {
    const eventData = {
      content_name: `Package €${params.value}`,
      content_ids: [params.packageId],
      currency: params.currency || 'EUR',
      value: params.value,
      user_type: params.userType,
      num_items: 1
    }

    // Meta Pixel
    if (isMetaPixelLoaded()) {
      window.fbq('track', 'InitiateCheckout', {
        content_name: eventData.content_name,
        content_ids: eventData.content_ids,
        currency: eventData.currency,
        value: eventData.value,
        num_items: eventData.num_items
      })
      console.log('[Tracking] Meta Pixel InitiateCheckout:', eventData)
    }

    // Google Analytics
    if (isGALoaded()) {
      window.gtag('event', 'begin_checkout', {
        currency: eventData.currency,
        value: eventData.value,
        items: [
          {
            item_id: params.packageId,
            item_name: eventData.content_name,
            item_category: 'Topup Package',
            price: params.value,
            quantity: 1
          }
        ]
      })
      console.log('[Tracking] GA begin_checkout:', eventData)
    }
  }

  /**
   * Track Purchase event - When payment is completed successfully
   * @param {Object} params - Event parameters
   * @param {number} params.value - Package value (paid amount)
   * @param {string} params.currency - Currency code (EUR)
   * @param {string} params.packageId - Package identifier
   * @param {string} params.transactionId - Transaction/order ID
   * @param {number} params.bonusAmount - Bonus credits received
   * @param {number} params.totalCredits - Total credits (paid + bonus)
   */
  const trackPurchase = (params) => {
    const eventData = {
      content_name: `Package €${params.value}`,
      content_ids: [params.packageId],
      content_type: 'product',
      currency: params.currency || 'EUR',
      value: params.value,
      transaction_id: params.transactionId,
      bonus_amount: params.bonusAmount || 0,
      total_credits: params.totalCredits || params.value
    }

    // Meta Pixel
    if (isMetaPixelLoaded()) {
      window.fbq('track', 'Purchase', {
        content_name: eventData.content_name,
        content_ids: eventData.content_ids,
        content_type: eventData.content_type,
        currency: eventData.currency,
        value: eventData.value
      })
      console.log('[Tracking] Meta Pixel Purchase:', eventData)
    }

    // Google Analytics
    if (isGALoaded()) {
      window.gtag('event', 'purchase', {
        transaction_id: params.transactionId,
        currency: eventData.currency,
        value: eventData.value,
        items: [
          {
            item_id: params.packageId,
            item_name: eventData.content_name,
            item_category: 'Topup Package',
            price: params.value,
            quantity: 1
          }
        ]
      })
      console.log('[Tracking] GA purchase:', eventData)
    }
  }

  /**
   * Track custom event
   * @param {string} eventName - Event name
   * @param {Object} params - Event parameters
   */
  const trackCustomEvent = (eventName, params = {}) => {
    // Meta Pixel
    if (isMetaPixelLoaded()) {
      window.fbq('trackCustom', eventName, params)
      console.log(`[Tracking] Meta Pixel Custom ${eventName}:`, params)
    }

    // Google Analytics
    if (isGALoaded()) {
      window.gtag('event', eventName, params)
      console.log(`[Tracking] GA Custom ${eventName}:`, params)
    }
  }

  return {
    trackViewContent,
    trackAddToCart,
    trackInitiateCheckout,
    trackPurchase,
    trackCustomEvent,
    isMetaPixelLoaded,
    isGALoaded
  }
}
