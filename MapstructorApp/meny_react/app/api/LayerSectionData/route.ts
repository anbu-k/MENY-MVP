import { PrismaClient} from "@prisma/client";
import { NextResponse } from "next/server";
import { LayerSectionData } from "@prisma/client";

export async function GET() {
    const prisma = new PrismaClient();
    const sections = (await prisma.layerSectionData.findMany({
        include: {layers: true}
    }))

    return NextResponse.json({
        sections
    })
}


export async function POST(request: Request) {
    const LayerSectionData:LayerSectionData = await request.json()
    const prisma = new PrismaClient();
    try {
        await prisma.layerSectionData.create({
            data: {
                name:LayerSectionData.name,
                sectionName:LayerSectionData.sectionName,
                iconColor:LayerSectionData.iconColor,
                label:LayerSectionData.label,
                topLayerClass:LayerSectionData.topLayerClass,
                infoId:LayerSectionData.infoId,
            }
        })
        return NextResponse.json({
            message: "Success"
        })
    } catch(e) {
        console.log(e)
        throw(e)
    }
}