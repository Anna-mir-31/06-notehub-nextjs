interface NoteDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function NoteDetails({ params }: NoteDetailsProps) {
  const { id } = await params;

  // тут твоя логіка
  return <div>Note ID: {id}</div>;
}
