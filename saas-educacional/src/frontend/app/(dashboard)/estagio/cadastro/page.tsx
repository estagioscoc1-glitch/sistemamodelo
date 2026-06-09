'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useToast } from '@/components/ui/Toast';

export default function CadastroEstagioPage() {
  const { addToast } = useToast();
  const [form, setForm] = useState({
    aluno: '',
    empresa: '',
    dataInicio: '',
    dataFim: '',
    cargaHoraria: '',
    supervisor: '',
    observacao: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.aluno) newErrors.aluno = 'Aluno e obrigatorio';
    if (!form.empresa) newErrors.empresa = 'Empresa e obrigatoria';
    if (!form.dataInicio) newErrors.dataInicio = 'Data de inicio e obrigatoria';
    if (!form.cargaHoraria) newErrors.cargaHoraria = 'Carga horaria e obrigatoria';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    addToast({ title: 'Estagio cadastrado com sucesso!', variant: 'success' });
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <div>
      <PageHeader
        title="Novo Estagio"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Estagios', href: '/estagio' },
          { label: 'Novo Estagio' },
        ]}
      />

      <Card>
        <CardHeader>
          <CardTitle>Dados do Estagio</CardTitle>
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
                id="empresa"
                label="Empresa"
                value={form.empresa}
                onChange={(e) => updateField('empresa', e.target.value)}
                error={errors.empresa}
                placeholder="Selecione a empresa"
                options={[
                  { value: '1', label: 'TechCorp Ltda' },
                  { value: '2', label: 'Construtora ABC' },
                  { value: '3', label: 'Hospital Vida' },
                  { value: '4', label: 'Escritorio Juridico Silva' },
                  { value: '5', label: 'Escola Municipal Norte' },
                ]}
              />
              <Input
                id="dataInicio"
                label="Data de Inicio"
                type="date"
                value={form.dataInicio}
                onChange={(e) => updateField('dataInicio', e.target.value)}
                error={errors.dataInicio}
              />
              <Input
                id="dataFim"
                label="Data de Termino"
                type="date"
                value={form.dataFim}
                onChange={(e) => updateField('dataFim', e.target.value)}
              />
              <Input
                id="cargaHoraria"
                label="Carga Horaria (horas/semana)"
                type="number"
                value={form.cargaHoraria}
                onChange={(e) => updateField('cargaHoraria', e.target.value)}
                error={errors.cargaHoraria}
              />
              <Input
                id="supervisor"
                label="Supervisor"
                value={form.supervisor}
                onChange={(e) => updateField('supervisor', e.target.value)}
              />
            </div>

            <div className="flex gap-3 justify-end">
              <a href="/estagio"><Button type="button" variant="outline">Cancelar</Button></a>
              <Button type="submit">Cadastrar Estagio</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
