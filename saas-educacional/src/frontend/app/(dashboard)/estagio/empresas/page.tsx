'use client';

import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DataTable, type Column } from '@/components/shared/DataTable';

interface Empresa {
  id: string;
  nome: string;
  cnpj: string;
  cidade: string;
  estado: string;
  contato: string;
  status: string;
  [key: string]: unknown;
}

const statusVariant: Record<string, 'success' | 'destructive' | 'default'> = {
  Ativa: 'success',
  Inativa: 'destructive',
};

const mockEmpresas: Empresa[] = [
  { id: '1', nome: 'TechCorp Ltda', cnpj: '12.345.678/0001-90', cidade: 'Sao Paulo', estado: 'SP', contato: 'Carlos Mendes', status: 'Ativa' },
  { id: '2', nome: 'Construtora ABC', cnpj: '23.456.789/0001-01', cidade: 'Campinas', estado: 'SP', contato: 'Mariana Souza', status: 'Ativa' },
  { id: '3', nome: 'Hospital Vida', cnpj: '34.567.890/0001-12', cidade: 'Sao Paulo', estado: 'SP', contato: 'Dr. Fernando', status: 'Ativa' },
  { id: '4', nome: 'Escritorio Juridico Silva', cnpj: '45.678.901/0001-23', cidade: 'Santos', estado: 'SP', contato: 'Adv. Silva', status: 'Ativa' },
  { id: '5', nome: 'Escola Municipal Norte', cnpj: '56.789.012/0001-34', cidade: 'Guarulhos', estado: 'SP', contato: 'Diretora Ana', status: 'Inativa' },
];

const columns: Column<Empresa>[] = [
  { key: 'nome', header: 'Nome', sortable: true },
  { key: 'cnpj', header: 'CNPJ' },
  { key: 'cidade', header: 'Cidade', sortable: true },
  { key: 'estado', header: 'UF' },
  { key: 'contato', header: 'Contato' },
  {
    key: 'status',
    header: 'Status',
    render: (item) => (
      <Badge variant={statusVariant[item.status] || 'default'}>{item.status}</Badge>
    ),
  },
];

export default function EmpresasEstagioPage() {
  return (
    <div>
      <PageHeader
        title="Empresas de Estagio"
        description="Gerenciamento de empresas conveniadas"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Estagios', href: '/estagio' },
          { label: 'Empresas' },
        ]}
        actions={
          <a href="/estagio/empresas/nova">
            <Button>Nova Empresa</Button>
          </a>
        }
      />

      <DataTable
        data={mockEmpresas}
        columns={columns}
        searchKey="nome"
        searchPlaceholder="Buscar por empresa..."
        onRowClick={(item) => {
          window.location.href = `/estagio/empresas/${item.id}`;
        }}
        actions={(item) => (
          <a href={`/estagio/empresas/${item.id}`}>
            <Button variant="ghost" size="sm">Detalhes</Button>
          </a>
        )}
      />
    </div>
  );
}
