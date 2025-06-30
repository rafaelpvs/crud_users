#!/bin/bash

echo "⚠️  Isso irá remover TODOS os containers, imagens, volumes e networks do Docker!"
read -p "Deseja continuar? (s/n): " confirm

if [[ "$confirm" != "s" ]]; then
  echo "❌ Operação cancelada."
  exit 1
fi

echo "🧹 Parando todos os containers..."
docker stop $(docker ps -aq) 2>/dev/null

echo "🗑️  Removendo todos os containers..."
docker rm -f $(docker ps -aq) 2>/dev/null

echo "🗑️  Removendo todas as imagens..."
docker rmi -f $(docker images -q) 2>/dev/null

echo "🗑️  Removendo todos os volumes..."
docker volume rm $(docker volume ls -q) 2>/dev/null

echo "🗑️  Removendo todas as networks não padrão..."
docker network rm $(docker network ls | grep -v "bridge\|host\|none" | awk '{print $1}') 2>/dev/null

echo "✅ Limpeza completa!"
