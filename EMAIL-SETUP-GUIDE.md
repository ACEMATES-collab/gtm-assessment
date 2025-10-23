# 📧 COMPLETE EMAIL SETUP GUIDE FOR GTM ASSESSMENT

## How It Works

When someone completes the assessment:
1. **Admin Email** → info@acemates.org receives full report with all answers
2. **Candidate Email** → Participant receives confirmation with their score

---

## 🎯 Email Setup Options

### Option 1: Resend (Recommended - Easiest)

**Pros:**
- ✅ Easy to set up (5 minutes)
- ✅ Free tier: 3,000 emails/month
- ✅ Great deliverability
- ✅ Simple API
- ✅ Domain verification included

**Setup Steps:**

1. **Create Resend Account**
   - Go to https://resend.com
   - Sign up with your email
   - Free plan is sufficient to start

2. **Verify Your Domain (acemates.org)**
   - In Resend dashboard, go to "Domains"
   - Click "Add Domain"
   - Enter: `acemates.org`
   - Add these DNS records (in your domain registrar):
     ```
     Type: TXT
     Name: @ (or acemates.org)
     Value: [Resend will provide this]
     
     Type: MX
     Name: @ (or acemates.org)
     Priority: 10
     Value: [Resend will provide this]
     ```
   - Wait for verification (usually 5-10 minutes)
   - Once verified, you can send from any @acemates.org email

3. **Create API Key**
   - Go to "API Keys" section
   - Click "Create API Key"
   - Name it: "GTM Assessment"
   - Copy the key (starts with `re_`)
   - Save it securely!

4. **Use the API Key**
   - In Vercel: Add as environment variable `RESEND_API_KEY`
   - Or locally: Add to `.env.local` file

**Cost:**
- Free: 3,000 emails/month
- Pro: $20/month for 50,000 emails

---

### Option 2: SendGrid

**Pros:**
- ✅ Free tier: 100 emails/day
- ✅ Well-established service
- ✅ Good documentation

**Setup Steps:**

1. Create account at https://sendgrid.com
2. Verify domain
3. Create API key
4. Update `/pages/api/submit-assessment.js`:

```javascript
// Replace Resend import with:
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Replace email sending code with:
await sgMail.send({
  to: 'info@acemates.org',
  from: 'noreply@acemates.org',
  subject: `New GTM Assessment - ${candidateInfo.name}`,
  html: emailHtml,
});
```

**Cost:**
- Free: 100 emails/day
- Essentials: $19.95/month for 50,000 emails

---

### Option 3: Amazon SES

**Pros:**
- ✅ Very cheap ($0.10 per 1,000 emails)
- ✅ Highly scalable
- ✅ AWS integration

**Cons:**
- ⚠️ More complex setup
- ⚠️ Requires AWS account

**Cost:**
- $0.10 per 1,000 emails
- First 62,000 emails/month free if using EC2

---

### Option 4: EmailJS (For Testing Only)

**Pros:**
- ✅ Quick setup for testing
- ✅ No backend needed

**Cons:**
- ⚠️ Not secure for production
- ⚠️ Limited features

---

## 📝 Email Content Customization

### Changing Admin Email Address

To receive emails at a different address:

1. Open `/pages/api/submit-assessment.js`
2. Find this line:
```javascript
to: 'info@acemates.org',
```
3. Change to your email:
```javascript
to: 'yourname@yourdomain.com',
```

### Adding Multiple Recipients

To send to multiple people:

```javascript
to: ['info@acemates.org', 'manager@acemates.org', 'hr@acemates.org'],
```

### Customizing Email Templates

The HTML email templates are in `/pages/api/submit-assessment.js`:

**Admin Email Template:**
- Starts at line ~50
- Contains full assessment report
- Modify HTML/CSS as needed

**Candidate Email Template:**
- Starts at line ~150
- Contains score and thank you message
- Customize branding/messaging

---

## 🔧 Email Configuration in Code

### Current Setup (Resend):

```javascript
// In /pages/api/submit-assessment.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'GTM Assessment <noreply@acemates.org>',
  to: 'info@acemates.org',
  subject: `New GTM Assessment - ${candidateInfo.name}`,
  html: emailHtml,
});
```

### Email Includes:

**To Admin (info@acemates.org):**
- Candidate name, email, company, role
- Overall score and grade
- NLP quality analysis (5 dimensions)
- Section-by-section performance
- All detailed responses
- Submission timestamp

**To Candidate:**
- Thank you message
- Overall score and grade
- Contact information

---

## 🚨 Troubleshooting Email Issues

### Emails Not Being Received:

1. **Check Spam Folder**
   - Look in spam/junk for both admin and candidate

2. **Verify Domain in Resend**
   - Go to Resend dashboard
   - Check "Domains" section
   - Status should be "Verified"

3. **Check Resend Logs**
   - Go to "Logs" in Resend dashboard
   - Look for failed deliveries
   - Check error messages

4. **Verify API Key**
   - In Vercel environment variables
   - Make sure no spaces before/after key
   - Key should start with `re_`

5. **Test Email Manually**
   - Use Resend dashboard to send test email
   - Confirms your domain setup is correct

### Email Formatting Issues:

1. **Preview in Browser**
   - Copy HTML from email
   - Open in browser to see formatting

2. **Test with Different Email Clients**
   - Gmail, Outlook, Apple Mail all render differently
   - Use Litmus or Email on Acid for testing

### Deployment Issues:

1. **Environment Variable Not Set**
   - Check Vercel project settings
   - Redeploy after adding variable

2. **API Route Not Working**
   - Check Vercel function logs
   - Look for errors in API execution

---

## 📊 Email Deliverability Best Practices

1. **Domain Verification**
   - Always verify your sending domain
   - Adds SPF, DKIM, DMARC records
   - Improves deliverability

2. **From Address**
   - Use a real domain (@acemates.org)
   - Avoid generic addresses (@gmail.com)

3. **Email Content**
   - Avoid spam trigger words
   - Include unsubscribe option (if bulk)
   - Keep HTML clean and valid

4. **Sender Reputation**
   - Start with low volume
   - Gradually increase sending
   - Monitor bounce rates

---

## 💰 Cost Comparison

| Service | Free Tier | Paid Plans |
|---------|-----------|------------|
| **Resend** | 3,000/month | $20/mo (50k) |
| **SendGrid** | 100/day | $19.95/mo (50k) |
| **Amazon SES** | 62k/mo (with EC2) | $0.10/1000 |
| **Mailgun** | Trial only | $35/mo (50k) |

**Recommendation:** Start with Resend free tier (3,000/month = 100/day)

---

## 🔐 Security Best Practices

1. **Never Commit API Keys**
   - Use environment variables only
   - Add .env.local to .gitignore
   - Rotate keys periodically

2. **Validate Input**
   - Current code validates email format
   - Add rate limiting if needed

3. **Monitor Usage**
   - Check Resend dashboard regularly
   - Set up usage alerts
   - Watch for unusual activity

---

## 📈 Scaling Considerations

**For < 100 assessments/month:**
- Free tier is sufficient
- No changes needed

**For 100-3,000 assessments/month:**
- Resend free tier works perfectly
- Consider upgrading if approaching limit

**For > 3,000 assessments/month:**
- Upgrade to Resend Pro ($20/mo)
- Or switch to Amazon SES for cost savings

---

## ✅ Testing Checklist

Before going live:

- [ ] Test form submission locally
- [ ] Verify admin email arrives at info@acemates.org
- [ ] Check candidate confirmation email
- [ ] Test on mobile device
- [ ] Verify all data appears correctly in emails
- [ ] Check spam folders
- [ ] Test with different email providers (Gmail, Outlook, etc.)
- [ ] Verify NLP analysis appears in report
- [ ] Test with incomplete assessment
- [ ] Check all links work in emails

---

## 🆘 Support Resources

**Resend:**
- Docs: https://resend.com/docs
- Status: https://status.resend.com
- Support: support@resend.com

**Vercel:**
- Docs: https://vercel.com/docs
- Support: https://vercel.com/support

**Project Support:**
- Email: info@acemates.org

---

## 🎉 You're All Set!

Once configured:
1. Share your assessment link
2. Candidates fill it out
3. You receive detailed reports at info@acemates.org
4. Candidates get confirmation emails
5. All data is automatically analyzed and formatted

No manual work required! 🚀
