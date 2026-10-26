import { useLanguage } from "../i18n/context";

const icon = (path: string) => `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${path}`;

const toolsData = [
    { name: 'React', icon: icon('react/react-original.svg'), shadow: 'react', border: 'react' },
    { name: 'JavaScript', icon: icon('javascript/javascript-original.svg'), shadow: 'js', border: 'js' },
    { name: 'TypeScript', icon: icon('typescript/typescript-original.svg'), shadow: 'ts', border: 'ts' },
    { name: 'HTML', icon: icon('html5/html5-original.svg'), shadow: 'red', border: 'red' },
    { name: 'CSS', icon: icon('css3/css3-original.svg'), shadow: 'css', border: 'css' },
    { name: 'Tailwind CSS', icon: icon('tailwindcss/tailwindcss-original.svg'), shadow: 'tail', border: 'tail' },
    { name: 'Vite', icon: icon('vitejs/vitejs-original.svg'), shadow: 'vite', border: 'vite' },
    { name: 'Node.js', icon: icon('nodejs/nodejs-original-wordmark.svg'), shadow: 'node', border: 'node' },
    { name: 'PHP', icon: icon('php/php-original.svg'), shadow: 'php', border: 'php' },
    { name: 'Laravel', icon: icon('laravel/laravel-original.svg'), shadow: 'laravel', border: 'laravel' },
    { name: 'Python', icon: icon('python/python-original.svg'), shadow: 'python', border: 'python' },
    { name: 'C#', icon: icon('csharp/csharp-original.svg'), shadow: 'c', border: 'c' },
    { name: 'MySQL', icon: icon('mysql/mysql-original-wordmark.svg'), shadow: 'mysql', border: 'mysql' },
    { name: 'PostgreSQL', icon: icon('postgresql/postgresql-original.svg'), shadow: 'post', border: 'post' },
    { name: 'Git', icon: icon('git/git-original.svg'), shadow: 'git', border: 'git' },
];

const Tools = () => {
    const { t } = useLanguage();

    return (
        <section id="tools" className="tools py-20 bg-checkered">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center neon-text-dark-blue">
                    {t.tools.title}
                </h2>
                <p className="text-center text-muted text-sm md:text-base mb-16 max-w-2xl mx-auto font-bold">
                    {t.tools.intro}
                </p>

                <ul className="flex flex-wrap justify-center gap-4 lg:gap-6 max-w-[67rem] mx-auto">
                    {toolsData.map((tool) => (
                        <li
                            key={tool.name}
                            className={`group w-[calc((100%-3rem)/4)] sm:w-28 text-center py-5 sm:py-7 backdrop-blur-2xl surface-card neon-border-${tool.border} rounded-2xl transition-transform duration-300 hover:scale-105`}
                        >
                            <div className="relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-50 blur transition duration-300"></div>
                                <img src={tool.icon} alt="" loading="lazy" className="relative h-10 w-10 sm:h-14 sm:w-14 md:h-16 md:w-16 mx-auto" />
                            </div>
                            <h3 className={`tool-name tracking-wide font-semibold text-body text-shadow-${tool.shadow} pt-2 text-[10px] sm:text-sm transition-colors duration-200`}>{tool.name}</h3>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Tools;
