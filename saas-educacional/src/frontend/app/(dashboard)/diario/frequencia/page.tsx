'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useToast } from '@/components/ui/Toast';

interface AlunoFrequencia {
  id: string;
  nome: string;
  matricula: string;
  totalAulas: number;
  presencas: number;
  faltas: number;
  percentual: number;
}

const mockFrequencia: AlunoFrequencia[] = [
  { id: '1', nome: 'Ana Silva Santos', matricula: '2024001', totalAulas: 40, presencas: 38, faltas: 2, percentual: 95.0 },
  { id: '2', nome: 'Joao Pedro Oliveira', matricula: '2024002', totalAulas: 40, presencas: 35, faltas: 5, percentual: 87.5 },
  { id: '3', nome: 'Maria Fernandes Costa', matricula: '2024003', totalAulas: 40, presencas: 40, faltas: 0, percentual: 100.0 },
  { id: '4', nome: 'Carlos Eduardo Lima', matricula: '2024004', totalAulas: 40, presencas: 28, faltas: 12, percentual: 70.0 },
  { id: '5', nome: 'Juliana Almeida', matricula: '2024005', totalAulas: 40, presencas: 36, faltas: 4, percentual: 90.0 },
  { id: '6', nome: 'Pedro Santos', matricula: '2024006', totalAulas: 40, presencas: 32, faltas: 8, percentual: 80.0 },
  { id: '7', nome: 'Fernanda Lima', matricula: '2024007', totalAulas: 40, presencas: 30, faltas: 10, percentual: 75.0 },
];

export default function FrequenciaPage() {
  const { addToast } = useToast();
  const [turma, setTurma] = useState('');
  const [disciplina, setDisciplina] = useState('');

  const getFrequenciaVariant = (percentual: number) => {
    if (percentual >= 90) return 'success';
    if (percentual >= 75) return 'warning';
    return 'destructive';
  };

  return (
    <div>
      <PageHeader
        title="Controle de Frequencia"
        description="Acompanhamento de frequencia e faltas"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Diario', href: '/diario' },
          { label: 'Frequencia' },
        ]}
        actions={
          <Button onClick={() => addToast({ title: 'Relatorio de frequencia gerado!', variant: 'success' })}>
            Exportar Relatorio
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
              id="turma"
              label="Turma"
              value={turma}
              onChange={(e) => setTurma(e.target.value)}
              placeholder="Selecione a turma..."
              options={[
                { value: 'ADM-2024-1A', label: 'ADM-2024-1A' },
                { value: 'SI-2024-1A', label: 'SI-2024-1A' },
                { value: 'ENF-2024-1A', label: 'ENF-2024-1A' },
                { value: 'DIR-2023-2A', label: 'DIR-2023-2A' },
              ]}
            />
            <Select
              id="disciplina"
              label="Disciplina"
              value={disciplina}
              onChange={(e) => setDisciplina(e.target.value)}
              placeholder="Selecione a disciplina..."
              options={[
                { value: 'mat', label: 'Matematica' },
                { value: 'port', label: 'Portugues' },
                { value: 'hist', label: 'Historia' },
                { value: 'fis', label: 'Fisica' },
              ]}
            />
            <div className="flex items-end">
              <Button variant="outline">Filtrar</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequencia - ADM-2024-1A - Matematica</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">Aluno</th>
                  <th className="text-center py-3 px-2">Matricula</th>
                  <th className="text-center py-3 px-2">Total Aulas</th>
                  <th className="text-center py-3 px-2">Presencas</th>
                  <th className="text-center py-3 px-2">Faltas</th>
                  <th className="text-center py-3 px-2">Frequencia</th>
                </tr>
              </thead>
              <tbody>
                {mockFrequencia.map((aluno) => (
                  <tr key={aluno.id} className="border-b">
                    <td className="py-3 px-2 font-medium">{aluno.nome}</td>
                    <td className="text-center py-3 px-2">{aluno.matricula}</td>
                    <td className="text-center py-3 px-2">{aluno.totalAulas}</td>
                    <td className="text-center py-3 px-2">{aluno.presencas}</td>
                    <td className="text-center py-3 px-2">{aluno.faltas}</td>
                    <td className="text-center py-3 px-2">
                      <Badge variant={getFrequenciaVariant(aluno.percentual)}>
                        {aluno.percentual.toFixed(1)}%
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
