<template>
  <div :class="['card', { 'card--hoverable': hoverable, 'card--bordered': bordered }]">
    <div v-if="$slots.header || title" class="card__header">
      <slot name="header">
        <h3 v-if="title" class="card__title">{{ title }}</h3>
        <p v-if="subtitle" class="card__subtitle">{{ subtitle }}</p>
      </slot>
    </div>
    
    <div class="card__body">
      <slot />
    </div>
    
    <div v-if="$slots.footer" class="card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  subtitle: String,
  hoverable: Boolean,
  bordered: Boolean
})
</script>

<style scoped>
.card {
  background: rgba(252, 248, 237, 0.05);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card--bordered {
  border: 1px solid rgba(252, 248, 237, 0.1);
}

.card--hoverable:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
}

.card__header {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(252, 248, 237, 0.1);
}

.card__title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-cream);
}

.card__subtitle {
  margin: 0.5rem 0 0;
  font-size: 0.875rem;
  color: rgba(252, 248, 237, 0.6);
}

.card__body {
  padding: 1.5rem;
}

.card__footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid rgba(252, 248, 237, 0.1);
  background: rgba(0, 0, 0, 0.1);
}
</style>
