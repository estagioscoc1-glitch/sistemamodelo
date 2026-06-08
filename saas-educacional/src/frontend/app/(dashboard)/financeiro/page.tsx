'use client';

import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const summaryData = [
  { title: 'Total a Receber', value: 'R$ 245.600,00', variant: 'default' as const },
  { title: 'Total Recebido', value: 'R$ 189.350,00', variant: 'success' as const },
  { title: 'Total em Atraso', value: 'R$ 32.450,00', variant: 'destructive' as const },
  { title: 'Inadimplencia', value: '8,2%', variant: 'warning' as const },
];

export default function FinanceiroPage() {
  return (
    <div>
      <PageHeader
        title="Financeiro"
        description="Visao geral financeira"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Financeiro' },
        ]}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {summaryData.map((item) => (
          <Card key={item.title}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{item.value}</span>
                <Badge variant={item.variant}>{item.title}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Acesso Rapido</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <a href="/financeiro/contas-receber" className="block p-3 rounded-md hover:bg-muted">Contas a Receber</a>
            <a href="/financeiro/mensalidades" className="block p-3 rounded-md hover:bg-muted">Mensalidades / Parcelas</a>
            <a href="/financeiro/novo" className="block p-3 rounded-md hover:bg-muted">Nova Conta</a>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Relatorios</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <a href="/financeiro/mensalidades?status=OVERDUE" className="block p-3 rounded-md hover:bg-muted">Inadimplencia</a>
            <a href="/financeiro/mensalidades" className="block p-3 rounded-md hover:bg-muted">Fluxo de Caixa</a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
