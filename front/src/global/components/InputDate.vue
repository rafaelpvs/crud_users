<template>
  <input
    type="text"
    ref="input-date"
    :id="props.inputId"
    class="form-control"
    v-model="dateString"
    placeholder="placeholder"
  />
</template>

<script setup lang="ts">
import flatpickr from "flatpickr";
import type { Instance } from "flatpickr/dist/types/instance";
import moment from "moment";
import { onMounted, onUnmounted, useTemplateRef } from "vue";

const props = defineProps({
  inputId: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
});
const model = defineModel({
  type: String,
});
const dateString: string = model.value!;

const inputElement = useTemplateRef("input-date");
let flatpickrInstance: Instance | null = null;
onMounted(() => {
  flatpickrInstance = flatpickr(inputElement.value!, {
    dateFormat: "d/m/Y",
    onChange: (dates) => {
      const [date] = dates;
      const momentDate = moment(date);
      model.value = momentDate.format("YYYY-MM-DD");
    },
  });
});

onUnmounted(() => {
  flatpickrInstance!.destroy();
  flatpickrInstance = null;
});
</script>
