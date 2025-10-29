import type { ResumeData } from "@/types/resume"

export function ClassicTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="max-w-4xl mx-auto font-sans grid grid-cols-3 gap-6 bg-white">
      {/* Left Column */}
      <div className="col-span-1 bg-slate-100 p-6 rounded-lg">
        {/* Contact Info */}
        <div className="mb-6">
          <h3 className="text-xs font-bold text-slate-900 mb-3 uppercase tracking-wide">Contact</h3>
          <div className="space-y-2 text-xs text-slate-700">
            {data.personalInfo.email && <p>{data.personalInfo.email}</p>}
            {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
            {data.personalInfo.location && <p>{data.personalInfo.location}</p>}
          </div>
        </div>

        {/* Languages */}
        {data.languages.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs font-bold text-slate-900 mb-3 uppercase tracking-wide">Languages</h3>
            <div className="space-y-2">
              {data.languages.map((lang) => (
                <div key={lang.id} className="text-xs text-slate-700">
                  <p className="font-medium">{lang.name}</p>
                  <p className="text-slate-600">{lang.proficiency}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs font-bold text-slate-900 mb-3 uppercase tracking-wide">Skills</h3>
            <div className="space-y-2">
              {data.skills.map((skill) => (
                <div key={skill} className="text-xs text-slate-700">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {data.certifications.length > 0 && (
          <div>
            <h3 className="text-xs font-bold text-slate-900 mb-3 uppercase tracking-wide">Certifications</h3>
            <div className="space-y-2">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="text-xs text-slate-700">
                  <p className="font-medium">{cert.name}</p>
                  <p className="text-slate-600 text-xs">{cert.issuer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Column */}
      <div className="col-span-2">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-slate-900">{data.personalInfo.fullName}</h1>
          {data.personalInfo.title && <p className="text-lg text-blue-600 font-semibold">{data.personalInfo.title}</p>}
          {data.personalInfo.summary && <p className="text-slate-700 text-sm mt-2">{data.personalInfo.summary}</p>}
        </div>

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide">Experience</h2>
            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-slate-900">{exp.position}</h3>
                    <span className="text-xs text-slate-600">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <p className="text-blue-600 text-sm font-medium mb-1">{exp.company}</p>
                  <p className="text-slate-700 text-xs leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide">Education</h2>
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                    <span className="text-xs text-slate-600">{edu.year}</span>
                  </div>
                  <p className="text-blue-600 text-sm font-medium">{edu.school}</p>
                  {edu.field && <p className="text-slate-700 text-xs">{edu.field}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide">Projects</h2>
            <div className="space-y-3">
              {data.projects.map((proj) => (
                <div key={proj.id}>
                  <h3 className="font-bold text-slate-900">{proj.name}</h3>
                  <p className="text-slate-700 text-xs">{proj.description}</p>
                  {proj.technologies && (
                    <p className="text-slate-600 text-xs mt-1">
                      <span className="font-semibold">Tech:</span> {proj.technologies}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
