import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(request: Request, context: any) {
    const { params } = context;
    const prisma = new PrismaClient();
    const layer = await prisma.layer.findFirst({
        where: {
            id: params.id
        }
    })

    return NextResponse.json({
        layer
    })
}


export async function DELETE(context: any) {
    const {params} = context;
    const prisma = new PrismaClient();
    const layer = await prisma.layer.findFirst({
        where: {
            id: params.id
        }
    })
    const deleteLayer = await prisma.layer.update({
        where: {
            id: params.id
        },
        data: {
            LayerSectionData: {
                disconnect: true
            }
        }
    })
}


export async function PUT(request: Request, context: any) {
    const { params } = context;
    const Layer:Layer = await request.json()
    const prisma = new PrismaClient();
    const layer = await prisma.layer.update({
        where: {
            id: params.id
        },
        data: {
            layerName: Layer.layerName,
            type: Layer.type,
            sectionName: Layer.sectionName,
            sourceType: Layer.sourceType,
            sourceUrl: Layer.sourceUrl,
            sourceId: Layer.sourceId,
            paint: Layer.paint,
            sourceLayer: Layer.sourceLayer,
            hover: Layer.hover,
            time: Layer.time,
            click: Layer.click
        }
    })

    return NextResponse.json({
        layer
    })
}