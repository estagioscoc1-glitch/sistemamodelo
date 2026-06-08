'use client';

import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DataTable, type Column } from '@/components/shared/DataTable';

interface Curso {
  id: string;
  nome: string;
  codigo: string;
  duracao: string;
  modalidade: string;
  status: string;
  [key: string]: unknown;
}

const mockCursos: Curso[] = [
  { id: '1', nome: 'Administracao', codigo: 'ADM001', duracao: '4 anos', modalidade: 'Presencial', status: 'Ativo' },
  { id: '2', nome: 'Enfermagem', codigo: 'ENF001', duracao: '5 anos', modalidade: 'Presencial', status: 'Ativo' },
  { id: '3', nome: 'Sistemas de Informacao', codigo: 'SI001', duracao: '4 anos', modalidade: 'Hibrido', status: 'Ativo' },
  { id: '4', nome: 'Direito', codigo: 'DIR001', duracao: '5 anos', modalidade: 'Presencial', status: 'Ativo' },
  { id: '5', nome: 'Pedagogia', codigo: 'PED001', duracao: '4 anos', modalidade: 'EAD', status: 'Inativo' },
];

const columns: Column<Curso>[] = [
  { key: 'codigo', header: 'Codigo', sortable: true },
  { key: 'nome', header: 'Nome do Curso', sortable: true },
  { key: 'duracao', header: 'Duracao' },
  { key: 'modalidade', header: 'Modalidade' },
  {
    key: 'status',
    header: 'Status',
    render: (item) => (
      <Badge variant={item.status === 'Ativo' ? 'success' : 'secondary'}>{item.status}</Badge>
    ),
  },
];

export default function CursosPage() {
  return (
    <div>
      <PageHeader
        title="Cursos"
        description="Gerenciamento de cursos"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Cadastros', href: '/cadastros' },
          { label: 'Cursos' },
        ]}
        actions={
          <a href="/cadastros/cursos/novo">
            <Button>Novo Curso</Button>
          </a>
        }
      />

      <DataTable
        data={mockCursos}
        columns={columns}
        searchKey="nome"
        searchPlaceholder="Buscar cursos..."
        onRowClick={(item) => {
          window.location.href = `/cadastros/cursos/${item.id}`;
        }}
        actions={(item) => (
          <div className="flex gap-2">
            <a href={`/cadastros/cursos/${item.id}`}>
              <Button variant="ghost" size="sm">Editar</Button>
            </a>
          </div>
        )}
      />
    </div>
  );
}
