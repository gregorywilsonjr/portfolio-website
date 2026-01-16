# Gregory Wilson Jr. - Professional Portfolio
https://gregorywilsonjr.com/

A modern, professional portfolio website showcasing expertise in GRC Engineering, Cloud Security, and Compliance Automation.

## 🚀 Built With

- **React 18** - Modern UI library
- **Vite** - Fast build tool
- **React Icons** - Icon library
- **Custom CSS** - Black and red theme

## 🎨 Features

- Responsive design
- Smooth scrolling navigation
- Custom black (#000000) and red (#b30000) theme
- Professional sections: About, Skills, Projects, Certifications, Contact
- Optimized for performance
- SEO friendly

## 📦 Installation

```bash
npm install
```

## 🛠️ Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view in browser.

## 🏗️ Build

```bash
npm run build
```

Builds the app for production to the `dist` folder.

## 🌐 Deployment

This portfolio is designed to be deployed on AWS using:
- S3 for static hosting
- CloudFront for CDN
- Route 53 for DNS (optional)

See the `aws-deployment-kit-patreon/aws-deployment-kit` folder for deployment scripts and CloudFormation templates.

### Deploy to AWS:

```bash
# Build the project
npm run build

# Deploy using the deployment script
wsl ../aws-deployment-kit-patreon/aws-deployment-kit/scripts/deploy.sh <bucket-name> <distribution-id> z3r0
```

## 📝 License

© 2025 Gregory Wilson Jr. All rights reserved.

## 📧 Contact

- Email: contact@gregorywilsonjr.com
- LinkedIn: [gregorywilsonjr](https://www.linkedin.com/in/gregorywilsonjr)
- GitHub: [gregorywilsonjr](https://github.com/gregorywilsonjr)
