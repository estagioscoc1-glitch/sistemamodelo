'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface FluxoMes {
  mes: string;
  entradas: string;
  saidas: string;
  saldo: string;
  tipo: 'positivo' | 'negativo';
}

const mockFluxo: FluxoMes[] = [
  { mes: 'Janeiro/2024', entradas: 'R$ 89.400,00', saidas: 'R$ 45.200,00', saldo: 'R$ 44.200,00', tipo: 'positivo' },
  { mes: 'Fevereiro/2024', entradas: 'R$ 82.100,00', saidas: 'R$ 48.500,00', saldo: 'R$ 33.600,00', tipo: 'positivo' },
  { mes: 'Marco/2024', entradas: 'R$ 91.200,00', saidas: 'R$ 52.300,00', saldo: 'R$ 38.900,00', tipo: 'positivo' },
  { mes: 'Abril/2024', entradas: 'R$ 75.800,00', saidas: 'R$ 49.100,00', saldo: 'R$ 26.700,00', tipo: 'positivo' },
  { mes: 'Maio/2024', entradas: 'R$ 68.500,00', saidas: 'R$ 71.200,00', saldo: '-R$ 2.700,00', tipo: 'negativo' },
  { mes: 'Junho/2024', entradas: 'R$ 45.200,00', saidas: 'R$ 42.800,00', saldo: 'R$ 2.400,00', tipo: 'positivo' },
];

export default function FluxoCaixaPage() {
  const [periodo, setPeriodo] = useState('');

  return (
    <div>
      <PageHeader
        title="Fluxo de Caixa"
        description="Controle de entradas e saidas"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Financeiro', href: '/financeiro' },
          { label: 'Fluxo de Caixa' },
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
                { value: '2024', label: 'Ano 2024' },
                { value: '2023', label: 'Ano 2023' },
                { value: '1sem2024', label: '1o Semestre 2024' },
                { value: '2sem2024', label: '2o Semestre 2024' },
              ]}
            />
            <div className="flex items-end">
              <Button variant="outline">Filtrar</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Entradas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">R$ 452.200,00</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Saidas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">R$ 309.100,00</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Saldo</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">R$ 143.100,00</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Fluxo Mensal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">Mes</th>
                  <th className="text-right py-3 px-2">Entradas</th>
                  <th className="text-right py-3 px-2">Saidas</th>
                  <th className="text-right py-3 px-2">Saldo</th>
                </tr>
              </thead>
              <tbody>
                {mockFluxo.map((item) => (
                  <tr key={item.mes} className="border-b">
                    <td className="py-3 px-2 font-medium">{item.mes}</td>
                    <td className="text-right py-3 px-2 text-green-600">{item.entradas}</td>
                    <td className="text-right py-3 px-2 text-red-600">{item.saidas}</td>
                    <td className="text-right py-3 px-2">
                      <Badge variant={item.tipo === 'positivo' ? 'success' : 'destructive'}>{item.saldo}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
