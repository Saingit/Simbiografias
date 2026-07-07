<template>
  <div class="model-loader" :class="{ 'model-loader--hidden': isLoaded }">
    <div class="model-loader__content">
      <div class="model-loader__spinner">
        <div class="spinner-ring"></div>
        <span class="spinner-text">{{ progress }}%</span>
      </div>
      <p class="model-loader__label">{{ label }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  progress: {
    type: Number,
    default: 0
  },
  isLoaded: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: 'Cargando modelo 3D...'
  }
})
</script>

<style scoped>
.model-loader {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(20, 32, 33, 0.85);
  backdrop-filter: blur(4px);
  z-index: 10;
  transition: opacity 0.4s ease, visibility 0.4s ease;
}

.model-loader--hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

.model-loader__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.model-loader__spinner {
  position: relative;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner-ring {
  position: absolute;
  inset: 0;
  border: 3px solid rgba(176, 255, 85, 0.2);
  border-top-color: var(--color-lime);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.spinner-text {
  font-family: var(--font-sans);
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-lime);
}

.model-loader__label {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  font-weight: 400;
  color: rgba(252, 248, 237, 0.7);
  margin: 0;
  text-align: center;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
