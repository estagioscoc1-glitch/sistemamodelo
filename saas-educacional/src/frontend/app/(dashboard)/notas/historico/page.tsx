'use client';

import React, { useState, useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { DataTable, type Column } from '@/components/shared/DataTable';

interface HistoricoNota {
  id: string;
  aluno: string;
  disciplina: string;
  turma: string;
  periodo: string;
  nota: number;
  resultado: string;
  ano: string;
  [key: string]: unknown;
}

const resultadoVariant: Record<string, 'success' | 'secondary' | 'warning' | 'destructive' | 'default'> = {
  Aprovado: 'success',
  Reprovado: 'destructive',
  Recuperacao: 'warning',
  Cursando: 'secondary',
};

const columns: Column<HistoricoNota>[] = [
  { key: 'disciplina', header: 'Disciplina', sortable: true },
  { key: 'turma', header: 'Turma' },
  { key: 'periodo', header: 'Periodo', sortable: true },
  { key: 'nota', header: 'Nota', render: (item) => <span>{item.nota?.toFixed(1)}</span> },
  {
    key: 'resultado',
    header: 'Resultado',
    render: (item) => (
      <Badge variant={resultadoVariant[item.resultado] || 'default'}>{item.resultado}</Badge>
    ),
  },
];

export default function HistoricoNotasPage() {
  const { data, isLoading, error, execute } = useApi<HistoricoNota[]>('/notas/historico');
  const [aluno, setAluno] = useState('');

  useEffect(() => { execute(); }, [execute]);

  if (isLoading) return <div className="p-6">Carregando...</div>;
  if (error) return <div className="p-6 text-red-500">Erro: {error}</div>;

  return (
    <div>
      <PageHeader
        title="Historico de Notas"
        description="Consulta de historico academico"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Notas', href: '/notas' },
          { label: 'Historico' },
        ]}
      />

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Buscar Aluno</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Input
              id="aluno"
              label="Nome do Aluno"
              value={aluno}
              onChange={(e) => setAluno(e.target.value)}
              placeholder="Digite o nome do aluno..."
            />
            <div className="flex items-end">
              <Button>Buscar</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <DataTable
        data={data || []}
        columns={columns}
        searchKey="disciplina"
        searchPlaceholder="Buscar por disciplina..."
      />
    </div>
  );
}
