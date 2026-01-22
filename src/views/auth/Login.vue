<template>
  <div class="relative min-h-screen flex items-center justify-center bg-[#1E1B4B] overflow-hidden">
    <!-- Background blobs -->
    <div
      class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#747CDA]/20 via-[#747CDA]/10 to-[#747CDA]/20 blur-3xl"
    ></div>

    <!-- Login Card -->
 
  </div>
</template>

<script setup>
import { ref } from 'vue'

</script>

<style scoped>
.loader {
  border: 2px solid #f3f3f3;
  border-top: 2px solid #747cda;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  animation: spin 0.8s linear infinite;
  display: inline-block;
  vertical-align: middle;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
