# SaaS Educacional - Sistema de Gestao Educacional

Sistema multi-tenant para gestao educacional completa, incluindo cadastros, matriculas, notas, frequencia, diario de classe, estagios, financeiro, requerimentos e atas.

## Stack Tecnologica

- **Backend:** Node.js 22, Express, TypeScript, Prisma ORM
- **Frontend:** Next.js 14, React, TailwindCSS
- **Banco de Dados:** PostgreSQL 16
- **Infraestrutura:** Docker, Docker Compose
- **Seguranca:** Helmet, Rate Limiting, Zod Validation, JWT

## Pre-requisitos

- [Node.js 22+](https://nodejs.org/)
- [Docker](https://docs.docker.com/get-docker/) e [Docker Compose](https://docs.docker.com/compose/install/)
- [PostgreSQL 16+](https://www.postgresql.org/) (para desenvolvimento local sem Docker)

## Inicio Rapido

### Com Docker (Recomendado)

```bash
# Clonar o repositorio
git clone <url-do-repositorio>
cd saas-educacional

# Executar deploy automatizado
chmod +x deploy.sh
./deploy.sh
```

O script ira:
1. Verificar pre-requisitos (Docker, Docker Compose)
2. Criar arquivo `.env` a partir do template
3. Construir imagens Docker
4. Iniciar todos os servicos
5. Executar migrations do banco
6. Executar seed com usuario admin (primeiro deploy)

### Desenvolvimento Local

```bash
# Instalar dependencias
npm install

# Configurar ambiente
cp .env.production.example .env
# Editar .env com suas configuracoes locais

# Gerar Prisma Client
npx prisma generate

# Executar migrations
npx prisma migrate deploy

# Executar seed (criar admin)
npm run prisma:seed

# Iniciar em modo desenvolvimento
npm run dev
```

## Configuracao do Ambiente

Copie o arquivo `.env.production.example` para `.env` e configure:

```bash
cp .env.production.example .env
```

### Variaveis Importantes

| Variavel | Descricao | Exemplo |
|----------|-----------|---------|
| `DATABASE_URL` | URL de conexao PostgreSQL | `postgresql://user:pass@localhost:5432/db` |
| `JWT_SECRET` | Chave secreta JWT (gerar com `openssl rand -base64 64`) | - |
| `JWT_REFRESH_SECRET` | Chave secreta para refresh token | - |
| `CORS_ORIGIN` | Dominios permitidos (separar com virgula) | `https://app.dominio.com` |
| `PORT` | Porta do backend | `3001` |
| `NODE_ENV` | Ambiente de execucao | `production` |

### Gerar Chaves Seguras

```bash
# Gerar JWT_SECRET
openssl rand -base64 64

# Gerar JWT_REFRESH_SECRET
openssl rand -base64 64
```

## Deploy em Producao

### Docker Compose

```bash
# Build e start
docker compose build
docker compose up -d

# Verificar status
docker compose ps

# Ver logs
docker compose logs -f backend

# Executar migrations
docker compose exec backend npx prisma migrate deploy

# Executar seed
docker compose exec backend npx ts-node prisma/seed.ts
```

### Deploy Manual (sem Docker)

```bash
# Instalar dependencias de producao
npm ci --only=production

# Gerar Prisma Client
npx prisma generate

# Compilar TypeScript
npm run build:backend

# Executar migrations
npx prisma migrate deploy

# Iniciar servidor
NODE_ENV=production node dist/backend/server.js
```

### Frontend (Vercel)

O frontend pode ser deployado separadamente na Vercel:

1. Conecte o repositorio na Vercel
2. Configure o root directory como `src/frontend`
3. Configure a variavel de ambiente `NEXT_PUBLIC_API_URL`
4. Deploy automatico a cada push

## Configuracao do Admin

### Criar Usuario Admin (via seed)

```bash
npm run prisma:seed
```

Credenciais padrao:
- **Email:** admin@sistema.com
- **Senha:** Admin@123

### Criar Admin Customizado

```bash
# Com argumentos
npm run create-admin -- admin@empresa.com MinhaS3nha "Nome do Admin"

# Sem argumentos (usa padroes)
npm run create-admin
```

## Importacao de Dados via CSV

### Formato dos Arquivos CSV

**Alunos (students):**
```csv
name,email,phone,cpf,registration
"Joao Silva","joao@email.com","11999999999","12345678901","2024001"
```

**Cursos (courses):**
```csv
name,code,description,duration,modality
"Administracao","ADM","Curso de Administracao",8,"Presencial"
```

**Professores (teachers):**
```csv
name,email,phone,cpf,specialization
"Maria Santos","maria@email.com","11999999999","12345678901","Mestrado em Educacao"
```

### Executar Importacao

```bash
# Importar alunos
npm run import-csv -- --type students --file ./dados/alunos.csv

# Importar cursos
npm run import-csv -- --type courses --file ./dados/cursos.csv

# Importar professores
npm run import-csv -- --type teachers --file ./dados/professores.csv

# Especificar tenant
npm run import-csv -- --type students --file ./dados/alunos.csv --tenant <tenant-id>
```

## Backup e Restauracao

### Backup

```bash
# Executar backup (salva em ./backups/)
npm run db:backup

# Ou diretamente
bash scripts/backup.sh
```

Os backups sao salvos em `./backups/` com timestamp no nome. Backups com mais de 30 dias sao removidos automaticamente.

### Restauracao

```bash
# Restaurar backup
gunzip -c ./backups/backup_20240101_120000.sql.gz | psql $DATABASE_URL

# Ou sem compressao
psql $DATABASE_URL < ./backups/backup_20240101_120000.sql
```

## Endpoints da API

Base URL: `http://localhost:3001/api`

### Autenticacao
| Metodo | Rota | Descricao |
|--------|------|-----------|
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/refresh` | Renovar token |
| POST | `/api/auth/logout` | Logout |

### Cadastros
| Metodo | Rota | Descricao |
|--------|------|-----------|
| GET | `/api/cadastros/alunos` | Listar alunos |
| POST | `/api/cadastros/alunos` | Criar aluno |
| GET | `/api/cadastros/alunos/:id` | Buscar aluno |
| PUT | `/api/cadastros/alunos/:id` | Atualizar aluno |
| DELETE | `/api/cadastros/alunos/:id` | Remover aluno |
| GET | `/api/cadastros/cursos` | Listar cursos |
| POST | `/api/cadastros/cursos` | Criar curso |
| GET | `/api/cadastros/turmas` | Listar turmas |
| POST | `/api/cadastros/turmas` | Criar turma |
| GET | `/api/cadastros/disciplinas` | Listar disciplinas |
| GET | `/api/cadastros/professores` | Listar professores |

### Matriculas
| Metodo | Rota | Descricao |
|--------|------|-----------|
| GET | `/api/matriculas` | Listar matriculas |
| POST | `/api/matriculas` | Criar matricula |
| GET | `/api/matriculas/:id` | Buscar matricula |
| PUT | `/api/matriculas/:id` | Atualizar matricula |
| DELETE | `/api/matriculas/:id` | Cancelar matricula |

### Notas
| Metodo | Rota | Descricao |
|--------|------|-----------|
| GET | `/api/notas` | Listar notas |
| POST | `/api/notas` | Lancar nota |
| PUT | `/api/notas/:id` | Atualizar nota |

### Diario de Classe
| Metodo | Rota | Descricao |
|--------|------|-----------|
| GET | `/api/diario` | Listar registros |
| POST | `/api/diario` | Criar registro |
| PUT | `/api/diario/:id` | Atualizar registro |

### Estagios
| Metodo | Rota | Descricao |
|--------|------|-----------|
| GET | `/api/estagios` | Listar estagios |
| POST | `/api/estagios` | Criar estagio |
| PUT | `/api/estagios/:id` | Atualizar estagio |

### Financeiro
| Metodo | Rota | Descricao |
|--------|------|-----------|
| GET | `/api/financeiro/contas` | Listar contas |
| POST | `/api/financeiro/contas` | Criar conta |
| GET | `/api/financeiro/pagamentos` | Listar pagamentos |
| POST | `/api/financeiro/pagamentos` | Registrar pagamento |

### Requerimentos
| Metodo | Rota | Descricao |
|--------|------|-----------|
| GET | `/api/requerimentos` | Listar requerimentos |
| POST | `/api/requerimentos` | Criar requerimento |
| PUT | `/api/requerimentos/:id` | Atualizar requerimento |

### Atas
| Metodo | Rota | Descricao |
|--------|------|-----------|
| GET | `/api/atas` | Listar atas |
| POST | `/api/atas` | Criar ata |
| PUT | `/api/atas/:id` | Atualizar ata |

### Health Check
| Metodo | Rota | Descricao |
|--------|------|-----------|
| GET | `/api/health` | Verificar status do servico |

## Estrutura do Projeto

```
saas-educacional/
├── prisma/
│   ├── schema.prisma          # Schema do banco de dados
│   ├── seed.ts                # Dados iniciais
│   └── migrations/            # Migrations SQL
├── src/
│   ├── backend/
│   │   ├── server.ts          # Servidor Express
│   │   ├── config/            # Configuracoes
│   │   ├── controllers/       # Controllers
│   │   ├── middleware/        # Middlewares (auth, audit, security)
│   │   ├── routes/            # Rotas
│   │   ├── services/          # Servicos (Prisma queries)
│   │   ├── utils/             # Utilitarios
│   │   └── validators/        # Schemas de validacao (Zod)
│   └── frontend/              # Next.js 14 App
├── scripts/
│   ├── create-admin.ts        # Criar usuario admin
│   ├── import-csv.ts          # Importar dados CSV
│   └── backup.sh              # Backup do banco
├── tests/                     # Testes Jest
├── Dockerfile                 # Build do backend
├── docker-compose.yml         # Orquestracao de servicos
├── deploy.sh                  # Script de deploy automatizado
└── package.json
```

## Seguranca

O sistema implementa:

- **Helmet:** Headers HTTP de seguranca
- **Rate Limiting:** 100 req/15min (geral), 5 req/15min (auth)
- **Validacao:** Zod schemas para todas as entradas
- **JWT:** Tokens de acesso (15min) e refresh (7 dias)
- **Multi-tenant:** Isolamento de dados por tenant
- **Audit Log:** Registro de todas as acoes

## Licenca

Proprietary - Todos os direitos reservados.
