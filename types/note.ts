// types/note.ts
export type NoteTag = 'Work' | 'Personal' | 'Shopping' | 'Todo';

export interface Note {
  id: number;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;     
  date?: string;
}
