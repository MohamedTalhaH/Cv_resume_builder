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

    cloned.style.position = "absolute"
    cloned.style.left = "-9999px"
    cloned.style.width = `${A4_WIDTH_PX}px`
    cloned.style.minHeight = `${A4_HEIGHT_PX}px`
    cloned.style.height = "auto"
    cloned.style.maxHeight = "none"
    cloned.style.overflow = "visible"
    cloned.style.padding = "60px"
    cloned.style.boxSizing = "border-box"

    const styleOverride = document.createElement("style")
    styleOverride.textContent = `
      * {
        color: #0f172a !important;
        background-color: transparent !important;
        border-color: #e8e8e8 !important;
      }
      .bg-white, [class*="bg-white"] {
        background-color: #ffffff !important;
      }
      .bg-blue-50, [class*="bg-blue-50"] {
        background-color: #eff6ff !important;
      }
      .bg-gray-50, [class*="bg-gray-50"] {
        background-color: #f9fafb !important;
      }
      .text-blue-600, [class*="text-blue-600"] {
        color: #2563eb !important;
      }
      .text-gray-600, [class*="text-gray-600"] {
        color: #4b5563 !important;
      }
      .text-gray-700, [class*="text-gray-700"] {
        color: #374151 !important;
      }
      .text-gray-800, [class*="text-gray-800"] {
        color: #1f2937 !important;
      }
      .text-gray-900, [class*="text-gray-900"] {
        color: #111827 !important;
      }
      .border-blue-600, [class*="border-blue-600"] {
        border-color: #2563eb !important;
      }
      .border-gray-200, [class*="border-gray-200"] {
        border-color: #e5e7eb !important;
      }
      .border-gray-300, [class*="border-gray-300"] {
        border-color: #d1d5db !important;
      }
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

      console.log("[v0] Capturing canvas with A4 dimensions:", A4_WIDTH_PX, "x", A4_HEIGHT_PX)

      const canvas = await html2canvas(preparedElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        width: A4_WIDTH_PX,
        height: preparedElement.scrollHeight,
        windowWidth: A4_WIDTH_PX,
        windowHeight: preparedElement.scrollHeight,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById("resume-preview")
          if (clonedElement) {
            clonedElement.style.color = "#0f172a"
            clonedElement.style.backgroundColor = "#ffffff"
          }
        },
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

      console.log("[v0] Capturing canvas with A4 dimensions:", A4_WIDTH_PX, "x", A4_HEIGHT_PX)

      const canvas = await html2canvas(preparedElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        width: A4_WIDTH_PX,
        height: preparedElement.scrollHeight,
        windowWidth: A4_WIDTH_PX,
        windowHeight: preparedElement.scrollHeight,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById("resume-preview")
          if (clonedElement) {
            clonedElement.style.color = "#0f172a"
            clonedElement.style.backgroundColor = "#ffffff"
          }
        },
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
      const html2canvas = (await import("html2canvas")).default
      const { jsPDF } = await import("jspdf")

      const element = document.getElementById("resume-preview")
      if (!element) {
        console.error("[v0] Resume preview element not found")
        alert("Error: Could not find resume preview")
        return
      }

      const preparedElement = prepareElementForExport(element)
      document.body.appendChild(preparedElement)

      await new Promise((resolve) => setTimeout(resolve, 300))

      console.log("[v0] Capturing canvas with A4 dimensions:", A4_WIDTH_PX, "x", A4_HEIGHT_PX)

      const canvas = await html2canvas(preparedElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        width: A4_WIDTH_PX,
        height: preparedElement.scrollHeight,
        windowWidth: A4_WIDTH_PX,
        windowHeight: preparedElement.scrollHeight,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById("resume-preview")
          if (clonedElement) {
            clonedElement.style.color = "#0f172a"
            clonedElement.style.backgroundColor = "#ffffff"
          }
        },
      })

      document.body.removeChild(preparedElement)

      console.log("[v0] Canvas captured, creating PDF...")

      const imgData = canvas.toDataURL("image/jpeg", 1.0)

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      const pdfWidth = 210 // A4 width in mm
      const pdfHeight = 297 // A4 height in mm
      const imgWidth = canvas.width
      const imgHeight = canvas.height

      // Calculate scaling to fit A4 width
      const ratio = pdfWidth / (imgWidth / 3.7795275591) // Convert px to mm
      const scaledHeight = (imgHeight / 3.7795275591) * ratio

      let heightLeft = scaledHeight
      let position = 0

      pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, scaledHeight)
      heightLeft -= pdfHeight

      while (heightLeft > 0) {
        position = heightLeft - scaledHeight
        pdf.addPage()
        pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, scaledHeight)
        heightLeft -= pdfHeight
      }

      pdf.save(`${data.personalInfo.fullName || "resume"}-resume.pdf`)
      console.log("[v0] PDF exported successfully")
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
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #1e293b;
      background: white;
      padding: 20px;
    }
    .container {
      max-width: 900px;
      margin: 0 auto;
    }
  </style>
</head>
<meta name="google-site-verification" content="pgTOifwkz1mUgxzAL0dXi2Q56VvNFd1K6UP3foQzt4Q" />
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
      console.log("[v0] HTML exported successfully")
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
