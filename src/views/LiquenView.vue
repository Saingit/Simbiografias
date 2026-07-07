<template>
  <main class="liquen-page" :style="bgStyle" role="main" aria-label="Visor de modelos 3D de líquenes">

    <!-- Logo: volver al inicio -->
    <RouterLink to="/simbiosis" class="liquen-logo-wrap" aria-label="Volver a Simbiosis">
      <img :src="`${baseUrl}images/logo/Recurso 5@4x.png`" alt="" class="liquen-logo" aria-hidden="true" />
    </RouterLink>

    <!-- Título -->
    <div class="liquen-heading">
      <h1>Simbiosis</h1>
      <p>Modelos 3D</p>
    </div>

    <!-- Contenido: tabs + visor -->
    <div class="liquen-content mt-5">

      <!-- Tabs -->
      <ul class="liquen-tabs" role="tablist" aria-label="Seleccionar modelo de líquen">
        <li
          v-for="(lichen, i) in lichens"
          :key="lichen.id"
          class="liquen-tab"
          :class="{ 'liquen-tab--active': activeIdx === i }"
          role="tab"
          :id="`tab-${lichen.id}`"
          :aria-selected="activeIdx === i"
          :aria-controls="`panel-${lichen.id}`"
          tabindex="0"
          @click="onTabClick(i)"
          @keydown.enter="onTabClick(i)"
          @keydown.space.prevent="onTabClick(i)"
          @keydown.arrow-right="i < lichens.length - 1 && onTabClick(i + 1)"
          @keydown.arrow-left="i > 0 && onTabClick(i - 1)"
        >
          {{ lichen.name }}
        </li>
      </ul>

      <!-- Visor 3D -->
      <div 
        class="viewer-wrap" 
        role="tabpanel"
        :id="`panel-${activeLichen.id}`"
        :aria-labelledby="`tab-${activeLichen.id}`"
        aria-label="Visor 3D interactivo"
      >
        <ModelLoader :progress="progress" :isLoaded="isLoaded" />
        <model-viewer
          :key="activeLichen.file"
          :src="modelSrc"
          :alt="`Modelo 3D de ${activeLichen.name} - ${activeLichen.scientific}`"
          camera-controls
          auto-rotate
          auto-rotate-delay="800"
          rotation-per-second="10deg"
          environment-image="neutral"
          shadow-intensity="0.6"
          exposure="1.1"
          style="width: 100%; height: 100%; background: transparent;"
          @progress="onProgress"
          @load="onLoad"
          @error="onError"
          aria-label="Modelo 3D interactivo"
        />
      </div>

      <!-- Info del espécimen activo -->
      <div class="liquen-info" :aria-live="activeLichen.name" role="status">
        <span class="liquen-info__name">{{ activeLichen.name }}</span>
        <span class="liquen-info__sep" aria-hidden="true">·</span>
        <span class="liquen-info__sci">{{ activeLichen.scientific }}</span>
      </div>

    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import ModelLoader from '../components/ModelLoader.vue'
import { useModelLoader } from '../composables/useModelLoader'

const baseUrl = import.meta.env.BASE_URL

onMounted(() => {
  if (!customElements.get('model-viewer')) {
    const s = document.createElement('script')
    s.type = 'module'
    s.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js'
    document.head.appendChild(s)
  }
})

const bgStyle = computed(() => ({
  backgroundImage: `url('${baseUrl}images/fondo.png')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}))

const lichens = [
  {
    id: 1,
    name: 'Liquen 1',
    scientific: 'Lichen sp. 01',
    file: 'liquen1.glb',
    description: 'Espécimen recolectado en campo. Textura coriácea con tonos grises y verdes pálidos que revela la complejidad de la simbiosis fúngico-fotobiótica.',
  },
 
  {
    id: 2,
    name: 'Liquen 5 (v2)',
    scientific: 'Lichen sp. 05',
    file: 'Liquen 5.glb',
    description: 'Segunda digitalización del espécimen 5. Permite comparar diferencias estructurales entre escaneos de distinta resolución.',
  },
  
  {
    id: 3,
    name: 'Liquen 6 (v2)',
    scientific: 'Lichen sp. 06',
    file: 'liquen 6.glb',
    description: 'Variante de malla reducida del liquen 6. Optimizada para renderizado fluido manteniendo la forma general del talo.',
  },
  {
    id: 4,
    name: 'Liquen 7',
    scientific: 'Lichen sp. 07',
    file: 'Liquen 7.glb',
    description: 'Espécimen foliáceo con lóbulos bien diferenciados. La reconstrucción 3D evidencia la estructura laminar y la distribución de los soros.',
  },
  {
    id: 5,
    name: 'Liquen 14',
    scientific: 'Lichen sp. 14',
    file: 'liquen 14.glb',
    description: 'Morfología fruticulosa con ramificaciones dicotómicas. Recolectado en zona de alta biodiversidad liquénica y luminosidad intensa.',
  },
  {
    id: 6,
    name: 'Cladonia confusa',
    scientific: 'Cladonia confusa R.Sant.',
    file: 'Cl_confusa.glb',
    description: 'Podeciones cilíndricos sin escuámulas apicales. Crece en suelos húmedos y zonas de páramo a lo largo de la cordillera.',
  },
  {
    id: 7,
    name: 'Cladonia isabellina',
    scientific: 'Cladonia isabellina (Müll.Arg.) Vain.',
    file: 'Cladonia Isabellina_baja.glb',
    description: 'Talos erectos con ápices acopados, propios de ecosistemas de alta montaña. Modelo de baja resolución para visualización ágil.',
  },
]

const activeIdx = ref(0)

const activeLichen = computed(() => lichens[activeIdx.value])

const modelSrc = computed(() => {
  const segments = activeLichen.value.file.split('/').map(encodeURIComponent).join('/')
  return `${baseUrl}models/${segments}`
})

const { progress, isLoaded, reset, onProgress, onLoad, onError } = useModelLoader()

function onTabClick(idx) {
  if (activeIdx.value !== idx) {
    reset()
    activeIdx.value = idx
  }
}
</script>

<style scoped>
.liquen-page {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  font-family: 'Poppins', sans-serif;
}

/* ── Logo ── */
.liquen-logo-wrap {
  position: absolute;
  left: 1.5%;
  top: 4%;
  z-index: 20;
  display: block;
  line-height: 0;
  transition: opacity 0.2s;
}
.liquen-logo-wrap:hover { opacity: 0.75; }
.liquen-logo { width: 100px; height: auto; }

/* ── Encabezado ── */
.liquen-heading {
  position: absolute;
  top: clamp(2rem, 2vw, 3.25rem);
  left: clamp(12rem, 14.7vw, 18rem);
  z-index: 20;
  pointer-events: none;
}
.liquen-heading h1 {
  color: var(--color-dark);;
  font-size: clamp(2rem, 2.5vw, 3.5rem);
  font-weight: 300;
  margin: 0 0 0.15rem;
  line-height: 1;
}
.liquen-heading p {
  color: var(--color-slate);
  font-size: clamp(1rem, 1.5vw, 2rem);
  font-weight: 300;
  margin: 0;
}

/* ── Contenido principal ── */
.liquen-content {
  position: absolute;
  top: clamp(7rem, 10vh, 11rem);
  left: 1.5%;
  right: 1.5%;
  bottom: 1%;
  display: flex;
  flex-direction: column;
  gap: 0;
}

/* ── Tabs ── */
.liquen-tabs {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  list-style: none;
  margin: 0 0 3px;
  padding: 0;
  gap: 3px;
  scrollbar-width: none;
}
.liquen-tabs::-webkit-scrollbar { display: none; }

.liquen-tab {
  flex-shrink: 0;
  padding: 0.4rem 1rem;
  border-radius: 4px 4px 0 0;
  border: 1px solid rgba(176, 255, 85, 0.2);
  border-bottom: none;
  color: rgba(0, 0, 0, 0.8);
  font-size: clamp(0.6rem, 0.8vw, 0.85rem);
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: color 0.2s, background 0.2s, border-color 0.2s;
  user-select: none;
}
.liquen-tab:hover {
  color: var(--color-dark);
  border-color: var(--color-dark);
}
.liquen-tab--active {
  color: var(--color-dark);;
  font-weight: 600;
  background: rgba(176, 255, 85, 0.07);
  border-color: var(--color-dark);;
}

/* ── Visor 3D ── */
.viewer-wrap {
  flex: 1;
  min-height: 0;
  border: 1px solid rgba(176, 255, 85, 0.2);
  border-radius: 0 4px 4px 4px;
  overflow: hidden;
}

/* ── Info ── */
.liquen-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.25rem 0;
  flex-shrink: 0;
}
.liquen-info__name {
  color: #b0ff55;
  font-size: clamp(0.65rem, 0.85vw, 0.9rem);
  font-weight: 500;
}
.liquen-info__sep {
  color: rgba(252, 248, 237, 0.3);
  font-size: 0.75rem;
}
.liquen-info__sci {
  color: rgba(252, 248, 237, 0.5);
  font-size: clamp(0.55rem, 0.75vw, 0.8rem);
  font-style: italic;
  font-weight: 300;
}
</style>
