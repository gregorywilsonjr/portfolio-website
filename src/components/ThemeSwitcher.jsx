import React, { useState, useEffect } from 'react';
import './ThemeSwitcher.css';

const ThemeSwitcher = ({ hidden = false }) => {
  const [currentTheme, setCurrentTheme] = useState('original');
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSwitcher, setShowSwitcher] = useState(!hidden);

  const themes = [
    { id: 'original', name: 'Original', description: 'Classic Design' },
    { id: 'circuit', name: 'Circuit Board', description: 'Geometric • Technical' },
    { id: 'holographic', name: 'Holographic', description: 'Premium • Modern' },
    { id: 'terminal', name: 'Terminal', description: 'Retro • Hacker' }
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') || 'original';
    applyTheme(savedTheme);
    
    if (hidden) {
      const handleKeyPress = (e) => {
        if (e.altKey && e.shiftKey && (e.key === 'T' || e.key === 't')) {
          e.preventDefault();
          setShowSwitcher(prev => !prev);
        }
      };
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [hidden]);

  const applyTheme = (themeId) => {
    setCurrentTheme(themeId);
    localStorage.setItem('portfolio-theme', themeId);

    const existingIndexCSS = document.getElementById('theme-index-css');
    const existingHeroCSS = document.getElementById('theme-hero-css');

    if (themeId === 'original') {
      if (existingIndexCSS) existingIndexCSS.remove();
      if (existingHeroCSS) existingHeroCSS.remove();
    } else {
      if (!existingIndexCSS) {
        const indexLink = document.createElement('link');
        indexLink.id = 'theme-index-css';
        indexLink.rel = 'stylesheet';
        indexLink.href = `/themes/prototype-${themeId}.css`;
        document.head.appendChild(indexLink);
      } else {
        existingIndexCSS.href = `/themes/prototype-${themeId}.css`;
      }

      if (!existingHeroCSS) {
        const heroLink = document.createElement('link');
        heroLink.id = 'theme-hero-css';
        heroLink.rel = 'stylesheet';
        heroLink.href = `/themes/Hero-${themeId}.css`;
        document.head.appendChild(heroLink);
      } else {
        existingHeroCSS.href = `/themes/Hero-${themeId}.css`;
      }
    }
  };

  const handleThemeChange = (themeId) => {
    applyTheme(themeId);
    setIsExpanded(false);
  };

  if (!showSwitcher) return null;

  return (
    <div className={`theme-switcher ${isExpanded ? 'expanded' : ''}`}>
      <button 
        className="theme-switcher-toggle"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label="Toggle theme switcher"
      >
        <span className="theme-icon">🎨</span>
        <span className="theme-label">Themes</span>
      </button>

      {isExpanded && (
        <div className="theme-switcher-panel">
          <div className="theme-switcher-header">
            <h3>Choose Theme</h3>
            <button 
              className="theme-close"
              onClick={() => setIsExpanded(false)}
              aria-label="Close theme switcher"
            >
              ×
            </button>
          </div>
          
          <div className="theme-options">
            {themes.map(theme => (
              <button
                key={theme.id}
                className={`theme-option ${currentTheme === theme.id ? 'active' : ''}`}
                onClick={() => handleThemeChange(theme.id)}
              >
                <div className="theme-option-name">{theme.name}</div>
                <div className="theme-option-desc">{theme.description}</div>
                {currentTheme === theme.id && (
                  <span className="theme-active-indicator">✓</span>
                )}
              </button>
            ))}
          </div>

          {hidden && (
            <div className="theme-switcher-hint">
              Press <kbd>Alt</kbd> + <kbd>Shift</kbd> + <kbd>T</kbd> to toggle
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
