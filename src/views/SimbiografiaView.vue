<template>
  <main class="simbiografia-view" role="main" aria-label="Simbiosis - Líquenes">
    <section
      class="simbiografia-canvas"
      :style="{ backgroundImage: `url('${baseUrl}images/MarcoVerde_grafico.png')` }"
      aria-labelledby="simbiografia-title"
    >
      <RouterLink class="simbiografia-logo-link" to="/" aria-label="Ir al inicio">
        <img
          class="simbiografia-logo"
          :src="`${baseUrl}images/logo/Recurso 8@4x.png`"
          alt=""
          aria-hidden="true"
        >
      </RouterLink>

      <div class="simbiografia-heading">
        <h1 class="simbiografia-title">Simbiosis</h1>
        <h3>Líquenes</h3>
      </div>

      <a 
        class="feature-pill feature-pill--photos" 
        href="#fotografias" 
        @click.prevent="scrollTo('fotografias')"
        aria-label="Ir a galería de fotografías"
      >
        Fotografías
      </a>
      <RouterLink class="feature-pill feature-pill--model" to="/liquenes" aria-label="Ver modelos 3D">
        3D
      </RouterLink>
      <button 
        class="feature-pill feature-pill--videos" 
        @click="openVideoGallery(0)"
        aria-label="Abrir galería de videos"
      >
        Videos
      </button>
    </section>

    <!-- ── Galería de fotografías ── -->
    <section id="fotografias" class="foto-section mt-5 pt-5" aria-label="Galería de fotografías de líquenes">
      <div class="foto-grid">

        <!-- Cards con posición explícita — deben ir primero en el DOM -->
        <div class="foto-card foto-card--investigacion" :style="{ backgroundImage: `url('${baseUrl}images/fotografias/1.jpg')` }">
          <span>Investigación<br>– creación</span>
        </div>
        <div class="foto-card foto-card--investigacion" :style="{ backgroundImage: `url('${baseUrl}images/fotografias/3.jpg')` }">
          <span>Investigación<br>– creación</span>
        </div>
        <!-- <div class="foto-card foto-card--investigacion" :style="{ backgroundImage: `url('${baseUrl}images/fotografias/3.jpg')` }">
          <span class="sw sw--1">SIMBIOSIS</span>
        </div> -->

    

        <div class="foto-card foto-card--que-es" :style="{ backgroundImage: `url('${baseUrl}images/fotografias/5.jpg')` }">
          <span>¿Qué es<br>un liquen?</span>
        </div>

        <div class="foto-card foto-card--todos-somos" :style="{ backgroundImage: `url('${baseUrl}images/fotografias/7_1.jpg')` }">
          <span>"Todos somos líquenes"</span>
        </div>

        <div class="foto-card foto-card--interdep" :style="{ backgroundImage: `url('${baseUrl}images/fotografias/10.jpg')` }">
          <span>INTER-<br>DEPENDENCIA</span>
        </div>

        <div class="foto-card foto-card--interpretaciones" :style="{ backgroundImage: `url('${baseUrl}images/fotografias/15.jpg')` }">
          <span>Interpretaciones<br>visuales</span>
        </div>

        <div class="foto-card foto-card--conexion" :style="{ backgroundImage: `url('${baseUrl}images/fotografias/20.jpg')` }">
          <span>CONEXIÓN</span>
        </div>

        <div class="foto-card foto-card--lichen-graphic">
          <img :src="`${baseUrl}images/fotografias/47.jpg`" class="lichen-overlay" alt="Gráfico de liquen" loading="lazy" />
        </div>

        <div class="foto-card foto-card--coexistencia" :style="{ backgroundImage: `url('${baseUrl}images/fotografias/25.jpg')` }">
          <span>COEXISTENCIA</span>
        </div>

        <!-- Fotos auto-placed con click para abrir galería -->
        <div 
          v-for="(photo, index) in photos" 
          :key="photo" 
          class="foto-item foto-item--clickable"
          @click="openGallery(index)"
          @keydown.enter="openGallery(index)"
          @keydown.space.prevent="openGallery(index)"
          tabindex="0"
          role="button"
          :aria-label="`Ver fotografía ${index + 1} de ${photos.length} en pantalla completa`"
        >
          <img
            :src="`${baseUrl}images/fotografias/${photo}.jpg`"
            :alt="`Fotografía de líquen ${index + 1} de ${photos.length}`"
            loading="lazy"
          />
          <div class="foto-item__overlay">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
            <span class="foto-item__hint">Click para ampliar</span>
          </div>
        </div>

      </div>
    </section>

    <!-- Galería de fotos con Swiper -->
    <PhotoGallery
      ref="galleryRef"
      :images="galleryImages"
      :initial-index="currentPhotoIndex"
      @close="closeGallery"
      @change="onPhotoChange"
    />

    <!-- Galería de videos -->
    <VideoGallery
      ref="videoGalleryRef"
      :videos="videos"
      :initial-index="currentVideoIndex"
      @close="closeVideoGallery"
      @change="onVideoChange"
    />
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import PhotoGallery from '../components/PhotoGallery.vue'
import VideoGallery from '../components/VideoGallery.vue'
import { usePhotoGallery } from '../composables/usePhotoGallery'

const baseUrl = import.meta.env.BASE_URL

const galleryRef = ref(null)
const videoGalleryRef = ref(null)

const photos = [
  '1',  '2',  '3',  '4',  '5',  '6',  '7_1','8',  '9',  '10',
  '11', '12', '13', '14', '15', '16', '17', '18', '19', '21',
  '22', '23', '24', '25', '26', '27', '28', '29', '30', '31',
  '32', '33', '34', '35', '36', '37', '38', '39', '40', '41',
  '42', '43', '44', '45', '46', '47', '48', '49', '50', '51',
  '52', '53', '54', '55', '56', '57', '58', '59', '60', '61',
  '62', '63', '64', '65', '66', '67', '69', '70', '71', '72',
  '73', '74', '75', '76', '77', '78', '79', '80', '81', '82',
  '83', '84', '85', '86', '87', '88', '89', '90', '91', '92',
  '93', '94', '95', '96', '97', '98', '99', '100','101','102',
  '103','104',
]

const {
  isGalleryOpen,
  currentPhotoIndex,
  currentEffect,
  galleryImages,
  openGallery: openGalleryBase,
  closeGallery,
  setEffect
} = usePhotoGallery(photos, baseUrl)

function openGallery(index) {
  openGalleryBase(index)
  galleryRef.value?.open(index)
}

function onPhotoChange(index) {
  currentPhotoIndex.value = index
}

// Videos
const currentVideoIndex = ref(0)

const videos = [
  { id: 'v1', title: 'Cladonia', src: `${baseUrl}videos/Cladonia.mp4`, poster: `${baseUrl}images/fotografias/1.jpg` },
  { id: 'v2', title: 'Herpothallon rubrocinctum', src: `${baseUrl}videos/Herpothallon%20rubrocinctum.mp4`, poster: `${baseUrl}images/fotografias/2.jpg` },
  { id: 'v3', title: 'Heterodermia', src: `${baseUrl}videos/Heterodermia.mp4`, poster: `${baseUrl}images/fotografias/3.jpg` },
  { id: 'v4', title: 'Parmotrema', src: `${baseUrl}videos/Parmotrema.mp4`, poster: `${baseUrl}images/fotografias/4.jpg` },
  { id: 'v5', title: 'IMG_1249', src: `${baseUrl}videos/IMG_1249.mp4`, poster: `${baseUrl}images/fotografias/5.jpg` },
  { id: 'v6', title: 'b004_08120027', src: `${baseUrl}videos/b004_08120027_C146_00040030.mp4`, poster: `${baseUrl}images/fotografias/6.jpg` },
  { id: 'v7', title: 'b004_08120030', src: `${baseUrl}videos/b004_08120030_C147_00044370.mp4`, poster: `${baseUrl}images/fotografias/7_1.jpg` },
  { id: 'v8', title: 'b004_08120031', src: `${baseUrl}videos/b004_08120031_C148_00045832.mp4`, poster: `${baseUrl}images/fotografias/8.jpg` },
  { id: 'v9', title: 'b004_08120032', src: `${baseUrl}videos/b004_08120032_C149_00047463.mp4`, poster: `${baseUrl}images/fotografias/9.jpg` },
  { id: 'v10', title: 'b004_08120033', src: `${baseUrl}videos/b004_08120033_C150_00048492.mp4`, poster: `${baseUrl}images/fotografias/10.jpg` },
  { id: 'v11', title: 'b004_08120045', src: `${baseUrl}videos/b004_08120045_C155_00065789.mp4`, poster: `${baseUrl}images/fotografias/11.jpg` },
  { id: 'v12', title: 'b004_08120052', src: `${baseUrl}videos/b004_08120052_C160_00075731.mp4`, poster: `${baseUrl}images/fotografias/12.jpg` },
  { id: 'v13', title: 'b004_08120054', src: `${baseUrl}videos/b004_08120054_C162_00078801.mp4`, poster: `${baseUrl}images/fotografias/13.jpg` },
  { id: 'v14', title: 'b004_08120118', src: `${baseUrl}videos/b004_08120118_C169_00112835.mp4`, poster: `${baseUrl}images/fotografias/14.jpg` },
  { id: 'v15', title: 'b004_08120126', src: `${baseUrl}videos/b004_08120126_C171_00124300.mp4`, poster: `${baseUrl}images/fotografias/15.jpg` },
  { id: 'v16', title: 'b004_08120133', src: `${baseUrl}videos/b004_08120133_C173_00134563.mp4`, poster: `${baseUrl}images/fotografias/16.jpg` },
  { id: 'v17', title: 'b004_08120141', src: `${baseUrl}videos/b004_08120141_C174_00145721.mp4`, poster: `${baseUrl}images/fotografias/17.jpg` },
  { id: 'v18', title: 'b004_08120143', src: `${baseUrl}videos/b004_08120143_C177_00149615.mp4`, poster: `${baseUrl}images/fotografias/18.jpg` },
]

function openVideoGallery(index) {
  currentVideoIndex.value = index
  videoGalleryRef.value?.open(index)
}

function closeVideoGallery() {
  currentVideoIndex.value = 0
}

function onVideoChange(index) {
  currentVideoIndex.value = index
}

function scrollTo(id) {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
    element.focus()
  }
}
</script>

<style scoped>
/* ─── VISTA PRINCIPAL ─────────────────────────────────────── */
.simbiografia-view {
  min-height: 120vh;
  background: #aabc51;
  overflow-x: hidden;
}

/* ─── HERO ────────────────────────────────────────────────── */
.simbiografia-canvas {
  position: relative;
  width: 100%;
  min-height: 115vh;
  isolation: isolate;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.simbiografia-logo-link {
  position: absolute;
  z-index: 2;
  top: 4%;
  left: clamp(1.4rem, 2vw, 2.4rem);
  display: block;
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.simbiografia-logo-link:hover,
.simbiografia-logo-link:focus-visible {
  opacity: 0.82;
  transform: translateY(-1px);
}
.simbiografia-logo {
  display: block;
  width: 100px;
  height: auto;
  filter: brightness(0) invert(1);
}


.simbiografia-heading {
  position: absolute;
  z-index: 2;
  top: clamp(2rem, 2vw, 3.25rem);
  left: clamp(12rem, 14.7vw, 18rem);
  color: var(--color-cream);
}

.simbiografia-heading h1 {
  color: var(--color-lime);
  font-size: clamp(2.5rem, 2.5vw, 5.1rem);
  font-weight: 300;
  line-height: 0.98;
  margin: 0 0 0.35rem;
}

.simbiografia-heading p {
  font-size: clamp(2rem, 2.35vw, 3rem);
  font-weight: 300;
  line-height: 1;
  margin: 0;
}


.feature-pill {
  position: absolute;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: clamp(5.5rem, 9.5vw, 11.25rem);
  padding: 0.25rem clamp(2rem, 3.2vw, 4rem);
  border-radius: clamp(1.8rem, 2.8vw, 3.4rem);
  color: var(--color-cream);
  background: #aabc51;
  font-size: clamp(2.0rem, 4.7vw, 5.0rem);
  font-weight: 300;
  line-height: 1;
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.2s ease, transform 0.2s ease;
}
.feature-pill:hover,
.feature-pill:focus-visible {
  color: var(--color-dark);
  transform: translateY(-2px);
}
.feature-pill--photos { top: 37.5%; left: 27%;   width: 32.7%; }
.feature-pill--model  { top: 20.4%; right: 3%;   width: 16.1%; }
.feature-pill--videos { right: 5.7%; bottom: 6.6%; width: 30.2%; }

/* ─── GALERÍA ─────────────────────────────────────────────── */
.foto-section {
  width: 100%;
  background: #FFF;
}

.foto-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: calc((100vw - 6px) / 7);
  gap: 10px;
}

/* ── Fotos ── */
.foto-item {
  overflow: hidden;
  background: #1a2a2b;
}
.foto-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}
.foto-item:hover img { transform: scale(1.06); }

/* ── Fotos clickeables con overlay ── */
.foto-item--clickable {
  cursor: pointer;
  position: relative;
}

.foto-item--clickable:focus-visible {
  outline: 3px solid var(--color-lime);
  outline-offset: 2px;
  z-index: 10;
}

.foto-item__overlay {
  position: absolute;
  inset: 0;
  background: rgba(14, 24, 25, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.foto-item--clickable:hover .foto-item__overlay {
  opacity: 1;
}

.foto-item__overlay svg {
  color: var(--color-lime);
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3));
}

.foto-item__hint {
  font-family: var(--font-sans);
  font-size: 0.7rem;
  color: rgba(252, 248, 237, 0.8);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* ── Cards: base ── */
.foto-card {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  font-family: 'Poppins', sans-serif;
  text-align: center;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.foto-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(30, 47, 43, 0.75);
  transition: background 0.3s ease;
}

.foto-card:hover::before {
  background: rgba(30, 47, 43, 0.6);
}

.foto-card span {
  position: relative;
  z-index: 1;
}

/* ── Investigación – creación ── */
.foto-card--investigacion {
  grid-column: 2;
  grid-row: 1;
  color: #fcf8ed;
  font-size: clamp(0.6rem, 0.85vw, 1rem);
  font-weight: 600;
  line-height: 1.4;
  padding: 0.75rem;
}

/* ── SIMBIOSIS ── */
.foto-card--simbiosis {
  grid-column: 2;
  grid-row: 2 / 5;
  background: #FFF;
  /* background: #1c2e2a; */
  display: block;
  position: relative;
  overflow: hidden;
}
.sw {
  position: absolute;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  color: #b0ff55;
  white-space: nowrap;
  line-height: 1;
  left: 5%;
}
.sw--1 { font-size: clamp(0.85rem, 1.5vw, 1.9rem); top: 4%;  }
.sw--2 { font-size: clamp(0.65rem, 1.1vw, 1.4rem); top: 20%; opacity: 0.5; left: 0%; }
.sw--3 { font-size: clamp(0.75rem, 1.3vw, 1.65rem); top: 37%; opacity: 0.75; }
.sw--4 { font-size: clamp(0.55rem, 0.95vw, 1.2rem); top: 53%; opacity: 0.4; left: 10%; }
.sw--5 { font-size: clamp(0.7rem, 1.2vw, 1.5rem);  top: 69%; opacity: 0.85; left: 2%; }
.sw-dim { opacity: 0.45; }

.simbiosis-blob {
  position: absolute;
  width: 62%;
  aspect-ratio: 1;
  left: 12%;
  top: 18%;
  background: #b0ff55;
  border-radius: 62% 38% 46% 54% / 60% 44% 56% 40%;
  animation: blob-morph 10s ease-in-out infinite;
  z-index: 1;
}
@keyframes blob-morph {
  0%, 100% { border-radius: 62% 38% 46% 54% / 60% 44% 56% 40%; }
  50%       { border-radius: 38% 62% 54% 46% / 40% 56% 44% 60%; }
}

/* ── ¿Qué es un liquen? ── */
.foto-card--que-es {
  grid-column: 2;
  grid-row: 5 / 7;
  color: #fcf8ed;
  font-size: clamp(0.7rem, 1.05vw, 1.25rem);
  font-weight: 700;
  line-height: 1.3;
  padding: 0.75rem;
}

/* ── "Todos somos líquenes" ── */
.foto-card--todos-somos {
  grid-column: 4;
  grid-row: 1;
  color: #fcf8ed;
  font-size: clamp(0.55rem, 0.8vw, 0.95rem);
  font-style: italic;
  font-weight: 400;
  line-height: 1.4;
  padding: 0.75rem;
}

/* ── INTER-DEPENDENCIA ── */
.foto-card--interdep {
  grid-column: 5;
  grid-row: 1 / 3;
  color: #fcf8ed;
  font-size: clamp(0.85rem, 1.55vw, 1.95rem);
  font-weight: 700;
  line-height: 1.15;
  padding: 0.75rem;
}

/* ── Interpretaciones visuales ── */
.foto-card--interpretaciones {
  grid-column: 6;
  grid-row: 1;
  color: #fcf8ed;
  font-size: clamp(0.5rem, 0.75vw, 0.9rem);
  font-weight: 400;
  line-height: 1.4;
  padding: 0.75rem;
}

/* ── CONEXIÓN ── */
.foto-card--conexion {
  grid-column: 4;
  grid-row: 4 / 6;
  color: #fcf8ed;
  font-size: clamp(0.95rem, 1.7vw, 2.1rem);
  font-weight: 700;
  padding: 0.75rem;
}

/* ── Gráfico de liquen sobre verde ── */
.foto-card--lichen-graphic {
  grid-column: 5;
  grid-row: 4 / 7;
  background: #b0ff55;
  overflow: hidden;
  display: block;
}
.lichen-overlay {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: grayscale(1) contrast(1.3);
  mix-blend-mode: multiply;
  opacity: 0.85;
}

/* ── COEXISTENCIA ── */
.foto-card--coexistencia {
  grid-column: 7;
  grid-row: 3 / 6;
  background: #b0ff55;
  color: #1e2f2b;
  font-size: clamp(0.8rem, 1.35vw, 1.65rem);
  font-weight: 700;
  letter-spacing: 0.06em;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  padding: 0.75rem;
}

/* ─── RESPONSIVE ──────────────────────────────────────────── */
@media (max-width: 991.98px) {
  .simbiografia-canvas {
    min-height: 100svh;
    background-position: 53% center;
  }
  .simbiografia-logo-link { top: 5.25rem; left: 1.25rem; width: 7rem; }
  .simbiografia-heading   { top: 5.2rem;  left: 9.2rem; }
  .feature-pill {
    min-height: 4.75rem;
    border-radius: 1.6rem;
    font-size: clamp(2rem, 8vw, 3.5rem);
  }
  .feature-pill--photos { top: 36%;  left: 8%;  width: min(72%, 28rem); }
  .feature-pill--model  { top: 24%;  right: 5%; width: 9rem; }
  .feature-pill--videos { right: 7%; bottom: 10%; width: min(64%, 24rem); }

  /* Galería: 4 columnas en tablet */
  .foto-grid {
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: calc((100vw - 4px) / 4);
  }
  .foto-card--investigacion    { grid-column: 2; grid-row: 1; }
  .foto-card--simbiosis        { grid-column: 2; grid-row: 2 / 4; }
  .foto-card--que-es           { grid-column: 2; grid-row: 4 / 6; }
  .foto-card--todos-somos      { grid-column: 3; grid-row: 1; }
  .foto-card--interdep         { grid-column: 4; grid-row: 1 / 3; }
  .foto-card--interpretaciones { grid-column: 3; grid-row: 2; }
  .foto-card--conexion         { grid-column: 3; grid-row: 4 / 6; }
  .foto-card--lichen-graphic   { grid-column: 4; grid-row: 3 / 6; }
  .foto-card--coexistencia     { grid-column: 4; grid-row: 6 / 8; writing-mode: horizontal-tb; transform: none; }
}

@media (max-width: 575.98px) {
  .simbiografia-canvas {
    min-height: 100svh;
    background-position: 54% center;
  }
  .simbiografia-logo-link { top: 4.9rem; width: 5.6rem; }
  .simbiografia-heading   { top: 5rem;   left: 7.5rem; }
  .simbiografia-heading h1 { font-size: 2.3rem; }
  .simbiografia-heading p  { font-size: 1.35rem; }
  .feature-pill { min-height: 3.8rem; padding-inline: 1.4rem; border-radius: 1.25rem; }
  .feature-pill--photos { top: 37%; left: 5%;  width: 78%; }
  .feature-pill--model  { top: 26%; right: 5%; width: 6.8rem; }
  .feature-pill--videos { right: 5%; bottom: 7%; width: 70%; }

  /* Galería: 3 columnas en móvil, cards sin posición fija */
  .foto-grid {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: calc((100vw - 4px) / 3);
  }
  .foto-card--investigacion,
  .foto-card--simbiosis,
  .foto-card--que-es,
  .foto-card--todos-somos,
  .foto-card--interdep,
  .foto-card--interpretaciones,
  .foto-card--conexion,
  .foto-card--lichen-graphic,
  .foto-card--coexistencia {
    grid-column: auto;
    grid-row: auto;
  }
  .foto-card--simbiosis      { grid-row: span 2; }
  .foto-card--interdep       { grid-row: span 2; }
  .foto-card--lichen-graphic { grid-row: span 2; }
  .foto-card--coexistencia   { writing-mode: horizontal-tb; transform: none; }
}

@media (max-width: 390px) {
  .simbiografia-logo-link { top: 4.7rem; width: 4.8rem; }
  .simbiografia-heading   { left: 6.5rem; }
  .simbiografia-heading h1 { font-size: 1.95rem; }
  .simbiografia-heading p  { font-size: 1.15rem; }
  .feature-pill { min-height: 3.25rem; font-size: 1.85rem; }
}
</style>
