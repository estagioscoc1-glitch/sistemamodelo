'use client';

import React, { useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DataTable, type Column } from '@/components/shared/DataTable';

interface Conta {
  id: string;
  aluno: string;
  descricao: string;
  valorTotal: string;
  vencimento: string;
  status: string;
  [key: string]: unknown;
}

const statusVariant: Record<string, 'success' | 'secondary' | 'warning' | 'destructive' | 'default'> = {
  Aberta: 'default',
  Paga: 'success',
  Parcial: 'warning',
  Atrasada: 'destructive',
};

const columns: Column<Conta>[] = [
  { key: 'aluno', header: 'Aluno', sortable: true },
  { key: 'descricao', header: 'Descricao' },
  { key: 'valorTotal', header: 'Valor Total' },
  { key: 'vencimento', header: 'Vencimento', sortable: true },
  {
    key: 'status',
    header: 'Status',
    render: (item) => (
      <Badge variant={statusVariant[item.status] || 'default'}>{item.status}</Badge>
    ),
  },
];

export default function ContasReceberPage() {
  const { data, isLoading, error, execute } = useApi<Conta[]>('/financeiro/contas-receber');

  useEffect(() => { execute(); }, [execute]);

  if (isLoading) return <div className="p-6">Carregando...</div>;
  if (error) return <div className="p-6 text-red-500">Erro: {error}</div>;

  return (
    <div>
      <PageHeader
        title="Contas a Receber"
        description="Gerenciamento de contas a receber"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Financeiro', href: '/financeiro' },
          { label: 'Contas a Receber' },
        ]}
        actions={
          <a href="/financeiro/novo">
            <Button>Nova Conta</Button>
          </a>
        }
      />

      <DataTable
        data={data || []}
        columns={columns}
        searchKey="aluno"
        searchPlaceholder="Buscar por aluno..."
        onRowClick={(item) => {
          window.location.href = `/financeiro/${item.id}`;
        }}
        actions={(item) => (
          <a href={`/financeiro/${item.id}`}>
            <Button variant="ghost" size="sm">Detalhes</Button>
          </a>
        )}
      />
    </div>
  );
}
