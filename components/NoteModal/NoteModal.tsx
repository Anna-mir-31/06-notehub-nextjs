'use client';

import { Note } from '@/types/note';
import styles from './NoteModal.module.css';

type Props = {
  note: Note;
};

export default function NoteModal({ note }: Props) {
  return (
    <div className={styles.modal}>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
    </div>
  );
}
