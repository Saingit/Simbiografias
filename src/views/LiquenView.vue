<template>
  <main class="liquen-page" :style="bgStyle" role="main" aria-label="Visor de modelos 3D de líquenes">

    <!-- Logo: volver al inicio -->
    <RouterLink to="/simbiosis" class="liquen-logo-wrap" aria-label="Volver a Simbiosis">
      <img :src="`${baseUrl}images/logo/Recurso 5@4x.png`" alt="" class="liquen-logo" aria-hidden="true" />
    </RouterLink>

    <!-- Título -->
    <div class="liquen-heading">
      <h1>Simbiosis</h1>
      <h3 class="page-subtitle">Modelos 3D</h3>
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
      <div class="liquen-info" aria-live="polite" role="status">
        <span class="liquen-info__name">{{ activeLichen.name }}</span>
        <span class="liquen-info__sep" aria-hidden="true">·</span>
        <span class="liquen-info__sci">{{ activeLichen.scientific }}</span>
      </div>

      <div class="liquen-share">
        <button type="button" @click="copyLink">Copiar enlace del modelo</button>
        <input
          :value="shareUrl"
          readonly
          aria-label="Enlace directo al modelo seleccionado"
          @focus="$event.target.select()"
          @click="$event.target.select()"
        />
        <span role="status">{{ copyStatus }}</span>
      </div>

    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import ModelLoader from '../components/ModelLoader.vue'
import { useModelLoader } from '../composables/useModelLoader'

const baseUrl = import.meta.env.BASE_URL
const route = useRoute()
const router = useRouter()
const copyStatus = ref('')

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
    slug: 'liquen-1',
    name: 'Liquen 1',
    scientific: 'Lichen sp. 01',
    file: 'liquen1.glb',
    description: 'Espécimen recolectado en campo. Textura coriácea con tonos grises y verdes pálidos que revela la complejidad de la simbiosis fúngico-fotobiótica.',
  },
 
  {
    id: 2,
    slug: 'liquen-5-v2',
    name: 'Liquen 5 (v2)',
    scientific: 'Lichen sp. 05',
    file: 'Liquen 5.glb',
    description: 'Segunda digitalización del espécimen 5. Permite comparar diferencias estructurales entre escaneos de distinta resolución.',
  },
  
  {
    id: 3,
    slug: 'liquen-6-v2',
    name: 'Liquen 6 (v2)',
    scientific: 'Lichen sp. 06',
    file: 'liquen 6.glb',
    description: 'Variante de malla reducida del liquen 6. Optimizada para renderizado fluido manteniendo la forma general del talo.',
  },
  {
    id: 4,
    slug: 'liquen-7',
    name: 'Liquen 7',
    scientific: 'Lichen sp. 07',
    file: 'Liquen 7.glb',
    description: 'Espécimen foliáceo con lóbulos bien diferenciados. La reconstrucción 3D evidencia la estructura laminar y la distribución de los soros.',
  },
  {
    id: 5,
    slug: 'liquen-14',
    name: 'Liquen 14',
    scientific: 'Lichen sp. 14',
    file: 'liquen 14.glb',
    description: 'Morfología fruticulosa con ramificaciones dicotómicas. Recolectado en zona de alta biodiversidad liquénica y luminosidad intensa.',
  },
  {
    id: 6,
    slug: 'cladonia-confusa',
    name: 'Cladonia confusa',
    scientific: 'Cladonia confusa R.Sant.',
    file: 'Cl_confusa.glb',
    description: 'Podeciones cilíndricos sin escuámulas apicales. Crece en suelos húmedos y zonas de páramo a lo largo de la cordillera.',
  },
  {
    id: 7,
    slug: 'cladonia-isabellina',
    name: 'Cladonia isabellina',
    scientific: 'Cladonia isabellina (Müll.Arg.) Vain.',
    file: 'Cladonia Isabellina_baja.glb',
    description: 'Talos erectos con ápices acopados, propios de ecosistemas de alta montaña. Modelo de baja resolución para visualización ágil.',
  },
  {
    id: 8,
    slug: 'liquen-12',
    name: 'Liquen 12',
    scientific: 'Identificación pendiente',
    file: 'Liquen 12.glb',
  },
  {
    id: 9,
    slug: 'liquen-15',
    name: 'Liquen 15',
    scientific: 'Identificación pendiente',
    file: 'Liquen15.glb',
  },
  {
    id: 10,
    slug: 'stereocaulon',
    name: 'Stereocaulon',
    scientific: 'Stereocaulon sp.',
    file: 'Stereocaulon.glb',
  },
]

const activeIdx = computed(() => {
  const idx = lichens.findIndex(lichen => lichen.slug === route.params.modelo)
  return idx < 0 ? 0 : idx
})

const activeLichen = computed(() => lichens[activeIdx.value])

const modelSrc = computed(() => {
  const segments = activeLichen.value.file.split('/').map(encodeURIComponent).join('/')
  return `${baseUrl}models/${segments}`
})

const { progress, isLoaded, reset, onProgress, onLoad, onError } = useModelLoader()

const shareUrl = computed(() => new URL(router.resolve({
  name: 'liquenes',
  params: { modelo: activeLichen.value.slug },
}).href, window.location.href).href)

watch(() => route.params.modelo, (modelo) => {
  if (modelo && !lichens.some(lichen => lichen.slug === modelo)) {
    router.replace({ name: 'liquenes', params: { modelo: lichens[0].slug } })
  }
}, { immediate: true })

watch(activeLichen, () => {
  reset()
  copyStatus.value = ''
}, { flush: 'sync' })

function onTabClick(idx) {
  router.push({ name: 'liquenes', params: { modelo: lichens[idx].slug } })
}

async function copyLink() {
  const url = shareUrl.value
  try {
    await navigator.clipboard.writeText(url)
    if (shareUrl.value === url) copyStatus.value = 'Enlace copiado'
  } catch {
    if (shareUrl.value === url) {
      copyStatus.value = 'Selecciona el enlace y cópialo manualmente.'
    }
  }
}
</script>

<style scoped>
.liquen-share {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  padding-top: 0.5rem;
  font-size: 0.8rem;
}
.liquen-share button,
.liquen-share input {
  padding: 0.4rem 0.6rem;
  border: 1px solid var(--color-dark);
  border-radius: 4px;
  color: var(--color-dark);
  background: #fcf8ed;
}
.liquen-share button { cursor: pointer; }
.liquen-share input { flex: 1; min-width: 0; }
.liquen-share span { color: var(--color-dark); }

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
  left: calc(1.5% + 140px);
  z-index: 20;
  pointer-events: none;
}
.liquen-heading h1 {
  color: var(--color-lime);
  font-size: clamp(2.5rem, 2.5vw, 5.1rem);
  font-weight: 500;
  margin: 0 0 0.35rem;
  line-height: 0.98;
}
.liquen-heading h3 {
  color: var(--color-slate);
  font-size: 35px;
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
  scrollbar-width: thin;
}

/* Centrar si hay espacio; conservar el inicio accesible cuando hay desbordamiento. */
.liquen-tab:first-child { margin-left: auto; }
.liquen-tab:last-child { margin-right: auto; }

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
