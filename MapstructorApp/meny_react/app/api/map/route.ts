import { NextApiRequest, NextApiHandler, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import {Map}  from "@prisma/client"
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    const maps = (await prisma.map.findMany());

    return NextResponse.json({
        maps
    })
}


export async function POST(request: Request) { //create
    try {
        const m: Map = await request.json(); //parsars the JSON

        //console.log("Request Headers:", request.headers);  //DEBUG
        //console.log("Incoming data:", m);

        console.log("<================== POST ==================>: ", m);

        if (!m.name || m.attributionControl === undefined || !m.longitude || !m.latitude ||
            !m.infoId || !m.zoom || !m.bearing
        ) { //check to see if the JSON is vaild
            console.log("ERROR: MISSING DATA -- SENDING 400");
            console.error("Validation error: Missing required fields", m);
            return NextResponse.json({ //sends error and 400 (Bad Request) if not
                message: "Invalid data: ",
                error: "Missing required fields",
            }, { status: 400 });
        }

        if(await prisma.map.findFirst({// check if already in DB
                where:{
                    id: m.id,
                    name: m.name
                }
            }) != undefined){
                console.log("ERROR: ATTEMPED REPEATED RECORDS -- SENDING 400");
                console.error("Validation error: Missing required fields", m);
                return NextResponse.json({ //sends error and 400 (Bad Request) if not
                    message: "Already exist",
                    error: "REPEATED RECORDS ARE NOT ALLOWED",
                }, { status: 400 });
        }

        const newMap = await prisma.map.create({ //create the new map in DB 
            data: {
                name: m.name,
                attributionControl: m.attributionControl,
                infoId: m.infoId,
                longitude: m.longitude,
                latitude: m.latitude,
                zoom: m.zoom,
                bearing: m.bearing
            },
        });
        console.log("<================== POST COMPELETE ==================>: ", newMap.id);
        return NextResponse.json({ //send success and the newmap data back 
            message: "Success",
            map_id: newMap.id
        });
    } 
    
    catch (error) { //catch error if try fails
        console.error("Error creating map:", error); //log to server
        return NextResponse.json({ //send 500 (Internal Server Error) and what the error is to frontend
            message: "Failed to create map",
            error: error.message,
        }, { status: 500 });
    } 
}

export async function DELETE(request: Request){ //delete 
    const m: Map = await request.json();

    console.log("<================== DELETE ==================>: ", m.id);//logging

    
    try{
        if (m.id == undefined) { //check to see if the JSON is vaild
            console.log("ERROR: MISSING ID DATA -- SENDING 400");
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

          console.log("<================== DELETE COMPLETE ==================>: ", m.id);//sucess delete map

        return NextResponse.json({ //send success and the delmap data back 
            message: "Success",
            data: delmap
        });
    }
    catch (error: any) { //catch error if try fails
        console.error("Error Deleting map:", error); //log to server
        return NextResponse.json({ //send 500 (Internal Server Error) and what the error is to frontend
            message: "Failed to Deleting map",
            error: error.message,
        }, { status: 500 });
    } 
}

export async function PUT(request: Request){ //modify
    const m: Map = await request.json();
    

    console.log("<================== PUT ==================>: ",m.id);

    try{
        if (!m.id || !m.name || m.attributionControl === undefined || !m.longitude || !m.latitude ||
            !m.infoId || !m.zoom || !m.bearing
        ){ //check to see if the JSON is vaild
            console.log("ERROR: MISSING DATA -- SENDING 400");
            console.error("Validation error: Missing required fields", m);
            return NextResponse.json({ //sends error and 400 (Bad Request) if not
                message: "Invalid data: ",
                error: "Missing required fields",
            }, { status: 400 });
        }

    // console.log(await prisma.map.findFirst({where:{id: m.id}})); //DEBUG

        if(await prisma.map.findFirst({
            where:{
                id: m.id
            }
        }) == undefined){
            console.log("ERROR: Map does not exist -- SENDING 400");
            console.error("Map does not exsit in database, please do a post request", m);
            return NextResponse.json({ //sends error and 400 (Bad Request) if not
                message: "Map Not In Database: ",
                error: "Map does not exsit in database, please do a post request",
            }, { status: 400 });
        }
            const mod_map = await prisma.map.update({
                where: { id: m.id },
                data: {
                    name: m.name,
                    attributionControl: m.attributionControl,
                    infoId: m.infoId,
                    longitude: m.longitude,
                    latitude: m.latitude,
                    zoom: m.zoom,
                    bearing: m.bearing
                },
              });
            
            // console.log(await prisma.map.findFirst({where:{id: m.id}}));
              console.log("<================== PUT COMPELETE==================>: ",m.id);
              return NextResponse.json({ //send success and the newmap data back 
                message: "Success",
                data: mod_map
                });
    }
    catch (error: any) { //catch error if try fails
        console.error("Error Updating map:", error); //log to server
        return NextResponse.json({ //send 500 (Internal Server Error) and what the error is to frontend
            message: "Failed to Updating map",
            error: error.message,
        }, { status: 500 });
    } 
}