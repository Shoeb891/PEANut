import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request:NextRequest) {
    try {
        const reqbody = request.json();
        const {rollnumber, password}  = reqbody;
        console.log(reqbody);

        const user = await prisma.user.findOne(
            {
                where:{rollnumber}
            }
        );

        if(!rollnumber){
            return NextResponse.json({error:"User doesn't exist"},{status:400});
        }

        console.log("User exists")
        
    } catch (error:any) {
        return NextResponse.json({error: error.message},{status:500});
        }
}