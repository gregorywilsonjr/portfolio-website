import React from 'react'
import { FaAward, FaCertificate, FaClock } from 'react-icons/fa'
import './Certifications.css'

const Certifications = () => {
  const certifications = [
    {
      name: 'CISSP',
      fullName: 'Certified Information Systems Security Professional',
      status: 'active',
      icon: <FaAward />
    },
    {
      name: 'ISO/IEC 27001:2022 Lead Auditor',
      fullName: 'ISO/IEC 27001:2022 Lead Auditor',
      status: 'active',
      icon: <FaCertificate />
    },
    {
      name: 'CISA',
      fullName: 'Certified Information Systems Auditor',
      status: 'active',
      icon: <FaAward />
    },
    {
      name: 'Terraform Associate 003',
      fullName: 'HashiCorp Certified: Terraform Associate (003)',
      status: 'in-progress',
      date: '12/2025',
      icon: <FaClock />
    },
    {
      name: 'PCIP',
      fullName: 'Payment Card Industry Professional',
      status: 'in-progress',
      date: '01/2026',
      icon: <FaClock />
    },
    {
      name: 'AZ-104',
      fullName: 'Azure Administrator Associate',
      status: 'in-progress',
      date: '04/2026',
      icon: <FaClock />
    },
    {
      name: 'AZ-500',
      fullName: 'Azure Security Engineer Associate',
      status: 'in-progress',
      date: '05/2026',
      icon: <FaClock />
    },
    {
      name: 'AZ-400',
      fullName: 'Microsoft Azure DevOps Solutions',
      status: 'in-progress',
      date: '06/2026',
      icon: <FaClock />
    }
  ]

  const activeCerts = certifications.filter(cert => cert.status === 'active')
  const upcomingCerts = certifications.filter(cert => cert.status === 'in-progress')

  return (
    <section id="certifications" className="section certifications-section">
      <div className="container">
        <h2 className="section-title">Professional Certifications</h2>
        
        <div className="cert-category">
          <h3 className="cert-category-title">Active Certifications</h3>
          <div className="certifications-grid">
            {activeCerts.map((cert, index) => (
              <div key={index} className="cert-card card">
                <div className="cert-icon">{cert.icon}</div>
                <h4 className="cert-name">{cert.name}</h4>
                <p className="cert-full-name">{cert.fullName}</p>
                <span className="cert-badge active">Active</span>
              </div>
            ))}
          </div>
        </div>

        <div className="cert-category">
          <h3 className="cert-category-title">In Progress</h3>
          <div className="certifications-grid">
            {upcomingCerts.map((cert, index) => (
              <div key={index} className="cert-card card in-progress">
                <div className="cert-icon">{cert.icon}</div>
                <h4 className="cert-name">{cert.name}</h4>
                <p className="cert-full-name">{cert.fullName}</p>
                <span className="cert-badge upcoming">Expected: {cert.date}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="cert-commitment">
          <p>Committed to continuous learning and professional development in cybersecurity, governance, risk, and compliance.</p>
        </div>
      </div>
    </section>
  )
}

export default Certifications
