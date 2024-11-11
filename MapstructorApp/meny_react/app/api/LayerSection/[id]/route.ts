import { LayerSection, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(context: any) {
    const {params} = context; 
    const prisma = new PrismaClient();
    const layerSection:LayerSection = await prisma.layerSection.findFirst({
        where: {
            id: params.id
        },
        include: {
            layerGroups: {
                include: {
                    layers: true
                }
            }
        }
    })

    return NextResponse.json({
        layerSection
    })

}

export async function DELETE(context: any) {
    const {params} = context;
    const prisma = new PrismaClient();
    try {
        await prisma.layerSection.delete({
            where: {
                id: params.id
            }
        })

        return NextResponse.json({
            Messgae: "Success"
        })
    }
    catch(e) {
        console.log(e) 
        throw(e)
    }

}