<template>
  <a href="#main-content" class="skip-link">Saltar al contenido principal</a>
  <NavBar v-if="!route.meta.hideNav" />
  <main id="main-content">
    <RouterView />
  </main>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import { RouterView, useRoute } from 'vue-router'

const route = useRoute()
</script>
