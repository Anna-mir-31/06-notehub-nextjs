// app/notes/[id]/page.tsx
import { notFound } from 'next/navigation';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/queryClient';
import { fetchNoteById } from '@/lib/api';
import type { Metadata } from 'next';
import NoteDetailsClient from './NoteDetails.client';

interface PageProps {
  params: Promise<{ id: string }>; // changed: params тепер Promise
}

export default async function NoteDetailsPage({ params }: PageProps) {
  const { id } = await params; // changed: додано await
  const qc = getQueryClient();

  try {
    await qc.prefetchQuery({
      queryKey: ['note', id],
      queryFn: () => fetchNoteById(id),
    });
    
    return (
      <HydrationBoundary state={dehydrate(qc)}>
        <NoteDetailsClient id={id} />
      </HydrationBoundary>
    );
  } catch (e: any) {
    if (e?.response?.status === 404) notFound();
    throw e;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params; // changed: додано await

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