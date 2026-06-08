'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DataTable, type Column } from '@/components/shared/DataTable';
import { useToast } from '@/components/ui/Toast';

interface Alteracao {
  id: string;
  aluno: string;
  disciplina: string;
  turma: string;
  notaAnterior: number;
  notaNova: number;
  motivo: string;
  data: string;
  status: string;
  [key: string]: unknown;
}

const statusVariant: Record<string, 'success' | 'secondary' | 'warning' | 'destructive' | 'default'> = {
  Aprovada: 'success',
  Pendente: 'warning',
  Rejeitada: 'destructive',
};

const mockAlteracoes: Alteracao[] = [
  { id: '1', aluno: 'Ana Silva Santos', disciplina: 'Matematica', turma: 'ADM-2024-1A', notaAnterior: 6.0, notaNova: 7.5, motivo: 'Erro de lancamento', data: '10/03/2024', status: 'Aprovada' },
  { id: '2', aluno: 'Joao Pedro Oliveira', disciplina: 'Portugues', turma: 'SI-2024-1A', notaAnterior: 5.0, notaNova: 6.5, motivo: 'Revisao de prova', data: '12/03/2024', status: 'Pendente' },
  { id: '3', aluno: 'Maria Fernandes Costa', disciplina: 'Historia', turma: 'ENF-2024-1A', notaAnterior: 8.0, notaNova: 8.5, motivo: 'Trabalho nao contabilizado', data: '15/03/2024', status: 'Aprovada' },
  { id: '4', aluno: 'Carlos Eduardo Lima', disciplina: 'Fisica', turma: 'DIR-2023-2A', notaAnterior: 4.5, notaNova: 5.5, motivo: 'Erro de correcao', data: '18/03/2024', status: 'Rejeitada' },
  { id: '5', aluno: 'Juliana Almeida', disciplina: 'Quimica', turma: 'PED-2023-1A', notaAnterior: 7.0, notaNova: 7.8, motivo: 'Revisao de prova', data: '20/03/2024', status: 'Pendente' },
  { id: '6', aluno: 'Pedro Santos', disciplina: 'Biologia', turma: 'ADM-2024-1B', notaAnterior: 5.5, notaNova: 6.0, motivo: 'Atividade complementar', data: '22/03/2024', status: 'Aprovada' },
];

const columns: Column<Alteracao>[] = [
  { key: 'aluno', header: 'Aluno', sortable: true },
  { key: 'disciplina', header: 'Disciplina', sortable: true },
  { key: 'turma', header: 'Turma' },
  { key: 'notaAnterior', header: 'Nota Anterior', render: (item) => <span>{item.notaAnterior.toFixed(1)}</span> },
  { key: 'notaNova', header: 'Nota Nova', render: (item) => <span>{item.notaNova.toFixed(1)}</span> },
  { key: 'motivo', header: 'Motivo' },
  { key: 'data', header: 'Data' },
  {
    key: 'status',
    header: 'Status',
    render: (item) => (
      <Badge variant={statusVariant[item.status] || 'default'}>{item.status}</Badge>
    ),
  },
];

export default function AlteracaoNotasPage() {
  const { addToast } = useToast();

  const handleAprovar = (id: string) => {
    addToast({ title: 'Alteracao aprovada com sucesso!', variant: 'success' });
  };

  return (
    <div>
      <PageHeader
        title="Alteracao de Notas"
        description="Solicitacoes de alteracao de notas"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Notas', href: '/notas' },
          { label: 'Alteracao' },
        ]}
      />

      <DataTable
        data={mockAlteracoes}
        columns={columns}
        searchKey="aluno"
        searchPlaceholder="Buscar por aluno..."
        actions={(item) => (
          <div className="flex gap-2">
            {item.status === 'Pendente' && (
              <Button variant="ghost" size="sm" onClick={() => handleAprovar(item.id)}>Aprovar</Button>
            )}
          </div>
        )}
      />
    </div>
  );
}
