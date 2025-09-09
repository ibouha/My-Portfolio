"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  FolderOpen,
  FileText,
  Mail,
  Eye,
  Plus,
  TrendingUp,
  Users,
  MessageSquare
} from "lucide-react"
import Link from "next/link"

// Mock data - will be replaced with real API calls
const stats = {
  projects: 8,
  blogPosts: 12,
  messages: 5,
  views: 1234
}

const recentProjects = [
  { id: 1, title: "E-Commerce Platform", status: "published", views: 245 },
  { id: 2, title: "Task Management App", status: "draft", views: 89 },
  { id: 3, title: "Weather Dashboard", status: "published", views: 156 }
]

const recentMessages = [
  { id: 1, name: "John Doe", email: "john@example.com", subject: "Project Inquiry", time: "2 hours ago" },
  { id: 2, name: "Sarah Smith", email: "sarah@example.com", subject: "Collaboration", time: "5 hours ago" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", subject: "Job Opportunity", time: "1 day ago" }
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome back! Here's what's happening with your portfolio.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Projects</CardTitle>
            <FolderOpen className="h-4 w-4 text-teal-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.projects}</div>
            <p className="text-xs text-gray-400">+2 from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Blog Posts</CardTitle>
            <FileText className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.blogPosts}</div>
            <p className="text-xs text-gray-400">+3 from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Messages</CardTitle>
            <Mail className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.messages}</div>
            <p className="text-xs text-gray-400">New inquiries</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.views}</div>
            <p className="text-xs text-gray-400">+12% from last week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Recent Projects</CardTitle>
                <CardDescription className="text-gray-400">Your latest portfolio projects</CardDescription>
              </div>
              <Button asChild size="sm" className="bg-teal-600 hover:bg-teal-500">
                <Link href="/admin/projects">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Project
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div key={project.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-white">{project.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={project.status === "published" ? "default" : "secondary"}>
                        {project.status}
                      </Badge>
                      <span className="text-sm text-gray-400">{project.views} views</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Messages */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Recent Messages</CardTitle>
                <CardDescription className="text-gray-400">Latest contact form submissions</CardDescription>
              </div>
              <Button asChild size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:text-white">
                <Link href="/admin/messages">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMessages.map((message) => (
                <div key={message.id} className="flex items-start gap-3 p-3 bg-gray-700/50 rounded-lg">
                  <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-white">
                      {message.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-white truncate">{message.name}</h4>
                      <span className="text-xs text-gray-400">{message.time}</span>
                    </div>
                    <p className="text-sm text-gray-400 truncate">{message.subject}</p>
                    <p className="text-xs text-gray-500">{message.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Quick Actions</CardTitle>
          <CardDescription className="text-gray-400">Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button asChild className="h-20 flex-col gap-2 bg-teal-600 hover:bg-teal-500">
              <Link href="/admin/projects/new">
                <Plus className="w-6 h-6" />
                New Project
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex-col gap-2 border-gray-600 text-gray-300 hover:text-white">
              <Link href="/admin/blog/new">
                <FileText className="w-6 h-6" />
                Write Post
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex-col gap-2 border-gray-600 text-gray-300 hover:text-white">
              <Link href="/admin/personal">
                <Users className="w-6 h-6" />
                Edit Profile
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex-col gap-2 border-gray-600 text-gray-300 hover:text-white">
              <Link href="/admin/messages">
                <MessageSquare className="w-6 h-6" />
                View Messages
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
