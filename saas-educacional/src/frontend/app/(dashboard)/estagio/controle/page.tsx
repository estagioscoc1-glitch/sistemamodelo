'use client';

import React, { useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DataTable, type Column } from '@/components/shared/DataTable';

interface ControleEstagio {
  id: string;
  aluno: string;
  empresa: string;
  supervisor: string;
  horasRealizadas: number;
  horasTotal: number;
  percentual: number;
  status: string;
  [key: string]: unknown;
}

const statusVariant: Record<string, 'success' | 'secondary' | 'warning' | 'destructive' | 'default'> = {
  'Em dia': 'success',
  Atrasado: 'warning',
  Irregular: 'destructive',
  Concluido: 'secondary',
};

const columns: Column<ControleEstagio>[] = [
  { key: 'aluno', header: 'Aluno', sortable: true },
  { key: 'empresa', header: 'Empresa', sortable: true },
  { key: 'supervisor', header: 'Supervisor' },
  { key: 'horasRealizadas', header: 'Horas Realizadas' },
  { key: 'horasTotal', header: 'Horas Total' },
  { key: 'percentual', header: 'Progresso', render: (item) => <span>{item.percentual}%</span> },
  {
    key: 'status',
    header: 'Status',
    render: (item) => (
      <Badge variant={statusVariant[item.status] || 'default'}>{item.status}</Badge>
    ),
  },
];

export default function ControleEstagioPage() {
  const { data, isLoading, error, execute } = useApi<ControleEstagio[]>('/estagios/controle');

  useEffect(() => { execute(); }, [execute]);

  if (isLoading) return <div className="p-6">Carregando...</div>;
  if (error) return <div className="p-6 text-red-500">Erro: {error}</div>;

  return (
    <div>
      <PageHeader
        title="Controle de Estagio"
        description="Acompanhamento de horas e atividades"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Estagio', href: '/estagio' },
          { label: 'Controle' },
        ]}
      />

      <DataTable
        data={data || []}
        columns={columns}
        searchKey="aluno"
        searchPlaceholder="Buscar por aluno..."
        actions={(item) => (
          <a href={`/estagio/${item.id}`}>
            <Button variant="ghost" size="sm">Detalhes</Button>
          </a>
        )}
      />
    </div>
  );
}
