<template>
  <div class="input-date-range d-flex align-items-center">
    <input
      type="text"
      ref="input-date"
      :id="props.inputId"
      class="form-control form-control-sm"
      :placeholder="placeholder"
    />
    <span @click="clearDate" class="ms-2">
      <font-awesome-icon
        :icon="['fas', 'xmark']"
        size="sm"
        style="color: #919191; cursor: pointer; margin-right: 15px"
      />
    </span>
  </div>
</template>

<script setup lang="ts">
import flatpickr from "flatpickr";
import type { Instance } from "flatpickr/dist/types/instance";
import moment from "moment";
import { onMounted, onUnmounted, useTemplateRef } from "vue";
import { Portuguese } from "flatpickr/dist/l10n/pt.js";
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
const fromDate = defineModel<string>("fromDate");
const toDate = defineModel<string>("toDate");

const inputElement = useTemplateRef<HTMLInputElement>("input-date");
let flatpickrInstance: Instance | null = null;
onMounted(() => {
  flatpickrInstance = flatpickr(inputElement.value!, {
    dateFormat: "d/m/Y",
    altInput: true,
    altFormat: "d/m/Y",
    locale: Portuguese,
    mode: "range",
    defaultDate: [
      fromDate.value ? moment(fromDate.value).toDate() : "",
      toDate.value ? moment(toDate.value).toDate() : "",
    ],
    onChange: (dates) => {
      const [newFromDate, newToDate] = dates;

      fromDate.value = moment(newFromDate)
        .startOf("day")
        .format("YYYY-MM-DDTHH:mm:ssZ");
      toDate.value = moment(newToDate)
        .endOf("day")
        .format("YYYY-MM-DDTHH:mm:ssZ");
    },
  });
});
const clearDate = () => {
  flatpickrInstance?.clear();
  fromDate.value = "";
  toDate.value = "";
};
onUnmounted(() => {
  flatpickrInstance!.destroy();
  flatpickrInstance = null;
});
</script>
