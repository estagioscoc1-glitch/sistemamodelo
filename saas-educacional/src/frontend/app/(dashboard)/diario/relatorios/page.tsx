'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useToast } from '@/components/ui/Toast';

export default function DiarioRelatoriosPage() {
  const { addToast } = useToast();
  const [tipoRelatorio, setTipoRelatorio] = useState('');
  const [turma, setTurma] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');

  const handleGerar = () => {
    addToast({ title: 'Relatorio gerado com sucesso!', variant: 'success' });
  };

  return (
    <div>
      <PageHeader
        title="Relatorios do Diario"
        description="Geracao de relatorios de frequencia e diario de classe"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Diario', href: '/diario' },
          { label: 'Relatorios' },
        ]}
      />

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Configurar Relatorio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <Select
              id="tipoRelatorio"
              label="Tipo de Relatorio"
              value={tipoRelatorio}
              onChange={(e) => setTipoRelatorio(e.target.value)}
              placeholder="Selecione o tipo..."
              options={[
                { value: 'frequencia', label: 'Relatorio de Frequencia' },
                { value: 'diario-classe', label: 'Diario de Classe' },
                { value: 'faltas', label: 'Relatorio de Faltas' },
                { value: 'conteudo', label: 'Conteudo Ministrado' },
                { value: 'resumo', label: 'Resumo Geral' },
              ]}
            />
            <Select
              id="turma"
              label="Turma"
              value={turma}
              onChange={(e) => setTurma(e.target.value)}
              placeholder="Selecione a turma..."
              options={[
                { value: 'ADM-2024-1A', label: 'ADM-2024-1A' },
                { value: 'SI-2024-1A', label: 'SI-2024-1A' },
                { value: 'ENF-2024-1A', label: 'ENF-2024-1A' },
                { value: 'DIR-2023-2A', label: 'DIR-2023-2A' },
              ]}
            />
            <Input
              id="dataInicio"
              label="Data Inicio"
              type="date"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
            />
            <Input
              id="dataFim"
              label="Data Fim"
              type="date"
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
            />
          </div>
          <div className="flex gap-3 justify-end mt-6">
            <Button variant="outline" onClick={handleGerar}>Visualizar</Button>
            <Button onClick={handleGerar}>Gerar PDF</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Frequencia Geral</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">87.5%</p>
            <p className="text-sm text-muted-foreground">Media de presenca no periodo</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Aulas Registradas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">156</p>
            <p className="text-sm text-muted-foreground">Total no periodo</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Alunos com Risco</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-destructive">8</p>
            <p className="text-sm text-muted-foreground">Frequencia abaixo de 75%</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
