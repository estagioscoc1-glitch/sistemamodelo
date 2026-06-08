'use client';

import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DataTable, type Column } from '@/components/shared/DataTable';

interface Nota {
  id: string;
  aluno: string;
  disciplina: string;
  turma: string;
  nota: number;
  periodo: string;
  status: string;
  [key: string]: unknown;
}

const statusVariant: Record<string, 'success' | 'secondary' | 'warning' | 'destructive' | 'default'> = {
  Aprovado: 'success',
  Recuperacao: 'warning',
  Reprovado: 'destructive',
  Pendente: 'secondary',
  Fechado: 'default',
};

const mockNotas: Nota[] = [
  { id: '1', aluno: 'Ana Silva Santos', disciplina: 'Matematica', turma: 'ADM-2024-1A', nota: 8.5, periodo: '1o Bimestre', status: 'Aprovado' },
  { id: '2', aluno: 'Joao Pedro Oliveira', disciplina: 'Portugues', turma: 'SI-2024-1A', nota: 6.0, periodo: '1o Bimestre', status: 'Recuperacao' },
  { id: '3', aluno: 'Maria Fernandes Costa', disciplina: 'Historia', turma: 'ENF-2024-1A', nota: 9.2, periodo: '1o Bimestre', status: 'Aprovado' },
  { id: '4', aluno: 'Carlos Eduardo Lima', disciplina: 'Fisica', turma: 'DIR-2023-2A', nota: 4.5, periodo: '2o Bimestre', status: 'Reprovado' },
  { id: '5', aluno: 'Juliana Almeida', disciplina: 'Quimica', turma: 'PED-2023-1A', nota: 7.0, periodo: '1o Bimestre', status: 'Aprovado' },
  { id: '6', aluno: 'Pedro Santos', disciplina: 'Biologia', turma: 'ADM-2024-1B', nota: 5.5, periodo: '2o Bimestre', status: 'Recuperacao' },
  { id: '7', aluno: 'Fernanda Lima', disciplina: 'Matematica', turma: 'SI-2024-1A', nota: 7.8, periodo: '1o Bimestre', status: 'Pendente' },
];

const columns: Column<Nota>[] = [
  { key: 'aluno', header: 'Aluno', sortable: true },
  { key: 'disciplina', header: 'Disciplina', sortable: true },
  { key: 'turma', header: 'Turma' },
  { key: 'nota', header: 'Nota', render: (item) => <span>{item.nota.toFixed(1)}</span> },
  { key: 'periodo', header: 'Periodo' },
  {
    key: 'status',
    header: 'Status',
    render: (item) => (
      <Badge variant={statusVariant[item.status] || 'default'}>{item.status}</Badge>
    ),
  },
];

export default function NotasPage() {
  return (
    <div>
      <PageHeader
        title="Notas"
        description="Gerenciamento de notas e avaliacoes"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Notas' },
        ]}
        actions={
          <a href="/notas/lancamento">
            <Button>Lancar Notas</Button>
          </a>
        }
      />

      <DataTable
        data={mockNotas}
        columns={columns}
        searchKey="aluno"
        searchPlaceholder="Buscar por aluno..."
        onRowClick={(item) => {
          window.location.href = `/notas/${item.id}`;
        }}
        actions={(item) => (
          <a href={`/notas/${item.id}`}>
            <Button variant="ghost" size="sm">Detalhes</Button>
          </a>
        )}
      />
    </div>
  );
}
