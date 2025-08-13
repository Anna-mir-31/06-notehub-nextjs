interface NoteDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function NoteDetails({ params }: NoteDetailsProps) {
  const { id } = await params;

  const note: Note = await fetchNoteById(id);

  return <NoteDetailsClient note={note} />;
}