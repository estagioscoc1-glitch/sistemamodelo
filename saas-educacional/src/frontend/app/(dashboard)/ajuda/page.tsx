'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface FAQ {
  id: string;
  pergunta: string;
  resposta: string;
  categoria: string;
}

const mockFAQ: FAQ[] = [
  { id: '1', pergunta: 'Como realizar uma nova matricula?', resposta: 'Acesse o menu Matriculas > Nova Matricula. Preencha os dados do aluno, selecione o curso e turma, e clique em Salvar.', categoria: 'Matriculas' },
  { id: '2', pergunta: 'Como lancar notas?', resposta: 'Acesse o menu Notas > Lancamento. Selecione a turma, disciplina e periodo. Preencha as notas de cada aluno e clique em Salvar.', categoria: 'Notas' },
  { id: '3', pergunta: 'Como gerar boletos?', resposta: 'Acesse Financeiro > Parcelas. Selecione as parcelas pendentes e clique em "Gerar Boleto". Os boletos serao enviados por e-mail.', categoria: 'Financeiro' },
  { id: '4', pergunta: 'Como cadastrar um novo curso?', resposta: 'Acesse Cadastros > Cursos > Novo Curso. Preencha todos os campos obrigatorios e clique em Salvar.', categoria: 'Cadastros' },
  { id: '5', pergunta: 'Como emitir o historico escolar?', resposta: 'Acesse Notas > Historico. Busque o aluno pelo nome e clique em Imprimir Historico.', categoria: 'Notas' },
  { id: '6', pergunta: 'Como registrar frequencia?', resposta: 'Acesse Diario > Chamadas. Selecione a turma, disciplina e data. Marque presenca ou falta para cada aluno.', categoria: 'Diario' },
  { id: '7', pergunta: 'Como fazer backup do sistema?', resposta: 'Acesse Utilitarios > Backup do Sistema. Clique em Executar Backup. O arquivo sera salvo automaticamente.', categoria: 'Sistema' },
  { id: '8', pergunta: 'Como renegociar uma divida?', resposta: 'Acesse Financeiro > Renegociacoes > Nova Renegociacao. Selecione o aluno, defina as condicoes e clique em Salvar Acordo.', categoria: 'Financeiro' },
];

export default function AjudaPage() {
  const [busca, setBusca] = useState('');
  const [expandido, setExpandido] = useState<string | null>(null);

  const filteredFAQ = busca
    ? mockFAQ.filter((faq) =>
        faq.pergunta.toLowerCase().includes(busca.toLowerCase()) ||
        faq.resposta.toLowerCase().includes(busca.toLowerCase())
      )
    : mockFAQ;

  return (
    <div>
      <PageHeader
        title="Ajuda"
        description="Central de ajuda e FAQ do sistema"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Ajuda' },
        ]}
      />

      <Card className="mb-6">
        <CardContent className="pt-6">
          <Input
            id="busca"
            label="Buscar na ajuda"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Digite sua duvida..."
          />
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Manual do Sistema</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">Documentacao completa do sistema</p>
            <Button variant="outline" size="sm">Abrir Manual</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Video Tutoriais</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">Aprenda com videos passo a passo</p>
            <Button variant="outline" size="sm">Ver Videos</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Suporte Tecnico</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">Entre em contato com o suporte</p>
            <Button variant="outline" size="sm">Abrir Chamado</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Perguntas Frequentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredFAQ.map((faq) => (
              <div key={faq.id} className="border rounded-md">
                <button
                  className="w-full text-left p-4 font-medium hover:bg-muted flex justify-between items-center"
                  onClick={() => setExpandido(expandido === faq.id ? null : faq.id)}
                >
                  <span>{faq.pergunta}</span>
                  <span className="text-muted-foreground">{expandido === faq.id ? '-' : '+'}</span>
                </button>
                {expandido === faq.id && (
                  <div className="px-4 pb-4 text-sm text-muted-foreground">
                    {faq.resposta}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
