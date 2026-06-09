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

async function main() {
  console.log('Iniciando seed do banco de dados...');

  // Criar tenant padrao
  const tenant = await prisma.tenant.upsert({
    where: { cnpj: '00.000.000/0001-00' },
    update: {},
    create: {
      name: 'Instituicao Padrao',
      cnpj: '00.000.000/0001-00',
      email: 'contato@instituicao.com.br',
      phone: '(11) 99999-9999',
      address: 'Rua Principal, 100',
      city: 'Sao Paulo',
      state: 'SP',
      zipCode: '01000-000',
      isActive: true,
    },
  });

  console.log(`Tenant criado: ${tenant.name} (${tenant.id})`);

  // Criar role de administrador
  const adminRole = await prisma.role.upsert({
    where: { id: 'admin-role-default' },
    update: {},
    create: {
      id: 'admin-role-default',
      tenantId: tenant.id,
      name: 'Administrador',
      description: 'Acesso total ao sistema',
      isActive: true,
    },
  });

  console.log(`Role criada: ${adminRole.name} (${adminRole.id})`);

  // Criar permissoes para todos os modulos
  for (const module of MODULES) {
    for (const action of ACTIONS) {
      await prisma.permission.upsert({
        where: { id: `perm-${module}-${action}` },
        update: {},
        create: {
          id: `perm-${module}-${action}`,
          roleId: adminRole.id,
          module,
          action,
          allowed: true,
        },
      });
    }
  }

  console.log(`Permissoes criadas: ${MODULES.length * ACTIONS.length} permissoes`);

  // Criar usuario admin
  const passwordHash = await bcrypt.hash('Admin@123', 12);

  const adminUser = await prisma.user.upsert({
    where: {
      email_tenantId: {
        email: 'admin@sistema.com',
        tenantId: tenant.id,
      },
    },
    update: {},
    create: {
      tenantId: tenant.id,
      roleId: adminRole.id,
      name: 'Administrador do Sistema',
      email: 'admin@sistema.com',
      passwordHash,
      isActive: true,
    },
  });

  console.log(`Usuario admin criado: ${adminUser.email} (${adminUser.id})`);
  console.log('');
  console.log('===========================================');
  console.log('CREDENCIAIS DO ADMINISTRADOR:');
  console.log('Email: admin@sistema.com');
  console.log('Senha: Admin@123');
  console.log('Tenant ID: ' + tenant.id);
  console.log('-------------------------------------------');
  console.log('IMPORTANTE: Altere a senha imediatamente apos o primeiro login');
  console.log('===========================================');
  console.log('');
  console.log('Seed concluido com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro ao executar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
