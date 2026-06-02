<template>
  <main
    class="home-stage"
    :style="`background-image: url('${baseUrl}images/fondo.png'); background-size: cover; background-position: center;`"
  >

   <!-- Audio ambiental -->
    <audio ref="audioEl" :src="audioSrc" loop preload="auto"></audio>

    <!-- Control de audio -->
    <button class="audio-toggle" @click="toggleAudio" :class="{ active: !isMuted }">
      <span class="audio-icon">{{ isMuted ? '♪' : '♫' }}</span>
      <span class="audio-label">{{ isMuted ? 'Activar sonido' : 'Silenciar' }}</span>
      <span v-if="isMuted" class="audio-hint">· mejor experiencia</span>
    </button>

    <!-- Hotspot: Memorias (arriba derecha del modelo) -->
    <RouterLink class="hotspot-group" style="left:51%;top:26%;" to="/memorias">
      <div class="hotspot-ring"></div>
      <div class="hotspot-dot"></div>
      <div class="hotspot-label label-right">
        <span class="label-arrow muted">◄◄</span>
        <span class="label-text">Memorias</span>
      </div>
    </RouterLink>

    <!-- Hotspot: Simbiosis (lado derecho del modelo) -->
    <RouterLink class="hotspot-group" style="left:63%;top:44%;" to="/simbiosis">
      <div class="hotspot-ring"></div>
      <div class="hotspot-dot"></div>
      <div class="hotspot-label label-right">
        <span class="label-arrow muted">◄◄</span>
        <span class="label-text">Simbiosis</span>
      </div>
    </RouterLink>

    <!-- Hotspot: Cartografías (lado izquierdo del modelo) -->
    <RouterLink class="hotspot-group" style="left:39%;top:57%;" to="/cartografias">
      <div class="hotspot-ring"></div>
      <div class="hotspot-dot"></div>
      <div class="hotspot-label label-left">
        <span class="label-text">Cartografías</span>
        <span class="label-arrow muted">▶▶</span>
      </div>
    </RouterLink>

    <!-- Hotspot: Conexiones (parte inferior del modelo) -->
    <RouterLink class="hotspot-group" style="left:56%;top:65%;" to="/conexiones">
      <div class="hotspot-ring"></div>
      <div class="hotspot-dot"></div>
      <div class="hotspot-label label-right">
        <span class="label-arrow muted">◄◄</span>
        <span class="label-text">Conexiones</span>
      </div>
    </RouterLink>

   

    <!-- CTA -->
    <p class="home-cta text-left mt-5
    ">Explora los puntos activos en el Liquen</p>

    <!-- Visor 3D centrado -->
    <div class="model-wrap">
      <model-viewer
        :src="mainModel"
        alt="Simbiografías"
        camera-controls
        auto-rotate
        auto-rotate-delay="3000"
        rotation-per-second="6deg"
        environment-image="neutral"
        shadow-intensity="0"
        exposure="1.1"
        style="width:100%;height:100%;background:transparent;"
      />
    </div>

  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
const baseUrl = import.meta.env.BASE_URL

import liquen1Model from '@/assets/modelos 3d/liquen1.glb?url'
import audioSrc from '@/assets/audio/sonoro.opus?url'

const mainModel = liquen1Model
const audioEl = ref(null)
const isMuted = ref(true)

onMounted(() => {
  if (!customElements.get('model-viewer')) {
    const script = document.createElement('script')
    script.type = 'module'
    script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js'
    document.head.appendChild(script)
  }

  const audio = audioEl.value
  if (!audio) return
  console.log('[audio] src:', audioSrc)
  audio.muted = true
  audio.volume = 1.0
  audio.play()
    .then(() => console.log('[audio] autoplay OK (muted)'))
    .catch(err => console.warn('[audio] autoplay blocked:', err.message))
})

function toggleAudio() {
  const audio = audioEl.value
  if (!audio) return
  isMuted.value = !isMuted.value
  audio.muted = isMuted.value
  if (!isMuted.value) {
    console.log('[audio] unmuting, readyState:', audio.readyState, 'paused:', audio.paused)
    audio.play()
      .then(() => console.log('[audio] play OK'))
      .catch(err => console.error('[audio] play failed:', err.message))
  }
}
</script>

<style scoped>
.home-stage {
  position: fixed;
  inset: 0;
  overflow: hidden;
}

/* Visor 3D */
.model-wrap {
  position: absolute;
  top: 5%;
  left: 25%;
  width: 52%;
  height: 90%;
  z-index: 4;
}

/* Grupo hotspot (círculo + etiqueta) */
.hotspot-group {
  position: absolute;
  width: 28px;
  height: 28px;
  transform: translate(-50%, -50%);
  z-index: 10;
  text-decoration: none;
}

/* Círculo estático */
.hotspot-dot {
  position: absolute;
  inset: 0;
  border: 2px solid var(--color-lime);
  border-radius: 50%;
  background: transparent;
  transition: background 0.2s;
}
.hotspot-group:hover .hotspot-dot {
  background: rgba(176, 255, 85, 0.15);
}

/* Anillo de pulso */
.hotspot-ring {
  position: absolute;
  inset: 0;
  border: 2px solid var(--color-lime);
  border-radius: 50%;
  animation: pulse-ring 2s ease-out infinite;
}

@keyframes pulse-ring {
  0%   { transform: scale(1);   opacity: 0.8; }
  70%  { transform: scale(2.4); opacity: 0; }
  100% { transform: scale(2.4); opacity: 0; }
}

/* Etiqueta flotante */
.hotspot-label {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(20, 32, 33, 0.25);
  border-radius: 0.6rem;
  background: rgba(252, 248, 237, 0.5);
  backdrop-filter: blur(6px);
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.hotspot-label.label-right {
  left: calc(100% + 14px);
  transform: translateY(-50%) translateX(-6px);
}
.hotspot-label.label-left {
  right: calc(100% + 14px);
  transform: translateY(-50%) translateX(6px);
}

.hotspot-group:hover .hotspot-label {
  opacity: 1;
  pointer-events: auto;
}
.hotspot-group:hover .hotspot-label.label-right {
  transform: translateY(-50%) translateX(0);
}
.hotspot-group:hover .hotspot-label.label-left {
  transform: translateY(-50%) translateX(0);
}

.label-text {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--color-dark);
  letter-spacing: 0.02em;
}
.label-arrow        { font-size: 0.85rem; line-height: 1; }
.label-arrow.lime   { color: var(--color-lime); }
.label-arrow.muted  { color: rgba(20, 32, 33, 0.4); font-size: 0.7rem; }

/* CTA */
.home-cta {
  position: absolute;
  bottom: 2rem;
  left: 20%;
  transform: translateX(-50%);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-dark);
  z-index: 10;
  pointer-events: none;
  padding: 0.5rem 1.25rem;
  /* border: 1px solid rgba(20, 32, 33, 0.3);
  border-radius: 2rem; */
  background: rgba(252, 248, 237, 0.5);
  backdrop-filter: blur(4px);
  white-space: nowrap;
  animation: cta-blink 2.5s ease-in-out infinite;
}

@keyframes cta-blink {
  0%, 100% { opacity: 0.5; }
  50%       { opacity: 1; }
}

/* Control de audio */
.audio-toggle {
  position: absolute;
  bottom: 1.25rem;
  right: 1.5rem;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 1rem;
  border: 1px solid rgba(20, 32, 33, 0.25);
  border-radius: 2rem;
  background: rgba(252, 248, 237, 0.55);
  backdrop-filter: blur(6px);
  cursor: pointer;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: var(--color-dark);
  white-space: nowrap;
  transition: background 0.2s, border-color 0.2s;
  animation: audio-pulse 3s ease-in-out infinite;
}
.audio-toggle.active {
  animation: none;
  background: rgba(176, 255, 85, 0.12);
  border-color: var(--color-lime);
}
.audio-toggle:hover {
  background: rgba(252, 248, 237, 0.85);
}
.audio-icon {
  font-size: 0.9rem;
}
.audio-hint {
  color: rgba(20, 32, 33, 0.5);
  font-weight: 400;
}

@keyframes audio-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(176, 255, 85, 0); }
  50%       { box-shadow: 0 0 0 5px rgba(176, 255, 85, 0.25); }
}
</style>
