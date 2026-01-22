<template>
  <div class="flex w-full min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <!-- Main Feed -->
    <div
      class="flex-1 flex flex-col border-r relative top-0 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 mb-[200px] md:mr-[35%] w-full md:w-[30%] transition-colors duration-300"
    >
      <!-- Header -->
      <div
        class="px-6 py-4 border-b border-gray-200 dark:border-gray-800 sticky top-0 w-full bg-white dark:bg-gray-900 z-10 transition-colors duration-300"
      >
        <h1 class="text-lg font-bold tracking-tight dark:text-white">HOME</h1>
      </div>
      <!-- Compose New Post -->
      <div
        v-if="user.user.role !== 'user'"
        class="px-6 py-4 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300"
      >
        <input
          type="text"
          placeholder="Compose new post..."
          class="w-full bg-white dark:bg-gray-800 border !border-none focus-ring:!border-none rounded-lg px-4 py-3 text-gray-600 dark:text-gray-200 focus:!outline-none transition-colors duration-300"
          @focusin="goToNotifications"
        />
        <div class="flex gap-4 mt-4">
          <div
            class="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center"
          >
            <font-awesome-icon icon="fa-camera" class="text-gray-400 dark:text-gray-300 text-lg" />
          </div>
          <div
            class="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center"
          >
            <font-awesome-icon icon="fa-folder" class="text-gray-400 dark:text-gray-300 text-lg" />
          </div>
          <div
            class="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center"
          >
            <font-awesome-icon icon="fa-font" class="text-gray-400 dark:text-gray-300 text-lg" />
          </div>
        </div>
      </div>
      <!-- Post Filter Tabs -->
      <div
        v-if="user.user.role !== 'user'"
        class="px-6 py-2 flex gap-2 items-center border-b border-gray-100 dark:border-gray-800 transition-colors duration-300"
      >
        <button
          class="px-4 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-200 text-sm font-semibold"
        >
          All
        </button>
        <button
          class="px-4 py-1 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-300 text-sm font-semibold"
        >
          <font-awesome-icon icon="fa-pen" />
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="loading && posts.length === 0" class="px-6 py-8 text-center">
        <div class="text-gray-500 dark:text-gray-400">Loading posts...</div>
      </div>

      <!-- Error State -->
      <div v-if="error" class="px-6 py-8 text-center">
        <div class="text-red-500 dark:text-red-400">{{ error }}</div>
      </div>

      <!-- Posts -->
      <div
        v-for="post in posts"
        :key="post.id"
        class="px-6 py-4 border-b border-gray-100 dark:border-gray-800"
      >
        <div class="flex gap-3 items-start">
          <div
            class="w-10 h-10 rounded-full bg-[#e82264] flex items-center justify-center text-white font-bold text-lg"
          >
            {{ getUserInitials(post.relationships.creator.name) }}
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <span class="font-bold text-gray-800 dark:text-gray-200"
                >{{ post.relationships.creator.name }}
                <font-awesome-icon icon="fa-check" class="text-xs text-[#e82264]" />
              </span>
              <span class="text-gray-400 dark:text-gray-300 text-xs">@{{ post.slug }}</span>
              <span class="text-gray-400 dark:text-gray-300 text-xs ml-auto">{{
                formatDate(post.created_at)
              }}</span>
            </div>

            <!-- Post Title -->
            <div class="mt-1 text-gray-800 dark:text-gray-200 font-semibold text-[15px]">
              {{ post.title }}
            </div>

            <!-- Post Caption -->
            <div class="mt-1 text-gray-700 dark:text-gray-300 text-[15px]">
              {{ post.caption }}
            </div>

            <!-- Media (Video or Image) -->
            <div
              v-if="post.media_url"
              class="mt-4 w-full rounded-lg overflow-hidden bg-black dark:bg-gray-800 aspect-video"
            >
              <!-- Video -->
              <video
                v-if="isVideo(post.media_url)"
                :src="post.media_url"
                :poster="post.thumbnail_url"
                controls
                class="w-full h-full object-cover"
              ></video>

              <!-- Image -->
              <img
                v-else
                :src="post.media_url"
                :alt="post.title"
                class="w-full h-full object-cover"
              />
            </div>

            <!-- Post Stats -->
            <div class="mt-3 flex items-center gap-6 text-gray-500 dark:text-gray-400 text-sm">
              <div
                @click="handleLike(post.id, posts.indexOf(post))"
                class="flex items-center gap-2 cursor-pointer hover:text-[#e82264] transition-colors"
              >
                <font-awesome-icon icon="fa-heart" />
                <span>{{ post.relationships.likes_count }}</span>
              </div>
              <div
                @click="toggleComments(post.id)"
                class="flex items-center gap-2 cursor-pointer hover:text-[#e82264] transition-colors"
              >
                <font-awesome-icon icon="fa-comment" />
                <span>{{ post.relationships.comments_count }}</span>
              </div>
              <div
                class="flex items-center gap-2 cursor-pointer hover:text-[#e82264] transition-colors"
              >
                <font-awesome-icon icon="fa-share" />
              </div>
            </div>

            <!-- Comments Section -->
            <div
              v-if="expandedPosts.has(post.id)"
              class="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4"
            >
              <!-- Existing Comments -->
              <div
                v-if="post.relationships.comments && post.relationships.comments.length > 0"
                class="space-y-3 mb-4"
              >
                <div
                  v-for="comment in post.relationships.comments"
                  :key="comment.id"
                  class="flex gap-2"
                >
                  <div
                    class="w-8 h-8 rounded-full bg-[#e82264] flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                  >
                    {{ getUserInitials(comment.user?.name || 'User') }}
                  </div>
                  <div class="flex-1">
                    <div class="bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2">
                      <div class="font-semibold text-sm text-gray-800 dark:text-gray-200">
                        {{ comment.user?.name || 'User' }}
                      </div>
                      <div class="text-sm text-gray-700 dark:text-gray-300">
                        {{ comment.comment }}
                      </div>
                    </div>
                    <div class="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-3">
                      {{ formatDate(comment.created_at) }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Add Comment Input -->
              <div class="flex gap-2">
                <div
                  class="w-8 h-8 rounded-full bg-[#e82264] flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                >
                  {{ getUserInitials(user.user.name) }}
                </div>
                <div class="flex-1 flex gap-2">
                  <input
                    v-model="newComments[post.id]"
                    type="text"
                    placeholder="Write a comment..."
                    class="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e82264] transition-colors duration-300"
                    @keypress.enter="submitComment(post.id)"
                  />
                  <button
                    @click="submitComment(post.id)"
                    :disabled="!newComments[post.id]?.trim() || commentLoading[post.id]"
                    class="px-4 py-2 bg-[#e82264] text-white rounded-full text-sm hover:bg-[#d01d57] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                  >
                    {{ commentLoading[post.id] ? '...' : 'Post' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Load More Button -->
      <div v-if="currentPage < totalPages" class="px-6 py-4 text-center">
        <button
          @click="loadMore"
          :disabled="loading"
          class="px-6 py-2 bg-[#e82264] text-white rounded-full hover:bg-[#d01d57] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
        >
          {{ loading ? 'Loading...' : 'Load More' }}
        </button>
      </div>

      <!-- Empty State -->
      <div v-if="!loading && posts.length === 0" class="px-6 py-8 text-center">
        <div class="text-gray-500 dark:text-gray-400">No posts available</div>
      </div>
    </div>
    <!-- Suggestions Sidebar -->
    <div class="hidden md:block">
      <SuggestionsSidebar />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { get, post } from '@/api-services/fetch'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import SuggestionsSidebar from '@/components/SuggestionsSidebar.vue'

const router = useRouter()
const user = JSON.parse(localStorage.getItem('user'))
console.log('Current User:', user)

// Reactive state
const posts = ref([])
const loading = ref(false)
const error = ref(null)
const currentPage = ref(1)
const totalPages = ref(1)
const perPage = ref(20)

// Comment state
const expandedPosts = ref(new Set())
const newComments = ref({})
const commentLoading = ref({})

// Fetch contents from API
const fetchContents = async (page = 1) => {
  loading.value = true
  error.value = null

  try {
    const response = await get({
      endpoint: 'getAllContents',
      pQuery: { page },
      auth: true
    })

    if (response.data && response.data.success) {
      posts.value = response.data.data
      currentPage.value = response.data.meta.current_page
      totalPages.value = response.data.meta.last_page
      perPage.value = response.data.meta.per_page
    } else {
      error.value = 'Failed to load contents'
    }
  } catch (err) {
    error.value = 'An error occurred while fetching contents'
    console.error('Error fetching contents:', err)
  } finally {
    loading.value = false
  }
}

// Navigate to create post page
function goToNotifications() {
  router.push({ name: 'create-post' })
}

// Format date to relative time
const formatDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMs = now - date
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInDays = Math.floor(diffInHours / 24)

  if (diffInHours < 1) return 'Just now'
  if (diffInHours < 24) return `${diffInHours} hours ago`
  if (diffInDays < 7) return `${diffInDays} days ago`
  return date.toLocaleDateString()
}

// Get user initials
const getUserInitials = (name) => {
  if (!name) return 'U'
  const names = name.split(' ')
  return names.length > 1 ? `${names[0][0]}${names[1][0]}`.toUpperCase() : names[0][0].toUpperCase()
}

// Check if media is video
const isVideo = (url) => {
  return url && (url.includes('video') || url.endsWith('.mp4') || url.endsWith('.webm'))
}

// Load next page
const loadMore = () => {
  if (currentPage.value < totalPages.value) {
    fetchContents(currentPage.value + 1)
  }
}

// Handle like action
const handleLike = async (postId, index) => {
  try {
    const response = await post({
      endpoint: 'likeContent',
      param: `${postId}/like`,
      auth: true
    })

    if (response.data && response.data.success) {
      // Update likes count locally
      posts.value[index].relationships.likes_count =
        response.data.data.likes_count || posts.value[index].relationships.likes_count + 1
    }
  } catch (err) {
    console.error('Error liking post:', err)
  }
}

// Toggle comments section
const toggleComments = (postId) => {
  if (expandedPosts.value.has(postId)) {
    expandedPosts.value.delete(postId)
  } else {
    expandedPosts.value.add(postId)
  }
  expandedPosts.value = new Set(expandedPosts.value)
}

// Submit comment
const submitComment = async (postId) => {
  if (!newComments.value[postId]?.trim()) return

  commentLoading.value[postId] = true

  try {
    const response = await post({
      endpoint: 'commentContent',
      param: `${postId}/comment`,
      body: {
        comment: newComments.value[postId]
      },
      auth: true
    })

    if (response.data && response.data.success) {
      // Update comments in the post
      const postIndex = posts.value.findIndex((p) => p.id === postId)
      if (postIndex !== -1) {
        // Add the new comment to the comments array
        if (!posts.value[postIndex].relationships.comments) {
          posts.value[postIndex].relationships.comments = []
        }
        posts.value[postIndex].relationships.comments.unshift(response.data.data)
        posts.value[postIndex].relationships.comments_count += 1
      }
      // Clear the input
      newComments.value[postId] = ''
    }
  } catch (err) {
    console.error('Error posting comment:', err)
  } finally {
    commentLoading.value[postId] = false
  }
}

// Initialize on mount
onMounted(() => {
  fetchContents()
})
</script>
