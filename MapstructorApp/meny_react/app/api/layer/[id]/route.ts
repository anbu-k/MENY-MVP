import { Layer, PrismaClient } from "@prisma/client";
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
    const Layerr: Layer = await request.json()
    const prisma = new PrismaClient();
    const layer = await prisma.layer.update({
        where: {
            id: params.id
        },
        data: {
            layerName: Layerr.layerName,
            type: Layerr.type,
            sectionName: Layerr.sectionName,
            sourceType: Layerr.sourceType,
            sourceUrl: Layerr.sourceUrl,
            sourceId: Layerr.sourceId,
            paint: Layerr.paint,
            sourceLayer: Layerr.sourceLayer,
            hover: Layerr.hover,
            time: Layerr.time,
            click: Layerr.click
        }
    })

    return NextResponse.json({
        layer
    })
}