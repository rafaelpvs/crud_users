<template>
  <div class="d-flex">
    <nav class="sidebar d-flex flex-column p-3">
      <h4 class="mb-4">Menu</h4>
      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
          <router-link to="/" class="nav-link"> Listar usuários </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/users/new" class="nav-link">
            Criar usuário
          </router-link>
        </li>
      </ul>
    </nav>
    <main class="flex-fill p-5">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
body {
  min-height: 100vh;
  background: #f8f9fa;
}
.sidebar {
  min-width: 220px;
  max-width: 220px;
  min-height: 100vh;
  background: #343a40;
  color: #fff;
}
.sidebar .nav-link {
  color: #fff;
  cursor: pointer;
}
.sidebar .nav-link.router-link-exact-active {
  background: #495057;
}
.sidebar .nav-link:hover {
  background: #3b4149;
  color: #fff;
}
</style>
