export interface Note {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface NewNote {
    title: string;
    content: string;
  }
  
  export interface NoteResponse {
    notes: Note[];
  }
  