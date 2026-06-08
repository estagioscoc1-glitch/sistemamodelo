'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useToast } from '@/components/ui/Toast';

interface StudentAttendance {
  id: string;
  nome: string;
  presente: boolean;
  justificado: boolean;
  observacao: string;
}

const mockStudents: StudentAttendance[] = [
  { id: '1', nome: 'Ana Silva Santos', presente: true, justificado: false, observacao: '' },
  { id: '2', nome: 'Joao Pedro Oliveira', presente: true, justificado: false, observacao: '' },
  { id: '3', nome: 'Maria Fernandes Costa', presente: false, justificado: true, observacao: 'Atestado medico' },
  { id: '4', nome: 'Carlos Eduardo Lima', presente: true, justificado: false, observacao: '' },
  { id: '5', nome: 'Juliana Almeida', presente: false, justificado: false, observacao: '' },
  { id: '6', nome: 'Pedro Santos', presente: true, justificado: false, observacao: '' },
];

export default function ChamadasPage() {
  const { addToast } = useToast();
  const [turma, setTurma] = useState('');
  const [disciplina, setDisciplina] = useState('');
  const [data, setData] = useState('');
  const [students, setStudents] = useState<StudentAttendance[]>(mockStudents);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const togglePresente = (index: number) => {
    setStudents((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], presente: !updated[index].presente };
      return updated;
    });
  };

  const toggleJustificado = (index: number) => {
    setStudents((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], justificado: !updated[index].justificado };
      return updated;
    });
  };

  const updateObservacao = (index: number, value: string) => {
    setStudents((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], observacao: value };
      return updated;
    });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!turma) newErrors.turma = 'Turma e obrigatoria';
    if (!disciplina) newErrors.disciplina = 'Disciplina e obrigatoria';
    if (!data) newErrors.data = 'Data e obrigatoria';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    addToast({ title: 'Chamada registrada com sucesso!', variant: 'success' });
  };

  return (
    <div>
      <PageHeader
        title="Chamada"
        description="Registro de presenca dos alunos"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Diario', href: '/diario' },
          { label: 'Chamadas' },
        ]}
      />

      <Card>
        <CardHeader>
          <CardTitle>Registrar Chamada</CardTitle>
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
              <Input
                id="data"
                label="Data"
                type="date"
                value={data}
                onChange={(e) => { setData(e.target.value); if (errors.data) setErrors((prev) => ({ ...prev, data: '' })); }}
                error={errors.data}
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-3">Aluno</th>
                    <th className="text-center py-2 px-3">Presente</th>
                    <th className="text-center py-2 px-3">Justificado</th>
                    <th className="text-left py-2 px-3">Observacao</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={student.id} className="border-b">
                      <td className="py-2 px-3">{student.nome}</td>
                      <td className="py-2 px-3 text-center">
                        <input
                          type="checkbox"
                          checked={student.presente}
                          onChange={() => togglePresente(index)}
                          className="h-4 w-4"
                        />
                      </td>
                      <td className="py-2 px-3 text-center">
                        <input
                          type="checkbox"
                          checked={student.justificado}
                          onChange={() => toggleJustificado(index)}
                          className="h-4 w-4"
                        />
                      </td>
                      <td className="py-2 px-3">
                        <Input
                          id={`obs-${student.id}`}
                          value={student.observacao}
                          onChange={(e) => updateObservacao(index, e.target.value)}
                          placeholder="Observacao..."
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex gap-3 justify-end">
              <a href="/diario"><Button type="button" variant="outline">Cancelar</Button></a>
              <Button type="submit">Salvar Chamada</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
