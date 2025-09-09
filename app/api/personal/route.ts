import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import personalData from "@/data/personal.json"

// GET /api/personal - Get personal information
export async function GET() {
  try {
    return NextResponse.json(personalData)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch personal information" },
      { status: 500 }
    )
  }
}

// PUT /api/personal - Update personal information (Admin only)
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    
    // Validate required fields
    if (!body.name || !body.title || !body.email) {
      return NextResponse.json(
        { error: "Name, title, and email are required" },
        { status: 400 }
      )
    }

    // In real app: const updatedPersonal = await db.personal.update(body)
    const updatedPersonal = {
      ...personalData,
      ...body,
      updatedAt: new Date().toISOString()
    }

    return NextResponse.json(updatedPersonal)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update personal information" },
      { status: 500 }
    )
  }
}
