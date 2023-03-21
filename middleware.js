import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const middleware = async (req) => {
  const session = await getToken({ req, secret: process.env.JWT_SECRET });
  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  // console.dir(session)
  return NextResponse.next();
};

export const config = {
  matcher: [
    "/",
    "/billing/:path*",
    "/member/:path*",
    "/monitor/:path*",
    "/overdue/:path*",
    "/report/:path*",
  ],
};

export default middleware;