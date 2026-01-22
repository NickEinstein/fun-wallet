<template>
  <button
    @click="toggleDark"
    class="fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 transition-colors duration-300"
    aria-label="Toggle dark mode"
  >
    <span v-if="isDark">🌙</span>
    <span v-else>☀️</span>
  </button>
</template>

<script setup>
import { useDarkMode } from '../composables/useDarkMode'
const { isDark, toggleDark } = useDarkMode()
</script>
