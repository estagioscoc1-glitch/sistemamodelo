'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card, CardContent } from '@/components/ui/Card';
import { useToast } from '@/components/ui/Toast';

export default function NovoProfessorPage() {
  const { addToast } = useToast();
  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    departamento: '',
    titulacao: '',
    lattes: '',
    dataAdmissao: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.nome) newErrors.nome = 'Nome e obrigatorio';
    if (!form.cpf) newErrors.cpf = 'CPF e obrigatorio';
    if (!form.email) newErrors.email = 'E-mail e obrigatorio';
    if (!form.departamento) newErrors.departamento = 'Departamento e obrigatorio';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    addToast({ title: 'Professor cadastrado com sucesso!', variant: 'success' });
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <div>
      <PageHeader
        title="Novo Professor"
        description="Cadastrar novo professor"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Cadastros', href: '/cadastros' },
          { label: 'Professores', href: '/cadastros/professores' },
          { label: 'Novo' },
        ]}
      />

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                id="nome"
                label="Nome Completo"
                value={form.nome}
                onChange={(e) => updateField('nome', e.target.value)}
                error={errors.nome}
                placeholder="Ex: Prof. Maria Santos"
              />
              <Input
                id="cpf"
                label="CPF"
                value={form.cpf}
                onChange={(e) => updateField('cpf', e.target.value)}
                error={errors.cpf}
                placeholder="000.000.000-00"
              />
              <Input
                id="email"
                label="E-mail"
                type="email"
                value={form.email}
                onChange={(e) => updateField('email', e.target.value)}
                error={errors.email}
                placeholder="professor@escola.edu.br"
              />
              <Input
                id="telefone"
                label="Telefone"
                value={form.telefone}
                onChange={(e) => updateField('telefone', e.target.value)}
                placeholder="(00) 00000-0000"
              />
              <Select
                id="departamento"
                label="Departamento"
                value={form.departamento}
                onChange={(e) => updateField('departamento', e.target.value)}
                error={errors.departamento}
                placeholder="Selecione..."
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
                placeholder="Selecione..."
                options={[
                  { value: 'Graduacao', label: 'Graduacao' },
                  { value: 'Especializacao', label: 'Especializacao' },
                  { value: 'Mestrado', label: 'Mestrado' },
                  { value: 'Doutorado', label: 'Doutorado' },
                  { value: 'Pos-Doutorado', label: 'Pos-Doutorado' },
                ]}
              />
              <Input
                id="lattes"
                label="Link Lattes"
                value={form.lattes}
                onChange={(e) => updateField('lattes', e.target.value)}
                placeholder="http://lattes.cnpq.br/..."
              />
              <Input
                id="dataAdmissao"
                label="Data de Admissao"
                type="date"
                value={form.dataAdmissao}
                onChange={(e) => updateField('dataAdmissao', e.target.value)}
              />
            </div>

            <div className="flex gap-3 justify-end">
              <a href="/cadastros/professores">
                <Button type="button" variant="outline">Cancelar</Button>
              </a>
              <Button type="submit">Salvar Professor</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
