"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa"; // Added FaEye
import { NoteData } from "@/lib/api";

interface NoteCardProps {
  note: NoteData & { createdAt: string };
}

export default function NoteCard({ note }: NoteCardProps) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this note?");
    if (confirmed) {
      const res = await fetch(`/api/notes/${note._id}`, { method: "DELETE" });
      if (res.ok) {
        router.refresh();
      }
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Make Title Clickable */}
        <Link href={`/notes/${note._id}`}>
          <h2 className="font-bold text-xl text-slate-800 mb-2 hover:text-blue-600 transition-colors cursor-pointer">
            {note.title}
          </h2>
        </Link>
        <p className="text-slate-600 line-clamp-3 mb-4 text-sm leading-relaxed">
          {note.content}
        </p>
      </div>
      
      <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-100">
        <span suppressHydrationWarning className="text-xs text-slate-400 font-medium">
          {new Date(note.createdAt).toLocaleDateString()}
        </span>

        <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {/* View Button */}
          <Link href={`/notes/${note._id}`} className="text-slate-400 hover:text-teal-500" title="View Details">
            <FaEye size={18} />
          </Link>

          {/* Edit Button */}
          <Link href={`/notes/edit/${note._id}`} className="text-slate-400 hover:text-blue-500" title="Edit">
            <FaEdit size={18} />
          </Link>
          
          {/* Delete Button */}
          <button onClick={handleDelete} className="text-slate-400 hover:text-red-500" title="Delete">
            <FaTrash size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}