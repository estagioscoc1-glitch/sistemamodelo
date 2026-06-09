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

interface Recuperacao {
  id: string;
  aluno: string;
  disciplina: string;
  turma: string;
  notaOriginal: number;
  notaRecuperacao: number | null;
  periodo: string;
  status: string;
  [key: string]: unknown;
}

const statusVariant: Record<string, 'success' | 'secondary' | 'warning' | 'destructive' | 'default'> = {
  Aprovado: 'success',
  Pendente: 'warning',
  Reprovado: 'destructive',
  'Em Andamento': 'secondary',
};

const columns: Column<Recuperacao>[] = [
  { key: 'aluno', header: 'Aluno', sortable: true },
  { key: 'disciplina', header: 'Disciplina', sortable: true },
  { key: 'turma', header: 'Turma' },
  { key: 'notaOriginal', header: 'Nota Original', render: (item) => <span>{item.notaOriginal?.toFixed(1)}</span> },
  { key: 'notaRecuperacao', header: 'Nota Recuperacao', render: (item) => <span>{item.notaRecuperacao !== null ? item.notaRecuperacao?.toFixed(1) : '-'}</span> },
  { key: 'periodo', header: 'Periodo' },
  {
    key: 'status',
    header: 'Status',
    render: (item) => (
      <Badge variant={statusVariant[item.status] || 'default'}>{item.status}</Badge>
    ),
  },
];

export default function RecuperacaoPage() {
  const { addToast } = useToast();
  const { data, isLoading, error, execute } = useApi<Recuperacao[]>('/notas/recuperacao');
  const [periodo, setPeriodo] = useState('');

  useEffect(() => { execute(); }, [execute]);

  if (isLoading) return <div className="p-6">Carregando...</div>;
  if (error) return <div className="p-6 text-red-500">Erro: {error}</div>;

  return (
    <div>
      <PageHeader
        title="Recuperacao"
        description="Gerenciamento de provas de recuperacao"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Notas', href: '/notas' },
          { label: 'Recuperacao' },
        ]}
        actions={
          <Button onClick={() => addToast({ title: 'Notas de recuperacao lancadas!', variant: 'success' })}>
            Lancar Notas
          </Button>
        }
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
              placeholder="Selecione..."
              options={[
                { value: '1bim', label: '1o Bimestre' },
                { value: '2bim', label: '2o Bimestre' },
                { value: '3bim', label: '3o Bimestre' },
                { value: '4bim', label: '4o Bimestre' },
              ]}
            />
            <div className="flex items-end">
              <Button variant="outline">Filtrar</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <DataTable
        data={data || []}
        columns={columns}
        searchKey="aluno"
        searchPlaceholder="Buscar por aluno..."
        actions={(item) => (
          <div className="flex gap-2">
            {item.status === 'Pendente' && (
              <Button variant="ghost" size="sm">Lancar Nota</Button>
            )}
          </div>
        )}
      />
    </div>
  );
}
