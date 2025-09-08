import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, Code, Palette, Zap, Users } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'store'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-container">
          <div className="nav-logo">
            <p>William Whyte</p>
          </div>
          
          <div className={`nav-menu ${isMenuOpen ? 'nav-menu-open' : ''}`}>
            <a 
              href="#home" 
              className={activeSection === 'home' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
            >
              Home
            </a>
            <a 
              href="#store" 
              className={activeSection === 'store' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('store'); }}
            >
              Store
            </a>
     
      
          </div>

          <button 
            className="nav-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="highlight">Peninsula</span>
            </h1>
            <p className="hero-subtitle">
              Front-end task
            </p>
            <p className="hero-description">
              View documents that have been uploaded by an administrator.
            </p>
            <div className="hero-buttons">
              <button 
                className="btn btn-primary"
                onClick={() => scrollToSection('store')}
              >
                View Store Contents
              </button>
              {/* <button 
                className="btn btn-secondary"
                onClick={() => scrollToSection('services')}
              >
                View Work
              </button> */}
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-avatar"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="store" className="section about">
        <div className="container">
          <h2 className="section-title">File Storage</h2>
          <div className="store-content">
            <div className="store-text">
 
            </div>
          
          </div>
        </div>
      </section>




      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 William Whyte. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;