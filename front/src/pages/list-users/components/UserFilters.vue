<template>
  <form @submit.prevent="onSubmit">
    <div class="mb-2">
      <label for="fullName" class="form-label">Nome completo:</label>
      <input
        type="text"
        class="form-control"
        id="fullName"
        v-model="filters.full_name_cont"
        placeholder="Digite o nome"
      />
    </div>

    <div class="mb-2">
      <label for="birthDate" class="form-label">Data de aniversário:</label>
      <InputDate
        placeholder="Digite a data de aniversário..."
        input-id="birthDate"
        v-model="filters.birth_date_eq"
      />
    </div>

    <div class="mb-2">
      <label for="createdAt" class="form-label">Data de criação:</label>
      <InputDate
        placeholder="Digite a data de cadastro..."
        input-id="createdAt"
        v-model="filters.created_at_date_eq"
      />
    </div>

    <div class="mb-2">
      <label for="updatedAt" class="form-label">Data de atualização:</label>
      <InputDate
        placeholder="Digite a data de atualização..."
        input-id="updatedAt"
        v-model="filters.updated_at_date_eq"
      />
    </div>

    <div class="form-check">
      <input
        class="form-check-input"
        type="checkbox"
        v-model="filters.active_eq"
        id="checkDefault"
      />
      <label class="form-check-label" for="checkDefault"> Ativo </label>
    </div>

    <div>
      <button type="submit" class="btn btn-primary">Filtrar</button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import type { Filters } from "@/repositories/UserRepository";

import { reactive, watch, type PropType } from "vue";
import InputDate from "../../../global/components/InputDate.vue";

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

async function onSubmit() {
  await emit("search");
}
</script>
