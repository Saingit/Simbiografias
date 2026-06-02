<template>
  <NavBar v-if="!route.meta.hideNav" />
  <RouterView />
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import { RouterView, useRoute } from 'vue-router'

const route = useRoute()
</script>
