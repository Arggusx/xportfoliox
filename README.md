# Meu Portfólio de Desenvolvedor Full Stack

Bem-vindo ao repositório do meu portfólio pessoal! Este projeto foi desenvolvido para exibir minhas habilidades, projetos em destaque, tecnologias que domino e para servir como um ponto central de contato.

## Visual e Design

O design da aplicação foi inspirado em uma estética **cyberpunk / neon**, focando num esquema de cores vibrante (Azul Neon, Rosa e Roxo) sob um fundo escuro ("Dark Mode" nativo). Toda a interface foi pensada para causar um forte impacto visual aliado a uma excelente usabilidade e acessibilidade.

## Estrutura da Página e Componentes

O portfólio é uma **Single Page Application (SPA)** modularizada. Abaixo detalho a estrutura principal de seções e os recursos encontrados em cada uma:

### 1. Seção "Welcome" (Boas-vindas)
A página inicial (`src/sections/Welcome.tsx`) atua como o **Hero** do site. 
- Apresenta o título com tipografia vibrante (neon) e uma introdução do meu papel como Desenvolvedor Full Stack.
- **O grande diferencial:** No lado direito da seção, renderiza-se um componente 3D complexo e totalmente interativo (leia a seção *Componente 3D (ThreeScene)* abaixo). Mais detalhes abaixo.

### 2. Seção "Sobre Mim"
Localizada em `src/sections/About.tsx` (ou similar), esta seção visa me apresentar pessoalmente:
- Conta um pouco sobre minha jornada, focado no desenvolvimento de front-end com React/Tailwind e back-end com Node.js.
- Exibe cards informativos sobre minha educação (Ciência da Computação) e minha experiência de mercado.
- O componente conta com bordas gradientes simulando neon, casando com o tema geral do sistema.

### 3. Seção "Projetos"
Composta pelo `src/sections/ProjectCard.tsx` integrado à galeria principal.
- Exibe os projetos principais em formato de "Cards". Cada card possui uma imagem do projeto, um título destacado em neon e uma breve descrição.
- **Projetos em destaque** incluem: Painel de Gerenciamento, Cardápio Online, Jogo Topdown, Oratio Daily, Sistema de Ponto Eletrônico e KarateFlow.
- Cada card direciona o usuário ou para o código fonte (quando público) ou para a visualização ("Demo") usando links fornecidos via variáveis de ambiente (`.env`).

### 4. Seção "Ferramentas" (Skills)
Uma área dedicada às tecnologias do dia a dia.
- Exibe de forma limpa as linguagens e bibliotecas que domino (React, TypeScript, Node.js, etc.).

## 👾 Componente 3D (ThreeScene)

O grande destaque técnico do projeto fica em `src/components/ThreeScene.tsx`. Ele não é apenas um modelo 3D estático, mas sim uma **cena procedural viva e otimizada** para a web, construída com **Three.js**, **React Three Fiber** (@react-three/fiber) e **Drei** (@react-three/drei).

### Composição da Cena 3D:
1. **O Modelo Principal (`<LoadedModel />`):** 
   - Utiliza a função `useGLTF` para carregar o modelo GLB (Battle Damaged Sci-fi Helmet) de forma assíncrona.
   - O modelo está envolvido no componente `<Float>` do *Drei*, o que dá uma animação contínua e suave de flutuação, imitando a respiração ou flutuação em gravidade zero.

2. **Anéis Orbitais (`<OrbitRing />`):**
   - 3 geometrias Toro (`torusGeometry`) com materiais translúcidos (Azul, Rosa e Roxo).
   - Eles giram de forma contínua em diferentes eixos (X, Y, Z) utilizando a função `useFrame`, criando um campo de energia simulado ao redor do capacete.

3. **Partículas Flutuantes (`<Particles />`):**
   - Um campo de 100 pontos (`THREE.Points`) com posições e cores geradas aleatoriamente em um formato esférico (`Math.sin`/`Math.cos`).
   - Elas também rodam lentamente, criando profundidade estelar ou cibernética para o componente.

4. **Esferas Orbitantes (`<OrbitingSpheres />`):**
   - 5 pequenas esferas neon que transitam em órbitas distintas, com velocidades diferentes, e variação de elevação no eixo Y. Isso garante que a cena tenha múltiplos níveis de movimento.

5. **Luzes, Câmera e Otimização:**
   - Possui `OrbitControls`, permitindo ao usuário arrastar para girar (rotate), fazer zoom in/out (scroll) e mover (pan) com "Damping" (fricção física) ativo para mais fluidez.
   - A cena conta com **autoRotate**, mantendo vida mesmo que o usuário não interaja.
   - Foram configuradas luzes direcionais e pontuais com as cores hexadecimais de Neon (`#00d4ff`, `#ff2d75`, etc.).
   - A prop `dpr={1}` garante que telas de alta densidade (retina, 4k) não sobrecarreguem o contexto WebGL. O modelo também é utilizado sem `clone()` para melhorar a estabilidade e performance no React.

### **Sobre o 3D Object:**

## 👾 Cena 3D Interativa (Three.js)

A seção de boas-vindas deste portfólio apresenta uma cena 3D interativa renderizada em tempo real direto no navegador utilizando **[Three.js](https://threejs.org/)** e **[React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)**.

**Modelo 3D Utilizado:**
O capacete renderizado na cena é o famoso modelo de demonstração PBR (Physically Based Rendering) padrão da biblioteca Khronos glTF.
- **Nome:** Battle Damaged Sci-fi Helmet
- **Autor:** [theblueturtle_](https://sketchfab.com/theblueturtle_)
- **Link Original (Sketchfab):** [Battle Damaged Sci-fi Helmet](https://sketchfab.com/models/b81008d513954189a063ff901f7abfe4)
- **Licença:** Creative Commons Attribution (CC-BY)

A cena conta com iluminação estilizada com tons neon (azul, rosa e roxo), partículas flutuantes dinâmicas criadas proceduralmente e controles completos de órbita (pan, zoom e rotação), proporcionando uma experiência imersiva e responsiva sem a necessidade de plugins externos.


## Créditos do Modelo 3D Utilizado:
O capacete renderizado na cena é o famoso modelo de demonstração PBR padrão da biblioteca Khronos glTF.
- **Nome:** Battle Damaged Sci-fi Helmet
- **Autor:** [theblueturtle_](https://sketchfab.com/theblueturtle_)
- **Link Original (Sketchfab):** [Battle Damaged Sci-fi Helmet](https://sketchfab.com/models/b81008d513954189a063ff901f7abfe4)
- **Licença:** Creative Commons Attribution (CC-BY)

### Tecnologias Utilizadas

Este portfólio foi construído no topo de uma stack moderna focada em performance de alto nível e modularidade:

- **[React 19](https://react.dev/)** - Biblioteca base para a construção da UI em componentes reutilizáveis.
- **[TypeScript](https://www.typescriptlang.org/)** - Adiciona tipagem estática e segurança ao código.
- **[Vite](https://vitejs.dev/)** - Bundler ultra-rápido para desenvolvimento.
- **[Tailwind CSS (v4)](https://tailwindcss.com/)** - Framework CSS Utility-first para estilização rápida e responsiva.
- **Three.js & @react-three/fiber** - Utilizado para a composição e renderização 3D nativa na web.
- **@react-three/drei** - Utilitários práticos e abstrações para trabalhar mais fácil com R3F.
- **Lucide-React & React Icons** - Bibliotecas responsáveis pelas iconografias modernas ao longo do layout.

## Como Rodar Localmente

### Pré-requisitos
- **Node.js** (recomenda-se a versão mais recente LTS)
- **npm** ou **yarn** instalado no sistema.

### Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
   ```

2. Entre no diretório do projeto:
   ```bash
   cd SEU_REPOSITORIO
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Crie um arquivo `.env` na raiz (baseando-se nos seus links de projeto, se aplicável, como para `VITE_URL_GIT_GAME`, etc.).

5. Inicie o servidor de desenvolvimento do Vite:
   ```bash
   npm run dev
   ```

6. Acesse o projeto pelo seu navegador local (normalmente no link `http://localhost:5173/`).

---
Desenvolvido com dedicação por **Douglas Moreira**. Transformando ideias em Soluções Digitais!
