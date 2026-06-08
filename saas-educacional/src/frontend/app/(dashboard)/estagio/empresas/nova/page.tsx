'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useToast } from '@/components/ui/Toast';

export default function NovaEmpresaEstagioPage() {
  const { addToast } = useToast();
  const [form, setForm] = useState({
    nome: '',
    cnpj: '',
    endereco: '',
    cidade: '',
    estado: '',
    telefone: '',
    email: '',
    contato: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.nome) newErrors.nome = 'Nome e obrigatorio';
    if (!form.cidade) newErrors.cidade = 'Cidade e obrigatoria';
    if (!form.estado) newErrors.estado = 'Estado e obrigatorio';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    addToast({ title: 'Empresa cadastrada com sucesso!', variant: 'success' });
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <div>
      <PageHeader
        title="Nova Empresa"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Estagios', href: '/estagio' },
          { label: 'Empresas', href: '/estagio/empresas' },
          { label: 'Nova Empresa' },
        ]}
      />

      <Card>
        <CardHeader>
          <CardTitle>Dados da Empresa</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                id="nome"
                label="Nome da Empresa"
                value={form.nome}
                onChange={(e) => updateField('nome', e.target.value)}
                error={errors.nome}
              />
              <Input
                id="cnpj"
                label="CNPJ"
                value={form.cnpj}
                onChange={(e) => updateField('cnpj', e.target.value)}
              />
              <Input
                id="endereco"
                label="Endereco"
                value={form.endereco}
                onChange={(e) => updateField('endereco', e.target.value)}
              />
              <Input
                id="cidade"
                label="Cidade"
                value={form.cidade}
                onChange={(e) => updateField('cidade', e.target.value)}
                error={errors.cidade}
              />
              <Select
                id="estado"
                label="Estado"
                value={form.estado}
                onChange={(e) => updateField('estado', e.target.value)}
                error={errors.estado}
                placeholder="Selecione o estado"
                options={[
                  { value: 'SP', label: 'Sao Paulo' },
                  { value: 'RJ', label: 'Rio de Janeiro' },
                  { value: 'MG', label: 'Minas Gerais' },
                  { value: 'PR', label: 'Parana' },
                  { value: 'SC', label: 'Santa Catarina' },
                  { value: 'RS', label: 'Rio Grande do Sul' },
                ]}
              />
              <Input
                id="telefone"
                label="Telefone"
                value={form.telefone}
                onChange={(e) => updateField('telefone', e.target.value)}
              />
              <Input
                id="email"
                label="Email"
                type="email"
                value={form.email}
                onChange={(e) => updateField('email', e.target.value)}
              />
              <Input
                id="contato"
                label="Nome do Contato"
                value={form.contato}
                onChange={(e) => updateField('contato', e.target.value)}
              />
            </div>

            <div className="flex gap-3 justify-end">
              <a href="/estagio/empresas"><Button type="button" variant="outline">Cancelar</Button></a>
              <Button type="submit">Cadastrar Empresa</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
