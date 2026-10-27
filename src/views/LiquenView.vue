<template>
  <main class="liquen-page" :style="bgStyle" role="main" aria-label="Visor de modelos 3D de líquenes">

    <!-- Logo: volver al inicio -->
    <RouterLink to="/simbiosis" class="liquen-logo-wrap" aria-label="Volver a Simbiosis">
      <img :src="`${baseUrl}images/logo/Recurso 7@4x.png`" alt="" class="liquen-logo" aria-hidden="true" />
    </RouterLink>

    <!-- Título -->
    <div class="liquen-heading">
      <h1>Simbiosis</h1>
      <h3 class="page-subtitle">Modelos 3D</h3>
    </div>

    <section v-if="!showViewer" class="lichen-catalog" aria-label="Elegir un modelo 3D">
      <ul class="lichen-grid">
        <li v-for="lichen in lichens" :key="lichen.id">
          <RouterLink
            :to="{ name: 'liquenes', params: { modelo: lichen.slug } }"
            class="lichen-card"
            :aria-label="`Ver modelo 3D de ${lichen.name}`"
          >
            <span class="lichen-card__image">
              <img
                v-if="lichen.thumbnail"
                :src="thumbnailSrc(lichen.thumbnail)"
                alt=""
                loading="lazy"
                decoding="async"
              />
              <span v-else class="lichen-card__placeholder">
                <svg aria-hidden="true" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M24 4 42 14v20L24 44 6 34V14Z M6 14l18 10 18-10 M24 24v20 M15 9l18 10" />
                </svg>
                <span>Miniatura pendiente</span>
                <span class="lichen-card__available">Modelo 3D disponible</span>
              </span>
            </span>
            <span class="lichen-card__name">{{ lichen.name }}</span>
          </RouterLink>
        </li>
      </ul>
    </section>

    <section v-else class="lichen-detail" :aria-label="`Modelo 3D de ${activeLichen.name}`">
      <div class="lichen-detail__toolbar">
        <RouterLink :to="{ name: 'liquenes' }" class="lichen-back">← Todos los modelos</RouterLink>
      </div>

      <div class="lichen-specimen">
        <div class="lichen-specimen__image" aria-label="Fotografía de referencia">
          <img
            v-if="activeLichen.thumbnail"
            :src="thumbnailSrc(activeLichen.thumbnail)"
            :alt="`Fotografía de ${activeLichen.name}`"
          />
          <span v-else>Fotografía pendiente</span>
        </div>

        <!-- Visor 3D -->
        <div
          class="lichen-viewer"
          role="region"
          aria-label="Visor 3D interactivo"
        >
          <ModelLoader v-if="!error" :progress="progress" :isLoaded="isLoaded" />
          <p v-else class="lichen-error" role="alert">No se pudo cargar este modelo. Recarga la página para volver a intentarlo.</p>
          <model-viewer
            :key="activeLichen.file"
            :src="modelSrc"
            :alt="`Modelo 3D de ${activeLichen.name} - ${activeLichen.scientific}`"
            camera-controls
            touch-action="pan-y"
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
      </div>

      <article class="lichen-species-card">
        <h2>{{ activeLichen.imaginary }}</h2>
        <p class="lichen-species-card__hint">Nombre imaginario</p>
        <p class="lichen-species-card__scientific">{{ activeLichen.scientific }}</p>
        <p class="lichen-species-card__hint">Nombre científico</p>
      </article>

    </section>
  </main>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import ModelLoader from '../components/ModelLoader.vue'
import { useModelLoader } from '../composables/useModelLoader'

const baseUrl = import.meta.env.BASE_URL
const route = useRoute()
const router = useRouter()

onMounted(() => {
  if (!customElements.get('model-viewer')) {
    const s = document.createElement('script')
    s.type = 'module'
    s.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js'
    document.head.appendChild(s)
  }
})

const bgStyle = computed(() => ({
  backgroundImage: `url('${baseUrl}images/fondo_oscuro.png')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}))

const lichens = [
  {
    id: 1,
    slug: 'liquen-1',
    name: 'Ramalina prolifera Taylor',
    imaginary: 'Ramalina arbórea',
    scientific: 'Ramalina prolifera Taylor',
    file: 'liquen1.glb',
    thumbnail: 'Ramalina prolifera Taylor.png',
    description: 'Espécimen recolectado en campo. Textura coriácea con tonos grises y verdes pálidos que revela la complejidad de la simbiosis fúngico-fotobiótica.',
  },
 
  {
    id: 2,
    slug: 'liquen-5-v2',
    name: 'Cladonia confusa verde',
    imaginary: 'Cladonia rosiranea',
    scientific: 'Cladonia confusa',
    file: 'Liquen 5.glb',
    thumbnail: 'Cladonia confusa_verde.png',
    description: 'Segunda digitalización del espécimen 5. Permite comparar diferencias estructurales entre escaneos de distinta resolución.',
  },
  
  {
    id: 3,
    slug: 'liquen-6-v2',
    name: 'Ramalina sp.',
    imaginary: 'Ramalina biflorea',
    scientific: 'Ramalina sp.',
    file: 'liquen 6.glb',
    thumbnail: 'Ramalina sp.png',
    description: 'Variante de malla reducida del liquen 6. Optimizada para renderizado fluido manteniendo la forma general del talo.',
  },
  {
    id: 4,
    slug: 'liquen-7',
    name: 'Parmotrema',
    imaginary: 'Terramusia',
    scientific: 'Parmotrema sp.',
    file: 'Liquen 7.glb',
    thumbnail: 'Parmotrema.png',
    description: 'Espécimen foliáceo con lóbulos bien diferenciados. La reconstrucción 3D evidencia la estructura laminar y la distribución de los soros.',
  },
  {
    id: 5,
    slug: 'liquen-14',
    name: 'Ramalina celastri',
    imaginary: 'Ramalina ventiludia',
    scientific: 'Ramalina celastri',
    file: 'liquen 14.glb',
    thumbnail: 'Ramalina celastri.png',
    description: 'Morfología fruticulosa con ramificaciones dicotómicas. Recolectado en zona de alta biodiversidad liquénica y luminosidad intensa.',
  },
  {
    id: 6,
    slug: 'cladonia-confusa',
    name: 'Cladonia confusa blanca',
    imaginary: 'Cladonia rosiranea',
    scientific: 'Cladonia confusa R.Sant.',
    file: 'Cl_confusa.glb',
    thumbnail: 'Cladonia confusa.png',
    description: 'Podeciones cilíndricos sin escuámulas apicales. Crece en suelos húmedos y zonas de páramo a lo largo de la cordillera.',
  },
  {
    id: 7,
    slug: 'cladonia-isabellina',
    name: 'Cladonia isabellina Vain',
    imaginary: 'Cladonia flautiformis',
    scientific: 'Cladonia isabellina (Müll.Arg.) Vain.',
    file: 'Cladonia Isabellina_baja.glb',
    thumbnail: 'Cladonia isabellina Vain.png',
    description: 'Talos erectos con ápices acopados, propios de ecosistemas de alta montaña. Modelo de baja resolución para visualización ágil.',
  },
  {
    id: 8,
    slug: 'liquen-12',
    name: 'Parmotrema cristiferum',
    imaginary: 'Parmotrema montinubila',
    scientific: 'Parmotrema cristiferum',
    file: 'Liquen 12.glb',
    thumbnail: 'Parmotrema cristiferum.png',
  },
  {
    id: 9,
    slug: 'liquen-15',
    name: 'Parmotrema sp. 01',
    imaginary: 'Corticemoria',
    scientific: 'Parmotrema sp. 01',
    file: 'Liquen15.glb',
    thumbnail: 'Parmotrema sp 01.png',
  },
  {
    id: 10,
    slug: 'stereocaulon',
    name: 'Stereocaulon glareosum',
    imaginary: 'Stereocaulon petraeum',
    scientific: 'Stereocaulon glareosum',
    file: 'Stereocaulon.glb',
    thumbnail: 'Stereocaulon glareosum.png',
  },
]

const activeIdx = computed(() => {
  const idx = lichens.findIndex(lichen => lichen.slug === route.params.modelo)
  return idx < 0 ? 0 : idx
})

const activeLichen = computed(() => lichens[activeIdx.value])
const showViewer = computed(() => Boolean(route.params.modelo))

function thumbnailSrc(file) {
  return `${baseUrl}models/miniaturas/${encodeURIComponent(file)}`
}

const modelSrc = computed(() => {
  const segments = activeLichen.value.file.split('/').map(encodeURIComponent).join('/')
  return `${baseUrl}models/${segments}`
})

const { progress, isLoaded, error, reset, onProgress, onLoad, onError } = useModelLoader()

watch(() => route.params.modelo, (modelo) => {
  if (modelo && !lichens.some(lichen => lichen.slug === modelo)) {
    router.replace({ name: 'liquenes', params: { modelo: lichens[0].slug } })
  }
}, { immediate: true })

watch(() => route.params.modelo, () => {
  reset()
}, { flush: 'sync' })
</script>

<style scoped>
.liquen-page {
  position: relative;
  width: 100%;
  min-height: 100svh;
  padding: 180px clamp(24px, 6vw, 100px) 48px;
  font-family: 'Poppins', sans-serif;
  color: var(--color-cream);
}
.liquen-logo-wrap {
  position: absolute;
  left: 1.5%;
  top: 32px;
  display: block;
  line-height: 0;
}
.liquen-logo-wrap:hover { opacity: 0.75; }
.liquen-logo { width: 100px; height: auto; }
.liquen-heading {
  position: absolute;
  top: 32px;
  left: calc(1.5% + 140px);
}
.liquen-heading h1 {
  color: var(--color-lime);
  font-size: clamp(2.5rem, 2.5vw, 5.1rem);
  font-weight: 500;
  margin: 0 0 0.35rem;
  line-height: 0.98;
}
.liquen-heading h3 { color: var(--color-cream); font-size: 35px; margin: 0; }
.lichen-catalog, .lichen-detail { max-width: 1500px; margin: 0 auto; }
.lichen-grid {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 18px 12px;
}
.lichen-grid > li { min-width: 0; }
.lichen-card {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  border: 1px solid var(--color-sand);
  border-radius: 4px;
  color: var(--color-cream);
  background: rgba(20, 32, 33, 0.2);
  text-decoration: none;
  transition: background 0.2s, border-color 0.2s;
}
.lichen-card:hover, .lichen-card:focus-visible {
  background: rgba(176, 255, 85, 0.07);
  border-color: var(--color-lime);
}
.lichen-card__image {
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  padding: 12px;
}
.lichen-card__image img { width: 100%; height: 100%; object-fit: contain; }
.lichen-card__name {
  padding: 10px 8px 14px;
  text-align: center;
  color: var(--color-cream);
  font-size: clamp(0.95rem, 1.25vw, 1.3rem);
  font-weight: 500;
  line-height: 1.1;
  overflow-wrap: anywhere;
}
.lichen-card__placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
  color: var(--color-sand);
  font-size: 0.8rem;
}
.lichen-card__placeholder svg { width: 44px; height: 44px; }
.lichen-card__available { color: var(--color-cream); font-size: 0.75rem; }
.lichen-detail__toolbar { display: flex; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 16px; }
.lichen-back { display: inline-flex; align-items: center; min-height: 44px; color: var(--color-cream); }
.lichen-back:hover { color: var(--color-lime); }
.lichen-specimen { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: clamp(18px, 4vw, 56px); }
.lichen-specimen__image, .lichen-viewer {
  position: relative;
  min-height: clamp(280px, 43vw, 560px);
  border: 2px solid var(--color-sand);
  border-radius: 9px;
  overflow: hidden;
}
.lichen-specimen__image { display: grid; place-items: center; padding: clamp(12px, 3vw, 36px); color: var(--color-dark); background: #fff; }
.lichen-specimen__image img { width: 100%; height: 100%; object-fit: contain; }
.lichen-viewer {
  height: auto;
  background: transparent;
}
.lichen-error { position: absolute; inset: 0; z-index: 11; display: grid; place-content: center; padding: 24px; background: var(--color-dark); }
.lichen-species-card {
  max-width: min(100%, 760px);
  margin: clamp(22px, 3vw, 42px) auto 0;
  padding: clamp(20px, 3vw, 36px) clamp(28px, 5vw, 54px);
  border: 2px solid var(--color-sand);
  border-radius: 20px;
  background: #fff;
  color: var(--color-dark);
}
.lichen-species-card h2 { margin: 0; color: #c99761; font-size: clamp(2rem, 4vw, 3.4rem); font-style: italic; font-weight: 600; line-height: 1.05; }
.lichen-species-card__hint { margin: 3px 0 28px; color: #c8b9ac; font-size: clamp(1rem, 2vw, 1.6rem); font-weight: 300; }
.lichen-species-card__scientific { margin: 0; color: #c99761; font-size: clamp(1.25rem, 2.4vw, 2rem); font-style: italic; font-weight: 600; }
.lichen-species-card__scientific + .lichen-species-card__hint { margin-bottom: 0; }
@media (max-width: 1199px) {
  .lichen-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}
@media (max-width: 767px) {
  .lichen-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
  .lichen-specimen { grid-template-columns: 1fr; gap: 16px; }
  .lichen-specimen__image, .lichen-viewer { min-height: min(78vw, 460px); }
  .lichen-species-card { border-radius: 14px; }
}
</style>
