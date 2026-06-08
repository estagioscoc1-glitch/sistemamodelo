'use client';

import React from 'react';
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

const mockMovimentacoes: Movimentacao[] = [
  { id: '1', aluno: 'Ana Silva Santos', tipo: 'Transferencia', origem: 'ADM-2024-1A', destino: 'ADM-2024-1B', data: '15/03/2024', status: 'Concluida' },
  { id: '2', aluno: 'Joao Pedro Oliveira', tipo: 'Trancamento', origem: 'SI-2024-1A', destino: '-', data: '20/02/2024', status: 'Concluida' },
  { id: '3', aluno: 'Maria Fernandes Costa', tipo: 'Reopcao', origem: 'Enfermagem', destino: 'Administracao', data: '10/01/2024', status: 'Em Analise' },
  { id: '4', aluno: 'Carlos Eduardo Lima', tipo: 'Desistencia', origem: 'DIR-2023-2A', destino: '-', data: '05/04/2024', status: 'Concluida' },
  { id: '5', aluno: 'Juliana Almeida', tipo: 'Retorno', origem: '-', destino: 'PED-2024-1A', data: '01/02/2024', status: 'Concluida' },
  { id: '6', aluno: 'Pedro Santos', tipo: 'Transferencia', origem: 'ADM-2024-1A', destino: 'ADM-2024-2A', data: '25/03/2024', status: 'Em Analise' },
  { id: '7', aluno: 'Lucas Mendes', tipo: 'Trancamento', origem: 'ENF-2024-1A', destino: '-', data: '12/04/2024', status: 'Pendente' },
];

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
        data={mockMovimentacoes}
        columns={columns}
        searchKey="aluno"
        searchPlaceholder="Buscar por aluno..."
        actions={(item) => (
          <Button variant="ghost" size="sm">Detalhes</Button>
        )}
      />
    </div>
  );
}
