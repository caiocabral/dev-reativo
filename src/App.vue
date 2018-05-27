<template>
  <div id="app">
    <div class='row'>
      <img src="./assets/logo.png" width='50px'>
      <h3>
        Cálculo de salário com Vue.js
      </h3>
    </div>
    <br><br>

    <div class="content">
      <div class='mainContent'>
        <h3>Cálculo em tempo real</h3>
        <labeled-input customId="inputSalarioBruto" title='Salário bruto:' :onInputChange="updateSalario" />
        <labeled-input currency title='Base INSS:' :value="salario.baseINSS" disabled />
        <labeled-input currency title='Desconto INSS:' :value="salario.descontoINSS" disabled />
        <labeled-input currency title='Base IRPF:' :value="salario.baseIRPF" disabled />
        <labeled-input currency title='Desconto IRPF:' :value="salario.descontoIRPF" disabled />
        <labeled-input currency title='Salário líquido:' :value="salario.salarioLiquido" disabled />
      </div>
      <div class="sideContent">
        <h3>
          Cálculo reverso com Observables
        </h3>
        <labeled-input customId="inputSalarioLiquidoDesejado" title="Salário líquido desejado:" :value="salarioLiquidoDesejado" :onInputChange="updateSalarioLiquidoDesejado" />
        <button @click="findSalarioLiquido">Calcular salário bruto correspondente</button>
      </div>
    </div>

  </div>
</template>

<script>
import { interval, timer, Observable } from 'rxjs';
import { pipe, takeUntil, map, filter } from 'rxjs/operators';

import { Salario } from './Salario';
import LabeledInput from './components/shared/LabeledInput.vue';

export default {
  name: 'app',
  components: {
    'labeled-input': LabeledInput,
  },

  data() {
    return {
      salario: new Salario(0),
      salarioLiquidoDesejado: '5000',
      encontrarSalario$: null,
    };
  },

  methods: {
    updateSalario: function(event) {
      this._internalUpdateSalario(+event.target.value);
    },

    updateSalarioLiquidoDesejado: function(event) {
      this.salarioLiquidoDesejado = event.target.value;
    },

    _internalUpdateSalario: function(newSalario) {
      this.salario = new Salario(+newSalario);
    },

    findSalarioLiquido: function() {
      /**
       * Obtendo o input que define o salário bruto
       * e atualizando-o com o salário líquido desejado,
       * evitando iteração desnecessária
       */
      const inputSalarioBruto = this.$el.querySelector('#inputSalarioBruto');
      inputSalarioBruto.value = this.salarioLiquidoDesejado;

      /**
       * Criando observable que, a cada 5 milisegundos, incrementa
       * o salário bruto e o recalcula no estado da aplicação. POr
       * fim, retorna o salarioLiquido obtido após o cálculo.
       */
      const obs$ = interval(1).pipe(
        map(() => {
          inputSalarioBruto.value = (+inputSalarioBruto.value + 1).toString();
          this._internalUpdateSalario(inputSalarioBruto.value);
          return this.salario.salarioLiquido;
        }),
      );

      /**
       * Observable para ser utilizado com takeUntil,
       * que será a condição de término da execução
       * (salarioLiquido do estado maior ou igual ao salarioLiquido desejado)
       */
      const match$ = obs$.pipe(
        filter(currentValue => +currentValue >= +this.salarioLiquidoDesejado),
      );

      /**
       * Acionamos, por fim, a execução do observable
       */
      obs$.pipe(takeUntil(match$)).subscribe();
    },
  },
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

.content {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.mainContent {
  border: 1px solid gray;
  padding: 10px;
  margin-right: 30px;
  width: 50%;
}

.sideContent {
  border: 1px solid gray;
  padding: 10px;
  margin-right: 30px;
  width: 50%;
}
</style>
