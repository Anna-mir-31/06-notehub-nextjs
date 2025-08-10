// app/notes/page.tsx
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/queryClient';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

export default async function NotesPage() {
  const qc = getQueryClient();

  // НЕ даємо помилці завалити маршрут
  try {
    await qc.prefetchQuery({
      queryKey: ['notes', 1, ''],
      queryFn: () => fetchNotes('', 1, 12),
    });
  } catch {
    // просто ігноруємо — клієнт сам підвантажить і покаже помилку, якщо треба
  }

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
