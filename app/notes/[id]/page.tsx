import { fetchNoteById } from '@/lib/api';
import { notFound } from 'next/navigation';
import NoteModal from '@/components/NoteModal/NoteModal';

interface Props {
  params: {
    id: string;
  };
}

export default async function NotePage({ params }: Props) {
  try {
    const note = await fetchNoteById(Number(params.id));
    
    if (!note) {
      notFound();
    }

    return <NoteModal note={note} />;
  } catch (error) {
    notFound();
  }
}
