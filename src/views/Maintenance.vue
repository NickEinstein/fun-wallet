<template>
  <div class="min-h-screen flex flex-col md:flex-row">
    <!-- Left side: Image -->
    <div
      class="w-full md:w-1/2 min-h-[50vh] md:min-h-screen bg-cover bg-center bg-no-repeat"
      style="background-image: url('/src/assets/maintenance.jpg')"
    ></div>

    <div class="w-full md:w-1/2 flex items-center justify-center bg-white dark:bg-[#1a0033] p-8">
      <div
        class="bg-[#2b0055] dark:bg-[#140132] p-8 rounded-2xl shadow-xl text-center max-w-md border-t-8 border-[#e82264]"
      >
        <h1 class="text-3xl font-bold text-[#e82264] mb-4">Maintenance Mode</h1>
        <p class="text-purple-200 dark:text-purple-100 mb-6">
          Our site is currently undergoing scheduled maintenance.<br />
          We’ll be back online shortly. Thank you for your patience!
        </p>
        <div class="text-purple-300 dark:text-purple-200 text-sm mb-4">
          If you need urgent support, please contact
          <a href="mailto:support@fansngage.com" class="text-[#e82264] underline"
            >support@fansngage.com</a
          >
        </div>
        <div class="flex flex-col gap-3">
          <router-link
            to="/"
            class="inline-block px-6 py-3 bg-[#e82264] text-white font-bold rounded-xl shadow hover:bg-pink-700 transition-all duration-200"
            >Go Home</router-link
          >
          <!-- <button
            @click="history.back()"
            class="inline-block px-6 py-3 bg-white dark:bg-[#2b0055] text-[#e82264] font-bold rounded-xl shadow hover:bg-gray-200 dark:hover:bg-[#1a0033] transition-all duration-200"
          >
            Back
          </button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
:root {
  color-scheme: dark light;
}

@media (prefers-color-scheme: dark) {
  body {
    background: #0a001a;
  }
}
</style>
