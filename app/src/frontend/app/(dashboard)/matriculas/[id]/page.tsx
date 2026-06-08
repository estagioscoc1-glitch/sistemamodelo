'use client';

import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useToast } from '@/components/ui/Toast';

export default function MatriculaDetailPage() {
  const { addToast } = useToast();

  const matricula = {
    id: '1',
    aluno: 'Ana Silva Santos',
    cpf: '123.456.789-00',
    curso: 'Administracao',
    turma: 'ADM-2024-1A',
    turno: 'Matutino',
    dataMatricula: '15/01/2024',
    status: 'Ativa',
    periodo: '2024.1',
    observacoes: '',
  };

  const handleAction = (action: string) => {
    addToast({ title: `Acao "${action}" executada com sucesso!`, variant: 'success' });
  };

  return (
    <div>
      <PageHeader
        title={`Matricula - ${matricula.aluno}`}
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Matriculas', href: '/matriculas' },
          { label: matricula.aluno },
        ]}
        actions={
          <Badge variant="success">{matricula.status}</Badge>
        }
      />

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Dados da Matricula</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid gap-4 md:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Aluno</dt>
                  <dd className="text-sm text-foreground mt-1">{matricula.aluno}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">CPF</dt>
                  <dd className="text-sm text-foreground mt-1">{matricula.cpf}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Curso</dt>
                  <dd className="text-sm text-foreground mt-1">{matricula.curso}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Turma</dt>
                  <dd className="text-sm text-foreground mt-1">{matricula.turma}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Turno</dt>
                  <dd className="text-sm text-foreground mt-1">{matricula.turno}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Periodo</dt>
                  <dd className="text-sm text-foreground mt-1">{matricula.periodo}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Data da Matricula</dt>
                  <dd className="text-sm text-foreground mt-1">{matricula.dataMatricula}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Status</dt>
                  <dd className="mt-1"><Badge variant="success">{matricula.status}</Badge></dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Acoes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start" onClick={() => handleAction('Renovar')}>
                Renovar Matricula
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => handleAction('Transferir')}>
                Transferir
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => handleAction('Trancar')}>
                Trancar Matricula
              </Button>
              <Button variant="destructive" className="w-full justify-start" onClick={() => handleAction('Cancelar')}>
                Cancelar Matricula
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
