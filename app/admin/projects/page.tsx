"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Star,
  ExternalLink
} from "lucide-react"
import Link from "next/link"

// Mock data - will be replaced with real API calls
const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution built with Next.js, Stripe, and PostgreSQL",
    technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    featured: true,
    status: "published",
    views: 245,
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
    featured: false,
    status: "draft",
    views: 89,
    createdAt: "2024-01-10"
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "Real-time weather dashboard with interactive maps and forecasts",
    technologies: ["Vue.js", "Express", "OpenWeather API"],
    featured: true,
    status: "published",
    views: 156,
    createdAt: "2024-01-05"
  }
]

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredProjects, setFilteredProjects] = useState(projects)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    const filtered = projects.filter(project =>
      project.title.toLowerCase().includes(term.toLowerCase()) ||
      project.description.toLowerCase().includes(term.toLowerCase())
    )
    setFilteredProjects(filtered)
  }

  const handleDelete = (id: number) => {
    // In real app, this would call an API
    console.log("Delete project:", id)
  }

  const toggleFeatured = (id: number) => {
    // In real app, this would call an API
    console.log("Toggle featured:", id)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Projects</h1>
          <p className="text-gray-400">Manage your portfolio projects</p>
        </div>
        <Button asChild className="bg-teal-600 hover:bg-teal-500">
          <Link href="/admin/projects/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Link>
        </Button>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">All Projects</CardTitle>
              <CardDescription className="text-gray-400">
                {filteredProjects.length} projects total
              </CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 w-64 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700">
                <TableHead className="text-gray-300">Project</TableHead>
                <TableHead className="text-gray-300">Technologies</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
                <TableHead className="text-gray-300">Views</TableHead>
                <TableHead className="text-gray-300">Created</TableHead>
                <TableHead className="text-gray-300 w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map((project) => (
                <TableRow key={project.id} className="border-gray-700">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-white">{project.title}</h3>
                          {project.featured && (
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          )}
                        </div>
                        <p className="text-sm text-gray-400 max-w-md truncate">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 2).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={project.status === "published" ? "default" : "secondary"}
                      className={project.status === "published" ? "bg-green-600" : ""}
                    >
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-gray-400">
                      <Eye className="w-4 h-4" />
                      {project.views}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-gray-800 border-gray-700" align="end">
                        <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-gray-300 hover:text-white hover:bg-gray-700"
                          onClick={() => toggleFeatured(project.id)}
                        >
                          <Star className="w-4 h-4 mr-2" />
                          {project.featured ? "Unfeature" : "Feature"}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Open Live
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-400 hover:text-red-300 hover:bg-gray-700"
                          onClick={() => handleDelete(project.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
