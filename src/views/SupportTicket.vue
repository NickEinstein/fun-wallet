<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg text-center max-w-lg w-full">
      <h1 class="text-2xl font-bold text-[#e82264] mb-4">Support Ticket</h1>
      <form @submit.prevent="submitTicket" class="space-y-4">
        <input
          v-model="email"
          type="email"
          required
          placeholder="Your Email"
          class="w-full border rounded px-3 py-2"
        />
        <input
          v-model="subject"
          type="text"
          required
          placeholder="Subject"
          class="w-full border rounded px-3 py-2"
        />
        <textarea
          v-model="message"
          required
          placeholder="Describe your issue..."
          class="w-full border rounded px-3 py-2 h-32"
        ></textarea>
        <button
          type="submit"
          class="bg-[#e82264] text-white px-6 py-2 rounded font-semibold hover:bg-[#d01f56] transition-colors w-full"
        >
          Submit Ticket
        </button>
      </form>
      <div v-if="success" class="text-green-600 mt-4">
        Your ticket has been submitted! Our support team will contact you soon.
      </div>
      <div v-if="error" class="text-red-600 mt-4">
        There was an error submitting your ticket. Please try again.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const email = ref('')
const subject = ref('')
const message = ref('')
const success = ref(false)
const error = ref(false)

async function submitTicket() {
  success.value = false
  error.value = false
  try {
    // Replace with your Freshdesk/Zendesk API endpoint or integration
    // Example: await fetch('/api/support', { method: 'POST', body: JSON.stringify({ email: email.value, subject: subject.value, message: message.value }) })
    // Simulate success
    await new Promise((resolve) => setTimeout(resolve, 1000))
    success.value = true
    email.value = ''
    subject.value = ''
    message.value = ''
  } catch (e) {
    error.value = true
  }
}
</script>

<style scoped></style>
