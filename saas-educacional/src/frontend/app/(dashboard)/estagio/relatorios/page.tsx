'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useToast } from '@/components/ui/Toast';

export default function EstagioRelatoriosPage() {
  const { addToast } = useToast();
  const [tipoRelatorio, setTipoRelatorio] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');

  const handleGerar = () => {
    addToast({ title: 'Relatorio gerado com sucesso!', variant: 'success' });
  };

  return (
    <div>
      <PageHeader
        title="Relatorios de Estagio"
        description="Geracao de relatorios de estagio"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Estagio', href: '/estagio' },
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
                { value: 'geral', label: 'Relatorio Geral de Estagios' },
                { value: 'empresa', label: 'Relatorio por Empresa' },
                { value: 'aluno', label: 'Relatorio por Aluno' },
                { value: 'horas', label: 'Controle de Horas' },
                { value: 'avaliacao', label: 'Avaliacoes de Desempenho' },
              ]}
            />
            <Select
              id="empresa"
              label="Empresa"
              value={empresa}
              onChange={(e) => setEmpresa(e.target.value)}
              placeholder="Todas as empresas..."
              options={[
                { value: 'techcorp', label: 'TechCorp Ltda' },
                { value: 'construtora', label: 'Construtora ABC' },
                { value: 'hospital', label: 'Hospital Vida' },
                { value: 'escritorio', label: 'Escritorio Juridico Silva' },
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
            <CardTitle className="text-sm">Estagios Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">24</p>
            <p className="text-sm text-muted-foreground">Em andamento</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Empresas Conveniadas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">15</p>
            <p className="text-sm text-muted-foreground">Parcerias ativas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Concluidos no Periodo</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">8</p>
            <p className="text-sm text-muted-foreground">Finalizados com sucesso</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
