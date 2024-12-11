import About from './components/About';
import Copyright from './components/Copyright';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Projects from './components/projects/Projects';
import Skills from './components/skills/Skills';

const App = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Skills />
      <About />
      <Projects />
      <Copyright />
    </>
  );
};

export default App;
