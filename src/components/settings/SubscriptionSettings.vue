<template>
  <div class="w-full max-w-3xl mx-auto">
    <!-- Header with Refresh Icon -->
    <div class="flex justify-between items-center">
      <div class="p-2 py-4 bg-white dark:bg-gray-900 w-full transition-colors">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100">
          SUBSCRIPTION AND PROMOTIONS
        </h2>
      </div>
      <button
        class="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
      >
        <!-- <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg> -->
      </button>
    </div>

    <!-- Subscription Price Section -->
    <div
      class="bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg p-6 mb-6 transition-colors"
    >
      <div class="flex items-start gap-2 mb-4">
        <!-- <svg
          class="w-5 h-5 text-gray-600 mt-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg> -->
        <div class="flex-1">
          <!-- Bundle Pricing Inputs -->
          <div class="space-y-4 mb-4">
            <!-- 3 Months Bundle -->
            <div class="flex items-center gap-4">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-200 w-32"
                >3 Months:</label
              >
              <div class="relative flex-1">
                <span
                  class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
                  >$</span
                >
                <input
                  v-model.number="bundlePrices.three_months_cost"
                  @input="updateBundlePrice('three_months_cost')"
                  type="number"
                  step="0.01"
                  min="0"
                  class="w-full pl-8 pr-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-[#e82264] focus:border-[#e82264] outline-none transition-colors"
                  placeholder="0.00"
                />
              </div>
            </div>

            <!-- 6 Months Bundle -->
            <div class="flex items-center gap-4">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-200 w-32"
                >6 Months:</label
              >
              <div class="relative flex-1">
                <span
                  class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
                  >$</span
                >
                <input
                  v-model.number="bundlePrices.six_months_cost"
                  @input="updateBundlePrice('six_months_cost')"
                  type="number"
                  step="0.01"
                  min="0"
                  class="w-full pl-8 pr-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-[#e82264] focus:border-[#e82264] outline-none transition-colors"
                  placeholder="0.00"
                />
              </div>
            </div>

            <!-- 1 Year Bundle -->
            <div class="flex items-center gap-4">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-200 w-32"
                >1 Year:</label
              >
              <div class="relative flex-1">
                <span
                  class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
                  >$</span
                >
                <input
                  v-model.number="bundlePrices.one_year_cost"
                  @input="updateBundlePrice('one_year_cost')"
                  type="number"
                  step="0.01"
                  min="0"
                  class="w-full pl-8 pr-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-[#e82264] focus:border-[#e82264] outline-none transition-colors"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>
          <!-- <h3 class="text-sm font-semibold text-gray-700 mb-2">$ Price</h3>

          <div class="relative">
            <input
              v-model="subscriptionPrice"
              type="number"
              step="0.01"
              min="0"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e82264] focus:border-[#e82264] outline-none"
              placeholder="0.00"
            />
          </div>
          <p class="text-xs text-gray-500 mt-2">
            You must
            <a href="#" class="text-blue-500 underline">Add a bank account or Payment following</a>
            before you can set your price or accept tips.
          </p> -->
        </div>
      </div>

      <!-- <div class="flex justify-end gap-3 mt-4">
        <button
          @click="cancelPriceChange"
          class="px-6 py-2 text-gray-600 font-semibold rounded-lg hover:bg-gray-100 transition uppercase"
        >
          Cancel
        </button>
        <button
          @click="savePriceChange"
          :disabled="!subscriptionPrice"
          class="px-6 py-2 bg-[#e82264] text-white font-semibold rounded-lg hover:bg-[#d01f56] transition disabled:opacity-50 disabled:cursor-not-allowed uppercase"
        >
          Save
        </button>
      </div> -->
    </div>

    <!-- Tabs Section -->
    <div class="border-b border-gray-300 dark:border-gray-700 mb-6 transition-colors">
      <div class="flex gap-8">
        <button
          @click="activeTab = 'promotions'"
          :class="[
            'pb-3 font-semibold text-sm transition-colors uppercase',
            activeTab === 'promotions'
              ? 'border-b-2 border-blue-500 text-blue-500 dark:border-blue-400 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100'
          ]"
        >
          Profile Promotions
        </button>
        <button
          @click="activeTab = 'trials'"
          :class="[
            'pb-3 font-semibold text-sm transition-colors uppercase',
            activeTab === 'trials'
              ? 'border-b-2 border-blue-500 text-blue-500 dark:border-blue-400 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100'
          ]"
        >
          Free Trial Links
        </button>
        <button
          @click="activeTab = 'tracking'"
          :class="[
            'pb-3 font-semibold text-sm transition-colors uppercase',
            activeTab === 'tracking'
              ? 'border-b-2 border-blue-500 text-blue-500 dark:border-blue-400 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100'
          ]"
        >
          Tracking Links
        </button>
      </div>
    </div>

    <!-- Profile Promotions Tab -->
    <div v-if="activeTab === 'promotions'" class="space-y-6">
      <div
        class="bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg p-6 transition-colors"
      >
        <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
          Limited discount campaign
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Offer a free trial or a discounted subscription on your profile for a limited number of
          new or already existing subscribers
        </p>
        <button
          @click="startPromotionCampaign"
          class="px-6 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors uppercase"
        >
          Start Promotion Campaign
        </button>
      </div>

      <div
        class="bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg p-6 transition-colors"
      >
        <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
          Subscription bundles
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Offer special
          <span class="font-semibold">months of subscription as a discounted bundle.</span>
        </p>

        <button
          @click="addBundle"
          class="px-6 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors uppercase"
        >
          Add Bundle
        </button>
      </div>
    </div>

    <!-- Free Trial Links Tab -->
    <div
      v-if="activeTab === 'trials'"
      class="bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg p-6 transition-colors"
    >
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Create free trial links to share with potential subscribers. They can subscribe for free for
        a limited time.
      </p>
      <div v-if="trialLinks.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
        <p class="mb-4">No trial links created yet</p>
        <button
          @click="createTrialLink"
          class="px-6 py-2 bg-[#e82264] text-white font-semibold rounded-lg hover:bg-[#d01f56] transition-colors"
        >
          Create Trial Link
        </button>
      </div>
      <div v-else class="space-y-3">
        <div
          v-for="(link, index) in trialLinks"
          :key="index"
          class="flex items-center justify-between p-3 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 transition-colors"
        >
          <div class="flex-1">
            <p class="text-sm font-semibold text-gray-800 dark:text-gray-100">{{ link.name }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">{{ link.url }}</p>
          </div>
          <button
            @click="deleteTrialLink(index)"
            class="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Tracking Links Tab -->
    <div
      v-if="activeTab === 'tracking'"
      class="bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg p-6 transition-colors"
    >
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Create tracking links to monitor where your subscribers are coming from.
      </p>
      <div
        v-if="trackingLinks.length === 0"
        class="text-center py-8 text-gray-500 dark:text-gray-400"
      >
        <p class="mb-4">No tracking links created yet</p>
        <button
          @click="createTrackingLink"
          class="px-6 py-2 bg-[#e82264] text-white font-semibold rounded-lg hover:bg-[#d01f56] transition-colors"
        >
          Create Tracking Link
        </button>
      </div>
      <div v-else class="space-y-3">
        <div
          v-for="(link, index) in trackingLinks"
          :key="index"
          class="flex items-center justify-between p-3 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 transition-colors"
        >
          <div class="flex-1">
            <p class="text-sm font-semibold text-gray-800 dark:text-gray-100">{{ link.name }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">{{ link.url }}</p>
            <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">Clicks: {{ link.clicks }}</p>
          </div>
          <button
            @click="deleteTrackingLink(index)"
            class="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
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

const userStore = useUserStore()
const subscriptionPrice = ref(0)
const activeTab = ref('promotions')
const trialLinks = ref([])
const trackingLinks = ref([])
const isLoading = ref(false)

// Bundle prices object
const bundlePrices = ref({
  three_months_cost: 0,
  six_months_cost: 0,
  one_year_cost: 0
})

let debounceTimer = null

onMounted(() => {
  if (userStore.userSettings) {
    subscriptionPrice.value = userStore.userSettings.subscription_price || 0
    // Load bundle prices from store
    bundlePrices.value.three_months_cost = userStore.settings.three_months_cost || 0
    bundlePrices.value.six_months_cost = userStore.settings.six_months_cost || 0
    bundlePrices.value.one_year_cost = userStore.settings.one_year_cost || 0
  }
})

// Update bundle price with debounce
function updateBundlePrice(priceType) {
  if (debounceTimer) clearTimeout(debounceTimer)

  debounceTimer = setTimeout(() => {
    userStore.updateSettings({
      [priceType]: bundlePrices.value[priceType]
    })
  }, 500)
}

async function savePriceChange() {
  isLoading.value = true
  try {
    const response = await updateSettings({
      subscription_price: subscriptionPrice.value
    })

    if (response?.data?.success) {
      // Update store with new settings
      userStore.updateSettings({ subscription_price: subscriptionPrice.value })
      alert('Subscription price updated successfully!')
    } else {
      alert('Failed to update subscription price')
    }
  } catch (error) {
    console.error('Error saving price:', error)
    alert('An error occurred while updating subscription price')
  } finally {
    isLoading.value = false
  }
}

function cancelPriceChange() {
  // Reset to original value
  subscriptionPrice.value = userStore.userSettings?.subscription_price || 0
}

function startPromotionCampaign() {
  console.log('Starting promotion campaign')
  // TODO: Implement promotion campaign logic
}

function addBundle() {
  console.log('Adding subscription bundle')
  // TODO: Implement bundle addition logic
}

function createTrialLink() {
  const newLink = {
    name: `Trial Link ${trialLinks.value.length + 1}`,
    url: `https://fansngage.com/trial/${Date.now()}`,
    createdAt: new Date().toISOString()
  }
  trialLinks.value.push(newLink)
  // TODO: Implement API call to create trial link
}

function deleteTrialLink(index) {
  if (confirm('Are you sure you want to delete this trial link?')) {
    trialLinks.value.splice(index, 1)
    // TODO: Implement API call to delete trial link
  }
}

function createTrackingLink() {
  const newLink = {
    name: `Tracking Link ${trackingLinks.value.length + 1}`,
    url: `https://fansngage.com/track/${Date.now()}`,
    clicks: 0,
    createdAt: new Date().toISOString()
  }
  trackingLinks.value.push(newLink)
  // TODO: Implement API call to create tracking link
}

function deleteTrackingLink(index) {
  if (confirm('Are you sure you want to delete this tracking link?')) {
    trackingLinks.value.splice(index, 1)
    // TODO: Implement API call to delete tracking link
  }
}
</script>

<style scoped></style>
