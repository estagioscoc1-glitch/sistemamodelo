'use client';

import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DataTable, type Column } from '@/components/shared/DataTable';

interface Aluno {
  id: string;
  nome: string;
  matricula: string;
  cpf: string;
  email: string;
  curso: string;
  status: string;
  [key: string]: unknown;
}

const mockAlunos: Aluno[] = [
  { id: '1', nome: 'Ana Silva Santos', matricula: '2024001', cpf: '123.456.789-00', email: 'ana@email.com', curso: 'Administracao', status: 'Ativo' },
  { id: '2', nome: 'Joao Pedro Oliveira', matricula: '2024002', cpf: '234.567.890-11', email: 'joao@email.com', curso: 'Sistemas de Informacao', status: 'Ativo' },
  { id: '3', nome: 'Maria Fernandes Costa', matricula: '2024003', cpf: '345.678.901-22', email: 'maria@email.com', curso: 'Enfermagem', status: 'Ativo' },
  { id: '4', nome: 'Carlos Eduardo Lima', matricula: '2023015', cpf: '456.789.012-33', email: 'carlos@email.com', curso: 'Direito', status: 'Trancado' },
  { id: '5', nome: 'Juliana Almeida', matricula: '2023020', cpf: '567.890.123-44', email: 'juliana@email.com', curso: 'Pedagogia', status: 'Ativo' },
];

const columns: Column<Aluno>[] = [
  { key: 'matricula', header: 'Matricula', sortable: true },
  { key: 'nome', header: 'Nome', sortable: true },
  { key: 'cpf', header: 'CPF' },
  { key: 'curso', header: 'Curso', sortable: true },
  {
    key: 'status',
    header: 'Status',
    render: (item) => (
      <Badge variant={item.status === 'Ativo' ? 'success' : item.status === 'Trancado' ? 'warning' : 'secondary'}>
        {item.status}
      </Badge>
    ),
  },
];

export default function AlunosPage() {
  return (
    <div>
      <PageHeader
        title="Alunos"
        description="Gerenciamento de alunos"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Cadastros', href: '/cadastros' },
          { label: 'Alunos' },
        ]}
        actions={
          <a href="/cadastros/alunos/novo">
            <Button>Novo Aluno</Button>
          </a>
        }
      />

      <DataTable
        data={mockAlunos}
        columns={columns}
        searchKey="nome"
        searchPlaceholder="Buscar alunos..."
        onRowClick={(item) => {
          window.location.href = `/cadastros/alunos/${item.id}`;
        }}
        actions={(item) => (
          <a href={`/cadastros/alunos/${item.id}`}>
            <Button variant="ghost" size="sm">Editar</Button>
          </a>
        )}
      />
    </div>
  );
}
