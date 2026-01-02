import React from 'react'
import { FaCloud, FaShieldAlt, FaCode, FaServer, FaChartLine, FaRobot } from 'react-icons/fa'
import './Skills.css'

const Skills = () => {
  const skillCategories = [
    {
      icon: <FaCloud />,
      title: 'Cloud Platforms',
      skills: ['Azure (primary)', 'AWS (proficiency)', 'Multi-cloud Architecture']
    },
    {
      icon: <FaCode />,
      title: 'DevOps & IaC',
      skills: [
        'Git/GitHub, GitLab CI, GitHub Actions',
        'Terraform & CloudFormation',
        'Docker & Kubernetes (+Helm)',
        'Jenkins (CI/CD)'
      ]
    },
    {
      icon: <FaShieldAlt />,
      title: 'Cloud Security & Identity',
      skills: [
        'IAM (users/roles/policies)',
        'KMS (encryption)',
        'GuardDuty, Security Hub',
        'CloudTrail, AWS Config',
        'WAF, Secrets Manager'
      ]
    },
    {
      icon: <FaRobot />,
      title: 'Compliance Automation',
      skills: [
        'PCI DSS v4.0.1 control mapping',
        'Evidence collection automation',
        'Policy-as-code (OPA/Conftest)',
        'Drift detection & guardrails',
        'Audit-ready reporting'
      ]
    },
    {
      icon: <FaChartLine />,
      title: 'Observability & Reliability',
      skills: [
        'CloudWatch metrics/logs/alarms',
        'EventBridge',
        'Prometheus/Grafana',
        'Runbooks & SLOs'
      ]
    },
    {
      icon: <FaServer />,
      title: 'Data & Scripting',
      skills: [
        'Python, Bash, PowerShell',
        'SQL for reporting/queries',
        'SAST/DAST integration',
        'Container image scanning'
      ]
    }
  ]

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <h2 className="section-title">Skills & Expertise</h2>
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-category card">
              <div className="skill-icon">{category.icon}</div>
              <h3 className="skill-title">{category.title}</h3>
              <ul className="skill-list">
                {category.skills.map((skill, idx) => (
                  <li key={idx}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="skills-progress">
          <h3 className="progress-title">What I'm Adding Next</h3>
          <div className="progress-card card">
            <ul>
              <li>Automated POA&M generation from vuln scans based on PCI DSS Reqs 6 & 11 (e.g., Nessus → CSV → workbook)</li>
              <li>Multi-account AWS governance with OPA/Conftest or AWS Config Packs</li>
              <li>End-to-end CI/CD reference pipeline with security gates (SAST/DAST/image scan)</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
