import { ref, onUnmounted } from 'vue'

export function useAudio(src, options = {}) {
  const { loop = true, volume = 1.0 } = options
  
  const audio = ref(null)
  const isMuted = ref(true)
  const isPlaying = ref(false)
  const error = ref(null)

  function init() {
    if (audio.value) return
    
    audio.value = new Audio(src)
    audio.value.loop = loop
    audio.value.volume = volume
    audio.value.muted = true
    
    audio.value.addEventListener('play', () => {
      isPlaying.value = true
    })
    
    audio.value.addEventListener('pause', () => {
      isPlaying.value = false
    })
    
    audio.value.addEventListener('error', (e) => {
      error.value = e
      console.error('[useAudio] Error:', e)
    })
  }

  async function play() {
    if (!audio.value) init()
    try {
      await audio.value.play()
    } catch (e) {
      console.warn('[useAudio] Play failed:', e.message)
    }
  }

  function pause() {
    audio.value?.pause()
  }

  function toggleMute() {
    if (!audio.value) init()
    isMuted.value = !isMuted.value
    audio.value.muted = isMuted.value
    
    if (!isMuted.value) {
      play()
    }
  }

  function setVolume(vol) {
    if (audio.value) {
      audio.value.volume = Math.max(0, Math.min(1, vol))
    }
  }

  onUnmounted(() => {
    if (audio.value) {
      audio.value.pause()
      audio.value.src = ''
      audio.value = null
    }
  })

  return {
    isMuted,
    isPlaying,
    error,
    init,
    play,
    pause,
    toggleMute,
    setVolume
  }
}
