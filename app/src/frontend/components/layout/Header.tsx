'use client';

import React from 'react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { DropdownMenu, DropdownMenuItem } from '@/components/ui/DropdownMenu';
import { useAuth } from '@/hooks/useAuth';

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between h-16 px-6 border-b bg-card">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md w-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
          </svg>
          <Input placeholder="Buscar..." className="pl-9" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label="Notificacoes">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
        </Button>

        <ThemeToggle />

        <DropdownMenu
          trigger={
            <Button variant="ghost" size="icon" className="rounded-full">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
                {user?.nome?.charAt(0) || 'U'}
              </div>
            </Button>
          }
        >
          <div className="px-2 py-1.5 text-sm font-medium">{user?.nome || 'Usuario'}</div>
          <div className="px-2 py-1 text-xs text-muted-foreground">{user?.email || ''}</div>
          <hr className="my-1 border-border" />
          <DropdownMenuItem>Perfil</DropdownMenuItem>
          <DropdownMenuItem>Configuracoes</DropdownMenuItem>
          <hr className="my-1 border-border" />
          <DropdownMenuItem onClick={logout}>Sair</DropdownMenuItem>
        </DropdownMenu>
      </div>
    </header>
  );
}
