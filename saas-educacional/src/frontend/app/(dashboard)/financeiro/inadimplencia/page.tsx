'use client';

import React, { useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { DataTable, type Column } from '@/components/shared/DataTable';

interface InadimplenciaData {
  totalInadimplentes: number;
  valorAberto: string;
  taxaInadimplencia: string;
  maiorAtraso: number;
  inadimplentes: Inadimplente[];
}

interface Inadimplente {
  id: string;
  aluno: string;
  curso: string;
  parcelasVencidas: number;
  valorTotal: string;
  diasAtraso: number;
  ultimoContato: string;
  [key: string]: unknown;
}

const columns: Column<Inadimplente>[] = [
  { key: 'aluno', header: 'Aluno', sortable: true },
  { key: 'curso', header: 'Curso' },
  { key: 'parcelasVencidas', header: 'Parcelas Vencidas' },
  { key: 'valorTotal', header: 'Valor Total' },
  {
    key: 'diasAtraso',
    header: 'Dias em Atraso',
    sortable: true,
    render: (item) => (
      <Badge variant={item.diasAtraso > 90 ? 'destructive' : item.diasAtraso > 30 ? 'warning' : 'default'}>
        {item.diasAtraso} dias
      </Badge>
    ),
  },
  { key: 'ultimoContato', header: 'Ultimo Contato' },
];

export default function InadimplenciaPage() {
  const { data, isLoading, error, execute } = useApi<InadimplenciaData>('/financeiro/inadimplencia');

  useEffect(() => { execute(); }, [execute]);

  if (isLoading) return <div className="p-6">Carregando...</div>;
  if (error) return <div className="p-6 text-red-500">Erro: {error}</div>;

  return (
    <div>
      <PageHeader
        title="Inadimplencia"
        description="Controle de alunos inadimplentes"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Financeiro', href: '/financeiro' },
          { label: 'Inadimplencia' },
        ]}
      />

      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Inadimplentes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-destructive">{data?.totalInadimplentes || 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Valor em Aberto</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data?.valorAberto || 'R$ 0,00'}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Taxa Inadimplencia</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data?.taxaInadimplencia || '0%'}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Maior Atraso</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-destructive">{data?.maiorAtraso || 0} dias</p>
          </CardContent>
        </Card>
      </div>

      <DataTable
        data={data?.inadimplentes || []}
        columns={columns}
        searchKey="aluno"
        searchPlaceholder="Buscar por aluno..."
        actions={() => (
          <div className="flex gap-2">
            <a href="/financeiro/renegociacoes">
              <Button variant="ghost" size="sm">Renegociar</Button>
            </a>
          </div>
        )}
      />
    </div>
  );
}
