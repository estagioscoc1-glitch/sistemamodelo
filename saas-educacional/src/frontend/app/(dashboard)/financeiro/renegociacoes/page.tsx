'use client';

import React, { useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DataTable, type Column } from '@/components/shared/DataTable';
import { useToast } from '@/components/ui/Toast';

interface Renegociacao {
  id: string;
  aluno: string;
  valorOriginal: string;
  valorNegociado: string;
  parcelas: string;
  dataAcordo: string;
  status: string;
  [key: string]: unknown;
}

const statusVariant: Record<string, 'success' | 'secondary' | 'warning' | 'destructive' | 'default'> = {
  Ativa: 'success',
  Quitada: 'secondary',
  Inadimplente: 'destructive',
  Pendente: 'warning',
};

const columns: Column<Renegociacao>[] = [
  { key: 'aluno', header: 'Aluno', sortable: true },
  { key: 'valorOriginal', header: 'Valor Original' },
  { key: 'valorNegociado', header: 'Valor Negociado' },
  { key: 'parcelas', header: 'Parcelas' },
  { key: 'dataAcordo', header: 'Data Acordo', sortable: true },
  {
    key: 'status',
    header: 'Status',
    render: (item) => (
      <Badge variant={statusVariant[item.status] || 'default'}>{item.status}</Badge>
    ),
  },
];

export default function RenegociacoesPage() {
  const { addToast } = useToast();
  const { data, isLoading, error, execute } = useApi<Renegociacao[]>('/financeiro/renegociacoes');

  useEffect(() => { execute(); }, [execute]);

  if (isLoading) return <div className="p-6">Carregando...</div>;
  if (error) return <div className="p-6 text-red-500">Erro: {error}</div>;

  return (
    <div>
      <PageHeader
        title="Renegociacoes"
        description="Acordos de renegociacao de divida"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Financeiro', href: '/financeiro' },
          { label: 'Renegociacoes' },
        ]}
        actions={
          <Button onClick={() => addToast({ title: 'Nova renegociacao iniciada!', variant: 'success' })}>
            Nova Renegociacao
          </Button>
        }
      />

      <DataTable
        data={data || []}
        columns={columns}
        searchKey="aluno"
        searchPlaceholder="Buscar por aluno..."
        actions={(item) => (
          <a href={`/financeiro/${item.id}`}>
            <Button variant="ghost" size="sm">Detalhes</Button>
          </a>
        )}
      />
    </div>
  );
}
