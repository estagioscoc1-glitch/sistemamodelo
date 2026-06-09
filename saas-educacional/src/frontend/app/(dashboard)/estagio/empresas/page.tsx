'use client';

import React, { useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
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
  const { data, isLoading, error, execute } = useApi<Empresa[]>('/estagios/empresas');

  useEffect(() => { execute(); }, [execute]);

  if (isLoading) return <div className="p-6">Carregando...</div>;
  if (error) return <div className="p-6 text-red-500">Erro: {error}</div>;

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
        data={data || []}
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
