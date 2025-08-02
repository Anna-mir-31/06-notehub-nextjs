'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api';
import { Note } from '@/types/note';
import Link from 'next/link';
import css from './NoteItem.module.css';

interface Props {
  note: Note;
}

export default function NoteItem({ note }: Props) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deleteNote(note.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return (
    <li className={css.item}>
      <h3 className={css.title}>{note.title}</h3>
      <p className={css.content}>{note.content}</p>
      <div className={css.buttons}>
        <Link className={css.link} href={`/notes/${note.id}`}>
          View details
        </Link>
        <button className={css.button} onClick={() => mutation.mutate()}>
          Delete
        </button>
      </div>
    </li>
  );
}
