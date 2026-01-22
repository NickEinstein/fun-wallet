<template>
  <div class="bg-[#F5F6FA] min-h-screen">
    <router-view />
    <DarkModeToggle />
    <!-- <CookieConsent /> -->
  </div>
</template>

<script setup>
import DarkModeToggle from './components/DarkModeToggle.vue'
// import CookieConsent from './components/CookieConsent.vue'
</script>
