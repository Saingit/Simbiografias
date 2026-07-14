import { ref, computed } from 'vue'

export function usePhotoGallery(photos, baseUrl = '') {
  const isGalleryOpen = ref(false)
  const currentPhotoIndex = ref(0)
  const currentEffect = ref('slide')

  const galleryImages = computed(() => {
    return photos.map((photo, index) => ({
      src: `${baseUrl}images/fotografias/${photo}.jpg`,
      alt: `Fotografía de líquen ${index + 1} de ${photos.length}`,
      id: photo
    }))
  })

  function openGallery(index = 0) {
    currentPhotoIndex.value = index
    isGalleryOpen.value = true
  }

  function closeGallery() {
    isGalleryOpen.value = false
  }

  function setEffect(effect) {
    currentEffect.value = effect
  }

  function nextPhoto() {
    if (currentPhotoIndex.value < galleryImages.value.length - 1) {
      currentPhotoIndex.value++
    }
  }

  function prevPhoto() {
    if (currentPhotoIndex.value > 0) {
      currentPhotoIndex.value--
    }
  }

  function goToPhoto(index) {
    if (index >= 0 && index < galleryImages.value.length) {
      currentPhotoIndex.value = index
    }
  }

  return {
    isGalleryOpen,
    currentPhotoIndex,
    currentEffect,
    galleryImages,
    openGallery,
    closeGallery,
    setEffect,
    nextPhoto,
    prevPhoto,
    goToPhoto
  }
}
