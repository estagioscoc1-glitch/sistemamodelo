'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card, CardContent } from '@/components/ui/Card';
import { useToast } from '@/components/ui/Toast';

export default function NovoAlunoPage() {
  const { addToast } = useToast();
  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    rg: '',
    dataNascimento: '',
    email: '',
    telefone: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
    curso: '',
    turma: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.nome) newErrors.nome = 'Nome e obrigatorio';
    if (!form.cpf) newErrors.cpf = 'CPF e obrigatorio';
    if (!form.email) newErrors.email = 'Email e obrigatorio';
    if (!form.dataNascimento) newErrors.dataNascimento = 'Data de nascimento e obrigatoria';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    addToast({ title: 'Aluno cadastrado com sucesso!', variant: 'success' });
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <div>
      <PageHeader
        title="Novo Aluno"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Cadastros', href: '/cadastros' },
          { label: 'Alunos', href: '/cadastros/alunos' },
          { label: 'Novo' },
        ]}
      />

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Dados Pessoais</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <Input id="nome" label="Nome Completo" value={form.nome} onChange={(e) => updateField('nome', e.target.value)} error={errors.nome} placeholder="Nome completo do aluno" />
                <Input id="cpf" label="CPF" value={form.cpf} onChange={(e) => updateField('cpf', e.target.value)} error={errors.cpf} placeholder="000.000.000-00" />
                <Input id="rg" label="RG" value={form.rg} onChange={(e) => updateField('rg', e.target.value)} placeholder="Documento de identidade" />
                <Input id="dataNascimento" label="Data de Nascimento" type="date" value={form.dataNascimento} onChange={(e) => updateField('dataNascimento', e.target.value)} error={errors.dataNascimento} />
                <Input id="email" label="Email" type="email" value={form.email} onChange={(e) => updateField('email', e.target.value)} error={errors.email} placeholder="email@exemplo.com" />
                <Input id="telefone" label="Telefone" value={form.telefone} onChange={(e) => updateField('telefone', e.target.value)} placeholder="(00) 00000-0000" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Endereco</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <Input id="endereco" label="Endereco" value={form.endereco} onChange={(e) => updateField('endereco', e.target.value)} placeholder="Rua, numero, complemento" className="md:col-span-2" />
                <Input id="cidade" label="Cidade" value={form.cidade} onChange={(e) => updateField('cidade', e.target.value)} />
                <Select
                  id="estado"
                  label="Estado"
                  value={form.estado}
                  onChange={(e) => updateField('estado', e.target.value)}
                  placeholder="Selecione"
                  options={[
                    { value: 'SP', label: 'Sao Paulo' },
                    { value: 'RJ', label: 'Rio de Janeiro' },
                    { value: 'MG', label: 'Minas Gerais' },
                    { value: 'PR', label: 'Parana' },
                    { value: 'SC', label: 'Santa Catarina' },
                  ]}
                />
                <Input id="cep" label="CEP" value={form.cep} onChange={(e) => updateField('cep', e.target.value)} placeholder="00000-000" />
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <a href="/cadastros/alunos"><Button type="button" variant="outline">Cancelar</Button></a>
              <Button type="submit">Cadastrar Aluno</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
