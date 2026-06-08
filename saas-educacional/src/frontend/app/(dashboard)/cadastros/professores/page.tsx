'use client';

import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DataTable, type Column } from '@/components/shared/DataTable';

interface Professor {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  departamento: string;
  titulacao: string;
  status: string;
  [key: string]: unknown;
}

const mockProfessores: Professor[] = [
  { id: '1', nome: 'Prof. Maria Santos', cpf: '111.222.333-44', email: 'maria.santos@escola.edu.br', departamento: 'Administracao', titulacao: 'Doutorado', status: 'Ativo' },
  { id: '2', nome: 'Prof. Carlos Oliveira', cpf: '222.333.444-55', email: 'carlos.oliveira@escola.edu.br', departamento: 'Ciencias Exatas', titulacao: 'Mestrado', status: 'Ativo' },
  { id: '3', nome: 'Prof. Ana Paula Lima', cpf: '333.444.555-66', email: 'ana.lima@escola.edu.br', departamento: 'Saude', titulacao: 'Doutorado', status: 'Ativo' },
  { id: '4', nome: 'Prof. Roberto Alves', cpf: '444.555.666-77', email: 'roberto.alves@escola.edu.br', departamento: 'Direito', titulacao: 'Mestrado', status: 'Ativo' },
  { id: '5', nome: 'Prof. Lucia Fernandes', cpf: '555.666.777-88', email: 'lucia.fernandes@escola.edu.br', departamento: 'Educacao', titulacao: 'Doutorado', status: 'Afastado' },
  { id: '6', nome: 'Prof. Paulo Mendes', cpf: '666.777.888-99', email: 'paulo.mendes@escola.edu.br', departamento: 'Tecnologia', titulacao: 'Especializacao', status: 'Ativo' },
];

const columns: Column<Professor>[] = [
  { key: 'nome', header: 'Nome', sortable: true },
  { key: 'cpf', header: 'CPF' },
  { key: 'email', header: 'E-mail' },
  { key: 'departamento', header: 'Departamento', sortable: true },
  { key: 'titulacao', header: 'Titulacao' },
  {
    key: 'status',
    header: 'Status',
    render: (item) => (
      <Badge variant={item.status === 'Ativo' ? 'success' : 'warning'}>{item.status}</Badge>
    ),
  },
];

export default function ProfessoresPage() {
  return (
    <div>
      <PageHeader
        title="Professores"
        description="Gerenciamento de professores"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Cadastros', href: '/cadastros' },
          { label: 'Professores' },
        ]}
        actions={
          <a href="/cadastros/professores/novo">
            <Button>Novo Professor</Button>
          </a>
        }
      />

      <DataTable
        data={mockProfessores}
        columns={columns}
        searchKey="nome"
        searchPlaceholder="Buscar professores..."
        onRowClick={(item) => {
          window.location.href = `/cadastros/professores/${item.id}`;
        }}
        actions={(item) => (
          <div className="flex gap-2">
            <a href={`/cadastros/professores/${item.id}`}>
              <Button variant="ghost" size="sm">Editar</Button>
            </a>
          </div>
        )}
      />
    </div>
  );
}
