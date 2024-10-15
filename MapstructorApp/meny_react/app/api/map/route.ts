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

      console.log(group.mapfiltergroup);

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
          map_id: newgroup.id
      });
      
  } catch (error) { // catch error if try fails
      console.error("Error creating map:", error); // log to server
      return NextResponse.json({ // send 500 (Internal Server Error) and what the error is to frontend
          message: "Failed to create map",
          error: error.message,
      }, { status: 500 });
  }
}

//Outdated do not use!!!!!!!!!!!!!!!!!
export async function DELETE(request: Request){ //delete 
    const g: MapFilterGroup = await request.json();

    console.log("DELETE:", g.id);//logging

    
    try{
        if (g.id == undefined) { //check to see if the JSON is vaild
            console.log("ERROR: MISSING ID DATA -- SENDING 400");
            console.error("Validation error: Missing required fields");
            return NextResponse.json({ //sends error and 400 (Bad Request) if not
                message: "Invalid data: ",
                error: "Missing required fields",
            }, { status: 400 });
        }

        const delmap = await prisma.mapFilterGroup.delete({ //find and delete the map id that was sent
            where: {
              id: g.id,
            },
            include: {
                maps: true,             // Include associated maps
                mapfilteritems: true,   // Include associated MapFilterItems
            },
          })

          console.log("DELETE COMPLETE: ", g.id);//sucess delete map

        return NextResponse.json({ //send success and the delmap data back 
            message: "Success",
            data: delmap
        });
    }
    catch (error: any) { //catch error if try fails
        console.error("Error Deleting map:", error); //log to server
        return NextResponse.json({ //send 500 (Internal Server Error) and what the error is to frontend
            message: "Failed to delete map",
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