import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const middleware = async (req) => {
  const session = await getToken({ req, secret: process.env.JWT_SECRET });
  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/",
    "/billing",
    "/billing/:path*",
    "/member",
    "/member/:path*",
    "/monitor",
    "/monitor/:path*",
    "/overdue",
    "/overdue/:path*",
    "/report",
    "/report/:path*",
  ],
};

export default middleware;
