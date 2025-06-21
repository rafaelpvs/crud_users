<template>
  <div
    class="btn-group"
    role="group"
    aria-label="Basic radio toggle button group"
  >
    <template v-for="(option, index) in props.options" :key="index">
      <input
        type="radio"
        class="btn-check"
        name="btnradio"
        :id="`btnradio_${index}`"
        autocomplete="off"
        :value="option.value"
        v-model="model"
      />
      <label class="btn btn-outline-primary btn-sm" :for="`btnradio_${index}`">{{
        option.label
      }}</label>
    </template>
  </div>
</template>

<script setup lang="ts">
const model = defineModel({
  type: String,
});

const props = defineProps({
  options: {
    type: Array<{
      label: string;
      value: string;
    }>,
    required: true,
  },
});
</script>
