import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/" ||
    path === "/student/login" ||
    path === "/student/signup" ||
    path === "/Faculty/Login" ||
    path === "/Faculty/Signup";

  try {
    const response = await axios.get("/api/role");
    const role = response.data.message.role;
    console.log(role);
    if (role) {
      return NextResponse.json(
        {
          message: role.message.data.role,
          success: true,
        },
        { status: 200 }
      );
    }

    const token = request.cookies.get("token")?.value || "";

    if (isPublicPath && token) {
      return NextResponse.redirect(
        new URL("/student/profile", request.nextUrl)
      );
    }

    if (!isPublicPath && !token) {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }
  } catch (error) {
    console.error(error);
  }

  // If you are not redirecting, you should return a response here
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/Faculty/profile",
    "/student/login",
    "/student/signup",
    "/profile/(.*)",
    "/Faculty/Login",
    "/Faculty/Signup",
    "/stdent/profile",
  ],
};
