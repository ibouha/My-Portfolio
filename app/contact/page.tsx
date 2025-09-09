"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { gsap } from "gsap"
import personalData from "@/data/personal.json"
import { Mail, Phone, MapPin, Github, Linkedin, Send } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  useEffect(() => {
    gsap.fromTo(
      ".contact-content",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.2 },
    )
  }, [])

  const [loading, setLoading] = useState(false)
  const [responseMsg, setResponseMsg] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResponseMsg(null)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (res.ok) {
        setResponseMsg("Message sent successfully!")
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        setResponseMsg(data.error || "Failed to send message.")
      }
    } catch (err) {
      setResponseMsg("An error occurred. Please try again later.")
    }
    setLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen">
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container">
          <div className="contact-content text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-teal-900 mb-6">Get In Touch</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have a project in mind or just want to chat? I'd love to hear from you. Let's create something amazing
              together.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="contact-content">
              <h2 className="text-3xl font-bold text-teal-900 mb-8">Let's Connect</h2>

              <div className="space-y-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <Mail className="text-gray-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-teal-900">Email</h3>
                    <a
                      href={`mailto:${personalData.email}`}
                      className="text-gray-600 hover:text-teal-900 transition-colors"
                    >
                      {personalData.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <Phone className="text-gray-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-teal-900">Phone</h3>
                    <a
                      href={`tel:${personalData.phone}`}
                      className="text-gray-600 hover:text-teal-900 transition-colors"
                    >
                      {personalData.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <MapPin className="text-gray-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-teal-900">Location</h3>
                    <span className="text-gray-600">{personalData.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <a
                  href={personalData.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-teal-900 text-white rounded-full flex items-center justify-center hover:bg-teal-900/90 transition-colors"
                >
                  <Github size={20} />
                </a>
                <a
                  href={personalData.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-teal-900 text-white rounded-full flex items-center justify-center hover:bg-teal-900/90 transition-colors"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-content">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-900 focus:border-transparent transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-900 focus:border-transparent transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-900 focus:border-transparent transition-colors"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-900 focus:border-transparent transition-colors resize-none"
                    placeholder="Tell me about your project or just say hello!"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-teal-900 text-white px-8 py-3 rounded-lg hover:bg-teal-900/90 transition-colors font-medium flex items-center justify-center gap-2"
                  disabled={loading}
                >
                  <Send size={20} />
                  {loading ? "Sending..." : "Send Message"}
                </button>
                {responseMsg && (
                  <div className={`mt-4 text-center ${responseMsg.includes("success") ? "text-green-600" : "text-red-600"}`}>
                    {responseMsg}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
