'use client';

import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DataTable, type Column } from '@/components/shared/DataTable';

interface Estagio {
  id: string;
  aluno: string;
  empresa: string;
  dataInicio: string;
  dataFim: string;
  cargaHoraria: string;
  status: string;
  [key: string]: unknown;
}

const statusVariant: Record<string, 'success' | 'secondary' | 'warning' | 'destructive' | 'default'> = {
  Ativo: 'success',
  Concluido: 'secondary',
  Cancelado: 'destructive',
  Suspenso: 'warning',
};

const mockEstagios: Estagio[] = [
  { id: '1', aluno: 'Ana Silva Santos', empresa: 'TechCorp Ltda', dataInicio: '01/03/2024', dataFim: '01/09/2024', cargaHoraria: '30h/sem', status: 'Ativo' },
  { id: '2', aluno: 'Joao Pedro Oliveira', empresa: 'Construtora ABC', dataInicio: '15/02/2024', dataFim: '15/08/2024', cargaHoraria: '20h/sem', status: 'Ativo' },
  { id: '3', aluno: 'Maria Fernandes Costa', empresa: 'Hospital Vida', dataInicio: '01/01/2024', dataFim: '01/07/2024', cargaHoraria: '30h/sem', status: 'Concluido' },
  { id: '4', aluno: 'Carlos Eduardo Lima', empresa: 'Escritorio Juridico Silva', dataInicio: '10/04/2024', dataFim: '10/10/2024', cargaHoraria: '25h/sem', status: 'Ativo' },
  { id: '5', aluno: 'Juliana Almeida', empresa: 'Escola Municipal Norte', dataInicio: '01/02/2024', dataFim: '01/06/2024', cargaHoraria: '20h/sem', status: 'Cancelado' },
  { id: '6', aluno: 'Pedro Santos', empresa: 'TechCorp Ltda', dataInicio: '01/05/2024', dataFim: '01/11/2024', cargaHoraria: '30h/sem', status: 'Ativo' },
];

const columns: Column<Estagio>[] = [
  { key: 'aluno', header: 'Aluno', sortable: true },
  { key: 'empresa', header: 'Empresa', sortable: true },
  { key: 'dataInicio', header: 'Data Inicio' },
  { key: 'dataFim', header: 'Data Fim' },
  { key: 'cargaHoraria', header: 'Carga Horaria' },
  {
    key: 'status',
    header: 'Status',
    render: (item) => (
      <Badge variant={statusVariant[item.status] || 'default'}>{item.status}</Badge>
    ),
  },
];

export default function EstagioPage() {
  return (
    <div>
      <PageHeader
        title="Estagios"
        description="Gerenciamento de estagios"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Estagios' },
        ]}
        actions={
          <a href="/estagio/cadastro">
            <Button>Novo Estagio</Button>
          </a>
        }
      />

      <DataTable
        data={mockEstagios}
        columns={columns}
        searchKey="aluno"
        searchPlaceholder="Buscar por aluno..."
        onRowClick={(item) => {
          window.location.href = `/estagio/${item.id}`;
        }}
        actions={(item) => (
          <a href={`/estagio/${item.id}`}>
            <Button variant="ghost" size="sm">Detalhes</Button>
          </a>
        )}
      />
    </div>
  );
}
