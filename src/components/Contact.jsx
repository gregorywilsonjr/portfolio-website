import React from 'react'
import { FaEnvelope, FaLinkedin, FaGithub, FaMapMarkerAlt } from 'react-icons/fa'
import ContactForm from './ContactForm'
import './Contact.css'

const Contact = () => {
  const API_ENDPOINT = 'https://j9gtpor219.execute-api.us-east-1.amazonaws.com/prod/contact'
  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        
        <div className="contact-content">
          <div className="contact-intro">
            <p>
              I'm always open to discussing new opportunities, collaborations, or consulting projects 
              in GRC, cloud security, and compliance automation.
            </p>
            <p>
              Whether you're looking to strengthen your security posture, automate compliance, or 
              build secure cloud infrastructure, let's connect!
            </p>
          </div>

          <div id="contact-form" className="contact-form-wrapper">
            <ContactForm apiEndpoint={API_ENDPOINT} />
          </div>

          <div className="contact-methods">
            <a href="#contact-form" className="contact-card card" aria-label="Jump to contact form">
              <div className="contact-icon">
                <FaEnvelope />
              </div>
              <h3>Email</h3>
              <p>contact@gregorywilsonjr.com</p>
            </a>

            <a href="https://www.linkedin.com/in/gregorywilsonjr" target="_blank" rel="noopener noreferrer" className="contact-card card">
              <div className="contact-icon">
                <FaLinkedin />
              </div>
              <h3>LinkedIn</h3>
              <p>Connect with me</p>
            </a>

            <a href="https://github.com/gregorywilsonjr" target="_blank" rel="noopener noreferrer" className="contact-card card">
              <div className="contact-icon">
                <FaGithub />
              </div>
              <h3>GitHub</h3>
              <p>View my projects</p>
            </a>
          </div>

          <div className="contact-location">
            <FaMapMarkerAlt />
            <span>Central Valley, CA | Remote</span>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Gregory Wilson Jr. All rights reserved.</p>
          <p className="footer-tagline">Building Trust Through Compliance Automation</p>
        </div>
      </footer>
    </section>
  )
}

export default Contact
