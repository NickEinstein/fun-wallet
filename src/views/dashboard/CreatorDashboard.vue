<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <!-- Header -->
    <div
      class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 sticky top-0 z-10"
    >
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Creator Dashboard</h1>
      <p class="text-gray-600 dark:text-gray-400 text-sm mt-1">
        Welcome back! Here's your performance overview
      </p>
    </div>

    <div class="p-6 max-w-7xl mx-auto">
      <!-- Stats Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Total Earnings -->
        <div
          class="bg-gradient-to-br from-[#e82264] to-pink-600 rounded-2xl p-6 text-white shadow-xl"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <font-awesome-icon icon="fa-dollar-sign" class="text-2xl" />
            </div>
            <span class="text-white/80 text-sm font-medium">+12.5%</span>
          </div>
          <h3 class="text-white/90 text-sm font-medium mb-1">Total Earnings</h3>
          <p class="text-3xl font-bold">${{ totalEarnings.toLocaleString() }}</p>
          <p class="text-white/70 text-xs mt-2">This month</p>
        </div>

        <!-- Subscribers -->
        <div
          class="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-6 text-white shadow-xl"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <font-awesome-icon icon="fa-users" class="text-2xl" />
            </div>
            <span class="text-white/80 text-sm font-medium">+8.2%</span>
          </div>
          <h3 class="text-white/90 text-sm font-medium mb-1">Active Subscribers</h3>
          <p class="text-3xl font-bold">{{ subscribers.toLocaleString() }}</p>
          <p class="text-white/70 text-xs mt-2">{{ newSubscribers }} new this week</p>
        </div>

        <!-- Total Posts -->
        <div
          class="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-6 text-white shadow-xl"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <font-awesome-icon icon="fa-image" class="text-2xl" />
            </div>
            <span class="text-white/80 text-sm font-medium">+5 new</span>
          </div>
          <h3 class="text-white/90 text-sm font-medium mb-1">Total Posts</h3>
          <p class="text-3xl font-bold">{{ totalPosts }}</p>
          <p class="text-white/70 text-xs mt-2">{{ postsThisMonth }} this month</p>
        </div>

        <!-- Engagement Rate -->
        <div
          class="bg-gradient-to-br from-green-500 to-green-700 rounded-2xl p-6 text-white shadow-xl"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <font-awesome-icon icon="fa-heart" class="text-2xl" />
            </div>
            <span class="text-white/80 text-sm font-medium">+3.1%</span>
          </div>
          <h3 class="text-white/90 text-sm font-medium mb-1">Engagement Rate</h3>
          <p class="text-3xl font-bold">{{ engagementRate }}%</p>
          <p class="text-white/70 text-xs mt-2">Average this month</p>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <router-link
          to="/dashboard/earnings"
          class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200"
        >
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-[#e82264]/10 rounded-xl flex items-center justify-center">
              <font-awesome-icon icon="fa-chart-line" class="text-[#e82264] text-xl" />
            </div>
            <div>
              <h3 class="font-bold text-gray-900 dark:text-white">Earnings</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">View revenue breakdown</p>
            </div>
          </div>
        </router-link>

        <router-link
          to="/dashboard/payouts"
          class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200"
        >
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
              <font-awesome-icon icon="fa-wallet" class="text-purple-600 text-xl" />
            </div>
            <div>
              <h3 class="font-bold text-gray-900 dark:text-white">Payouts</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Manage withdrawals</p>
            </div>
          </div>
        </router-link>

        <router-link
          to="/dashboard/analytics"
          class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200"
        >
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
              <font-awesome-icon icon="fa-chart-pie" class="text-blue-600 text-xl" />
            </div>
            <div>
              <h3 class="font-bold text-gray-900 dark:text-white">Analytics</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">View detailed insights</p>
            </div>
          </div>
        </router-link>
      </div>

      <!-- Top Content Section -->
      <div
        class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
      >
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Top Performing Content</h2>
          <button class="text-[#e82264] text-sm font-semibold hover:underline">View All</button>
        </div>

        <!-- Top Posts Table -->
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-gray-200 dark:border-gray-700">
                <th
                  class="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Post
                </th>
                <th
                  class="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Views
                </th>
                <th
                  class="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Likes
                </th>
                <th
                  class="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Revenue
                </th>
                <th
                  class="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Type
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="post in topContent"
                :key="post.id"
                class="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <td class="py-4 px-4">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                      <img
                        v-if="post.thumbnail"
                        :src="post.thumbnail"
                        :alt="post.title"
                        class="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p class="font-medium text-gray-900 dark:text-white text-sm">
                        {{ post.title }}
                      </p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">{{ post.date }}</p>
                    </div>
                  </div>
                </td>
                <td class="py-4 px-4">
                  <span class="text-sm text-gray-700 dark:text-gray-300">{{
                    post.views.toLocaleString()
                  }}</span>
                </td>
                <td class="py-4 px-4">
                  <span class="text-sm text-gray-700 dark:text-gray-300">{{
                    post.likes.toLocaleString()
                  }}</span>
                </td>
                <td class="py-4 px-4">
                  <span class="text-sm font-semibold text-green-600 dark:text-green-400"
                    >${{ post.revenue.toLocaleString() }}</span
                  >
                </td>
                <td class="py-4 px-4">
                  <span
                    class="px-3 py-1 rounded-full text-xs font-medium"
                    :class="getPostTypeBadge(post.type)"
                  >
                    {{ post.type }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Recent Activity -->
      <div
        class="mt-8 bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
      >
        <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h2>
        <div class="space-y-4">
          <div
            v-for="activity in recentActivity"
            :key="activity.id"
            class="flex items-center gap-4 pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0"
          >
            <div
              class="w-10 h-10 rounded-full flex items-center justify-center"
              :class="getActivityIconBg(activity.type)"
            >
              <font-awesome-icon :icon="getActivityIcon(activity.type)" class="text-sm" />
            </div>
            <div class="flex-1">
              <p class="text-sm text-gray-900 dark:text-white font-medium">
                {{ activity.message }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">{{ activity.time }}</p>
            </div>
            <span
              v-if="activity.amount"
              class="text-sm font-semibold text-green-600 dark:text-green-400"
              >+${{ activity.amount }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Stats Data
const totalEarnings = ref(12450)
const subscribers = ref(1823)
const newSubscribers = ref(47)
const totalPosts = ref(156)
const postsThisMonth = ref(23)
const engagementRate = ref(8.7)

// Top Content Data
const topContent = ref([
  {
    id: 1,
    title: 'Exclusive Behind the Scenes',
    thumbnail: null,
    views: 2453,
    likes: 847,
    revenue: 1250,
    type: 'PPV',
    date: '2 days ago'
  },
  {
    id: 2,
    title: 'Premium Collection Set',
    thumbnail: null,
    views: 1892,
    likes: 623,
    revenue: 890,
    type: 'Subscription',
    date: '5 days ago'
  },
  {
    id: 3,
    title: 'Special Request Video',
    thumbnail: null,
    views: 1654,
    likes: 512,
    revenue: 450,
    type: 'PPV',
    date: '1 week ago'
  },
  {
    id: 4,
    title: 'Monthly Update Post',
    thumbnail: null,
    views: 1234,
    likes: 389,
    revenue: 320,
    type: 'Subscription',
    date: '1 week ago'
  }
])

// Recent Activity Data
const recentActivity = ref([
  { id: 1, type: 'subscriber', message: 'New subscriber joined', time: '5 min ago', amount: null },
  { id: 2, type: 'tip', message: 'Received a tip from @username', time: '1 hour ago', amount: 50 },
  { id: 3, type: 'ppv', message: 'PPV content purchased', time: '2 hours ago', amount: 25 },
  {
    id: 4,
    type: 'subscriber',
    message: 'New subscriber joined',
    time: '3 hours ago',
    amount: null
  },
  { id: 5, type: 'message', message: 'New message received', time: '5 hours ago', amount: null }
])

// Helper Functions
const getPostTypeBadge = (type) => {
  const badges = {
    PPV: 'bg-[#e82264]/10 text-[#e82264]',
    Subscription: 'bg-purple-500/10 text-purple-600',
    Tip: 'bg-green-500/10 text-green-600'
  }
  return badges[type] || 'bg-gray-500/10 text-gray-600'
}

const getActivityIcon = (type) => {
  const icons = {
    subscriber: 'fa-user-plus',
    tip: 'fa-dollar-sign',
    ppv: 'fa-lock',
    message: 'fa-envelope'
  }
  return icons[type] || 'fa-bell'
}

const getActivityIconBg = (type) => {
  const colors = {
    subscriber: 'bg-purple-500/10 text-purple-600',
    tip: 'bg-green-500/10 text-green-600',
    ppv: 'bg-[#e82264]/10 text-[#e82264]',
    message: 'bg-blue-500/10 text-blue-600'
  }
  return colors[type] || 'bg-gray-500/10 text-gray-600'
}
</script>

<style scoped>
/* Custom scrollbar for tables */
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
