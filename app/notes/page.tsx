// app/notes/page.tsx
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/queryClient';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import styles from '@/styles/NotesPage.module.css'; // твій файл стилів сторінки

export default async function NotesPage() {
  const qc = getQueryClient();

  await qc.prefetchQuery({
    queryKey: ['notes', 1, ''],
    queryFn: () => fetchNotes(1, ''),
  });

  return (
    <main className={styles.main}>
      <HydrationBoundary state={dehydrate(qc)}>
        <NotesClient />
      </HydrationBoundary>
    </main>
  );
}
