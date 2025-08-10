// app/notes/[id]/page.tsx
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';

type RouteParams = { id: string };
type RouteSearchParams = { [key: string]: string | string[] | undefined };

export default async function NotePage({
  params,
  searchParams,
}: {
  params: RouteParams;
  searchParams?: RouteSearchParams;
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', params.id],
    queryFn: () => fetchNoteById(params.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}

export async function generateMetadata(
  { params }: { params: RouteParams }
) {
  // ...existing code...
}

export async function generateStaticParams(): Promise<RouteParams[]> {
  // ...existing code that returns like: [{ id: "1" }, { id: "2" }]
}