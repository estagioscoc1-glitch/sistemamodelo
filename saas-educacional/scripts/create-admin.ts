import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const MODULES = [
  'cadastros',
  'matriculas',
  'notas',
  'diario',
  'estagios',
  'financeiro',
  'requerimentos',
  'atas',
  'auth',
];

const ACTIONS = ['create', 'read', 'update', 'delete'];

async function createAdmin() {
  const args = process.argv.slice(2);

  const email = args[0] || 'admin@sistema.com';
  const password = args[1] || 'Admin@123';
  const name = args[2] || 'Administrador';

  console.log(`Criando usuario administrador...`);
  console.log(`Email: ${email}`);
  console.log(`Nome: ${name}`);

  // Buscar primeiro tenant disponivel
  let tenant = await prisma.tenant.findFirst({ where: { isActive: true } });

  if (!tenant) {
    tenant = await prisma.tenant.create({
      data: {
        name: 'Instituicao Padrao',
        cnpj: '00.000.000/0001-00',
        email: 'contato@instituicao.com.br',
        isActive: true,
      },
    });
    console.log(`Tenant criado: ${tenant.name}`);
  }

  // Buscar ou criar role admin
  let adminRole = await prisma.role.findFirst({
    where: { tenantId: tenant.id, name: 'Administrador' },
  });

  if (!adminRole) {
    adminRole = await prisma.role.create({
      data: {
        tenantId: tenant.id,
        name: 'Administrador',
        description: 'Acesso total ao sistema',
        isActive: true,
      },
    });

    // Criar permissoes
    for (const module of MODULES) {
      for (const action of ACTIONS) {
        await prisma.permission.create({
          data: {
            roleId: adminRole.id,
            module,
            action,
            allowed: true,
          },
        });
      }
    }
    console.log(`Role admin criada com permissoes completas`);
  }

  // Hash da senha
  const passwordHash = await bcrypt.hash(password, 12);

  // Criar ou atualizar usuario
  const user = await prisma.user.upsert({
    where: {
      email_tenantId: {
        email,
        tenantId: tenant.id,
      },
    },
    update: {
      name,
      passwordHash,
      roleId: adminRole.id,
      isActive: true,
    },
    create: {
      tenantId: tenant.id,
      roleId: adminRole.id,
      name,
      email,
      passwordHash,
      isActive: true,
    },
  });

  console.log('');
  console.log('===========================================');
  console.log('ADMINISTRADOR CRIADO COM SUCESSO');
  console.log(`ID: ${user.id}`);
  console.log(`Email: ${email}`);
  console.log(`Senha: ${password}`);
  console.log(`Tenant: ${tenant.name} (${tenant.id})`);
  console.log('-------------------------------------------');
  console.log('IMPORTANTE: Altere a senha imediatamente apos o primeiro login');
  console.log('===========================================');
}

createAdmin()
  .catch((e) => {
    console.error('Erro ao criar administrador:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
