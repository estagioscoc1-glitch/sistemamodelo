'use client';

import React, { useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DataTable, type Column } from '@/components/shared/DataTable';
import { useToast } from '@/components/ui/Toast';

interface Acompanhamento {
  id: string;
  aluno: string;
  empresa: string;
  ultimaVisita: string;
  proximaVisita: string;
  avaliacaoEmpresa: string;
  avaliacaoAluno: string;
  observacoes: string;
  [key: string]: unknown;
}

const avaliacaoVariant: Record<string, 'success' | 'secondary' | 'warning' | 'destructive' | 'default'> = {
  Excelente: 'success',
  Bom: 'default',
  Regular: 'warning',
  Insuficiente: 'destructive',
  Pendente: 'secondary',
};

const columns: Column<Acompanhamento>[] = [
  { key: 'aluno', header: 'Aluno', sortable: true },
  { key: 'empresa', header: 'Empresa' },
  { key: 'ultimaVisita', header: 'Ultima Visita' },
  { key: 'proximaVisita', header: 'Proxima Visita' },
  {
    key: 'avaliacaoEmpresa',
    header: 'Avaliacao Empresa',
    render: (item) => (
      <Badge variant={avaliacaoVariant[item.avaliacaoEmpresa] || 'default'}>{item.avaliacaoEmpresa}</Badge>
    ),
  },
  {
    key: 'avaliacaoAluno',
    header: 'Avaliacao Aluno',
    render: (item) => (
      <Badge variant={avaliacaoVariant[item.avaliacaoAluno] || 'default'}>{item.avaliacaoAluno}</Badge>
    ),
  },
];

export default function AcompanhamentoEstagioPage() {
  const { addToast } = useToast();
  const { data, isLoading, error, execute } = useApi<Acompanhamento[]>('/estagios/acompanhamento');

  useEffect(() => { execute(); }, [execute]);

  if (isLoading) return <div className="p-6">Carregando...</div>;
  if (error) return <div className="p-6 text-red-500">Erro: {error}</div>;

  return (
    <div>
      <PageHeader
        title="Acompanhamento de Estagio"
        description="Registro de visitas e avaliacoes"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Estagio', href: '/estagio' },
          { label: 'Acompanhamento' },
        ]}
        actions={
          <Button onClick={() => addToast({ title: 'Registro salvo com sucesso!', variant: 'success' })}>
            Registrar Visita
          </Button>
        }
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
