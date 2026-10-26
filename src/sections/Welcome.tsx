import { Suspense } from 'react';
import ThreeScene from '../components/ThreeScene';
import { useLanguage } from '../i18n/context';
import resume from '../data/resume.json';

function Welcome() {
    const { lang, t } = useLanguage();
    const cv = resume[lang].pdf;

    return (
        <section id="home" className="section flex items-center justify-center pt-20 bg-checkered">
            <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center">
                {/* Texto */}
                <div className="md:w-1/2 mb-10 md:mb-0 md:text-left">
                    <h1 className="text-[2.1rem] leading-tight sm:text-5xl lg:text-6xl font-bold mb-4 neon-text-blue">
                        {t.hero.line1} <br /><span className="neon-text-pink">{t.hero.line2}</span>
                    </h1>
                    <p className="text-xl sm:text-2xl mb-6 neon-text-purple">
                        {t.hero.subtitle}
                    </p>
                    <p className="text-sm md:text-lg font-semibold text-muted max-w-xl leading-relaxed">
                        {t.hero.text}
                    </p>

                    <div className="flex flex-wrap gap-4 mt-10 md:justify-start">
                        <a href="#projects" className="btn-surface px-6 py-3 neon-border-blue rounded-lg neon-btn">
                            {t.hero.projects}
                        </a>
                        <a href="#contacts" className="btn-surface px-6 py-3 neon-border-pink rounded-lg neon-btn">
                            {t.hero.contact}
                        </a>
                        <a href={`/${cv}`} download={cv} className="btn-surface px-6 py-3 neon-border-purple rounded-lg neon-btn">
                            {t.hero.downloadCv}
                        </a>
                    </div>
                </div>

                <div className="md:w-1/2 flex justify-center">
                    <div className="relative w-[280px] sm:w-[320px] md:w-[420px] lg:w-[500px] aspect-square">
                        <div className="absolute inset-0 rounded-full bg-[var(--neon-blue)] blur-xl opacity-20 animate-pulse"></div>
                        <Suspense
                            fallback={
                                <div className="w-full h-full flex items-center justify-center">
                                    <div className="w-12 h-12 border-2 border-[var(--neon-blue)] border-t-transparent rounded-full animate-spin" />
                                </div>
                            }
                        >
                            <ThreeScene />
                        </Suspense>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Welcome;
