'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useToast } from '@/components/ui/Toast';

interface TipoRelatorio {
  id: string;
  categoria: string;
  nome: string;
  descricao: string;
}

const relatoriosDisponiveis: TipoRelatorio[] = [
  { id: '1', categoria: 'Academico', nome: 'Lista de Alunos por Turma', descricao: 'Relacao de alunos matriculados por turma' },
  { id: '2', categoria: 'Academico', nome: 'Historico Escolar', descricao: 'Historico completo do aluno' },
  { id: '3', categoria: 'Academico', nome: 'Boletim Escolar', descricao: 'Boletim com notas por periodo' },
  { id: '4', categoria: 'Financeiro', nome: 'Contas a Receber', descricao: 'Relacao de parcelas em aberto' },
  { id: '5', categoria: 'Financeiro', nome: 'Inadimplencia', descricao: 'Alunos com parcelas em atraso' },
  { id: '6', categoria: 'Institucional', nome: 'Censo Escolar', descricao: 'Dados para censo educacional' },
  { id: '7', categoria: 'Institucional', nome: 'Corpo Docente', descricao: 'Relacao de professores e disciplinas' },
  { id: '8', categoria: 'Estagio', nome: 'Estagios Ativos', descricao: 'Relacao de estagios em andamento' },
];

export default function RelatorioPage() {
  const { addToast } = useToast();
  const [categoria, setCategoria] = useState('');

  const filteredRelatorios = categoria
    ? relatoriosDisponiveis.filter((r) => r.categoria === categoria)
    : relatoriosDisponiveis;

  const handleGerar = (nome: string) => {
    addToast({ title: `Relatorio "${nome}" gerado com sucesso!`, variant: 'success' });
  };

  return (
    <div>
      <PageHeader
        title="Relatorios"
        description="Central de relatorios do sistema"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Relatorios' },
        ]}
      />

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filtrar por Categoria</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Select
              id="categoria"
              label="Categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              placeholder="Todas as categorias..."
              options={[
                { value: 'Academico', label: 'Academico' },
                { value: 'Financeiro', label: 'Financeiro' },
                { value: 'Institucional', label: 'Institucional' },
                { value: 'Estagio', label: 'Estagio' },
              ]}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredRelatorios.map((relatorio) => (
          <Card key={relatorio.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary">{relatorio.categoria}</Badge>
                  </div>
                  <h3 className="font-medium">{relatorio.nome}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{relatorio.descricao}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleGerar(relatorio.nome)}>PDF</Button>
                  <Button variant="outline" size="sm" onClick={() => handleGerar(relatorio.nome)}>Excel</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
