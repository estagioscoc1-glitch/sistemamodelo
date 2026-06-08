'use client';

import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DataTable, type Column } from '@/components/shared/DataTable';

interface Baixa {
  id: string;
  aluno: string;
  parcela: string;
  valor: string;
  dataPagamento: string;
  formaPagamento: string;
  usuario: string;
  [key: string]: unknown;
}

const mockBaixas: Baixa[] = [
  { id: '1', aluno: 'Ana Silva Santos', parcela: '1/12 - Jan/2024', valor: 'R$ 1.200,00', dataPagamento: '10/01/2024', formaPagamento: 'Boleto', usuario: 'admin' },
  { id: '2', aluno: 'Ana Silva Santos', parcela: '2/12 - Fev/2024', valor: 'R$ 1.200,00', dataPagamento: '10/02/2024', formaPagamento: 'PIX', usuario: 'admin' },
  { id: '3', aluno: 'Ana Silva Santos', parcela: '3/12 - Mar/2024', valor: 'R$ 1.200,00', dataPagamento: '08/03/2024', formaPagamento: 'Cartao', usuario: 'admin' },
  { id: '4', aluno: 'Joao Pedro Oliveira', parcela: '1/12 - Jan/2024', valor: 'R$ 980,00', dataPagamento: '12/01/2024', formaPagamento: 'Boleto', usuario: 'financeiro1' },
  { id: '5', aluno: 'Carlos Eduardo Lima', parcela: '1/12 - Jan/2024', valor: 'R$ 1.500,00', dataPagamento: '10/01/2024', formaPagamento: 'PIX', usuario: 'financeiro1' },
  { id: '6', aluno: 'Maria Fernandes Costa', parcela: '1/12 - Jan/2024', valor: 'R$ 1.100,00', dataPagamento: '09/01/2024', formaPagamento: 'Boleto', usuario: 'admin' },
];

const columns: Column<Baixa>[] = [
  { key: 'aluno', header: 'Aluno', sortable: true },
  { key: 'parcela', header: 'Parcela' },
  { key: 'valor', header: 'Valor' },
  { key: 'dataPagamento', header: 'Data Pagamento', sortable: true },
  { key: 'formaPagamento', header: 'Forma Pagamento' },
  { key: 'usuario', header: 'Registrado por' },
];

export default function BaixasPage() {
  return (
    <div>
      <PageHeader
        title="Baixas"
        description="Registro de pagamentos recebidos"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Financeiro', href: '/financeiro' },
          { label: 'Baixas' },
        ]}
        actions={
          <a href="/financeiro/parcelas">
            <Button>Registrar Baixa</Button>
          </a>
        }
      />

      <DataTable
        data={mockBaixas}
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
