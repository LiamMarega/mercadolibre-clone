import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from './lib/auth';


export async function middleware(request: NextRequest) {
    const authHeader = request.cookies.get('token')?.value;
    if (!authHeader) {
       return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    const token = authHeader;

    const decoded = await verifyToken(token);

    if (!token) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
      }

    if (!decoded) {
        return  NextResponse.redirect(new URL('/auth/login', request.url));
    }

    return NextResponse.next();
    

}

export const config = { 
    matcher: ['/profile']

}