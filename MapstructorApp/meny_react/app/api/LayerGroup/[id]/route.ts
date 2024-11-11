import { LayerGroup } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: any) {
    const {params} = context;
    const prisma = new PrismaClient();
    const layerGroup:LayerGroup = await prisma.layerGroup.findFirst({
        where: {
            id: params.id
        },
        include: {
            layers:true
        }
    })

    return NextResponse.json({
        layerGroup
    })
}


export async function DELETE(context: any) {
    const {params} = context;
    const prisma = new PrismaClient();
    await prisma.layerGroup.delete({
        where:{
            id: params.id
        }
    })
}