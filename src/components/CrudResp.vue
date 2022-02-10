<template>
    <h1>Hola desde peticion divisas</h1>
    {{getDivisas()}}
</template>

<script>
 export default {

     data(){
         return {
             answer: null,
             resolveDivisas: null
         }
     },
     methods:{
       async  getDivisas(){
         const data = await fetch('https://openexchangerates.org/api/latest.json?app_id=d48a0e7befa1452494a86688307d7be5').then(resp => resp.json())
         console.log(data)
         }
     },
 }
</script>
