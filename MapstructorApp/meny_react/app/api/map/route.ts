import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { Map } from "@prisma/client";


export  async function GET()
{
    const prisma = new PrismaClient();
    const m = await prisma.map.findMany();

    return NextResponse.json({
        m
     })
}

export async function POST(request: Request) {
        const prisma = new PrismaClient();
        const m:Map = await request.json();

        await prisma.map.create({
        data: {
            id: m.id,
            name: m.name,
            checked: m.checked,
            infoId: m.infoId,
            zoomFunction: m.zoomFunction
        },
    })
    
    return NextResponse.json({
        message: "Success"
    })
}
