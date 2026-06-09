'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useToast } from '@/components/ui/Toast';

export default function DiarioNotasPage() {
  const { addToast } = useToast();
  const [turma, setTurma] = useState('');
  const [disciplina, setDisciplina] = useState('');
  const [data, setData] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [tema, setTema] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!turma) newErrors.turma = 'Turma e obrigatoria';
    if (!disciplina) newErrors.disciplina = 'Disciplina e obrigatoria';
    if (!data) newErrors.data = 'Data e obrigatoria';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    addToast({ title: 'Registro do diario salvo com sucesso!', variant: 'success' });
  };

  return (
    <div>
      <PageHeader
        title="Notas do Diario"
        description="Registro de conteudos e atividades diarias"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Diario', href: '/diario' },
          { label: 'Notas' },
        ]}
      />

      <Card>
        <CardHeader>
          <CardTitle>Registrar Conteudo</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <Select
                id="turma"
                label="Turma"
                value={turma}
                onChange={(e) => { setTurma(e.target.value); if (errors.turma) setErrors((prev) => ({ ...prev, turma: '' })); }}
                error={errors.turma}
                placeholder="Selecione a turma"
                options={[
                  { value: '1', label: 'ADM-2024-1A (Matutino)' },
                  { value: '2', label: 'ADM-2024-1B (Noturno)' },
                  { value: '3', label: 'ENF-2024-1A (Integral)' },
                  { value: '4', label: 'SI-2024-1A (Noturno)' },
                ]}
              />
              <Select
                id="disciplina"
                label="Disciplina"
                value={disciplina}
                onChange={(e) => { setDisciplina(e.target.value); if (errors.disciplina) setErrors((prev) => ({ ...prev, disciplina: '' })); }}
                error={errors.disciplina}
                placeholder="Selecione a disciplina"
                options={[
                  { value: '1', label: 'Matematica' },
                  { value: '2', label: 'Portugues' },
                  { value: '3', label: 'Historia' },
                  { value: '4', label: 'Fisica' },
                ]}
              />
              <Input
                id="data"
                label="Data"
                type="date"
                value={data}
                onChange={(e) => { setData(e.target.value); if (errors.data) setErrors((prev) => ({ ...prev, data: '' })); }}
                error={errors.data}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Input
                id="tema"
                label="Tema da Aula"
                value={tema}
                onChange={(e) => setTema(e.target.value)}
                placeholder="Ex: Equacoes de segundo grau"
              />
              <Input
                id="conteudo"
                label="Conteudo Ministrado"
                value={conteudo}
                onChange={(e) => setConteudo(e.target.value)}
                placeholder="Descricao do conteudo"
              />
            </div>

            <Input
              id="observacoes"
              label="Observacoes"
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              placeholder="Observacoes adicionais..."
            />

            <div className="flex gap-3 justify-end">
              <a href="/diario"><Button type="button" variant="outline">Cancelar</Button></a>
              <Button type="submit">Salvar Registro</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
