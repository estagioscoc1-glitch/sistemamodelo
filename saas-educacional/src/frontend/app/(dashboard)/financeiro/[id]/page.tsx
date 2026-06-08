'use client';

import React from 'react';
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

const statusVariant: Record<string, 'success' | 'secondary' | 'warning' | 'destructive' | 'default'> = {
  Paga: 'success',
  Pendente: 'default',
  Atrasada: 'destructive',
  Cancelada: 'secondary',
};

const mockParcelas: Parcela[] = [
  { id: '1', parcela: '1/6', valor: 'R$ 200,00', vencimento: '10/01/2024', pagamento: '09/01/2024', status: 'Paga' },
  { id: '2', parcela: '2/6', valor: 'R$ 200,00', vencimento: '10/02/2024', pagamento: '10/02/2024', status: 'Paga' },
  { id: '3', parcela: '3/6', valor: 'R$ 200,00', vencimento: '10/03/2024', pagamento: '-', status: 'Pendente' },
  { id: '4', parcela: '4/6', valor: 'R$ 200,00', vencimento: '10/04/2024', pagamento: '-', status: 'Pendente' },
  { id: '5', parcela: '5/6', valor: 'R$ 200,00', vencimento: '10/05/2024', pagamento: '-', status: 'Pendente' },
  { id: '6', parcela: '6/6', valor: 'R$ 200,00', vencimento: '10/06/2024', pagamento: '-', status: 'Pendente' },
];

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
  const tabItems = [
    {
      value: 'dados',
      label: 'Dados da Conta',
      content: (
        <div className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Aluno</p>
              <p className="font-medium">Ana Silva Santos</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Descricao</p>
              <p className="font-medium">Mensalidade 2024/1</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Valor Total</p>
              <p className="font-medium">R$ 1.200,00</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge variant="default">Aberta</Badge>
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
            data={mockParcelas}
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
          <Badge variant="default">Aberta</Badge>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle>Ana Silva Santos - Mensalidade 2024/1</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs items={tabItems} defaultValue="dados" />
        </CardContent>
      </Card>
    </div>
  );
}
