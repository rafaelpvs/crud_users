<template>
  <div class="d-flex align-items-center">
    <input
      type="text"
      ref="input-date"
      :id="props.inputId"
      class="form-control form-control-sm"
      v-model="dateString"
      :placeholder="placeholder"
    />
    <span @click="clearDate" class="ms-2">
      <font-awesome-icon
        :icon="['fas', 'xmark']"
        size="sm"
        style="color: red; cursor: pointer; margin-right: 15px"
      />
    </span>
  </div>
</template>

<script setup lang="ts">
import flatpickr from "flatpickr";
import type { Instance } from "flatpickr/dist/types/instance";
import moment from "moment";
import { onMounted, onUnmounted, useTemplateRef, type PropType } from "vue";

const props = defineProps({
  inputId: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
  valueFormat: {
    type: String,
    required: false,
    default: "YYYY-MM-DD",
  },
  forceTimeType: {
    type: String as PropType<ForceTimeType>,
    required: false,
  },
});
type ForceTimeType = "end_of_day" | "start_of_day";
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
      let momentDate = null;
      if (props.forceTimeType === "end_of_day") {
        momentDate = moment(date).endOf("day");
      } else {
        momentDate = moment(date);
      }
      model.value = momentDate.format(props.valueFormat);
    },
  });
});
const clearDate = () => {
  flatpickrInstance?.clear();
  model.value = "";
};
onUnmounted(() => {
  flatpickrInstance!.destroy();
  flatpickrInstance = null;
});
</script>
