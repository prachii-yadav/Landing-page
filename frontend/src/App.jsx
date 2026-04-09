import './styles/style.css';
import './styles/animations.css';

import Hero from './components/Hero';
import Benefits from './components/Benefits';
import Why from './components/Why';
import Signup from './components/Signup';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <main>
        <Hero />
        <Benefits />
        <Why />
        <Signup />
      </main>
      {/* <Footer /> */}
    </>
  );
}
