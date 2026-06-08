'use client';

import React from 'react';
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

const mockContas: Conta[] = [
  { id: '1', aluno: 'Ana Silva Santos', descricao: 'Mensalidade 2024/1', valorTotal: 'R$ 1.200,00', vencimento: '10/03/2024', status: 'Paga' },
  { id: '2', aluno: 'Joao Pedro Oliveira', descricao: 'Mensalidade 2024/1', valorTotal: 'R$ 1.500,00', vencimento: '10/03/2024', status: 'Aberta' },
  { id: '3', aluno: 'Maria Fernandes Costa', descricao: 'Mensalidade 2024/1', valorTotal: 'R$ 1.200,00', vencimento: '10/02/2024', status: 'Atrasada' },
  { id: '4', aluno: 'Carlos Eduardo Lima', descricao: 'Rematricula 2024', valorTotal: 'R$ 800,00', vencimento: '05/01/2024', status: 'Paga' },
  { id: '5', aluno: 'Juliana Almeida', descricao: 'Mensalidade 2024/1', valorTotal: 'R$ 1.350,00', vencimento: '10/03/2024', status: 'Parcial' },
  { id: '6', aluno: 'Pedro Santos', descricao: 'Mensalidade 2024/1', valorTotal: 'R$ 1.200,00', vencimento: '10/03/2024', status: 'Aberta' },
];

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
        data={mockContas}
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
