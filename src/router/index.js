import { createRouter, createWebHistory } from 'vue-router'
// import MainLayout from '@/layouts/MainLayout.vue'

const routes = [
  // Topup Funnel (standalone, no MainLayout)
  {
    path: '/topup',
    name: 'topup',
    component: () => import('@/views/topup/TopupLanding.vue'),
    meta: { title: 'Top Up - FUN Wallet' }
  },
  {
    path: '/topup/success',
    name: 'topup-success',
    component: () => import('@/views/topup/TopupSuccess.vue'),
    meta: { title: 'Payment Successful - FUN Wallet' }
  },
  {
    path: '/topup/fail',
    name: 'topup-fail',
    component: () => import('@/views/topup/TopupFail.vue'),
    meta: { title: 'Payment Failed - FUN Wallet' }
  },

  // Auth pages (without MainLayout)
  // {
  //   path: '/landing',
  //   name: 'landing',
  //   component: () => import('@/views/landingPage/Landing.vue')
  // },
  // {
  //   path: '/register',
  //   name: 'register',
  //   component: () => import('@/views/landingPage/Register.vue')
  // },
  // {
  //   path: '/forgot-password',
  //   name: 'forgot-password',
  //   component: () => import('@/views/ForgotPassword.vue')
  // },
  {
    path: '/privacy-policy',
    name: 'privacy-policy',
    component: () => import('@/views/auth/PrivacyPolicy.vue')
  },
  {
    path: '/terms-of-service',
    name: 'terms-of-service',
    component: () => import('@/views/auth/Terms.vue')
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: () => import('@/views/auth/ResetPassword.vue')
  },
  {
    path: '/help',
    name: 'help-center',
    component: () => import('@/views/HelpCenter.vue')
  },
  {
    path: '/support',
    name: 'support-ticket',
    component: () => import('@/views/SupportTicket.vue')
  },
  {
    path: '/maintenance',
    name: 'maintenance',
    component: () => import('@/views/Maintenance.vue')
  },
  // {
  //   path: '/stories',
  //   name: 'stories',
  //   component: () => import('@/views/Stories.vue')
  // },
  {
    path: '/error-403',
    name: 'error-403',
    component: () => import('@/views/error/Error403.vue')
  },
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/error/Error404.vue')
  },

  {
    path: '/error-500',
    name: 'error-500',
    component: () => import('@/views/error/Error500.vue')
  },
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: () => import('@/views/auth/Home.vue')
  // },

  {
    path: '/',
    name: 'login',
    component: () => import('@/views/topup/TopupLanding.vue'),
  },
  // {
  //   path: '/fansngage',
  //   name: 'fansngage-landing',
  //   component: () => import('@/views/chlee/Landing.vue')
  // },

  // App pages (with MainLayout)
  // {
  //   path: '/',
  //   component: MainLayout,
  //   children: [
  //     {
  //       path: 'dashboard',
  //       name: 'dashboard',
  //       component: () => import('@/views/dashboard/Dashboard.vue')
  //     },
  //     {
  //       path: 'creator-dashboard',
  //       name: 'creator-dashboard',
  //       component: () => import('@/views/dashboard/CreatorDashboard.vue')
  //     },
  //     {
  //       path: 'dashboard/earnings',
  //       name: 'earnings',
  //       component: () => import('@/views/dashboard/Earnings.vue')
  //     },
  //     {
  //       path: 'dashboard/payouts',
  //       name: 'payouts',
  //       component: () => import('@/views/dashboard/Payouts.vue')
  //     },
  //     {
  //       path: 'dashboard/analytics',
  //       name: 'analytics',
  //       component: () => import('@/views/dashboard/Analytics.vue')
  //     },
  //     {
  //       path: 'create-post',
  //       name: 'create-post',
  //       component: () => import('@/views/dashboard/CreatePost.vue')
  //     },
  //     // {
  //     //   path: 'home',
  //     //   name: 'home',
  //     //   component: () => import('@/views/Home.vue')
  //     // },
  //     {
  //       path: 'notifications',
  //       name: 'notifications',
  //       component: () => import('@/views/Notifications.vue')
  //     },
  //     {
  //       path: 'messages',
  //       name: 'messages',
  //       component: () => import('@/views/Messages.vue')
  //     },
  //     {
  //       path: 'collections',
  //       name: 'collections',
  //       component: () => import('@/views/Collections.vue')
  //     },
  //     {
  //       path: 'subscriptions',
  //       name: 'subscriptions',
  //       component: () => import('@/views/Subscriptions.vue')
  //     },
  //     {
  //       path: 'add-card',
  //       name: 'add-card',
  //       component: () => import('@/views/AddCard.vue')
  //     },
  //     {
  //       path: 'profile',
  //       name: 'profile',
  //       component: () => import('@/views/Profile.vue')
  //     },
  //     {
  //       path: 'user/:id',
  //       name: 'user-profile',
  //       component: () => import('@/views/UserProfile.vue')
  //     },
  //     {
  //       path: 'more',
  //       name: 'more',
  //       component: () => import('@/views/More.vue')
  //     },
  //     {
  //       path: 'settings',
  //       name: 'settings',
  //       component: () => import('@/views/setting/Settings.vue')
  //     }
  //     // {
  //     //   path: '',
  //     //   name: 'home',
  //     //   component: () => import('@/views/auth/auth/Home.vue')
  //     // },
  //     // {
  //     // }
  //   ]
  // },

  // 404 page (standalone)
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: () => import('@/views/error/Error404.vue')
    // component: () => import('@/views/Notfound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

// Update document title based on route meta
router.beforeEach((to, from, next) => {
  if (to.meta?.title) {
    document.title = to.meta.title
  } else {
    document.title = 'FUN Wallet'
  }
  next()
})

// Auth guard
// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login']
//   const authRequired = !publicPages.includes(to.path)
//   const loggedIn = localStorage.getItem('token')

//   if (authRequired && !loggedIn) {
//     return next('/login')
//   }

//   next()
// })

export default router
