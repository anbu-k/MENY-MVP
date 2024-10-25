import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
export async function POST(request: Request, context: any) {
    const {params} = context
    const prisma = new PrismaClient();
    const s = await prisma.layerSectionData.update({
        where: {
            name: params.name
        },
        data:{
            layers:{
                connect: {
                    layerName: params.layerName
                }
            }
        }

    })
    console.log(s)
    
    return NextResponse.json({
        message: "success"
    })
}