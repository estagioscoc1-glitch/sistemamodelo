'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useToast } from '@/components/ui/Toast';

interface Sessao {
  id: string;
  titulo: string;
  modulo: string;
  horario: string;
  status: string;
}

const mockSessoes: Sessao[] = [
  { id: '1', titulo: 'Cadastro de Alunos', modulo: 'Cadastros', horario: '14:32', status: 'Ativa' },
  { id: '2', titulo: 'Lancamento de Notas', modulo: 'Notas', horario: '14:15', status: 'Ativa' },
  { id: '3', titulo: 'Financeiro - Parcelas', modulo: 'Financeiro', horario: '13:45', status: 'Ativa' },
  { id: '4', titulo: 'Relatorio de Frequencia', modulo: 'Diario', horario: '12:30', status: 'Em Segundo Plano' },
  { id: '5', titulo: 'Controle de Estagio', modulo: 'Estagio', horario: '11:20', status: 'Em Segundo Plano' },
];

const statusVariant: Record<string, 'success' | 'secondary' | 'warning' | 'destructive' | 'default'> = {
  Ativa: 'success',
  'Em Segundo Plano': 'secondary',
};

export default function JanelaPage() {
  const { addToast } = useToast();
  const [sessoes, setSessoes] = useState(mockSessoes);

  const handleFechar = (id: string) => {
    setSessoes(sessoes.filter((s) => s.id !== id));
    addToast({ title: 'Sessao encerrada com sucesso!', variant: 'success' });
  };

  const handleFecharTodas = () => {
    setSessoes([]);
    addToast({ title: 'Todas as sessoes foram encerradas!', variant: 'success' });
  };

  return (
    <div>
      <PageHeader
        title="Gerenciamento de Janelas"
        description="Controle de sessoes e janelas abertas"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Janela' },
        ]}
        actions={
          <Button variant="destructive" onClick={handleFecharTodas}>Fechar Todas</Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Sessoes Ativas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{sessoes.filter((s) => s.status === 'Ativa').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Em Segundo Plano</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{sessoes.filter((s) => s.status === 'Em Segundo Plano').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{sessoes.length}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sessoes Abertas</CardTitle>
        </CardHeader>
        <CardContent>
          {sessoes.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">Nenhuma sessao aberta</p>
          ) : (
            <div className="space-y-3">
              {sessoes.map((sessao) => (
                <div key={sessao.id} className="flex items-center justify-between p-3 rounded-md border">
                  <div className="flex items-center gap-3">
                    <Badge variant={statusVariant[sessao.status] || 'default'}>{sessao.status}</Badge>
                    <div>
                      <p className="font-medium">{sessao.titulo}</p>
                      <p className="text-sm text-muted-foreground">{sessao.modulo} - Aberta as {sessao.horario}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Ativar</Button>
                    <Button variant="ghost" size="sm" onClick={() => handleFechar(sessao.id)}>Fechar</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
