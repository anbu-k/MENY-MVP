import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(request: Request, context: any) {
    const { params } = context;
    const prisma = new PrismaClient();
    const layer = await prisma.layer.findFirst({
        where: {
            id: params.id
        }
    })

    return NextResponse.json({
        layer
    })
}