'use client';

import React, { useState, useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { DataTable, type Column } from '@/components/shared/DataTable';

interface Media {
  id: string;
  disciplina: string;
  turma: string;
  periodo: string;
  mediaGeral: number;
  aprovados: number;
  reprovados: number;
  recuperacao: number;
  [key: string]: unknown;
}

const columns: Column<Media>[] = [
  { key: 'disciplina', header: 'Disciplina', sortable: true },
  { key: 'turma', header: 'Turma', sortable: true },
  { key: 'periodo', header: 'Periodo' },
  { key: 'mediaGeral', header: 'Media Geral', render: (item) => <span className="font-bold">{item.mediaGeral?.toFixed(1)}</span> },
  { key: 'aprovados', header: 'Aprovados', render: (item) => <Badge variant="success">{item.aprovados}</Badge> },
  { key: 'reprovados', header: 'Reprovados', render: (item) => <Badge variant="destructive">{item.reprovados}</Badge> },
  { key: 'recuperacao', header: 'Recuperacao', render: (item) => <Badge variant="warning">{item.recuperacao}</Badge> },
];

export default function MediasPage() {
  const { data, isLoading, error, execute } = useApi<Media[]>('/notas/medias');
  const [periodo, setPeriodo] = useState('');

  useEffect(() => { execute(); }, [execute]);

  if (isLoading) return <div className="p-6">Carregando...</div>;
  if (error) return <div className="p-6 text-red-500">Erro: {error}</div>;

  return (
    <div>
      <PageHeader
        title="Medias"
        description="Consulta de medias por disciplina e turma"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Notas', href: '/notas' },
          { label: 'Medias' },
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
              placeholder="Selecione..."
              options={[
                { value: '2024.1', label: '2024.1' },
                { value: '2024.2', label: '2024.2' },
                { value: '2023.1', label: '2023.1' },
                { value: '2023.2', label: '2023.2' },
              ]}
            />
            <div className="flex items-end">
              <Button>Filtrar</Button>
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
