// components/NoteList/NoteList.tsx
'use client';

import Link from 'next/link';
import type { Note } from '@/types/note';
import css from './NoteList.module.css';

type Props = {
  notes: Note[];
  onDelete: (id: number) => void;
};

const NoteList: React.FC<Props> = ({ notes, onDelete }) => {
  return (
    <ul className={css.list}>
      {notes.map((n) => (
        <li key={n.id} className={css.listItem}>
          <h3 className={css.title}>{n.title}</h3>

          <p className={css.content}>{n.content}</p>

          <div className={css.footer}>
            <span className={css.tag}>{n.tag}</span>

            <div style={{ display: 'flex', gap: 8 }}>
              <Link className={css.link} href={`/notes/${n.id}`}>
                View details
              </Link>

              <button
                className={css.button}
                type="button"
                onClick={() => onDelete(n.id)}
                aria-label={`Delete note ${n.title}`}
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
