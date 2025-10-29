import type { ResumeData } from "@/types/resume"

export function ModernTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="w-full font-sans bg-white">
      {/* Header */}
      <div className="border-b-4 border-blue-600 pb-6 mb-8">
        <h1 className="text-5xl font-bold text-slate-900 mb-1">{data.personalInfo.fullName}</h1>
        {data.personalInfo.title && (
          <p className="text-xl text-blue-600 font-semibold mb-3">{data.personalInfo.title}</p>
        )}
        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>•</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>•</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="mb-8">
          <p className="text-slate-700 leading-relaxed text-justify">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-blue-600">
            PROFESSIONAL EXPERIENCE
          </h2>
          <div className="space-y-5">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-slate-900 text-lg">{exp.position}</h3>
                  <span className="text-sm text-slate-600 bg-blue-50 px-3 py-1 rounded">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <p className="text-blue-600 font-semibold mb-2">{exp.company}</p>
                <p className="text-slate-700 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-blue-600">EDUCATION</h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-slate-900 text-lg">{edu.degree}</h3>
                  <span className="text-sm text-slate-600 bg-blue-50 px-3 py-1 rounded">{edu.year}</span>
                </div>
                <p className="text-blue-600 font-semibold">{edu.school}</p>
                {edu.field && <p className="text-slate-700">{edu.field}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-blue-600">PROJECTS</h2>
          <div className="space-y-4">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-slate-900 text-lg">{proj.name}</h3>
                  {proj.link && (
                    <a href={proj.link} className="text-blue-600 hover:underline text-sm">
                      View Project
                    </a>
                  )}
                </div>
                <p className="text-slate-700 mb-2">{proj.description}</p>
                {proj.technologies && (
                  <p className="text-sm text-slate-600">
                    <span className="font-semibold">Technologies:</span> {proj.technologies}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-blue-600">CERTIFICATIONS</h2>
          <div className="space-y-3">
            {data.certifications.map((cert) => (
              <div key={cert.id}>
                <h3 className="font-bold text-slate-900">{cert.name}</h3>
                <p className="text-slate-600">
                  {cert.issuer} • {cert.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {data.languages.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-blue-600">LANGUAGES</h2>
          <div className="space-y-2">
            {data.languages.map((lang) => (
              <div key={lang.id} className="flex justify-between">
                <span className="text-slate-900 font-medium">{lang.name}</span>
                <span className="text-slate-600">{lang.proficiency}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-blue-600">SKILLS</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
