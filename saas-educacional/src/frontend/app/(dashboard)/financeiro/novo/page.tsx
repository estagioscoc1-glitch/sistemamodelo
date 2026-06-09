'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useToast } from '@/components/ui/Toast';

export default function NovaContaFinanceiroPage() {
  const { addToast } = useToast();
  const [form, setForm] = useState({
    aluno: '',
    descricao: '',
    valorTotal: '',
    vencimento: '',
    parcelas: '',
    dataInicio: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.aluno) newErrors.aluno = 'Aluno e obrigatorio';
    if (!form.valorTotal) newErrors.valorTotal = 'Valor total e obrigatorio';
    if (!form.parcelas) newErrors.parcelas = 'Numero de parcelas e obrigatorio';
    if (!form.dataInicio) newErrors.dataInicio = 'Data de inicio e obrigatoria';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    addToast({ title: 'Conta criada e parcelas geradas com sucesso!', variant: 'success' });
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <div>
      <PageHeader
        title="Nova Conta"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Financeiro', href: '/financeiro' },
          { label: 'Nova Conta' },
        ]}
      />

      <Card>
        <CardHeader>
          <CardTitle>Dados da Conta</CardTitle>
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
              <Input
                id="descricao"
                label="Descricao"
                value={form.descricao}
                onChange={(e) => updateField('descricao', e.target.value)}
                placeholder="Ex: Mensalidade 2024"
              />
              <Input
                id="valorTotal"
                label="Valor Total (R$)"
                type="number"
                value={form.valorTotal}
                onChange={(e) => updateField('valorTotal', e.target.value)}
                error={errors.valorTotal}
              />
              <Input
                id="vencimento"
                label="Vencimento da Conta"
                type="date"
                value={form.vencimento}
                onChange={(e) => updateField('vencimento', e.target.value)}
              />
              <Input
                id="parcelas"
                label="Numero de Parcelas"
                type="number"
                value={form.parcelas}
                onChange={(e) => updateField('parcelas', e.target.value)}
                error={errors.parcelas}
              />
              <Input
                id="dataInicio"
                label="Data da Primeira Parcela"
                type="date"
                value={form.dataInicio}
                onChange={(e) => updateField('dataInicio', e.target.value)}
                error={errors.dataInicio}
              />
            </div>

            <div className="flex gap-3 justify-end">
              <a href="/financeiro"><Button type="button" variant="outline">Cancelar</Button></a>
              <Button type="submit">Criar Conta e Gerar Parcelas</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
