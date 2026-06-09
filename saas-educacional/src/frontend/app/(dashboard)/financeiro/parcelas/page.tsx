'use client';

import React, { useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DataTable, type Column } from '@/components/shared/DataTable';

interface Parcela {
  id: string;
  aluno: string;
  descricao: string;
  parcela: string;
  valor: string;
  vencimento: string;
  status: string;
  [key: string]: unknown;
}

const statusVariant: Record<string, 'success' | 'secondary' | 'warning' | 'destructive' | 'default'> = {
  Paga: 'success',
  Pendente: 'warning',
  Vencida: 'destructive',
  Cancelada: 'secondary',
};

const columns: Column<Parcela>[] = [
  { key: 'aluno', header: 'Aluno', sortable: true },
  { key: 'descricao', header: 'Descricao' },
  { key: 'parcela', header: 'Parcela' },
  { key: 'valor', header: 'Valor' },
  { key: 'vencimento', header: 'Vencimento', sortable: true },
  {
    key: 'status',
    header: 'Status',
    render: (item) => (
      <Badge variant={statusVariant[item.status] || 'default'}>{item.status}</Badge>
    ),
  },
];

export default function ParcelasPage() {
  const { data, isLoading, error, execute } = useApi<Parcela[]>('/financeiro/parcelas');

  useEffect(() => { execute(); }, [execute]);

  if (isLoading) return <div className="p-6">Carregando...</div>;
  if (error) return <div className="p-6 text-red-500">Erro: {error}</div>;

  return (
    <div>
      <PageHeader
        title="Parcelas"
        description="Gerenciamento de parcelas e mensalidades"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Financeiro', href: '/financeiro' },
          { label: 'Parcelas' },
        ]}
        actions={
          <a href="/financeiro/novo">
            <Button>Gerar Parcelas</Button>
          </a>
        }
      />

      <DataTable
        data={data || []}
        columns={columns}
        searchKey="aluno"
        searchPlaceholder="Buscar por aluno..."
        actions={(item) => (
          <div className="flex gap-2">
            {item.status === 'Pendente' || item.status === 'Vencida' ? (
              <a href={`/financeiro/${item.id}`}>
                <Button variant="ghost" size="sm">Baixar</Button>
              </a>
            ) : null}
          </div>
        )}
      />
    </div>
  );
}
