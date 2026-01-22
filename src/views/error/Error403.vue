<template>
  <div class="min-h-screen flex flex-col md:flex-row">
    <!-- Left side: Image -->
    <div
      class="w-full md:w-1/2 min-h-[50vh] md:min-h-screen bg-cover bg-center bg-no-repeat"
      style="background-image: url('/src/assets/Error.jpg')"
    ></div>

    <!-- Right side: Content Card -->
    <div class="w-full md:w-1/2 flex items-center justify-center bg-white dark:bg-[#1a0033] p-8">
      <div
        class="bg-[#2b0055] dark:bg-[#140132] p-8 rounded-2xl shadow-xl md:h-[500px] text-center w-full border-t-8 border-[#e82264] flex items-center justify-center"
      >
        <div>
          <h1 class="text-5xl font-extrabold text-[#e82264] mb-2 tracking-tight drop-shadow">
            403
          </h1>
          <h2 class="text-2xl font-bold mb-2 text-white">Forbidden</h2>
          <p class="text-purple-200 dark:text-purple-100 mb-6">
            You do not have permission to access this page.
          </p>
          <div class="flex flex-col gap-3">
            <router-link
              to="/"
              class="inline-block px-6 py-3 bg-[#e82264] text-white font-bold rounded-xl shadow hover:bg-pink-700 transition-all duration-200"
              >Go Home</router-link
            >
          </div>
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
