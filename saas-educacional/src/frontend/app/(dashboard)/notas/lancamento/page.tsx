'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useToast } from '@/components/ui/Toast';

interface StudentGrade {
  id: string;
  nome: string;
  nota: string;
  recuperacao: string;
}

const mockStudents: StudentGrade[] = [
  { id: '1', nome: 'Ana Silva Santos', nota: '', recuperacao: '' },
  { id: '2', nome: 'Joao Pedro Oliveira', nota: '', recuperacao: '' },
  { id: '3', nome: 'Maria Fernandes Costa', nota: '', recuperacao: '' },
  { id: '4', nome: 'Carlos Eduardo Lima', nota: '', recuperacao: '' },
  { id: '5', nome: 'Juliana Almeida', nota: '', recuperacao: '' },
  { id: '6', nome: 'Pedro Santos', nota: '', recuperacao: '' },
];

export default function LancamentoNotasPage() {
  const { addToast } = useToast();
  const [turma, setTurma] = useState('');
  const [disciplina, setDisciplina] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [students, setStudents] = useState<StudentGrade[]>(mockStudents);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateGrade = (index: number, field: 'nota' | 'recuperacao', value: string) => {
    setStudents((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!turma) newErrors.turma = 'Turma e obrigatoria';
    if (!disciplina) newErrors.disciplina = 'Disciplina e obrigatoria';
    if (!periodo) newErrors.periodo = 'Periodo e obrigatorio';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    addToast({ title: 'Notas lancadas com sucesso!', variant: 'success' });
  };

  return (
    <div>
      <PageHeader
        title="Lancamento de Notas"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Notas', href: '/notas' },
          { label: 'Lancamento' },
        ]}
      />

      <Card>
        <CardHeader>
          <CardTitle>Lancar Notas</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <Select
                id="turma"
                label="Turma"
                value={turma}
                onChange={(e) => { setTurma(e.target.value); if (errors.turma) setErrors((prev) => ({ ...prev, turma: '' })); }}
                error={errors.turma}
                placeholder="Selecione a turma"
                options={[
                  { value: '1', label: 'ADM-2024-1A (Matutino)' },
                  { value: '2', label: 'ADM-2024-1B (Noturno)' },
                  { value: '3', label: 'ENF-2024-1A (Integral)' },
                  { value: '4', label: 'SI-2024-1A (Noturno)' },
                ]}
              />
              <Select
                id="disciplina"
                label="Disciplina"
                value={disciplina}
                onChange={(e) => { setDisciplina(e.target.value); if (errors.disciplina) setErrors((prev) => ({ ...prev, disciplina: '' })); }}
                error={errors.disciplina}
                placeholder="Selecione a disciplina"
                options={[
                  { value: '1', label: 'Matematica' },
                  { value: '2', label: 'Portugues' },
                  { value: '3', label: 'Historia' },
                  { value: '4', label: 'Fisica' },
                ]}
              />
              <Select
                id="periodo"
                label="Periodo"
                value={periodo}
                onChange={(e) => { setPeriodo(e.target.value); if (errors.periodo) setErrors((prev) => ({ ...prev, periodo: '' })); }}
                error={errors.periodo}
                placeholder="Selecione o periodo"
                options={[
                  { value: '1', label: '1o Bimestre' },
                  { value: '2', label: '2o Bimestre' },
                  { value: '3', label: '3o Bimestre' },
                  { value: '4', label: '4o Bimestre' },
                ]}
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-3">Aluno</th>
                    <th className="text-left py-2 px-3">Nota</th>
                    <th className="text-left py-2 px-3">Recuperacao</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={student.id} className="border-b">
                      <td className="py-2 px-3">{student.nome}</td>
                      <td className="py-2 px-3">
                        <Input
                          id={`nota-${student.id}`}
                          type="number"
                          value={student.nota}
                          onChange={(e) => updateGrade(index, 'nota', e.target.value)}
                          placeholder="0.0"
                        />
                      </td>
                      <td className="py-2 px-3">
                        <Input
                          id={`rec-${student.id}`}
                          type="number"
                          value={student.recuperacao}
                          onChange={(e) => updateGrade(index, 'recuperacao', e.target.value)}
                          placeholder="0.0"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex gap-3 justify-end">
              <a href="/notas"><Button type="button" variant="outline">Cancelar</Button></a>
              <Button type="submit">Salvar Notas</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
