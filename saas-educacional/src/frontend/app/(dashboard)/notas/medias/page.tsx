'use client';

import React, { useState } from 'react';
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

const mockMedias: Media[] = [
  { id: '1', disciplina: 'Matematica', turma: 'ADM-2024-1A', periodo: '2024.1', mediaGeral: 7.2, aprovados: 28, reprovados: 3, recuperacao: 4 },
  { id: '2', disciplina: 'Portugues', turma: 'SI-2024-1A', periodo: '2024.1', mediaGeral: 6.8, aprovados: 22, reprovados: 5, recuperacao: 3 },
  { id: '3', disciplina: 'Historia', turma: 'ENF-2024-1A', periodo: '2024.1', mediaGeral: 8.1, aprovados: 35, reprovados: 2, recuperacao: 3 },
  { id: '4', disciplina: 'Fisica', turma: 'DIR-2023-2A', periodo: '2024.1', mediaGeral: 5.9, aprovados: 15, reprovados: 7, recuperacao: 3 },
  { id: '5', disciplina: 'Quimica', turma: 'PED-2023-1A', periodo: '2024.1', mediaGeral: 7.5, aprovados: 26, reprovados: 2, recuperacao: 4 },
  { id: '6', disciplina: 'Biologia', turma: 'ADM-2024-1B', periodo: '2024.1', mediaGeral: 7.8, aprovados: 30, reprovados: 4, recuperacao: 4 },
];

const columns: Column<Media>[] = [
  { key: 'disciplina', header: 'Disciplina', sortable: true },
  { key: 'turma', header: 'Turma', sortable: true },
  { key: 'periodo', header: 'Periodo' },
  { key: 'mediaGeral', header: 'Media Geral', render: (item) => <span className="font-bold">{item.mediaGeral.toFixed(1)}</span> },
  { key: 'aprovados', header: 'Aprovados', render: (item) => <Badge variant="success">{item.aprovados}</Badge> },
  { key: 'reprovados', header: 'Reprovados', render: (item) => <Badge variant="destructive">{item.reprovados}</Badge> },
  { key: 'recuperacao', header: 'Recuperacao', render: (item) => <Badge variant="warning">{item.recuperacao}</Badge> },
];

export default function MediasPage() {
  const [periodo, setPeriodo] = useState('');

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
        data={mockMedias}
        columns={columns}
        searchKey="disciplina"
        searchPlaceholder="Buscar por disciplina..."
      />
    </div>
  );
}
