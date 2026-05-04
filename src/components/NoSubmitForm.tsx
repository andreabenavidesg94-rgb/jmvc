'use client';

import type { FormEvent, ReactNode } from 'react';

interface NoSubmitFormProps {
  /** Atributos pasados al <form>. */
  className?: string;
  /** ID del nodo describedby (p. ej. nota explicativa de "deshabilitado"). */
  ariaDescribedBy?: string;
  children: ReactNode;
}

/**
 * Wrapper de <form> que cancela el submit por defecto.
 *
 * Se usa en páginas placeholder (login, signup, contact) para que pulsar
 * Enter dentro de un input no recargue la página con un GET vacío.
 *
 * Cuando conectes auth o el envío real, sustituye este wrapper por un
 * <form action={serverAction}> normal o por un <form onSubmit={...}> con
 * la lógica que corresponda.
 */
export function NoSubmitForm({
  className,
  ariaDescribedBy,
  children,
}: NoSubmitFormProps) {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={className}
      aria-describedby={ariaDescribedBy}
      noValidate
    >
      {children}
    </form>
  );
}
