import { Download, Briefcase, GraduationCap, Wrench, Mail, Phone } from "lucide-react";
import resume from "../data/resume.json";
import { useLanguage } from "../i18n/context";

function Resume() {
    const { lang, t } = useLanguage();
    const data = resume[lang];

    return (
        <section id="resume" className="section py-20 bg-checkered">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center neon-text-dark-blue">
                    {t.resume.title}
                </h2>
                <p className="text-sm md:text-base text-center max-w-xl mx-auto mb-10 text-muted leading-relaxed font-semibold">
                    {t.resume.intro}
                </p>

                <div className="max-w-4xl mx-auto neon-border-blue rounded-2xl surface backdrop-blur p-6 sm:p-10">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-6 border-b divider">
                        <div>
                            <h3 className="text-2xl sm:text-3xl font-bold neon-text-pink">{resume.name}</h3>
                            <p className="text-accent font-bold mt-1">{data.title}</p>
                            <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3 text-xs sm:text-sm text-body font-semibold">
                                <a href={`mailto:${resume.contacts.email}`} className="flex items-center gap-1.5 hover:underline">
                                    <Mail className="w-4 h-4" /> {resume.contacts.email}
                                </a>
                                <span className="flex items-center gap-1.5">
                                    <Phone className="w-4 h-4" /> {resume.contacts.phone}
                                </span>
                            </div>
                        </div>

                        <a
                            href={`/${data.pdf}`}
                            download={data.pdf}
                            className="btn-surface inline-flex items-center justify-center gap-2 px-6 py-3 neon-border-pink rounded-lg neon-btn font-bold text-sm shrink-0"
                        >
                            <Download className="w-4 h-4" />
                            {t.resume.download}
                        </a>
                    </div>

                    <p className="text-body text-sm leading-relaxed py-6 border-b divider">
                        {data.summary}
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 pt-6">
                        <div>
                            <h4 className="flex items-center gap-2 text-sm uppercase tracking-wider font-bold neon-text-blue mb-4">
                                <Briefcase className="w-4 h-4" /> {t.resume.experience}
                            </h4>
                            <ul className="space-y-5">
                                {data.experience.map((job) => (
                                    <li key={job.role} className="border-l-2 border-sky-400/40 pl-4">
                                        <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                                            <h5 className="font-bold text-strong text-sm">{job.role}</h5>
                                            <span className="text-xs text-pink-500 font-bold">{job.period}</span>
                                        </div>
                                        <p className="text-xs text-muted font-semibold mt-0.5">{job.company}</p>
                                        <ul className="mt-2 space-y-1.5 list-disc list-outside pl-4 marker:text-sky-400">
                                            {job.bullets.map((b) => (
                                                <li key={b} className="text-xs sm:text-sm text-body leading-relaxed">{b}</li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <h4 className="flex items-center gap-2 text-sm uppercase tracking-wider font-bold neon-text-pink mb-4">
                                    <GraduationCap className="w-4 h-4" /> {t.resume.education}
                                </h4>
                                {data.education.map((e) => (
                                    <div key={e.course} className="border-l-2 border-pink-400/40 pl-4">
                                        <h5 className="font-bold text-strong text-sm">{e.course}</h5>
                                        <p className="text-xs sm:text-sm text-body">{e.institution}</p>
                                        <p className="text-xs text-pink-500 font-bold mt-0.5">{e.period}</p>
                                    </div>
                                ))}
                            </div>

                            <div>
                                <h4 className="flex items-center gap-2 text-sm uppercase tracking-wider font-bold neon-text-purple mb-4">
                                    <Wrench className="w-4 h-4" /> {t.resume.skills}
                                </h4>
                                <div className="space-y-3">
                                    {data.skills.map((g) => (
                                        <div key={g.group}>
                                            <p className="text-xs text-muted font-bold mb-1.5">{g.group}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {g.items.map((s) => (
                                                    <span key={s} className="chip px-2.5 py-1 text-xs font-semibold rounded-full">
                                                        {s}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Resume;
