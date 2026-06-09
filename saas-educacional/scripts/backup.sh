#!/bin/bash
# ===========================================
# Script de Backup do Banco de Dados
# ===========================================

set -e

# Carregar .env se existir
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

# Verificar DATABASE_URL
if [ -z "$DATABASE_URL" ]; then
  echo "Erro: DATABASE_URL nao definida"
  echo "Configure a variavel DATABASE_URL no arquivo .env ou exporte-a manualmente"
  exit 1
fi

# Criar diretorio de backups
BACKUP_DIR="./backups"
mkdir -p "$BACKUP_DIR"

# Nome do arquivo com timestamp
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="${BACKUP_DIR}/backup_${TIMESTAMP}.sql"

echo "===========================================
 Backup do Banco de Dados
==========================================="
echo "Data: $(date)"
echo "Arquivo: ${BACKUP_FILE}"
echo ""

# Executar pg_dump
echo "Executando backup..."
pg_dump "$DATABASE_URL" --no-owner --no-acl > "$BACKUP_FILE"

# Comprimir
if command -v gzip &> /dev/null; then
  gzip "$BACKUP_FILE"
  BACKUP_FILE="${BACKUP_FILE}.gz"
  echo "Backup comprimido: ${BACKUP_FILE}"
fi

# Informar tamanho
FILE_SIZE=$(ls -lh "$BACKUP_FILE" | awk '{print $5}')
echo "Tamanho: ${FILE_SIZE}"

# Limpar backups antigos (manter ultimos 30 dias)
echo ""
echo "Limpando backups com mais de 30 dias..."
find "$BACKUP_DIR" -name "backup_*.sql*" -mtime +30 -delete 2>/dev/null || true

echo ""
echo "Backup concluido com sucesso!"
