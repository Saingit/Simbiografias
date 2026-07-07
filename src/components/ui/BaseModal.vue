<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="modal-backdrop"
        @click.self="closeOnBackdrop && $emit('update:modelValue', false)"
        role="dialog"
        aria-modal="true"
        :aria-label="title"
        @keydown.escape="closeOnEscape && $emit('update:modelValue', false)"
      >
        <div 
          :class="['modal', `modal--${size}`]"
          ref="modalRef"
        >
          <div v-if="title || $slots.header" class="modal__header">
            <slot name="header">
              <h2 v-if="title" class="modal__title">{{ title }}</h2>
            </slot>
            <button
              v-if="showClose"
              class="modal__close"
              @click="$emit('update:modelValue', false)"
              aria-label="Cerrar modal"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div class="modal__body">
            <slot />
          </div>
          
          <div v-if="$slots.footer" class="modal__footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  title: String,
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg', 'xl', 'full'].includes(v)
  },
  showClose: {
    type: Boolean,
    default: true
  },
  closeOnBackdrop: {
    type: Boolean,
    default: true
  },
  closeOnEscape: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue'])

const modalRef = ref(null)

watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
    setTimeout(() => {
      modalRef.value?.focus()
    }, 100)
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(20, 32, 33, 0.9);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal {
  background: var(--color-cream);
  border-radius: 16px;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.4);
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
}

.modal--sm { width: 100%; max-width: 400px; }
.modal--md { width: 100%; max-width: 600px; }
.modal--lg { width: 100%; max-width: 800px; }
.modal--xl { width: 100%; max-width: 1200px; }
.modal--full { width: 100%; max-width: 100%; height: 100%; border-radius: 0; }

.modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(20, 32, 33, 0.1);
}

.modal__title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-dark);
}

.modal__close {
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: var(--color-dark);
  border-radius: 8px;
  transition: background 0.2s;
}

.modal__close:hover {
  background: rgba(20, 32, 33, 0.1);
}

.modal__body {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
}

.modal__footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid rgba(20, 32, 33, 0.1);
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

/* Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal,
.modal-leave-active .modal {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.modal-enter-from .modal,
.modal-leave-to .modal {
  transform: scale(0.95);
  opacity: 0;
}
</style>
