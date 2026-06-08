'use client';

import React from 'react';
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

const mockParcelas: Parcela[] = [
  { id: '1', aluno: 'Ana Silva Santos', parcela: '1/6', valor: 'R$ 200,00', vencimento: '10/01/2024', pagamento: '09/01/2024', status: 'Paga' },
  { id: '2', aluno: 'Ana Silva Santos', parcela: '2/6', valor: 'R$ 200,00', vencimento: '10/02/2024', pagamento: '10/02/2024', status: 'Paga' },
  { id: '3', aluno: 'Ana Silva Santos', parcela: '3/6', valor: 'R$ 200,00', vencimento: '10/03/2024', pagamento: '-', status: 'Pendente' },
  { id: '4', aluno: 'Joao Pedro Oliveira', parcela: '1/12', valor: 'R$ 125,00', vencimento: '10/01/2024', pagamento: '12/01/2024', status: 'Paga' },
  { id: '5', aluno: 'Joao Pedro Oliveira', parcela: '2/12', valor: 'R$ 125,00', vencimento: '10/02/2024', pagamento: '-', status: 'Atrasada' },
  { id: '6', aluno: 'Maria Fernandes Costa', parcela: '1/6', valor: 'R$ 200,00', vencimento: '10/01/2024', pagamento: '-', status: 'Atrasada' },
];

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
        data={mockParcelas}
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
