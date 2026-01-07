import connectDB from "@/lib/db";
import Note from "@/models/note";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { title, content } = await request.json();
    await connectDB();
    await Note.create({ title, content });
    return NextResponse.json({ message: "Note Created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const notes = await Note.find().sort({ createdAt: -1 });
    return NextResponse.json({ notes });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}