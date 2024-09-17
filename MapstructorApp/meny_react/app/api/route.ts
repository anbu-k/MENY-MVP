import { NextResponse } from "next/server";
import { NextApiRequest, NextApiHandler, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export async function GET() {
    const prisma = new PrismaClient();
    const map = (await prisma.map.findMany());

    return NextResponse.json({
        map
    })
}


