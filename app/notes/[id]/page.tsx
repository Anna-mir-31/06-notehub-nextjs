import { notFound } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import type { Note } from '@/types/note';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NoteDetailsPage({ params }: Props) {
  const { id } = await params;

 
    const note: Note = await fetchNoteById(id);
    return (
      <div style={{ padding: 24 }}>
        <h1>{note.title}</h1>
        <p style={{ whiteSpace: 'pre-wrap' }}>{note.content}</p>
        <p><strong>Tag:</strong> {note.tag}</p>
      </div>
    );
  
}