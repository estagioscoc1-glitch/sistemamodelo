'use client';

import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DataTable, type Column } from '@/components/shared/DataTable';

interface Matricula {
  id: string;
  aluno: string;
  curso: string;
  turma: string;
  dataMatricula: string;
  status: string;
  [key: string]: unknown;
}

const statusVariant: Record<string, 'success' | 'secondary' | 'warning' | 'destructive' | 'default'> = {
  Ativa: 'success',
  Renovada: 'success',
  Transferida: 'secondary',
  Cancelada: 'destructive',
  Trancada: 'warning',
};

const mockMatriculas: Matricula[] = [
  { id: '1', aluno: 'Ana Silva Santos', curso: 'Administracao', turma: 'ADM-2024-1A', dataMatricula: '15/01/2024', status: 'Ativa' },
  { id: '2', aluno: 'Joao Pedro Oliveira', curso: 'Sistemas de Informacao', turma: 'SI-2024-1A', dataMatricula: '16/01/2024', status: 'Ativa' },
  { id: '3', aluno: 'Maria Fernandes Costa', curso: 'Enfermagem', turma: 'ENF-2024-1A', dataMatricula: '17/01/2024', status: 'Renovada' },
  { id: '4', aluno: 'Carlos Eduardo Lima', curso: 'Direito', turma: 'DIR-2023-2A', dataMatricula: '10/07/2023', status: 'Trancada' },
  { id: '5', aluno: 'Juliana Almeida', curso: 'Pedagogia', turma: 'PED-2023-1A', dataMatricula: '20/01/2023', status: 'Cancelada' },
  { id: '6', aluno: 'Pedro Santos', curso: 'Administracao', turma: 'ADM-2024-1B', dataMatricula: '18/01/2024', status: 'Ativa' },
];

const columns: Column<Matricula>[] = [
  { key: 'aluno', header: 'Aluno', sortable: true },
  { key: 'curso', header: 'Curso', sortable: true },
  { key: 'turma', header: 'Turma' },
  { key: 'dataMatricula', header: 'Data da Matricula' },
  {
    key: 'status',
    header: 'Status',
    render: (item) => (
      <Badge variant={statusVariant[item.status] || 'default'}>{item.status}</Badge>
    ),
  },
];

export default function MatriculasPage() {
  return (
    <div>
      <PageHeader
        title="Matriculas"
        description="Gerenciamento de matriculas"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Matriculas' },
        ]}
        actions={
          <a href="/matriculas/nova">
            <Button>Nova Matricula</Button>
          </a>
        }
      />

      <DataTable
        data={mockMatriculas}
        columns={columns}
        searchKey="aluno"
        searchPlaceholder="Buscar por aluno..."
        onRowClick={(item) => {
          window.location.href = `/matriculas/${item.id}`;
        }}
        actions={(item) => (
          <a href={`/matriculas/${item.id}`}>
            <Button variant="ghost" size="sm">Detalhes</Button>
          </a>
        )}
      />
    </div>
  );
}
