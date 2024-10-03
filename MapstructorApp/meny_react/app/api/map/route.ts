import { NextApiRequest, NextApiHandler, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import {Map}  from "@prisma/client"
import { NextResponse } from "next/server";


export async function GET() {
    const prisma = new PrismaClient();
    const maps = (await prisma.map.findMany());

    return NextResponse.json({
        maps
    })
}


export async function POST(request: Request) {
    const map:Map = await request.json()
    const prisma = new PrismaClient();
    await prisma.map.create({
        data: {
            mapId: map.mapId,
            name: map.name,
            checked: map.checked,
            infoId: map.infoId,
            zoomFunction: map.zoomFunction
        }

    })
    return NextResponse.json({
        message: "Success"
    })
}