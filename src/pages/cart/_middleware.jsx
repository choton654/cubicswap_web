import { NextResponse, NextFetchEvent } from "next/server";

export async function middleware(req, ev) {
  if (req.url === "/cart") {
    console.log(req.cookies.token);

    if (req.cookies.token) {
      return NextResponse.next();
    }

    // return await redirects(req);

    // return new Response("Auth required", {
    //   status: 401,
    //   headers: {
    //     "WWW-Authenticate": 'Basic realm="Secure Area"',
    //   },
    // });

    // return new Response("Hello, world!");
  }
}
