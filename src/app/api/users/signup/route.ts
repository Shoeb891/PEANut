import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request:NextRequest) {
    try {
        
        const reqbody = await request.json();
        const {name,rollnumber,email,password} = reqbody;
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        console.log(reqbody);

        const existingUser = await prisma.user.findFirst({
            where:{
                email:email,
            },
        });

        if(existingUser){
            return NextResponse.json(
            {message:"user already exists"},
            {status:400}
            );
        }
        
        

        const newUser = await prisma.user.create({
            data:{
                name,
                rollnumber,
                email,
                password:hashedPassword
            },
        });
        
        return NextResponse.json({ message: "User created Successfully!", success:true });

        
    } catch (error:any) {
        return NextResponse.json({error:error.message},
            {status:500})
    }
    
}

