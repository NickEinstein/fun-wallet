// // src/composables/useAutoLogout.js

// import { ref, onMounted, onUnmounted } from 'vue'
// import { useRouter } from 'vue-router'

// export function useAutoLogout(timeout = 900000) {
//   // default: 15 minutes
//   const router = useRouter()
//   const timer = ref(null)

//   const startTimer = () => {
//     clearTimeout(timer.value)
//     timer.value = setTimeout(() => {
//       logout()
//     }, timeout)
//   }

//   const resetTimer = () => {
//     startTimer()
//   }

//   const logout = () => {
//     // Clear user session data (update as per your auth implementation)
//     localStorage.removeItem('authToken')
//     localStorage.removeItem('user')
//     localStorage.clear()

//     // Redirect to login page
//     router.push('/')
//   }

//   const initInactivityWatcher = () => {
//     window.addEventListener('mousemove', resetTimer)
//     window.addEventListener('keydown', resetTimer)
//     window.addEventListener('click', resetTimer)
//     window.addEventListener('scroll', resetTimer)

//     startTimer()
//   }

//   const cleanupInactivityWatcher = () => {
//     window.removeEventListener('mousemove', resetTimer)
//     window.removeEventListener('keydown', resetTimer)
//     window.removeEventListener('click', resetTimer)
//     window.removeEventListener('scroll', resetTimer)
//     clearTimeout(timer.value)
//   }

//   onMounted(initInactivityWatcher)
//   onUnmounted(cleanupInactivityWatcher)
// }

// src/composables/useLogout.js

// import { useRouter } from 'vue-router'
import router from '@/router'

export function useLogout() {
  // const router = useRouter()

  const logout = () => {
    // Clear local storage or Vuex/Pinia store if used
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')

    // Redirect to login
    router.push('/')
  }

  return { logout }
}
