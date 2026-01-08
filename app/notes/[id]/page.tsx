import connectDB from "@/lib/db";
import Note from "@/models/note";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft, FaPen, FaClock } from "react-icons/fa";

interface NotePageProps {
  params: Promise<{ id: string }>;
}

export default async function NotePage({ params }: NotePageProps) {
  // 1. Await params (Next.js 15 requirement)
  const { id } = await params;

  // 2. Fetch data directly from DB
  await connectDB();
  
  // We use .lean() to get a plain JS object, simpler for passing to components
  const note = await Note.findById(id).lean();

  // 3. Handle if note doesn't exist
  if (!note) {
    notFound(); 
  }

  // Convert MongoDB _id and dates to strings to avoid serialization warnings
  const serializedNote = {
    ...note,
    _id: note._id.toString(),
    createdAt: note.createdAt?.toString(),
    updatedAt: note.updatedAt?.toString(),
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6">
      {/* --- Navigation Header --- */}
      <div className="flex justify-between items-center mb-8">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-slate-500 hover:text-cyan-500 transition-colors"
        >
          <FaArrowLeft /> Back to Notes
        </Link>

        <Link 
          href={`/notes/edit/${id}`} 
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
        >
          <FaPen size={14} /> Edit
        </Link>
      </div>

      {/* --- Note Content --- */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden p-8 sm:p-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-6">
          {serializedNote.title}
        </h1>

        <div className="flex items-center gap-2 text-slate-400 text-sm mb-8 pb-8 border-b border-slate-100">
          <FaClock />
          <span>Created: {new Date(serializedNote.createdAt).toLocaleString()}</span>
        </div>

        {/* whitespace-pre-wrap is CRUCIAL here. 
           It preserves the line breaks and spacing from your textarea 
        */}
        <div className="text-slate-600 leading-loose text-lg whitespace-pre-wrap">
          {serializedNote.content}
        </div>
      </div>
    </div>
  );
}