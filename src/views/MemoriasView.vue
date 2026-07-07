<template>
  <main class="mem-page" :style="bgStyle" role="main" aria-label="Memorias - Investigación creación">

    <!-- Logo: volver al inicio -->
    <RouterLink to="/" class="mem-logo-wrap" aria-label="Volver al inicio">
      <img :src="`${baseUrl}images/logo/Recurso 7@4x.png`" alt="" class="mem-logo" aria-hidden="true" />
    </RouterLink>

    <!-- Encabezado flotante -->
    <!-- <div class="mem-header">
      <p class="mem-title">Memorias</p>
      <p class="mem-subtitle"></p>
    </div> -->

    <div class="simbiografia-heading">
        <h1 id="simbiografia-title">Memorias</h1>
        <h3>Investigación - creación</h3>
      </div>

    <!-- ─── Textos clicables (coordenadas en % sobre la imagen) ─── -->

    <!-- Objetivos: col 2-3, fila 1 → left 28.6% top 37.5% -->
    <button
      class="mem-link"
      style="left:32%; top:50%;"
      @click="openPopup('objetivos')"
      aria-label="Ver objetivos del proyecto"
    >Objetivos</button>

    <!-- Metodología: col 6-7, fila 1 → left 85.7% top 50% -->
    <button
      class="mem-link"
      style="left:85.7%; top:50%;"
      @click="openPopup('metodologia')"
      aria-label="Ver metodología del proyecto"
    >Metodología</button>

    <!-- Justificación: col 4-5, fila 3 → left 57.1% top 87.5% -->
    <button
      class="mem-link"
      style="left:71%; top:93%;"
      @click="openPopup('justificacion')"
      aria-label="Ver justificación del proyecto"
    >Justificación</button>

    <!-- ─── Panel popup ─── -->
    <Transition name="popup">
      <div 
        v-if="activePopup" 
        class="popup-panel"
        role="dialog"
        aria-modal="true"
        :aria-label="popupTitle"
        @keydown.escape="closePopup"
      >
        <button class="popup-close" @click="closePopup" aria-label="Cerrar panel">X</button>

        <template v-if="activePopup === 'objetivos'">
          <h2 class="popup-h1">Objetivos</h2>
          <h2 class="popup-h1">Objetivo general</h2>
          <p class="popup-text">
            Desarrollar interpretaciones visuales que sugieran relaciones de interdependencia
            y conexión desde la exploración del concepto de simbiosis en líquenes para la
            creación de obra digital interactiva.
          </p>
          <h2 class="popup-h2">Objetivos específicos</h2>
          <div class="row  my-4 p-0">
            <div class="col-lg-2 m-0 p-0 iconovineta"> <img  :src="`${baseUrl}images/Re1.png`"
            alt="Viñeta 1" class="img-fluid" width="50" height="50" loading="lazy" ></div>
          <div class="col-lg-10 m-0 px-3"><p class="popup-text">
            Interpretar el concepto de simbiosis asociado a los líquenes para la generación
            de recursos simbólicos que representen relaciones de interdependencia y conexión.
          </p></div>
          </div>
          <div class="row  my-4 p-0">
            <div class="col-lg-2 m-0 p-0 iconovineta"> <img  :src="`${baseUrl}images/Re2.png`"
            alt="Viñeta 2" class="img-fluid" width="50" height="50" loading="lazy" ></div>
          <div class="col-lg-10 m-0 px-3"><p class="popup-text">
            Explorar a través de la experimentación representaciones visuales que evoquen
            interrelaciones simbióticas empleando los líquenes como caso de estudio.
          </p></div>
          </div>
          <div class="row  my-4 p-0">
            <div class="col-lg-2 m-0 p-0 iconovineta"> <img  :src="`${baseUrl}images/Re3.png`"
            alt="Viñeta 3" class="img-fluid" width="50" height="50" loading="lazy" ></div>
          <div class="col-lg-10 m-0 px-3"><p class="popup-text">
            Crear una obra digital que integre los recursos simbólicos de los líquenes como
            propuesta de interpretación visual.
          </p></div>
          </div>
          
         
          <!-- <p class="popup-text">
            
          </p>
          <p class="popup-text">
           
          </p> -->
        </template>

        <template v-if="activePopup === 'metodologia'">
          <h2 class="popup-h1">Metodología</h2>
          <img
            :src="`${baseUrl}images/memorias/metodologia.webp`"
            alt="Infografía de metodología del proyecto"
            class="popup-infographic img-fluid" width="100%"
            loading="lazy"
          />
        </template>

        <template v-if="activePopup === 'justificacion'">
          <h2 class="popup-h1">Justificación</h2>
          <p class="popup-text">
            Esta <strong>investigación-creación</strong> surge de la pregunta por cómo
            interpretar, desde el <strong>arte</strong>, las relaciones de
            <strong>interdependencia y conexión</strong> que hacen posible la vida a partir
            de la <strong>simbiosis</strong> presente en los <strong>líquenes</strong>.
            Desde esta perspectiva, el proyecto se justifica en la necesidad de ampliar los
            marcos de comprensión de lo vivo, articulando miradas
            <strong>biológicas, sensibles</strong> y <strong>simbólicas</strong> que permitan
            pensar estas <strong>relaciones</strong> más allá de una lectura exclusivamente
            científica.
          </p>
          <p class="popup-text">
            Tomando a los líquenes como punto de partida, la propuesta explora su potencia
            conceptual, visual y metafórica para reflexionar sobre los
            <strong>vínculos entre organismos</strong>, territorios y experiencias humanas.
            En este proceso, la investigación integra arte, biología y tecnologías visuales
            para construir una <strong>experiencia estética</strong> que invite a pensar la
            <strong>coexistencia</strong> y la interconexión entre especies.
          </p>
          <p class="popup-text">
            Como resultado, el proyecto se materializa en una <strong>obra interactiva</strong>
            que articula <strong>recursos visuales, sonoros y tecnológicos</strong>, junto con
            una serie de objetos narrativos y sensibles, a través de los cuales se interpretan
            las observaciones y reflexiones desarrolladas durante la
            <strong>investigación</strong>. De este modo, el valor del trabajo radica tanto en
            su <strong>búsqueda conceptual</strong> como en su desarrollo artístico y
            experiencial, al proponer una lectura de las
            <strong>conexiones ecológicas</strong> desde la creación artística.
          </p>
        </template>
      </div>
    </Transition>



  </main>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

const baseUrl = import.meta.env.BASE_URL

const bgStyle = computed(() => ({
  backgroundImage: `url('${baseUrl}images/memorias/Memorias2.png')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}))

const activePopup = ref(null)
const popupTitle = computed(() => {
  const titles = {
    objetivos: 'Objetivos del proyecto',
    metodologia: 'Metodología del proyecto',
    justificacion: 'Justificación del proyecto'
  }
  return titles[activePopup.value] || 'Panel de información'
})

function openPopup(id) { activePopup.value = id }
function closePopup() { activePopup.value = null }

function onKeyDown(e) { 
  if (e.key === 'Escape') closePopup() 
}
onMounted(() => window.addEventListener('keydown', onKeyDown))
onUnmounted(() => window.removeEventListener('keydown', onKeyDown))
</script>

<style scoped>
/* ── Contenedor principal ── */
.mem-page {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  font-family: 'Poppins', sans-serif;
}

/* ── Logo (volver al inicio) ── */
.mem-logo-wrap {
  position: absolute;
  left: 1.5%;
  top: 4%;
 
  z-index: 20;
  display: block;
  line-height: 0;
  transition: opacity 0.2s;
}
.mem-logo-wrap:hover { opacity: 0.75; }
.mem-logo {
  /* escala relativa al viewport para mantener proporciones */
  /* width: clamp(36px, 3.5vw, 56px);
   */
  width: 100px;
  height: auto;
}

/* ── Encabezado ── */
/* .mem-header {
  position: absolute;
  left: 15%;
  top: 4.5%;
  z-index: 20;
  pointer-events: none;
}
.mem-title {
  color: #b0ff55;
  font-size: clamp(1.4rem, 2.8vw, 2.4rem);
  font-weight: 600;
  margin: 0;
  line-height: 1.1;
}
.mem-subtitle {
  color: #b0ff55;
  font-size: clamp(0.65rem, 1.2vw, 1rem);
  font-weight: 400;
  margin: 0;
} */

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


/* ── Textos clicables ── */
/* Posicionados con left/top en % → se escalan con la imagen.
   transform:translate(-50%,-50%) centra el texto en ese punto. */
.mem-link {
  position: absolute;
  transform: translate(-50%, -50%);
  background: transparent;
  border: none;
  cursor: pointer;
  color: #b0ff55;
  font-family: 'Poppins', sans-serif;
  /* font-size: clamp(1rem, 2.2vw, 1.8rem); */
  /* font-weight: 600; */
  letter-spacing: 0.01em;
  white-space: nowrap;
  padding: 0;
  transition: opacity 0.2s, text-shadow 0.2s;
  z-index: 10;

  font-size: clamp(2.8rem, 3.1vw, 3.5rem);
  font-weight: 400;
  line-height: 1;
  margin: 0;
}
.mem-link:hover {
  opacity: 0.75;
  text-shadow: 0 0 20px rgba(176, 255, 85, 0.45);
}

/* ── Panel popup ── */
.popup-panel {
  position: fixed;
  top: 5vh;
  right: 20%;
  width: min(100vw, 1000px);
  max-height: 100vh;
  background: #fcf8ed;
  overflow-y: auto;
  padding: 2.5rem 3rem;
  z-index: 100;
  box-shadow: 0 8px 48px rgba(0, 0, 0, 0.3);
  border-radius: 45px;
  padding:4rem 6rem;
  text-align: left !important;
}

.popup-close {
  position: absolute;
  top: 1rem;
  right: 1.25rem;
  background: none;
  border: none;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #142021;
  padding: 0.25rem 0.5rem;
  transition: opacity 0.15s;
}
.popup-close:hover { opacity: 0.45; }

.popup-h1 {
  font-family: 'Poppins', sans-serif;
  font-size: clamp(1.1rem, 1.8vw, 1.5rem);
  font-weight: 400;
  color: #6b7961;
  margin: 0 0 1rem;
}
.popup-h2 {
  font-family: 'Poppins', sans-serif;
  font-size: clamp(0.95rem, 1.4vw, 1.2rem);
  font-weight: 400;
  color: #6b7961;
  margin: 1.75rem 0 0.75rem;
}
.popup-text {
  font-family: 'Poppins', sans-serif;
  font-size: clamp(0.75rem, 1vw, 0.875rem);
  font-weight: 400;
  color: #142021;
  line-height: 1.65;
  margin: 0 0 0.8rem;
  text-align: justify;
}
.popup-text strong { font-weight: 600; }
.popup-infographic {
  width: 100%;
  height: auto;
  display: block;
  margin-top: 0.75rem;
}

/* ── Transición ── */
.popup-enter-active { transition: opacity 0.25s ease, transform 0.25s ease; }
.popup-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.popup-enter-from,
.popup-leave-to {
  opacity: 0;
  transform: translateX(24px);
}

.iconovineta{
  width: 50px;
  height: 50px;
}
</style>
