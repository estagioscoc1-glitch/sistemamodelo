'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';
import { useToast } from '@/components/ui/Toast';

export default function DisciplinaDetailPage() {
  const { addToast } = useToast();
  const [form, setForm] = useState({
    nome: 'Matematica I',
    codigo: 'MAT101',
    cargaHoraria: '80h',
    curso: 'Administracao',
    periodo: '1',
    ementa: 'Funcoes, limites, derivadas e integrais',
    prerequisitos: '-',
    status: 'Ativa',
  });

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({ title: 'Disciplina atualizada com sucesso!', variant: 'success' });
  };

  const tabItems = [
    {
      value: 'dados',
      label: 'Dados Gerais',
      content: (
        <form onSubmit={handleSave} className="space-y-6 mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Input id="nome" label="Nome da Disciplina" value={form.nome} onChange={(e) => updateField('nome', e.target.value)} />
            <Input id="codigo" label="Codigo" value={form.codigo} onChange={(e) => updateField('codigo', e.target.value)} />
            <Input id="cargaHoraria" label="Carga Horaria" value={form.cargaHoraria} onChange={(e) => updateField('cargaHoraria', e.target.value)} />
            <Select
              id="curso"
              label="Curso"
              value={form.curso}
              onChange={(e) => updateField('curso', e.target.value)}
              options={[
                { value: 'Administracao', label: 'Administracao' },
                { value: 'Enfermagem', label: 'Enfermagem' },
                { value: 'Sistemas de Informacao', label: 'Sistemas de Informacao' },
                { value: 'Direito', label: 'Direito' },
                { value: 'Pedagogia', label: 'Pedagogia' },
              ]}
            />
            <Select
              id="periodo"
              label="Periodo"
              value={form.periodo}
              onChange={(e) => updateField('periodo', e.target.value)}
              options={[
                { value: '1', label: '1o Periodo' },
                { value: '2', label: '2o Periodo' },
                { value: '3', label: '3o Periodo' },
                { value: '4', label: '4o Periodo' },
                { value: '5', label: '5o Periodo' },
                { value: '6', label: '6o Periodo' },
                { value: '7', label: '7o Periodo' },
                { value: '8', label: '8o Periodo' },
              ]}
            />
            <Input id="prerequisitos" label="Pre-requisitos" value={form.prerequisitos} onChange={(e) => updateField('prerequisitos', e.target.value)} />
          </div>
          <div className="flex gap-3 justify-end">
            <Button type="submit">Salvar Alteracoes</Button>
          </div>
        </form>
      ),
    },
    {
      value: 'professores',
      label: 'Professores',
      content: (
        <div className="mt-4">
          <p className="text-muted-foreground">Professores vinculados a esta disciplina.</p>
        </div>
      ),
    },
    {
      value: 'turmas',
      label: 'Turmas',
      content: (
        <div className="mt-4">
          <p className="text-muted-foreground">Turmas que cursam esta disciplina.</p>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Editar Disciplina"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Cadastros', href: '/cadastros' },
          { label: 'Disciplinas', href: '/cadastros/disciplinas' },
          { label: form.nome },
        ]}
        actions={
          <Badge variant={form.status === 'Ativa' ? 'success' : 'secondary'}>{form.status}</Badge>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle>{form.nome}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs items={tabItems} defaultValue="dados" />
        </CardContent>
      </Card>
    </div>
  );
}
