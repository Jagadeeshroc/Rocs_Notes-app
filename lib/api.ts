export interface NoteData {
  _id?: string;
  title: string;
  content: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const fetchNotes = async () => {
  const res = await fetch(`${API_URL}/api/notes`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch notes");
  return res.json();
};

export const fetchNoteById = async (id: string) => {
  const res = await fetch(`${API_URL}/api/notes/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch note");
  return res.json();
};