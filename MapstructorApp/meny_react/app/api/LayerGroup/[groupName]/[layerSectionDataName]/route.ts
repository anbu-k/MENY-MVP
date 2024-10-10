import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(context: any) {
    const {params} = context;
    const prisma = new PrismaClient();
    const s = await prisma.layerGroup.update({
        where: {
            name: params.groupName
        },
        data:{
            childLayers:{
                connect: {
                    name: params.layerSectionDataName
                }
            }
        }
    })
    console.log(s)
    return NextResponse.json({
        message: "success"
    })
}