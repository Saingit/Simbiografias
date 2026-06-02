<template>
  <main class="simbiografia-view">
    <section
      class="simbiografia-canvas"
      :style="{ backgroundImage: `url('${baseUrl}images/MarcoVerde_grafico.png')` }"
      aria-labelledby="simbiografia-title"
    >
      <RouterLink class="simbiografia-logo-link" to="/" aria-label="Ir al inicio">
        <img
          class="simbiografia-logo"
          :src="`${baseUrl}images/logo/Recurso 8@4x.png`"
          alt="Simbiografías"
        >
      </RouterLink>

      <div class="simbiografia-heading">
        <h1 id="simbiografia-title">Simbiosis</h1>
        <h3>Líquenes</h3>
      </div>

      <a class="feature-pill feature-pill--photos" href="#fotografias" @click.prevent="scrollTo('fotografias')">
        Fotografías
      </a>
      <RouterLink class="feature-pill feature-pill--model" to="/liquenes">
        3D
      </RouterLink>
      <a class="feature-pill feature-pill--videos" href="#videos" @click.prevent="scrollTo('videos')">
        Videos
      </a>
    </section>

    <!-- ── Galería de fotografías ── -->
    <section id="fotografias" class="foto-section mt-5 pt-5">
      <div class="foto-grid">

        <!-- Cards con posición explícita — deben ir primero en el DOM -->
        <div class="foto-card foto-card--investigacion">
          <span>Investigación<br>– creación</span>
        </div>

        <div class="foto-card foto-card--simbiosis">
          <span class="sw sw--1">SIMBIOSIS</span>
          <span class="sw sw--2">SIMBIOSIS</span>
          <span class="sw sw--3">SIM<span class="sw-dim">BIOSIS</span></span>
          <span class="sw sw--4">SIMBIOSIS</span>
          <span class="sw sw--5">SIMBIOSIS</span>
          <div class="simbiosis-blob"></div>
        </div>

        <div class="foto-card foto-card--que-es">
          <span>¿Qué es<br>un liquen?</span>
        </div>

        <div class="foto-card foto-card--todos-somos">
          <span>"Todos somos líquenes"</span>
        </div>

        <div class="foto-card foto-card--interdep">
          <span>INTER-<br>DEPENDENCIA</span>
        </div>

        <div class="foto-card foto-card--interpretaciones">
          <span>Interpretaciones<br>visuales</span>
        </div>

        <div class="foto-card foto-card--conexion">
          <span>CONEXIÓN</span>
        </div>

        <div class="foto-card foto-card--lichen-graphic">
          <img :src="`${baseUrl}images/fotografias/47.jpg`" class="lichen-overlay" alt="" />
        </div>

        <div class="foto-card foto-card--coexistencia">
          <span>COEXISTENCIA</span>
        </div>

        <!-- Fotos auto-placed -->
        <div v-for="photo in photos" :key="photo" class="foto-item">
          <img
            :src="`${baseUrl}images/fotografias/${photo}.jpg`"
            :alt="`Fotografía de liquen ${photo}`"
            loading="lazy"
          />
        </div>

      </div>
    </section>
  </main>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const baseUrl = import.meta.env.BASE_URL

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

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
  top: clamp(4.35rem, 4.1vw, 5.25rem);
  left: clamp(12rem, 14.7vw, 18rem);
  color: var(--color-cream);
}
.simbiografia-heading h1 {
  color: var(--color-lime);

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
  font-size: clamp(2.8rem, 4.7vw, 5.8rem);
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
  background: #0e1819;
}

.foto-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: calc((100vw - 6px) / 7);
  gap: 3px;
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

/* ── Cards: base ── */
.foto-card {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  font-family: 'Poppins', sans-serif;
  text-align: center;
}

/* ── Investigación – creación ── */
.foto-card--investigacion {
  grid-column: 2;
  grid-row: 1;
  background: #1e2f2b;
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
  background: #1c2e2a;
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
  background: #b0ff55;
  color: #1e2f2b;
  font-size: clamp(0.7rem, 1.05vw, 1.25rem);
  font-weight: 700;
  line-height: 1.3;
  padding: 0.75rem;
}

/* ── "Todos somos líquenes" ── */
.foto-card--todos-somos {
  grid-column: 4;
  grid-row: 1;
  background: #1e2f2b;
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
  background: #b0ff55;
  color: #1e2f2b;
  font-size: clamp(0.85rem, 1.55vw, 1.95rem);
  font-weight: 700;
  line-height: 1.15;
  padding: 0.75rem;
}

/* ── Interpretaciones visuales ── */
.foto-card--interpretaciones {
  grid-column: 6;
  grid-row: 1;
  background: #1e2f2b;
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
  background: #b0ff55;
  color: #1e2f2b;
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
