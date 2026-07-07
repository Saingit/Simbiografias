<template>
  <main
    class="min-vh-100 d-flex align-items-center justify-content-end"
    :style="` background-image: url('${baseUrl}images/fondo.png'); background-size: cover; background-attachment: fixed;`"
    role="main"
    aria-label="Conexiones - Experiencia interactiva"
  >
   <!-- <iframe width="100%" height="759" src="https://www.youtube.com/embed/r1UL79C8PxI" title="CRISTIANO RONALDO FUE DECISIVO Y LE MOSTRÓ A YAMAL QUIÉN ES EL REY EN LA BATALLA FINAL" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

   <iframe 
     width="60%" 
     height="1000" 
     src="https://app.sketchup.com/share/tc/northAmerica/bnie0ZgbXZg?source=web&stoken=UzgTbSP6IzylqQ8N7cwYRugD6CuJ8tbowLeI0ccADHFMuLff1U0VNI4lJ9zkjkBd"  
     frameborder="0" 
     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
     referrerpolicy="strict-origin-when-cross-origin" 
     allowfullscreen
     title="Modelo 3D interactivo de SketchUp"
     aria-label="Visor de modelo 3D interactivo de SketchUp"
   ></iframe>
  
  </main>
</template>

<script setup>
const baseUrl = import.meta.env.BASE_URL
</script>
