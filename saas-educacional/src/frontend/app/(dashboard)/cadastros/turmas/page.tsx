'use client';

import React, { useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DataTable, type Column } from '@/components/shared/DataTable';

interface Turma {
  id: string;
  nome: string;
  curso: string;
  periodo: string;
  turno: string;
  vagas: number;
  alunos: number;
  status: string;
  [key: string]: unknown;
}

const columns: Column<Turma>[] = [
  { key: 'nome', header: 'Turma', sortable: true },
  { key: 'curso', header: 'Curso', sortable: true },
  { key: 'periodo', header: 'Periodo' },
  { key: 'turno', header: 'Turno' },
  {
    key: 'alunos',
    header: 'Alunos/Vagas',
    render: (item) => <span>{item.alunos}/{item.vagas}</span>,
  },
  {
    key: 'status',
    header: 'Status',
    render: (item) => (
      <Badge variant={item.status === 'Ativa' ? 'success' : 'secondary'}>{item.status}</Badge>
    ),
  },
];

export default function TurmasPage() {
  const { data, isLoading, error, execute } = useApi<Turma[]>('/cadastros/turmas');

  useEffect(() => { execute(); }, [execute]);

  if (isLoading) return <div className="p-6">Carregando...</div>;
  if (error) return <div className="p-6 text-red-500">Erro: {error}</div>;

  return (
    <div>
      <PageHeader
        title="Turmas"
        description="Gerenciamento de turmas"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Cadastros', href: '/cadastros' },
          { label: 'Turmas' },
        ]}
        actions={
          <a href="/cadastros/turmas/novo">
            <Button>Nova Turma</Button>
          </a>
        }
      />

      <DataTable
        data={data || []}
        columns={columns}
        searchKey="nome"
        searchPlaceholder="Buscar turmas..."
        onRowClick={(item) => {
          window.location.href = `/cadastros/turmas/${item.id}`;
        }}
        actions={(item) => (
          <a href={`/cadastros/turmas/${item.id}`}>
            <Button variant="ghost" size="sm">Editar</Button>
          </a>
        )}
      />
    </div>
  );
}
