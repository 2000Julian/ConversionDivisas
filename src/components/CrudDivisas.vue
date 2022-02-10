<template>

 <div class="container">
     <h1 class="text-center">Divisas mundiales</h1>
     <table class="table table-striped">
         <thead>
             <th>ID</th>
             <th>Nombre</th>
             <th>APELLIDO</th>
             <th>DNI</th>
         </thead>
         <tbody>
             <tr>
                 <!-- <td>{{}}</td>
                 <td>{{}}</td> -->
             </tr>
         </tbody>

     </table>
 </div>
</template>

<script>
import ClienteService from '../services/ClienteServices';
import axios from 'axios'
export default {
 name: 'CrudDivisas',
 data(){
     return {
         personas: [],
     }
 },
 clienteService : null,
 created() {
     this.clienteService = new ClienteService();
     this.getClientes()
 },
 async mounted() {
     const rest =  await axios.get("http://localhost:9000/api/divisa/cliente/all");
     this.personas = rest.data;
     console.log(this.personas)
    //  this.clienteService.getAll().then(data =>{
    //      console.log(data)
    //  })
 }, 
 methods: {
     getClientes(){
         ClienteService.getAll().then((response) =>{
             //this.personas = response.data;
            console.log(response)
         })
     }
 }

}

</script>

<style>

</style>
