// app/notes/[id]/page.tsx
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/queryClient';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';

type PageProps = {
  params: { id: string };        
};

export default async function NoteDetailsPage({ params }: PageProps) {
  const id = Number(params.id);   
  const qc = getQueryClient();

  await qc.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}


import type { Metadata } from 'next';
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return { title: `Note ${params.id}` };
}
