import { ref, computed } from 'vue'

export function useSearch(items, options = {}) {
  const {
    keys = [],
    threshold = 0.3,
    debounceMs = 300
  } = options

  const query = ref('')
  const isSearching = ref(false)

  let debounceTimer = null

  function normalizeText(text) {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
  }

  function getNestedValue(obj, path) {
    return path.split('.').reduce((acc, key) => acc?.[key], obj)
  }

  function calculateRelevance(item, normalizedQuery) {
    let score = 0
    const fields = keys.length > 0 ? keys : Object.keys(item)

    for (const field of fields) {
      const value = getNestedValue(item, field)
      if (value === null || value === undefined) continue

      const normalizedValue = normalizeText(String(value))

      if (normalizedValue === normalizedQuery) {
        score += 10
      } else if (normalizedValue.startsWith(normalizedQuery)) {
        score += 7
      } else if (normalizedValue.includes(normalizedQuery)) {
        score += 5
      } else {
        const queryWords = normalizedQuery.split(/\s+/)
        for (const word of queryWords) {
          if (word && normalizedValue.includes(word)) {
            score += 2
          }
        }
      }
    }

    return score
  }

  const results = computed(() => {
    if (!query.value.trim()) {
      return items.value || items
    }

    const normalizedQuery = normalizeText(query.value)
    const sourceItems = items.value || items

    if (!Array.isArray(sourceItems)) return []

    const scored = sourceItems
      .map(item => ({
        item,
        score: calculateRelevance(item, normalizedQuery)
      }))
      .filter(result => result.score > 0)
      .sort((a, b) => b.score - a.score)

    return scored.map(result => result.item)
  })

  const hasResults = computed(() => results.value.length > 0)
  const resultCount = computed(() => results.value.length)

  function search(value) {
    if (debounceTimer) {
      clearTimeout(debounceTimer)
    }

    isSearching.value = true
    query.value = value

    debounceTimer = setTimeout(() => {
      isSearching.value = false
    }, debounceMs)
  }

  function clearSearch() {
    query.value = ''
    isSearching.value = false
    if (debounceTimer) {
      clearTimeout(debounceTimer)
    }
  }

  return {
    query,
    results,
    hasResults,
    resultCount,
    isSearching,
    search,
    clearSearch
  }
}
