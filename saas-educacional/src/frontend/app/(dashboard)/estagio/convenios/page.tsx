'use client';

import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DataTable, type Column } from '@/components/shared/DataTable';

interface Convenio {
  id: string;
  empresa: string;
  cnpj: string;
  contato: string;
  telefone: string;
  dataInicio: string;
  dataFim: string;
  vagas: number;
  status: string;
  [key: string]: unknown;
}

const statusVariant: Record<string, 'success' | 'secondary' | 'warning' | 'destructive' | 'default'> = {
  Ativo: 'success',
  Vencido: 'destructive',
  'A Vencer': 'warning',
  Suspenso: 'secondary',
};

const mockConvenios: Convenio[] = [
  { id: '1', empresa: 'TechCorp Ltda', cnpj: '12.345.678/0001-01', contato: 'Carlos Mendes', telefone: '(11) 3456-7890', dataInicio: '01/01/2023', dataFim: '31/12/2025', vagas: 10, status: 'Ativo' },
  { id: '2', empresa: 'Construtora ABC', cnpj: '23.456.789/0001-02', contato: 'Maria Souza', telefone: '(11) 2345-6789', dataInicio: '01/06/2023', dataFim: '01/06/2025', vagas: 5, status: 'Ativo' },
  { id: '3', empresa: 'Hospital Vida', cnpj: '34.567.890/0001-03', contato: 'Dr. Paulo Cesar', telefone: '(11) 3456-7891', dataInicio: '15/03/2022', dataFim: '15/03/2024', vagas: 8, status: 'Vencido' },
  { id: '4', empresa: 'Escritorio Juridico Silva', cnpj: '45.678.901/0001-04', contato: 'Ana Costa', telefone: '(11) 4567-8901', dataInicio: '01/07/2024', dataFim: '01/07/2026', vagas: 3, status: 'Ativo' },
  { id: '5', empresa: 'Escola Municipal Norte', cnpj: '56.789.012/0001-05', contato: 'Prof. Santos', telefone: '(11) 5678-9012', dataInicio: '01/01/2024', dataFim: '01/07/2024', vagas: 6, status: 'A Vencer' },
  { id: '6', empresa: 'Farmacia Saude', cnpj: '67.890.123/0001-06', contato: 'Joao Lima', telefone: '(11) 6789-0123', dataInicio: '01/03/2023', dataFim: '01/03/2025', vagas: 4, status: 'Ativo' },
];

const columns: Column<Convenio>[] = [
  { key: 'empresa', header: 'Empresa', sortable: true },
  { key: 'cnpj', header: 'CNPJ' },
  { key: 'contato', header: 'Contato' },
  { key: 'dataInicio', header: 'Inicio' },
  { key: 'dataFim', header: 'Fim' },
  { key: 'vagas', header: 'Vagas' },
  {
    key: 'status',
    header: 'Status',
    render: (item) => (
      <Badge variant={statusVariant[item.status] || 'default'}>{item.status}</Badge>
    ),
  },
];

export default function ConveniosPage() {
  return (
    <div>
      <PageHeader
        title="Convenios de Estagio"
        description="Gerenciamento de convenios com empresas"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Estagio', href: '/estagio' },
          { label: 'Convenios' },
        ]}
        actions={
          <a href="/estagio/empresas/nova">
            <Button>Novo Convenio</Button>
          </a>
        }
      />

      <DataTable
        data={mockConvenios}
        columns={columns}
        searchKey="empresa"
        searchPlaceholder="Buscar por empresa..."
        actions={(item) => (
          <a href={`/estagio/empresas/${item.id}`}>
            <Button variant="ghost" size="sm">Detalhes</Button>
          </a>
        )}
      />
    </div>
  );
}
