'use client';

import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { DataTable, type Column } from '@/components/shared/DataTable';

interface Inadimplente {
  id: string;
  aluno: string;
  curso: string;
  parcelasVencidas: number;
  valorTotal: string;
  diasAtraso: number;
  ultimoContato: string;
  [key: string]: unknown;
}

const mockInadimplentes: Inadimplente[] = [
  { id: '1', aluno: 'Joao Pedro Oliveira', curso: 'Sistemas de Informacao', parcelasVencidas: 3, valorTotal: 'R$ 2.940,00', diasAtraso: 90, ultimoContato: '10/03/2024' },
  { id: '2', aluno: 'Fernanda Lima', curso: 'Administracao', parcelasVencidas: 2, valorTotal: 'R$ 2.400,00', diasAtraso: 60, ultimoContato: '15/03/2024' },
  { id: '3', aluno: 'Pedro Santos', curso: 'Direito', parcelasVencidas: 1, valorTotal: 'R$ 1.500,00', diasAtraso: 25, ultimoContato: '20/04/2024' },
  { id: '4', aluno: 'Lucas Mendes', curso: 'Enfermagem', parcelasVencidas: 4, valorTotal: 'R$ 4.400,00', diasAtraso: 120, ultimoContato: '01/02/2024' },
  { id: '5', aluno: 'Mariana Costa', curso: 'Pedagogia', parcelasVencidas: 2, valorTotal: 'R$ 1.700,00', diasAtraso: 55, ultimoContato: '18/03/2024' },
  { id: '6', aluno: 'Ricardo Alves', curso: 'Administracao', parcelasVencidas: 1, valorTotal: 'R$ 1.200,00', diasAtraso: 15, ultimoContato: '25/04/2024' },
];

const columns: Column<Inadimplente>[] = [
  { key: 'aluno', header: 'Aluno', sortable: true },
  { key: 'curso', header: 'Curso' },
  { key: 'parcelasVencidas', header: 'Parcelas Vencidas' },
  { key: 'valorTotal', header: 'Valor Total' },
  {
    key: 'diasAtraso',
    header: 'Dias em Atraso',
    sortable: true,
    render: (item) => (
      <Badge variant={item.diasAtraso > 90 ? 'destructive' : item.diasAtraso > 30 ? 'warning' : 'default'}>
        {item.diasAtraso} dias
      </Badge>
    ),
  },
  { key: 'ultimoContato', header: 'Ultimo Contato' },
];

export default function InadimplenciaPage() {
  return (
    <div>
      <PageHeader
        title="Inadimplencia"
        description="Controle de alunos inadimplentes"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Financeiro', href: '/financeiro' },
          { label: 'Inadimplencia' },
        ]}
      />

      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Inadimplentes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-destructive">6</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Valor em Aberto</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">R$ 14.140,00</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Taxa Inadimplencia</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">8,2%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Maior Atraso</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-destructive">120 dias</p>
          </CardContent>
        </Card>
      </div>

      <DataTable
        data={mockInadimplentes}
        columns={columns}
        searchKey="aluno"
        searchPlaceholder="Buscar por aluno..."
        actions={(item) => (
          <div className="flex gap-2">
            <a href="/financeiro/renegociacoes">
              <Button variant="ghost" size="sm">Renegociar</Button>
            </a>
          </div>
        )}
      />
    </div>
  );
}
