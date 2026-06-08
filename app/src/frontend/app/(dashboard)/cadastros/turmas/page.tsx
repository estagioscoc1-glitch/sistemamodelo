'use client';

import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DataTable, type Column } from '@/components/shared/DataTable';

interface Turma {
  id: string;
  nome: string;
  curso: string;
  periodo: string;
  turno: string;
  vagas: number;
  alunos: number;
  status: string;
  [key: string]: unknown;
}

const mockTurmas: Turma[] = [
  { id: '1', nome: 'ADM-2024-1A', curso: 'Administracao', periodo: '2024.1', turno: 'Matutino', vagas: 40, alunos: 38, status: 'Ativa' },
  { id: '2', nome: 'ADM-2024-1B', curso: 'Administracao', periodo: '2024.1', turno: 'Noturno', vagas: 40, alunos: 35, status: 'Ativa' },
  { id: '3', nome: 'ENF-2024-1A', curso: 'Enfermagem', periodo: '2024.1', turno: 'Integral', vagas: 30, alunos: 30, status: 'Ativa' },
  { id: '4', nome: 'SI-2024-1A', curso: 'Sistemas de Informacao', periodo: '2024.1', turno: 'Noturno', vagas: 45, alunos: 42, status: 'Ativa' },
  { id: '5', nome: 'DIR-2023-2A', curso: 'Direito', periodo: '2023.2', turno: 'Noturno', vagas: 50, alunos: 48, status: 'Encerrada' },
];

const columns: Column<Turma>[] = [
  { key: 'nome', header: 'Turma', sortable: true },
  { key: 'curso', header: 'Curso', sortable: true },
  { key: 'periodo', header: 'Periodo' },
  { key: 'turno', header: 'Turno' },
  {
    key: 'alunos',
    header: 'Alunos/Vagas',
    render: (item) => <span>{item.alunos}/{item.vagas}</span>,
  },
  {
    key: 'status',
    header: 'Status',
    render: (item) => (
      <Badge variant={item.status === 'Ativa' ? 'success' : 'secondary'}>{item.status}</Badge>
    ),
  },
];

export default function TurmasPage() {
  return (
    <div>
      <PageHeader
        title="Turmas"
        description="Gerenciamento de turmas"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Cadastros', href: '/cadastros' },
          { label: 'Turmas' },
        ]}
        actions={
          <a href="/cadastros/turmas/novo">
            <Button>Nova Turma</Button>
          </a>
        }
      />

      <DataTable
        data={mockTurmas}
        columns={columns}
        searchKey="nome"
        searchPlaceholder="Buscar turmas..."
        onRowClick={(item) => {
          window.location.href = `/cadastros/turmas/${item.id}`;
        }}
        actions={(item) => (
          <a href={`/cadastros/turmas/${item.id}`}>
            <Button variant="ghost" size="sm">Editar</Button>
          </a>
        )}
      />
    </div>
  );
}
