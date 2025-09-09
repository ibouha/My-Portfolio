"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Save, User, Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react"

interface PersonalInfo {
  name: string
  title: string
  bio: string
  email: string
  phone: string
  location: string
  social: {
    github: string
    linkedin: string
    twitter: string
  }
}

export default function PersonalInfoPage() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: "",
    title: "",
    bio: "",
    email: "",
    phone: "",
    location: "",
    social: {
      github: "",
      linkedin: "",
      twitter: ""
    }
  })
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchPersonalInfo()
  }, [])

  const fetchPersonalInfo = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/personal")
      if (response.ok) {
        const data = await response.json()
        setPersonalInfo(data)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load personal information",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch("/api/personal", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(personalInfo)
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Personal information updated successfully"
        })
      } else {
        throw new Error("Failed to update")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update personal information",
        variant: "destructive"
      })
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith("social.")) {
      const socialField = field.split(".")[1]
      setPersonalInfo(prev => ({
        ...prev,
        social: {
          ...prev.social,
          [socialField]: value
        }
      }))
    } else {
      setPersonalInfo(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Personal Information</h1>
          <p className="text-gray-400">Manage your profile and contact details</p>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={saving}
          className="bg-teal-600 hover:bg-teal-500"
        >
          <Save className="w-4 h-4 mr-2" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <User className="w-5 h-5" />
              Basic Information
            </CardTitle>
            <CardDescription className="text-gray-400">
              Your core profile information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-300">Full Name</Label>
              <Input
                id="name"
                value={personalInfo.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="Your full name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="title" className="text-gray-300">Professional Title</Label>
              <Input
                id="title"
                value={personalInfo.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="e.g., Full Stack Developer"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio" className="text-gray-300">Bio</Label>
              <Textarea
                id="bio"
                value={personalInfo.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                className="bg-gray-700 border-gray-600 text-white min-h-[100px]"
                placeholder="Tell us about yourself..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Contact Information
            </CardTitle>
            <CardDescription className="text-gray-400">
              How people can reach you
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <Input
                id="email"
                type="email"
                value={personalInfo.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="your@email.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-300">Phone</Label>
              <Input
                id="phone"
                value={personalInfo.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="+1 (555) 123-4567"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location" className="text-gray-300">Location</Label>
              <Input
                id="location"
                value={personalInfo.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="City, Country"
              />
            </div>
          </CardContent>
        </Card>

        {/* Social Links */}
        <Card className="bg-gray-800 border-gray-700 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Social Links</CardTitle>
            <CardDescription className="text-gray-400">
              Your social media and professional profiles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="github" className="text-gray-300 flex items-center gap-2">
                  <Github className="w-4 h-4" />
                  GitHub
                </Label>
                <Input
                  id="github"
                  value={personalInfo.social.github}
                  onChange={(e) => handleInputChange("social.github", e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="https://github.com/username"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="linkedin" className="text-gray-300 flex items-center gap-2">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </Label>
                <Input
                  id="linkedin"
                  value={personalInfo.social.linkedin}
                  onChange={(e) => handleInputChange("social.linkedin", e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="twitter" className="text-gray-300 flex items-center gap-2">
                  <Twitter className="w-4 h-4" />
                  Twitter
                </Label>
                <Input
                  id="twitter"
                  value={personalInfo.social.twitter}
                  onChange={(e) => handleInputChange("social.twitter", e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="https://twitter.com/username"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
