'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import type { Note } from '@/types/note';
import css from './NoteDetails.module.css';

type Props = { note?: Note | null };

export default function NoteDetailsClient({ note }: Props) {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  const {
    data: fetchedNote,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    enabled: Number.isFinite(id),
    // якщо робиш SSR prefetch — підкладаємо як initialData
    initialData: note ?? undefined,
  });

  const current = fetchedNote ?? note;

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError || !current) return <p>Something went wrong.</p>;

  const created =
    (current as any).createdAt
      ? new Date((current as any).createdAt).toLocaleString()
      : '';

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{current.title}</h2>
          {current.tag && <span className={css.tag}>{current.tag}</span>}
        </div>
        <p className={css.content}>{current.content}</p>
        {created && <p className={css.date}>{created}</p>}
      </div>
    </div>
  );
}
