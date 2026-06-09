'use client';

import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default function DiarioPage() {
  return (
    <div>
      <PageHeader
        title="Diario de Classe"
        description="Gerenciamento do diario de classe"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Diario' },
        ]}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Chamadas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Registre a presenca dos alunos por turma e disciplina.</p>
            <a href="/diario/chamadas">
              <Button>Acessar Chamadas</Button>
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notas do Diario</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Registre conteudos e atividades diarias do diario de classe.</p>
            <a href="/diario/notas">
              <Button>Acessar Notas</Button>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
