import type { ResumeData } from "@/types/resume"

export function MinimalTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="max-w-3xl mx-auto font-sans bg-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-light text-slate-900 mb-1">{data.personalInfo.fullName}</h1>
        {data.personalInfo.title && <p className="text-lg text-slate-600 font-light mb-2">{data.personalInfo.title}</p>}
        <div className="flex flex-wrap gap-3 text-xs text-slate-600">
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
          <p className="text-slate-700 text-sm leading-relaxed">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs font-semibold text-slate-900 mb-4 uppercase tracking-widest">Experience</h2>
          <div className="space-y-5">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold text-slate-900 text-sm">{exp.position}</h3>
                  <span className="text-xs text-slate-600">
                    {exp.startDate} – {exp.endDate}
                  </span>
                </div>
                <p className="text-slate-600 text-xs font-medium mb-2">{exp.company}</p>
                <p className="text-slate-700 text-xs leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs font-semibold text-slate-900 mb-4 uppercase tracking-widest">Education</h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold text-slate-900 text-sm">{edu.degree}</h3>
                  <span className="text-xs text-slate-600">{edu.year}</span>
                </div>
                <p className="text-slate-600 text-xs font-medium">{edu.school}</p>
                {edu.field && <p className="text-slate-700 text-xs">{edu.field}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs font-semibold text-slate-900 mb-4 uppercase tracking-widest">Projects</h2>
          <div className="space-y-4">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <h3 className="font-semibold text-slate-900 text-sm">{proj.name}</h3>
                <p className="text-slate-700 text-xs leading-relaxed">{proj.description}</p>
                {proj.technologies && <p className="text-slate-600 text-xs mt-1">{proj.technologies}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs font-semibold text-slate-900 mb-4 uppercase tracking-widest">Certifications</h2>
          <div className="space-y-2">
            {data.certifications.map((cert) => (
              <div key={cert.id}>
                <p className="font-semibold text-slate-900 text-sm">{cert.name}</p>
                <p className="text-slate-600 text-xs">
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
          <h2 className="text-xs font-semibold text-slate-900 mb-4 uppercase tracking-widest">Languages</h2>
          <div className="space-y-2">
            {data.languages.map((lang) => (
              <div key={lang.id} className="flex justify-between text-xs">
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
          <h2 className="text-xs font-semibold text-slate-900 mb-4 uppercase tracking-widest">Skills</h2>
          <p className="text-slate-700 text-xs leading-relaxed">{data.skills.join(" • ")}</p>
        </div>
      )}
    </div>
  )
}
