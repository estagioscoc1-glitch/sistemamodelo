'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
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

const mockHistorico: HistoricoNota[] = [
  { id: '1', aluno: 'Ana Silva Santos', disciplina: 'Matematica I', turma: 'ADM-2023-1A', periodo: '2023.1', nota: 8.5, resultado: 'Aprovado', ano: '2023' },
  { id: '2', aluno: 'Ana Silva Santos', disciplina: 'Portugues I', turma: 'ADM-2023-1A', periodo: '2023.1', nota: 7.0, resultado: 'Aprovado', ano: '2023' },
  { id: '3', aluno: 'Ana Silva Santos', disciplina: 'Matematica II', turma: 'ADM-2023-2A', periodo: '2023.2', nota: 6.5, resultado: 'Aprovado', ano: '2023' },
  { id: '4', aluno: 'Ana Silva Santos', disciplina: 'Administracao I', turma: 'ADM-2024-1A', periodo: '2024.1', nota: 9.0, resultado: 'Aprovado', ano: '2024' },
  { id: '5', aluno: 'Ana Silva Santos', disciplina: 'Economia', turma: 'ADM-2024-1A', periodo: '2024.1', nota: 4.5, resultado: 'Reprovado', ano: '2024' },
  { id: '6', aluno: 'Ana Silva Santos', disciplina: 'Estatistica', turma: 'ADM-2024-1A', periodo: '2024.1', nota: 5.5, resultado: 'Recuperacao', ano: '2024' },
];

const columns: Column<HistoricoNota>[] = [
  { key: 'disciplina', header: 'Disciplina', sortable: true },
  { key: 'turma', header: 'Turma' },
  { key: 'periodo', header: 'Periodo', sortable: true },
  { key: 'nota', header: 'Nota', render: (item) => <span>{item.nota.toFixed(1)}</span> },
  {
    key: 'resultado',
    header: 'Resultado',
    render: (item) => (
      <Badge variant={resultadoVariant[item.resultado] || 'default'}>{item.resultado}</Badge>
    ),
  },
];

export default function HistoricoNotasPage() {
  const [aluno, setAluno] = useState('');

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
        data={mockHistorico}
        columns={columns}
        searchKey="disciplina"
        searchPlaceholder="Buscar por disciplina..."
      />
    </div>
  );
}
