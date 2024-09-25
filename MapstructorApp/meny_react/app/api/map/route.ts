import { PrismaClient } from "@prisma/client";
import { NextResponse } from 'next/server';
import { Map } from "@prisma/client";

const prisma = new PrismaClient();

export  async function GET()
{
    const m : Map = await prisma.map.findMany(); //find map

    return NextResponse.json({ //return map
        m
     })
}

export async function POST(request: Request) {
    try {
        const m: Map = await request.json(); //parsars the JSON

        //console.log("Request Headers:", request.headers);  //DEBUG
        //console.log("Incoming data:", m);

        if (!m.id || !m.name || m.checked === undefined || !m.infoId || !m.zoomFunction) { //check to see if the JSON is vaild
            console.error("Validation error: Missing required fields", m);
            return NextResponse.json({ //sends error and 500 if not
                message: "Invalid data: ",
                error: "Missing required fields",
            }, { status: 400 });
        }

        const newMap = await prisma.map.create({ //create the new map in DB 
            data: {
                id: m.id,
                name: m.name,
                checked: m.checked,
                infoId: m.infoId,
                zoomFunction: m.zoomFunction,
            },
        });
        
        return NextResponse.json({ //send success and the newmap data back 
            message: "Success",
            data: newMap
        });
    } 
    
    catch (error) { //catch error if try fails
        console.error("Error creating map:", error); //log to server
        return NextResponse.json({ //send 500 and what the error is to frontend
            message: "Failed to create map",
            error: error.message,
        }, { status: 500 });
    } 
    
    finally { //SAME THAT MEMORY/CONNECTION
        await prisma.$disconnect();
    }
}
