'use client';

import React, { useState, useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { DataTable, type Column } from '@/components/shared/DataTable';
import { useToast } from '@/components/ui/Toast';

interface Fechamento {
  id: string;
  disciplina: string;
  turma: string;
  periodo: string;
  totalAlunos: number;
  notasLancadas: number;
  status: string;
  [key: string]: unknown;
}

const statusVariant: Record<string, 'success' | 'secondary' | 'warning' | 'destructive' | 'default'> = {
  Fechado: 'success',
  Pendente: 'warning',
  Parcial: 'secondary',
};

const columns: Column<Fechamento>[] = [
  { key: 'disciplina', header: 'Disciplina', sortable: true },
  { key: 'turma', header: 'Turma', sortable: true },
  { key: 'periodo', header: 'Periodo' },
  { key: 'totalAlunos', header: 'Total Alunos' },
  { key: 'notasLancadas', header: 'Notas Lancadas' },
  {
    key: 'status',
    header: 'Status',
    render: (item) => (
      <Badge variant={statusVariant[item.status] || 'default'}>{item.status}</Badge>
    ),
  },
];

export default function FechamentoNotasPage() {
  const { addToast } = useToast();
  const { data, isLoading, error, execute } = useApi<Fechamento[]>('/notas/fechamento');
  const [periodo, setPeriodo] = useState('');

  useEffect(() => { execute(); }, [execute]);

  const handleFechar = () => {
    addToast({ title: 'Periodo fechado com sucesso!', variant: 'success' });
  };

  if (isLoading) return <div className="p-6">Carregando...</div>;
  if (error) return <div className="p-6 text-red-500">Erro: {error}</div>;

  return (
    <div>
      <PageHeader
        title="Fechamento de Notas"
        description="Fechar periodo de lancamento de notas"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Notas', href: '/notas' },
          { label: 'Fechamento' },
        ]}
      />

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Select
              id="periodo"
              label="Periodo"
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
              placeholder="Selecione o periodo..."
              options={[
                { value: '1bim', label: '1o Bimestre' },
                { value: '2bim', label: '2o Bimestre' },
                { value: '3bim', label: '3o Bimestre' },
                { value: '4bim', label: '4o Bimestre' },
              ]}
            />
            <div className="flex items-end">
              <Button onClick={handleFechar}>Fechar Periodo Selecionado</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <DataTable
        data={data || []}
        columns={columns}
        searchKey="disciplina"
        searchPlaceholder="Buscar por disciplina..."
        actions={(item) => (
          <div className="flex gap-2">
            {item.status !== 'Fechado' && (
              <Button variant="ghost" size="sm" onClick={handleFechar}>Fechar</Button>
            )}
          </div>
        )}
      />
    </div>
  );
}
