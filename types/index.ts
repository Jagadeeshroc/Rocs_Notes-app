export interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface NoteFormData {
  title: string;
  content: string;
}

export interface ApiResponse {
  message?: string;
  notes?: Note[];
  note?: Note;
  error?: string;
}