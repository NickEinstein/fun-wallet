<template>
  <section class="relative overflow-hidden px-4 pt-12 pb-8 md:pt-20 md:pb-12">
    <!-- Background Effects -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl"
      ></div>
      <div
        class="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl"
      ></div>
    </div>

    <div class="relative max-w-4xl mx-auto text-center">
      <!-- Badge -->
      <div
        class="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold px-4 py-2 rounded-full mb-6 animate-pulse"
      >
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>
        +100% FAN Bonus Credits
      </div>

      <!-- Main Headline -->
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
          >FUN Wallet</span
        >
        <br />Buy Credits
      </h1>

      <!-- Subheadline -->
      <p class="text-lg md:text-xl text-purple-200 mb-8 max-w-2xl mx-auto">
        Get real credits plus FREE FAN bonus credits! Use them to tip creators, unlock exclusive content, and access premium features.
      </p>

      <!-- What you get -->
      <div class="flex flex-wrap items-center justify-center gap-4 mb-8">
        <div class="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
          <span class="text-xl">💰</span>
          <span class="text-white font-medium">Real Credits</span>
        </div>
        <div class="text-2xl text-purple-400">+</div>
        <div class="flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-full border border-green-500/30">
          <span class="text-xl">🎁</span>
          <span class="text-green-400 font-medium">FAN Bonus Credits</span>
        </div>
      </div>

      <!-- Trust Line -->
      <div class="flex flex-wrap items-center justify-center gap-6 text-sm text-purple-300">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <span>Secure Payment</span>
        </div>
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          <span>Instant Credits</span>
        </div>
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span>Instant Confirmation</span>
        </div>
      </div>

      <!-- Powered by Stripe -->
      <div class="mt-8 flex items-center justify-center gap-2 text-purple-400 text-sm">
        <span>Powered by</span>
        <svg class="h-6" viewBox="0 0 60 25" fill="currentColor">
          <path
            d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32c-1.14.62-2.62 1.1-4.56 1.1-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.04 1.26-.06 1.48zm-6.3-5.63c-1.03 0-1.87.73-2.07 2.34h4.09c-.15-1.32-.84-2.34-2.02-2.34zM41.24 20.3V5.68l4.14-.83v15.45h-4.14zM28.67 20.3V0l4.14-.83v8.06a6.08 6.08 0 013.03-.78c3.05 0 5.54 2.23 5.54 7.12 0 5.63-2.97 7.73-6.18 7.73-1.36 0-2.53-.35-3.57-1.1l-.18.88h-3.78zm4.14-4.05c.59.44 1.19.64 1.99.64 1.42 0 2.66-1.18 2.66-4.22 0-2.36-.89-3.85-2.66-3.85-.62 0-1.38.23-1.99.73v6.7zM23.52 5.68v14.62h-4.14V5.68h4.14zM21.45 4.03c-1.32 0-2.39-1.03-2.39-2.31A2.35 2.35 0 0121.45 0c1.32 0 2.39 1.03 2.39 2.31 0 1.28-1.07 2.31-2.39 2.31h0zM14.86 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32c-1.14.62-2.62 1.1-4.56 1.1-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.04 1.26-.06 1.48zm-6.3-5.63c-1.03 0-1.87.73-2.07 2.34h4.09c-.15-1.32-.84-2.34-2.02-2.34z"
          />
        </svg>
      </div>
    </div>
  </section>
</template>

<script setup>
// No additional logic needed for hero section
</script>
