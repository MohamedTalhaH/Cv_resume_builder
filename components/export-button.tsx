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

    // Remove all Tailwind classes and convert to inline styles
    const styleOverride = document.createElement("style")
    styleOverride.textContent = `
      * {
        margin: revert;
        padding: revert;
        box-sizing: border-box;
        border-color: #e2e8f0;
        color: #0f172a;
        background-color: transparent;
      }
      .bg-blue-600, [class*="bg-blue-6"] {
        background-color: #2563eb !important;
      }
      .bg-blue-50, [class*="bg-blue-5"] {
        background-color: #eff6ff !important;
      }
      .bg-blue-100, [class*="bg-blue-1"] {
        background-color: #dbeafe !important;
      }
      .text-blue-600, [class*="text-blue-6"] {
        color: #2563eb !important;
      }
      .border-blue-600, [class*="border-blue-6"] {
        border-color: #2563eb !important;
      }
      .border-blue-300, [class*="border-blue-3"] {
        border-color: #93c5fd !important;
      }
      .text-gray-600, [class*="text-gray-6"] {
        color: #475569 !important;
      }
      .text-gray-700, [class*="text-gray-7"] {
        color: #334155 !important;
      }
      .bg-gray-50, [class*="bg-gray-5"] {
        background-color: #f8fafc !important;
      }
      .bg-gray-100, [class*="bg-gray-1"] {
        background-color: #f1f5f9 !important;
      }
      .border-gray-300, [class*="border-gray-3"] {
        border-color: #cbd5e1 !important;
      }
      .bg-white {
        background-color: #ffffff !important;
      }
      h1, h2, h3, h4, h5, h6 {
        color: #0f172a !important;
        font-weight: bold;
      }
      p, span, div, li {
        color: #475569 !important;
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
          const clonedElement = clonedDoc.body.querySelector('[style*="position: absolute"]')
          if (clonedElement) {
            // Force all elements to use standard hex colors
            const allElements = clonedElement.querySelectorAll("*")
            allElements.forEach((el: Element) => {
              if (el instanceof HTMLElement) {
                const computedStyle = window.getComputedStyle(el)
                if (computedStyle.color && computedStyle.color !== "rgba(0, 0, 0, 0)") {
                  el.style.color = "#475569"
                }
                if (computedStyle.backgroundColor && computedStyle.backgroundColor !== "rgba(0, 0, 0, 0)") {
                  if (computedStyle.backgroundColor.includes("255, 255, 255")) {
                    el.style.backgroundColor = "#ffffff"
                  }
                }
              }
            })
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
          const clonedElement = clonedDoc.body.querySelector('[style*="position: absolute"]')
          if (clonedElement) {
            const allElements = clonedElement.querySelectorAll("*")
            allElements.forEach((el: Element) => {
              if (el instanceof HTMLElement) {
                const computedStyle = window.getComputedStyle(el)
                if (computedStyle.color && computedStyle.color !== "rgba(0, 0, 0, 0)") {
                  el.style.color = "#475569"
                }
                if (computedStyle.backgroundColor && computedStyle.backgroundColor !== "rgba(0, 0, 0, 0)") {
                  if (computedStyle.backgroundColor.includes("255, 255, 255")) {
                    el.style.backgroundColor = "#ffffff"
                  }
                }
              }
            })
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

      const element = document.getElementById("resume-preview")
      if (!element) {
        console.error("[v0] Resume preview element not found")
        alert("Error: Could not find resume preview")
        return
      }

      // Create a new window for printing
      const printWindow = window.open("", "", "width=800,height=600")
      if (!printWindow) {
        alert("Please allow pop-ups to export PDF")
        return
      }

      // Clone the element
      const cloned = element.cloneNode(true) as HTMLElement

      // Create print-friendly HTML
      const printHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${data.personalInfo.fullName || "Resume"}</title>
  <style>
    @page {
      size: A4;
      margin: 0;
    }
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: white;
      width: 210mm;
      padding: 20mm;
    }
    .bg-blue-600, [class*="bg-blue-6"] {
      background-color: #2563eb !important;
    }
    .bg-blue-50, [class*="bg-blue-5"] {
      background-color: #eff6ff !important;
    }
    .bg-blue-100, [class*="bg-blue-1"] {
      background-color: #dbeafe !important;
    }
    .text-blue-600, [class*="text-blue-6"] {
      color: #2563eb !important;
    }
    .border-blue-600, [class*="border-blue-6"] {
      border-color: #2563eb !important;
    }
    .text-gray-600, [class*="text-gray-6"] {
      color: #475569 !important;
    }
    .text-gray-700, [class*="text-gray-7"] {
      color: #334155 !important;
    }
    .bg-white {
      background-color: #ffffff !important;
    }
    h1, h2, h3, h4, h5, h6 {
      color: #0f172a !important;
      font-weight: bold;
    }
    p, span, div, li {
      color: #475569 !important;
    }
  </style>
</head>
<body>
  ${cloned.innerHTML}
</body>
</html>
      `

      printWindow.document.write(printHTML)
      printWindow.document.close()

      // Wait for content to load
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Trigger print dialog
      printWindow.print()

      // Close window after print
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
