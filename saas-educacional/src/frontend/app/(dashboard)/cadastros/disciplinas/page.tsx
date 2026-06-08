'use client';

import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DataTable, type Column } from '@/components/shared/DataTable';

interface Disciplina {
  id: string;
  nome: string;
  codigo: string;
  cargaHoraria: string;
  curso: string;
  periodo: string;
  status: string;
  [key: string]: unknown;
}

const mockDisciplinas: Disciplina[] = [
  { id: '1', nome: 'Matematica I', codigo: 'MAT101', cargaHoraria: '80h', curso: 'Administracao', periodo: '1o Periodo', status: 'Ativa' },
  { id: '2', nome: 'Portugues I', codigo: 'POR101', cargaHoraria: '60h', curso: 'Administracao', periodo: '1o Periodo', status: 'Ativa' },
  { id: '3', nome: 'Administracao I', codigo: 'ADM101', cargaHoraria: '60h', curso: 'Administracao', periodo: '1o Periodo', status: 'Ativa' },
  { id: '4', nome: 'Anatomia I', codigo: 'ANA101', cargaHoraria: '100h', curso: 'Enfermagem', periodo: '1o Periodo', status: 'Ativa' },
  { id: '5', nome: 'Algoritmos', codigo: 'ALG101', cargaHoraria: '80h', curso: 'Sistemas de Informacao', periodo: '1o Periodo', status: 'Ativa' },
  { id: '6', nome: 'Direito Civil I', codigo: 'DCI101', cargaHoraria: '60h', curso: 'Direito', periodo: '1o Periodo', status: 'Ativa' },
  { id: '7', nome: 'Psicologia da Educacao', codigo: 'PSI101', cargaHoraria: '60h', curso: 'Pedagogia', periodo: '2o Periodo', status: 'Inativa' },
];

const columns: Column<Disciplina>[] = [
  { key: 'codigo', header: 'Codigo', sortable: true },
  { key: 'nome', header: 'Nome da Disciplina', sortable: true },
  { key: 'cargaHoraria', header: 'Carga Horaria' },
  { key: 'curso', header: 'Curso' },
  { key: 'periodo', header: 'Periodo' },
  {
    key: 'status',
    header: 'Status',
    render: (item) => (
      <Badge variant={item.status === 'Ativa' ? 'success' : 'secondary'}>{item.status}</Badge>
    ),
  },
];

export default function DisciplinasPage() {
  return (
    <div>
      <PageHeader
        title="Disciplinas"
        description="Gerenciamento de disciplinas"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Cadastros', href: '/cadastros' },
          { label: 'Disciplinas' },
        ]}
        actions={
          <a href="/cadastros/disciplinas/novo">
            <Button>Nova Disciplina</Button>
          </a>
        }
      />

      <DataTable
        data={mockDisciplinas}
        columns={columns}
        searchKey="nome"
        searchPlaceholder="Buscar disciplinas..."
        onRowClick={(item) => {
          window.location.href = `/cadastros/disciplinas/${item.id}`;
        }}
        actions={(item) => (
          <div className="flex gap-2">
            <a href={`/cadastros/disciplinas/${item.id}`}>
              <Button variant="ghost" size="sm">Editar</Button>
            </a>
          </div>
        )}
      />
    </div>
  );
}
