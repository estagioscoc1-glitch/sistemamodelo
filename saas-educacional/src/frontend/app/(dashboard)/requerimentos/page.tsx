'use client';

import React, { useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DataTable, type Column } from '@/components/shared/DataTable';

interface Requerimento {
  id: string;
  protocolo: string;
  aluno: string;
  tipo: string;
  descricao: string;
  dataRequerimento: string;
  status: string;
  [key: string]: unknown;
}

const statusVariant: Record<string, 'success' | 'secondary' | 'warning' | 'destructive' | 'default'> = {
  Pendente: 'warning',
  'Em Andamento': 'default',
  Aprovado: 'success',
  Rejeitado: 'destructive',
  Concluido: 'secondary',
};

const columns: Column<Requerimento>[] = [
  { key: 'protocolo', header: 'Protocolo', sortable: true },
  { key: 'aluno', header: 'Aluno', sortable: true },
  { key: 'tipo', header: 'Tipo', sortable: true },
  { key: 'descricao', header: 'Descricao' },
  { key: 'dataRequerimento', header: 'Data' },
  {
    key: 'status',
    header: 'Status',
    render: (item) => (
      <Badge variant={statusVariant[item.status] || 'default'}>{item.status}</Badge>
    ),
  },
];

export default function RequerimentosPage() {
  const { data, isLoading, error, execute } = useApi<Requerimento[]>('/requerimentos');

  useEffect(() => { execute(); }, [execute]);

  if (isLoading) return <div className="p-6">Carregando...</div>;
  if (error) return <div className="p-6 text-red-500">Erro: {error}</div>;

  return (
    <div>
      <PageHeader
        title="Requerimentos"
        description="Gerenciamento de requerimentos"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Requerimentos' },
        ]}
        actions={
          <a href="/requerimentos/novo">
            <Button>Novo Requerimento</Button>
          </a>
        }
      />

      <DataTable
        data={data || []}
        columns={columns}
        searchKey="aluno"
        searchPlaceholder="Buscar por aluno..."
        onRowClick={(item) => {
          window.location.href = `/requerimentos/${item.id}`;
        }}
        actions={(item) => (
          <a href={`/requerimentos/${item.id}`}>
            <Button variant="ghost" size="sm">Detalhes</Button>
          </a>
        )}
      />
    </div>
  );
}
