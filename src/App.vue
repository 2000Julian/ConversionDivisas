<template>
<div class="fond">
<Navbar/>

<Convertidor/>
<Historial/>
<!-- <CrudResp/> -->
<!-- <CrudDivisas/> -->
</div>

</template>

<script>

import Navbar from './components/Navbar.vue'
import Historial from './components/Historial.vue'

import Convertidor from './components/Convertidor.vue'




export default {
  name: 'App',
  components: {
    Navbar,
    Convertidor,
    Historial
  

  }
}
</script>

<style>
.fond{
  background-image: url('./assets/fondo.jpg');
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

</style>
