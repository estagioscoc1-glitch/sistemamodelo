'use client';

import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DataTable, type Column } from '@/components/shared/DataTable';

interface Ata {
  id: string;
  titulo: string;
  data: string;
  tipo: string;
  participantes: string;
  status: string;
  [key: string]: unknown;
}

const statusVariant: Record<string, 'success' | 'secondary' | 'warning' | 'destructive' | 'default'> = {
  Rascunho: 'secondary',
  Aprovada: 'success',
  Publicada: 'default',
};

const mockAtas: Ata[] = [
  { id: '1', titulo: 'Reuniao do Conselho Academico - Marco 2024', data: '05/03/2024', tipo: 'Reuniao de Conselho', participantes: 'Prof. Silva, Prof. Costa, Coord. Lima', status: 'Publicada' },
  { id: '2', titulo: 'Assembleia Geral de Professores', data: '10/03/2024', tipo: 'Assembleia', participantes: 'Todos os docentes', status: 'Aprovada' },
  { id: '3', titulo: 'Colegiado do Curso de Administracao', data: '15/03/2024', tipo: 'Colegiado', participantes: 'Coord. Santos, Prof. Almeida, Rep. Estudantes', status: 'Rascunho' },
  { id: '4', titulo: 'Reuniao do Conselho Academico - Abril 2024', data: '02/04/2024', tipo: 'Reuniao de Conselho', participantes: 'Prof. Silva, Prof. Costa, Coord. Lima', status: 'Rascunho' },
  { id: '5', titulo: 'Colegiado do Curso de Enfermagem', data: '08/04/2024', tipo: 'Colegiado', participantes: 'Coord. Fernandes, Prof. Souza, Rep. Estudantes', status: 'Aprovada' },
  { id: '6', titulo: 'Reuniao Extraordinaria - Calendario 2024.2', data: '12/04/2024', tipo: 'Outros', participantes: 'Diretoria, Coordenadores', status: 'Publicada' },
];

const columns: Column<Ata>[] = [
  { key: 'titulo', header: 'Titulo', sortable: true },
  { key: 'data', header: 'Data', sortable: true },
  { key: 'tipo', header: 'Tipo', sortable: true },
  { key: 'participantes', header: 'Participantes' },
  {
    key: 'status',
    header: 'Status',
    render: (item) => (
      <Badge variant={statusVariant[item.status] || 'default'}>{item.status}</Badge>
    ),
  },
];

export default function AtasPage() {
  return (
    <div>
      <PageHeader
        title="Atas"
        description="Gerenciamento de atas de reunioes"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Atas' },
        ]}
        actions={
          <a href="/atas/nova">
            <Button>Nova Ata</Button>
          </a>
        }
      />

      <DataTable
        data={mockAtas}
        columns={columns}
        searchKey="titulo"
        searchPlaceholder="Buscar atas..."
        onRowClick={(item) => {
          window.location.href = `/atas/${item.id}`;
        }}
        actions={(item) => (
          <a href={`/atas/${item.id}`}>
            <Button variant="ghost" size="sm">Detalhes</Button>
          </a>
        )}
      />
    </div>
  );
}
