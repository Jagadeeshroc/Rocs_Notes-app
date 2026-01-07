import NoteForm from "@/components/NoteForm";
import Navbar from "@/components/Navbar";
import { fetchNoteById } from "@/lib/api";

interface EditPageProps {
  params: Promise<{ id: string }>; // <--- Update 1: Define as Promise
}

export default async function EditNotePage({ params }: EditPageProps) {
  const { id } = await params; // <--- Update 2: Await the params
  const { note } = await fetchNoteById(id);

  return (
    <>
      <Navbar />
      <div className="mt-8">
        {note ? (
          <NoteForm id={id} initialData={note} />
        ) : (
          <p>Note not found</p>
        )}
      </div>
    </>
  );
}