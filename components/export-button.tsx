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
    cloned.style.minHeight = `${A4_HEIGHT_PX}px`
    cloned.style.height = "auto"
    cloned.style.maxHeight = "none"
    cloned.style.overflow = "visible"
    cloned.style.padding = "60px"
    cloned.style.boxSizing = "border-box"
    cloned.style.backgroundColor = "#ffffff"

    const styleOverride = document.createElement("style")
    styleOverride.textContent = `
      :root, * {
        --background: 255 255 255 !important;
        --foreground: 15 23 42 !important;
        --primary: 37 99 235 !important;
        --primary-foreground: 255 255 255 !important;
        --secondary: 241 245 249 !important;
        --secondary-foreground: 15 23 42 !important;
        --muted: 241 245 249 !important;
        --muted-foreground: 100 116 139 !important;
        --accent: 241 245 249 !important;
        --accent-foreground: 15 23 42 !important;
        --destructive: 239 68 68 !important;
        --destructive-foreground: 255 255 255 !important;
        --border: 226 232 240 !important;
        --input: 226 232 240 !important;
        --ring: 37 99 235 !important;
        --radius: 0.5rem !important;
      }
      * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      .bg-blue-600 {
        background-color: rgb(37, 99, 235) !important;
      }
      .bg-blue-50 {
        background-color: rgb(239, 246, 255) !important;
      }
      .text-blue-600 {
        color: rgb(37, 99, 235) !important;
      }
      .border-blue-600 {
        border-color: rgb(37, 99, 235) !important;
      }
      .border-blue-300 {
        border-color: rgb(147, 197, 253) !important;
      }
      .bg-blue-100 {
        background-color: rgb(219, 234, 254) !important;
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

      await new Promise((resolve) => setTimeout(resolve, 500))

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
        ignoreElements: (element) => {
          return false
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

      const pdfWidth = 210
      const pdfHeight = 297
      const imgWidth = canvas.width
      const imgHeight = canvas.height

      const ratio = pdfWidth / (imgWidth / 3.7795275591)
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
