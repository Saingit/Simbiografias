import { ref, onUnmounted } from 'vue'

export function useAudio(src, options = {}) {
  const { loop = true, volume = 1.0 } = options
  let audio = null
  let disposed = false
  const isMuted = ref(true)
  const isPlaying = ref(false)
  const isStarting = ref(false)
  const error = ref(null)

  function stopState() {
    isPlaying.value = false
    isMuted.value = true
    if (audio) audio.muted = true
  }

  function onMediaError() {
    stopState()
    error.value = audio?.error?.code === 4
      ? 'El archivo de audio no está disponible o su formato no es compatible con este navegador.'
      : 'No se pudo cargar el audio. Comprueba tu conexión e inténtalo de nuevo.'
  }

  function init() {
    if (audio || disposed) return
    audio = new Audio(src)
    audio.preload = 'none'
    audio.loop = loop
    audio.volume = Math.max(0, Math.min(1, volume))
    audio.muted = true
    audio.addEventListener('pause', stopState)
    audio.addEventListener('ended', stopState)
    audio.addEventListener('error', onMediaError)
  }

  async function play() {
    if (disposed || isStarting.value) return false
    init()
    const player = audio
    error.value = null
    isStarting.value = true
    try {
      // Reintentar una descarga fallida dentro del clic del usuario.
      if (player.error) player.load()
      player.muted = false
      await player.play()
      if (disposed || player !== audio) return false
      isMuted.value = player.muted
      isPlaying.value = !player.paused
      return isPlaying.value
    } catch (cause) {
      if (disposed || player !== audio) return false
      stopState()
      error.value = cause.name === 'NotAllowedError'
        ? 'El navegador bloqueó el sonido. Pulsa Activar sonido para volver a intentarlo.'
        : cause.name === 'NotSupportedError'
          ? 'El archivo de audio no está disponible o su formato no es compatible con este navegador.'
          : 'No se pudo reproducir el audio. Comprueba tu conexión e inténtalo de nuevo.'
      return false
    } finally {
      isStarting.value = false
    }
  }

  function pause() {
    audio?.pause()
    stopState()
  }

  function toggleMute() {
    if (isStarting.value) return
    if (isPlaying.value && !isMuted.value) pause()
    else return play()
  }

  function setVolume(vol) {
    if (audio) audio.volume = Math.max(0, Math.min(1, vol))
  }

  onUnmounted(() => {
    disposed = true
    if (!audio) return
    audio.removeEventListener('pause', stopState)
    audio.removeEventListener('ended', stopState)
    audio.removeEventListener('error', onMediaError)
    audio.pause()
    audio.removeAttribute('src')
    audio.load()
    audio = null
  })

  return { isMuted, isPlaying, isStarting, error, init, play, pause, toggleMute, setVolume }
}
