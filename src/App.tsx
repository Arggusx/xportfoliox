import About from "./sections/About"
import Welcome from "./sections/Welcome"
import Header from "./components/Header"
import Footer from "./components/Footer"
import ProjectCard from "./sections/ProjectCard"
import Resume from "./sections/Resume"
import Tools from "./sections/Tools"
import { LanguageProvider } from "./i18n/LanguageProvider"
import { ThemeProvider } from "./theme/ThemeProvider"
import "./index.css"


function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Header />
        <main>
          <Welcome />
          <About />
          <Resume />
          <ProjectCard />
          <Tools />
        </main>
        <Footer />
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
