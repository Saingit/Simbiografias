import { ref, onMounted, onUnmounted } from 'vue'

export function useKeyboardNavigation(options = {}) {
  const {
    onEscape,
    onEnter,
    onSpace,
    onArrowLeft,
    onArrowRight,
    onArrowUp,
    onArrowDown,
    enabled = true
  } = options

  const isNavigating = ref(false)

  function handleKeydown(e) {
    if (!enabled.value && typeof enabled !== 'boolean') return
    if (enabled === false) return

    switch (e.key) {
      case 'Escape':
        if (onEscape) {
          e.preventDefault()
          onEscape(e)
        }
        break
      case 'Enter':
        if (onEnter) {
          e.preventDefault()
          onEnter(e)
        }
        break
      case ' ':
        if (onSpace) {
          e.preventDefault()
          onSpace(e)
        }
        break
      case 'ArrowLeft':
        if (onArrowLeft) {
          e.preventDefault()
          onArrowLeft(e)
        }
        break
      case 'ArrowRight':
        if (onArrowRight) {
          e.preventDefault()
          onArrowRight(e)
        }
        break
      case 'ArrowUp':
        if (onArrowUp) {
          e.preventDefault()
          onArrowUp(e)
        }
        break
      case 'ArrowDown':
        if (onArrowDown) {
          e.preventDefault()
          onArrowDown(e)
        }
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
    isNavigating
  }
}
