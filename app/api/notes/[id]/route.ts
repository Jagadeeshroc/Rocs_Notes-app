import connectDB from "@/lib/db";
import Note from "@/models/note";
import { NextResponse } from "next/server";

// Define params as a Promise
interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: RouteParams) {
  const { id } = await params; // <--- MUST AWAIT PARAMS
  const { title, content } = await request.json();
  await connectDB();
  await Note.findByIdAndUpdate(id, { title, content });
  return NextResponse.json({ message: "Note Updated" }, { status: 200 });
}

export async function GET(request: Request, { params }: RouteParams) {
  const { id } = await params; // <--- MUST AWAIT PARAMS
  await connectDB();
  const note = await Note.findOne({ _id: id });
  return NextResponse.json({ note }, { status: 200 });
}

export async function DELETE(request: Request, { params }: RouteParams) {
  const { id } = await params; // <--- MUST AWAIT PARAMS
  await connectDB();
  await Note.findByIdAndDelete(id);
  return NextResponse.json({ message: "Note Deleted" }, { status: 200 });
}