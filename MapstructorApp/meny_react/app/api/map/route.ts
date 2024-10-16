import {Map, MapFilterGroup, MapFilterItem, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {//get
  const groups = await prisma.mapFilterGroup.findMany({ //find all groups 
    include: {
        maps: true,             // Include associated maps
        mapfilteritems: true,   // Include associated MapFilterItems
    },
});

    return NextResponse.json({
      groups
    })
}

export async function POST(request: Request) { // create
  try {
      const group: MapFilterGroup = await request.json(); // parse the JSON

      const existingGroup = await prisma.mapFilterGroup.findFirst({ //check if group exsit 
          where: {
            groupId: group.groupId,
          },
      });

      if (existingGroup) {
          console.log("ERROR: ATTEMPTED REPEATED RECORDS -- SENDING 400");
          console.error("REPEATED RECORD ERROR: Missing required fields");
          return NextResponse.json({
              message: "Already exists - send a put request",
              error: "REPEATED RECORDS ARE NOT ALLOWED",
          }, { status: 400 });
      }

      const newgroup = await prisma.mapFilterGroup.create({ //creates the group and its nested tables
        data: {
            groupName: group.groupName,
            label: group.label,
            groupId: group.groupId,
            maps: {
                create: group.maps?.map(m => ({ //creates the maps
                    mapId: m.mapId,
                    longitude: m.longitude,
                    latitude: m.latitude,
                    mapName: m.mapName,
                    zoom: m.zoom,
                    bearing: m.bearing,
                    styleId: m.styleId,
                })) || [],
            },
            mapfilteritems: {
                create: group.mapfilteritems?.map(item => ({ //creates the items
                    itemName: item.itemName,
                    label: item.label,
                    defaultCheckedForBeforeMap: item.defaultCheckedForBeforeMap,
                    defaultCheckedForAfterMap: item.defaultCheckedForAfterMap,
                    showInfoButton: item.showInfoButton,
                    showZoomButton: item.showZoomButton,
                })) || [],
            },
        },
    });

      return NextResponse.json({ // send success and the new map data back 
          message: "Success",
          map_id: newgroup
      });
      
  } catch (error) { // catch error if try fails
      console.error("Error creating map:", error); // log to server
      return NextResponse.json({ // send 500 (Internal Server Error) and what the error is to frontend
          message: "Failed to create map",
          error: error.message,
      }, { status: 500 });
  }
}

export async function DELETE(request: Request){ //delete 
    const g = await request.json();

    let delitemname: string = g.itemName;
    let delmapid:string  = g.mapId;
    
    let message:string = "failed";

    console.log("DELETE:", delmapid, g.groupId);//logging

    
    try{
        if (g.groupId == undefined) { //check to see if the JSON is vaild
            console.log("ERROR: MISSING ID DATA -- SENDING 400");
            console.error("Validation error: Missing required fields");
            return NextResponse.json({ //sends error and 400 (Bad Request) if not
                message: "Invalid data",
                error: "Missing required fields",
            }, { status: 400 });
        }

        if(delmapid !== undefined){//want to delete a map
           await prisma.map.deleteMany({
                where: {
                    groupId: g.groupId,
                    mapId: delmapid, 
                },
            });

            message = "deleted map";
        }

        else if(delitemname !== undefined){ //want to delete a item
            await prisma.mapFilterItem.deleteMany({
                where: {
                    groupId: g.groupId,
                    itemName: delitemname, 
                },
            });

            message = "deleted item";
        }

        else{ //delete group
            console.log("del group!")
            const transaction = await prisma.$transaction([ 
                prisma.map.deleteMany({ where: { groupId: g.groupId } }),
                prisma.mapFilterItem.deleteMany({ where: { groupId: g.groupId } }),
                prisma.mapFilterGroup.deleteMany({ where: { groupId: g.groupId } })
            ]);
            message = "deleted group";
        }

          console.log("DELETE COMPLETE: ", g.groupId);//sucess delete map

        return NextResponse.json({ //send success and the delmap data back 
            message: message,
            data: g
        });
    }
    catch (error: any) { //catch error if try fails
        console.error("Error Deleting:", error); //log to server
        return NextResponse.json({ //send 500 (Internal Server Error) and what the error is to frontend
            message: "Failed to delete",
            error: error.message,
        }, { status: 500 });
    } 
}

// export async function PUT(request: Request){ //modify
//     const m: Map = await request.json();
    

//     console.log("<================== PUT ==================>: ",m.id);

//     try{
//         if (!m.id || !m.name || m.styleId == '' || !m.longitude || !m.latitude || !m.zoom || !m.bearing
//         ){ //check to see if the JSON is vaild
//             console.log("ERROR: MISSING DATA -- SENDING 400");
//             console.error("Validation error: Missing required fields", m);
//             return NextResponse.json({ //sends error and 400 (Bad Request) if not
//                 message: "Invalid data: ",
//                 error: "Missing required fields",
//             }, { status: 400 });
//         }

//     // console.log(await prisma.map.findFirst({where:{id: m.id}})); //DEBUG

//         if(await prisma.map.findFirst({
//             where:{
//                 id: m.id
//             }
//         }) == undefined){
//             console.log("ERROR: Map does not exist -- SENDING 400");
//             console.error("Map does not exsit in database, please do a post request", m);
//             return NextResponse.json({ //sends error and 400 (Bad Request) if not
//                 message: "Map Not In Database: ",
//                 error: "Map does not exsit in database, please do a post request",
//             }, { status: 400 });
//         }
//             const mod_map = await prisma.map.update({
//                 where: { id: m.id },
//                 data: {
//                     name: m.name,
//                     styleId: m.styleId,
//                     longitude: m.longitude,
//                     latitude: m.latitude,
//                     zoom: m.zoom,
//                     bearing: m.bearing
//                 },
//               });
            
//             // console.log(await prisma.map.findFirst({where:{id: m.id}}));
//               console.log("<================== PUT COMPELETE==================>: ",m.id);
//               return NextResponse.json({ //send success and the newmap data back 
//                 message: "Success",
//                 data: mod_map
//                 });
//     }
//     catch (error: any) { //catch error if try fails
//         console.error("Error Updating map:", error); //log to server
//         return NextResponse.json({ //send 500 (Internal Server Error) and what the error is to frontend
//             message: "Failed to Updating map",
//             error: error.message,
//         }, { status: 500 });
//     } 
// }