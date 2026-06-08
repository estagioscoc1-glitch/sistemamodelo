'use client';

import React from 'react';
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

const mockParcelas: Parcela[] = [
  { id: '1', aluno: 'Ana Silva Santos', descricao: 'Mensalidade 2024', parcela: '1/12', valor: 'R$ 1.200,00', vencimento: '10/01/2024', status: 'Paga' },
  { id: '2', aluno: 'Ana Silva Santos', descricao: 'Mensalidade 2024', parcela: '2/12', valor: 'R$ 1.200,00', vencimento: '10/02/2024', status: 'Paga' },
  { id: '3', aluno: 'Ana Silva Santos', descricao: 'Mensalidade 2024', parcela: '3/12', valor: 'R$ 1.200,00', vencimento: '10/03/2024', status: 'Paga' },
  { id: '4', aluno: 'Joao Pedro Oliveira', descricao: 'Mensalidade 2024', parcela: '1/12', valor: 'R$ 980,00', vencimento: '10/01/2024', status: 'Paga' },
  { id: '5', aluno: 'Joao Pedro Oliveira', descricao: 'Mensalidade 2024', parcela: '2/12', valor: 'R$ 980,00', vencimento: '10/02/2024', status: 'Vencida' },
  { id: '6', aluno: 'Carlos Eduardo Lima', descricao: 'Mensalidade 2024', parcela: '1/12', valor: 'R$ 1.500,00', vencimento: '10/01/2024', status: 'Paga' },
  { id: '7', aluno: 'Carlos Eduardo Lima', descricao: 'Mensalidade 2024', parcela: '2/12', valor: 'R$ 1.500,00', vencimento: '10/02/2024', status: 'Pendente' },
  { id: '8', aluno: 'Juliana Almeida', descricao: 'Mensalidade 2024', parcela: '1/12', valor: 'R$ 850,00', vencimento: '10/01/2024', status: 'Cancelada' },
];

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
        data={mockParcelas}
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
