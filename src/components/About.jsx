import React from 'react'
import './About.css'

const About = () => {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              I'm a Senior GRC Engineer with over 20 years of experience in IT and cybersecurity, 
              helping organizations design secure, compliant, and automated cloud environments across 
              Azure and AWS. My expertise spans security architecture, compliance automation, and risk 
              management frameworks including PCI DSS v4.0.1, SOC 2, ISO 27001, and NIST CSF.
            </p>
            <p>
              By embedding automation into governance and control validation, I help businesses reduce 
              compliance workloads by 40–70%, strengthen audit readiness, and achieve continuous security 
              alignment across hybrid environments.
            </p>
            <p>
              I help organizations build trust at scale by embedding compliance into their daily operations, 
              reducing risk, and accelerating innovation.
            </p>
          </div>
          <div className="about-stats">
            <div className="stat-card">
              <div className="stat-number">20+</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">40-70%</div>
              <div className="stat-label">Compliance Reduction</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">100%</div>
              <div className="stat-label">Audit Ready</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
