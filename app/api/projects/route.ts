import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import projectsData from "@/data/projects.json"

// GET /api/projects - Get all projects
export async function GET() {
  try {
    return NextResponse.json(projectsData)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    )
  }
}

// POST /api/projects - Create new project (Admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { title, description, image, technologies, github, live, featured } = body

    // Validate required fields
    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      )
    }

    // In a real app, this would save to database
    const newProject = {
      id: Date.now(), // Simple ID generation
      title,
      description,
      image: image || "/placeholder.svg?height=300&width=500",
      technologies: technologies || [],
      github: github || "",
      live: live || "",
      featured: featured || false,
      createdAt: new Date().toISOString()
    }

    // For now, just return the new project
    // In real app: await db.projects.create(newProject)
    
    return NextResponse.json(newProject, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    )
  }
}
