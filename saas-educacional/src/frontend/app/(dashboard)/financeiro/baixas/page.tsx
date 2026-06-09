'use client';

import React, { useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { DataTable, type Column } from '@/components/shared/DataTable';

interface Baixa {
  id: string;
  aluno: string;
  parcela: string;
  valor: string;
  dataPagamento: string;
  formaPagamento: string;
  usuario: string;
  [key: string]: unknown;
}

const columns: Column<Baixa>[] = [
  { key: 'aluno', header: 'Aluno', sortable: true },
  { key: 'parcela', header: 'Parcela' },
  { key: 'valor', header: 'Valor' },
  { key: 'dataPagamento', header: 'Data Pagamento', sortable: true },
  { key: 'formaPagamento', header: 'Forma Pagamento' },
  { key: 'usuario', header: 'Registrado por' },
];

export default function BaixasPage() {
  const { data, isLoading, error, execute } = useApi<Baixa[]>('/financeiro/baixas');

  useEffect(() => { execute(); }, [execute]);

  if (isLoading) return <div className="p-6">Carregando...</div>;
  if (error) return <div className="p-6 text-red-500">Erro: {error}</div>;

  return (
    <div>
      <PageHeader
        title="Baixas"
        description="Registro de pagamentos recebidos"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Financeiro', href: '/financeiro' },
          { label: 'Baixas' },
        ]}
        actions={
          <a href="/financeiro/parcelas">
            <Button>Registrar Baixa</Button>
          </a>
        }
      />

      <DataTable
        data={data || []}
        columns={columns}
        searchKey="aluno"
        searchPlaceholder="Buscar por aluno..."
        actions={(item) => (
          <a href={`/financeiro/${item.id}`}>
            <Button variant="ghost" size="sm">Detalhes</Button>
          </a>
        )}
      />
    </div>
  );
}
