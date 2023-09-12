import { NextResponse } from "next/server";
import { deleteCookie } from "cookies-next"

export async function GET() {
    try {

        const response = NextResponse.json(
            {
                message: "Logout sucessfull",
                status: true,
            }
        )

        deleteCookie('token');

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}