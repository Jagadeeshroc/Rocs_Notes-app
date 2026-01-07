import Link from "next/link";

export default function Navbar() {
  return (
    // UPDATED: Added 'hidden md:flex' so it disappears on mobile
    <header className="hidden md:flex bg-white border-b border-slate-200 py-4 px-8 justify-between items-center sticky top-0 z-10">
      <h2 className="text-xl font-bold text-slate-800">Workspace</h2>
      <div className="flex items-center gap-4">
        <Link 
          href="/notes/add" 
          className="bg-slate-900 text-white px-4 py-2 rounded-md text-sm hover:bg-slate-700 transition"
        >
          + Quick Add
        </Link>
        <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xs">
          JD
        </div>
      </div>
    </header>
  );
}