<template>
  <div class="p-4 md:p-8 max-w-4xl">
    <h2 class="text-2xl md:text-3xl font-bold mb-2 text-gray-800 dark:text-gray-100">
      KYC Verification
    </h2>
    <p class="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-6">
      Verify your identity to unlock premium features and increase trust with your subscribers
    </p>

    <!-- Verification Status Banner -->
    <div
      v-if="verificationStatus"
      class="mb-8 p-6 rounded-2xl border-2"
      :class="getStatusBannerClass(verificationStatus)"
    >
      <div class="flex items-start gap-4">
        <div
          class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          :class="getStatusIconBg(verificationStatus)"
        >
          <font-awesome-icon :icon="getStatusIcon(verificationStatus)" class="text-2xl" />
        </div>
        <div class="flex-1">
          <h3 class="text-lg font-bold mb-1" :class="getStatusTextClass(verificationStatus)">
            {{ getStatusTitle(verificationStatus) }}
          </h3>
          <p class="text-sm" :class="getStatusDescClass(verificationStatus)">
            {{ getStatusDescription(verificationStatus) }}
          </p>
          <div v-if="verificationStatus === 'pending'" class="mt-3">
            <div class="flex items-center gap-2 text-sm">
              <div class="w-full max-w-xs bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div class="bg-blue-600 h-2 rounded-full" style="width: 75%"></div>
              </div>
              <span class="text-gray-600 dark:text-gray-400 font-medium whitespace-nowrap"
                >Processing...</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Verification Benefits -->
    <div
      v-if="!verificationStatus || verificationStatus === 'none'"
      class="mb-8 bg-gradient-to-br from-[#e82264]/10 to-purple-500/10 dark:from-[#e82264]/20 dark:to-purple-500/20 rounded-2xl p-6 border border-[#e82264]/20"
    >
      <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <font-awesome-icon icon="fa-star" class="text-[#e82264]" />
        Verification Benefits
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="flex items-start gap-3">
          <div
            class="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0"
          >
            <font-awesome-icon icon="fa-check" class="text-green-600 text-sm" />
          </div>
          <div>
            <p class="font-medium text-gray-900 dark:text-white text-sm">Verified Badge</p>
            <p class="text-xs text-gray-600 dark:text-gray-400">
              Display a verified checkmark on your profile
            </p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <div
            class="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0"
          >
            <font-awesome-icon icon="fa-check" class="text-green-600 text-sm" />
          </div>
          <div>
            <p class="font-medium text-gray-900 dark:text-white text-sm">Higher Earnings</p>
            <p class="text-xs text-gray-600 dark:text-gray-400">
              Unlock premium subscription tiers
            </p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <div
            class="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0"
          >
            <font-awesome-icon icon="fa-check" class="text-green-600 text-sm" />
          </div>
          <div>
            <p class="font-medium text-gray-900 dark:text-white text-sm">Faster Payouts</p>
            <p class="text-xs text-gray-600 dark:text-gray-400">
              Get access to express withdrawal options
            </p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <div
            class="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0"
          >
            <font-awesome-icon icon="fa-check" class="text-green-600 text-sm" />
          </div>
          <div>
            <p class="font-medium text-gray-900 dark:text-white text-sm">Build Trust</p>
            <p class="text-xs text-gray-600 dark:text-gray-400">
              Increase subscriber confidence and retention
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Upload Documents Section -->
    <div
      v-if="
        !verificationStatus || verificationStatus === 'none' || verificationStatus === 'rejected'
      "
      class="space-y-6"
    >
      <!-- Personal Information -->
      <div
        class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
      >
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Personal Information</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >Full Legal Name</label
            >
            <input
              v-model="formData.fullName"
              type="text"
              placeholder="Enter your full name as shown on ID"
              class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e82264] text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >Date of Birth</label
            >
            <input
              v-model="formData.dateOfBirth"
              type="date"
              class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e82264] text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >Country</label
            >
            <select
              v-model="formData.country"
              class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e82264] text-gray-900 dark:text-white"
            >
              <option value="">Select country</option>
              <option value="US">United States</option>
              <option value="GB">United Kingdom</option>
              <option value="CA">Canada</option>
              <option value="AU">Australia</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="ES">Spain</option>
              <option value="IT">Italy</option>
              <option value="NL">Netherlands</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >ID Number</label
            >
            <input
              v-model="formData.idNumber"
              type="text"
              placeholder="Enter your ID number"
              class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e82264] text-gray-900 dark:text-white"
            />
          </div>
        </div>
      </div>

      <!-- ID Document Upload -->
      <div
        class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
      >
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Identity Document</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Upload a clear photo of your government-issued ID (passport, driver's license, or national
          ID)
        </p>
        <div
          @click="triggerFileInput('idDocument')"
          @dragover.prevent
          @drop.prevent="handleFileDrop($event, 'idDocument')"
          class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center cursor-pointer hover:border-[#e82264] hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all"
          :class="{ 'border-[#e82264] bg-[#e82264]/5': uploads.idDocument }"
        >
          <input
            ref="idDocumentInput"
            type="file"
            accept="image/*,.pdf"
            @change="handleFileSelect($event, 'idDocument')"
            class="hidden"
          />
          <div v-if="!uploads.idDocument">
            <font-awesome-icon
              icon="fa-cloud-arrow-up"
              class="text-5xl text-gray-400 dark:text-gray-500 mb-4"
            />
            <p class="text-gray-700 dark:text-gray-300 font-medium mb-1">
              Click to upload or drag and drop
            </p>
            <p class="text-sm text-gray-500 dark:text-gray-400">PNG, JPG, PDF up to 10MB</p>
          </div>
          <div v-else class="flex items-center justify-center gap-3">
            <font-awesome-icon icon="fa-file-image" class="text-3xl text-[#e82264]" />
            <div class="text-left">
              <p class="text-gray-900 dark:text-white font-medium">{{ uploads.idDocument.name }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ formatFileSize(uploads.idDocument.size) }}
              </p>
            </div>
            <button
              @click.stop="removeFile('idDocument')"
              class="ml-4 text-red-600 hover:text-red-700"
            >
              <font-awesome-icon icon="fa-trash" />
            </button>
          </div>
        </div>
      </div>

      <!-- Selfie Upload -->
      <div
        class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
      >
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Selfie Verification</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Take a clear selfie holding your ID next to your face. Make sure both your face and ID are
          clearly visible.
        </p>
        <div
          @click="triggerFileInput('selfie')"
          @dragover.prevent
          @drop.prevent="handleFileDrop($event, 'selfie')"
          class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center cursor-pointer hover:border-[#e82264] hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all"
          :class="{ 'border-[#e82264] bg-[#e82264]/5': uploads.selfie }"
        >
          <input
            ref="selfieInput"
            type="file"
            accept="image/*"
            @change="handleFileSelect($event, 'selfie')"
            class="hidden"
          />
          <div v-if="!uploads.selfie">
            <font-awesome-icon
              icon="fa-camera"
              class="text-5xl text-gray-400 dark:text-gray-500 mb-4"
            />
            <p class="text-gray-700 dark:text-gray-300 font-medium mb-1">
              Click to take or upload selfie
            </p>
            <p class="text-sm text-gray-500 dark:text-gray-400">PNG, JPG up to 10MB</p>
          </div>
          <div v-else class="flex items-center justify-center gap-3">
            <font-awesome-icon icon="fa-image" class="text-3xl text-[#e82264]" />
            <div class="text-left">
              <p class="text-gray-900 dark:text-white font-medium">{{ uploads.selfie.name }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ formatFileSize(uploads.selfie.size) }}
              </p>
            </div>
            <button @click.stop="removeFile('selfie')" class="ml-4 text-red-600 hover:text-red-700">
              <font-awesome-icon icon="fa-trash" />
            </button>
          </div>
        </div>
      </div>

      <!-- Terms & Submit -->
      <div
        class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
      >
        <div class="flex items-start gap-3 mb-6">
          <input
            v-model="agreedToTerms"
            type="checkbox"
            id="terms"
            class="mt-1 w-4 h-4 text-[#e82264] rounded focus:ring-[#e82264]"
          />
          <label for="terms" class="text-sm text-gray-700 dark:text-gray-300">
            I confirm that the information provided is accurate and I agree to the
            <a href="#" class="text-[#e82264] hover:underline">verification terms</a> and
            <a href="#" class="text-[#e82264] hover:underline">privacy policy</a>.
          </label>
        </div>
        <button
          @click="submitVerification"
          :disabled="!canSubmit || isSubmitting"
          class="w-full px-6 py-4 bg-[#e82264] text-white font-bold rounded-xl hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <font-awesome-icon v-if="isSubmitting" icon="fa-spinner" class="animate-spin mr-2" />
          {{ isSubmitting ? 'Submitting...' : 'Submit Verification' }}
        </button>
      </div>
    </div>

    <!-- Verification Submitted -->
    <div
      v-if="verificationStatus === 'pending'"
      class="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 text-center"
    >
      <div
        class="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <font-awesome-icon icon="fa-clock" class="text-4xl text-blue-600" />
      </div>
      <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">
        Verification In Progress
      </h3>
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        Your documents are being reviewed by our team. This usually takes 24-48 hours.
      </p>
      <div class="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-left">
        <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Submitted Documents:</h4>
        <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li class="flex items-center gap-2">
            <font-awesome-icon icon="fa-check-circle" class="text-green-600" />
            Personal Information
          </li>
          <li class="flex items-center gap-2">
            <font-awesome-icon icon="fa-check-circle" class="text-green-600" />
            Identity Document
          </li>
          <li class="flex items-center gap-2">
            <font-awesome-icon icon="fa-check-circle" class="text-green-600" />
            Selfie Verification
          </li>
        </ul>
      </div>
    </div>

    <!-- Verification Approved -->
    <div
      v-if="verificationStatus === 'approved'"
      class="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 text-center"
    >
      <div
        class="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <font-awesome-icon icon="fa-check-circle" class="text-4xl text-green-600" />
      </div>
      <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">Verification Complete!</h3>
      <p class="text-gray-600 dark:text-gray-400 mb-4">
        Your account has been successfully verified. You now have access to all premium features.
      </p>
      <div
        class="inline-flex items-center gap-2 bg-green-500/10 text-green-700 dark:text-green-400 px-4 py-2 rounded-full font-semibold"
      >
        <font-awesome-icon icon="fa-badge-check" />
        Verified Creator
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Form Data
const formData = ref({
  fullName: '',
  dateOfBirth: '',
  country: '',
  idNumber: ''
})

// Uploads
const uploads = ref({
  idDocument: null,
  selfie: null
})

// State
const agreedToTerms = ref(false)
const isSubmitting = ref(false)
const verificationStatus = ref('none') // none, pending, approved, rejected

// Refs for file inputs
const idDocumentInput = ref(null)
const selfieInput = ref(null)

// Computed
const canSubmit = computed(() => {
  return (
    formData.value.fullName &&
    formData.value.dateOfBirth &&
    formData.value.country &&
    formData.value.idNumber &&
    uploads.value.idDocument &&
    uploads.value.selfie &&
    agreedToTerms.value
  )
})

// Methods
function triggerFileInput(type) {
  if (type === 'idDocument') {
    idDocumentInput.value?.click()
  } else if (type === 'selfie') {
    selfieInput.value?.click()
  }
}

function handleFileSelect(event, type) {
  const file = event.target.files[0]
  if (file) {
    uploads.value[type] = file
  }
}

function handleFileDrop(event, type) {
  const file = event.dataTransfer.files[0]
  if (file) {
    uploads.value[type] = file
  }
}

function removeFile(type) {
  uploads.value[type] = null
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

async function submitVerification() {
  if (!canSubmit.value) return

  isSubmitting.value = true

  // Simulate API call
  setTimeout(() => {
    verificationStatus.value = 'pending'
    isSubmitting.value = false
  }, 2000)
}

// Status helpers
function getStatusBannerClass(status) {
  const classes = {
    pending: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    approved: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    rejected: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
  }
  return classes[status] || ''
}

function getStatusIconBg(status) {
  const classes = {
    pending: 'bg-blue-500/10 text-blue-600',
    approved: 'bg-green-500/10 text-green-600',
    rejected: 'bg-red-500/10 text-red-600'
  }
  return classes[status] || ''
}

function getStatusIcon(status) {
  const icons = {
    pending: 'fa-clock',
    approved: 'fa-check-circle',
    rejected: 'fa-exclamation-circle'
  }
  return icons[status] || 'fa-info-circle'
}

function getStatusTitle(status) {
  const titles = {
    pending: 'Verification Pending',
    approved: 'Verified Account',
    rejected: 'Verification Rejected'
  }
  return titles[status] || 'Verification Status'
}

function getStatusDescription(status) {
  const descriptions = {
    pending: "Your verification is being reviewed. We'll notify you once it's complete.",
    approved:
      'Your account has been successfully verified. You have access to all premium features.',
    rejected:
      'Your verification was rejected. Please review the feedback and resubmit with correct information.'
  }
  return descriptions[status] || ''
}

function getStatusTextClass(status) {
  const classes = {
    pending: 'text-blue-900 dark:text-blue-300',
    approved: 'text-green-900 dark:text-green-300',
    rejected: 'text-red-900 dark:text-red-300'
  }
  return classes[status] || ''
}

function getStatusDescClass(status) {
  const classes = {
    pending: 'text-blue-700 dark:text-blue-400',
    approved: 'text-green-700 dark:text-green-400',
    rejected: 'text-red-700 dark:text-red-400'
  }
  return classes[status] || ''
}
</script>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
