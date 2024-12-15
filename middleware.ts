import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function middleware() {
  const session = await auth()

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/api/emails/:path*",
  ]
} 