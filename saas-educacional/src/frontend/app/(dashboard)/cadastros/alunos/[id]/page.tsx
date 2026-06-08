'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';
import { useToast } from '@/components/ui/Toast';

export default function AlunoDetailPage() {
  const { addToast } = useToast();
  const [form, setForm] = useState({
    nome: 'Ana Silva Santos',
    cpf: '123.456.789-00',
    rg: '12.345.678-9',
    dataNascimento: '1998-05-15',
    email: 'ana@email.com',
    telefone: '(11) 99999-0000',
    endereco: 'Rua das Flores, 123',
    cidade: 'Sao Paulo',
    estado: 'SP',
    cep: '01234-567',
    status: 'Ativo',
  });

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({ title: 'Aluno atualizado com sucesso!', variant: 'success' });
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
            <Input id="rg" label="RG" value={form.rg} onChange={(e) => updateField('rg', e.target.value)} />
            <Input id="dataNascimento" label="Data de Nascimento" type="date" value={form.dataNascimento} onChange={(e) => updateField('dataNascimento', e.target.value)} />
            <Input id="email" label="Email" type="email" value={form.email} onChange={(e) => updateField('email', e.target.value)} />
            <Input id="telefone" label="Telefone" value={form.telefone} onChange={(e) => updateField('telefone', e.target.value)} />
          </div>
          <div className="flex gap-3 justify-end">
            <Button type="submit">Salvar Alteracoes</Button>
          </div>
        </form>
      ),
    },
    {
      value: 'matriculas',
      label: 'Matriculas',
      content: (
        <div className="mt-4">
          <p className="text-muted-foreground">Historico de matriculas do aluno.</p>
        </div>
      ),
    },
    {
      value: 'financeiro',
      label: 'Financeiro',
      content: (
        <div className="mt-4">
          <p className="text-muted-foreground">Situacao financeira do aluno.</p>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Editar Aluno"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Cadastros', href: '/cadastros' },
          { label: 'Alunos', href: '/cadastros/alunos' },
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
