import { ref, readonly } from 'vue'

export function useModelLoader() {
  const progress = ref(0)
  const isLoaded = ref(false)
  const error = ref(null)

  function reset() {
    progress.value = 0
    isLoaded.value = false
    error.value = null
  }

  function onProgress(event) {
    if (event.detail.totalProgress !== undefined) {
      progress.value = Math.round(event.detail.totalProgress * 100)
    }
  }

  function onLoad() {
    isLoaded.value = true
    progress.value = 100
  }

  function onError(event) {
    error.value = event.detail || 'Error loading model'
    console.error('[ModelLoader] Error:', error.value)
  }

  return {
    progress: readonly(progress),
    isLoaded: readonly(isLoaded),
    error: readonly(error),
    reset,
    onProgress,
    onLoad,
    onError
  }
}
