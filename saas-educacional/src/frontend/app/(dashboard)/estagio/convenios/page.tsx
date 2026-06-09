'use client';

import React, { useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
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
  const { data, isLoading, error, execute } = useApi<Convenio[]>('/estagios/convenios');

  useEffect(() => { execute(); }, [execute]);

  if (isLoading) return <div className="p-6">Carregando...</div>;
  if (error) return <div className="p-6 text-red-500">Erro: {error}</div>;

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
        data={data || []}
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
