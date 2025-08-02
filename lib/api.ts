import axios from 'axios';
import { Note, NewNote, NoteResponse } from '@/types/note';

const BASE_URL = 'https://notehub.app/api/notes';
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN as string;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export const fetchNotes = async (): Promise<Note[]> => {
  const { data } = await instance.get<NoteResponse>('/');
  return data.notes;
};

export const fetchNoteById = async (id: number): Promise<Note> => {
  const { data } = await instance.get<Note>(`/${id}`);
  return data;
};

export const addNote = async (note: NewNote): Promise<Note> => {
  const { data } = await instance.post<Note>('/', note);
  return data;
};

export const deleteNote = async (id: number): Promise<void> => {
  await instance.delete(`/${id}`);
};

export const searchNotes = async (query: string): Promise<Note[]> => {
  const { data } = await instance.get<NoteResponse>(`/search?query=${query}`);
  return data.notes;
};
