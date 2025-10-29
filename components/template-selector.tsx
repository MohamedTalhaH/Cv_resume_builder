"use client"
import type { Template } from "@/types/resume"

interface TemplateSelectorProps {
  selectedTemplate: Template
  onSelectTemplate: (template: Template) => void
}

const templates: { id: Template; name: string; description: string }[] = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean and contemporary design with accent colors",
  },
  {
    id: "classic",
    name: "Classic",
    description: "Traditional two-column layout",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and elegant single-column design",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold design with visual hierarchy",
  },
]

export function TemplateSelector({ selectedTemplate, onSelectTemplate }: TemplateSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {templates.map((template) => (
        <button
          key={template.id}
          onClick={() => onSelectTemplate(template.id)}
          className={`p-3 sm:p-4 rounded-lg border-2 transition-all text-left ${
            selectedTemplate === template.id
              ? "border-blue-500 bg-blue-50"
              : "border-slate-300 bg-white hover:border-slate-400"
          }`}
        >
          <h3 className="font-semibold text-slate-900 text-sm sm:text-base">{template.name}</h3>
          <p className="text-xs sm:text-sm text-slate-600">{template.description}</p>
        </button>
      ))}
    </div>
  )
}
