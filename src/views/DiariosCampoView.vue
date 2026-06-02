<template>
  <main
    class="min-vh-100"
    :style="`padding-top: 5rem; background-image: url('${baseUrl}images/fondo.png'); background-size: cover; background-attachment: fixed;`"
  >

    <!-- Header -->
    <section class="px-4 py-5 text-center">
      <h1 class="fw-bold mb-3" style="font-size: clamp(2rem, 5vw, 3rem); color: var(--color-dark);">Diarios de campo</h1>
      <p class="mx-auto" style="color: #333; max-width: 36rem; line-height: 1.75;">
        Registros visuales del trabajo en terreno. Pasa el cursor sobre cada imagen para explorarla.
      </p>
    </section>

    <!-- Galería curved-path -->
    <section class="d-flex flex-column align-items-center" style="padding-bottom: 8rem;">
      <div class="curved-gallery">
        <img
          v-for="(img, i) in images"
          :key="i"
          :src="img.src"
          :alt="img.alt"
          @click="openLightbox(i)"
        />
      </div>

      <!-- Leyenda -->
      <div class="d-flex gap-4 mt-5 text-uppercase" style="color: rgba(20,32,33,0.4); font-size: 0.7rem; letter-spacing: 0.15em;">
        <span v-for="(img, i) in images" :key="i">{{ img.label }}</span>
      </div>
    </section>

    <!-- Lightbox -->
    <Transition name="fade">
      <div
        v-if="lightboxIndex !== null"
        class="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-4"
        style="z-index: 1050; background: rgba(20,32,33,0.95); backdrop-filter: blur(4px);"
        @click.self="lightboxIndex = null"
      >
        <div class="position-relative w-100" style="max-width: 56rem;">
          <img
            :src="images[lightboxIndex].src"
            :alt="images[lightboxIndex].alt"
            class="rounded-3 shadow d-block mx-auto"
            style="max-height: 80vh; max-width: 100%; object-fit: contain;"
          />

          <!-- Caption -->
          <p class="text-center small fw-medium mt-3" style="color: rgba(252,248,237,0.6);">
            {{ images[lightboxIndex].label }}
          </p>

          <!-- Cerrar -->
          <button
            @click="lightboxIndex = null"
            class="position-absolute rounded-circle d-flex align-items-center justify-content-center lightbox-btn"
            style="top: -1rem; right: -1rem; width: 2.25rem; height: 2.25rem; background: var(--color-dark); border: 1px solid rgba(107,121,97,0.4);"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          <!-- Prev -->
          <button
            v-if="lightboxIndex > 0"
            @click="lightboxIndex--"
            class="position-absolute rounded-circle d-flex align-items-center justify-content-center lightbox-btn"
            style="left: 0; top: 50%; transform: translate(-3rem, -50%); width: 2.25rem; height: 2.25rem; background: var(--color-dark); border: 1px solid rgba(107,121,97,0.4);"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>

          <!-- Next -->
          <button
            v-if="lightboxIndex < images.length - 1"
            @click="lightboxIndex++"
            class="position-absolute rounded-circle d-flex align-items-center justify-content-center lightbox-btn"
            style="right: 0; top: 50%; transform: translate(3rem, -50%); width: 2.25rem; height: 2.25rem; background: var(--color-dark); border: 1px solid rgba(107,121,97,0.4);"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </Transition>

  </main>
</template>

<script setup>
import { ref } from 'vue'
const baseUrl = import.meta.env.BASE_URL

const lightboxIndex = ref(null)

const images = [
  { src: `${import.meta.env.BASE_URL}images/diarios/diario-01.png`, alt: 'Diario de campo 01', label: 'Registro 01' },
  { src: `${import.meta.env.BASE_URL}images/diarios/diario-02.png`, alt: 'Diario de campo 02', label: 'Registro 02' },
  { src: `${import.meta.env.BASE_URL}images/diarios/diario-03.png`, alt: 'Diario de campo 03', label: 'Registro 03' },
]

function openLightbox(i) { lightboxIndex.value = i }
</script>

<style scoped>
.lightbox-btn {
  color: rgba(252,248,237,0.6);
  transition: color 0.2s;
}
.lightbox-btn:hover { color: var(--color-lime); }
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
