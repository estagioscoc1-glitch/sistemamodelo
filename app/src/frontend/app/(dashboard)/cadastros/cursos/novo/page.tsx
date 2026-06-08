'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card, CardContent } from '@/components/ui/Card';
import { useToast } from '@/components/ui/Toast';

export default function NovoCursoPage() {
  const { addToast } = useToast();
  const [form, setForm] = useState({
    nome: '',
    codigo: '',
    duracao: '',
    modalidade: '',
    descricao: '',
    coordenador: '',
    vagas: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.nome) newErrors.nome = 'Nome e obrigatorio';
    if (!form.codigo) newErrors.codigo = 'Codigo e obrigatorio';
    if (!form.duracao) newErrors.duracao = 'Duracao e obrigatoria';
    if (!form.modalidade) newErrors.modalidade = 'Modalidade e obrigatoria';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    addToast({ title: 'Curso criado com sucesso!', variant: 'success' });
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <div>
      <PageHeader
        title="Novo Curso"
        description="Cadastrar novo curso"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Cadastros', href: '/cadastros' },
          { label: 'Cursos', href: '/cadastros/cursos' },
          { label: 'Novo' },
        ]}
      />

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                id="nome"
                label="Nome do Curso"
                value={form.nome}
                onChange={(e) => updateField('nome', e.target.value)}
                error={errors.nome}
                placeholder="Ex: Administracao"
              />
              <Input
                id="codigo"
                label="Codigo"
                value={form.codigo}
                onChange={(e) => updateField('codigo', e.target.value)}
                error={errors.codigo}
                placeholder="Ex: ADM001"
              />
              <Input
                id="duracao"
                label="Duracao"
                value={form.duracao}
                onChange={(e) => updateField('duracao', e.target.value)}
                error={errors.duracao}
                placeholder="Ex: 4 anos"
              />
              <Select
                id="modalidade"
                label="Modalidade"
                value={form.modalidade}
                onChange={(e) => updateField('modalidade', e.target.value)}
                error={errors.modalidade}
                placeholder="Selecione..."
                options={[
                  { value: 'Presencial', label: 'Presencial' },
                  { value: 'EAD', label: 'EAD' },
                  { value: 'Hibrido', label: 'Hibrido' },
                ]}
              />
              <Input
                id="coordenador"
                label="Coordenador"
                value={form.coordenador}
                onChange={(e) => updateField('coordenador', e.target.value)}
                placeholder="Nome do coordenador"
              />
              <Input
                id="vagas"
                label="Vagas por Turma"
                type="number"
                value={form.vagas}
                onChange={(e) => updateField('vagas', e.target.value)}
                placeholder="Ex: 40"
              />
            </div>

            <div className="flex gap-3 justify-end">
              <a href="/cadastros/cursos">
                <Button type="button" variant="outline">Cancelar</Button>
              </a>
              <Button type="submit">Salvar Curso</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
