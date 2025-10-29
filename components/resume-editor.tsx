"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { ResumeData } from "@/types/resume"

interface ResumeEditorProps {
  data: ResumeData
  onChange: (data: ResumeData) => void
}

export function ResumeEditor({ data, onChange }: ResumeEditorProps) {
  const [activeSection, setActiveSection] = useState<
    "personal" | "experience" | "education" | "certifications" | "languages" | "projects" | "skills"
  >("personal")

  const updatePersonalInfo = (field: string, value: string) => {
    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value },
    })
  }

  const updateExperience = (id: string, field: string, value: string) => {
    onChange({
      ...data,
      experience: data.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    })
  }

  const addExperience = () => {
    onChange({
      ...data,
      experience: [
        ...data.experience,
        {
          id: Date.now().toString(),
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    })
  }

  const removeExperience = (id: string) => {
    onChange({
      ...data,
      experience: data.experience.filter((exp) => exp.id !== id),
    })
  }

  const updateEducation = (id: string, field: string, value: string) => {
    onChange({
      ...data,
      education: data.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    })
  }

  const addEducation = () => {
    onChange({
      ...data,
      education: [
        ...data.education,
        {
          id: Date.now().toString(),
          school: "",
          degree: "",
          field: "",
          year: "",
        },
      ],
    })
  }

  const removeEducation = (id: string) => {
    onChange({
      ...data,
      education: data.education.filter((edu) => edu.id !== id),
    })
  }

  const updateCertifications = (id: string, field: string, value: string) => {
    onChange({
      ...data,
      certifications: data.certifications.map((cert) => (cert.id === id ? { ...cert, [field]: value } : cert)),
    })
  }

  const addCertification = () => {
    onChange({
      ...data,
      certifications: [
        ...data.certifications,
        {
          id: Date.now().toString(),
          name: "",
          issuer: "",
          date: "",
        },
      ],
    })
  }

  const removeCertification = (id: string) => {
    onChange({
      ...data,
      certifications: data.certifications.filter((cert) => cert.id !== id),
    })
  }

  const updateLanguages = (id: string, field: string, value: string) => {
    onChange({
      ...data,
      languages: data.languages.map((lang) => (lang.id === id ? { ...lang, [field]: value } : lang)),
    })
  }

  const addLanguage = () => {
    onChange({
      ...data,
      languages: [
        ...data.languages,
        {
          id: Date.now().toString(),
          name: "",
          proficiency: "Intermediate",
        },
      ],
    })
  }

  const removeLanguage = (id: string) => {
    onChange({
      ...data,
      languages: data.languages.filter((lang) => lang.id !== id),
    })
  }

  const updateProjects = (id: string, field: string, value: string) => {
    onChange({
      ...data,
      projects: data.projects.map((proj) => (proj.id === id ? { ...proj, [field]: value } : proj)),
    })
  }

  const addProject = () => {
    onChange({
      ...data,
      projects: [
        ...data.projects,
        {
          id: Date.now().toString(),
          name: "",
          description: "",
          technologies: "",
          link: "",
        },
      ],
    })
  }

  const removeProject = (id: string) => {
    onChange({
      ...data,
      projects: data.projects.filter((proj) => proj.id !== id),
    })
  }

  const updateSkills = (skills: string) => {
    onChange({
      ...data,
      skills: skills.split(",").map((s) => s.trim()),
    })
  }

  return (
    <div className="space-y-6">
      {/* Section Tabs */}
      <div className="flex gap-1 sm:gap-2 border-b border-slate-700 overflow-x-auto -mx-4 sm:-mx-6 px-4 sm:px-6">
        {(["personal", "experience", "education", "certifications", "languages", "projects", "skills"] as const).map(
          (section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`px-2 sm:px-4 py-2 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap ${
                activeSection === section
                  ? "text-blue-400 border-b-2 border-blue-400"
                  : "text-slate-400 hover:text-slate-300"
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ),
        )}
      </div>

      {/* Personal Info Section */}
      {activeSection === "personal" && (
        <div className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1 sm:mb-2">Full Name</label>
            <Input
              value={data.personalInfo.fullName}
              onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
              className="bg-slate-700 border-slate-600 text-white text-sm"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1 sm:mb-2">
              Professional Title
            </label>
            <Input
              value={data.personalInfo.title || ""}
              onChange={(e) => updatePersonalInfo("title", e.target.value)}
              className="bg-slate-700 border-slate-600 text-white text-sm"
              placeholder="Senior Software Engineer"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1 sm:mb-2">Email</label>
            <Input
              value={data.personalInfo.email}
              onChange={(e) => updatePersonalInfo("email", e.target.value)}
              className="bg-slate-700 border-slate-600 text-white text-sm"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1 sm:mb-2">Phone</label>
            <Input
              value={data.personalInfo.phone}
              onChange={(e) => updatePersonalInfo("phone", e.target.value)}
              className="bg-slate-700 border-slate-600 text-white text-sm"
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1 sm:mb-2">Location</label>
            <Input
              value={data.personalInfo.location}
              onChange={(e) => updatePersonalInfo("location", e.target.value)}
              className="bg-slate-700 border-slate-600 text-white text-sm"
              placeholder="San Francisco, CA"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1 sm:mb-2">
              Professional Summary
            </label>
            <Textarea
              value={data.personalInfo.summary}
              onChange={(e) => updatePersonalInfo("summary", e.target.value)}
              className="bg-slate-700 border-slate-600 text-white text-sm"
              placeholder="Brief professional summary..."
              rows={4}
            />
          </div>
        </div>
      )}

      {/* Experience Section */}
      {activeSection === "experience" && (
        <div className="space-y-3 sm:space-y-4">
          {data.experience.map((exp) => (
            <div key={exp.id} className="p-3 sm:p-4 bg-slate-700 rounded-lg space-y-2 sm:space-y-3">
              <div className="flex justify-between items-start gap-2">
                <h3 className="font-medium text-white text-sm sm:text-base">{exp.position || "New Experience"}</h3>
                <button
                  onClick={() => removeExperience(exp.id)}
                  className="text-red-400 hover:text-red-300 text-xs sm:text-sm whitespace-nowrap"
                >
                  Remove
                </button>
              </div>
              <Input
                value={exp.company}
                onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                className="bg-slate-600 border-slate-500 text-white text-sm"
                placeholder="Company Name"
              />
              <Input
                value={exp.position}
                onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                className="bg-slate-600 border-slate-500 text-white text-sm"
                placeholder="Job Title"
              />
              <div className="grid grid-cols-2 gap-2">
                <Input
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                  className="bg-slate-600 border-slate-500 text-white text-sm"
                  placeholder="Start Date"
                />
                <Input
                  value={exp.endDate}
                  onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                  className="bg-slate-600 border-slate-500 text-white text-sm"
                  placeholder="End Date"
                />
              </div>
              <Textarea
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                className="bg-slate-600 border-slate-500 text-white text-sm"
                placeholder="Job description..."
                rows={3}
              />
            </div>
          ))}
          <Button onClick={addExperience} className="w-full bg-blue-600 hover:bg-blue-700 text-sm">
            Add Experience
          </Button>
        </div>
      )}

      {/* Education Section */}
      {activeSection === "education" && (
        <div className="space-y-3 sm:space-y-4">
          {data.education.map((edu) => (
            <div key={edu.id} className="p-3 sm:p-4 bg-slate-700 rounded-lg space-y-2 sm:space-y-3">
              <div className="flex justify-between items-start gap-2">
                <h3 className="font-medium text-white text-sm sm:text-base">{edu.school || "New Education"}</h3>
                <button
                  onClick={() => removeEducation(edu.id)}
                  className="text-red-400 hover:text-red-300 text-xs sm:text-sm whitespace-nowrap"
                >
                  Remove
                </button>
              </div>
              <Input
                value={edu.school}
                onChange={(e) => updateEducation(edu.id, "school", e.target.value)}
                className="bg-slate-600 border-slate-500 text-white text-sm"
                placeholder="School/University"
              />
              <Input
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                className="bg-slate-600 border-slate-500 text-white text-sm"
                placeholder="Degree"
              />
              <Input
                value={edu.field}
                onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                className="bg-slate-600 border-slate-500 text-white text-sm"
                placeholder="Field of Study"
              />
              <Input
                value={edu.year}
                onChange={(e) => updateEducation(edu.id, "year", e.target.value)}
                className="bg-slate-600 border-slate-500 text-white text-sm"
                placeholder="Graduation Year"
              />
            </div>
          ))}
          <Button onClick={addEducation} className="w-full bg-blue-600 hover:bg-blue-700 text-sm">
            Add Education
          </Button>
        </div>
      )}

      {/* Certifications Section */}
      {activeSection === "certifications" && (
        <div className="space-y-3 sm:space-y-4">
          {data.certifications.map((cert) => (
            <div key={cert.id} className="p-3 sm:p-4 bg-slate-700 rounded-lg space-y-2 sm:space-y-3">
              <div className="flex justify-between items-start gap-2">
                <h3 className="font-medium text-white text-sm sm:text-base">{cert.name || "New Certification"}</h3>
                <button
                  onClick={() => removeCertification(cert.id)}
                  className="text-red-400 hover:text-red-300 text-xs sm:text-sm whitespace-nowrap"
                >
                  Remove
                </button>
              </div>
              <Input
                value={cert.name}
                onChange={(e) => updateCertifications(cert.id, "name", e.target.value)}
                className="bg-slate-600 border-slate-500 text-white text-sm"
                placeholder="Certification Name"
              />
              <Input
                value={cert.issuer}
                onChange={(e) => updateCertifications(cert.id, "issuer", e.target.value)}
                className="bg-slate-600 border-slate-500 text-white text-sm"
                placeholder="Issuing Organization"
              />
              <Input
                value={cert.date}
                onChange={(e) => updateCertifications(cert.id, "date", e.target.value)}
                className="bg-slate-600 border-slate-500 text-white text-sm"
                placeholder="Date Obtained"
              />
            </div>
          ))}
          <Button onClick={addCertification} className="w-full bg-blue-600 hover:bg-blue-700 text-sm">
            Add Certification
          </Button>
        </div>
      )}

      {/* Languages Section */}
      {activeSection === "languages" && (
        <div className="space-y-3 sm:space-y-4">
          {data.languages.map((lang) => (
            <div key={lang.id} className="p-3 sm:p-4 bg-slate-700 rounded-lg space-y-2 sm:space-y-3">
              <div className="flex justify-between items-start gap-2">
                <h3 className="font-medium text-white text-sm sm:text-base">{lang.name || "New Language"}</h3>
                <button
                  onClick={() => removeLanguage(lang.id)}
                  className="text-red-400 hover:text-red-300 text-xs sm:text-sm whitespace-nowrap"
                >
                  Remove
                </button>
              </div>
              <Input
                value={lang.name}
                onChange={(e) => updateLanguages(lang.id, "name", e.target.value)}
                className="bg-slate-600 border-slate-500 text-white text-sm"
                placeholder="Language Name"
              />
              <select
                value={lang.proficiency}
                onChange={(e) => updateLanguages(lang.id, "proficiency", e.target.value)}
                className="w-full bg-slate-600 border border-slate-500 text-white rounded px-3 py-2 text-sm"
              >
                <option>Basic</option>
                <option>Intermediate</option>
                <option>Advanced</option>
                <option>Fluent</option>
              </select>
            </div>
          ))}
          <Button onClick={addLanguage} className="w-full bg-blue-600 hover:bg-blue-700 text-sm">
            Add Language
          </Button>
        </div>
      )}

      {/* Projects Section */}
      {activeSection === "projects" && (
        <div className="space-y-3 sm:space-y-4">
          {data.projects.map((proj) => (
            <div key={proj.id} className="p-3 sm:p-4 bg-slate-700 rounded-lg space-y-2 sm:space-y-3">
              <div className="flex justify-between items-start gap-2">
                <h3 className="font-medium text-white text-sm sm:text-base">{proj.name || "New Project"}</h3>
                <button
                  onClick={() => removeProject(proj.id)}
                  className="text-red-400 hover:text-red-300 text-xs sm:text-sm whitespace-nowrap"
                >
                  Remove
                </button>
              </div>
              <Input
                value={proj.name}
                onChange={(e) => updateProjects(proj.id, "name", e.target.value)}
                className="bg-slate-600 border-slate-500 text-white text-sm"
                placeholder="Project Name"
              />
              <Textarea
                value={proj.description}
                onChange={(e) => updateProjects(proj.id, "description", e.target.value)}
                className="bg-slate-600 border-slate-500 text-white text-sm"
                placeholder="Project description..."
                rows={2}
              />
              <Input
                value={proj.technologies}
                onChange={(e) => updateProjects(proj.id, "technologies", e.target.value)}
                className="bg-slate-600 border-slate-500 text-white text-sm"
                placeholder="Technologies used (comma-separated)"
              />
              <Input
                value={proj.link || ""}
                onChange={(e) => updateProjects(proj.id, "link", e.target.value)}
                className="bg-slate-600 border-slate-500 text-white text-sm"
                placeholder="Project Link (optional)"
              />
            </div>
          ))}
          <Button onClick={addProject} className="w-full bg-blue-600 hover:bg-blue-700 text-sm">
            Add Project
          </Button>
        </div>
      )}

      {/* Skills Section */}
      {activeSection === "skills" && (
        <div className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1 sm:mb-2">
              Skills (comma-separated)
            </label>
            <Textarea
              value={data.skills.join(", ")}
              onChange={(e) => updateSkills(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white text-sm"
              placeholder="React, TypeScript, Node.js..."
              rows={6}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span key={skill} className="px-2 sm:px-3 py-1 bg-blue-600 text-white rounded-full text-xs sm:text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
