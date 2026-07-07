import { ref, computed, onMounted, onUnmounted } from 'vue'

export function useLightbox(images) {
  const currentIndex = ref(null)
  
  const currentImage = computed(() => {
    if (currentIndex.value === null) return null
    return images[currentIndex.value]
  })
  
  const isOpen = computed(() => currentIndex.value !== null)
  
  const hasPrev = computed(() => currentIndex.value > 0)
  
  const hasNext = computed(() => currentIndex.value < images.length - 1)
  
  const progress = computed(() => {
    if (currentIndex.value === null) return null
    return {
      current: currentIndex.value + 1,
      total: images.length
    }
  })

  function open(index) {
    currentIndex.value = index
  }

  function close() {
    currentIndex.value = null
  }

  function prev() {
    if (hasPrev.value) {
      currentIndex.value--
    }
  }

  function next() {
    if (hasNext.value) {
      currentIndex.value++
    }
  }

  function goTo(index) {
    if (index >= 0 && index < images.length) {
      currentIndex.value = index
    }
  }

  function handleKeydown(e) {
    if (!isOpen.value) return
    
    switch (e.key) {
      case 'Escape':
        close()
        break
      case 'ArrowLeft':
        prev()
        break
      case 'ArrowRight':
        next()
        break
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
  })

  return {
    currentIndex,
    currentImage,
    isOpen,
    hasPrev,
    hasNext,
    progress,
    open,
    close,
    prev,
    next,
    goTo
  }
}
