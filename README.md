# GTM Assessment Tool - Deployment Guide

## 🚀 Complete Setup & Deployment Instructions

This is a Next.js-based GTM Assessment Tool with AI-powered NLP quality analysis that automatically sends results to **info@acemates.org**.

---

## 📋 Prerequisites

1. **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
2. **Resend Account** (for email sending) - [Sign up free](https://resend.com)
3. **Vercel Account** (for deployment) - [Sign up free](https://vercel.com)

---

## 🔧 Step 1: Get Your Resend API Key

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. **Verify your domain (acemates.org):**
   - Go to **Domains** in Resend dashboard
   - Add your domain: `acemates.org`
   - Follow DNS verification instructions
   - Once verified, you can send emails from `@acemates.org`

4. **Create an API Key:**
   - Go to **API Keys** section
   - Click "Create API Key"
   - Give it a name like "GTM Assessment"
   - Copy the API key (starts with `re_`)

> **Note:** Without domain verification, emails will be sent from Resend's sandbox domain. You can still test, but for production, verify your domain.

---

## 💻 Step 2: Local Development Setup

### Option A: Download and Setup Locally

1. **Download the project files** to your computer

2. **Open terminal/command prompt** in the project folder

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Create environment file:**
   - Copy `.env.local.example` to `.env.local`
   - Or create a new file named `.env.local`
   - Add your Resend API key:
   ```
   RESEND_API_KEY=re_your_actual_api_key_here
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

6. **Open your browser:**
   - Go to `http://localhost:3000`
   - Test the assessment tool
   - Fill out a test assessment
   - Check if email arrives at info@acemates.org

---

## 🌐 Step 3: Deploy to Vercel (Recommended)

### Method A: Deploy via Vercel Dashboard (Easiest)

1. **Push code to GitHub:**
   - Create a new repository on GitHub
   - Push all files to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [https://vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Add Environment Variable:**
   - In project settings, go to "Environment Variables"
   - Add variable:
     - Name: `RESEND_API_KEY`
     - Value: Your Resend API key
   - Click "Add"

4. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your app will be live at `https://your-project-name.vercel.app`

### Method B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts and add your RESEND_API_KEY when asked
```

---

## 🔗 Step 4: Share Your Assessment Link

Once deployed, share your link:
- **Your Live URL:** `https://your-project-name.vercel.app`
- Share this link with anyone who needs to take the assessment
- Results will automatically be sent to **info@acemates.org**

---

## 📧 Email Configuration

### Emails Sent:

1. **To info@acemates.org:**
   - Complete assessment results
   - Candidate information
   - NLP quality analysis
   - All responses in detail

2. **To Candidate:**
   - Confirmation email
   - Overall score and grade
   - Thank you message

### Customizing Email Recipients:

To change the admin email from `info@acemates.org` to another address:

1. Open `/pages/api/submit-assessment.js`
2. Find line with `to: 'info@acemates.org'`
3. Change to your desired email
4. Redeploy

---

## 🎨 Customization Options

### Change Branding:

1. **Edit `/pages/index.js`:**
   - Update assessment title
   - Modify header text
   - Change color scheme

2. **Update Email Templates:**
   - Edit `/pages/api/submit-assessment.js`
   - Modify HTML email templates
   - Customize branding elements

### Add Custom Questions:

1. Open `/pages/index.js`
2. Find the `questions` array
3. Add new question objects following the existing format
4. Deploy changes

---

## 🔒 Environment Variables

Required environment variable:

```
RESEND_API_KEY=your_resend_api_key
```

### Setting Environment Variables:

**Vercel:**
1. Go to Project Settings → Environment Variables
2. Add `RESEND_API_KEY`
3. Redeploy

**Local Development:**
1. Create `.env.local` file
2. Add `RESEND_API_KEY=your_key`
3. Restart dev server

---

## 🐛 Troubleshooting

### Emails Not Sending:

1. **Check Resend Dashboard:**
   - Go to Logs section
   - Look for failed email attempts
   - Check error messages

2. **Verify Domain:**
   - Ensure acemates.org is verified in Resend
   - Check DNS records are correct

3. **Check API Key:**
   - Make sure key is correctly set in Vercel
   - No spaces before/after the key
   - Key starts with `re_`

### Deployment Fails:

1. **Check Build Logs:**
   - Look at Vercel deployment logs
   - Check for missing dependencies

2. **Clear Cache:**
   ```bash
   rm -rf .next node_modules
   npm install
   npm run build
   ```

### Assessment Not Loading:

1. Check browser console for errors
2. Verify all files are uploaded
3. Clear browser cache
4. Try in incognito mode

---

## 📊 Features

✅ **25+ Comprehensive Questions** covering GTM strategy
✅ **AI-Powered NLP Analysis** with 5 quality dimensions:
   - Specificity
   - Data-Driven Approach
   - Actionability  
   - Strategic Depth
   - Concreteness

✅ **Real-Time Feedback** as users answer
✅ **Automated Email Reports** to admin and candidate
✅ **Professional Grading** (A+ to F scale)
✅ **Responsive Design** works on all devices
✅ **Section-Based Navigation** for better UX

---

## 🆘 Support

For issues or questions:
- Email: info@acemates.org
- Check Vercel deployment logs
- Review Resend email logs
- Check browser console for errors

---

## 📝 File Structure

```
gtm-assessment-app/
├── pages/
│   ├── index.js              # Main assessment component
│   ├── _app.js              # Next.js app wrapper
│   └── api/
│       └── submit-assessment.js  # Email API endpoint
├── styles/
│   └── globals.css          # Tailwind CSS styles
├── package.json             # Dependencies
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind configuration
├── postcss.config.js        # PostCSS configuration
├── .env.local.example       # Environment template
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

---

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Run locally
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Deploy to Vercel
vercel
```

---

## 📄 License

© 2024 Acemates - All rights reserved

---

## ✨ Next Steps After Deployment

1. ✅ Test the assessment yourself
2. ✅ Verify emails arrive at info@acemates.org  
3. ✅ Share the link with your team
4. ✅ Monitor responses in your email
5. ✅ Customize as needed

Your GTM Assessment Tool is now live and ready to use! 🎉
