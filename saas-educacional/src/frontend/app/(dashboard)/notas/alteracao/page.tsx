'use client';

import React, { useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DataTable, type Column } from '@/components/shared/DataTable';
import { useToast } from '@/components/ui/Toast';

interface Alteracao {
  id: string;
  aluno: string;
  disciplina: string;
  turma: string;
  notaAnterior: number;
  notaNova: number;
  motivo: string;
  data: string;
  status: string;
  [key: string]: unknown;
}

const statusVariant: Record<string, 'success' | 'secondary' | 'warning' | 'destructive' | 'default'> = {
  Aprovada: 'success',
  Pendente: 'warning',
  Rejeitada: 'destructive',
};

const columns: Column<Alteracao>[] = [
  { key: 'aluno', header: 'Aluno', sortable: true },
  { key: 'disciplina', header: 'Disciplina', sortable: true },
  { key: 'turma', header: 'Turma' },
  { key: 'notaAnterior', header: 'Nota Anterior', render: (item) => <span>{item.notaAnterior?.toFixed(1)}</span> },
  { key: 'notaNova', header: 'Nota Nova', render: (item) => <span>{item.notaNova?.toFixed(1)}</span> },
  { key: 'motivo', header: 'Motivo' },
  { key: 'data', header: 'Data' },
  {
    key: 'status',
    header: 'Status',
    render: (item) => (
      <Badge variant={statusVariant[item.status] || 'default'}>{item.status}</Badge>
    ),
  },
];

export default function AlteracaoNotasPage() {
  const { addToast } = useToast();
  const { data, isLoading, error, execute } = useApi<Alteracao[]>('/notas/alteracao');

  useEffect(() => { execute(); }, [execute]);

  const handleAprovar = () => {
    addToast({ title: 'Alteracao aprovada com sucesso!', variant: 'success' });
  };

  if (isLoading) return <div className="p-6">Carregando...</div>;
  if (error) return <div className="p-6 text-red-500">Erro: {error}</div>;

  return (
    <div>
      <PageHeader
        title="Alteracao de Notas"
        description="Solicitacoes de alteracao de notas"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Notas', href: '/notas' },
          { label: 'Alteracao' },
        ]}
      />

      <DataTable
        data={data || []}
        columns={columns}
        searchKey="aluno"
        searchPlaceholder="Buscar por aluno..."
        actions={(item) => (
          <div className="flex gap-2">
            {item.status === 'Pendente' && (
              <Button variant="ghost" size="sm" onClick={() => handleAprovar()}>Aprovar</Button>
            )}
          </div>
        )}
      />
    </div>
  );
}
