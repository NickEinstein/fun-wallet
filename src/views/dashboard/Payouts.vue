<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <!-- Header -->
    <div
      class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 sticky top-0 z-10"
    >
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Payouts</h1>
          <p class="text-gray-600 dark:text-gray-400 text-sm mt-1">
            Manage your withdrawals and payout methods
          </p>
        </div>
        <button
          @click="showWithdrawalModal = true"
          class="px-4 py-2 bg-[#e82264] text-white rounded-xl font-semibold hover:bg-pink-700 transition-colors"
        >
          Request Payout
        </button>
      </div>
    </div>

    <div class="p-6 max-w-7xl mx-auto">
      <!-- Balance Overview -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <!-- Available Balance -->
        <div
          class="bg-gradient-to-br from-[#e82264] to-pink-600 rounded-2xl p-6 text-white shadow-xl"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <font-awesome-icon icon="fa-wallet" class="text-2xl" />
            </div>
          </div>
          <h3 class="text-white/90 text-sm font-medium mb-1">Available Balance</h3>
          <p class="text-3xl font-bold">${{ availableBalance.toLocaleString() }}</p>
          <p class="text-white/70 text-xs mt-2">Ready to withdraw</p>
        </div>

        <!-- Pending Balance -->
        <div
          class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center">
              <font-awesome-icon icon="fa-clock" class="text-orange-600 text-xl" />
            </div>
          </div>
          <h3 class="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">Pending Balance</h3>
          <p class="text-2xl font-bold text-gray-900 dark:text-white">
            ${{ pendingBalance.toLocaleString() }}
          </p>
          <p class="text-gray-500 dark:text-gray-400 text-xs mt-2">Processing period</p>
        </div>

        <!-- Total Withdrawn -->
        <div
          class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
              <font-awesome-icon icon="fa-check-circle" class="text-green-600 text-xl" />
            </div>
          </div>
          <h3 class="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">Total Withdrawn</h3>
          <p class="text-2xl font-bold text-gray-900 dark:text-white">
            ${{ totalWithdrawn.toLocaleString() }}
          </p>
          <p class="text-gray-500 dark:text-gray-400 text-xs mt-2">All time</p>
        </div>
      </div>

      <!-- Payout Methods -->
      <div
        class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 mb-8"
      >
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Payout Methods</h2>
          <button
            @click="showAddMethodModal = true"
            class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <font-awesome-icon icon="fa-plus" class="mr-2" />
            Add Method
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="method in payoutMethods"
            :key="method.id"
            class="p-4 border-2 rounded-xl transition-all"
            :class="
              method.isDefault
                ? 'border-[#e82264] bg-[#e82264]/5'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            "
          >
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 rounded-lg flex items-center justify-center"
                  :class="getMethodIconBg(method.type)"
                >
                  <font-awesome-icon :icon="getMethodIcon(method.type)" class="text-lg" />
                </div>
                <div>
                  <p class="font-semibold text-gray-900 dark:text-white">{{ method.name }}</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{{ method.details }}</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <button
                  v-if="method.isDefault"
                  class="px-2 py-1 bg-[#e82264] text-white text-xs rounded-full font-medium"
                >
                  Default
                </button>
                <button class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <font-awesome-icon icon="fa-ellipsis-v" />
                </button>
              </div>
            </div>
            <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Added {{ method.added }}</span>
              <span class="text-green-600 dark:text-green-400 font-medium"
                >{{ method.payoutsCount }} payouts</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Payout History -->
      <div
        class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
      >
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Payout History</h2>
          <div class="flex gap-2">
            <select
              v-model="filterStatus"
              class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg border-none focus:ring-2 focus:ring-[#e82264] text-sm"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="failed">Failed</option>
            </select>
            <button
              class="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 text-sm"
            >
              <font-awesome-icon icon="fa-download" class="mr-2" />
              Export
            </button>
          </div>
        </div>

        <!-- Payouts Table -->
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
                  Method
                </th>
                <th
                  class="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Transaction ID
                </th>
                <th
                  class="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Status
                </th>
                <th
                  class="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Amount
                </th>
                <th
                  class="text-center py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="payout in payoutHistory"
                :key="payout.id"
                class="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <td class="py-4 px-4">
                  <span class="text-sm text-gray-700 dark:text-gray-300">{{ payout.date }}</span>
                </td>
                <td class="py-4 px-4">
                  <div class="flex items-center gap-2">
                    <div
                      class="w-8 h-8 rounded-lg flex items-center justify-center"
                      :class="getMethodIconBg(payout.method)"
                    >
                      <font-awesome-icon :icon="getMethodIcon(payout.method)" class="text-sm" />
                    </div>
                    <span class="text-sm text-gray-900 dark:text-white font-medium">{{
                      payout.methodName
                    }}</span>
                  </div>
                </td>
                <td class="py-4 px-4">
                  <span class="text-sm text-gray-500 dark:text-gray-400 font-mono">{{
                    payout.transactionId
                  }}</span>
                </td>
                <td class="py-4 px-4">
                  <span
                    class="px-3 py-1 rounded-full text-xs font-medium"
                    :class="getStatusBadge(payout.status)"
                  >
                    {{ payout.status }}
                  </span>
                </td>
                <td class="py-4 px-4 text-right">
                  <span class="text-sm font-semibold text-gray-900 dark:text-white"
                    >${{ payout.amount.toFixed(2) }}</span
                  >
                </td>
                <td class="py-4 px-4 text-center">
                  <button class="text-[#e82264] hover:text-pink-700 text-sm font-medium">
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="flex items-center justify-between mt-6">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Showing <span class="font-medium">1-{{ payoutHistory.length }}</span> of
            <span class="font-medium">{{ payoutHistory.length }}</span> payouts
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

      <!-- Payout Info -->
      <div
        class="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800"
      >
        <div class="flex gap-4">
          <div
            class="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0"
          >
            <font-awesome-icon
              icon="fa-info-circle"
              class="text-blue-600 dark:text-blue-400 text-xl"
            />
          </div>
          <div>
            <h3 class="font-bold text-blue-900 dark:text-blue-300 mb-2">Payout Information</h3>
            <ul class="space-y-1 text-sm text-blue-800 dark:text-blue-400">
              <li>• Minimum withdrawal amount: $50</li>
              <li>• Processing time: 3-5 business days</li>
              <li>• Earnings are held for 7 days before becoming available</li>
              <li>• Payment processor fees may apply</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Balance Data
const availableBalance = ref(2850)
const pendingBalance = ref(1200)
const totalWithdrawn = ref(45600)

// Payout Methods
const payoutMethods = ref([
  {
    id: 1,
    name: 'Bank Account',
    type: 'bank',
    details: '****1234',
    isDefault: true,
    added: '3 months ago',
    payoutsCount: 12
  },
  {
    id: 2,
    name: 'PayPal',
    type: 'paypal',
    details: 'user@email.com',
    isDefault: false,
    added: '6 months ago',
    payoutsCount: 8
  }
])

// Payout History
const payoutHistory = ref([
  {
    id: 1,
    date: 'Jan 10, 2026',
    method: 'bank',
    methodName: 'Bank Account',
    transactionId: 'TXN123456789',
    status: 'Completed',
    amount: 2500.0
  },
  {
    id: 2,
    date: 'Jan 5, 2026',
    method: 'bank',
    methodName: 'Bank Account',
    transactionId: 'TXN123456788',
    status: 'Processing',
    amount: 1800.0
  },
  {
    id: 3,
    date: 'Dec 28, 2025',
    method: 'paypal',
    methodName: 'PayPal',
    transactionId: 'TXN123456787',
    status: 'Completed',
    amount: 3200.0
  },
  {
    id: 4,
    date: 'Dec 20, 2025',
    method: 'bank',
    methodName: 'Bank Account',
    transactionId: 'TXN123456786',
    status: 'Completed',
    amount: 2900.0
  },
  {
    id: 5,
    date: 'Dec 15, 2025',
    method: 'bank',
    methodName: 'Bank Account',
    transactionId: 'TXN123456785',
    status: 'Failed',
    amount: 1500.0
  }
])

// Filters
const filterStatus = ref('all')

// Modals
const showWithdrawalModal = ref(false)
const showAddMethodModal = ref(false)

// Helper Functions
const getMethodIcon = (type) => {
  const icons = {
    bank: 'fa-building-columns',
    paypal: 'fa-paypal',
    stripe: 'fa-stripe',
    crypto: 'fa-bitcoin'
  }
  return icons[type] || 'fa-credit-card'
}

const getMethodIconBg = (type) => {
  const colors = {
    bank: 'bg-blue-500/10 text-blue-600',
    paypal: 'bg-blue-600/10 text-blue-700',
    stripe: 'bg-purple-500/10 text-purple-600',
    crypto: 'bg-orange-500/10 text-orange-600'
  }
  return colors[type] || 'bg-gray-500/10 text-gray-600'
}

const getStatusBadge = (status) => {
  const badges = {
    Completed: 'bg-green-500/10 text-green-600',
    Pending: 'bg-yellow-500/10 text-yellow-600',
    Processing: 'bg-blue-500/10 text-blue-600',
    Failed: 'bg-red-500/10 text-red-600'
  }
  return badges[status] || 'bg-gray-500/10 text-gray-600'
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
