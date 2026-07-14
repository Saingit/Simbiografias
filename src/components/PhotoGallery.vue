<template>
  <Teleport to="body">
    <div 
      v-if="isOpen" 
      class="photo-gallery"
      role="dialog"
      aria-modal="true"
      aria-label="Galería de fotografías"
    >
      <!-- Backdrop -->
      <div class="gallery-backdrop" @click="close" />

      <!-- Contenido principal -->
      <div class="gallery-content" @keydown.escape="close" @keydown.left="prev" @keydown.right="next" tabindex="0" ref="contentRef">
        <!-- Header -->
        <div class="gallery-header">
          <div class="gallery-counter">
            <span class="gallery-counter__current">{{ currentIndex + 1 }}</span>
            <span class="gallery-counter__separator">/</span>
            <span class="gallery-counter__total">{{ images.length }}</span>
          </div>
          
          <button class="gallery-close" @click="close" aria-label="Cerrar galería">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Imagen actual -->
        <div class="gallery-main">
          <div v-if="isLoading" class="gallery-loader">
            <div class="gallery-spinner" />
            <span>Cargando...</span>
          </div>
          
          <Transition :name="transitionName" mode="out-in">
            <img 
              :key="currentIndex"
              :src="currentImage?.src" 
              :alt="currentImage?.alt"
              class="gallery-image"
              @load="onLoad"
              @error="onError"
            />
          </Transition>
          
          <div v-if="hasError" class="gallery-error">
            <span>Error al cargar la imagen</span>
          </div>
        </div>

        <!-- Navegación -->
        <button 
          v-if="currentIndex > 0"
          class="gallery-nav gallery-nav--prev" 
          @click="prev"
          aria-label="Imagen anterior"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button 
          v-if="currentIndex < images.length - 1"
          class="gallery-nav gallery-nav--next" 
          @click="next"
          aria-label="Imagen siguiente"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <!-- Footer con miniaturas -->
        <div class="gallery-footer">
          <div class="gallery-thumbnails">
            <button
              v-for="(image, index) in visibleThumbnails"
              :key="index"
              class="thumbnail"
              :class="{ 'thumbnail--active': index + thumbOffset === currentIndex }"
              @click="goTo(index + thumbOffset)"
              :aria-label="`Ir a imagen ${index + thumbOffset + 1}`"
            >
              <img :src="image.src" :alt="image.alt" />
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
  images: {
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

const currentImage = computed(() => props.images[currentIndex.value])

const transitionName = computed(() => 'fade')

const visibleThumbnails = computed(() => {
  const max = 7
  const start = thumbOffset.value
  const end = Math.min(start + max, props.images.length)
  return props.images.slice(start, end)
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
  emit('close')
}

function next() {
  if (currentIndex.value < props.images.length - 1) {
    currentIndex.value++
    isLoading.value = true
    hasError.value = false
    updateThumbOffset()
    emit('change', currentIndex.value)
  }
}

function prev() {
  if (currentIndex.value > 0) {
    currentIndex.value--
    isLoading.value = true
    hasError.value = false
    updateThumbOffset()
    emit('change', currentIndex.value)
  }
}

function goTo(index) {
  if (index >= 0 && index < props.images.length) {
    currentIndex.value = index
    isLoading.value = true
    hasError.value = false
    updateThumbOffset()
    emit('change', currentIndex.value)
  }
}

function onLoad() {
  isLoading.value = false
  hasError.value = false
}

function onError() {
  isLoading.value = false
  hasError.value = true
  console.error('[PhotoGallery] Error loading image:', currentImage.value?.src)
}

function updateThumbOffset() {
  const max = 7
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
.photo-gallery {
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
  background: rgba(14, 24, 25, 0.95);
  backdrop-filter: blur(8px);
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
  align-items: center;
  padding: 1.5rem 2rem;
  z-index: 10;
  background: linear-gradient(to bottom, rgba(0,0,0,0.5), transparent);
}

.gallery-counter {
  font-family: var(--font-sans);
  font-size: 1rem;
  color: rgba(252, 248, 237, 0.9);
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
  padding: 5rem 3rem;
  position: relative;
  max-height: 100vh;
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

.gallery-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 4px;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.4);
}

.gallery-error {
  position: absolute;
  color: rgba(252, 248, 237, 0.5);
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
  padding: 1rem 2rem;
  background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
  z-index: 10;
}

.gallery-thumbnails {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.thumbnail {
  width: 64px;
  height: 48px;
  padding: 0;
  border: 2px solid transparent;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  opacity: 0.5;
  transition: all 0.2s ease;
  background: none;
}

.thumbnail:hover {
  opacity: 0.8;
}

.thumbnail--active {
  border-color: var(--color-lime);
  opacity: 1;
  transform: scale(1.1);
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Transiciones */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .gallery-main {
    padding: 4rem 1rem 4rem;
    max-height: 70vh;
  }
  
  .gallery-nav {
    width: 44px;
    height: 44px;
  }
  
  .gallery-nav--prev { left: 0.75rem; }
  .gallery-nav--next { right: 0.75rem; }
  
  .thumbnail {
    width: 48px;
    height: 36px;
  }
}
</style>
