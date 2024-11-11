import { LayerData, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(context: any) {
    const {params} = context;
    const prisma = new PrismaClient();
    const layerData:LayerData = await prisma.layerData.findFirst({
        where:{
            id: params.id
        }
    })

    return NextResponse.json({
        layerData
    })
}

export async function DELETE(context: any) {
 const {params} = context;
 const prisma = new PrismaClient();
 try {
    await prisma.layerData.delete({
    where: {
        id: params.id
    }
 })

 return NextResponse.json({
    Message: "Success"
 })

}
catch(e) {
    console.log(e)
    throw(e)
}
 

}