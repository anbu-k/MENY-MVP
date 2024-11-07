import { LayerSection, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


export async function GET() {
    const prisma = new PrismaClient();
    const LayerSections = (await prisma.layerSection.findMany({
        include: {
        layerGroups: {
            include: {
                layers: true
            }
        }
    }
    }));

    return NextResponse.json({
        LayerSections
    })
}

export async function POST(request: Request) {
    const sectionLayer:LayerSection = await request.json();
    const prisma = new PrismaClient();
    const r = await prisma.layerSection.create({
        data: {
            name: sectionLayer.name
        }
    })

    return NextResponse.json({
        r
    })
}

export async function PUT(request: Request) {
    const layerSection:LayerSection = await request.json();
    const prisma = new PrismaClient();
    try {
        const r = await prisma.layerSection.update({
            where: {
                id: layerSection.id
            },
            data: {
                name:layerSection.name
            }
        })
        return NextResponse.json({
            r
        })
    }
    catch(e) {
        console.log(e)
        throw(e)
    }
    
}



