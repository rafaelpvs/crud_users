<template>
  <div class="container">
    <h2>Formulário de Cadastro</h2>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="firstName" class="form-label">Nome</label>
        <input
          type="text"
          class="form-control"
          id="firstName"
          v-model="user.first_name"
          required
        />
      </div>
      <div class="mb-3">
        <label for="lastName" class="form-label">Sobrenome</label>
        <input
          type="text"
          class="form-control"
          id="lastName"
          v-model="user.last_name"
          required
        />
      </div>
      <div class="mb-3">
        <label for="birthDate" class="form-label">Data de Nascimento</label>
        <input
          type="date"
          class="form-control"
          id="birthDate"
          v-model="user.birth_date"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Enviar</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import type User from "@/models/User";
import UserRepository from "@/repositories/UserRepository";
import UserService from "@/services/UserService";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();
let userId: number | null = null;
if (typeof route.params.id === "string") userId = parseInt(route.params.id);
const userService = new UserService(new UserRepository());

let user = ref<User>({
  first_name: "",
  last_name: "",
  birth_date: "",
});

onMounted(async () => {
  user.value = await userService.get(userId!);
});
const handleSubmit = async () => {
  await userService.update(user.value);
  router.push("/");
};
</script>
