"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { ResumeData, Template } from "@/types/resume"

interface ExportButtonProps {
  data: ResumeData
  template: Template
}

export function ExportButton({ data, template }: ExportButtonProps) {
  const A4_WIDTH_PX = 794
  const A4_HEIGHT_PX = 1123

  const prepareElementForExport = (element: HTMLElement): HTMLElement => {
    const cloned = element.cloneNode(true) as HTMLElement

    cloned.removeAttribute("id")
    cloned.style.position = "absolute"
    cloned.style.left = "-9999px"
    cloned.style.width = `${A4_WIDTH_PX}px`
    cloned.style.minHeight = "auto"
    cloned.style.height = "auto"
    cloned.style.maxHeight = "none"
    cloned.style.overflow = "visible"
    cloned.style.padding = "40px 60px"
    cloned.style.boxSizing = "border-box"
    cloned.style.backgroundColor = "#ffffff"
    cloned.style.fontFamily = "system-ui, -apple-system, sans-serif"
    cloned.style.lineHeight = "1.6"

    const styleOverride = document.createElement("style")
    styleOverride.textContent = `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      h1, h2, h3, h4, h5, h6 {
        color: #0f172a !important;
        font-weight: bold;
        margin: 0 !important;
        padding: 0 !important;
        line-height: 1.3 !important;
      }
      
      h1 { font-size: 2.25rem !important; margin-bottom: 0.5rem !important; }
      h2 { font-size: 1.25rem !important; margin-bottom: 1rem !important; } // Increased margin-bottom for h2 from 0.75rem to 1rem for better separation from border
      h3 { font-size: 1rem !important; margin-bottom: 0.5rem !important; } // Increased h3 margin-bottom for better spacing
      
      p, span, li {
        color: #475569 !important;
        line-height: 1.6 !important;
      }
      
      /* Improved spacing: add margin-bottom to all paragraphs and company/school names */
      p { margin-bottom: 0.5rem !important; }
      
      h2 + div { margin-top: 1rem !important; } // Increased space after h2 headers with borders
      
      h3 + p { margin-bottom: 0.75rem !important; }
      
      .space-y-2 > * + * { margin-top: 0.5rem !important; }
      .space-y-3 > * + * { margin-top: 0.75rem !important; }
      .space-y-4 > * + * { margin-top: 1.5rem !important; } // Increased space-y-4 from 1rem to 1.5rem
      
      /* Additional spacing for border elements */
      [class*="border-b"] { padding-bottom: 0.75rem !important; margin-bottom: 1rem !important; } // Added explicit padding and margin for border-bottom elements
      
      .mb-1 { margin-bottom: 0.25rem !important; }
      .mb-2 { margin-bottom: 0.5rem !important; }
      .mb-3 { margin-bottom: 0.75rem !important; }
      .mb-4 { margin-bottom: 1.25rem !important; } // Increased mb-4 from 1rem to 1.25rem
      .mb-5 { margin-bottom: 1.5rem !important; } // Increased mb-5 from 1.25rem to 1.5rem
      
      .mt-1 { margin-top: 0.25rem !important; }
      .mt-2 { margin-top: 0.5rem !important; }
      .mt-3 { margin-top: 0.75rem !important; }
      .mt-4 { margin-top: 1rem !important; }
      
      .gap-2 { gap: 0.5rem !important; }
      .gap-4 { gap: 1rem !important; }
      
      .bg-blue-600, .bg-blue-700 { background-color: #2563eb !important; color: white !important; }
      .bg-blue-50, .bg-blue-100 { background-color: #eff6ff !important; }
      .bg-slate-50 { background-color: #f8fafc !important; }
      .bg-slate-100 { background-color: #f1f5f9 !important; }
      .bg-white { background-color: #ffffff !important; }
      
      .text-blue-600, .text-blue-700 { color: #2563eb !important; }
      .text-slate-900 { color: #0f172a !important; }
      .text-slate-700 { color: #334155 !important; }
      .text-slate-600 { color: #475569 !important; }
      .text-white { color: white !important; }
      
      .border-b-2, .border-b-4 { border-bottom: 2px solid #2563eb !important; }
      .border-blue-600 { border-color: #2563eb !important; }
      
      .font-bold { font-weight: 700 !important; }
      .font-semibold { font-weight: 600 !important; }
      .font-light { font-weight: 300 !important; }
      .font-medium { font-weight: 500 !important; }
      
      .text-sm { font-size: 0.875rem !important; }
      .text-base { font-size: 1rem !important; }
      .text-lg { font-size: 1.125rem !important; }
      .text-xl { font-size: 1.25rem !important; }
      .text-3xl { font-size: 1.875rem !important; }
      .text-4xl { font-size: 2.25rem !important; }
      
      .leading-tight { line-height: 1.25 !important; }
      .leading-relaxed { line-height: 1.625 !important; }
      
      .uppercase { text-transform: uppercase !important; }
      .tracking-wide { letter-spacing: 0.025em !important; }
      .tracking-widest { letter-spacing: 0.05em !important; }
      
      .flex { display: flex !important; }
      .grid { display: grid !important; }
      .grid-cols-3 { grid-template-columns: repeat(3, 1fr) !important; }
      .col-span-1 { grid-column: span 1 / span 1 !important; }
      .col-span-2 { grid-column: span 2 / span 2 !important; }
      .flex-wrap { flex-wrap: wrap !important; }
      .justify-between { justify-content: space-between !important; }
      .items-baseline { align-items: baseline !important; }
      .items-start { align-items: flex-start !important; }
      
      .p-4, .px-4 { padding: 1rem !important; }
      .p-6 { padding: 1.5rem !important; }
      .py-1 { padding-top: 0.25rem !important; padding-bottom: 0.25rem !important; }
      .rounded-lg { border-radius: 0.5rem !important; }
      .rounded-md { border-radius: 0.375rem !important; }
      
      .opacity-90 { opacity: 0.9 !important; }
      .opacity-95 { opacity: 0.95 !important; }
      
      .whitespace-nowrap { white-space: nowrap !important; }
      .ml-4 { margin-left: 1rem !important; }
      .pb-1 { padding-bottom: 0.25rem !important; }
      .px-3, .py-1.5 { padding: 0.375rem 0.75rem !important; }
    `
    cloned.insertBefore(styleOverride, cloned.firstChild)

    return cloned
  }

  const exportToPNG = async () => {
    try {
      console.log("[v0] Starting PNG export...")
      const html2canvas = (await import("html2canvas")).default

      const element = document.getElementById("resume-preview")
      if (!element) {
        console.error("[v0] Resume preview element not found")
        alert("Error: Could not find resume preview")
        return
      }

      const preparedElement = prepareElementForExport(element)
      document.body.appendChild(preparedElement)

      await new Promise((resolve) => setTimeout(resolve, 300))

      const canvas = await html2canvas(preparedElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        windowWidth: A4_WIDTH_PX,
      })

      document.body.removeChild(preparedElement)

      const link = document.createElement("a")
      link.href = canvas.toDataURL("image/png")
      link.download = `${data.personalInfo.fullName || "resume"}-resume.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      console.log("[v0] PNG exported successfully")
    } catch (error) {
      console.error("[v0] PNG export error:", error)
      alert("Error exporting PNG. Please try again.")
    }
  }

  const exportToJPG = async () => {
    try {
      console.log("[v0] Starting JPG export...")
      const html2canvas = (await import("html2canvas")).default

      const element = document.getElementById("resume-preview")
      if (!element) {
        console.error("[v0] Resume preview element not found")
        alert("Error: Could not find resume preview")
        return
      }

      const preparedElement = prepareElementForExport(element)
      document.body.appendChild(preparedElement)

      await new Promise((resolve) => setTimeout(resolve, 300))

      const canvas = await html2canvas(preparedElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        windowWidth: A4_WIDTH_PX,
      })

      document.body.removeChild(preparedElement)

      const link = document.createElement("a")
      link.href = canvas.toDataURL("image/jpeg", 0.95)
      link.download = `${data.personalInfo.fullName || "resume"}-resume.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      console.log("[v0] JPG exported successfully")
    } catch (error) {
      console.error("[v0] JPG export error:", error)
      alert("Error exporting JPG. Please try again.")
    }
  }

  const exportToPDF = async () => {
    try {
      console.log("[v0] Starting PDF export...")

      const element = document.getElementById("resume-preview")
      if (!element) {
        console.error("[v0] Resume preview element not found")
        alert("Error: Could not find resume preview")
        return
      }

      const printWindow = window.open("", "", "width=800,height=600")
      if (!printWindow) {
        alert("Please allow pop-ups to export PDF")
        return
      }

      const cloned = element.cloneNode(true) as HTMLElement

      const printHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${data.personalInfo.fullName || "Resume"}</title>
  <style>
    @page {
      size: A4;
      margin: 20mm;
    }
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
      background: white;
      color: #475569;
    }
    h1, h2, h3, h4, h5, h6 {
      color: #0f172a !important;
      font-weight: bold;
      margin: 0;
      padding: 0;
    }
    h1 { font-size: 2.25rem; line-height: 1.2; margin-bottom: 0.5rem; }
    h2 { font-size: 1.25rem; line-height: 1.3; margin-bottom: 1rem; } // Increased margin-bottom for h2 from 0.75rem to 1rem for better separation from border
    h3 { font-size: 1rem; line-height: 1.3; margin-bottom: 0.5rem; } // Increased h3 margin-bottom for better spacing
    
    [class*="mb-"] { margin-bottom: 0.75rem; }
    [class*="mb-1"] { margin-bottom: 0.25rem; }
    [class*="mb-2"] { margin-bottom: 0.5rem; }
    [class*="mb-3"] { margin-bottom: 0.75rem; }
    [class*="mb-4"] { margin-bottom: 1.25rem; } // Increased mb-4 from 1rem to 1.25rem
    [class*="mb-5"] { margin-bottom: 1.5rem; } // Increased mb-5 from 1.25rem to 1.5rem
    
    [class*="space-y-"] > * + * { margin-top: 1rem; }
    [class*="space-y-2"] > * + * { margin-top: 0.5rem; }
    [class*="space-y-3"] > * + * { margin-top: 0.75rem; }
    [class*="space-y-4"] > * + * { margin-top: 1.5rem; } // Increased space-y-4 from 1rem to 1.5rem
    
    .bg-blue-600, [class*="bg-blue-6"] { background-color: #2563eb; color: white; }
    .bg-blue-50 { background-color: #eff6ff; }
    .bg-slate-50 { background-color: #f8fafc; }
    .bg-white { background-color: white; }
    
    .text-blue-600, [class*="text-blue-6"] { color: #2563eb; }
    .text-slate-900 { color: #0f172a; }
    .text-slate-700 { color: #334155; }
    .text-slate-600 { color: #475569; }
    .text-white { color: white; }
    
    .border-b-2, .border-b-4 { border-bottom: 2px solid #2563eb; }
    
    .font-bold { font-weight: 700; }
    .font-semibold { font-weight: 600; }
    
    .text-sm { font-size: 0.875rem; }
    .text-base { font-size: 1rem; }
    .text-lg { font-size: 1.125rem; }
    .text-xl { font-size: 1.25rem; }
    
    .flex { display: flex; }
    .flex-wrap { flex-wrap: wrap; }
    .justify-between { justify-content: space-between; }
    .gap-4 { gap: 1rem; }
    .gap-2 { gap: 0.5rem; }
    
    .grid { display: grid; }
    .grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
    .col-span-1 { grid-column: span 1; }
    .col-span-2 { grid-column: span 2; }
    
    .rounded-md { border-radius: 0.375rem; }
    .p-4 { padding: 1rem; }
    .p-6 { padding: 1.5rem; }
  </style>
</head>
<body>
  ${cloned.innerHTML}
</body>
</html>
      `

      printWindow.document.write(printHTML)
      printWindow.document.close()

      await new Promise((resolve) => setTimeout(resolve, 500))
      printWindow.print()

      setTimeout(() => {
        printWindow.close()
      }, 100)

      console.log("[v0] PDF export dialog opened")
    } catch (error) {
      console.error("[v0] PDF export error:", error)
      alert("Error exporting PDF. Please try again.")
    }
  }

  const exportToHTML = () => {
    try {
      const element = document.getElementById("resume-preview")
      if (!element) {
        console.error("[v0] Resume preview element not found")
        alert("Error: Could not find resume preview")
        return
      }

      const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.personalInfo.fullName} - Resume</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
      line-height: 1.6;
      color: #475569;
      background: white;
      padding: 20px;
    }
    .container {
      max-width: 900px;
      margin: 0 auto;
    }
    h1, h2, h3 { color: #0f172a; }
  </style>
</head>
<body>
  <div class="container">
    ${element.innerHTML}
  </div>
</body>
</html>
      `

      const blob = new Blob([htmlContent], { type: "text/html" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${data.personalInfo.fullName || "resume"}-resume.html`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("[v0] HTML export error:", error)
      alert("Error exporting HTML. Please try again.")
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-sm sm:text-base px-4 py-2">Download Resume</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={exportToPNG} className="cursor-pointer">
          <span>Download as PNG</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToJPG} className="cursor-pointer">
          <span>Download as JPG</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToPDF} className="cursor-pointer">
          <span>Download as PDF</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToHTML} className="cursor-pointer">
          <span>Download as HTML</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
