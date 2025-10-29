"use client"

export const dynamic = "force-dynamic"

import { useState } from "react"
import { ResumeEditor } from "@/components/resume-editor"
import { ResumePreview } from "@/components/resume-preview"
import { TemplateSelector } from "@/components/template-selector"
import { ExportButton } from "@/components/export-button"
import type { ResumeData, Template } from "@/types/resume"

const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    title: "Senior Software Engineer",
    summary:
      "Experienced software engineer with 8+ years of expertise in full-stack development. Passionate about building scalable applications and mentoring junior developers. Proven track record of delivering high-quality solutions on time.",
  },
  experience: [
    {
      id: "1",
      company: "Tech Company",
      position: "Senior Developer",
      startDate: "2022",
      endDate: "Present",
      description:
        "Led development of key features and mentored junior developers. Improved application performance by 40% through optimization. Architected microservices infrastructure serving 1M+ users.",
    },
    {
      id: "2",
      company: "StartUp Inc",
      position: "Full Stack Developer",
      startDate: "2020",
      endDate: "2022",
      description:
        "Built and maintained React and Node.js applications. Implemented CI/CD pipelines reducing deployment time by 60%. Collaborated with product team to deliver features on schedule.",
    },
  ],
  education: [
    {
      id: "1",
      school: "University of Technology",
      degree: "Bachelor of Science",
      field: "Computer Science",
      year: "2020",
    },
  ],
  certifications: [
    {
      id: "1",
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023",
    },
    {
      id: "2",
      name: "Google Cloud Professional Data Engineer",
      issuer: "Google Cloud",
      date: "2022",
    },
  ],
  languages: [
    {
      id: "1",
      name: "English",
      proficiency: "Fluent",
    },
    {
      id: "2",
      name: "Spanish",
      proficiency: "Advanced",
    },
  ],
  projects: [
    {
      id: "1",
      name: "E-Commerce Platform",
      description:
        "Built a full-stack e-commerce platform with real-time inventory management and payment integration.",
      technologies: "React, Node.js, PostgreSQL, Stripe",
      link: "https://example.com",
    },
    {
      id: "2",
      name: "Analytics Dashboard",
      description: "Developed an interactive analytics dashboard for data visualization and reporting.",
      technologies: "Next.js, TypeScript, Recharts, Tailwind CSS",
      link: "https://example.com",
    },
  ],
  skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Node.js", "PostgreSQL", "AWS", "Docker", "GraphQL"],
}

export default function Home() {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData)
  const [selectedTemplate, setSelectedTemplate] = useState<Template>("modern")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-6">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2 text-balance">
              Resume Builder
            </h1>
            <p className="text-sm sm:text-base text-slate-400">
              Create a professional resume with customizable templates
            </p>
          </div>
          <div className="w-full sm:w-auto">
            <ExportButton data={resumeData} template={selectedTemplate} />
          </div>
        </div>

        {/* Template Selector */}
        <div className="mb-6 sm:mb-8">
          <TemplateSelector selectedTemplate={selectedTemplate} onSelectTemplate={setSelectedTemplate} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {/* Editor */}
          <div className="bg-slate-800 rounded-lg border border-slate-700 p-4 sm:p-6 shadow-xl overflow-y-auto max-h-[calc(100vh-300px)] sm:max-h-[calc(100vh-250px)] md:max-h-[calc(100vh-200px)]">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 sticky top-0 bg-slate-800 py-2">
              Edit Resume
            </h2>
            <ResumeEditor data={resumeData} onChange={setResumeData} />
          </div>

          {/* Preview */}
          <div className="bg-white rounded-lg border border-slate-700 shadow-xl overflow-y-auto max-h-[calc(100vh-300px)] sm:max-h-[calc(100vh-250px)] md:max-h-[calc(100vh-200px)]">
            <div
              id="resume-preview"
              className="mx-auto bg-white"
              style={{
                width: "210mm",
                minHeight: "297mm",
                padding: "20mm",
                boxSizing: "border-box",
              }}
            >
              <ResumePreview data={resumeData} template={selectedTemplate} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
