<template>
  <div class="flex w-full min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <!-- Main Create Post Feed -->
    <div
      class="flex-1 flex flex-col border-r relative top-0 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 mb-[200px] md:mr-[35%] w-full md:w-[30%] transition-colors duration-300"
    >
      <!-- Header -->
      <div
        class="px-6 py-4 border-b border-gray-200 dark:border-gray-800 sticky top-0 w-full bg-white dark:bg-gray-900 z-10 flex items-center transition-colors duration-300"
      >
        <button @click="goBack" class="mr-2 text-gray-500 dark:text-gray-300 hover:text-[#3da9fc]">
          <font-awesome-icon icon="fa-arrow-left" />
        </button>
        <h1 class="text-lg font-bold tracking-tight dark:text-white">NEW POST</h1>
        <button
          @click="submitPost"
          type="button"
          class="ml-auto bg-[#e82264] text-white px-4 py-1 rounded-full font-semibold dark:bg-[#e82264] dark:text-white"
          :class="{ 'bg-gray-400 dark:bg-gray-700 cursor-not-allowed': !caption || !media }"
          :disabled="!caption || !media"
        >
          POST
        </button>
      </div>
      <!-- Compose New Post -->
      <div
        class="px-6 py-4 border-gray-100 dark:border-gray-800 border-b-2 transition-colors duration-300"
      >
        <!-- Title Input -->
        <input
          v-model="title"
          placeholder="Post title..."
          class="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 mb-3 text-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e82264] transition-colors duration-300"
        />

        <!-- Caption Textarea -->
        <textarea
          v-model="caption"
          placeholder="Write a caption..."
          rows="3"
          class="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e82264] transition-colors duration-300 resize-none"
        />

        <!-- Media Upload Section -->
        <div class="mt-4 space-y-3">
          <!-- Video Upload -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Upload Video <span class="text-xs text-gray-500">(Max 2MB)</span>
            </label>
            <div class="relative">
              <input
                type="file"
                ref="mediaInput"
                @change="handleMediaUpload"
                accept="video/*"
                class="hidden"
              />
              <button
                @click="$refs.mediaInput.click()"
                type="button"
                class="w-full px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-[#e82264] dark:hover:border-[#e82264] transition-colors flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300"
              >
                <font-awesome-icon icon="fa-video" />
                <span>{{ media ? media.name : 'Choose video file' }}</span>
              </button>
            </div>
          </div>

          <!-- Thumbnail Upload -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Upload Thumbnail <span class="text-xs text-gray-500">(Max 1MB)</span>
            </label>
            <div class="relative">
              <input
                type="file"
                ref="thumbnailInput"
                @change="handleThumbnailUpload"
                accept="image/*"
                class="hidden"
              />
              <button
                @click="$refs.thumbnailInput.click()"
                type="button"
                class="w-full px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-[#e82264] dark:hover:border-[#e82264] transition-colors flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300"
              >
                <font-awesome-icon icon="fa-image" />
                <span>{{ thumbnail ? thumbnail.name : 'Choose thumbnail image' }}</span>
              </button>
            </div>
          </div>

          <!-- Visibility and Status -->
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Content Type
              </label>
              <select
                v-model="contentType"
                class="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e82264] transition-colors"
              >
                <option value="post">Post</option>
                <option value="story">Story</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Visibility
              </label>
              <select
                v-model="visibility"
                class="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e82264] transition-colors"
              >
                <option value="public">Public</option>
                <option value="subscribers">Subscribers Only</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3 mt-3">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <select
                v-model="status"
                class="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e82264] transition-colors"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </div>
            <div v-if="contentType === 'story'">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Duration (Story)
              </label>
              <select
                v-model="storyDuration"
                class="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e82264] transition-colors"
              >
                <option value="5">5 seconds</option>
                <option value="10">10 seconds</option>
                <option value="15">15 seconds</option>
                <option value="24">24 hours</option>
              </select>
            </div>
          </div>
          
          <!-- Story Info Banner -->
          <div v-if="contentType === 'story'" class="mt-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div class="flex items-start gap-3">
              <font-awesome-icon icon="fa-info-circle" class="text-blue-600 dark:text-blue-400 text-xl mt-0.5" />
              <div>
                <p class="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-1">Story Mode</p>
                <p class="text-xs text-blue-700 dark:text-blue-400">
                  Stories are vertical short-form videos similar to Instagram Reels. They appear in a dedicated stories feed and expire after 24 hours (unless duration is set).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Empty space for post content -->
      <div class="flex-1 bg-white dark:bg-gray-900 transition-colors duration-300"></div>
    </div>
    <!-- Suggestions Sidebar -->
    <div class="hidden md:block">
      <SuggestionsSidebar />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import SuggestionsSidebar from '@/components/SuggestionsSidebar.vue'
import { useRouter } from 'vue-router'
import { post } from '@/api-services/fetchDocuments'

const router = useRouter()

const title = ref('')
const caption = ref('')
const media = ref(null)
const thumbnail = ref(null)
const contentType = ref('post')
const visibility = ref('subscribers')
const status = ref('published')
const storyDuration = ref('15')

function goBack() {
  router.back()
}

function handleMediaUpload(event) {
  const file = event.target.files[0]
  if (file) {
    const maxSize = 2 * 1024 * 1024 // 2MB in bytes
    if (file.size > maxSize) {
      alert('Video file size must not exceed 2MB')
      event.target.value = '' // Reset input
      return
    }
    media.value = file
  }
}

function handleThumbnailUpload(event) {
  const file = event.target.files[0]
  if (file) {
    const maxSize = 1 * 1024 * 1024 // 1MB in bytes
    if (file.size > maxSize) {
      alert('Thumbnail file size must not exceed 1MB')
      event.target.value = '' // Reset input
      return
    }
    thumbnail.value = file
  }
}

async function submitPost() {
  if (!media.value || !thumbnail.value) {
    alert('Please select both media and thumbnail files.')
    return
  }

  if (!caption.value.trim()) {
    alert('Please enter a caption.')
    return
  }

  const formData = new FormData()
  formData.append('title', title.value)
  formData.append('caption', caption.value)
  formData.append('media', media.value)
  formData.append('thumbnail', thumbnail.value)
  formData.append('contentType', contentType.value)
  formData.append('visibility', visibility.value)
  formData.append('status', status.value)
  
  if (contentType.value === 'story') {
    formData.append('storyDuration', storyDuration.value)
  }

  try {
    const response = await post({
      endpoint: '/contents/create',
      body: formData,
      auth: true
    })
    if (response?.data?.success) {
      alert(`${contentType.value === 'story' ? 'Story' : 'Post'} created successfully!`)
      // Reset form
      title.value = ''
      caption.value = ''
      media.value = null
      thumbnail.value = null
      contentType.value = 'post'
      router.push('/dashboard')
    } else {
      alert(response?.data?.message || `Failed to create ${contentType.value}`)
    }
  } catch (error) {
    console.error('Error creating content:', error)
    alert('An error occurred while creating the content')
  }
}
</script>
