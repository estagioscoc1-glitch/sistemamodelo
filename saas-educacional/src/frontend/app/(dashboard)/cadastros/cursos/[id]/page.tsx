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

export default function CursoDetailPage() {
  const { addToast } = useToast();
  const [form, setForm] = useState({
    nome: 'Administracao',
    codigo: 'ADM001',
    duracao: '4 anos',
    modalidade: 'Presencial',
    descricao: 'Curso de Bacharelado em Administracao',
    coordenador: 'Prof. Maria Santos',
    vagas: '40',
    status: 'Ativo',
  });

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({ title: 'Curso atualizado com sucesso!', variant: 'success' });
  };

  const tabItems = [
    {
      value: 'dados',
      label: 'Dados Gerais',
      content: (
        <form onSubmit={handleSave} className="space-y-6 mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Input id="nome" label="Nome do Curso" value={form.nome} onChange={(e) => updateField('nome', e.target.value)} />
            <Input id="codigo" label="Codigo" value={form.codigo} onChange={(e) => updateField('codigo', e.target.value)} />
            <Input id="duracao" label="Duracao" value={form.duracao} onChange={(e) => updateField('duracao', e.target.value)} />
            <Select
              id="modalidade"
              label="Modalidade"
              value={form.modalidade}
              onChange={(e) => updateField('modalidade', e.target.value)}
              options={[
                { value: 'Presencial', label: 'Presencial' },
                { value: 'EAD', label: 'EAD' },
                { value: 'Hibrido', label: 'Hibrido' },
              ]}
            />
            <Input id="coordenador" label="Coordenador" value={form.coordenador} onChange={(e) => updateField('coordenador', e.target.value)} />
            <Input id="vagas" label="Vagas por Turma" type="number" value={form.vagas} onChange={(e) => updateField('vagas', e.target.value)} />
          </div>
          <div className="flex gap-3 justify-end">
            <Button type="submit">Salvar Alteracoes</Button>
          </div>
        </form>
      ),
    },
    {
      value: 'turmas',
      label: 'Turmas',
      content: (
        <div className="mt-4">
          <p className="text-muted-foreground">Turmas vinculadas a este curso.</p>
        </div>
      ),
    },
    {
      value: 'disciplinas',
      label: 'Disciplinas',
      content: (
        <div className="mt-4">
          <p className="text-muted-foreground">Grade curricular do curso.</p>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Editar Curso"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Cadastros', href: '/cadastros' },
          { label: 'Cursos', href: '/cadastros/cursos' },
          { label: form.nome },
        ]}
        actions={
          <Badge variant={form.status === 'Ativo' ? 'success' : 'secondary'}>{form.status}</Badge>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle>{form.nome}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs items={tabItems} defaultValue="dados" />
        </CardContent>
      </Card>
    </div>
  );
}
