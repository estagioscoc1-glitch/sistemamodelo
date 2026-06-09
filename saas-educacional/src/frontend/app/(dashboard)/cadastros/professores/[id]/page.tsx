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

export default function ProfessorDetailPage() {
  const { addToast } = useToast();
  const [form, setForm] = useState({
    nome: 'Prof. Maria Santos',
    cpf: '111.222.333-44',
    email: 'maria.santos@escola.edu.br',
    telefone: '(11) 98765-4321',
    departamento: 'Administracao',
    titulacao: 'Doutorado',
    lattes: 'http://lattes.cnpq.br/1234567890',
    dataAdmissao: '2018-03-15',
    status: 'Ativo',
  });

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({ title: 'Professor atualizado com sucesso!', variant: 'success' });
  };

  const tabItems = [
    {
      value: 'dados',
      label: 'Dados Pessoais',
      content: (
        <form onSubmit={handleSave} className="space-y-6 mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Input id="nome" label="Nome Completo" value={form.nome} onChange={(e) => updateField('nome', e.target.value)} />
            <Input id="cpf" label="CPF" value={form.cpf} onChange={(e) => updateField('cpf', e.target.value)} />
            <Input id="email" label="E-mail" value={form.email} onChange={(e) => updateField('email', e.target.value)} />
            <Input id="telefone" label="Telefone" value={form.telefone} onChange={(e) => updateField('telefone', e.target.value)} />
            <Select
              id="departamento"
              label="Departamento"
              value={form.departamento}
              onChange={(e) => updateField('departamento', e.target.value)}
              options={[
                { value: 'Administracao', label: 'Administracao' },
                { value: 'Ciencias Exatas', label: 'Ciencias Exatas' },
                { value: 'Saude', label: 'Saude' },
                { value: 'Direito', label: 'Direito' },
                { value: 'Educacao', label: 'Educacao' },
                { value: 'Tecnologia', label: 'Tecnologia' },
              ]}
            />
            <Select
              id="titulacao"
              label="Titulacao"
              value={form.titulacao}
              onChange={(e) => updateField('titulacao', e.target.value)}
              options={[
                { value: 'Graduacao', label: 'Graduacao' },
                { value: 'Especializacao', label: 'Especializacao' },
                { value: 'Mestrado', label: 'Mestrado' },
                { value: 'Doutorado', label: 'Doutorado' },
                { value: 'Pos-Doutorado', label: 'Pos-Doutorado' },
              ]}
            />
            <Input id="lattes" label="Link Lattes" value={form.lattes} onChange={(e) => updateField('lattes', e.target.value)} />
            <Input id="dataAdmissao" label="Data de Admissao" type="date" value={form.dataAdmissao} onChange={(e) => updateField('dataAdmissao', e.target.value)} />
          </div>
          <div className="flex gap-3 justify-end">
            <Button type="submit">Salvar Alteracoes</Button>
          </div>
        </form>
      ),
    },
    {
      value: 'disciplinas',
      label: 'Disciplinas',
      content: (
        <div className="mt-4">
          <p className="text-muted-foreground">Disciplinas ministradas por este professor.</p>
        </div>
      ),
    },
    {
      value: 'turmas',
      label: 'Turmas',
      content: (
        <div className="mt-4">
          <p className="text-muted-foreground">Turmas atribuidas a este professor.</p>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Editar Professor"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Cadastros', href: '/cadastros' },
          { label: 'Professores', href: '/cadastros/professores' },
          { label: form.nome },
        ]}
        actions={
          <Badge variant={form.status === 'Ativo' ? 'success' : 'warning'}>{form.status}</Badge>
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
