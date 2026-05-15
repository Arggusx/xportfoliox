import { Suspense } from 'react';
import ThreeScene from '../components/ThreeScene';

function Welcome() {
    return (
        <section id="home" className="section flex items-center justify-center pt-10 bg-checkered">
            <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center">
                {/* Texto */}
                <div className="md:w-1/2 mb-10 md:mb-0  md:text-left">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 neon-text-blue break-words">
                        Desenvolvedor <br /><span className="neon-text-pink">Front-end</span>
                    </h1>
                    <h2 className="text-2xl sm:text-2xl md:text-2xl mb-6 neon-text-purple break-words">
                        Transformando Ideias em Soluções Digitais
                    </h2>
                    <p className="text-sm md:text-lg font-semibold text-gray-400 max-w-xl leading-relaxed">
                        Explorando o universo do desenvolvimento web com foco em performance, acessibilidade e visual marcante.
                    </p>

                    <div className="flex flex-wrap gap-4 mt-10  md:justify-start">
                        <a href="#projects" className="px-6 py-3 neon-border-blue text-white rounded-lg neon-btn hover:bg-blue-900 hover:bg-opacity-30 backdrop-blur bg-slate-900">
                            Meus Projetos
                        </a>
                        <a href="#contacts" className="px-6 py-3 backdrop-blur bg-slate-900 neon-border-pink text-white rounded-lg neon-btn hover:bg-pink-900 hover:bg-opacity-30">
                            Contatos
                        </a>
                    </div>
                </div>

                <div className="md:w-1/2 flex justify-center">
                    <div className="relative w-[320px] sm:w-[250px] md:w-[500px] aspect-square">
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

            <hr className="my-10 border-gray-700" />
        </section>
    );
}

export default Welcome;
