'use client';

import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useToast } from '@/components/ui/Toast';

interface Ferramenta {
  id: string;
  nome: string;
  descricao: string;
  acao: string;
}

const ferramentas: Ferramenta[] = [
  { id: '1', nome: 'Backup do Sistema', descricao: 'Realizar backup completo dos dados do sistema', acao: 'Executar Backup' },
  { id: '2', nome: 'Importar Dados', descricao: 'Importar dados de planilha Excel ou CSV', acao: 'Importar' },
  { id: '3', nome: 'Exportar Dados', descricao: 'Exportar base de dados para arquivo', acao: 'Exportar' },
  { id: '4', nome: 'Log de Auditoria', descricao: 'Visualizar log de acoes dos usuarios', acao: 'Ver Logs' },
  { id: '5', nome: 'Limpar Cache', descricao: 'Limpar cache do sistema para melhorar performance', acao: 'Limpar' },
  { id: '6', nome: 'Configuracoes do Sistema', descricao: 'Parametros gerais do sistema educacional', acao: 'Configurar' },
  { id: '7', nome: 'Gerenciar Usuarios', descricao: 'Adicionar, editar ou remover usuarios do sistema', acao: 'Gerenciar' },
  { id: '8', nome: 'Envio de E-mails', descricao: 'Configuracoes de envio de e-mails automaticos', acao: 'Configurar' },
];

export default function UtilitarioPage() {
  const { addToast } = useToast();

  const handleAcao = (nome: string) => {
    addToast({ title: `"${nome}" executado com sucesso!`, variant: 'success' });
  };

  return (
    <div>
      <PageHeader
        title="Utilitarios"
        description="Ferramentas e utilitarios do sistema"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Utilitarios' },
        ]}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {ferramentas.map((ferramenta) => (
          <Card key={ferramenta.id}>
            <CardHeader>
              <CardTitle className="text-base">{ferramenta.nome}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{ferramenta.descricao}</p>
              <Button variant="outline" className="w-full" onClick={() => handleAcao(ferramenta.nome)}>
                {ferramenta.acao}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
