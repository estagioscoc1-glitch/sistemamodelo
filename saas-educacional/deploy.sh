#!/bin/bash
# ===========================================
# Script de Deploy - SaaS Educacional
# ===========================================

set -e

echo "==========================================="
echo " Deploy - SaaS Educacional"
echo "==========================================="
echo ""

# Verificar pre-requisitos
echo "[1/7] Verificando pre-requisitos..."

if ! command -v docker &> /dev/null; then
  echo "Erro: Docker nao encontrado. Instale em: https://docs.docker.com/get-docker/"
  exit 1
fi

if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
  echo "Erro: Docker Compose nao encontrado."
  exit 1
fi

# Determinar comando do compose
COMPOSE_CMD="docker compose"
if ! docker compose version &> /dev/null 2>&1; then
  COMPOSE_CMD="docker-compose"
fi

echo "  Docker: $(docker --version)"
echo "  Docker Compose: $($COMPOSE_CMD version 2>/dev/null || echo 'instalado')"
echo ""

# Configurar ambiente
echo "[2/7] Configurando ambiente..."

if [ ! -f .env ]; then
  if [ -f .env.production.example ]; then
    cp .env.production.example .env
    echo "  Arquivo .env criado a partir de .env.production.example"
    echo "  IMPORTANTE: Edite o arquivo .env com suas configuracoes antes de continuar!"
    echo ""
    read -p "Pressione ENTER apos configurar o .env ou Ctrl+C para cancelar..." </dev/tty 2>/dev/null || true
  else
    echo "Erro: Arquivo .env nao encontrado e nenhum template disponivel."
    exit 1
  fi
else
  echo "  Arquivo .env encontrado"
fi

echo ""

# Build das imagens
echo "[3/7] Construindo imagens Docker..."
$COMPOSE_CMD build
echo ""

# Parar servicos existentes
echo "[4/7] Parando servicos existentes..."
$COMPOSE_CMD down 2>/dev/null || true
echo ""

# Iniciar servicos
echo "[5/7] Iniciando servicos..."
$COMPOSE_CMD up -d
echo ""

# Aguardar PostgreSQL
echo "[6/7] Aguardando banco de dados..."
RETRIES=30
until $COMPOSE_CMD exec -T postgres pg_isready -U saas_edu 2>/dev/null || [ $RETRIES -eq 0 ]; do
  echo "  Aguardando PostgreSQL... ($RETRIES tentativas restantes)"
  RETRIES=$((RETRIES - 1))
  sleep 2
done

if [ $RETRIES -eq 0 ]; then
  echo "Erro: PostgreSQL nao iniciou a tempo."
  $COMPOSE_CMD logs postgres
  exit 1
fi

echo "  PostgreSQL pronto!"
echo ""

# Executar migrations e seed
echo "[7/7] Executando migrations..."
$COMPOSE_CMD exec -T backend npx prisma migrate deploy

# Verificar se e primeiro deploy (sem usuarios)
USER_COUNT=$($COMPOSE_CMD exec -T postgres psql -U saas_edu -d saas_educacional -t -c "SELECT COUNT(*) FROM users;" 2>/dev/null | tr -d ' ' || echo "0")

if [ "$USER_COUNT" = "0" ] || [ "$USER_COUNT" = "" ]; then
  echo ""
  echo "Primeiro deploy detectado. Executando seed..."
  $COMPOSE_CMD exec -T backend npx ts-node prisma/seed.ts
fi

echo ""
echo "==========================================="
echo " Deploy concluido com sucesso!"
echo "==========================================="
echo ""
echo "Servicos:"
echo "  Backend:  http://localhost:${PORT:-3001}"
echo "  Frontend: http://localhost:3000"
echo ""
echo "Comandos uteis:"
echo "  Logs:     $COMPOSE_CMD logs -f"
echo "  Parar:    $COMPOSE_CMD down"
echo "  Status:   $COMPOSE_CMD ps"
echo ""
