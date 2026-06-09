'use client';

import React, { useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DataTable, type Column } from '@/components/shared/DataTable';

interface Disciplina {
  id: string;
  nome: string;
  codigo: string;
  cargaHoraria: string;
  curso: string;
  periodo: string;
  status: string;
  [key: string]: unknown;
}

const columns: Column<Disciplina>[] = [
  { key: 'codigo', header: 'Codigo', sortable: true },
  { key: 'nome', header: 'Nome da Disciplina', sortable: true },
  { key: 'cargaHoraria', header: 'Carga Horaria' },
  { key: 'curso', header: 'Curso' },
  { key: 'periodo', header: 'Periodo' },
  {
    key: 'status',
    header: 'Status',
    render: (item) => (
      <Badge variant={item.status === 'Ativa' ? 'success' : 'secondary'}>{item.status}</Badge>
    ),
  },
];

export default function DisciplinasPage() {
  const { data, isLoading, error, execute } = useApi<Disciplina[]>('/cadastros/disciplinas');

  useEffect(() => { execute(); }, [execute]);

  if (isLoading) return <div className="p-6">Carregando...</div>;
  if (error) return <div className="p-6 text-red-500">Erro: {error}</div>;

  return (
    <div>
      <PageHeader
        title="Disciplinas"
        description="Gerenciamento de disciplinas"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Cadastros', href: '/cadastros' },
          { label: 'Disciplinas' },
        ]}
        actions={
          <a href="/cadastros/disciplinas/novo">
            <Button>Nova Disciplina</Button>
          </a>
        }
      />

      <DataTable
        data={data || []}
        columns={columns}
        searchKey="nome"
        searchPlaceholder="Buscar disciplinas..."
        onRowClick={(item) => {
          window.location.href = `/cadastros/disciplinas/${item.id}`;
        }}
        actions={(item) => (
          <div className="flex gap-2">
            <a href={`/cadastros/disciplinas/${item.id}`}>
              <Button variant="ghost" size="sm">Editar</Button>
            </a>
          </div>
        )}
      />
    </div>
  );
}
