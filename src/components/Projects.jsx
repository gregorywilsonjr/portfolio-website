import React from 'react'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import './Projects.css'

const Projects = () => {
  const projects = [
    {
      name: 'PCI DSS v4.0.1 Continuous Compliance Automation (AWS Lab)',
      description: 'End-to-end simulation of a PCI-compliant AWS environment using Terraform, AWS Config, Security Hub, and automated evidence collection. Demonstrates Zero-Touch compliance monitoring, continuous evidence capture, and control mapping for PCI DSS Requirements 1, 2, 7, 8, 10, 11, and 12.',
      technologies: ['AWS Config', 'Security Hub', 'CloudTrail', 'EventBridge', 'Lambda', 'Terraform', 'Python'],
      github: 'https://github.com/gregorywilsonjr/aws-pci-continuous-compliance-lab',
      achievements: [
        'Automated validation of 80%+ PCI DSS controls via telemetry',
        'Reduced manual audit evidence prep time by 95%',
        'Created modular Terraform templates for infrastructure as code',
        'Implemented automated daily evidence snapshots to S3'
      ]
    },
    {
      name: 'Azure Mini Trust Center',
      description: 'Lightweight, serverless trust center dashboard for Azure that provides real-time compliance and security metrics. Features one-command Bicep deployment, cost-effective architecture (~$5-15/month), and comprehensive documentation for audit-ready compliance monitoring.',
      technologies: ['Azure Bicep', 'Azure Functions', 'Logic Apps', 'Azure Storage', 'PowerShell', 'JavaScript', 'Tenable.io API'],
      github: 'https://github.com/gregorywilsonjr/azure-mini-trust-center',
      achievements: [
        'Serverless architecture with real-time compliance monitoring',
        'One-command Bicep deployment for complete infrastructure',
        'Integrated Tenable.io vulnerability management',
        'Cost-effective solution under $15/month',
        'Production-ready with security best practices'
      ]
    },
    {
      name: 'Agentic AI Threat Hunter Lab (Azure)',
      description: 'Intelligent Security Operations Center (SOC) agent powered by OpenAI that performs automated threat hunting across Microsoft Defender for Endpoint, Azure Active Directory, and Azure resource logs. Autonomously detects threats, analyzes security events, and takes remediation actions like isolating compromised virtual machines.',
      technologies: ['Python', 'OpenAI GPT', 'Azure Log Analytics', 'Microsoft Defender for Endpoint', 'Azure CLI'],
      github: 'https://github.com/gregorywilsonjr/agentic_ai_threat_hunter_lab',
      achievements: [
        'AI-powered automated threat hunting using natural language queries',
        'MITRE ATT&CK framework mapping for detected threats',
        'Automated VM isolation via Microsoft Defender for Endpoint API',
        'Multi-source intelligence across 9+ Azure log tables',
        'Built-in security guardrails and cost management'
      ]
    },
    {
      name: 'Vulnerability Management Program Implementation (Azure + Tenable)',
      description: 'Simulation of a comprehensive vulnerability management program from inception to completion, including policy creation, stakeholder buy-in, and full-cycle remediation across organization-wide assets.',
      technologies: ['Azure VMs', 'Tenable Enterprise', 'PowerShell', 'BASH'],
      github: 'https://github.com/gregorywilsonjr/Vulnerability_Management_Program',
      achievements: [
        'Created formal vulnerability management policy with stakeholder buy-in',
        'Implemented full-cycle remediation process (discovery → assessment → remediation)',
        'Deployed Nessus scan engine and conducted organization-wide vulnerability scans',
        'Developed PowerShell and BASH scripts for automated remediation'
      ]
    }
  ]

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card card">
              <h3 className="project-name">{project.name}</h3>
              <p className="project-description">{project.description}</p>
              
              <div className="project-tech">
                <h4>Technologies Used:</h4>
                <div className="tech-tags">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>

              {project.achievements && project.achievements.length > 0 && (
                <div className="project-achievements">
                  <h4>Key Achievements:</h4>
                  <ul>
                    {project.achievements.map((achievement, idx) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="project-links">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                    <FaGithub /> View on GitHub
                  </a>
                )}
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link">
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="projects-footer">
          <p>More projects coming soon! Check my <a href="https://github.com/gregorywilsonjr" target="_blank" rel="noopener noreferrer">GitHub</a> for updates.</p>
        </div>
      </div>
    </section>
  )
}

export default Projects
