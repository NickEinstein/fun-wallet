<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <!-- Header -->
    <div
      class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 sticky top-0 z-10"
    >
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
          <p class="text-gray-600 dark:text-gray-400 text-sm mt-1">
            Track your performance metrics and insights
          </p>
        </div>
        <div class="flex gap-2">
          <select
            v-model="selectedPeriod"
            class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl border-none focus:ring-2 focus:ring-[#e82264] text-sm font-medium"
          >
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last 90 Days</option>
            <option value="365">Last Year</option>
          </select>
          <button
            class="px-4 py-2 bg-[#e82264] text-white rounded-xl font-semibold hover:bg-pink-700 transition-colors"
          >
            <font-awesome-icon icon="fa-download" class="mr-2" />
            Export
          </button>
        </div>
      </div>
    </div>

    <div class="p-6 max-w-7xl mx-auto">
      <!-- Key Metrics -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div
          class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div class="flex items-center justify-between mb-4">
            <div
              class="w-12 h-12 bg-gradient-to-br from-[#e82264] to-pink-600 rounded-xl flex items-center justify-center"
            >
              <font-awesome-icon icon="fa-eye" class="text-white text-xl" />
            </div>
            <span
              class="text-green-600 dark:text-green-400 text-sm font-medium flex items-center gap-1"
            >
              <font-awesome-icon icon="fa-arrow-up" class="text-xs" />
              12.5%
            </span>
          </div>
          <h3 class="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">Total Views</h3>
          <p class="text-2xl font-bold text-gray-900 dark:text-white">
            {{ totalViews.toLocaleString() }}
          </p>
          <p class="text-gray-500 dark:text-gray-400 text-xs mt-2">
            +{{ viewsGrowth }} from last period
          </p>
        </div>

        <div
          class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div class="flex items-center justify-between mb-4">
            <div
              class="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center"
            >
              <font-awesome-icon icon="fa-heart" class="text-white text-xl" />
            </div>
            <span
              class="text-green-600 dark:text-green-400 text-sm font-medium flex items-center gap-1"
            >
              <font-awesome-icon icon="fa-arrow-up" class="text-xs" />
              8.2%
            </span>
          </div>
          <h3 class="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">Engagement Rate</h3>
          <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ engagementRate }}%</p>
          <p class="text-gray-500 dark:text-gray-400 text-xs mt-2">Average this period</p>
        </div>

        <div
          class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div class="flex items-center justify-between mb-4">
            <div
              class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center"
            >
              <font-awesome-icon icon="fa-users" class="text-white text-xl" />
            </div>
            <span
              class="text-green-600 dark:text-green-400 text-sm font-medium flex items-center gap-1"
            >
              <font-awesome-icon icon="fa-arrow-up" class="text-xs" />
              15.3%
            </span>
          </div>
          <h3 class="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">New Subscribers</h3>
          <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ newSubscribers }}</p>
          <p class="text-gray-500 dark:text-gray-400 text-xs mt-2">This period</p>
        </div>

        <div
          class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div class="flex items-center justify-between mb-4">
            <div
              class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center"
            >
              <font-awesome-icon icon="fa-chart-line" class="text-white text-xl" />
            </div>
            <span
              class="text-red-600 dark:text-red-400 text-sm font-medium flex items-center gap-1"
            >
              <font-awesome-icon icon="fa-arrow-down" class="text-xs" />
              2.1%
            </span>
          </div>
          <h3 class="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">Retention Rate</h3>
          <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ retentionRate }}%</p>
          <p class="text-gray-500 dark:text-gray-400 text-xs mt-2">Subscriber retention</p>
        </div>
      </div>

      <!-- Revenue Chart -->
      <div
        class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 mb-8"
      >
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Revenue Trends</h2>
          <div class="flex gap-2">
            <button
              v-for="type in chartTypes"
              :key="type"
              @click="selectedChart = type"
              class="px-3 py-1 rounded-lg text-sm font-medium transition-all"
              :class="
                selectedChart === type
                  ? 'bg-[#e82264] text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              "
            >
              {{ type }}
            </button>
          </div>
        </div>
        <div
          class="h-80 flex items-center justify-center bg-gray-50 dark:bg-gray-700/50 rounded-xl"
        >
          <div class="text-center">
            <font-awesome-icon
              icon="fa-chart-area"
              class="text-6xl text-gray-300 dark:text-gray-600 mb-4"
            />
            <p class="text-gray-500 dark:text-gray-400">Revenue Chart Visualization</p>
            <p class="text-sm text-gray-400 dark:text-gray-500 mt-2">
              Line chart showing {{ selectedChart.toLowerCase() }} revenue trends
            </p>
          </div>
        </div>
      </div>

      <!-- Engagement & Sales -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- Engagement Chart -->
        <div
          class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Engagement Metrics</h2>
          <div
            class="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700/50 rounded-xl"
          >
            <div class="text-center">
              <font-awesome-icon
                icon="fa-chart-bar"
                class="text-5xl text-gray-300 dark:text-gray-600 mb-4"
              />
              <p class="text-gray-500 dark:text-gray-400">Engagement Chart</p>
              <p class="text-sm text-gray-400 dark:text-gray-500 mt-2">
                Likes, comments, shares over time
              </p>
            </div>
          </div>
          <!-- Engagement Stats -->
          <div class="grid grid-cols-3 gap-4 mt-6">
            <div class="text-center">
              <p class="text-2xl font-bold text-gray-900 dark:text-white">
                {{ engagementStats.likes.toLocaleString() }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Total Likes</p>
            </div>
            <div class="text-center">
              <p class="text-2xl font-bold text-gray-900 dark:text-white">
                {{ engagementStats.comments.toLocaleString() }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Comments</p>
            </div>
            <div class="text-center">
              <p class="text-2xl font-bold text-gray-900 dark:text-white">
                {{ engagementStats.shares.toLocaleString() }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Shares</p>
            </div>
          </div>
        </div>

        <!-- Sales Chart -->
        <div
          class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Sales Performance</h2>
          <div
            class="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700/50 rounded-xl"
          >
            <div class="text-center">
              <font-awesome-icon
                icon="fa-chart-pie"
                class="text-5xl text-gray-300 dark:text-gray-600 mb-4"
              />
              <p class="text-gray-500 dark:text-gray-400">Sales Distribution</p>
              <p class="text-sm text-gray-400 dark:text-gray-500 mt-2">
                PPV, Subscriptions, Tips breakdown
              </p>
            </div>
          </div>
          <!-- Sales Stats -->
          <div class="grid grid-cols-3 gap-4 mt-6">
            <div class="text-center">
              <p class="text-2xl font-bold text-purple-600">
                ${{ salesStats.subscriptions.toLocaleString() }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Subscriptions</p>
            </div>
            <div class="text-center">
              <p class="text-2xl font-bold text-blue-600">${{ salesStats.ppv.toLocaleString() }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">PPV Sales</p>
            </div>
            <div class="text-center">
              <p class="text-2xl font-bold text-green-600">
                ${{ salesStats.tips.toLocaleString() }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Tips</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Subscriber Retention -->
      <div
        class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 mb-8"
      >
        <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Subscriber Retention</h2>
        <div
          class="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700/50 rounded-xl"
        >
          <div class="text-center">
            <font-awesome-icon
              icon="fa-chart-line"
              class="text-6xl text-gray-300 dark:text-gray-600 mb-4"
            />
            <p class="text-gray-500 dark:text-gray-400">Retention Rate Chart</p>
            <p class="text-sm text-gray-400 dark:text-gray-500 mt-2">
              Track subscriber retention over time
            </p>
          </div>
        </div>

        <!-- Retention Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div
            class="bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl p-4 border border-green-200 dark:border-green-800"
          >
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">1 Month</p>
            <p class="text-2xl font-bold text-green-600">{{ retentionStats.month1 }}%</p>
          </div>
          <div
            class="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl p-4 border border-blue-200 dark:border-blue-800"
          >
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">3 Months</p>
            <p class="text-2xl font-bold text-blue-600">{{ retentionStats.month3 }}%</p>
          </div>
          <div
            class="bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-xl p-4 border border-purple-200 dark:border-purple-800"
          >
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">6 Months</p>
            <p class="text-2xl font-bold text-purple-600">{{ retentionStats.month6 }}%</p>
          </div>
          <div
            class="bg-gradient-to-br from-pink-500/10 to-pink-600/10 rounded-xl p-4 border border-pink-200 dark:border-pink-800"
          >
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">12 Months</p>
            <p class="text-2xl font-bold text-pink-600">{{ retentionStats.month12 }}%</p>
          </div>
        </div>
      </div>

      <!-- Top Content & Demographics -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Top Content Types -->
        <div
          class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Top Content Types</h2>
          <div class="space-y-4">
            <div
              v-for="content in topContentTypes"
              :key="content.type"
              class="flex items-center justify-between"
            >
              <div class="flex items-center gap-3 flex-1">
                <div
                  class="w-10 h-10 rounded-lg flex items-center justify-center"
                  :style="{ backgroundColor: content.color + '20' }"
                >
                  <font-awesome-icon :icon="content.icon" :style="{ color: content.color }" />
                </div>
                <div class="flex-1">
                  <p class="font-medium text-gray-900 dark:text-white text-sm">
                    {{ content.type }}
                  </p>
                  <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                    <div
                      class="h-2 rounded-full"
                      :style="{ width: content.percentage + '%', backgroundColor: content.color }"
                    ></div>
                  </div>
                </div>
              </div>
              <div class="ml-4 text-right">
                <p class="font-bold text-gray-900 dark:text-white">{{ content.count }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ content.percentage }}%</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Audience Demographics -->
        <div
          class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Audience Demographics
          </h2>
          <div class="space-y-6">
            <div>
              <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Top Countries
              </h3>
              <div class="space-y-3">
                <div
                  v-for="country in topCountries"
                  :key="country.name"
                  class="flex items-center justify-between"
                >
                  <span class="text-sm text-gray-700 dark:text-gray-300">{{ country.name }}</span>
                  <div class="flex items-center gap-2">
                    <div class="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        class="bg-[#e82264] h-2 rounded-full"
                        :style="{ width: country.percentage + '%' }"
                      ></div>
                    </div>
                    <span class="text-sm font-medium text-gray-900 dark:text-white w-10 text-right"
                      >{{ country.percentage }}%</span
                    >
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Age Groups
              </h3>
              <div class="grid grid-cols-2 gap-3">
                <div
                  v-for="age in ageGroups"
                  :key="age.range"
                  class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 text-center"
                >
                  <p class="text-xl font-bold text-gray-900 dark:text-white">
                    {{ age.percentage }}%
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ age.range }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Time Period
const selectedPeriod = ref('30')

// Key Metrics
const totalViews = ref(145780)
const viewsGrowth = ref(18234)
const engagementRate = ref(8.7)
const newSubscribers = ref(342)
const retentionRate = ref(87.3)

// Chart Types
const chartTypes = ['Daily', 'Weekly', 'Monthly']
const selectedChart = ref('Daily')

// Engagement Stats
const engagementStats = ref({
  likes: 12453,
  comments: 3421,
  shares: 892
})

// Sales Stats
const salesStats = ref({
  subscriptions: 6200,
  ppv: 3850,
  tips: 2400
})

// Retention Stats
const retentionStats = ref({
  month1: 92,
  month3: 85,
  month6: 78,
  month12: 68
})

// Top Content Types
const topContentTypes = ref([
  { type: 'Photos', count: 234, percentage: 45, icon: 'fa-image', color: '#e82264' },
  { type: 'Videos', count: 156, percentage: 30, icon: 'fa-video', color: '#9333ea' },
  { type: 'Stories', count: 89, percentage: 17, icon: 'fa-bolt', color: '#3b82f6' },
  { type: 'Live Streams', count: 42, percentage: 8, icon: 'fa-circle-dot', color: '#22c55e' }
])

// Top Countries
const topCountries = ref([
  { name: 'United States', percentage: 42 },
  { name: 'United Kingdom', percentage: 18 },
  { name: 'Canada', percentage: 12 },
  { name: 'Australia', percentage: 10 },
  { name: 'Germany', percentage: 8 }
])

// Age Groups
const ageGroups = ref([
  { range: '18-24', percentage: 28 },
  { range: '25-34', percentage: 42 },
  { range: '35-44', percentage: 20 },
  { range: '45+', percentage: 10 }
])
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  height: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #e82264;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #c91b52;
}
</style>
