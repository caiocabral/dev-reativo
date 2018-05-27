<template>
  <div id="app">
    <div class='row'>
      <img src="./assets/logo.png" width='50px'>
      <h3>Cálculo de salário com Vue.js</h3>
      <h3>{{ subscribe$ }}</h3>
    </div>
    <br><br>

    <div class="content">
      <div class='mainContent'>
        <h3>Cálculo em tempo real</h3>
        <labeled-input customId="inputSalarioBruto" title='Salário bruto:' :onInputChange="updateSalario" />
        <labeled-input title='Base INSS:' :value="salario.baseINSS" disabled />
        <labeled-input title='Desconto INSS:' :value="salario.descontoINSS" disabled />
        <labeled-input title='Base IRPF:' :value="salario.baseIRPF" disabled />
        <labeled-input title='Desconto IRPF:' :value="salario.descontoIRPF" disabled />
        <labeled-input title='Salário líquido:' :value="salario.salarioLiquido" disabled />
      </div>
      <div class="sideContent">
        <h3>Cálculo reverso com Observables</h3>
        <labeled-input customId="inputSalarioLiquidoDesejado" title="Salário líquido desejado:" :value="salarioLiquidoDesejado" :onInputChange="updateSalarioLiquidoDesejado" />
        <button @click="findSalarioLiquido">Calcular salário bruto correspondente</button>
      </div>
    </div>

  </div>
</template>

<script>
import { timer, interval } from 'rxjs/observable';
import { pipe, takeUntil } from 'rxjs/operators';

import { Salario } from './Salario';
import LabeledInput from './components/shared/LabeledInput.vue';

export default {
  name: 'app',
  components: {
    'labeled-input': LabeledInput
  },

  subscriptions() {
    //emit value every 1s
    const source = interval(1000);
    //after 5 seconds, emit value
    const timer = timer(5000);
    //when timer emits after 5s, complete source
    const example = source.pipe(takeUntil(timer));
    //output: 0,1,2,3
    const subscribe = example.subscribe(val => console.log(val));

    return { subscribe$ };
  },

  data() {
    return {
      salario: new Salario(0),
      salarioLiquidoDesejado: '5000',
      encontrarSalario$: null
    };
  },

  created() {
    console.log('created');

    // const obs$ = from([1, 2, 3, 4]) //interval(5)
    //   .pipe(takeWhile(() => true))
    //   .subscribe(value => console.log(value));
  },

  mounted() {
    const input = this.$el.querySelector('#inputSalarioBruto');

    // const fromEvent$ = fromEvent(input, 'change').subscribe(event =>
    //   console.log(event.target.value)
    // );
  },

  methods: {
    updateSalario: function(event) {
      console.log('updating...');
      this._internalUpdateSalario(+event.target.value);
    },

    updateSalarioLiquidoDesejado: function(event) {
      this.salarioLiquidoDesejado = event.target.value;
    },

    _internalUpdateSalario: function(newSalario) {
      this.salario = new Salario(+newSalario);
    },

    findSalarioLiquido: function() {
      //const inputSalarioBruto = this.$el.querySelector('#inputSalarioBruto');
      //inputSalarioBruto.value = this.salarioLiquidoDesejado;
      // const map$ = interval(5).pipe(
      //   map(() => {
      //     //inputSalarioBruto.value = (+inputSalarioBruto.value + 1).toString();
      //     //this._internalUpdateSalario(inputSalarioBruto.value);
      //     return this.salario.salarioLiquido;
      //   })
      // );
      //const condition$ = from([this.salario]).pipe(
      //  salario => salario.salarioLiquido >= 10000 //inputSalarioBruto.value
      //);
      // takeUntil$.subscribe(value => console.log(value));
      // const takeUntil$ = of(
      //   () => +this.salario.salarioLiquido < +this.salarioLiquidoDesejado
      // );
      //const observer$ = interval$.subscribe(value => console.log(value));
      // map$
      //   .pipe(
      //     takeWhile(value => {
      //       //console.log(+value);
      //       //console.log(+this.salarioLiquidoDesejado);
      //       //const condition = +value < +this.salarioLiquidoDesejado;
      //       return true; //condition;
      //     })
      //   )
      //   .subscribe(value => console.log(value));
      // const obs$ = from([1, 2, 3, 4]) //interval(5)
      //   .pipe(takeWhile(() => true))
      //   .subscribe(value => console.log(value));
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
