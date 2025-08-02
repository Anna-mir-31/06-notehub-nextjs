import { Note } from '@/types/note';
import NoteItem from '@/components/NoteItem/NoteItem';
import css from './NoteList.module.css';

interface Props {
  items: Note[];
}

export default function NoteList({ items }: Props) {
  return (
    <ul className={css.list}>
      {items.map(note => (
        <NoteItem key={note.id} note={note} />
      ))}
    </ul>
  );
}
