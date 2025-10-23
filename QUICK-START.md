# 🚀 QUICK DEPLOYMENT GUIDE

## Get Your Assessment Live in 15 Minutes!

### Step 1: Get Resend API Key (5 minutes)
1. Go to https://resend.com
2. Sign up (free)
3. Verify your domain acemates.org (or use sandbox for testing)
4. Create API key
5. Copy the key (starts with re_)

### Step 2: Deploy to Vercel (10 minutes)

#### Option A: Via GitHub (Recommended)
1. Create GitHub account if needed
2. Create new repository
3. Upload all project files
4. Go to https://vercel.com
5. Click "New Project"
6. Import your GitHub repo
7. Add Environment Variable:
   - Name: RESEND_API_KEY
   - Value: (paste your key)
8. Click Deploy
9. Done! Get your live URL

#### Option B: Via Vercel CLI
```bash
npm install -g vercel
cd gtm-assessment-app
vercel
# Follow prompts, add RESEND_API_KEY
```

### Step 3: Share Your Link
Your assessment is now live at: `https://your-project.vercel.app`

---

## Alternative: Deploy to Other Platforms

### Netlify:
1. Go to https://netlify.com
2. Drag & drop the gtm-assessment-app folder
3. Add environment variable: RESEND_API_KEY
4. Done!

### Railway:
1. Go to https://railway.app
2. Connect GitHub repo
3. Add RESEND_API_KEY in variables
4. Deploy!

---

## Testing Your Deployment

1. Open your live URL
2. Fill out a test assessment
3. Check info@acemates.org for the email
4. Check candidate's email for confirmation

---

## Important Notes

✅ **Free Tier:** Both Vercel and Resend have generous free tiers
✅ **Custom Domain:** You can add acemates.org to Vercel after deployment
✅ **Email Limits:** Resend free tier: 3,000 emails/month
✅ **Security:** Never commit your .env.local file to GitHub

---

## Need Help?

Email: info@acemates.org

Common Issues:
- Emails not sending? Check Resend dashboard logs
- Deployment failed? Check build logs in Vercel
- 404 error? Make sure all files are uploaded

---

## Your Live Assessment Link Format

After deployment, share this link:
```
https://your-chosen-name.vercel.app
```

Anyone with this link can take the assessment!
Results automatically go to info@acemates.org 📧
