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

export default function EstagioDetailPage() {
  const { addToast } = useToast();
  const [form, setForm] = useState({
    aluno: 'Ana Silva Santos',
    empresa: 'TechCorp Ltda',
    dataInicio: '2024-03-01',
    dataFim: '2024-09-01',
    cargaHoraria: '30',
    supervisor: 'Dr. Roberto Alves',
    status: 'Ativo',
    observacao: '',
  });

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({ title: 'Estagio atualizado com sucesso!', variant: 'success' });
  };

  const tabItems = [
    {
      value: 'dados',
      label: 'Dados Gerais',
      content: (
        <form onSubmit={handleSave} className="space-y-6 mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Input id="aluno" label="Aluno" value={form.aluno} onChange={(e) => updateField('aluno', e.target.value)} disabled />
            <Select
              id="empresa"
              label="Empresa"
              value={form.empresa}
              onChange={(e) => updateField('empresa', e.target.value)}
              options={[
                { value: 'TechCorp Ltda', label: 'TechCorp Ltda' },
                { value: 'Construtora ABC', label: 'Construtora ABC' },
                { value: 'Hospital Vida', label: 'Hospital Vida' },
              ]}
            />
            <Input id="dataInicio" label="Data de Inicio" type="date" value={form.dataInicio} onChange={(e) => updateField('dataInicio', e.target.value)} />
            <Input id="dataFim" label="Data de Termino" type="date" value={form.dataFim} onChange={(e) => updateField('dataFim', e.target.value)} />
            <Input id="cargaHoraria" label="Carga Horaria (horas/semana)" type="number" value={form.cargaHoraria} onChange={(e) => updateField('cargaHoraria', e.target.value)} />
            <Input id="supervisor" label="Supervisor" value={form.supervisor} onChange={(e) => updateField('supervisor', e.target.value)} />
          </div>
          <div className="flex gap-3 justify-end">
            <Button type="submit">Salvar Alteracoes</Button>
          </div>
        </form>
      ),
    },
    {
      value: 'acompanhamento',
      label: 'Acompanhamento',
      content: (
        <div className="mt-4">
          <p className="text-muted-foreground">Registro de acompanhamento do estagio.</p>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Detalhes do Estagio"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Estagios', href: '/estagio' },
          { label: form.aluno },
        ]}
        actions={
          <Badge variant={form.status === 'Ativo' ? 'success' : 'secondary'}>{form.status}</Badge>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle>{form.aluno} - {form.empresa}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs items={tabItems} defaultValue="dados" />
        </CardContent>
      </Card>
    </div>
  );
}
