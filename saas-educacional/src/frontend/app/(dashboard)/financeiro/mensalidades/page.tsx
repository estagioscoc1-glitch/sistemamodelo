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
  parcela: string;
  valor: string;
  vencimento: string;
  pagamento: string;
  status: string;
  [key: string]: unknown;
}

const statusVariant: Record<string, 'success' | 'secondary' | 'warning' | 'destructive' | 'default'> = {
  Paga: 'success',
  Pendente: 'default',
  Atrasada: 'destructive',
  Cancelada: 'secondary',
};

const columns: Column<Parcela>[] = [
  { key: 'aluno', header: 'Aluno', sortable: true },
  { key: 'parcela', header: 'Parcela' },
  { key: 'valor', header: 'Valor' },
  { key: 'vencimento', header: 'Vencimento', sortable: true },
  { key: 'pagamento', header: 'Pagamento' },
  {
    key: 'status',
    header: 'Status',
    render: (item) => (
      <Badge variant={statusVariant[item.status] || 'default'}>{item.status}</Badge>
    ),
  },
];

export default function MensalidadesPage() {
  const { data, isLoading, error, execute } = useApi<Parcela[]>('/financeiro/mensalidades');

  useEffect(() => { execute(); }, [execute]);

  if (isLoading) return <div className="p-6">Carregando...</div>;
  if (error) return <div className="p-6 text-red-500">Erro: {error}</div>;

  return (
    <div>
      <PageHeader
        title="Mensalidades / Parcelas"
        description="Gerenciamento de parcelas e pagamentos"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Financeiro', href: '/financeiro' },
          { label: 'Mensalidades' },
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
          <Button
            variant="ghost"
            size="sm"
            disabled={item.status === 'Paga' || item.status === 'Cancelada'}
          >
            Baixar
          </Button>
        )}
      />
    </div>
  );
}
