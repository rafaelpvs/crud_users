import { type PropType } from 'vue';
<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-end">
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        v-for="(page, index) in pagination.series"
        :key="index"
        :class="{ 'page-item': true, active: pagination.page == page }"
      >
        <a
          v-if="page !== 'gap'"
          class="page-link"
          style="cursor: pointer; user-select: none"
          @click="() => onButtonClick(page)"
          >{{ page }}</a
        >
        <a v-else class="page-link" style="color: grey">...</a>
      </li>
      <li class="page-item">
        <a class="page-link" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import type { Pagination } from "@/models/UserPagination";
import type { PropType } from "vue";

defineProps({
  pagination: {
    type: Object as PropType<Pagination>,
    required: true,
  },
});

const emit = defineEmits<{
  (e: "onButtonClick", page: string | number): Promise<void>;
}>();

const onButtonClick = (page: string | number) => {
  emit("onButtonClick", page);
};
</script>
