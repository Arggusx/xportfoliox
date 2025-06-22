// import { SiJavascript, SiGit } from "react-icons/si";

const toolsData = [
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', shadow: 'react', border: 'react' },
    { name: 'Java Script', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', shadow: 'js', border: 'js' },
    { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg', shadow: 'red', border: 'red' },
    { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg', shadow: 'css', border: 'css' },
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg', shadow: 'node', border: 'node' },
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', shadow: 'python', border: 'python' },
    { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original-wordmark.svg', shadow: 'mysql', border: 'mysql' },
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg', shadow: 'git', border: 'git' },
    { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', shadow: 'tail', border: 'tail' },
    { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg', shadow: 'vite', border: 'vite' },
    { name: 'C#', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg', shadow: 'c', border: 'c' },
    { name: 'Postgre SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg', shadow: 'post', border: 'post' },
    { name: 'Type Script', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', shadow: 'ts', border: 'ts' },

];

const Tools = () => {
    return (
        <section id="tools" className="tools py-20 bg-checkered">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center neon-text-blue">
                    <span className="neon-text-pink">&lt;</span> Ferramentas & Tecnologias <span className="neon-text-pink">/&gt;</span>
                </h2>
                <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto font-bold">
                    Tecnologias que domino e utilizo regularmente para criar soluções incríveis.
                </p>

                <div className="grid grid-cols-4 md:grid-cols-3 lg:grid-cols-7 gap-5 lg:gap-8 w-[90%] lg:w-[70%] md:w-[60%] mx-auto">
                    {toolsData.map((tool, idx) => (
                        <div
                            key={idx}
                            className={`group text-center sm:py-9 py-5 backdrop-blur-2xl bg-slate-800/50 hover:bg-slate-700/50 neon-border-${tool.border} rounded-2xl transition-transform duration-300 hover:scale-105`}
                        >
                            <div className="relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-50 blur transition duration-300"></div>
                                <img src={`${tool.icon}`} className="relative sm:h-16 sm:w-10 h-12 w-16 md:h-20 md:w-20 transform transition-transform duration-300 mx-auto" />
                            </div>
                            <h3 className={`tracking-wide font-semibold group-hover:text-white text-gray-300 text-shadow-${tool.shadow} pt-2 sm:text-sm text-xs md:text-base  transition-colors duration-200`}>{tool.name}</h3>
                        </div>
                    ))}

                </div>
            </div>
        </section >
    );
};

export default Tools;