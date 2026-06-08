'use client';

import React, { useState, useMemo } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchPlaceholder?: string;
  searchKey?: string;
  pageSize?: number;
  onRowClick?: (item: T) => void;
  actions?: (item: T) => React.ReactNode;
}

export function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  searchPlaceholder = 'Buscar...',
  searchKey,
  pageSize = 10,
  onRowClick,
  actions,
}: DataTableProps<T>) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const filteredData = useMemo(() => {
    let filtered = data;
    if (search && searchKey) {
      filtered = filtered.filter((item) => {
        const value = item[searchKey];
        return String(value).toLowerCase().includes(search.toLowerCase());
      });
    }
    if (sortKey) {
      filtered = [...filtered].sort((a, b) => {
        const aVal = String(a[sortKey] || '');
        const bVal = String(b[sortKey] || '');
        return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      });
    }
    return filtered;
  }, [data, search, searchKey, sortKey, sortDir]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(page * pageSize, (page + 1) * pageSize);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  return (
    <div className="space-y-4">
      {searchKey && (
        <div className="flex items-center gap-2">
          <Input
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            className="max-w-sm"
          />
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead
                key={col.key}
                onClick={col.sortable ? () => handleSort(col.key) : undefined}
                className={col.sortable ? 'cursor-pointer select-none' : ''}
              >
                {col.header}
                {sortKey === col.key && (sortDir === 'asc' ? ' \u2191' : ' \u2193')}
              </TableHead>
            ))}
            {actions && <TableHead>Acoes</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length + (actions ? 1 : 0)} className="text-center py-8 text-muted-foreground">
                Nenhum registro encontrado
              </TableCell>
            </TableRow>
          ) : (
            paginatedData.map((item, index) => (
              <TableRow
                key={index}
                onClick={onRowClick ? () => onRowClick(item) : undefined}
                className={onRowClick ? 'cursor-pointer' : ''}
              >
                {columns.map((col) => (
                  <TableCell key={col.key}>
                    {col.render ? col.render(item) : String(item[col.key] ?? '')}
                  </TableCell>
                ))}
                {actions && <TableCell>{actions(item)}</TableCell>}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Mostrando {page * pageSize + 1} a {Math.min((page + 1) * pageSize, filteredData.length)} de {filteredData.length} registros
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page === 0} onClick={() => setPage(page - 1)}>
              Anterior
            </Button>
            <Button variant="outline" size="sm" disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)}>
              Proximo
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
