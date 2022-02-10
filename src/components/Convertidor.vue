<template>
  <ul class="nav nav-tabs">
    <li class="active">
      <a
        class="nav-link active"
        data-toggle="tab"
        aria-current="page"
        href="#tabla"
        >Conversión</a
      >
    </li>
    <li class="nav-item">
      <a class="nav-link" data-toggle="tab" href="#inicio"
        >Historial de aplicaciones</a
      >
    </li>
  </ul>

  <div class="tab-content">
    <div class="tab-pane" id="inicio"></div>
    <div class="tab-pane" id="tabla">
      <p>lorem ipsum dolor sit am tABLA</p>
    </div>
  </div>

  <form class="needs-validation" @submit.prevent="agregarHistorial">
    <div class="container pt-5">
      <div class="row">
        <div class="col-lg-12">
          <div class="mb-3">
            <label for="cantidad" class="form-label">Monto</label>
            <input
              v-model="monto"
              type="number"
              v-on:keyup="convertir"
              class="form-control form-control-lg"
              id="cantidad"
              aria-describedby="emailHelp"
              placeholder="Ingrese la cantidad de dinero"
              min="1"
              required
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6">
          <div class="form-group">
            <label for="tipoDinero" class="form-label">Moneda origen</label>
            <select
              class="form-control form-control-lg"
              id="tipoDinero"
              v-model="monedaOrigen"
              required
            >
              <option
                v-for="(moneda, index) in monedas"
                v-bind:key="index"
                :value="index"
              >
                {{ index + "    " + moneda }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <label for="monedaObjetivo" class="form-label"
              >Moneda Objetivo</label
            >
            <select
              class="form-control form-control-lg"
              id="monedaObjetivo"
              v-model="monedaObjetivo"
              required
            >
              <option
                v-for="(moneda, index) in monedas"
                v-bind:key="index"
                :value="index"
              >
                {{ index + "    " + moneda }}
              </option>
            </select>
          </div>
        </div>
      </div>
    
      <div class="col text-center pt-5">
        <button
          type="submit"
          @click="   obtenerValorMonedaOrigen(), agregarHistorial(), capturarFecha() "
          class="btn btn-primary center"
        >
          Convertir
        </button>
      </div>
       <div class="row">
          <div class="mb-1">
            <input
              v-model="valorConversion"
              type="hidden"
              v-on:keyup="convertir"
              class="form-control"
              id="cantidad"
              disabled="true"
            />
          </div>
      </div>
       <div class="row">
          <div class="mb-1">
            <input
              v-model="fechaConversion"
              type="hidden"
              v-on:keyup="convertir"
              class="form-control"
              id="cantidad"
              disabled="true"
            />
          </div>
      </div>
      

      <div class="text-center pt-2">
        <h5>
          <span>{{ monto }} {{ monedaOrigen }} </span>
          <span> Son: </span>

          <span> {{ valorConversion }} {{ monedaObjetivo }}</span>
        </h5>
      </div>
    </div>
  </form>
  <historial />
</template>
<script>
export default {

  data() {
    return {
      fechaActual: "",
      fechaGuardada:"",
      valorMonedaOrigen: null,
      valorMonedaObjetivo: null,
      valorMonedaOrigenEscojida: null,
      monedas: [],
      total: null,
      monedaOrigen: "",
      monedaObjetivo: "",
      monto: "",
      valorConversion: "",
      fechaConversion: ""
    };
  },
  mounted() {
  this.getDivisas();
    this.getMonedas();
    this.capturarFecha();
  },
  methods: {
    async agregarHistorial() {
       let datos = {
        monedaOrigen: this.monedaOrigen,
        monedaObjetivo: this.monedaObjetivo,
        monto: this.monto,
        valorConversion: this.valorConversion,
      }
      const payload = JSON.stringify(datos);
      const r = await fetch("http://localhost:9000/api/divisa/historial", {
        method: "POST",
        body: payload,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await r.json();
      if (response) {
         this.monedaOrigen = "",
          this.monedaObjetivo = ""
      }
    },
   capturarFecha(){
  
      let fecha = new Date();
      let mes = fecha.getMonth() + 1;
      let day = fecha.getDate();
      let year = fecha.getFullYear();
      this.fechaActual = `${day}/${mes}/${year}`
      this.fechaGuardada = `${year}/${mes}/${day}`
    },  
     seleccionar(moneda) {
      console.log("moneda: " + moneda);
    },

    async getDivisas() {
      const { rates } = await fetch(
        "https://openexchangerates.org/api/latest.json?app_id=d48a0e7befa1452494a86688307d7be5"
      ).then((resp) => resp.json());

      console.log(this.valorMonedaOrigenEscojida);
      this.valorMonedaOrigen = rates;
    },
    async getMonedas() {
      const monedasObtenidas = await fetch(
        "https://openexchangerates.org/api/currencies.json?app_id=d48a0e7befa1452494a86688307d7be5"
      ).then((resp) => resp.json());
      console.log(monedasObtenidas, "wwww");
      this.monedas = monedasObtenidas;
    },
    obtenerValorMonedaOrigen() {
      console.log(this.valorMonedaOrigen.USD, "MONTO DOLAR");

      this.valorConversion =
        this.monto / this.valorMonedaOrigen[this.monedaOrigen];

      return this.valorConversion;
    },
  },
};
</script>


<style scoped>
label {
  font-weight: 650;
  font-size: 120%;
}
.badge {
  margin: 2px;
  font-size: 150%;
}
.span {
  color: black;
}
</style>