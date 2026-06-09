'use client';

import React, { useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DataTable, type Column } from '@/components/shared/DataTable';

interface Movimentacao {
  id: string;
  aluno: string;
  tipo: string;
  origem: string;
  destino: string;
  data: string;
  status: string;
  [key: string]: unknown;
}

const tipoVariant: Record<string, 'success' | 'secondary' | 'warning' | 'destructive' | 'default'> = {
  Transferencia: 'default',
  Trancamento: 'warning',
  Reopcao: 'secondary',
  Desistencia: 'destructive',
  Retorno: 'success',
};

const statusVariant: Record<string, 'success' | 'secondary' | 'warning' | 'destructive' | 'default'> = {
  Concluida: 'success',
  'Em Analise': 'warning',
  Pendente: 'secondary',
  Cancelada: 'destructive',
};

const columns: Column<Movimentacao>[] = [
  { key: 'aluno', header: 'Aluno', sortable: true },
  {
    key: 'tipo',
    header: 'Tipo',
    render: (item) => <Badge variant={tipoVariant[item.tipo] || 'default'}>{item.tipo}</Badge>,
  },
  { key: 'origem', header: 'Origem' },
  { key: 'destino', header: 'Destino' },
  { key: 'data', header: 'Data', sortable: true },
  {
    key: 'status',
    header: 'Status',
    render: (item) => <Badge variant={statusVariant[item.status] || 'default'}>{item.status}</Badge>,
  },
];

export default function MovimentacaoPage() {
  const { data, isLoading, error, execute } = useApi<Movimentacao[]>('/movimentacao');

  useEffect(() => { execute(); }, [execute]);

  if (isLoading) return <div className="p-6">Carregando...</div>;
  if (error) return <div className="p-6 text-red-500">Erro: {error}</div>;

  return (
    <div>
      <PageHeader
        title="Movimentacao Academica"
        description="Transferencias, trancamentos e outras movimentacoes"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Movimentacao' },
        ]}
        actions={
          <Button>Nova Movimentacao</Button>
        }
      />

      <DataTable
        data={data || []}
        columns={columns}
        searchKey="aluno"
        searchPlaceholder="Buscar por aluno..."
        actions={() => (
          <Button variant="ghost" size="sm">Detalhes</Button>
        )}
      />
    </div>
  );
}
