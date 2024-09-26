import { PrismaClient } from "@prisma/client";
import { NextResponse } from 'next/server';
import { Map } from "@prisma/client";

const prisma = new PrismaClient();
//TODO - make a blank-all functions

export  async function GET()
{
    console.log("GET ALL REQUSET:");
    const m : Map = await prisma.map.findMany(); //find all maps

    return NextResponse.json({ //return maps
        m
     })
}

// export  async function GETALL()
// {
//     console.log("GET ALL REQUSET:");
//     const m : Map = await prisma.map.findMany(); //find all maps

//     return NextResponse.json({ //return maps
//         m
//      })
// }

export async function POST(request: Request) { //create
    try {
        const m: Map = await request.json(); //parsars the JSON

        //console.log("Request Headers:", request.headers);  //DEBUG
        //console.log("Incoming data:", m);

        console.log("POST REQUSET:", m);

        if (!m.id || !m.name || m.checked === undefined || !m.infoId || !m.zoomFunction) { //check to see if the JSON is vaild
            console.error("Validation error: Missing required fields", m);
            return NextResponse.json({ //sends error and 400 (Bad Request) if not
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
        return NextResponse.json({ //send 500 (Internal Server Error) and what the error is to frontend
            message: "Failed to create map",
            error: error.message,
        }, { status: 500 });
    } 
    
    finally { //SAVE THAT MEMORY/CONNECTION
        await prisma.$disconnect();
    }
}

export async function DELETE(request: Request){ //delete 
    const m: Map = await request.json();

    console.log("DELETE REQUSET:", m.id);//logging

    
    try{
        if (!m.id || !m.name || m.checked === undefined || !m.infoId || !m.zoomFunction) { //check to see if the JSON is vaild
            console.error("Validation error: Missing required fields", m);
            return NextResponse.json({ //sends error and 400 (Bad Request) if not
                message: "Invalid data: ",
                error: "Missing required fields",
            }, { status: 400 });
        }

        const delmap = await prisma.map.delete({ //find and delete the map id that was sent
            where: {
              id: m.id,
            },
          })

        return NextResponse.json({ //send success and the delmap data back 
            message: "Success",
            data: delmap
        });
    }
    catch (error: any) { //catch error if try fails
        console.error("Error creating map:", error); //log to server
        return NextResponse.json({ //send 500 (Internal Server Error) and what the error is to frontend
            message: "Failed to create map",
            error: error.message,
        }, { status: 500 });
    } 
}

export async function PUT(request: Request){ //create or modify

}

