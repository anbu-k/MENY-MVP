import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: any) {
    const { params } = context;
    const prisma = new PrismaClient();
    const layerSectionData = await prisma.layerSectionData.findFirst({
        where: {
            id: params.id
        }
    })

    return NextResponse.json({
        layerSectionData
    })
}