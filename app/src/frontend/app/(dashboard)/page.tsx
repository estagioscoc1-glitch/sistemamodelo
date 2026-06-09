'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PageHeader } from '@/components/shared/PageHeader';

// TODO: Connect to real API endpoint (e.g., /dashboard/stats) for live KPI data
const kpiCards = [
  { title: 'Total de Alunos', value: '1.247', change: '+12% este mes', color: 'text-blue-600' },
  { title: 'Matriculas Ativas', value: '983', change: '+5% este mes', color: 'text-green-600' },
  { title: 'Receita Mensal', value: 'R$ 245.890', change: '+8% este mes', color: 'text-purple-600' },
  { title: 'Taxa de Frequencia', value: '94.2%', change: '+2% este mes', color: 'text-orange-600' },
];

// TODO: Connect to real API endpoint for recent activity feed
const recentActivity = [
  { type: 'matricula', description: 'Nova matricula - Ana Silva no curso de Administracao', time: 'Ha 5 minutos' },
  { type: 'nota', description: 'Lancamento de notas - Turma 3A - Matematica', time: 'Ha 15 minutos' },
  { type: 'financeiro', description: 'Pagamento recebido - R$ 1.200,00 - Joao Santos', time: 'Ha 30 minutos' },
  { type: 'cadastro', description: 'Novo aluno cadastrado - Pedro Oliveira', time: 'Ha 1 hora' },
  { type: 'matricula', description: 'Renovacao de matricula - Maria Fernandes', time: 'Ha 2 horas' },
];

export default function DashboardPage() {
  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Visao geral do sistema educacional"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {kpiCards.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{kpi.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Atividade Recente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Acoes Rapidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-1">
                <span className="text-sm font-medium">Nova Matricula</span>
                <span className="text-xs text-muted-foreground">Matricular aluno</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-1">
                <span className="text-sm font-medium">Novo Aluno</span>
                <span className="text-xs text-muted-foreground">Cadastrar aluno</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-1">
                <span className="text-sm font-medium">Lancar Notas</span>
                <span className="text-xs text-muted-foreground">Diario de classe</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-1">
                <span className="text-sm font-medium">Financeiro</span>
                <span className="text-xs text-muted-foreground">Mensalidades</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
