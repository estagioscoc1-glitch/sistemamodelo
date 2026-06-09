'use client';

import React, { useEffect } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DataTable, type Column } from '@/components/shared/DataTable';
import { useApi } from '@/hooks/useApi';

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
  const { data, isLoading, error, execute } = useApi<Matricula[]>('/matriculas');

  useEffect(() => {
    execute();
  }, [execute]);

  if (isLoading) return <div className="p-8 text-center">Carregando...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Erro: {error}</div>;

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
        data={data || []}
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
