import { ref, watchEffect } from 'vue'

const isDark = ref(false)

// Initialize from localStorage or system preference
if (localStorage.getItem('theme')) {
  isDark.value = localStorage.getItem('theme') === 'dark'
} else {
  isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
}

watchEffect(() => {
  const html = document.documentElement
  if (isDark.value) {
    html.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    html.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
})

export function useDarkMode() {
  return {
    isDark,
    toggleDark: () => {
      isDark.value = !isDark.value
    }
  }
}
