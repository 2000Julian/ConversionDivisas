<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Mod. Origen</th>
        <th scope="col">Mod. Objetivo</th>
        <th scope="col">Monto</th>
        <th scope="col">Valor</th>
        <th scope="col">Fecha</th>
        <th scope="col">Opciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(historial, index) in historiales" v-bind:key="index">
        <th scope="row">{{index}}</th>
        <td>{{historial.monedaOrigen}}</td>
        <td>{{historial.monedaObjetivo}}</td>
        <td>{{historial.monto}}</td>
        <td>{{historial.valorConversion}}</td>
        <!-- <td>{{historial.fechaConversion}}</td> -->
 
        <td><button type="button" class="btn btn-danger" @click="eliminar(index)">Eliminar</button></td>
      </tr>
     
     
    </tbody>
  </table>
</template>

<script>
export default {
  data() {
    return {
      historiales:[],
    };
  },
  mounted(){
    this.conection();
  },
  methods: {
    async conection() {
      const data = await fetch(
        "http://localhost:9000/api/divisa/historial/all"
      ).then((resp) => resp.json());
      this.historiales = data;
      
    },
    eliminar(index){
      if(!confirm('¿Desea eliminar este registro?')) return;

      this.historiales.splice(index, 1)
    },

    
  },
  
};
</script>

<style scoped>
</style>
