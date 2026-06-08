'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useToast } from '@/components/ui/Toast';

export default function NovoRequerimentoPage() {
  const { addToast } = useToast();
  const [form, setForm] = useState({
    aluno: '',
    tipo: '',
    descricao: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.aluno) newErrors.aluno = 'Aluno e obrigatorio';
    if (!form.tipo) newErrors.tipo = 'Tipo e obrigatorio';
    if (!form.descricao) newErrors.descricao = 'Descricao e obrigatoria';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    addToast({ title: 'Requerimento criado com sucesso!', variant: 'success' });
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <div>
      <PageHeader
        title="Novo Requerimento"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Requerimentos', href: '/requerimentos' },
          { label: 'Novo Requerimento' },
        ]}
      />

      <Card>
        <CardHeader>
          <CardTitle>Dados do Requerimento</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <Select
                id="aluno"
                label="Aluno"
                value={form.aluno}
                onChange={(e) => updateField('aluno', e.target.value)}
                error={errors.aluno}
                placeholder="Selecione o aluno"
                options={[
                  { value: '1', label: 'Ana Silva Santos' },
                  { value: '2', label: 'Joao Pedro Oliveira' },
                  { value: '3', label: 'Maria Fernandes Costa' },
                  { value: '4', label: 'Carlos Eduardo Lima' },
                  { value: '5', label: 'Juliana Almeida' },
                ]}
              />
              <Select
                id="tipo"
                label="Tipo"
                value={form.tipo}
                onChange={(e) => updateField('tipo', e.target.value)}
                error={errors.tipo}
                placeholder="Selecione o tipo"
                options={[
                  { value: 'Segunda Via', label: 'Segunda Via' },
                  { value: 'Trancamento', label: 'Trancamento' },
                  { value: 'Aproveitamento', label: 'Aproveitamento' },
                  { value: 'Revisao de Nota', label: 'Revisao de Nota' },
                  { value: 'Declaracao', label: 'Declaracao' },
                  { value: 'Outros', label: 'Outros' },
                ]}
              />
            </div>

            <div>
              <label htmlFor="descricao" className="block text-sm font-medium text-foreground mb-1">
                Descricao
              </label>
              <textarea
                id="descricao"
                className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={form.descricao}
                onChange={(e) => updateField('descricao', e.target.value)}
                placeholder="Descreva o requerimento..."
              />
              {errors.descricao && <p className="text-sm text-destructive mt-1">{errors.descricao}</p>}
            </div>

            <div className="flex gap-3 justify-end">
              <a href="/requerimentos"><Button type="button" variant="outline">Cancelar</Button></a>
              <Button type="submit">Criar Requerimento</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
