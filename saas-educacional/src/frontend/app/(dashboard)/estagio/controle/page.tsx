'use client';

import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DataTable, type Column } from '@/components/shared/DataTable';

interface ControleEstagio {
  id: string;
  aluno: string;
  empresa: string;
  supervisor: string;
  horasRealizadas: number;
  horasTotal: number;
  percentual: number;
  status: string;
  [key: string]: unknown;
}

const statusVariant: Record<string, 'success' | 'secondary' | 'warning' | 'destructive' | 'default'> = {
  'Em dia': 'success',
  Atrasado: 'warning',
  Irregular: 'destructive',
  Concluido: 'secondary',
};

const mockControle: ControleEstagio[] = [
  { id: '1', aluno: 'Ana Silva Santos', empresa: 'TechCorp Ltda', supervisor: 'Carlos Mendes', horasRealizadas: 320, horasTotal: 400, percentual: 80, status: 'Em dia' },
  { id: '2', aluno: 'Joao Pedro Oliveira', empresa: 'Construtora ABC', supervisor: 'Maria Souza', horasRealizadas: 150, horasTotal: 400, percentual: 37, status: 'Atrasado' },
  { id: '3', aluno: 'Maria Fernandes Costa', empresa: 'Hospital Vida', supervisor: 'Dr. Paulo', horasRealizadas: 400, horasTotal: 400, percentual: 100, status: 'Concluido' },
  { id: '4', aluno: 'Carlos Eduardo Lima', empresa: 'Escritorio Juridico Silva', supervisor: 'Ana Costa', horasRealizadas: 50, horasTotal: 300, percentual: 17, status: 'Irregular' },
  { id: '5', aluno: 'Juliana Almeida', empresa: 'Escola Municipal Norte', supervisor: 'Prof. Santos', horasRealizadas: 280, horasTotal: 300, percentual: 93, status: 'Em dia' },
  { id: '6', aluno: 'Pedro Santos', empresa: 'TechCorp Ltda', supervisor: 'Carlos Mendes', horasRealizadas: 200, horasTotal: 400, percentual: 50, status: 'Em dia' },
];

const columns: Column<ControleEstagio>[] = [
  { key: 'aluno', header: 'Aluno', sortable: true },
  { key: 'empresa', header: 'Empresa', sortable: true },
  { key: 'supervisor', header: 'Supervisor' },
  { key: 'horasRealizadas', header: 'Horas Realizadas' },
  { key: 'horasTotal', header: 'Horas Total' },
  { key: 'percentual', header: 'Progresso', render: (item) => <span>{item.percentual}%</span> },
  {
    key: 'status',
    header: 'Status',
    render: (item) => (
      <Badge variant={statusVariant[item.status] || 'default'}>{item.status}</Badge>
    ),
  },
];

export default function ControleEstagioPage() {
  return (
    <div>
      <PageHeader
        title="Controle de Estagio"
        description="Acompanhamento de horas e atividades"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Estagio', href: '/estagio' },
          { label: 'Controle' },
        ]}
      />

      <DataTable
        data={mockControle}
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
