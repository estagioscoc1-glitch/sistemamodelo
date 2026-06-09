'use client';

import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const statusVariant: Record<string, 'success' | 'secondary' | 'warning' | 'destructive' | 'default'> = {
  Pendente: 'warning',
  'Em Andamento': 'default',
  Aprovado: 'success',
  Rejeitado: 'destructive',
  Concluido: 'secondary',
};

export default function RequerimentoDetailPage() {
  const requerimento = {
    id: '1',
    protocolo: 'REQ-2024-00001',
    aluno: 'Ana Silva Santos',
    tipo: 'Segunda Via',
    descricao: 'Solicita segunda via do diploma',
    dataRequerimento: '10/03/2024',
    status: 'Em Andamento',
    resposta: '',
    timeline: [
      { data: '10/03/2024', evento: 'Requerimento criado', status: 'Pendente' },
      { data: '12/03/2024', evento: 'Encaminhado para analise', status: 'Em Andamento' },
    ],
  };

  return (
    <div>
      <PageHeader
        title={`Requerimento - ${requerimento.protocolo}`}
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Requerimentos', href: '/requerimentos' },
          { label: requerimento.protocolo },
        ]}
        actions={
          <Badge variant={statusVariant[requerimento.status] || 'default'}>{requerimento.status}</Badge>
        }
      />

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Dados do Requerimento</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid gap-4 md:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Protocolo</dt>
                  <dd className="text-sm text-foreground mt-1">{requerimento.protocolo}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Aluno</dt>
                  <dd className="text-sm text-foreground mt-1">{requerimento.aluno}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Tipo</dt>
                  <dd className="text-sm text-foreground mt-1">{requerimento.tipo}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Data</dt>
                  <dd className="text-sm text-foreground mt-1">{requerimento.dataRequerimento}</dd>
                </div>
                <div className="md:col-span-2">
                  <dt className="text-sm font-medium text-muted-foreground">Descricao</dt>
                  <dd className="text-sm text-foreground mt-1">{requerimento.descricao}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resposta / Parecer</CardTitle>
            </CardHeader>
            <CardContent>
              {requerimento.resposta ? (
                <p className="text-sm text-foreground">{requerimento.resposta}</p>
              ) : (
                <p className="text-sm text-muted-foreground">Nenhuma resposta registrada.</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Historico</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {requerimento.timeline.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      {index < requerimento.timeline.length - 1 && (
                        <div className="w-px h-full bg-border" />
                      )}
                    </div>
                    <div className="pb-4">
                      <p className="text-sm font-medium">{item.evento}</p>
                      <p className="text-xs text-muted-foreground">{item.data}</p>
                      <Badge variant={statusVariant[item.status] || 'default'} className="mt-1">
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
