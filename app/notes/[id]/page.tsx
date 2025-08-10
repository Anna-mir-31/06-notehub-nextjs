import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client"; 
import { Note } from "@/types/note";

type Params = { id: string };

export default async function NoteDetailsPage({
  params,
}: {
  params: Params;
}) {
  const note: Note = await fetchNoteById(params.id);
  return <NoteDetailsClient note={note} />;
}
