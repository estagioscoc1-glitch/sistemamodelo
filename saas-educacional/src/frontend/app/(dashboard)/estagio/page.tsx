'use client';

import React, { useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DataTable, type Column } from '@/components/shared/DataTable';

interface Estagio {
  id: string;
  aluno: string;
  empresa: string;
  dataInicio: string;
  dataFim: string;
  cargaHoraria: string;
  status: string;
  [key: string]: unknown;
}

const statusVariant: Record<string, 'success' | 'secondary' | 'warning' | 'destructive' | 'default'> = {
  Ativo: 'success',
  Concluido: 'secondary',
  Cancelado: 'destructive',
  Suspenso: 'warning',
};

const columns: Column<Estagio>[] = [
  { key: 'aluno', header: 'Aluno', sortable: true },
  { key: 'empresa', header: 'Empresa', sortable: true },
  { key: 'dataInicio', header: 'Data Inicio' },
  { key: 'dataFim', header: 'Data Fim' },
  { key: 'cargaHoraria', header: 'Carga Horaria' },
  {
    key: 'status',
    header: 'Status',
    render: (item) => (
      <Badge variant={statusVariant[item.status] || 'default'}>{item.status}</Badge>
    ),
  },
];

export default function EstagioPage() {
  const { data, isLoading, error, execute } = useApi<Estagio[]>('/estagios');

  useEffect(() => { execute(); }, [execute]);

  if (isLoading) return <div className="p-6">Carregando...</div>;
  if (error) return <div className="p-6 text-red-500">Erro: {error}</div>;

  return (
    <div>
      <PageHeader
        title="Estagios"
        description="Gerenciamento de estagios"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Estagios' },
        ]}
        actions={
          <a href="/estagio/cadastro">
            <Button>Novo Estagio</Button>
          </a>
        }
      />

      <DataTable
        data={data || []}
        columns={columns}
        searchKey="aluno"
        searchPlaceholder="Buscar por aluno..."
        onRowClick={(item) => {
          window.location.href = `/estagio/${item.id}`;
        }}
        actions={(item) => (
          <a href={`/estagio/${item.id}`}>
            <Button variant="ghost" size="sm">Detalhes</Button>
          </a>
        )}
      />
    </div>
  );
}
