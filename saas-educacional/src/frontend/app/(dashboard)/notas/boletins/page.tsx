'use client';

import React, { useState } from 'react';
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

const mockBoletim: BoletimItem[] = [
  { disciplina: 'Matematica', b1: 8.5, b2: 7.0, b3: 8.0, b4: 9.0, media: 8.1, resultado: 'Aprovado' },
  { disciplina: 'Portugues', b1: 7.0, b2: 6.5, b3: 7.5, b4: 8.0, media: 7.3, resultado: 'Aprovado' },
  { disciplina: 'Historia', b1: 9.0, b2: 8.5, b3: 9.0, b4: 8.0, media: 8.6, resultado: 'Aprovado' },
  { disciplina: 'Fisica', b1: 5.0, b2: 4.5, b3: 6.0, b4: 5.5, media: 5.3, resultado: 'Recuperacao' },
  { disciplina: 'Quimica', b1: 7.5, b2: 7.0, b3: 6.5, b4: 7.0, media: 7.0, resultado: 'Aprovado' },
  { disciplina: 'Biologia', b1: 8.0, b2: 8.5, b3: 9.0, b4: 8.5, media: 8.5, resultado: 'Aprovado' },
];

const resultadoVariant: Record<string, 'success' | 'warning' | 'destructive' | 'default'> = {
  Aprovado: 'success',
  Recuperacao: 'warning',
  Reprovado: 'destructive',
};

export default function BoletinsPage() {
  const [aluno, setAluno] = useState('');
  const [periodo, setPeriodo] = useState('');

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
          <CardTitle>Boletim - Ana Silva Santos - 2024.1</CardTitle>
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
                {mockBoletim.map((item) => (
                  <tr key={item.disciplina} className="border-b">
                    <td className="py-3 px-2 font-medium">{item.disciplina}</td>
                    <td className="text-center py-3 px-2">{item.b1.toFixed(1)}</td>
                    <td className="text-center py-3 px-2">{item.b2.toFixed(1)}</td>
                    <td className="text-center py-3 px-2">{item.b3.toFixed(1)}</td>
                    <td className="text-center py-3 px-2">{item.b4.toFixed(1)}</td>
                    <td className="text-center py-3 px-2 font-bold">{item.media.toFixed(1)}</td>
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
