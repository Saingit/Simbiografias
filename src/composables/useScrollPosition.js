import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollPosition(options = {}) {
  const { threshold = 0, throttleMs = 100 } = options
  
  const scrollY = ref(0)
  const scrollX = ref(0)
  const isScrolling = ref(false)
  const scrollDirection = ref('down')
  
  let lastScrollY = 0
  let throttleTimer = null

  function updateScroll() {
    scrollY.value = window.scrollY
    scrollX.value = window.scrollX
    
    if (scrollY.value > lastScrollY) {
      scrollDirection.value = 'down'
    } else if (scrollY.value < lastScrollY) {
      scrollDirection.value = 'up'
    }
    
    lastScrollY = scrollY.value
  }

  function onScroll() {
    isScrolling.value = true
    
    if (throttleTimer) return
    
    throttleTimer = setTimeout(() => {
      updateScroll()
      throttleTimer = null
    }, throttleMs)
  }

  function onScrollEnd() {
    isScrolling.value = false
  }

  const isPastThreshold = ref(false)

  function checkThreshold() {
    isPastThreshold.value = scrollY.value > threshold
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('scrollend', onScrollEnd)
    updateScroll()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('scrollend', onScrollEnd)
    if (throttleTimer) {
      clearTimeout(throttleTimer)
    }
  })

  return {
    scrollY,
    scrollX,
    isScrolling,
    isPastThreshold,
    scrollDirection
  }
}
