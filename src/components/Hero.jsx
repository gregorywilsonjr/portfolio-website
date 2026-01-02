import React from 'react'
import { FaLinkedin, FaGithub, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import MatrixRain from './MatrixRain'
import './Hero.css'

const Hero = () => {
  return (
    <section id="home" className="hero">
      <MatrixRain />
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-name">Gregory Wilson Jr.</h1>
          <h2 className="hero-title">Senior GRC Engineer | PCI DSS & Cloud Compliance Specialist</h2>
          <p className="hero-subtitle">
            Agentic Cybersecurity AI Enthusiast
          </p>
          <div className="hero-location">
            <FaMapMarkerAlt /> Central Valley, CA | Remote
          </div>
          <div className="hero-social">
            <a href="https://www.linkedin.com/in/gregorywilsonjr" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="https://github.com/gregorywilsonjr" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="#contact" aria-label="Email">
              <FaEnvelope />
            </a>
          </div>
          <div className="hero-cta">
            <a href="#contact" className="btn">Get In Touch</a>
            <a href="#projects" className="btn btn-outline">View Projects</a>
          </div>
        </div>
      </div>
      <div className="hero-scroll">
        <div className="scroll-indicator"></div>
      </div>
    </section>
  )
}

export default Hero
