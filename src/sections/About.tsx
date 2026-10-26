import { useLanguage } from "../i18n/context";

function About() {
    const { t } = useLanguage();

    return (
        <section id="about" className="section py-20 bg-checkered">
            <div className="container mx-auto px-4">
                <h2 className="sm:text-4xl text-3xl font-bold mb-16 text-center neon-text-dark-blue">
                    {t.about.title}
                </h2>

                <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-16 max-w-6xl mx-auto">
                    <div className="shrink-0 flex justify-center">
                        <img
                            src="minha-foto.jpg"
                            alt={t.about.photoAlt}
                            className="profile-img shrink-0 aspect-square rounded-full w-64 h-64 sm:w-72 sm:h-72 lg:w-96 lg:h-96 object-cover transition-transform duration-300 hover:scale-105"
                        />
                    </div>

                    <div className="font-bold max-w-2xl">
                        <h3 className="text-3xl text-center md:text-left font-bold mb-8 leading-relaxed neon-text-blue">
                            {t.about.greeting} <br />
                            <span className="neon-text-pink">Douglas Moreira</span>
                        </h3>
                        <p className="text-body mb-6 leading-relaxed text-base">
                            {t.about.p1}
                        </p>
                        <p className="text-body mb-10 leading-relaxed text-base">
                            {t.about.p2}
                        </p>

                        <div className="grid sm:grid-cols-2 gap-5">
                            <div className="p-4 w-full neon-border-blue rounded-lg backdrop-blur surface">
                                <h4 className="font-bold mb-2 neon-text-blue text-sm">{t.about.educationTitle}</h4>
                                <p className="text-body text-sm leading-relaxed">{t.about.education}</p>
                            </div>
                            <div className="p-4 w-full neon-border-pink rounded-lg backdrop-blur surface">
                                <h4 className="font-bold mb-2 neon-text-pink text-sm">{t.about.experienceTitle}</h4>
                                <p className="text-body text-sm leading-relaxed">{t.about.experience}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;
