'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useApi } from '@/hooks/useApi';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Tabs } from '@/components/ui/Tabs';
import { DataTable, type Column } from '@/components/shared/DataTable';

interface Parcela {
  id: string;
  parcela: string;
  valor: string;
  vencimento: string;
  pagamento: string;
  status: string;
  [key: string]: unknown;
}

interface ContaDetalhe {
  aluno: string;
  descricao: string;
  valorTotal: string;
  status: string;
  parcelas: Parcela[];
}

const statusVariant: Record<string, 'success' | 'secondary' | 'warning' | 'destructive' | 'default'> = {
  Paga: 'success',
  Pendente: 'default',
  Atrasada: 'destructive',
  Cancelada: 'secondary',
};

const parcelaColumns: Column<Parcela>[] = [
  { key: 'parcela', header: 'Parcela' },
  { key: 'valor', header: 'Valor' },
  { key: 'vencimento', header: 'Vencimento' },
  { key: 'pagamento', header: 'Pagamento' },
  {
    key: 'status',
    header: 'Status',
    render: (item) => (
      <Badge variant={statusVariant[item.status] || 'default'}>{item.status}</Badge>
    ),
  },
];

export default function ContaDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { data, isLoading, error, execute } = useApi<ContaDetalhe>(`/financeiro/${id}`);

  useEffect(() => { if (id) execute(); }, [id, execute]);

  if (isLoading) return <div className="p-6">Carregando...</div>;
  if (error) return <div className="p-6 text-red-500">Erro: {error}</div>;

  const tabItems = [
    {
      value: 'dados',
      label: 'Dados da Conta',
      content: (
        <div className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Aluno</p>
              <p className="font-medium">{data?.aluno || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Descricao</p>
              <p className="font-medium">{data?.descricao || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Valor Total</p>
              <p className="font-medium">{data?.valorTotal || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge variant="default">{data?.status || '-'}</Badge>
            </div>
          </div>
        </div>
      ),
    },
    {
      value: 'parcelas',
      label: 'Parcelas',
      content: (
        <div className="mt-4">
          <DataTable
            data={data?.parcelas || []}
            columns={parcelaColumns}
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
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Detalhes da Conta"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Financeiro', href: '/financeiro' },
          { label: 'Contas a Receber', href: '/financeiro/contas-receber' },
          { label: 'Detalhes' },
        ]}
        actions={
          <Badge variant="default">{data?.status || '-'}</Badge>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle>{data?.aluno || ''} - {data?.descricao || ''}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs items={tabItems} defaultValue="dados" />
        </CardContent>
      </Card>
    </div>
  );
}
