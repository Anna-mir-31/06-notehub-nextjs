import axios from 'axios';
import type { Note } from '../types/note';

const BASE_URL = import.meta.env.VITE_API_URL;
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number,
  search?: string
): Promise<FetchNotesResponse> => {
  const params = new URLSearchParams({ page: page.toString() });
  if (search?.trim()) params.append('search', search.trim());

  const response = await axios.get<FetchNotesResponse>(
    `${BASE_URL}/notes?${params.toString()}`,
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return response.data;
};

export const deleteNote = async (id: number | string): Promise<Note> => {
  const response = await axios.delete<Note>(`${BASE_URL}/notes/${id}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  return response.data;
};

export const createNote = async (
  note: Pick<Note, 'title' | 'content' | 'tag'>
): Promise<Note> => {
  const response = await axios.post<Note>(`${BASE_URL}/notes`, note, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  return response.data;
};