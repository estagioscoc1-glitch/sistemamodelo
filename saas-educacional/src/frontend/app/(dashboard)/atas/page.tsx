'use client';

import React, { useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DataTable, type Column } from '@/components/shared/DataTable';

interface Ata {
  id: string;
  titulo: string;
  data: string;
  tipo: string;
  participantes: string;
  status: string;
  [key: string]: unknown;
}

const statusVariant: Record<string, 'success' | 'secondary' | 'warning' | 'destructive' | 'default'> = {
  Rascunho: 'secondary',
  Aprovada: 'success',
  Publicada: 'default',
};

const columns: Column<Ata>[] = [
  { key: 'titulo', header: 'Titulo', sortable: true },
  { key: 'data', header: 'Data', sortable: true },
  { key: 'tipo', header: 'Tipo', sortable: true },
  { key: 'participantes', header: 'Participantes' },
  {
    key: 'status',
    header: 'Status',
    render: (item) => (
      <Badge variant={statusVariant[item.status] || 'default'}>{item.status}</Badge>
    ),
  },
];

export default function AtasPage() {
  const { data, isLoading, error, execute } = useApi<Ata[]>('/atas');

  useEffect(() => { execute(); }, [execute]);

  if (isLoading) return <div className="p-6">Carregando...</div>;
  if (error) return <div className="p-6 text-red-500">Erro: {error}</div>;

  return (
    <div>
      <PageHeader
        title="Atas"
        description="Gerenciamento de atas de reunioes"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Atas' },
        ]}
        actions={
          <a href="/atas/nova">
            <Button>Nova Ata</Button>
          </a>
        }
      />

      <DataTable
        data={data || []}
        columns={columns}
        searchKey="titulo"
        searchPlaceholder="Buscar atas..."
        onRowClick={(item) => {
          window.location.href = `/atas/${item.id}`;
        }}
        actions={(item) => (
          <a href={`/atas/${item.id}`}>
            <Button variant="ghost" size="sm">Detalhes</Button>
          </a>
        )}
      />
    </div>
  );
}
