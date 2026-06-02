<template>
  <main class="cart-page" :style="bgStyle">

    <!-- Logo: volver al inicio -->
    <RouterLink to="/" class="cart-logo-wrap">
      <img :src="`${baseUrl}images/logo/Recurso 7@4x.png`" alt="Simbiografías" class="cart-logo" />
    </RouterLink>

    <!-- Título -->
    <div class="cart-heading">
      <h1>Cartografías</h1>
      <h3>Diarios de campo</h3>
    </div>

    <!-- Panel izquierdo: lugar seleccionado + fechas -->
    <Transition name="panel-slide">
      <div v-if="activeLocation" class="dates-panel">
        <h2 class="loc-name">{{ activeLocation.name }}</h2>
        <ul class="dates-list">
          <li
            v-for="entry in activeLocation.entries"
            :key="entry.id"
            class="date-item"
            :class="{ 'date-item--active': activeDiary?.id === entry.id, 'date-item--empty': !entry.pages.length }"
            @click="openDiary(entry)"
          >
            {{ entry.label }}
          </li>
        </ul>
      </div>
    </Transition>

    <!-- Mapa con etiquetas interactivas -->
    <div class="map-area">
      <div class="map-wrapper">
        <img :src="`${baseUrl}images/mapa.png`" alt="Mapa corregimientos" class="map-img" />
        <button
          v-for="loc in locations"
          :key="loc.id"
          class="map-pin"
          :class="{ 'map-pin--active': activeLocation?.id === loc.id }"
          :style="{ left: loc.x, top: loc.y }"
          @click="selectLocation(loc)"
        >{{ loc.name }}</button>
      </div>
    </div>

    <!-- Visor del diario de campo -->
    <Transition name="diary-fade">
      <div v-if="activeDiary" class="diary-backdrop" @click.self="closeDiary">
        <button class="diary-close" @click="closeDiary">X</button>

        <div class="diary-stage">
          <Transition :name="flipDir === 'fwd' ? 'page-fwd' : 'page-bwd'" mode="out-in">
            <img
              :key="`${activeDiary.id}_${currentPage}`"
              :src="imgSrc(activeDiary.pages[currentPage])"
              :alt="activeDiary.label"
              class="diary-page-img"
            />
          </Transition>
        </div>

        <div v-if="activeDiary.pages.length > 1" class="flip-nav">
          <button v-if="currentPage > 0" class="flip-btn" @click="flip(-1)">‹</button>
          <span class="flip-count">{{ currentPage + 1 }} / {{ activeDiary.pages.length }}</span>
          <button v-if="currentPage < activeDiary.pages.length - 1" class="flip-btn" @click="flip(1)">›</button>
        </div>
      </div>
    </Transition>

  </main>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

const baseUrl = import.meta.env.BASE_URL

const bgStyle = computed(() => ({
  backgroundImage: `url('${baseUrl}images/fondo_oscuro.png')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}))

// pages[]: ruta relativa sin extensión dentro de public/images/diarios/
// Carpetas con espacios se encodean automáticamente en imgSrc()
// pages: [] → entrada sin imagen aún (aparece deshabilitada en la lista)
const locations = [
  {
    id: 'casa-infancia',
    name: 'Casa de infancia',
    x: '48%', y: '30%',
    entries: [
      { id: 'ci-01', label: '17 de mayo de 2024', pages: ['01. Casa de infancia/17052024_1', '01. Casa de infancia/17052024_2'] },
    ],
  },
  {
    id: 'reserva-volcana',
    name: 'Reserva la Volcana',
    x: '58%', y: '20%',
    entries: [
      { id: 'rv-01', label: '8 de julio de 2024',    pages: ['02. Reserva/08072024/8072024_1', '02. Reserva/08072024/8072024_2'] },
      { id: 'rv-02', label: '12 de octubre de 2024', pages: ['02. Reserva/12102024/121024',    '02. Reserva/12102024/121024_2'] },
    ],
  },
  {
    id: 'vereda-tambo',
    name: 'Vereda el Tambo',
    x: '58%', y: '38%',
    entries: [
      { id: 'vt-01', label: '26 de enero de 2025', pages: [] },
    ],
  },
  {
    id: 'vereda-ilusion',
    name: 'Vereda la Ilusión',
    x: '70%', y: '65%',
    entries: [
      { id: 'vi-01', label: '26 de enero de 2025', pages: [] },
    ],
  },
  {
    id: 'museo-cns',
    name: 'Museo CNS',
    x: '91%', y: '80%',
    entries: [
      { id: 'mc-01', label: '23 de marzo de 2024',     pages: ['05. Museo/23032024'] },
      { id: 'mc-02', label: '27 de agosto de 2024',    pages: ['05. Museo/27082024'] },
      { id: 'mc-03', label: '18 de diciembre de 2024', pages: [] },
      { id: 'mc-04', label: '27 de enero de 2025',     pages: [] },
      { id: 'mc-05', label: '5 de febrero de 2025',    pages: [] },
      { id: 'mc-06', label: '11 de febrero de 2025',   pages: [] },
      { id: 'mc-07', label: '29 de marzo de 2025',     pages: [] },
      { id: 'mc-08', label: '2 de mayo de 2025',       pages: [] },
    ],
  },
]

const activeLocation = ref(null)
const activeDiary    = ref(null)
const currentPage    = ref(0)
const flipDir        = ref('fwd')

// Encoda cada segmento del path para manejar espacios y caracteres especiales
function imgSrc(page) {
  const encoded = page.split('/').map(encodeURIComponent).join('/')
  return `${baseUrl}images/diarios/${encoded}.png`
}

const sndFwd = new Audio(`${baseUrl}images/diarios/Paso_pag1.mp3`)
const sndBwd = new Audio(`${baseUrl}images/diarios/Paso_pag2.mp3`)

function selectLocation(loc) {
  if (activeLocation.value?.id === loc.id) {
    activeLocation.value = null
    closeDiary()
  } else {
    activeLocation.value = loc
    closeDiary()
  }
}

function openDiary(entry) {
  if (!entry.pages.length) return
  flipDir.value     = 'fwd'
  currentPage.value = 0
  activeDiary.value = entry
}

function closeDiary() {
  activeDiary.value  = null
  currentPage.value  = 0
}

function flip(dir) {
  const next = currentPage.value + dir
  if (next < 0 || next >= activeDiary.value.pages.length) return
  flipDir.value     = dir > 0 ? 'fwd' : 'bwd'
  const snd = dir > 0 ? sndFwd : sndBwd
  snd.currentTime = 0
  snd.play().catch(() => {})
  currentPage.value = next
}

function onKeyDown(e) {
  if (e.key === 'Escape') {
    if (activeDiary.value) closeDiary()
    else activeLocation.value = null
  }
  if (activeDiary.value) {
    if (e.key === 'ArrowRight') flip(1)
    if (e.key === 'ArrowLeft')  flip(-1)
  }
}
onMounted(()   => window.addEventListener('keydown', onKeyDown))
onUnmounted(() => window.removeEventListener('keydown', onKeyDown))
</script>

<style scoped>
.cart-page {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  font-family: 'Poppins', sans-serif;
}

/* ── Logo ── */
.cart-logo-wrap {
  position: absolute;
  left: 1.5%;
  top: 4%;
  z-index: 20;
  display: block;
  line-height: 0;
  transition: opacity 0.2s;
}
.cart-logo-wrap:hover { opacity: 0.75; }
.cart-logo { width: 100px; height: auto; }

/* ── Encabezado ── */
.cart-heading {
  position: absolute;
  top: clamp(2rem, 2vw, 3.25rem);
  left: clamp(12rem, 14.7vw, 18rem);
  z-index: 20;
  pointer-events: none;
}
.cart-heading h1 {
  color: #b0ff55;
  font-size: clamp(2rem, 2.5vw, 3.5rem);
  font-weight: 300;
  margin: 0 0 0.15rem;
  line-height: 1;
}
.cart-heading p {
  color: #fcf8ed;
  font-size: clamp(1rem, 1.5vw, 2rem);
  font-weight: 300;
  margin: 0;
}

/* ── Mapa (ocupa el 67% derecho de la pantalla) ── */
.map-area {
  position: absolute;
  left: 33%;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.map-wrapper {
  position: relative;
  max-width: 100%;
  max-height: 100%;
  line-height: 0;
}
.map-img {
  display: block;
  max-width: 100%;
  max-height: 100vh;
  width: auto;
  height: auto;
}

/* ── Etiquetas sobre el mapa ── */
.map-pin {
  position: absolute;
  transform: translate(-50%, -50%);
  background: transparent;
  border: none;
  cursor: pointer;
  color: #b0ff55;
  font-family: 'Poppins', sans-serif;
  font-size: clamp(0.6rem, 0.9vw, 0.85rem);
  font-weight: 300;
  white-space: nowrap;
  padding: 0;
  z-index: 10;
  text-align: center;
  line-height: 1.3;
  transition: opacity 0.2s;
}
.map-pin:hover { opacity: 0.7; }
.map-pin--active {
  font-weight: 600;
  text-shadow: 0 0 10px rgba(176, 255, 85, 0.45);
}

/* ── Panel de fechas ── */
.dates-panel {
  position: absolute;
  left: 2%;
  top: 40%;
  width: 26%;
  z-index: 55;
}
.loc-name {
  color: #b0ff55;
  font-family: 'Poppins', sans-serif;
  font-size: clamp(0.85rem, 1.2vw, 1.2rem);
  font-weight: 400;
  margin: 0 0 0.65rem;
}
.dates-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.date-item {
  color: #fcf8ed;
  font-family: 'Poppins', sans-serif;
  font-size: clamp(0.7rem, 0.95vw, 0.9rem);
  font-weight: 300;
  cursor: pointer;
  padding: 0.18rem 0;
  line-height: 1.55;
  transition: opacity 0.2s;
}
.date-item:hover { opacity: 0.7; }
.date-item--active {
  color: #b0ff55;
  font-weight: 500;
}
.date-item--empty {
  opacity: 0.35;
  cursor: default;
}
.date-item--empty:hover { opacity: 0.35; }

/* ── Transición del panel ── */
.panel-slide-enter-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.panel-slide-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.panel-slide-enter-from,
.panel-slide-leave-to { opacity: 0; transform: translateX(-14px); }

/* ── Visor del diario ── */
.diary-backdrop {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(14, 24, 25, 0.8);
}
.diary-close {
  position: absolute;
  top: 1.5rem;
  right: 2rem;
  background: none;
  border: none;
  color: #b0ff55;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  z-index: 60;
  transition: opacity 0.15s;
}
.diary-close:hover { opacity: 0.55; }

.diary-stage {
  perspective: 1200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.diary-page-img {
  max-width: 52vw;
  max-height: 82vh;
  object-fit: contain;
  display: block;
  box-shadow: 0 12px 56px rgba(0, 0, 0, 0.55);
}

/* ── Navegación entre páginas ── */
.flip-nav {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 1.5rem;
  z-index: 60;
}
.flip-btn {
  background: none;
  border: none;
  color: #fcf8ed;
  font-size: 2rem;
  cursor: pointer;
  line-height: 1;
  padding: 0;
  transition: opacity 0.2s;
}
.flip-btn:hover { opacity: 0.55; }
.flip-count {
  color: #fcf8ed;
  font-family: 'Poppins', sans-serif;
  font-size: 0.8rem;
}

/* ── Transición de entrada/salida del diario ── */
.diary-fade-enter-active { transition: opacity 0.25s ease; }
.diary-fade-leave-active { transition: opacity 0.2s ease; }
.diary-fade-enter-from,
.diary-fade-leave-to { opacity: 0; }

/* ── Efecto flipbook ── */
.page-fwd-leave-active { animation: flip-out-l 0.3s ease forwards; }
.page-fwd-enter-active { animation: flip-in-r  0.3s ease forwards; }
.page-bwd-leave-active { animation: flip-out-r 0.3s ease forwards; }
.page-bwd-enter-active { animation: flip-in-l  0.3s ease forwards; }

@keyframes flip-out-l {
  to { transform: rotateY(-90deg); opacity: 0; }
}
@keyframes flip-in-r {
  from { transform: rotateY(90deg); opacity: 0; }
}
@keyframes flip-out-r {
  to { transform: rotateY(90deg); opacity: 0; }
}
@keyframes flip-in-l {
  from { transform: rotateY(-90deg); opacity: 0; }
}
</style>
