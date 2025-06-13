<template>
  <table class="table table-bordered text-center">
    <thead class="table-dark">
      <tr>
        <th scope="col" class="col-1">Nome</th>
        <th scope="col">Idade</th>
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
import { onMounted, reactive, ref } from "vue";
import UserTableRow from "@/pages/list-users/components/UserTableRow.vue";
import type User from "@/models/User";
import UserService from "@/services/UserService";
import UserRepository from "@/repositories/UserRepository";
import { useRouter } from "vue-router";
import { Modal } from "bootstrap";
import AppModal from "@/global/components/AppModal.vue";
const usersReac: User[] = reactive([]);
const userService = new UserService(new UserRepository());
const router = useRouter();
onMounted(async () => {
  const users = await userService.getAll();
  usersReac.push(...users);
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
  const index = usersReac.findIndex((user) => user.id === id);
  if (index !== -1) {
    usersReac.splice(index, 1);
  }
};
const updateUser = async (id: number) => await router.push(`/users/${id}/edit`);
const getNextUserTableRowGeneratedKey = () => {
  const auxKey = userTableRowGeneratedKey;
  userTableRowGeneratedKey++;
  return auxKey;
};
</script>

<style scoped></style>
