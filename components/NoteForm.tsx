"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { NoteData } from "@/lib/api";

interface NoteFormProps {
  id?: string;
  initialData?: NoteData;
}

export default function NoteForm({ id, initialData }: NoteFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    content: initialData?.content || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const url = id ? `/api/notes/${id}` : "/api/notes";
    const method = id ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.refresh();
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md border border-slate-200 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">
        {id ? "Edit Note" : "Create New Note"}
      </h2>
      
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
          <input
            type="text"
            className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter note title..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Content</label>
          <textarea
            className="w-full border border-slate-300 p-3 rounded-lg h-40 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Write your thoughts..."
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`mt-4 py-3 px-6 rounded-lg font-bold text-white transition-all ${
            isLoading ? "bg-slate-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLoading ? "Saving..." : id ? "Update Note" : "Save Note"}
        </button>
      </div>
    </form>
  );
}