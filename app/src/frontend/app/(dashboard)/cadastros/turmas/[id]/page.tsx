'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useToast } from '@/components/ui/Toast';

export default function TurmaDetailPage() {
  const { addToast } = useToast();
  const [form, setForm] = useState({
    nome: 'ADM-2024-1A',
    curso: 'Administracao',
    periodo: '2024.1',
    turno: 'Matutino',
    vagas: '40',
    sala: 'Bloco A - Sala 101',
  });

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({ title: 'Turma atualizada com sucesso!', variant: 'success' });
  };

  return (
    <div>
      <PageHeader
        title="Editar Turma"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Cadastros', href: '/cadastros' },
          { label: 'Turmas', href: '/cadastros/turmas' },
          { label: form.nome },
        ]}
      />

      <Card>
        <CardHeader>
          <CardTitle>{form.nome}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <Input id="nome" label="Nome da Turma" value={form.nome} onChange={(e) => updateField('nome', e.target.value)} />
              <Input id="curso" label="Curso" value={form.curso} onChange={(e) => updateField('curso', e.target.value)} />
              <Input id="periodo" label="Periodo" value={form.periodo} onChange={(e) => updateField('periodo', e.target.value)} />
              <Select
                id="turno"
                label="Turno"
                value={form.turno}
                onChange={(e) => updateField('turno', e.target.value)}
                options={[
                  { value: 'Matutino', label: 'Matutino' },
                  { value: 'Vespertino', label: 'Vespertino' },
                  { value: 'Noturno', label: 'Noturno' },
                  { value: 'Integral', label: 'Integral' },
                ]}
              />
              <Input id="vagas" label="Vagas" type="number" value={form.vagas} onChange={(e) => updateField('vagas', e.target.value)} />
              <Input id="sala" label="Sala" value={form.sala} onChange={(e) => updateField('sala', e.target.value)} />
            </div>
            <div className="flex gap-3 justify-end">
              <Button type="submit">Salvar Alteracoes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
