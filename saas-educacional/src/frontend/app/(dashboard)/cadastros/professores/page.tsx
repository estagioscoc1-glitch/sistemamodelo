'use client';

import React, { useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DataTable, type Column } from '@/components/shared/DataTable';

interface Professor {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  departamento: string;
  titulacao: string;
  status: string;
  [key: string]: unknown;
}

const columns: Column<Professor>[] = [
  { key: 'nome', header: 'Nome', sortable: true },
  { key: 'cpf', header: 'CPF' },
  { key: 'email', header: 'E-mail' },
  { key: 'departamento', header: 'Departamento', sortable: true },
  { key: 'titulacao', header: 'Titulacao' },
  {
    key: 'status',
    header: 'Status',
    render: (item) => (
      <Badge variant={item.status === 'Ativo' ? 'success' : 'warning'}>{item.status}</Badge>
    ),
  },
];

export default function ProfessoresPage() {
  const { data, isLoading, error, execute } = useApi<Professor[]>('/cadastros/professores');

  useEffect(() => { execute(); }, [execute]);

  if (isLoading) return <div className="p-6">Carregando...</div>;
  if (error) return <div className="p-6 text-red-500">Erro: {error}</div>;

  return (
    <div>
      <PageHeader
        title="Professores"
        description="Gerenciamento de professores"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Cadastros', href: '/cadastros' },
          { label: 'Professores' },
        ]}
        actions={
          <a href="/cadastros/professores/novo">
            <Button>Novo Professor</Button>
          </a>
        }
      />

      <DataTable
        data={data || []}
        columns={columns}
        searchKey="nome"
        searchPlaceholder="Buscar professores..."
        onRowClick={(item) => {
          window.location.href = `/cadastros/professores/${item.id}`;
        }}
        actions={(item) => (
          <div className="flex gap-2">
            <a href={`/cadastros/professores/${item.id}`}>
              <Button variant="ghost" size="sm">Editar</Button>
            </a>
          </div>
        )}
      />
    </div>
  );
}
