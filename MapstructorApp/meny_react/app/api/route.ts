import { NextResponse } from "next/server";
import { NextApiRequest, NextApiHandler, NextApiResponse } from "next";
import { PrismaClient, Map } from "@prisma/client";

export async function GET() {
    const prisma = new PrismaClient();
    const map = (await prisma.map.findMany());

    return NextResponse.json({
        map
    })
}

export async function POST(m: Map) {
        const prisma = new PrismaClient();
        
        const result = await prisma.map.create({
            data: {
                id: m.id,
                name: m.name,
                checked: m.checked,
                infoId: m.infoId,
                zoomFunction: m.zoomFunction,
            }
        })

    // return NextResponse.json({
    //     map
    // })
}


