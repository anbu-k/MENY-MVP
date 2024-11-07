import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import {Layer} from "@prisma/client";


export async function GET() {
 const prisma = new PrismaClient();
 const layer = (await prisma.layer.findMany());
 
 return NextResponse.json({
    layer
 })
}

export async function POST(request: Request) {
    const Layer:Layer = await request.json()
    const prisma = new PrismaClient();
    await prisma.layer.create({
        data: {
            layerName: Layer.layerName,
            sectionName: Layer.sectionName,
            sourceUrl: Layer.sourceUrl,
            type:Layer.type,
            paint:Layer.paint,
            sourceType:Layer.sourceType,
            sourceId:Layer.sourceId,
            sourceLayer:Layer.sourceLayer,
            hover: Layer.hover,
            time: Layer.time,
            click: Layer.click,
            hoverStyle: Layer.hoverStyle,
            clickStyle: Layer.clickStyle,
            clickHeader: Layer.clickHeader,
            hoverContent: Layer.hoverContent,
        },
    })
    return NextResponse.json({
        message: "Success"
    })
}