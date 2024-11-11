import { PrismaClient} from "@prisma/client";
import { NextResponse } from "next/server";
import { LayerGroup } from "@prisma/client";


export async function GET() {
    const prisma = new PrismaClient();
    const groups = (await prisma.layerGroup.findMany({
        include: {
            layers:true
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
        const r = await prisma.layerGroup.create({
            data: {
                name:LayerGroup.name,
                layerSectionId:LayerGroup.layerSectionId,
                longitude:LayerGroup.longitude,
                latitude:LayerGroup.latitude,
                zoom:LayerGroup.zoom,
                bearing:LayerGroup.bearing
            }
        })
        return NextResponse.json({
            r
        })
    }
    
    catch(e) {
        console.log(e.message)
    }

}

export async function PUT(request: Request) {
    const LayerGroup:LayerGroup = await request.json()
    const prisma = new PrismaClient()

    try {
        const r = await prisma.layerGroup.update({
            where: {
                id: LayerGroup.id
            },
            data: {
                name:LayerGroup.name,
                layerSectionId:LayerGroup.layerSectionId,
                longitude:LayerGroup.longitude,
                latitude:LayerGroup.latitude,
                zoom:LayerGroup.zoom,
                bearing:LayerGroup.bearing  
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