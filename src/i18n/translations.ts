export type Lang = "en" | "pt";

export type ProjectId = "panel" | "menu" | "oratio" | "langboss" | "monterra" | "ponto" | "torakan";

interface ProjectText {
    title: string;
    desc: string;
    fullDescription: string;
    techs: string[];
    features: string[];
}

const en = {
    meta: {
        title: "Douglas Moreira | Front-end Developer",
        description:
            "Portfolio of Douglas Moreira, a front-end developer focused on React, TypeScript and Tailwind. Projects, resume and contact.",
    },
    langSwitch: { label: "Switch language to Português", short: "PT" },
    theme: { toLight: "Switch to light mode", toDark: "Switch to dark mode" },
    nav: {
        label: "Main navigation",
        home: "Home",
        about: "About",
        resume: "Resume",
        projects: "Projects",
        tools: "Tools",
        openMenu: "Open menu",
        closeMenu: "Close menu",
    },
    hero: {
        line1: "Front-end",
        line2: "Developer",
        subtitle: "Turning Ideas into Digital Solutions",
        text: "Exploring web development with a focus on performance, accessibility and striking visuals.",
        projects: "My Projects",
        contact: "Contact",
        downloadCv: "Download CV",
    },
    about: {
        title: "About Me",
        greeting: "Hi, I'm",
        photoAlt: "Portrait of Douglas Moreira",
        p1: "I'm a 23-year-old front-end developer, a Computer Science student (8th semester) and a development intern at the Alagoas State Department of Education (SEDUC). I have a solid foundation in web development, focused mainly on front-end with React, TypeScript and Tailwind, and I also build back-ends with Node.js, NestJS and Laravel, which gives me a more complete view of the solutions I build.",
        p2: "My journey started with curiosity and practice, and today I keep building my own projects, including a game I developed on my own. I'm constantly working to become a more independent professional, mastering the logic and inner workings of the tools I use instead of just following ready-made recipes.",
        educationTitle: "Education",
        education: "B.S. in Computer Science - Unima | Afya (8th semester)",
        experienceTitle: "Experience",
        experience: "3+ years in web development",
    },
    resume: {
        title: "Resume",
        intro: "A summary of my background. Prefer to read it offline or send it to HR? Download the PDF version.",
        download: "Download PDF",
        experience: "Experience",
        education: "Education",
        skills: "Skills",
    },
    projects: {
        title: "My Projects",
        intro: "Some of the projects I've worked on, combining creativity, technology and performance.",
        viewAll: "View All on GitHub",
        demo: "Live Demo",
        soon: "Demo coming soon",
        details: "Details",
        modal: {
            label: "Project Details",
            close: "Close",
            closeAria: "Close dialog",
            techs: "Technologies Used",
            about: "About the Project",
            features: "Key Features",
            open: "Open Project",
        },
        items: {
            panel: {
                title: "Management Dashboard",
                desc: "Admin panel for the online menu system, used to manage orders.",
                fullDescription:
                    "A complete admin system built for restaurant and snack-bar owners. It lets them view and update order status in real time, manage menu items, register add-ons and analyze cash flow with detailed reports.",
                techs: ["React", "Node.js", "TypeScript", "Tailwind CSS", "WebSockets"],
                features: [
                    "Real-time order management",
                    "Stock and menu control",
                    "Sales statistics dashboard",
                    "Sound and visual notifications",
                ],
            },
            menu: {
                title: "Online Menu",
                desc: "Main site of the online menu system. Customers place orders and follow them in real time.",
                fullDescription:
                    "A customer-facing web app with smooth browsing by category, add-on customization, an interactive cart and a direct checkout that sends the order.",
                techs: ["React", "TypeScript", "Tailwind CSS", "API Integration"],
                features: [
                    "Intuitive category navigation",
                    "Dynamic shopping cart",
                    "Fast checkout with order submission",
                    "Order status tracking",
                ],
            },
            oratio: {
                title: "Oratio Daily",
                desc: "A site built to help people who want to learn more about the Catholic faith.",
                fullDescription:
                    "An interactive spiritual platform that delivers daily prayers, daily liturgy, stories of the saint of the day and moments of daily reflection, with a calm and accessible interface.",
                techs: ["React", "TypeScript", "Tailwind CSS", "Liturgical API"],
                features: [
                    "Daily updated liturgical readings",
                    "Categorized prayer library",
                    "Biography of the Saint of the Day",
                    "Responsive design focused on readability",
                ],
            },
            langboss: {
                title: "Langboss Translator",
                desc: "LangBoss is more than a translation tool; it's a language immersion experience.",
                fullDescription:
                    "A modern translation and language-learning tool that combines AI and context to deliver accurate translations, grammar explanations and practical conversation examples.",
                techs: ["React", "Artificial Intelligence", "TypeScript", "Tailwind CSS"],
                features: [
                    "Accurate contextual translations",
                    "Syntax and grammar explainer",
                    "Everyday usage examples",
                    "Minimal, productivity-focused interface",
                ],
            },
            monterra: {
                title: "Monterra",
                desc: "An original top-down game inspired by the classic Stardew Valley, entirely in pixel art.",
                fullDescription:
                    "A 2D top-down game project with exploration mechanics, collision-based movement, detailed tileset maps and original pixel art inspired by classic 16-bit era RPGs.",
                techs: ["JavaScript", "HTML5 Canvas", "Pixel Art", "Game Engine"],
                features: [
                    "Original pixel art and sprites",
                    "Movement and map collision mechanics",
                    "Scenery interaction system",
                    "Retro soundtrack and effects",
                ],
            },
            ponto: {
                title: "Electronic Time Clock System",
                desc: "App for recording and managing time punches, hours and scheduling efficiently.",
                fullDescription:
                    "A platform focused on simplifying the daily work-hours record for employees and managers. It includes clock-in/out control, automatic hour-bank balance calculation and simplified reports.",
                techs: ["React", "TypeScript", "Node.js", "Tailwind CSS"],
                features: [
                    "Easy clock-in and clock-out",
                    "Hour bank calculation and management",
                    "Complete punch history",
                    "Exportable management reports",
                ],
            },
            torakan: {
                title: "Torakan Academy Portal",
                desc: "A complete Karate academy management platform that helps teachers and students learn more about the culture and practice of Karate-dō.",
                fullDescription:
                    "A system dedicated to spreading the martial art of Karate-dō and managing dojos. It includes a Kata library, a glossary of Japanese terms, belt exams and student management.",
                techs: ["React", "TypeScript", "Node.js", "Tailwind CSS"],
                features: [
                    "Interactive guide to Katas and techniques",
                    "Glossary of Japanese terms",
                    "Rank control and belt exams",
                    "Attendance and student profile management",
                ],
            },
        } as Record<ProjectId, ProjectText>,
    },
    tools: {
        title: "Tools & Technologies",
        intro: "Technologies I use regularly to build great solutions.",
    },
    footer: {
        navigation: "Navigation",
        contact: "Contact",
        email: "Email",
        whatsapp: "WhatsApp",
        whatsappMessage: "Hello Douglas, I found you through your portfolio!",
        rights: "All rights reserved.",
    },
};

const pt: typeof en = {
    meta: {
        title: "Douglas Moreira | Desenvolvedor Front-end",
        description:
            "Portfólio de Douglas Moreira, desenvolvedor front-end com foco em React, TypeScript e Tailwind. Projetos, currículo e contato.",
    },
    langSwitch: { label: "Mudar idioma para English", short: "EN" },
    theme: { toLight: "Mudar para o modo claro", toDark: "Mudar para o modo escuro" },
    nav: {
        label: "Navegação principal",
        home: "Home",
        about: "Sobre",
        resume: "Currículo",
        projects: "Projetos",
        tools: "Ferramentas",
        openMenu: "Abrir menu",
        closeMenu: "Fechar menu",
    },
    hero: {
        line1: "Desenvolvedor",
        line2: "Front-end",
        subtitle: "Transformando Ideias em Soluções Digitais",
        text: "Explorando o universo do desenvolvimento web com foco em performance, acessibilidade e visual marcante.",
        projects: "Meus Projetos",
        contact: "Contatos",
        downloadCv: "Baixar CV",
    },
    about: {
        title: "Sobre Mim",
        greeting: "Olá, eu sou",
        photoAlt: "Foto de Douglas Moreira",
        p1: "Sou um desenvolvedor front-end de 23 anos, estudante de Ciência da Computação (8º período) e estagiário de desenvolvimento na Secretaria de Estado da Educação de Alagoas (SEDUC). Tenho uma base sólida em desenvolvimento web, com foco principal em front-end utilizando React, TypeScript e Tailwind, mas também construo back-ends com Node.js, NestJS e Laravel, o que me proporciona uma visão mais completa das soluções que construo.",
        p2: "Minha jornada começou com curiosidade e prática, e hoje continuo criando projetos próprios, inclusive um jogo que desenvolvi por conta própria. Busco constantemente me tornar um profissional mais independente, dominando a lógica e o funcionamento das ferramentas que utilizo, em vez de apenas seguir fórmulas prontas.",
        educationTitle: "Educação",
        education: "Ciência da Computação - Unima | Afya (8º período)",
        experienceTitle: "Experiência",
        experience: "3+ anos de desenvolvimento web",
    },
    resume: {
        title: "Currículo",
        intro: "Um resumo da minha trajetória. Prefere ler offline ou enviar para o RH? Baixe a versão em PDF.",
        download: "Baixar PDF",
        experience: "Experiência",
        education: "Formação",
        skills: "Habilidades",
    },
    projects: {
        title: "Meus Projetos",
        intro: "Alguns dos projetos em que trabalhei, combinando criatividade, tecnologia e performance.",
        viewAll: "Ver Todos no GitHub",
        demo: "Ver Demo",
        soon: "Demo em breve",
        details: "Detalhes",
        modal: {
            label: "Detalhes do Projeto",
            close: "Fechar",
            closeAria: "Fechar janela",
            techs: "Tecnologias Utilizadas",
            about: "Sobre o Projeto",
            features: "Principais Funcionalidades",
            open: "Acessar Projeto",
        },
        items: {
            panel: {
                title: "Painel de Gerenciamento",
                desc: "Painel de administração do sistema de cardápio online, para o gerenciamento de pedidos.",
                fullDescription:
                    "Sistema administrativo completo desenvolvido para proprietários de restaurantes e lanchonetes. Permite visualizar e alterar o status de pedidos em tempo real, gerenciar itens do menu, cadastrar adicionais e analisar o fluxo de caixa com relatórios detalhados.",
                techs: ["React", "Node.js", "TypeScript", "Tailwind CSS", "WebSockets"],
                features: [
                    "Gestão de pedidos em tempo real",
                    "Controle de estoque e cardápio",
                    "Dashboard estatístico de vendas",
                    "Notificações sonoras e visuais",
                ],
            },
            menu: {
                title: "Cardápio Online",
                desc: "Site principal do sistema de cardápio online. Ele permite que os usuários façam pedidos e acompanhem em tempo real.",
                fullDescription:
                    "Aplicação web voltada para o consumidor final, permitindo navegação fluida pelos produtos por categorias, personalização de adicionais, adição ao carrinho interativo e checkout direto com envio de pedido.",
                techs: ["React", "TypeScript", "Tailwind CSS", "Integração com API"],
                features: [
                    "Navegação intuitiva por categorias",
                    "Carrinho de compras dinâmico",
                    "Checkout rápido com envio de dados",
                    "Acompanhamento do status do pedido",
                ],
            },
            oratio: {
                title: "Oratio Daily",
                desc: "Site desenvolvido para ajudar pessoas que gostariam de aprender mais sobre a religião católica.",
                fullDescription:
                    "Plataforma espiritual interativa criada para disponibilizar orações diárias, liturgia diária, histórias dos santos do dia e momentos de reflexão diária com uma interface serena e acessível.",
                techs: ["React", "TypeScript", "Tailwind CSS", "API Litúrgica"],
                features: [
                    "Leituras litúrgicas atualizadas diariamente",
                    "Biblioteca de orações categorizadas",
                    "Biografia e história do Santo do Dia",
                    "Design responsivo e com foco em leitura",
                ],
            },
            langboss: {
                title: "Tradutor Langboss",
                desc: "LangBoss é mais do que uma simples plataforma de tradução; é uma experiência de imersão linguística.",
                fullDescription:
                    "Ferramenta moderna de tradução e aprendizado de idiomas que combina inteligência e contextualização para fornecer traduções precisas, explicações gramaticais e exemplos práticos de conversação.",
                techs: ["React", "Inteligência Artificial", "TypeScript", "Tailwind CSS"],
                features: [
                    "Traduções contextuais precisas",
                    "Explicador sintático e gramatical",
                    "Exemplos de uso no dia a dia",
                    "Interface minimalista e focada em produtividade",
                ],
            },
            monterra: {
                title: "Monterra",
                desc: "Um jogo autoral, estilo Topdown e inspirado no clássico Stardew Valley, totalmente em pixel art.",
                fullDescription:
                    "Projeto de desenvolvimento de jogos em formato 2D Top-Down, construído com mecânicas de exploração, movimentação com colisão, mapas detalhados em tileset e pixel art autoral inspirada nos clássicos RPGs da era 16-bits.",
                techs: ["JavaScript", "HTML5 Canvas", "Pixel Art", "Game Engine"],
                features: [
                    "Pixel art e sprites autorais",
                    "Mecânicas de movimentação e colisão de mapa",
                    "Sistema de interação com cenários",
                    "Trilha sonora e efeitos retro",
                ],
            },
            ponto: {
                title: "Sistema de Ponto Eletrônico",
                desc: "Aplicativo para registro e controle eficiente de marcações de ponto, horas e organização.",
                fullDescription:
                    "Plataforma focada em simplificar o registro diário de jornada de trabalho para colaboradores e gestores. Conta com controle de entrada/saída, cálculo automático de saldo de horas e relatórios simplificados.",
                techs: ["React", "TypeScript", "Node.js", "Tailwind CSS"],
                features: [
                    "Registro fácil de entrada e saída",
                    "Cálculo e gestão de banco de horas",
                    "Histórico completo de marcações",
                    "Relatórios exportáveis para a gestão",
                ],
            },
            torakan: {
                title: "Portal Torakan Academy",
                desc: "Plataforma completa de gestão de academias de Karatê, desenvolvida para ajudar os professores e alunos a entender melhor sobre a cultura e prática do Karatê-dō.",
                fullDescription:
                    "Sistema voltado para a difusão da arte marcial Karatê-dō e gestão de dojos. Integra biblioteca de Kata, glossário de termos em japonês, exames de faixa e gerenciamento de alunos.",
                techs: ["React", "TypeScript", "Node.js", "Tailwind CSS"],
                features: [
                    "Guia interativo de Katas e técnicas",
                    "Glossário com termos em japonês",
                    "Controle de graduação e exames de faixa",
                    "Gestão de frequência e perfil de alunos",
                ],
            },
        },
    },
    tools: {
        title: "Ferramentas & Tecnologias",
        intro: "Tecnologias que utilizo regularmente para criar boas soluções.",
    },
    footer: {
        navigation: "Navegação",
        contact: "Contato",
        email: "Email",
        whatsapp: "WhatsApp",
        whatsappMessage: "Olá Douglas, vim pelo seu portfólio!",
        rights: "Todos os direitos reservados.",
    },
};

export const translations: Record<Lang, typeof en> = { en, pt };
