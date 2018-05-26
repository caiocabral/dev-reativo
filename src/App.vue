<template>
  <div id="app">
    <div class='row'>
      <img src="./assets/logo.png" width='50px'>
      <h3>Cálculo de salário com Vue.js</h3>
    </div>
    <br><br>
    <div class='content'>
      <labeled-input title='Salário bruto:' :onInputChange="updateSalario" />
      <input title='Base INSS:' :value="salario.baseINSS" disabled />
      <labeled-input title='Desconto INSS:' :value="salario.descontoINSS" disabled />
      <labeled-input title='Base IRPF:' :value="salario.baseIRPF" disabled />
      <labeled-input title='Desconto IRPF:' :value="salario.descontoIRPF" disabled />
      <labeled-input title='Salário líquido:' :value="salario.salarioLiquido" disabled />
      <p>{{ salario.salarioLiquido }}</p>
    </div>
    <div style="text-align: left">
      <!-- <label>
        Salário bruto: <input autofocus type='number' v-on:input="updateSalario" />
      </label>

      <br><br>
      <label>
        Base INSS: <input disabled type='number' :value="salario.baseINSS" />
      </label>

      <br><br>
      <label>
        Desconto INSS: <input disabled type='number' :value="salario.descontoINSS" />
      </label>

      <br><br>
      <label>
        Base IRPF: <input disabled type='number' :value="salario.baseIRPF" />
      </label>

      <br><br>
      <label>
        Desconto IRPF: <input disabled type='number' :value="salario.descontoIRPF" />
      </label>

      <br><br>
      <label>
        Salário líquido: <input disabled type='number' :value="salario.salarioLiquido" />
      </label> -->

    </div>
  </div>
</template>

<script>
import { Salario } from './Salario';
import LabeledInput from './components/shared/LabeledInput.vue';

export default {
  name: 'app',
  components: {
    'labeled-input': LabeledInput
  },
  data() {
    return {
      msg: 'Raphael',
      salario: new Salario(1000)
    };
  },
  methods: {
    updateSalario: event => {
      this.salario = new Salario(+event.target.value);
      console.log(this.salario.salarioLiquido);
    }
  }
};
</script>

<style>
body {
  font-family: Arial, Helvetica, sans-serif;
}

.row {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0 auto;
}
</style>
