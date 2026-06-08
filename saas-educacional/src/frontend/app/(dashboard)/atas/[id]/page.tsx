'use client';

import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';

const statusVariant: Record<string, 'success' | 'secondary' | 'warning' | 'destructive' | 'default'> = {
  Rascunho: 'secondary',
  Aprovada: 'success',
  Publicada: 'default',
};

export default function AtaDetailPage() {
  const ata = {
    id: '1',
    titulo: 'Reuniao do Conselho Academico - Marco 2024',
    data: '05/03/2024',
    tipo: 'Reuniao de Conselho',
    participantes: 'Prof. Silva, Prof. Costa, Coord. Lima',
    status: 'Publicada',
    conteudo: 'Pauta: 1. Aprovacao do calendario academico 2024.2; 2. Discussao sobre novas diretrizes curriculares; 3. Aprovacao de projetos de extensao.\n\nDeliberacoes: Todos os itens da pauta foram aprovados por unanimidade. O calendario 2024.2 inicia em 05/08/2024. As novas diretrizes serao implementadas a partir de 2025.1.',
    versoes: [
      { id: '1', data: '05/03/2024', autor: 'Coord. Lima', descricao: 'Versao original' },
      { id: '2', data: '08/03/2024', autor: 'Prof. Silva', descricao: 'Revisao com correcoes' },
    ],
  };

  const conteudoTab = (
    <Card>
      <CardHeader>
        <CardTitle>Informacoes da Ata</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid gap-4 md:grid-cols-2 mb-6">
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Titulo</dt>
            <dd className="text-sm text-foreground mt-1">{ata.titulo}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Data</dt>
            <dd className="text-sm text-foreground mt-1">{ata.data}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Tipo</dt>
            <dd className="text-sm text-foreground mt-1">{ata.tipo}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Participantes</dt>
            <dd className="text-sm text-foreground mt-1">{ata.participantes}</dd>
          </div>
        </dl>
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Conteudo</h4>
          <div className="whitespace-pre-wrap text-sm text-foreground bg-muted p-4 rounded-md">
            {ata.conteudo}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const versoesTab = (
    <Card>
      <CardHeader>
        <CardTitle>Versoes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {ata.versoes.map((versao) => (
            <div key={versao.id} className="flex items-center justify-between p-3 border rounded-md">
              <div>
                <p className="text-sm font-medium">{versao.descricao}</p>
                <p className="text-xs text-muted-foreground">Por {versao.autor} em {versao.data}</p>
              </div>
              <Badge variant="secondary">v{versao.id}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div>
      <PageHeader
        title={ata.titulo}
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Atas', href: '/atas' },
          { label: ata.titulo },
        ]}
        actions={
          <Badge variant={statusVariant[ata.status] || 'default'}>{ata.status}</Badge>
        }
      />

      <Tabs
        defaultValue="conteudo"
        items={[
          { value: 'conteudo', label: 'Conteudo', content: conteudoTab },
          { value: 'versoes', label: 'Versoes', content: versoesTab },
        ]}
      />
    </div>
  );
}
