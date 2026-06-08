'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useToast } from '@/components/ui/Toast';

export default function NovaAtaPage() {
  const { addToast } = useToast();
  const [form, setForm] = useState({
    titulo: '',
    data: '',
    tipo: '',
    conteudo: '',
    participantes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.titulo) newErrors.titulo = 'Titulo e obrigatorio';
    if (!form.data) newErrors.data = 'Data e obrigatoria';
    if (!form.tipo) newErrors.tipo = 'Tipo e obrigatorio';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    addToast({ title: 'Ata criada com sucesso!', variant: 'success' });
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <div>
      <PageHeader
        title="Nova Ata"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Atas', href: '/atas' },
          { label: 'Nova Ata' },
        ]}
      />

      <Card>
        <CardHeader>
          <CardTitle>Dados da Ata</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                id="titulo"
                label="Titulo"
                value={form.titulo}
                onChange={(e) => updateField('titulo', e.target.value)}
                error={errors.titulo}
                placeholder="Titulo da ata"
              />
              <Input
                id="data"
                label="Data"
                type="date"
                value={form.data}
                onChange={(e) => updateField('data', e.target.value)}
                error={errors.data}
              />
              <Select
                id="tipo"
                label="Tipo"
                value={form.tipo}
                onChange={(e) => updateField('tipo', e.target.value)}
                error={errors.tipo}
                placeholder="Selecione o tipo"
                options={[
                  { value: 'Reuniao de Conselho', label: 'Reuniao de Conselho' },
                  { value: 'Assembleia', label: 'Assembleia' },
                  { value: 'Colegiado', label: 'Colegiado' },
                  { value: 'Outros', label: 'Outros' },
                ]}
              />
              <Input
                id="participantes"
                label="Participantes"
                value={form.participantes}
                onChange={(e) => updateField('participantes', e.target.value)}
                placeholder="Nomes dos participantes"
              />
            </div>

            <div>
              <label htmlFor="conteudo" className="block text-sm font-medium text-foreground mb-1">
                Conteudo
              </label>
              <textarea
                id="conteudo"
                className="w-full min-h-[150px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={form.conteudo}
                onChange={(e) => updateField('conteudo', e.target.value)}
                placeholder="Conteudo da ata..."
              />
            </div>

            <div className="flex gap-3 justify-end">
              <a href="/atas"><Button type="button" variant="outline">Cancelar</Button></a>
              <Button type="submit">Criar Ata</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
