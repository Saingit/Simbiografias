<template>
  <component
    :is="tag"
    :class="[
      'btn',
      `btn--${variant}`,
      `btn--${size}`,
      { 'btn--block': block },
      { 'btn--loading': loading },
      { 'btn--icon-only': iconOnly }
    ]"
    :disabled="disabled || loading"
    :type="type"
    :aria-label="ariaLabel"
    :aria-busy="loading"
    v-bind="$attrs"
  >
    <span v-if="loading" class="btn__spinner" aria-hidden="true">
      <svg class="spinner" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-dasharray="31.4 31.4" />
      </svg>
    </span>
    <span v-if="icon && !loading" class="btn__icon" aria-hidden="true">
      <slot name="icon">{{ icon }}</slot>
    </span>
    <span v-if="$slots.default" class="btn__text">
      <slot />
    </span>
  </component>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'ghost', 'danger'].includes(v)
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v)
  },
  tag: {
    type: String,
    default: 'button'
  },
  type: {
    type: String,
    default: 'button'
  },
  disabled: Boolean,
  loading: Boolean,
  block: Boolean,
  icon: String,
  iconOnly: Boolean,
  ariaLabel: String
})
</script>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: var(--font-sans);
  font-weight: 500;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  white-space: nowrap;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn:focus-visible {
  outline: 3px solid var(--color-lime);
  outline-offset: 3px;
}

/* Sizes */
.btn--sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.btn--md {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

.btn--lg {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}

/* Variants */
.btn--primary {
  background: var(--color-lime);
  color: var(--color-dark);
}

.btn--primary:hover:not(:disabled) {
  background: #c4ff70;
  transform: translateY(-1px);
}

.btn--secondary {
  background: transparent;
  color: var(--color-cream);
  border: 1px solid var(--color-cream);
}

.btn--secondary:hover:not(:disabled) {
  background: rgba(252, 248, 237, 0.1);
}

.btn--ghost {
  background: transparent;
  color: var(--color-cream);
}

.btn--ghost:hover:not(:disabled) {
  background: rgba(252, 248, 237, 0.1);
}

.btn--danger {
  background: #ff5555;
  color: white;
}

.btn--danger:hover:not(:disabled) {
  background: #ff7777;
}

/* Block */
.btn--block {
  width: 100%;
}

/* Loading */
.btn--loading {
  position: relative;
  color: transparent;
}

.btn__spinner {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner {
  width: 1.25rem;
  height: 1.25rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Icon only */
.btn--icon-only {
  padding: 0.5rem;
  min-width: 2.5rem;
  min-height: 2.5rem;
}

.btn__icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
