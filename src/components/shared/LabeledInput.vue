<template>
  <label>
    <span>{{ title }}</span>
    <input
      :id="customId"
      :disabled="disabled"
      type='number'
      :value="value"
      min="0"
      @change="!!onChange && onInputChange($event)"
      @input="!!onInputChange && onInputChange($event)" >
  </label>
</template>

<script>
export default {
  name: 'labeled-input',
  props: {
    customId: String,
    title: String,
    value: String,
    onInputChange: (Function = null),
    onChange: (Function = null),
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
