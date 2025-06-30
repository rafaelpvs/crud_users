# CRUD Users App

Este projeto é uma aplicação fullstack contendo:

- **Backend:** [Ruby on Rails](https://rubyonrails.org/)
- **Frontend:** [Vite + Vue.js](https://vitejs.dev/)
- **Banco de dados:** [PostgreSQL](https://www.postgresql.org/)
- **Gerenciado por:** [Docker Compose](https://docs.docker.com/compose/)

---

## 🗂 Estrutura de pastas

```
.
├── back/         # Código-fonte do backend (Rails)
├── front/        # Código-fonte do frontend (Vite)
├── postgres-data # Dados persistidos do Postgres (volume local)
├── .env          # Variáveis de ambiente
├── docker-compose.yml
```

---

## 🚀 Como rodar o projeto

### 1. Pré-requisitos

- Docker e Docker Compose instalados

### 2. Configure o arquivo `.env`

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Backend
BACK_PORT=3000 (opcional)
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_HOST=crud_users_db
PRIMARY_DATABASE_NAME=crud_users_development
QUEUE_DATABASE_NAME=crud_users_queue

# SMTP
SMTP_ADDRESS=smtp.example.com
SMTP_PORT=587
SMTP_USER=user@example.com
SMTP_PASS=yourpassword
SMTP_AUTH=plain
SMTP_ENABLE_STARTTLS_AUTO=true

# Frontend
FRONT_PORT=5173 (opcional)
```

### 3. Suba os containers

```bash
docker-compose up --build
```

O Docker Compose criará:

- `crud_users_db`: PostgreSQL rodando na porta `5432`
- `crud_users_api`: Rails na porta `3000` (ou outra, definida em `BACK_PORT`)
- `crud_users_front`: Frontend (Vite) na porta `5173` (ou outra, definida em `FRONT_PORT`)

---

### 4. Acesse os serviços

- Frontend: [http://localhost:5173](http://localhost:5173)
- API: [http://localhost:3000](http://localhost:3000)

---

## 🧼 Comandos úteis

```bash
# Subir containers
docker-compose up --build

# Derrubar containers
docker-compose down

# Rebuild sem cache
docker-compose build --no-cache
```

---

## 📝 Observações

- Use o volume nomeado `node_modules` para evitar conflitos entre dependências do host e do container.
- O Postgres usa volume local para persistência dos dados.

---
