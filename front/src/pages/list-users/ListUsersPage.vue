<template>
  <PaginationComands
    :pagination="paginationMetaData"
    @on-button-click="goToPage"
  />
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
import { UserRepository } from "@/repositories/UserRepository";
import { useRoute, useRouter } from "vue-router";
import { Modal } from "bootstrap";
import AppModal from "@/global/components/AppModal.vue";
import toastr from "toastr";
import type { Pagination } from "@/models/UserPagination";
import PaginationComands from "@/global/components/PaginationComands.vue";
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
  series: [],
});
onMounted(async () => {
  const page = Number(route.query.page) || 1;
  reload(page);
});
let userTableRowGeneratedKey = 0;

let selectedUser = ref<User | null>(null);
const onRemoveUserClick = async (user: User) => {
  selectedUser.value = user;
  const modal = new Modal("#exampleModal");
  modal.show();
};

const removeUser = async (id: number) => {
  await userService.remove(id);
  reload(Number(route.query.page) || 1);
  toastr.success(`Usuario removido com sucesso!`, undefined, {
    positionClass: "toast-bottom-right",
  });
};
const updateUser = async (id: number) => await router.push(`/users/${id}/edit`);
const changeActiveUser = async (id: number, active: boolean) => {
  await userService.changeActive(id, active);
  const action = active ? "ativado" : "desativado";
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
  async (newPage) => {
    await reload(Number(newPage) || 1);
  }
);

const reload = async (page: number) => {
  // const page = Number(newPage) || 1;

  const pagination = await userService.getAll({
    page: { number: page, size: 20 },
  });
  usersReac.splice(0, usersReac.length);
  usersReac.push(...pagination.users);
  paginationMetaData.value = pagination.pagination;
};

function goToPage(page: number | string) {
  router.push({ query: { ...route.query, page } });
}
</script>

<style scoped></style>
