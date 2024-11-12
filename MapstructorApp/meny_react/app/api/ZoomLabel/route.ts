import { PrismaClient, ZoomLabel } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
    const prisma = new PrismaClient();
    const zoomLabel:ZoomLabel = await prisma.zoomLabel.findMany()

    return NextResponse.json({
        zoomLabel
    })
}

export async function POST(request: Request) {
const prisma = new PrismaClient();
const zoomLabel:ZoomLabel = await request.json()
try {
const l = await prisma.zoomLabel.create({
    data: {
        title: zoomLabel.title,
        minZoom: zoomLabel.minZoom,
        zoom: zoomLabel.zoom,
        bearing: zoomLabel.bearing,
        latitude: zoomLabel.latitude,
        longitude: zoomLabel.longitude
    }
})
return NextResponse.json({
    l
})

}
catch(e) {
    console.log(e);
    throw(e);
}
}