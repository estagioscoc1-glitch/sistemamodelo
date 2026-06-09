import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

type ImportType = 'students' | 'courses' | 'teachers';

function parseCSV(content: string): Record<string, string>[] {
  const lines = content.trim().split('\n');
  if (lines.length < 2) {
    throw new Error('Arquivo CSV deve ter pelo menos cabecalho e uma linha de dados');
  }

  const headers = lines[0].split(',').map((h) => h.trim().replace(/"/g, ''));
  const records: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map((v) => v.trim().replace(/"/g, ''));
    const record: Record<string, string> = {};
    headers.forEach((header, index) => {
      record[header] = values[index] || '';
    });
    records.push(record);
  }

  return records;
}

async function importStudents(records: Record<string, string>[], tenantId: string) {
  let created = 0;
  for (const record of records) {
    await prisma.student.create({
      data: {
        tenantId,
        name: record.name || record.nome,
        email: record.email || null,
        phone: record.phone || record.telefone || null,
        cpf: record.cpf || null,
        rg: record.rg || null,
        registration: record.registration || record.matricula || null,
        city: record.city || record.cidade || null,
        state: record.state || record.estado || null,
        isActive: true,
      },
    });
    created++;
  }
  return created;
}

async function importCourses(records: Record<string, string>[], tenantId: string) {
  let created = 0;
  for (const record of records) {
    await prisma.course.create({
      data: {
        tenantId,
        name: record.name || record.nome,
        code: record.code || record.codigo || null,
        description: record.description || record.descricao || null,
        duration: record.duration ? parseInt(record.duration) : null,
        modality: record.modality || record.modalidade || null,
        isActive: true,
      },
    });
    created++;
  }
  return created;
}

async function importTeachers(records: Record<string, string>[], tenantId: string) {
  let created = 0;
  for (const record of records) {
    await prisma.teacher.create({
      data: {
        tenantId,
        name: record.name || record.nome,
        email: record.email || null,
        phone: record.phone || record.telefone || null,
        cpf: record.cpf || null,
        registration: record.registration || record.registro || null,
        specialization: record.specialization || record.especializacao || null,
        isActive: true,
      },
    });
    created++;
  }
  return created;
}

async function main() {
  const args = process.argv.slice(2);
  let type: ImportType | undefined;
  let filePath: string | undefined;
  let tenantId: string | undefined;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--type' && args[i + 1]) {
      type = args[i + 1] as ImportType;
      i++;
    } else if (args[i] === '--file' && args[i + 1]) {
      filePath = args[i + 1];
      i++;
    } else if (args[i] === '--tenant' && args[i + 1]) {
      tenantId = args[i + 1];
      i++;
    }
  }

  if (!type || !filePath) {
    console.log('Uso: ts-node scripts/import-csv.ts --type <students|courses|teachers> --file <caminho.csv> [--tenant <id>]');
    console.log('');
    console.log('Tipos suportados:');
    console.log('  students  - Importar alunos (colunas: name/nome, email, phone/telefone, cpf, rg, registration/matricula)');
    console.log('  courses   - Importar cursos (colunas: name/nome, code/codigo, description/descricao, duration, modality/modalidade)');
    console.log('  teachers  - Importar professores (colunas: name/nome, email, phone/telefone, cpf, registration/registro, specialization/especializacao)');
    process.exit(1);
  }

  if (!['students', 'courses', 'teachers'].includes(type)) {
    console.error(`Tipo invalido: ${type}. Use: students, courses, teachers`);
    process.exit(1);
  }

  const resolvedPath = path.resolve(filePath);
  if (!fs.existsSync(resolvedPath)) {
    console.error(`Arquivo nao encontrado: ${resolvedPath}`);
    process.exit(1);
  }

  // Buscar tenant
  if (!tenantId) {
    const tenant = await prisma.tenant.findFirst({ where: { isActive: true } });
    if (!tenant) {
      console.error('Nenhum tenant encontrado. Execute o seed primeiro.');
      process.exit(1);
    }
    tenantId = tenant.id;
  }

  const content = fs.readFileSync(resolvedPath, 'utf-8');
  const records = parseCSV(content);

  console.log(`Importando ${records.length} registros do tipo "${type}"...`);

  let count = 0;
  switch (type) {
    case 'students':
      count = await importStudents(records, tenantId);
      break;
    case 'courses':
      count = await importCourses(records, tenantId);
      break;
    case 'teachers':
      count = await importTeachers(records, tenantId);
      break;
  }

  console.log(`Importacao concluida: ${count} registros importados.`);
}

main()
  .catch((e) => {
    console.error('Erro na importacao:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
