<template>
  <label>
    <span>{{ title }}</span>
    <input
      :disabled="disabled"
      type='number'
      :value="value"
      min="0"
      @input="onInputChange($event)" >
  </label>
</template>

<script>
export default {
  name: 'labeled-input',
  props: {
    title: String,
    value: String,
    onInputChange: Function,
    disabled: (Boolean = false)
  }
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
