#!/bin/bash
set -e
rm -f tmp/pids/server.pid
echo "Aguardando o banco de dados ficar pronto..."

until pg_isready -h "$DATABASE_HOST" -p 5432 -U "$DATABASE_USERNAME"; do
  sleep 1
done

echo "Banco de dados pronto. Rodando migrations..."

bundle exec rails db:prepare

exec "$@"