import {Map, MapFilterGroup, MapFilterItem, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {//get
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
                    itemId: item.itemId,
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

    let delitemId: string = g.itemId;
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

        else if(delitemId !== undefined){ //want to delete a item
            await prisma.mapFilterItem.deleteMany({
                where: {
                    groupId: g.groupId,
                    itemId: delitemId, 
                },
            });

            message = "deleted item";
        }

        else{ //delete group
            console.log("delete group!")
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
            data: g.groupId
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

export async function PUT(request: Request){ //modify
    const g  = await request.json();
    

    console.log("PUT: \n", g);

    try{
        if (!g.groupId){ //check to see if the JSON is vaild
            console.log("ERROR: MISSING DATA -- SENDING 400");
            console.error("Validation error: Missing required fields");
            return NextResponse.json({ //sends error and 400 (Bad Request) if not
                message: "Invalid data: ",
                error: "Missing required fields",
            }, { status: 400 });
        }

        if(g.mapId && (await prisma.map.findFirst({
            where: {
                 mapId: g.mapId,
                groupId: g.groupId
            }})
        ) !== null){//update a map
            console.log(" Map update PUT COMPELETE ");
            await prisma.map.updateMany({
                where: {
                    mapId: g.mapId,
                    groupId: g.groupId
                  },
                  data: {
                    longitude: g.longitude,
                    latitude: g.latitude,
                    mapName: g.mapName,
                    zoom: g.zoom,
                    bearing: g.bearing,
                    styleId: g.styleId
                  },
            });
        }

        else if(g.mapId && (await prisma.map.findFirst({
            where: {
                 mapId: g.mapId,
                groupId: g.groupId
            }})) === null
        ){//update a map
            console.log(" Map create PUT COMPELETE ");

            const newmap = await prisma.map.create({
                data:{
                    longitude: g.longitude,
                    groupId: g.groupId,
                    latitude: g.latitude,
                    mapName: g.mapName,
                    mapId: g.mapId,
                    zoom: g.zoom,
                    bearing: g.bearing,
                    styleId: g.styleId
                }
            });

            await prisma.mapFilterGroup.update({
                where: {
                    groupId: g.groupId,
                  },
                  data: {
                    maps: {
                     push: newmap,
                    },
                  },
            });
        }

        else if(g.itemId && (await prisma.mapFilterItem.findFirst({
            where: {
                itemId: g.itemId,
                groupId: g.groupId
            }})
        ) !== null){//update a item
            console.log(" item update PUT COMPELETE ");
            await prisma.mapFilterItem.updateMany({
                where: {
                    itemId: g.itemId,
                    groupId: g.groupId
                  },
                  data: {
                    itemName                   :  g.itemName,
                    groupId: g.groupId,
                    label                      :  g.label,
                    defaultCheckedForBeforeMap :  g.defaultCheckedForBeforeMap,
                    defaultCheckedForAfterMap  :  g.defaultCheckedForAfterMap,
                    showInfoButton             :  g.showInfoButton,
                    showZoomButton             :  g.showZoomButton,
                    itemId                     :  g.itemId,
                  },
            });
        }

        else if(g.itemId && (await prisma.mapFilterItem.findFirst({
            where: {
                itemId: g.itemId,
                groupId: g.groupId
            }})) === null
        ){//creating a new item
            console.log(" item create PUT COMPELETE ");

            const newitem = await prisma.mapFilterItem.create({
                data:{
                    itemName                   :  g.itemName,
                    label                      :  g.label,
                    groupId: g.groupId,
                    defaultCheckedForBeforeMap :  g.defaultCheckedForBeforeMap,
                    defaultCheckedForAfterMap  :  g.defaultCheckedForAfterMap,
                    showInfoButton             :  g.showInfoButton,
                    showZoomButton             :  g.showZoomButton,
                    itemId                     :  g.itemId,
                }
            });

            await prisma.mapFilterGroup.update({
                where: {
                    groupId: g.groupId,
                  },
                  data: {
                    mapfilteritems: {
                     push: newitem,
                    },
                  },
            });
        }
        
        else{//update a group
            console.log("group update")
            await prisma.mapFilterGroup.updateMany({
                where: {
                    groupId: g.groupId
                  },
                  data: {
                    groupName: g.groupName,
                    label: g.label
                  },
            });
        }

        // console.log(await prisma.map.findFirst({where:{id: m.id}}));
        console.log(" PUT COMPELETE ");
        return NextResponse.json({ //send success and the newmap data back 
        message: "Success",
        data: g.groupId
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