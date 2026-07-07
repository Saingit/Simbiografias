<template>
  <div :class="['spinner', `spinner--${size}`, `spinner--${color}`]" :aria-label="label" role="status">
    <svg class="spinner__svg" viewBox="0 0 50 50">
      <circle
        class="spinner__circle"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke-width="4"
      />
    </svg>
    <span v-if="showText" class="spinner__text">{{ text }}</span>
  </div>
</template>

<script setup>
defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v)
  },
  color: {
    type: String,
    default: 'lime',
    validator: (v) => ['lime', 'cream', 'dark'].includes(v)
  },
  label: {
    type: String,
    default: 'Cargando...'
  },
  text: String,
  showText: Boolean
})
</script>

<style scoped>
.spinner {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.spinner__svg {
  animation: spin 1s linear infinite;
}

.spinner__circle {
  stroke: currentColor;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

/* Sizes */
.spinner--sm .spinner__svg { width: 1.5rem; height: 1.5rem; }
.spinner--md .spinner__svg { width: 2.5rem; height: 2.5rem; }
.spinner--lg .spinner__svg { width: 4rem; height: 4rem; }

/* Colors */
.spinner--lime { color: var(--color-lime); }
.spinner--cream { color: var(--color-cream); }
.spinner--dark { color: var(--color-dark); }

.spinner__text {
  font-family: var(--font-sans);
  font-size: 0.875rem;
  color: inherit;
}

@keyframes spin {
  100% { transform: rotate(360deg); }
}

@keyframes dash {
  0% { stroke-dasharray: 1, 150; stroke-dashoffset: 0; }
  50% { stroke-dasharray: 90, 150; stroke-dashoffset: -35; }
  100% { stroke-dasharray: 90, 150; stroke-dashoffset: -124; }
}
</style>
