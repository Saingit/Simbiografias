import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNavigationStore = defineStore('navigation', () => {
  const currentRoute = ref(null)
  const previousRoute = ref(null)
  const isNavigating = ref(false)
  const navigationHistory = ref([])

  function setCurrentRoute(route) {
    previousRoute.value = currentRoute.value
    currentRoute.value = route
    
    if (route) {
      navigationHistory.value.push({
        path: route.path,
        name: route.name,
        timestamp: Date.now()
      })
      
      if (navigationHistory.value.length > 50) {
        navigationHistory.value.shift()
      }
    }
  }

  function setNavigating(value) {
    isNavigating.value = value
  }

  function goBack() {
    if (navigationHistory.value.length > 1) {
      navigationHistory.value.pop()
      return navigationHistory.value[navigationHistory.value.length - 1]
    }
    return null
  }

  function canGoBack() {
    return navigationHistory.value.length > 1
  }

  function clearHistory() {
    navigationHistory.value = []
    currentRoute.value = null
    previousRoute.value = null
  }

  return {
    currentRoute,
    previousRoute,
    isNavigating,
    navigationHistory,
    setCurrentRoute,
    setNavigating,
    goBack,
    canGoBack,
    clearHistory
  }
})
