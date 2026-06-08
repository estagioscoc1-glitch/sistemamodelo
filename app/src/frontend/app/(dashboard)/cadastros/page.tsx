'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { PageHeader } from '@/components/shared/PageHeader';

const cadastroModules = [
  { title: 'Cursos', description: 'Gerenciar cursos oferecidos', href: '/cadastros/cursos', count: 24 },
  { title: 'Turmas', description: 'Gerenciar turmas e periodos', href: '/cadastros/turmas', count: 48 },
  { title: 'Disciplinas', description: 'Grade curricular e disciplinas', href: '/cadastros/disciplinas', count: 156 },
  { title: 'Professores', description: 'Cadastro de docentes', href: '/cadastros/professores', count: 67 },
  { title: 'Alunos', description: 'Cadastro de alunos', href: '/cadastros/alunos', count: 1247 },
];

export default function CadastrosPage() {
  return (
    <div>
      <PageHeader
        title="Cadastros"
        description="Gerenciamento de cadastros basicos do sistema"
        breadcrumbs={[{ label: 'Dashboard', href: '/' }, { label: 'Cadastros' }]}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cadastroModules.map((mod) => (
          <a key={mod.title} href={mod.href}>
            <Card className="hover:border-primary/50 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">{mod.title}</CardTitle>
                <CardDescription>{mod.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-primary">{mod.count}</p>
                <p className="text-xs text-muted-foreground">registros</p>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}
