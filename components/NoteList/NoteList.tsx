// components/NoteList/NoteList.tsx
'use client';

import Link from 'next/link';
import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api';
import type { Note } from '@/types/note';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

const NoteList: React.FC<NoteListProps> = ({ notes }) => {
  const qc = useQueryClient();

  const { mutate: removeNote } = useMutation<Note, Error, string>({
    mutationFn: deleteNote,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['notes'] }),
  });

  const handleDelete = (id: string) => {
    removeNote(id);
  };

  if (!notes || notes.length === 0) {
    return <p>No notes yet.</p>;
  }

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h3 className={css.title}>{note.title}</h3>

          <p className={css.content}>{note.content}</p>

          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>

            <div>
              <Link
                href={`/notes/${note.id}`}
                className={css.link}
                aria-label={`View details of ${note.title}`}
              >
                View details
              </Link>

              <button
                type="button"
                className={css.button}
                onClick={() => handleDelete(String(note.id))}
                aria-label={`Delete ${note.title}`}
                style={{ marginLeft: 8 }}
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
