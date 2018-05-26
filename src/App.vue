<template>
  <div id="app">
    <div class='row'>
      <img src="./assets/logo.png" width='50px'>
      <h3>Cálculo de salário com Vue.js</h3>
    </div>
    <br><br>
    <div class='content'>
      <labeled-input title='Salário bruto:' :onInputChange="updateSalario" />
      <labeled-input title='Base INSS:' :value="salario.baseINSS" disabled />
      <labeled-input title='Desconto INSS:' :value="salario.descontoINSS" disabled />
      <labeled-input title='Base IRPF:' :value="salario.baseIRPF" disabled />
      <labeled-input title='Desconto IRPF:' :value="salario.descontoIRPF" disabled />
      <labeled-input title='Salário líquido:' :value="salario.salarioLiquido" disabled />
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
      salario: new Salario(0)
    };
  },

  methods: {
    updateSalario: function(event) {
      this.salario = new Salario(+event.target.value);
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
