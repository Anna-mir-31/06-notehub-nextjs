// app/notes/[id]/page.tsx
import { notFound } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import type { Note } from '@/types/note';


type Awaitable<T> = T | Promise<T>;

interface PageProps {
  params: Awaitable<{ id: string }>;
}


async function normalizeParams<T>(maybePromise: Awaitable<T>): Promise<T> {
  return Promise.resolve(maybePromise);
}

export default async function NoteDetailsPage({ params }: PageProps) {
  
  const { id } = await normalizeParams(params);

  try {
    const note: Note = await fetchNoteById(id);

    return (
      <main style={{ padding: 24 }}>
        <h1 style={{ margin: '0 0 12px' }}>{note.title}</h1>
        <p style={{ whiteSpace: 'pre-wrap', margin: '0 0 12px' }}>
          {note.content}
        </p>

        <div style={{ fontSize: 14, color: '#495057' }}>
          <b>Tag:</b> {note.tag}
        </div>
      </main>
    );
  } catch (e: any) {
    // Якщо API повертає 404 — віддаємо стандартну 404 сторінку
    if (e?.response?.status === 404) notFound();
    throw e;
  }
}


export async function generateMetadata({ params }: PageProps) {
  const { id } = await normalizeParams(params);

  try {
    const note = await fetchNoteById(id);
    return {
      title: note.title ? `${note.title} – NoteHub` : 'Note – NoteHub',
      description: note.content?.slice(0, 140) ?? 'Note details',
    };
  } catch {
    return {
      title: 'Note – Not found',
      description: 'The note was not found',
    };
  }
}
