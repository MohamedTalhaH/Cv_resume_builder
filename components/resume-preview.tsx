"use client"

import type React from "react"

import { ModernTemplate } from "./templates/modern-template"
import { ClassicTemplate } from "./templates/classic-template"
import { MinimalTemplate } from "./templates/minimal-template"
import { CreativeTemplate } from "./templates/creative-template"
import type { ResumeData, Template } from "@/types/resume"

interface ResumePreviewProps {
  data: ResumeData
  template: Template
}

export function ResumePreview({ data, template }: ResumePreviewProps) {
  const templates: Record<Template, React.ComponentType<{ data: ResumeData }>> = {
    modern: ModernTemplate,
    classic: ClassicTemplate,
    minimal: MinimalTemplate,
    creative: CreativeTemplate,
  }

  const SelectedTemplate = templates[template]
  return <SelectedTemplate data={data} />
}
