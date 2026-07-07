import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const STORAGE_KEY = 'simbiografias-preferences'

export const usePreferencesStore = defineStore('preferences', () => {
  const isAudioMuted = ref(true)
  const audioVolume = ref(1.0)
  const reducedMotion = ref(false)
  const highContrast = ref(false)
  const language = ref('es')

  function loadFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (parsed.isAudioMuted !== undefined) isAudioMuted.value = parsed.isAudioMuted
        if (parsed.audioVolume !== undefined) audioVolume.value = parsed.audioVolume
        if (parsed.reducedMotion !== undefined) reducedMotion.value = parsed.reducedMotion
        if (parsed.highContrast !== undefined) highContrast.value = parsed.highContrast
        if (parsed.language !== undefined) language.value = parsed.language
      }
    } catch (e) {
      console.warn('[PreferencesStore] Error loading from storage:', e)
    }
  }

  function saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        isAudioMuted: isAudioMuted.value,
        audioVolume: audioVolume.value,
        reducedMotion: reducedMotion.value,
        highContrast: highContrast.value,
        language: language.value
      }))
    } catch (e) {
      console.warn('[PreferencesStore] Error saving to storage:', e)
    }
  }

  function toggleAudioMute() {
    isAudioMuted.value = !isAudioMuted.value
    saveToStorage()
  }

  function setAudioMuted(muted) {
    isAudioMuted.value = muted
    saveToStorage()
  }

  function setAudioVolume(volume) {
    audioVolume.value = Math.max(0, Math.min(1, volume))
    saveToStorage()
  }

  function toggleReducedMotion() {
    reducedMotion.value = !reducedMotion.value
    saveToStorage()
  }

  function toggleHighContrast() {
    highContrast.value = !highContrast.value
    saveToStorage()
  }

  function setLanguage(lang) {
    language.value = lang
    saveToStorage()
  }

  function resetPreferences() {
    isAudioMuted.value = true
    audioVolume.value = 1.0
    reducedMotion.value = false
    highContrast.value = false
    language.value = 'es'
    saveToStorage()
  }

  loadFromStorage()

  return {
    isAudioMuted,
    audioVolume,
    reducedMotion,
    highContrast,
    language,
    toggleAudioMute,
    setAudioMuted,
    setAudioVolume,
    toggleReducedMotion,
    toggleHighContrast,
    setLanguage,
    resetPreferences
  }
})
