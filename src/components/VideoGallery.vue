<template>
  <Teleport to="body">
    <div 
      v-if="isOpen" 
      class="video-gallery"
      role="dialog"
      aria-modal="true"
      aria-label="Galería de videos"
    >
      <!-- Backdrop -->
      <div class="gallery-backdrop" @click="close" />

      <!-- Contenido principal -->
      <div class="gallery-content" @keydown.escape="close" tabindex="0" ref="contentRef">
        <!-- Header -->
        <div class="gallery-header">
          <div class="gallery-info">
            <h2 class="gallery-title">{{ currentVideo?.title }}</h2>
            <div class="gallery-counter">
              <span class="gallery-counter__current">{{ currentIndex + 1 }}</span>
              <span class="gallery-counter__separator">/</span>
              <span class="gallery-counter__total">{{ videos.length }}</span>
            </div>
          </div>
          
          <button class="gallery-close" @click="close" aria-label="Cerrar galería">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Video actual -->
        <div class="gallery-main">
          <video 
            ref="videoRef"
            :key="currentIndex"
            :src="currentVideo?.src"
            :poster="currentVideo?.poster"
            controls
            autoplay
            preload="metadata"
            playsinline
            class="gallery-video"
            @loadstart="onLoadStart"
            @canplay="onCanPlay"
            @error="onError"
          />
          
          <div v-if="isLoading" class="gallery-loader">
            <div class="gallery-spinner" />
            <span>Cargando video...</span>
          </div>
          
          <div v-if="hasError" class="gallery-error">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>Error al cargar el video</span>
          </div>
        </div>

        <!-- Navegación -->
        <button 
          v-if="currentIndex > 0"
          class="gallery-nav gallery-nav--prev" 
          @click="prev"
          aria-label="Video anterior"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button 
          v-if="currentIndex < videos.length - 1"
          class="gallery-nav gallery-nav--next" 
          @click="next"
          aria-label="Video siguiente"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <!-- Footer con miniaturas -->
        <div class="gallery-footer">
          <div class="gallery-thumbnails">
            <button
              v-for="(video, index) in visibleThumbnails"
              :key="index"
              class="thumbnail"
              :class="{ 'thumbnail--active': index + thumbOffset === currentIndex }"
              @click="goTo(index + thumbOffset)"
              :aria-label="`Ir a video ${index + thumbOffset + 1}`"
            >
              <div class="thumbnail__icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span class="thumbnail__title">{{ video.title }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'

const props = defineProps({
  videos: {
    type: Array,
    required: true
  },
  initialIndex: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['close', 'change'])

const isOpen = ref(false)
const currentIndex = ref(props.initialIndex)
const isLoading = ref(false)
const hasError = ref(false)
const thumbOffset = ref(0)
const contentRef = ref(null)
const videoRef = ref(null)

const currentVideo = computed(() => props.videos[currentIndex.value])

const visibleThumbnails = computed(() => {
  const max = 5
  const start = thumbOffset.value
  const end = Math.min(start + max, props.videos.length)
  return props.videos.slice(start, end)
})

function open(index = 0) {
  currentIndex.value = index
  isOpen.value = true
  isLoading.value = true
  hasError.value = false
  document.body.style.overflow = 'hidden'
  updateThumbOffset()
  nextTick(() => contentRef.value?.focus())
}

function close() {
  isOpen.value = false
  document.body.style.overflow = ''
  if (videoRef.value) {
    videoRef.value.pause()
  }
  emit('close')
}

function next() {
  if (currentIndex.value < props.videos.length - 1) {
    if (videoRef.value) videoRef.value.pause()
    currentIndex.value++
    isLoading.value = true
    hasError.value = false
    updateThumbOffset()
    emit('change', currentIndex.value)
  }
}

function prev() {
  if (currentIndex.value > 0) {
    if (videoRef.value) videoRef.value.pause()
    currentIndex.value--
    isLoading.value = true
    hasError.value = false
    updateThumbOffset()
    emit('change', currentIndex.value)
  }
}

function goTo(index) {
  if (index >= 0 && index < props.videos.length) {
    if (videoRef.value) videoRef.value.pause()
    currentIndex.value = index
    isLoading.value = true
    hasError.value = false
    updateThumbOffset()
    emit('change', currentIndex.value)
  }
}

function onLoadStart() {
  isLoading.value = true
  hasError.value = false
}

function onCanPlay() {
  isLoading.value = false
  hasError.value = false
}

function onError() {
  isLoading.value = false
  hasError.value = true
  console.error('[VideoGallery] Error loading video:', currentVideo.value?.src)
}

function updateThumbOffset() {
  const max = 5
  if (currentIndex.value >= thumbOffset.value + max) {
    thumbOffset.value = currentIndex.value - max + 1
  } else if (currentIndex.value < thumbOffset.value) {
    thumbOffset.value = currentIndex.value
  }
}

function handleKeydown(e) {
  if (!isOpen.value) return
  if (e.key === 'Escape') close()
  if (e.key === 'ArrowLeft') prev()
  if (e.key === 'ArrowRight') next()
}

watch(() => props.initialIndex, (val) => {
  if (isOpen.value) currentIndex.value = val
})

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})

defineExpose({ open, close })
</script>

<style scoped>
.video-gallery {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gallery-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(14, 24, 25, 0.98);
}

.gallery-content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  outline: none;
}

.gallery-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.5rem 2rem;
  z-index: 10;
  background: linear-gradient(to bottom, rgba(0,0,0,0.7), transparent);
}

.gallery-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.gallery-title {
  font-family: var(--font-sans);
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--color-cream);
  margin: 0;
}

.gallery-counter {
  font-family: var(--font-sans);
  font-size: 0.9rem;
  color: rgba(252, 248, 237, 0.7);
}

.gallery-counter__current {
  font-weight: 600;
  color: var(--color-lime);
}

.gallery-counter__separator {
  margin: 0 0.25rem;
  opacity: 0.5;
}

.gallery-close {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(252, 248, 237, 0.1);
  border: 1px solid rgba(252, 248, 237, 0.2);
  border-radius: 50%;
  color: var(--color-cream);
  cursor: pointer;
  transition: all 0.2s ease;
}

.gallery-close:hover {
  background: rgba(252, 248, 237, 0.2);
  transform: rotate(90deg);
}

.gallery-main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5rem 3rem 6rem;
  position: relative;
}

.gallery-video {
  max-width: 100%;
  max-height: 100%;
  border-radius: 8px;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.5);
}

.gallery-loader {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: rgba(252, 248, 237, 0.6);
}

.gallery-spinner {
  width: 48px;
  height: 48px;
  border: 3px solid rgba(176, 255, 85, 0.2);
  border-top-color: var(--color-lime);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.gallery-error {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: rgba(252, 248, 237, 0.5);
}

.gallery-error svg {
  color: #ff6b6b;
}

.gallery-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(252, 248, 237, 0.1);
  border: 1px solid rgba(252, 248, 237, 0.2);
  border-radius: 50%;
  color: var(--color-cream);
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;
}

.gallery-nav:hover {
  background: var(--color-lime);
  border-color: var(--color-lime);
  color: var(--color-dark);
}

.gallery-nav--prev { left: 1.5rem; }
.gallery-nav--next { right: 1.5rem; }

.gallery-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem 2rem 1.5rem;
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
  z-index: 10;
}

.gallery-thumbnails {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
}

.thumbnail {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(252, 248, 237, 0.08);
  border: 1px solid rgba(252, 248, 237, 0.15);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  max-width: 150px;
}

.thumbnail:hover {
  background: rgba(252, 248, 237, 0.15);
}

.thumbnail--active {
  background: var(--color-lime);
  border-color: var(--color-lime);
}

.thumbnail--active .thumbnail__icon {
  color: var(--color-dark);
}

.thumbnail--active .thumbnail__title {
  color: var(--color-dark);
}

.thumbnail__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-lime);
  flex-shrink: 0;
}

.thumbnail__title {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  color: rgba(252, 248, 237, 0.8);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 768px) {
  .gallery-main {
    padding: 4rem 1rem 5rem;
  }
  
  .gallery-nav {
    width: 44px;
    height: 44px;
  }
  
  .gallery-nav--prev { left: 0.75rem; }
  .gallery-nav--next { right: 0.75rem; }
  
  .thumbnail {
    padding: 0.4rem 0.75rem;
    max-width: 100px;
  }
  
  .thumbnail__title {
    display: none;
  }
}
</style>
