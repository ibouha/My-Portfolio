import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// Mock data for contact messages
const mockMessages = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    subject: "Project Inquiry",
    message: "I'm interested in discussing a potential project collaboration.",
    read: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() // 2 hours ago
  },
  {
    id: 2,
    name: "Sarah Smith",
    email: "sarah@example.com",
    subject: "Collaboration Opportunity",
    message: "Hi! I'd love to collaborate on a React project. Are you available?",
    read: false,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString() // 5 hours ago
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    subject: "Job Opportunity",
    message: "We have an exciting full-stack developer position that might interest you.",
    read: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() // 1 day ago
  }
]

// GET /api/contact - Get all contact messages (Admin only)
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // In real app: const messages = await db.contactMessages.findAll()
    return NextResponse.json(mockMessages)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    )
  }
}

// POST /api/contact - Submit contact form
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // In real app: const newMessage = await db.contactMessages.create(...)
    const newMessage = {
      id: Date.now(),
      name,
      email,
      subject,
      message,
      read: false,
      createdAt: new Date().toISOString()
    }

    // Here you could also send an email notification to admin
    // await sendEmailNotification(newMessage)

    return NextResponse.json(
      { message: "Message sent successfully", id: newMessage.id },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    )
  }
}
