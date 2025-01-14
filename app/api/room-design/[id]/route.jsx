// app/api/room-design/[id]/route.js
import { db } from "@/config/db";
import { AiGeneratedImage } from "@/config/schema";
import { eq } from 'drizzle-orm';
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        const result = await db
            .select()
            .from(AiGeneratedImage)
            .where(eq(AiGeneratedImage.id, parseInt(params.id)))
            .limit(1);

        return NextResponse.json(result[0] || null);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}