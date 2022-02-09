<template>
  <div class="container pt-5">
    <div class="row">
      <div class="col-lg-12">
        <div class="mb-3">
          <label for="cantidad" class="form-label">Ingrese Cantidad</label>
          <input
            v-model="cantidad"
            type="number"
            v-on:keyup="convertir"
            class="form-control form-control-lg"
            id="cantidad"
            aria-describedby="emailHelp"
            placeholder="Ingrese la cantidad de dinero"
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6">
        <div class="form-group">
          <label for="tipoDinero" class="form-label">Tengo</label>
          <select
            class="form-control form-control-lg"
            id="tipoDinero"
            v-model="tiene"
            v-on:change="convertir"
          >
            <option v-for="(moneda, index) in monedas" v-bind:key="index">
              {{ moneda }}
            </option>
          </select>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="form-group">
          <label for="quiero" class="form-label">Quiero</label>
          <select
            class="form-control form-control-lg"
            id="quiero"
            v-model="cambioA"
            v-on:change="convertir"
          >
            <option v-for="(moneda, index) in monedas" v-bind:key="index">
              {{ moneda }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="text-center pt-2">
      <h5>
        <span class="badge badge-success">{{ cantidad }} {{ tiene }}</span>
        <span class="badge badge-dark">Son_:</span>
        <span class="badge badge-success">{{ getTotal(total) }} {{ cambioA }}</span>
      </h5>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      monedas: ["USD", "EUR", "LIBRA", "PESOS COL"],
      cantidad: 0,
      tiene: "USD",
      cambioA: "EURO",
      total: 0,
    };
  },
  methods: {
    convertir() {
      switch (this.tiene) {
        case "USD":
          if (this.cambioA === "USD") {
            this.total = this.cantidad;
          }
          if (this.cambioA === "EUR") {
            this.total = this.cantidad * 0.87;
          }
          if (this.cambioA === "LIBRA") {
            this.total = this.cantidad * 0.74;
          }
          if (this.cambioA === "PESOS COL") {
            this.total = this.cantidad * 3.95;
          }

          break;
        case "EUR":
          if (this.cambioA === "USD") {
            this.total = this.cantidad * 1.14;
          }
          if (this.cambioA === "EUR") {
            this.total = this.cantidad;
          }
          if (this.cambioA === "LIBRA") {
            this.total = this.cantidad * 0.84;
          }
          if (this.cambioA === "PESOS COL") {
            this.total = this.cantidad * 4.595;
          }

          break;
        case "PESOS COL":
          if (this.cambioA === "USD") {
            this.total = this.cantidad * 0.00025;
          }
          if (this.cambioA === "EUR") {
            this.total = this.cantidad * 0.00022;
          }
          if (this.cambioA === "LIBRA") {
            this.total = this.cantidad * 0.00019;
          }
          if (this.cambioA === "PESOS COL") {
            this.total = this.cantidad;
          }

          break;
        case "LIBRA":
          if (this.cambioA === "USD") {
            this.total = this.cantidad * 1.33;
          }
          if (this.cambioA === "EUR") {
            this.total = this.cantidad * 1.19;
          }
          if (this.cambioA === "LIBRA") {
            this.total = this.cantidad;
          }
          if (this.cambioA === "PESOS COL") {
            this.total = this.cantidad * 5.37;
          }

          break;
      }
    },
    getTotal( cantidad ){
        return Math.round(cantidad)
    }
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
</style>