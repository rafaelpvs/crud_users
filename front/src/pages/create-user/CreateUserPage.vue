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
import { useRouter } from "vue-router";
const router = useRouter();
const userService = new UserService(new UserRepository());
const user: User = {
  id: null,
  first_name: "",
  last_name: "",
  birth_date: "1996-07-22",
};

const handleSubmit = async () => {
  await userService.create(user);
  router.push("/");
};
</script>
