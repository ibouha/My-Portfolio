"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import blogData from "@/data/blog.json"
import { Calendar, Clock } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function Blog() {
  useEffect(() => {
    gsap.fromTo(".page-title", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" })

    gsap.fromTo(
      ".blog-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".blog-grid",
          start: "top 80%",
        },
      },
    )
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen">
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container">
          <div className="page-title text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-teal-900 mb-6">Blog</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Thoughts, tutorials, and insights about web development, technology, and design.
            </p>
          </div>

          <div className="blog-grid max-w-4xl mx-auto space-y-8">
            {blogData.posts.map((post) => (
              <article key={post.id} className="blog-card bg-white rounded-2xl p-8 shadow-lg card-hover">
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-teal-900 mb-4 hover:text-teal-900/80 transition-colors cursor-pointer">
                  {post.title}
                </h2>

                <p className="text-gray-600 mb-6 leading-relaxed text-lg">{post.excerpt}</p>

                <div className="flex items-center gap-6 text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span className="text-sm">{formatDate(post.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span className="text-sm">{post.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
