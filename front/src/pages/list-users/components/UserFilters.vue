<template>
  <form @submit.prevent="onSubmit">
    <div class="row">
      <div class="mb-2 col-md-6">
        <label for="fullName" class="form-label">Nome completo:</label>
        <input
          type="text"
          class="form-control form-control-sm"
          id="fullName"
          v-model="filters.full_name_cont"
          placeholder="Digite o nome"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-md-2">
        <label for="birthDate" class="form-label">Data de aniversário:</label>
        <InputDate
          placeholder="Digite a data de aniversário..."
          input-id="birthDate"
          v-model="filters.birth_date_eq"
        />
      </div>
      <div class="mb-2 col-md-2">
        <label for="createdAt" class="form-label">Data de criação:</label>
        <InputDateRange
          input-id="created_at"
          placeholder="00/00/000 to 00/00/0000"
          v-model:fromDate="filters.created_at_gteq"
          v-model:toDate="filters.created_at_lteq"
        />
      </div>
      <div class="mb-2 col-md-2">
        <label for="updatedAt" class="form-label">Data de atualização:</label>
        <InputDateRange
          input-id="updated_at"
          placeholder="00/00/000 to 00/00/0000"
          v-model:fromDate="filters.updated_at_gteq"
          v-model:toDate="filters.updated_at_lteq"
        />
      </div>
    </div>
    <MultipleRadioButton
      class="mb-5"
      :options="activeOptions"
      v-model="active_eq"
    />
    <div>
      <button type="submit" class="btn btn-primary btn-sm">Filtrar</button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import type { Filters } from "@/repositories/UserRepository";

import { computed, reactive, watch, type PropType } from "vue";
import InputDate from "../../../global/components/InputDate.vue";
import MultipleRadioButton from "@/global/components/MultipleRadioButton.vue";
import InputDateRange from "@/global/components/InputDateRange.vue";

const props = defineProps({
  filtersProp: {
    required: true,
    type: Object as PropType<Filters>,
  },
});

const filters = reactive<Filters>(props.filtersProp);
watch(
  () => props.filtersProp,
  (newFilters) => {
    emit("onUpdateFilters", newFilters);
  },
  { deep: true }
);
const emit = defineEmits<{
  (e: "search"): Promise<void>;
  (e: "onUpdateFilters", filters: Filters): void;
}>();
const active_eq = computed<string>({
  get: () => filters.active_eq?.toString() ?? "null",
  set: (value) => {
    if (value === "false") filters.active_eq = false;
    else if (value === "true") filters.active_eq = true;
    else if (value === "null") filters.active_eq = null;
  },
});

const activeOptions: { label: string; value: string }[] = [
  { label: "Ativo", value: "true" },
  { label: "Inativo", value: "false" },
  { label: "Ativo e Inativo", value: "null" },
];
async function onSubmit() {
  await emit("search");
}
</script>
