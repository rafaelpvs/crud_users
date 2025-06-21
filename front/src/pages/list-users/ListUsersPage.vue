<template>
  <UserFilters
    :filters-prop="filters"
    class="mb-5"
    @search="searchFilter"
    @on-update-filters="updateFilters"
  />
  <div class="d-flex justify-content-between align-items-center">
    <div class="d-flex justify-content-start align-items-center">
      <PaginationComands
        :pagination="paginationMetaData"
        @on-button-click="goToPage"
      />
      <span class="badge bg-primary ms-5">{{ paginationMetaData.count }} users</span>
    </div>
    <button
      type="button"
      class="justify-content-start btn btn-primary btn-sm"
      @click="exportUsers"
    >
      Exportar
    </button>
  </div>
  <div id="table-data" style="position: relative">
    <div
      v-if="isLoading"
      class="loading-overlay d-flex justify-content-center align-items-center"
    >
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Carregando...</span>
      </div>
    </div>
    <table class="table table-bordered text-center">
      <thead class="table-dark">
        <tr>
          <th scope="col" class="col-1">Nome</th>
          <th scope="col">Idade</th>
          <th scope="col">Ativo</th>
          <th scope="col">Criado em</th>
          <th scope="col">Atualizado em</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>
        <UserTableRow
          v-for="user in usersReac"
          :key="user.id || getNextUserTableRowGeneratedKey()"
          :user="user"
          @onRemoveUserClick="onRemoveUserClick"
          @onUpdateUserClick="updateUser"
          @on-active-user-change="changeActiveUser"
        />
      </tbody>
    </table>
  </div>
  <AppModal modal-id="exampleModal">
    <template #modal-body>
      <p class="text-center">
        Deseja remover
        <strong>
          {{ `${selectedUser?.first_name} ${selectedUser?.last_name}` }}
        </strong>
        ?
      </p>
    </template>
    <template #modal-buttons>
      <button
        type="button"
        class="btn btn-danger btn-sm"
        data-bs-dismiss="modal"
        @click="() => removeUser(selectedUser?.id!)"
      >
        Confirmar
      </button>
    </template>
  </AppModal>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import UserTableRow from "@/pages/list-users/components/UserTableRow.vue";
import type User from "@/models/User";
import UserService from "@/services/UserService";
import { UserRepository, type Filters } from "@/repositories/UserRepository";
import { useRoute, useRouter, type LocationQueryRaw } from "vue-router";
import { Modal } from "bootstrap";
import AppModal from "@/global/components/AppModal.vue";
import toastr from "toastr";
import type { Pagination } from "@/models/UserPagination";
import PaginationComands from "@/global/components/PaginationComands.vue";
import UserFilters from "./components/UserFilters.vue";
const usersReac: User[] = reactive([]);
const userService = new UserService(new UserRepository());
const router = useRouter();
const route = useRoute();
const paginationMetaData = ref<Pagination>({
  count_args: [],
  ends: true,
  limit: 0,
  outset: 0,
  page: 0,
  page_param: "page",
  size: 0,
  items: 0,
  count: 0,
  pages: 0,
  next: 0,
  prev: 0,
  series: [],
});

let currentPage: number = 1;

const isLoading = ref<boolean>(false);
onMounted(async () => {
  currentPage = parsePageFromRouteQuery();

  await reload();
});
let userTableRowGeneratedKey = 0;
const parsePageFromRouteQuery = (): number => {
  return Number(route.query.page) || 1;
};
const parseFiltersFromRouteQuery = (): Filters => {
  const {
    full_name_cont,
    birth_date_eq,
    created_at_date_eq,
    updated_at_date_eq,
    active_eq,
  } = route.query;
  return {
    full_name_cont: full_name_cont as string,
    birth_date_eq: birth_date_eq as string,
    created_at_date_eq: created_at_date_eq as string,
    updated_at_date_eq: updated_at_date_eq as string,
    active_eq: active_eq === "false" ? false : true,
  };
};
let selectedUser = ref<User | null>(null);
const onRemoveUserClick = async (user: User) => {
  selectedUser.value = user;
  const modal = new Modal("#exampleModal");
  modal.show();
};
let filters: Filters = parseFiltersFromRouteQuery();
const removeUser = async (id: number) => {
  await userService.remove(id);
  reload();
  toastr.success(`Usuario removido com sucesso!`, undefined, {
    positionClass: "toast-bottom-right",
  });
};
const updateUser = async (id: number) => await router.push(`/users/${id}/edit`);
const changeActiveUser = async (id: number, active: boolean) => {
  await userService.changeActive(id, active);
  const action = active ? "ativado" : "desativado";
  await reload();
  toastr.success(`Usuario ${action} com sucesso!`, undefined, {
    positionClass: "toast-bottom-right",
  });
};
const getNextUserTableRowGeneratedKey = () => {
  const auxKey = userTableRowGeneratedKey;
  userTableRowGeneratedKey++;
  return auxKey;
};

watch(
  () => route.query.page,
  async (_) => {
    await reload();
  }
);

const reload = async () => {
  isLoading.value = true;
  const pagination = await userService.getAll({
    page: currentPage,
    q: filters,
  });

  usersReac.splice(0, usersReac.length);
  usersReac.push(...pagination.users);
  paginationMetaData.value = pagination.pagination;
  isLoading.value = false;
};

function goToPage(page: number) {
  currentPage = page;
  router.push({ query: { page, ...parseQueryParams(page) } });
}

const searchFilter = async () => {
  goToPage(1);
  await reload();
};

const exportUsers = async () => {
  const response = await userService.export(filters);
  toastr.success(response.data.message);
};

const updateFilters = (newFilters: Filters) => {
  filters = newFilters;
};

const parseQueryParams = (page: number): LocationQueryRaw => {
  return {
    page,
    full_name_cont: filters.full_name_cont,
    birth_date_eq: filters.birth_date_eq,
    created_at_date_eq: filters.created_at_date_eq,
    updated_at_date_eq: filters.updated_at_date_eq,
    active_eq: filters.active_eq?.toString(),
  };
};
</script>

<style scoped>
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.7);
  z-index: 10;
}
</style>
