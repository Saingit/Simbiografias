<template>
  <div class="filter-group" role="group" :aria-label="ariaLabel">
    <div v-if="label" class="filter-group__label">{{ label }}</div>
    
    <div class="filter-group__options">
      <button
        v-for="option in options"
        :key="option.value"
        :class="[
          'filter-btn',
          { 'filter-btn--active': isSelected(option.value) }
        ]"
        @click="toggleFilter(option.value)"
        :aria-pressed="isSelected(option.value)"
        :disabled="option.disabled"
      >
        <span v-if="option.icon" class="filter-btn__icon" aria-hidden="true">
          {{ option.icon }}
        </span>
        {{ option.label }}
        <span v-if="option.count !== undefined" class="filter-btn__count">
          {{ option.count }}
        </span>
      </button>
    </div>

    <div v-if="selectedCount > 0" class="filter-group__clear">
      <button class="clear-btn" @click="clearFilters" aria-label="Limpiar filtros">
        Limpiar ({{ selectedCount }})
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Array],
    default: () => []
  },
  options: {
    type: Array,
    required: true,
    validator: (v) => v.every(opt => opt.value !== undefined && opt.label !== undefined)
  },
  multiple: Boolean,
  label: String,
  ariaLabel: {
    type: String,
    default: 'Filtros'
  }
})

const emit = defineEmits(['update:modelValue'])

const selectedCount = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.length
  }
  return props.modelValue ? 1 : 0
})

function isSelected(value) {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.includes(value)
  }
  return props.modelValue === value
}

function toggleFilter(value) {
  if (props.multiple) {
    const current = Array.isArray(props.modelValue) ? [...props.modelValue] : []
    const index = current.indexOf(value)
    
    if (index === -1) {
      current.push(value)
    } else {
      current.splice(index, 1)
    }
    
    emit('update:modelValue', current)
  } else {
    const newValue = props.modelValue === value ? null : value
    emit('update:modelValue', newValue)
  }
}

function clearFilters() {
  emit('update:modelValue', props.multiple ? [] : null)
}
</script>

<style scoped>
.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.filter-group__label {
  font-size: 0.8rem;
  font-weight: 500;
  color: rgba(252, 248, 237, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.filter-group__options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(252, 248, 237, 0.05);
  border: 1px solid rgba(252, 248, 237, 0.15);
  border-radius: 8px;
  font-family: var(--font-sans);
  font-size: 0.875rem;
  color: rgba(252, 248, 237, 0.7);
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-btn:hover:not(:disabled) {
  background: rgba(252, 248, 237, 0.1);
  border-color: rgba(252, 248, 237, 0.25);
  color: var(--color-cream);
}

.filter-btn--active {
  background: rgba(176, 255, 85, 0.15);
  border-color: var(--color-lime);
  color: var(--color-lime);
}

.filter-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.filter-btn__icon {
  font-size: 1rem;
}

.filter-btn__count {
  font-size: 0.75rem;
  padding: 0.125rem 0.375rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}

.filter-group__clear {
  margin-top: 0.25rem;
}

.clear-btn {
  background: none;
  border: none;
  font-family: var(--font-sans);
  font-size: 0.8rem;
  color: var(--color-lime);
  cursor: pointer;
  padding: 0;
  text-decoration: underline;
}

.clear-btn:hover {
  color: #c4ff70;
}
</style>
