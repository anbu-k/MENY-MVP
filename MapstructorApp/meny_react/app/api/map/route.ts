import { NextApiRequest, NextApiHandler, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
)
{
    const prisma = new PrismaClient();
    if(req.method === 'GET') {
        const map = await prisma.map.findMany();
        return res.send(map)
    }
    const map = await prisma.map.findMany();
        return res.send(map)
}