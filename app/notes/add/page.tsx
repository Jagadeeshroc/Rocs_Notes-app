import NoteForm from "@/components/NoteForm";
import Navbar from "@/components/Navbar";

export default function AddNotePage() {
  return (
    <>
      <Navbar />
      <div className="mt-8">
        <NoteForm />
      </div>
    </>
  );
}