'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useToast } from '@/components/ui/Toast';

export default function NovaMatriculaPage() {
  const { addToast } = useToast();
  const [form, setForm] = useState({
    aluno: '',
    curso: '',
    turma: '',
    dataMatricula: '',
    observacoes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.aluno) newErrors.aluno = 'Aluno e obrigatorio';
    if (!form.curso) newErrors.curso = 'Curso e obrigatorio';
    if (!form.turma) newErrors.turma = 'Turma e obrigatoria';
    if (!form.dataMatricula) newErrors.dataMatricula = 'Data e obrigatoria';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    addToast({ title: 'Matricula realizada com sucesso!', variant: 'success' });
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <div>
      <PageHeader
        title="Nova Matricula"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Matriculas', href: '/matriculas' },
          { label: 'Nova Matricula' },
        ]}
      />

      <Card>
        <CardHeader>
          <CardTitle>Dados da Matricula</CardTitle>
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
                  { value: 'ped', label: 'Pedagogia' },
                ]}
              />
              <Select
                id="turma"
                label="Turma"
                value={form.turma}
                onChange={(e) => updateField('turma', e.target.value)}
                error={errors.turma}
                placeholder="Selecione a turma"
                options={[
                  { value: '1', label: 'ADM-2024-1A (Matutino)' },
                  { value: '2', label: 'ADM-2024-1B (Noturno)' },
                  { value: '3', label: 'ENF-2024-1A (Integral)' },
                  { value: '4', label: 'SI-2024-1A (Noturno)' },
                ]}
              />
              <Input
                id="dataMatricula"
                label="Data da Matricula"
                type="date"
                value={form.dataMatricula}
                onChange={(e) => updateField('dataMatricula', e.target.value)}
                error={errors.dataMatricula}
              />
            </div>

            <div className="flex gap-3 justify-end">
              <a href="/matriculas"><Button type="button" variant="outline">Cancelar</Button></a>
              <Button type="submit">Realizar Matricula</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
