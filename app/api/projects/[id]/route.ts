import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// GET /api/projects/[id] - Get single project
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    
    // In real app: const project = await db.projects.findById(id)
    // For now, return mock data
    const mockProject = {
      id: parseInt(id),
      title: "Sample Project",
      description: "This is a sample project",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["React", "Next.js"],
      github: "https://github.com/username/project",
      live: "https://project.vercel.app",
      featured: false
    }

    return NextResponse.json(mockProject)
  } catch (error) {
    return NextResponse.json(
      { error: "Project not found" },
      { status: 404 }
    )
  }
}

// PUT /api/projects/[id] - Update project (Admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const id = params.id
    const body = await request.json()

    // In real app: const updatedProject = await db.projects.update(id, body)
    const updatedProject = {
      id: parseInt(id),
      ...body,
      updatedAt: new Date().toISOString()
    }

    return NextResponse.json(updatedProject)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    )
  }
}

// DELETE /api/projects/[id] - Delete project (Admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const id = params.id

    // In real app: await db.projects.delete(id)
    
    return NextResponse.json(
      { message: "Project deleted successfully" },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    )
  }
}
