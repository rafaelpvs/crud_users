<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-end">
      <li class="page-item">
        <a
          v-if="pagination.prev"
          class="page-link"
          style="cursor: pointer; user-select: none"
          @click="() => onButtonClick(pagination.prev!)"
          aria-label="Previous"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
        <a v-else class="page-link" style="color: grey">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        v-for="(page, index) in pagination.series"
        :key="index"
        :class="{ 'page-item': true, active: pagination.page == page }"
      >
        <a
          v-if="page !== 'gap' && page !== pagination.page"
          class="page-link"
          style="cursor: pointer; user-select: none"
          @click="() => onButtonClick(page as number)"
          >{{ page }}</a
        >
        <a v-else class="page-link" style="color: grey">...</a>
      </li>
      <li class="page-item">
        <a
          v-if="pagination.next"
          class="page-link"
          style="cursor: pointer; user-select: none"
          @click="() => onButtonClick(pagination.next!)"
          aria-label="Next"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
        <a v-else class="page-link" style="color: grey">
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
  (e: "onButtonClick", page: number): Promise<void>;
}>();

const onButtonClick = (page: number) => {
  emit("onButtonClick", page);
};
</script>
