'use client';

import React, { useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
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

const columns: Column<Nota>[] = [
  { key: 'aluno', header: 'Aluno', sortable: true },
  { key: 'disciplina', header: 'Disciplina', sortable: true },
  { key: 'turma', header: 'Turma' },
  { key: 'nota', header: 'Nota', render: (item) => <span>{item.nota?.toFixed(1)}</span> },
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
  const { data, isLoading, error, execute } = useApi<Nota[]>('/notas');

  useEffect(() => { execute(); }, [execute]);

  if (isLoading) return <div className="p-6">Carregando...</div>;
  if (error) return <div className="p-6 text-red-500">Erro: {error}</div>;

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
        data={data || []}
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
