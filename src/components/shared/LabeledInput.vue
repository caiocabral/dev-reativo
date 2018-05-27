<template>
  <label>
    <span>{{ title }}</span>
    <input :id="customId" :disabled="disabled" :type="!!this.currency ? 'text' : 'number'" :value="formatValue" min="0" @change="!!onChange && onInputChange($event)" @input="!!onInputChange && onInputChange($event)">
  </label>
</template>

<script>
export default {
  name: 'labeldInput',
  props: {
    currency: Boolean - false,
    customId: String,
    disabled: (Boolean = false),
    onChange: (Function = null),
    onInputChange: (Function = null),
    title: String,
    value: String,
  },

  computed: {
    formatValue: {
      get: function() {
        console.log(this.value);
        if (!this.currency) return this.value;

        return Number(this.value).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });
      },
    },
  },
};
</script>

<style scoped>
input,
span {
  display: block;
  width: 100%;
  font-size: 1.2em;
}

input {
  margin-bottom: 10px;
}
</style>
