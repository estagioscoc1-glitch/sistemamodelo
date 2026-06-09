'use client';

import React, { useState } from 'react';
import { useApi } from '@/hooks/useApi';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface ResultadoPesquisa {
  id: string;
  tipo: string;
  titulo: string;
  descricao: string;
}

export default function PesquisaPage() {
  const [termo, setTermo] = useState('');
  const [tipo, setTipo] = useState('');
  const { data, isLoading, execute } = useApi<ResultadoPesquisa[]>('/pesquisa');
  const [buscou, setBuscou] = useState(false);

  const handleBuscar = () => {
    execute();
    setBuscou(true);
  };

  return (
    <div>
      <PageHeader
        title="Pesquisa Avancada"
        description="Busca avancada em todo o sistema"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Pesquisa' },
        ]}
      />

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filtros de Busca</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Input
              id="termo"
              label="Termo de Busca"
              value={termo}
              onChange={(e) => setTermo(e.target.value)}
              placeholder="Digite o que procura..."
            />
            <Select
              id="tipo"
              label="Tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              placeholder="Todos os tipos..."
              options={[
                { value: 'aluno', label: 'Aluno' },
                { value: 'professor', label: 'Professor' },
                { value: 'curso', label: 'Curso' },
                { value: 'disciplina', label: 'Disciplina' },
                { value: 'turma', label: 'Turma' },
                { value: 'matricula', label: 'Matricula' },
              ]}
            />
            <div className="flex items-end">
              <Button onClick={handleBuscar}>Buscar</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {buscou && (
        <Card>
          <CardHeader>
            <CardTitle>Resultados ({isLoading ? '...' : (data || []).length})</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-center py-4">Carregando...</p>
            ) : (
              <div className="space-y-3">
                {(data || []).map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-md border hover:bg-muted">
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{item.tipo}</Badge>
                        <span className="font-medium">{item.titulo}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{item.descricao}</p>
                    </div>
                    <Button variant="ghost" size="sm">Ver</Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
