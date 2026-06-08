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

export default function NotaDetailPage() {
  const { addToast } = useToast();
  const [form, setForm] = useState({
    aluno: 'Ana Silva Santos',
    disciplina: 'Matematica',
    turma: 'ADM-2024-1A',
    avaliacao: 'Prova 1',
    nota: '8.5',
    peso: '1.0',
    recuperacao: '',
    notaFinal: '8.5',
    periodo: '1',
    ano: '2024',
    status: 'Aprovado',
  });

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({ title: 'Nota atualizada com sucesso!', variant: 'success' });
  };

  const tabItems = [
    {
      value: 'dados',
      label: 'Dados da Nota',
      content: (
        <form onSubmit={handleSave} className="space-y-6 mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Input id="aluno" label="Aluno" value={form.aluno} onChange={(e) => updateField('aluno', e.target.value)} disabled />
            <Input id="disciplina" label="Disciplina" value={form.disciplina} onChange={(e) => updateField('disciplina', e.target.value)} disabled />
            <Input id="turma" label="Turma" value={form.turma} onChange={(e) => updateField('turma', e.target.value)} disabled />
            <Input id="avaliacao" label="Avaliacao" value={form.avaliacao} onChange={(e) => updateField('avaliacao', e.target.value)} />
            <Input id="nota" label="Nota" type="number" value={form.nota} onChange={(e) => updateField('nota', e.target.value)} />
            <Input id="peso" label="Peso" type="number" value={form.peso} onChange={(e) => updateField('peso', e.target.value)} />
            <Input id="recuperacao" label="Recuperacao" type="number" value={form.recuperacao} onChange={(e) => updateField('recuperacao', e.target.value)} />
            <Input id="notaFinal" label="Nota Final" type="number" value={form.notaFinal} onChange={(e) => updateField('notaFinal', e.target.value)} />
            <Select
              id="periodo"
              label="Periodo"
              value={form.periodo}
              onChange={(e) => updateField('periodo', e.target.value)}
              options={[
                { value: '1', label: '1o Bimestre' },
                { value: '2', label: '2o Bimestre' },
                { value: '3', label: '3o Bimestre' },
                { value: '4', label: '4o Bimestre' },
              ]}
            />
            <Input id="ano" label="Ano" value={form.ano} onChange={(e) => updateField('ano', e.target.value)} />
          </div>
          <div className="flex gap-3 justify-end">
            <a href="/notas"><Button type="button" variant="outline">Voltar</Button></a>
            <Button type="submit">Salvar Alteracoes</Button>
          </div>
        </form>
      ),
    },
    {
      value: 'historico',
      label: 'Historico',
      content: (
        <div className="mt-4">
          <p className="text-muted-foreground">Historico de alteracoes desta nota.</p>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Detalhes da Nota"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Notas', href: '/notas' },
          { label: form.aluno },
        ]}
        actions={
          <Badge variant={form.status === 'Aprovado' ? 'success' : 'warning'}>{form.status}</Badge>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle>{form.aluno} - {form.disciplina}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs items={tabItems} defaultValue="dados" />
        </CardContent>
      </Card>
    </div>
  );
}
