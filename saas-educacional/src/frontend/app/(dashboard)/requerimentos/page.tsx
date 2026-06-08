'use client';

import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DataTable, type Column } from '@/components/shared/DataTable';

interface Requerimento {
  id: string;
  protocolo: string;
  aluno: string;
  tipo: string;
  descricao: string;
  dataRequerimento: string;
  status: string;
  [key: string]: unknown;
}

const statusVariant: Record<string, 'success' | 'secondary' | 'warning' | 'destructive' | 'default'> = {
  Pendente: 'warning',
  'Em Andamento': 'default',
  Aprovado: 'success',
  Rejeitado: 'destructive',
  Concluido: 'secondary',
};

const mockRequerimentos: Requerimento[] = [
  { id: '1', protocolo: 'REQ-2024-00001', aluno: 'Ana Silva Santos', tipo: 'Segunda Via', descricao: 'Solicita segunda via do diploma', dataRequerimento: '10/03/2024', status: 'Pendente' },
  { id: '2', protocolo: 'REQ-2024-00002', aluno: 'Joao Pedro Oliveira', tipo: 'Trancamento', descricao: 'Solicita trancamento por motivos pessoais', dataRequerimento: '12/03/2024', status: 'Em Andamento' },
  { id: '3', protocolo: 'REQ-2024-00003', aluno: 'Maria Fernandes Costa', tipo: 'Aproveitamento', descricao: 'Aproveitamento de disciplina cursada em outra instituicao', dataRequerimento: '15/03/2024', status: 'Aprovado' },
  { id: '4', protocolo: 'REQ-2024-00004', aluno: 'Carlos Eduardo Lima', tipo: 'Revisao de Nota', descricao: 'Revisao de nota da disciplina de Calculo I', dataRequerimento: '18/03/2024', status: 'Rejeitado' },
  { id: '5', protocolo: 'REQ-2024-00005', aluno: 'Juliana Almeida', tipo: 'Declaracao', descricao: 'Declaracao de matricula para fins trabalhistas', dataRequerimento: '20/03/2024', status: 'Concluido' },
  { id: '6', protocolo: 'REQ-2024-00006', aluno: 'Pedro Santos', tipo: 'Outros', descricao: 'Solicitacao de mudanca de turno', dataRequerimento: '22/03/2024', status: 'Pendente' },
  { id: '7', protocolo: 'REQ-2024-00007', aluno: 'Fernanda Lima', tipo: 'Segunda Via', descricao: 'Segunda via do historico escolar', dataRequerimento: '25/03/2024', status: 'Em Andamento' },
];

const columns: Column<Requerimento>[] = [
  { key: 'protocolo', header: 'Protocolo', sortable: true },
  { key: 'aluno', header: 'Aluno', sortable: true },
  { key: 'tipo', header: 'Tipo', sortable: true },
  { key: 'descricao', header: 'Descricao' },
  { key: 'dataRequerimento', header: 'Data' },
  {
    key: 'status',
    header: 'Status',
    render: (item) => (
      <Badge variant={statusVariant[item.status] || 'default'}>{item.status}</Badge>
    ),
  },
];

export default function RequerimentosPage() {
  return (
    <div>
      <PageHeader
        title="Requerimentos"
        description="Gerenciamento de requerimentos"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Requerimentos' },
        ]}
        actions={
          <a href="/requerimentos/novo">
            <Button>Novo Requerimento</Button>
          </a>
        }
      />

      <DataTable
        data={mockRequerimentos}
        columns={columns}
        searchKey="aluno"
        searchPlaceholder="Buscar por aluno..."
        onRowClick={(item) => {
          window.location.href = `/requerimentos/${item.id}`;
        }}
        actions={(item) => (
          <a href={`/requerimentos/${item.id}`}>
            <Button variant="ghost" size="sm">Detalhes</Button>
          </a>
        )}
      />
    </div>
  );
}
