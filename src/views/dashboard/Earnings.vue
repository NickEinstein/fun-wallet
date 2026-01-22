<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <!-- Header -->
    <div
      class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 sticky top-0 z-10"
    >
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Earnings</h1>
          <p class="text-gray-600 dark:text-gray-400 text-sm mt-1">
            Detailed revenue breakdown and earnings history
          </p>
        </div>
        <button
          class="px-4 py-2 bg-[#e82264] text-white rounded-xl font-semibold hover:bg-pink-700 transition-colors"
        >
          Export Report
        </button>
      </div>
    </div>

    <div class="p-6 max-w-7xl mx-auto">
      <!-- Overview Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Total Revenue -->
        <div
          class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div class="flex items-center justify-between mb-4">
            <div
              class="w-12 h-12 bg-gradient-to-br from-[#e82264] to-pink-600 rounded-xl flex items-center justify-center"
            >
              <font-awesome-icon icon="fa-dollar-sign" class="text-white text-xl" />
            </div>
            <span class="text-green-600 dark:text-green-400 text-sm font-medium">+15.3%</span>
          </div>
          <h3 class="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">Total Revenue</h3>
          <p class="text-2xl font-bold text-gray-900 dark:text-white">
            ${{ totalRevenue.toLocaleString() }}
          </p>
          <p class="text-gray-500 dark:text-gray-400 text-xs mt-2">This month</p>
        </div>

        <!-- Subscription Earnings -->
        <div
          class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div class="flex items-center justify-between mb-4">
            <div
              class="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center"
            >
              <font-awesome-icon icon="fa-crown" class="text-white text-xl" />
            </div>
            <span class="text-green-600 dark:text-green-400 text-sm font-medium">+8.1%</span>
          </div>
          <h3 class="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">Subscriptions</h3>
          <p class="text-2xl font-bold text-gray-900 dark:text-white">
            ${{ subscriptionEarnings.toLocaleString() }}
          </p>
          <p class="text-gray-500 dark:text-gray-400 text-xs mt-2">
            {{ subscriptionCount }} active
          </p>
        </div>

        <!-- PPV Sales -->
        <div
          class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div class="flex items-center justify-between mb-4">
            <div
              class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center"
            >
              <font-awesome-icon icon="fa-lock" class="text-white text-xl" />
            </div>
            <span class="text-green-600 dark:text-green-400 text-sm font-medium">+22.5%</span>
          </div>
          <h3 class="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">PPV Sales</h3>
          <p class="text-2xl font-bold text-gray-900 dark:text-white">
            ${{ ppvEarnings.toLocaleString() }}
          </p>
          <p class="text-gray-500 dark:text-gray-400 text-xs mt-2">{{ ppvSales }} purchases</p>
        </div>

        <!-- Tips & Donations -->
        <div
          class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div class="flex items-center justify-between mb-4">
            <div
              class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center"
            >
              <font-awesome-icon icon="fa-gift" class="text-white text-xl" />
            </div>
            <span class="text-green-600 dark:text-green-400 text-sm font-medium">+18.7%</span>
          </div>
          <h3 class="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">Tips</h3>
          <p class="text-2xl font-bold text-gray-900 dark:text-white">
            ${{ tipsEarnings.toLocaleString() }}
          </p>
          <p class="text-gray-500 dark:text-gray-400 text-xs mt-2">{{ tipsCount }} tips received</p>
        </div>
      </div>

      <!-- Filter Controls -->
      <div
        class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 mb-8"
      >
        <div class="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div class="flex gap-2">
            <button
              v-for="period in timePeriods"
              :key="period"
              @click="selectedPeriod = period"
              class="px-4 py-2 rounded-lg font-medium text-sm transition-all"
              :class="
                selectedPeriod === period
                  ? 'bg-[#e82264] text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              "
            >
              {{ period }}
            </button>
          </div>
          <div class="flex gap-2">
            <select
              v-model="selectedCategory"
              class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg border-none focus:ring-2 focus:ring-[#e82264] text-sm"
            >
              <option value="all">All Categories</option>
              <option value="subscriptions">Subscriptions</option>
              <option value="ppv">PPV Sales</option>
              <option value="tips">Tips</option>
              <option value="affiliate">Affiliate</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Revenue Breakdown Chart -->
      <div
        class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 mb-8"
      >
        <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Revenue Breakdown</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Chart Placeholder -->
          <div
            class="flex items-center justify-center h-64 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
          >
            <div class="text-center">
              <font-awesome-icon
                icon="fa-chart-pie"
                class="text-5xl text-gray-300 dark:text-gray-600 mb-4"
              />
              <p class="text-gray-500 dark:text-gray-400 text-sm">Revenue Distribution Chart</p>
            </div>
          </div>

          <!-- Revenue Categories -->
          <div class="space-y-4">
            <div
              v-for="category in revenueCategories"
              :key="category.name"
              class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-3 h-3 rounded-full"
                  :style="{ backgroundColor: category.color }"
                ></div>
                <div>
                  <p class="font-medium text-gray-900 dark:text-white text-sm">
                    {{ category.name }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    {{ category.percentage }}% of total
                  </p>
                </div>
              </div>
              <p class="font-bold text-gray-900 dark:text-white">
                ${{ category.amount.toLocaleString() }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Earnings History -->
      <div
        class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
      >
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Earnings History</h2>
          <div class="flex gap-2">
            <button
              class="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              <font-awesome-icon icon="fa-filter" class="mr-2" />
              Filter
            </button>
            <button
              class="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              <font-awesome-icon icon="fa-download" class="mr-2" />
              Download
            </button>
          </div>
        </div>

        <!-- Transactions Table -->
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-gray-200 dark:border-gray-700">
                <th
                  class="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Date
                </th>
                <th
                  class="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Description
                </th>
                <th
                  class="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Type
                </th>
                <th
                  class="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Customer
                </th>
                <th
                  class="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="transaction in transactions"
                :key="transaction.id"
                class="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <td class="py-4 px-4">
                  <span class="text-sm text-gray-700 dark:text-gray-300">{{
                    transaction.date
                  }}</span>
                </td>
                <td class="py-4 px-4">
                  <span class="text-sm text-gray-900 dark:text-white font-medium">{{
                    transaction.description
                  }}</span>
                </td>
                <td class="py-4 px-4">
                  <span
                    class="px-3 py-1 rounded-full text-xs font-medium"
                    :class="getTypeBadge(transaction.type)"
                  >
                    {{ transaction.type }}
                  </span>
                </td>
                <td class="py-4 px-4">
                  <span class="text-sm text-gray-700 dark:text-gray-300">{{
                    transaction.customer
                  }}</span>
                </td>
                <td class="py-4 px-4 text-right">
                  <span class="text-sm font-semibold text-green-600 dark:text-green-400"
                    >+${{ transaction.amount.toFixed(2) }}</span
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="flex items-center justify-between mt-6">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Showing <span class="font-medium">1-10</span> of
            <span class="font-medium">{{ transactions.length }}</span> transactions
          </p>
          <div class="flex gap-2">
            <button
              class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 text-sm"
            >
              Previous
            </button>
            <button class="px-3 py-1 bg-[#e82264] text-white rounded-lg hover:bg-pink-700 text-sm">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Stats
const totalRevenue = ref(12450)
const subscriptionEarnings = ref(6200)
const subscriptionCount = ref(124)
const ppvEarnings = ref(3850)
const ppvSales = ref(67)
const tipsEarnings = ref(2400)
const tipsCount = ref(89)

// Filters
const timePeriods = ['7 Days', '30 Days', '90 Days', 'Year']
const selectedPeriod = ref('30 Days')
const selectedCategory = ref('all')

// Revenue Categories
const revenueCategories = ref([
  { name: 'Subscriptions', amount: 6200, percentage: 49.8, color: '#9333ea' },
  { name: 'PPV Sales', amount: 3850, percentage: 30.9, color: '#3b82f6' },
  { name: 'Tips & Donations', amount: 2400, percentage: 19.3, color: '#22c55e' },
  { name: 'Affiliate Earnings', amount: 0, percentage: 0, color: '#f59e0b' }
])

// Transactions
const transactions = ref([
  {
    id: 1,
    date: 'Jan 13, 2026',
    description: 'Monthly Subscription',
    type: 'Subscription',
    customer: '@user123',
    amount: 29.99
  },
  {
    id: 2,
    date: 'Jan 13, 2026',
    description: 'Exclusive Content Purchase',
    type: 'PPV',
    customer: '@fan456',
    amount: 49.99
  },
  {
    id: 3,
    date: 'Jan 12, 2026',
    description: 'Tip Received',
    type: 'Tip',
    customer: '@supporter789',
    amount: 15.0
  },
  {
    id: 4,
    date: 'Jan 12, 2026',
    description: 'Monthly Subscription',
    type: 'Subscription',
    customer: '@newuser101',
    amount: 29.99
  },
  {
    id: 5,
    date: 'Jan 11, 2026',
    description: 'Premium Video Purchase',
    type: 'PPV',
    customer: '@viewer202',
    amount: 39.99
  },
  {
    id: 6,
    date: 'Jan 11, 2026',
    description: 'Tip Received',
    type: 'Tip',
    customer: '@bigfan303',
    amount: 50.0
  },
  {
    id: 7,
    date: 'Jan 10, 2026',
    description: 'Monthly Subscription',
    type: 'Subscription',
    customer: '@subscriber404',
    amount: 29.99
  },
  {
    id: 8,
    date: 'Jan 10, 2026',
    description: 'Special Content Purchase',
    type: 'PPV',
    customer: '@fan505',
    amount: 59.99
  },
  {
    id: 9,
    date: 'Jan 9, 2026',
    description: 'Tip Received',
    type: 'Tip',
    customer: '@supporter606',
    amount: 25.0
  },
  {
    id: 10,
    date: 'Jan 9, 2026',
    description: 'Monthly Subscription',
    type: 'Subscription',
    customer: '@user707',
    amount: 29.99
  }
])

// Helper Functions
const getTypeBadge = (type) => {
  const badges = {
    Subscription: 'bg-purple-500/10 text-purple-600',
    PPV: 'bg-blue-500/10 text-blue-600',
    Tip: 'bg-green-500/10 text-green-600',
    Affiliate: 'bg-orange-500/10 text-orange-600'
  }
  return badges[type] || 'bg-gray-500/10 text-gray-600'
}
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
