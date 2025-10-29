import type { ResumeData } from "@/types/resume"

export function CreativeTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="max-w-4xl mx-auto font-sans bg-white">
      {/* Header with accent */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-lg mb-8">
        <h1 className="text-5xl font-bold mb-2">{data.personalInfo.fullName}</h1>
        {data.personalInfo.title && <p className="text-xl font-light mb-3 opacity-95">{data.personalInfo.title}</p>}
        <div className="flex flex-wrap gap-4 text-sm opacity-90">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>•</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>•</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="mb-8 p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
          <p className="text-slate-700 leading-relaxed">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <span className="w-1 h-8 bg-blue-600 rounded"></span>
            Professional Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id} className="border-l-2 border-blue-300 pl-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-slate-900 text-lg">{exp.position}</h3>
                  <span className="text-sm text-slate-600 bg-blue-100 px-3 py-1 rounded">
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
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <span className="w-1 h-8 bg-blue-600 rounded"></span>
            Education
          </h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="border-l-2 border-blue-300 pl-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                  <span className="text-sm text-slate-600 bg-blue-100 px-3 py-1 rounded">{edu.year}</span>
                </div>
                <p className="text-blue-600 font-semibold">{edu.school}</p>
                {edu.field && <p className="text-slate-700 text-sm">{edu.field}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <span className="w-1 h-8 bg-blue-600 rounded"></span>
            Projects
          </h2>
          <div className="space-y-4">
            {data.projects.map((proj) => (
              <div key={proj.id} className="border-l-2 border-blue-300 pl-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-slate-900 text-lg">{proj.name}</h3>
                  {proj.link && (
                    <a href={proj.link} className="text-blue-600 hover:underline text-sm">
                      View
                    </a>
                  )}
                </div>
                <p className="text-slate-700 mb-2">{proj.description}</p>
                {proj.technologies && (
                  <p className="text-sm text-slate-600">
                    <span className="font-semibold">Tech:</span> {proj.technologies}
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
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <span className="w-1 h-8 bg-blue-600 rounded"></span>
            Certifications
          </h2>
          <div className="space-y-3">
            {data.certifications.map((cert) => (
              <div key={cert.id} className="border-l-2 border-blue-300 pl-4">
                <h3 className="font-bold text-slate-900">{cert.name}</h3>
                <p className="text-slate-600 text-sm">
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
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <span className="w-1 h-8 bg-blue-600 rounded"></span>
            Languages
          </h2>
          <div className="space-y-2">
            {data.languages.map((lang) => (
              <div key={lang.id} className="flex justify-between">
                <span className="text-slate-900 font-medium">{lang.name}</span>
                <span className="text-slate-600 text-sm">{lang.proficiency}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <span className="w-1 h-8 bg-blue-600 rounded"></span>
            Skills
          </h2>
          <div className="flex flex-wrap gap-3">
            {data.skills.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-medium text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
