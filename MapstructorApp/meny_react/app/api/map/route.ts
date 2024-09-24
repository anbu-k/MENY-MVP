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

    /*
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `checked` BOOLEAN NOT NULL,
    `infoId` VARCHAR(191) NOT NULL,
    `zoomFunction` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Map_id_key`(`id`),
    PRIMARY KEY (`id`)
    */
    // if(req.method == 'POST'){
    //     const {id, name, checked, infoId, zoomFunction} = req.body;
    //     const result = await prisma.map.create({
    //         data: {
    //           id,
    //           name,
    //           checked,
    //           infoId,
    //           zoomFunction,
    //         },
    //       })
    //       res.json(result)
    // }

    const map = await prisma.map.findMany();
    return res.send(map)
}
