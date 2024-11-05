import { PrismaClient} from "@prisma/client";
import { NextResponse } from "next/server";
import { LayerGroup } from "@prisma/client";


export async function GET() {
    const prisma = new PrismaClient();
    const groups = (await prisma.layerGroup.findMany({
        include: {
            childLayers: {
                include: {
                    layers: true
                }
            }
        }
    }))

    return NextResponse.json({
        groups
    })
}

export async function POST(request: Request) {
    const LayerGroup:LayerGroup = await request.json()
    const prisma = new PrismaClient(); 
    try{
        await prisma.layerGroup.create({
            data: {
                name:LayerGroup.name,
                layerSectionName:LayerGroup.layerSectionName,
                longitude:LayerGroup.longitude,
                latitude:LayerGroup.latitude
            }
        })
        return NextResponse.json({
            message: "Success"
        })
    }
    
    catch(e) {
        console.log(e.message)
    }

}