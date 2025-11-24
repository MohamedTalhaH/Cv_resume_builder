import type { ResumeData } from "@/types/resume"

export function ModernTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="w-full font-sans bg-white">
      <div className="border-b-4 border-blue-600 pb-4 mb-5">
        <h1 className="text-4xl font-bold text-slate-900 mb-1 leading-tight tracking-tight">
          {data.personalInfo.fullName}
        </h1>
        {data.personalInfo.title && (
          <p className="text-lg text-blue-600 font-semibold mb-3">{data.personalInfo.title}</p>
        )}
        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>•</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>•</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
        </div>
      </div>

      {data.personalInfo.summary && (
        <div className="mb-5">
          <p className="text-slate-700 text-sm leading-relaxed">{data.personalInfo.summary}</p>
        </div>
      )}

      {data.experience.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xl font-bold text-slate-900 mb-3 pb-1 border-b-2 border-blue-600 uppercase tracking-wide">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-slate-900 text-base">{exp.position}</h3>
                  <span className="text-sm text-slate-600 whitespace-nowrap ml-4">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <p className="text-blue-600 font-semibold text-sm mb-2">{exp.company}</p>
                <p className="text-slate-700 text-sm leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.education.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xl font-bold text-slate-900 mb-3 pb-1 border-b-2 border-blue-600 uppercase tracking-wide">
            Education
          </h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-slate-900 text-base">{edu.degree}</h3>
                  <span className="text-sm text-slate-600 whitespace-nowrap ml-4">{edu.year}</span>
                </div>
                <p className="text-blue-600 font-semibold text-sm">{edu.school}</p>
                {edu.field && <p className="text-slate-700 text-sm">{edu.field}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.projects.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xl font-bold text-slate-900 mb-3 pb-1 border-b-2 border-blue-600 uppercase tracking-wide">
            Projects
          </h2>
          <div className="space-y-3">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-slate-900 text-base">{proj.name}</h3>
                  {proj.link && (
                    <a href={proj.link} className="text-blue-600 hover:underline text-sm whitespace-nowrap ml-4">
                      View Project
                    </a>
                  )}
                </div>
                <p className="text-slate-700 text-sm mb-2 leading-relaxed">{proj.description}</p>
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

      {data.certifications.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xl font-bold text-slate-900 mb-3 pb-1 border-b-2 border-blue-600 uppercase tracking-wide">
            Certifications
          </h2>
          <div className="space-y-2">
            {data.certifications.map((cert) => (
              <div key={cert.id}>
                <h3 className="font-bold text-slate-900 text-base">{cert.name}</h3>
                <p className="text-slate-600 text-sm">
                  {cert.issuer} • {cert.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.languages.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xl font-bold text-slate-900 mb-3 pb-1 border-b-2 border-blue-600 uppercase tracking-wide">
            Languages
          </h2>
          <div className="space-y-2">
            {data.languages.map((lang) => (
              <div key={lang.id} className="flex justify-between">
                <span className="text-slate-900 font-medium text-sm">{lang.name}</span>
                <span className="text-slate-600 text-sm">{lang.proficiency}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.skills.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-3 pb-1 border-b-2 border-blue-600 uppercase tracking-wide">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span key={skill} className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-md text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
