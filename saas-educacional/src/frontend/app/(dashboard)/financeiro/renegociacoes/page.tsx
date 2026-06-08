'use client';

import React from 'react';
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

const mockRenegociacoes: Renegociacao[] = [
  { id: '1', aluno: 'Joao Pedro Oliveira', valorOriginal: 'R$ 5.880,00', valorNegociado: 'R$ 5.000,00', parcelas: '6x R$ 833,33', dataAcordo: '15/03/2024', status: 'Ativa' },
  { id: '2', aluno: 'Carlos Eduardo Lima', valorOriginal: 'R$ 4.500,00', valorNegociado: 'R$ 3.800,00', parcelas: '4x R$ 950,00', dataAcordo: '20/02/2024', status: 'Quitada' },
  { id: '3', aluno: 'Pedro Santos', valorOriginal: 'R$ 3.600,00', valorNegociado: 'R$ 3.200,00', parcelas: '3x R$ 1.066,67', dataAcordo: '10/04/2024', status: 'Ativa' },
  { id: '4', aluno: 'Fernanda Lima', valorOriginal: 'R$ 7.200,00', valorNegociado: 'R$ 6.000,00', parcelas: '8x R$ 750,00', dataAcordo: '05/01/2024', status: 'Inadimplente' },
  { id: '5', aluno: 'Lucas Mendes', valorOriginal: 'R$ 2.400,00', valorNegociado: 'R$ 2.100,00', parcelas: '3x R$ 700,00', dataAcordo: '22/03/2024', status: 'Pendente' },
  { id: '6', aluno: 'Mariana Costa', valorOriginal: 'R$ 4.800,00', valorNegociado: 'R$ 4.200,00', parcelas: '5x R$ 840,00', dataAcordo: '01/04/2024', status: 'Ativa' },
];

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
        data={mockRenegociacoes}
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
