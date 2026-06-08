'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card, CardContent } from '@/components/ui/Card';
import { useToast } from '@/components/ui/Toast';

export default function NovaTurmaPage() {
  const { addToast } = useToast();
  const [form, setForm] = useState({
    nome: '',
    curso: '',
    periodo: '',
    turno: '',
    vagas: '',
    sala: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.nome) newErrors.nome = 'Nome e obrigatorio';
    if (!form.curso) newErrors.curso = 'Curso e obrigatorio';
    if (!form.periodo) newErrors.periodo = 'Periodo e obrigatorio';
    if (!form.turno) newErrors.turno = 'Turno e obrigatorio';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    addToast({ title: 'Turma criada com sucesso!', variant: 'success' });
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <div>
      <PageHeader
        title="Nova Turma"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Cadastros', href: '/cadastros' },
          { label: 'Turmas', href: '/cadastros/turmas' },
          { label: 'Nova' },
        ]}
      />

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <Input id="nome" label="Nome da Turma" value={form.nome} onChange={(e) => updateField('nome', e.target.value)} error={errors.nome} placeholder="Ex: ADM-2024-1A" />
              <Select
                id="curso"
                label="Curso"
                value={form.curso}
                onChange={(e) => updateField('curso', e.target.value)}
                error={errors.curso}
                placeholder="Selecione o curso"
                options={[
                  { value: 'adm', label: 'Administracao' },
                  { value: 'enf', label: 'Enfermagem' },
                  { value: 'si', label: 'Sistemas de Informacao' },
                  { value: 'dir', label: 'Direito' },
                ]}
              />
              <Input id="periodo" label="Periodo" value={form.periodo} onChange={(e) => updateField('periodo', e.target.value)} error={errors.periodo} placeholder="Ex: 2024.1" />
              <Select
                id="turno"
                label="Turno"
                value={form.turno}
                onChange={(e) => updateField('turno', e.target.value)}
                error={errors.turno}
                placeholder="Selecione o turno"
                options={[
                  { value: 'Matutino', label: 'Matutino' },
                  { value: 'Vespertino', label: 'Vespertino' },
                  { value: 'Noturno', label: 'Noturno' },
                  { value: 'Integral', label: 'Integral' },
                ]}
              />
              <Input id="vagas" label="Vagas" type="number" value={form.vagas} onChange={(e) => updateField('vagas', e.target.value)} placeholder="Ex: 40" />
              <Input id="sala" label="Sala" value={form.sala} onChange={(e) => updateField('sala', e.target.value)} placeholder="Ex: Bloco A - Sala 101" />
            </div>
            <div className="flex gap-3 justify-end">
              <a href="/cadastros/turmas"><Button type="button" variant="outline">Cancelar</Button></a>
              <Button type="submit">Salvar Turma</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
