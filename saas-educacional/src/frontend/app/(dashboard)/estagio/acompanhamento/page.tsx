'use client';

import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DataTable, type Column } from '@/components/shared/DataTable';
import { useToast } from '@/components/ui/Toast';

interface Acompanhamento {
  id: string;
  aluno: string;
  empresa: string;
  ultimaVisita: string;
  proximaVisita: string;
  avaliacaoEmpresa: string;
  avaliacaoAluno: string;
  observacoes: string;
  [key: string]: unknown;
}

const avaliacaoVariant: Record<string, 'success' | 'secondary' | 'warning' | 'destructive' | 'default'> = {
  Excelente: 'success',
  Bom: 'default',
  Regular: 'warning',
  Insuficiente: 'destructive',
  Pendente: 'secondary',
};

const mockAcompanhamentos: Acompanhamento[] = [
  { id: '1', aluno: 'Ana Silva Santos', empresa: 'TechCorp Ltda', ultimaVisita: '15/04/2024', proximaVisita: '15/05/2024', avaliacaoEmpresa: 'Excelente', avaliacaoAluno: 'Bom', observacoes: 'Desempenho satisfatorio' },
  { id: '2', aluno: 'Joao Pedro Oliveira', empresa: 'Construtora ABC', ultimaVisita: '10/03/2024', proximaVisita: '10/04/2024', avaliacaoEmpresa: 'Bom', avaliacaoAluno: 'Regular', observacoes: 'Precisa melhorar pontualidade' },
  { id: '3', aluno: 'Maria Fernandes Costa', empresa: 'Hospital Vida', ultimaVisita: '20/04/2024', proximaVisita: '-', avaliacaoEmpresa: 'Excelente', avaliacaoAluno: 'Excelente', observacoes: 'Estagio concluido com destaque' },
  { id: '4', aluno: 'Carlos Eduardo Lima', empresa: 'Escritorio Juridico Silva', ultimaVisita: '01/02/2024', proximaVisita: '01/05/2024', avaliacaoEmpresa: 'Pendente', avaliacaoAluno: 'Pendente', observacoes: 'Visita atrasada' },
  { id: '5', aluno: 'Juliana Almeida', empresa: 'Escola Municipal Norte', ultimaVisita: '18/04/2024', proximaVisita: '18/05/2024', avaliacaoEmpresa: 'Bom', avaliacaoAluno: 'Excelente', observacoes: 'Otimo engajamento' },
  { id: '6', aluno: 'Pedro Santos', empresa: 'TechCorp Ltda', ultimaVisita: '22/04/2024', proximaVisita: '22/05/2024', avaliacaoEmpresa: 'Bom', avaliacaoAluno: 'Bom', observacoes: 'Progresso adequado' },
];

const columns: Column<Acompanhamento>[] = [
  { key: 'aluno', header: 'Aluno', sortable: true },
  { key: 'empresa', header: 'Empresa' },
  { key: 'ultimaVisita', header: 'Ultima Visita' },
  { key: 'proximaVisita', header: 'Proxima Visita' },
  {
    key: 'avaliacaoEmpresa',
    header: 'Avaliacao Empresa',
    render: (item) => (
      <Badge variant={avaliacaoVariant[item.avaliacaoEmpresa] || 'default'}>{item.avaliacaoEmpresa}</Badge>
    ),
  },
  {
    key: 'avaliacaoAluno',
    header: 'Avaliacao Aluno',
    render: (item) => (
      <Badge variant={avaliacaoVariant[item.avaliacaoAluno] || 'default'}>{item.avaliacaoAluno}</Badge>
    ),
  },
];

export default function AcompanhamentoEstagioPage() {
  const { addToast } = useToast();

  return (
    <div>
      <PageHeader
        title="Acompanhamento de Estagio"
        description="Registro de visitas e avaliacoes"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Estagio', href: '/estagio' },
          { label: 'Acompanhamento' },
        ]}
        actions={
          <Button onClick={() => addToast({ title: 'Registro salvo com sucesso!', variant: 'success' })}>
            Registrar Visita
          </Button>
        }
      />

      <DataTable
        data={mockAcompanhamentos}
        columns={columns}
        searchKey="aluno"
        searchPlaceholder="Buscar por aluno..."
        actions={(item) => (
          <a href={`/estagio/${item.id}`}>
            <Button variant="ghost" size="sm">Detalhes</Button>
          </a>
        )}
      />
    </div>
  );
}
