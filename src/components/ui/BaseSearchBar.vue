<template>
  <div :class="['search-bar', { 'search-bar--focused': isFocused }]">
    <div class="search-bar__icon" aria-hidden="true">
      <svg v-if="!isLoading" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
      <div v-else class="search-bar__spinner" />
    </div>

    <input
      ref="inputRef"
      type="text"
      class="search-bar__input"
      :placeholder="placeholder"
      :value="modelValue"
      :aria-label="ariaLabel"
      @input="$emit('update:modelValue', $event.target.value)"
      @focus="isFocused = true"
      @blur="isFocused = false"
      @keydown.escape="handleClear"
    />

    <button
      v-if="modelValue"
      class="search-bar__clear"
      @click="handleClear"
      aria-label="Limpiar búsqueda"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    </button>

    <div v-if="showResultCount && resultCount !== null" class="search-bar__count">
      {{ resultCount }} resultado{{ resultCount !== 1 ? 's' : '' }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Buscar...'
  },
  ariaLabel: {
    type: String,
    default: 'Barra de búsqueda'
  },
  isLoading: Boolean,
  resultCount: {
    type: Number,
    default: null
  },
  showResultCount: Boolean
})

const emit = defineEmits(['update:modelValue', 'clear'])

const inputRef = ref(null)
const isFocused = ref(false)

function handleClear() {
  emit('update:modelValue', '')
  emit('clear')
  inputRef.value?.focus()
}

function focus() {
  inputRef.value?.focus()
}

function blur() {
  inputRef.value?.blur()
}

defineExpose({ focus, blur })
</script>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: rgba(252, 248, 237, 0.08);
  border: 1px solid rgba(252, 248, 237, 0.15);
  border-radius: 12px;
  transition: all 0.2s ease;
}

.search-bar--focused {
  background: rgba(252, 248, 237, 0.12);
  border-color: var(--color-lime);
  box-shadow: 0 0 0 3px rgba(176, 255, 85, 0.15);
}

.search-bar__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(252, 248, 237, 0.5);
  flex-shrink: 0;
}

.search-bar__spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(176, 255, 85, 0.3);
  border-top-color: var(--color-lime);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.search-bar__input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  font-family: var(--font-sans);
  font-size: 0.95rem;
  color: var(--color-cream);
}

.search-bar__input::placeholder {
  color: rgba(252, 248, 237, 0.4);
}

.search-bar__clear {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  background: none;
  border: none;
  color: rgba(252, 248, 237, 0.5);
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.search-bar__clear:hover {
  color: var(--color-cream);
  background: rgba(252, 248, 237, 0.1);
}

.search-bar__count {
  font-size: 0.75rem;
  color: rgba(252, 248, 237, 0.5);
  white-space: nowrap;
}
</style>
