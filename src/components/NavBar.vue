<template>
  <nav
    class="navbar fixed-top px-4 py-3 nav-bar"
    :class="scrolled ? 'scrolled' : ''"
    role="navigation"
    aria-label="Navegación principal"
  >
    <!-- Logo -->
    <RouterLink to="/" class="navbar-brand p-0 me-auto" aria-label="Simbiografías - Ir al inicio">
      <img :src="`${baseUrl}images/logo/Recurso 8@4x.png`" alt="" class="nav-logo rounded-3" aria-hidden="true" />
    </RouterLink>

    <!-- Nav links -->
    <!-- <ul class="navbar-nav flex-row gap-4 mb-0" role="menubar">
      <li v-for="link in links" :key="link.to" class="nav-item" role="none">
        <RouterLink
          :to="link.to"
          class="nav-link fw-medium"
          role="menuitem"
          :aria-current="route.path === link.to ? 'page' : undefined"
          :style="{
            fontSize: '0.875rem',
            letterSpacing: '0.05em',
            transition: 'color 0.2s',
            color: scrolled
              ? (route.path === link.to ? 'var(--color-lime)' : 'var(--color-cream)')
              : (route.path === link.to ? '#233239' : '#6B7961')
          }"
        >
          {{ link.label }}
        </RouterLink>
      </li>
    </ul> -->
  </nav>
</template>

<script setup>
const baseUrl = import.meta.env.BASE_URL
import { RouterLink, useRoute } from 'vue-router'
import { useScrollPosition } from '../composables/useScrollPosition'

const route = useRoute()

const { isPastThreshold: scrolled } = useScrollPosition({ threshold: 20 })

const links = [
  { to: '/',        label: 'Inicio' },
  { to: '/diarios', label: 'Diarios de campo' },
]
</script>

<style scoped>
.nav-bar {
  background: transparent;
  width: 100%;
  left: 0;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  transition: width 0.4s ease, left 0.4s ease, background 0.4s ease,
              border-radius 0.4s ease, box-shadow 0.4s ease,
              padding 0.4s ease;
              z-index: 1;
}

.nav-bar.scrolled {
  width: 50%;
  left: 0;
  background: #142021;
  border-radius: 0 0 3rem 0rem;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
}

.nav-logo {
  width: 100px;
  transition: width 0.4s ease, opacity 0.2s;
}
.nav-bar.scrolled .nav-logo { width: 50px; }
.nav-logo:hover { opacity: 0.7; }
</style>
