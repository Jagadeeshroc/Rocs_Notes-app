import Navbar from "@/components/Navbar";
import NoteCard from "@/components/NoteCard";
import { fetchNotes } from "@/lib/api";
import { NoteData } from "@/lib/api";

export default async function Home() {
  const { notes } = (await fetchNotes()) as { notes: (NoteData & { createdAt: string })[] };

  return (
    <>
      <Navbar />
      <div className="mt-4 md:mt-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-slate-800">ROCs Notes</h1>
        {notes?.length === 0 ? (
          <p className="text-slate-500">No notes yet. Create one!</p>
        ) : (
          // UPDATED GRID: 1 column on mobile, 2 on tablet, 3 on laptop
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}