'use client';

import React, { useEffect } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DataTable, type Column } from '@/components/shared/DataTable';
import { useApi } from '@/hooks/useApi';

interface Curso {
  id: string;
  nome: string;
  codigo: string;
  duracao: string;
  modalidade: string;
  status: string;
  [key: string]: unknown;
}

const columns: Column<Curso>[] = [
  { key: 'codigo', header: 'Codigo', sortable: true },
  { key: 'nome', header: 'Nome do Curso', sortable: true },
  { key: 'duracao', header: 'Duracao' },
  { key: 'modalidade', header: 'Modalidade' },
  {
    key: 'status',
    header: 'Status',
    render: (item) => (
      <Badge variant={item.status === 'Ativo' ? 'success' : 'secondary'}>{item.status}</Badge>
    ),
  },
];

export default function CursosPage() {
  const { data, isLoading, error, execute } = useApi<Curso[]>('/cadastros/cursos');

  useEffect(() => {
    execute();
  }, [execute]);

  if (isLoading) return <div className="p-8 text-center">Carregando...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Erro: {error}</div>;

  return (
    <div>
      <PageHeader
        title="Cursos"
        description="Gerenciamento de cursos"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Cadastros', href: '/cadastros' },
          { label: 'Cursos' },
        ]}
        actions={
          <a href="/cadastros/cursos/novo">
            <Button>Novo Curso</Button>
          </a>
        }
      />

      <DataTable
        data={data || []}
        columns={columns}
        searchKey="nome"
        searchPlaceholder="Buscar cursos..."
        onRowClick={(item) => {
          window.location.href = `/cadastros/cursos/${item.id}`;
        }}
        actions={(item) => (
          <div className="flex gap-2">
            <a href={`/cadastros/cursos/${item.id}`}>
              <Button variant="ghost" size="sm">Editar</Button>
            </a>
          </div>
        )}
      />
    </div>
  );
}
