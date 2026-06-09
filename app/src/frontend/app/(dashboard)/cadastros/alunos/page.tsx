'use client';

import React, { useEffect } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DataTable, type Column } from '@/components/shared/DataTable';
import { useApi } from '@/hooks/useApi';

interface Aluno {
  id: string;
  nome: string;
  matricula: string;
  cpf: string;
  email: string;
  curso: string;
  status: string;
  [key: string]: unknown;
}

const columns: Column<Aluno>[] = [
  { key: 'matricula', header: 'Matricula', sortable: true },
  { key: 'nome', header: 'Nome', sortable: true },
  { key: 'cpf', header: 'CPF' },
  { key: 'curso', header: 'Curso', sortable: true },
  {
    key: 'status',
    header: 'Status',
    render: (item) => (
      <Badge variant={item.status === 'Ativo' ? 'success' : item.status === 'Trancado' ? 'warning' : 'secondary'}>
        {item.status}
      </Badge>
    ),
  },
];

export default function AlunosPage() {
  const { data, isLoading, error, execute } = useApi<Aluno[]>('/cadastros/alunos');

  useEffect(() => {
    execute();
  }, [execute]);

  if (isLoading) return <div className="p-8 text-center">Carregando...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Erro: {error}</div>;

  return (
    <div>
      <PageHeader
        title="Alunos"
        description="Gerenciamento de alunos"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Cadastros', href: '/cadastros' },
          { label: 'Alunos' },
        ]}
        actions={
          <a href="/cadastros/alunos/novo">
            <Button>Novo Aluno</Button>
          </a>
        }
      />

      <DataTable
        data={data || []}
        columns={columns}
        searchKey="nome"
        searchPlaceholder="Buscar alunos..."
        onRowClick={(item) => {
          window.location.href = `/cadastros/alunos/${item.id}`;
        }}
        actions={(item) => (
          <a href={`/cadastros/alunos/${item.id}`}>
            <Button variant="ghost" size="sm">Editar</Button>
          </a>
        )}
      />
    </div>
  );
}
