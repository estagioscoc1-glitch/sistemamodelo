'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useToast } from '@/components/ui/Toast';

export default function FinanceiroRelatoriosPage() {
  const { addToast } = useToast();
  const [tipoRelatorio, setTipoRelatorio] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');

  const handleGerar = () => {
    addToast({ title: 'Relatorio gerado com sucesso!', variant: 'success' });
  };

  return (
    <div>
      <PageHeader
        title="Relatorios Financeiros"
        description="Geracao de relatorios financeiros"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Financeiro', href: '/financeiro' },
          { label: 'Relatorios' },
        ]}
      />

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Configurar Relatorio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <Select
              id="tipoRelatorio"
              label="Tipo de Relatorio"
              value={tipoRelatorio}
              onChange={(e) => setTipoRelatorio(e.target.value)}
              placeholder="Selecione o tipo..."
              options={[
                { value: 'receitas', label: 'Relatorio de Receitas' },
                { value: 'inadimplencia', label: 'Relatorio de Inadimplencia' },
                { value: 'fluxo', label: 'Fluxo de Caixa' },
                { value: 'bolsas', label: 'Relatorio de Bolsas e Descontos' },
                { value: 'previsao', label: 'Previsao de Receita' },
                { value: 'comparativo', label: 'Comparativo Mensal' },
              ]}
            />
            <div />
            <Input
              id="dataInicio"
              label="Data Inicio"
              type="date"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
            />
            <Input
              id="dataFim"
              label="Data Fim"
              type="date"
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
            />
          </div>
          <div className="flex gap-3 justify-end mt-6">
            <Button variant="outline" onClick={handleGerar}>Visualizar</Button>
            <Button onClick={handleGerar}>Exportar Excel</Button>
            <Button onClick={handleGerar}>Gerar PDF</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Receita Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">R$ 89.400,00</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Recebido</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">R$ 72.350,00</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">A Receber</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-yellow-600">R$ 12.050,00</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Inadimplente</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">R$ 5.000,00</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
