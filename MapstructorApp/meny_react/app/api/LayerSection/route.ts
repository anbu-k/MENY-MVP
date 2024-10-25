import { LayerSection, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


export async function GET() {
    const prisma = new PrismaClient();
    const LayerSections = (await prisma.layerSection.findMany({
        include: {
        layerGroups: {
            include: {
                childLayers: {
                    include: {
                        layers: true
                    }
                }
            }
        },
        layers: {
            include: {
                layers: true,
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
    await prisma.layerSection.create({
        data: {
            name: sectionLayer.name
        }
    })

    return NextResponse.json({
        message: "Success"
    })
}



