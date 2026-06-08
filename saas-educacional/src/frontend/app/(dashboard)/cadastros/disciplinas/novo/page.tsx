'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card, CardContent } from '@/components/ui/Card';
import { useToast } from '@/components/ui/Toast';

export default function NovaDisciplinaPage() {
  const { addToast } = useToast();
  const [form, setForm] = useState({
    nome: '',
    codigo: '',
    cargaHoraria: '',
    curso: '',
    periodo: '',
    ementa: '',
    prerequisitos: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.nome) newErrors.nome = 'Nome e obrigatorio';
    if (!form.codigo) newErrors.codigo = 'Codigo e obrigatorio';
    if (!form.cargaHoraria) newErrors.cargaHoraria = 'Carga horaria e obrigatoria';
    if (!form.curso) newErrors.curso = 'Curso e obrigatorio';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    addToast({ title: 'Disciplina criada com sucesso!', variant: 'success' });
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <div>
      <PageHeader
        title="Nova Disciplina"
        description="Cadastrar nova disciplina"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Cadastros', href: '/cadastros' },
          { label: 'Disciplinas', href: '/cadastros/disciplinas' },
          { label: 'Nova' },
        ]}
      />

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                id="nome"
                label="Nome da Disciplina"
                value={form.nome}
                onChange={(e) => updateField('nome', e.target.value)}
                error={errors.nome}
                placeholder="Ex: Matematica I"
              />
              <Input
                id="codigo"
                label="Codigo"
                value={form.codigo}
                onChange={(e) => updateField('codigo', e.target.value)}
                error={errors.codigo}
                placeholder="Ex: MAT101"
              />
              <Input
                id="cargaHoraria"
                label="Carga Horaria"
                value={form.cargaHoraria}
                onChange={(e) => updateField('cargaHoraria', e.target.value)}
                error={errors.cargaHoraria}
                placeholder="Ex: 80h"
              />
              <Select
                id="curso"
                label="Curso"
                value={form.curso}
                onChange={(e) => updateField('curso', e.target.value)}
                error={errors.curso}
                placeholder="Selecione..."
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
                placeholder="Selecione..."
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
              <Input
                id="prerequisitos"
                label="Pre-requisitos"
                value={form.prerequisitos}
                onChange={(e) => updateField('prerequisitos', e.target.value)}
                placeholder="Ex: MAT100"
              />
            </div>

            <div className="flex gap-3 justify-end">
              <a href="/cadastros/disciplinas">
                <Button type="button" variant="outline">Cancelar</Button>
              </a>
              <Button type="submit">Salvar Disciplina</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
