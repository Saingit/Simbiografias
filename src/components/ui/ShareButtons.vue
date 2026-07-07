<template>
  <div class="share-buttons" :class="{ 'share-buttons--vertical': vertical }">
    <span v-if="showLabel" class="share-buttons__label">Compartir:</span>
    
    <div class="share-buttons__list">
      <button
        v-for="network in networks"
        :key="network.name"
        class="share-btn"
        :class="`share-btn--${network.name}`"
        @click="share(network.name)"
        :aria-label="`Compartir en ${network.label}`"
        :title="`Compartir en ${network.label}`"
      >
        <svg class="share-btn__icon" viewBox="0 0 24 24" fill="currentColor">
          <path :d="network.icon" />
        </svg>
        <span v-if="showLabels" class="share-btn__text">{{ network.label }}</span>
      </button>

      <button
        v-if="showCopyLink"
        class="share-btn share-btn--copy"
        @click="copyLink"
        :aria-label="copied ? 'Enlace copiado' : 'Copiar enlace'"
        :title="copied ? '¡Copiado!' : 'Copiar enlace'"
      >
        <svg v-if="!copied" class="share-btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
        <svg v-else class="share-btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 6L9 17l-5-5" />
        </svg>
        <span v-if="showLabels" class="share-btn__text">
          {{ copied ? '¡Copiado!' : 'Copiar' }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  url: {
    type: String,
    default: () => window.location.href
  },
  title: {
    type: String,
    default: () => document.title
  },
  text: {
    type: String,
    default: ''
  },
  image: String,
  vertical: Boolean,
  showLabel: Boolean,
  showLabels: Boolean,
  showCopyLink: {
    type: Boolean,
    default: true
  },
  networks: {
    type: Array,
    default: () => ['facebook', 'twitter', 'linkedin', 'whatsapp', 'telegram']
  }
})

const emit = defineEmits(['share', 'copy', 'error'])

const copied = ref(false)

const networkConfigs = {
  facebook: {
    label: 'Facebook',
    icon: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
    getUrl: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
  },
  twitter: {
    label: 'Twitter',
    icon: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z',
    getUrl: (url, text) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
  },
  linkedin: {
    label: 'LinkedIn',
    icon: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z',
    getUrl: (url, title) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
  },
  whatsapp: {
    label: 'WhatsApp',
    icon: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492l4.634-1.483A11.952 11.952 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z',
    getUrl: (url, text) => `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`
  },
  telegram: {
    label: 'Telegram',
    icon: 'M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-17.19 7.395a1.29 1.29 0 0 0-.062 2.277l4.493 1.467 1.732 5.443a.8.8 0 0 0 .748.568l.025-.003a.8.8 0 0 0 .757-.418l.958 1.09a.8.8 0 0 0 .765.242l3.18-1.293a.8.8 0 0 0 .527-.973l-.594-2.945 4.587-2.095a.8.8 0 0 0 .442-1.054L22.49 3.13a2.242 2.242 0 0 0-1.292-.697z',
    getUrl: (url, text) => `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
  },
  email: {
    label: 'Email',
    icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6',
    getUrl: (url, title) => `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`
  }
}

const enabledNetworks = computed(() => {
  return props.networks
    .filter(name => networkConfigs[name])
    .map(name => ({
      name,
      ...networkConfigs[name]
    }))
})

function share(networkName) {
  const network = networkConfigs[networkName]
  if (!network) return

  const shareUrl = network.getUrl(props.url, props.title || props.text)
  
  emit('share', { network: networkName, url: props.url })

  window.open(shareUrl, '_blank', 'width=600,height=400,scrollbars=yes')
}

async function copyLink() {
  try {
    await navigator.clipboard.writeText(props.url)
    copied.value = true
    emit('copy', props.url)
    
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (error) {
    emit('error', error)
    const textArea = document.createElement('textarea')
    textArea.value = props.url
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}
</script>

<style scoped>
.share-buttons {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.share-buttons--vertical {
  flex-direction: column;
  align-items: flex-start;
}

.share-buttons__label {
  font-size: 0.8rem;
  font-weight: 500;
  color: rgba(252, 248, 237, 0.6);
}

.share-buttons__list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.share-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  background: rgba(252, 248, 237, 0.08);
  border: 1px solid rgba(252, 248, 237, 0.15);
  border-radius: 8px;
  font-family: var(--font-sans);
  font-size: 0.875rem;
  color: var(--color-cream);
  cursor: pointer;
  transition: all 0.2s ease;
}

.share-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.share-btn--facebook:hover { background: #1877f2; border-color: #1877f2; }
.share-btn--twitter:hover { background: #1da1f2; border-color: #1da1f2; }
.share-btn--linkedin:hover { background: #0a66c2; border-color: #0a66c2; }
.share-btn--whatsapp:hover { background: #25d366; border-color: #25d366; }
.share-btn--telegram:hover { background: #0088cc; border-color: #0088cc; }
.share-btn--email:hover { background: #6b7961; border-color: #6b7961; }
.share-btn--copy:hover { background: var(--color-lime); border-color: var(--color-lime); color: var(--color-dark); }

.share-btn__icon {
  width: 18px;
  height: 18px;
}

.share-btn__text {
  white-space: nowrap;
}
</style>
