'use client';

import React, { useState, useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface BoletimItem {
  disciplina: string;
  b1: number;
  b2: number;
  b3: number;
  b4: number;
  media: number;
  resultado: string;
}

const resultadoVariant: Record<string, 'success' | 'warning' | 'destructive' | 'default'> = {
  Aprovado: 'success',
  Recuperacao: 'warning',
  Reprovado: 'destructive',
};

export default function BoletinsPage() {
  const { data, isLoading, error, execute } = useApi<BoletimItem[]>('/notas/boletins');
  const [aluno, setAluno] = useState('');
  const [periodo, setPeriodo] = useState('');

  useEffect(() => { execute(); }, [execute]);

  if (isLoading) return <div className="p-6">Carregando...</div>;
  if (error) return <div className="p-6 text-red-500">Erro: {error}</div>;

  return (
    <div>
      <PageHeader
        title="Boletins"
        description="Emissao de boletins escolares"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Notas', href: '/notas' },
          { label: 'Boletins' },
        ]}
        actions={
          <Button>Imprimir Boletim</Button>
        }
      />

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Selecionar Aluno</CardTitle>
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
            <Select
              id="periodo"
              label="Periodo"
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
              placeholder="Selecione..."
              options={[
                { value: '2024.1', label: '2024.1' },
                { value: '2024.2', label: '2024.2' },
                { value: '2023.1', label: '2023.1' },
                { value: '2023.2', label: '2023.2' },
              ]}
            />
            <div className="flex items-end">
              <Button>Buscar</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Boletim</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">Disciplina</th>
                  <th className="text-center py-3 px-2">1o Bim</th>
                  <th className="text-center py-3 px-2">2o Bim</th>
                  <th className="text-center py-3 px-2">3o Bim</th>
                  <th className="text-center py-3 px-2">4o Bim</th>
                  <th className="text-center py-3 px-2">Media</th>
                  <th className="text-center py-3 px-2">Resultado</th>
                </tr>
              </thead>
              <tbody>
                {(data || []).map((item) => (
                  <tr key={item.disciplina} className="border-b">
                    <td className="py-3 px-2 font-medium">{item.disciplina}</td>
                    <td className="text-center py-3 px-2">{item.b1?.toFixed(1)}</td>
                    <td className="text-center py-3 px-2">{item.b2?.toFixed(1)}</td>
                    <td className="text-center py-3 px-2">{item.b3?.toFixed(1)}</td>
                    <td className="text-center py-3 px-2">{item.b4?.toFixed(1)}</td>
                    <td className="text-center py-3 px-2 font-bold">{item.media?.toFixed(1)}</td>
                    <td className="text-center py-3 px-2">
                      <Badge variant={resultadoVariant[item.resultado] || 'default'}>{item.resultado}</Badge>
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
