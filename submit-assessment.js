import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      candidateInfo,
      responses,
      overallScore,
      sectionScores,
      aggregateQuality,
      submittedAt
    } = req.body;

    // Format the email content
    const getGrade = (percentage) => {
      if (percentage >= 90) return 'A+';
      if (percentage >= 80) return 'A';
      if (percentage >= 70) return 'B';
      if (percentage >= 60) return 'C';
      if (percentage >= 50) return 'D';
      return 'F';
    };

    const grade = getGrade(overallScore.percentage);

    // Create HTML email content
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .header h1 { margin: 0; font-size: 28px; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
          .score-card { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          .score-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin: 20px 0; }
          .score-item { text-align: center; padding: 15px; background: #fff; border-radius: 8px; border: 2px solid #e2e8f0; }
          .score-item h3 { margin: 0 0 5px 0; font-size: 32px; color: #667eea; }
          .score-item p { margin: 0; font-size: 14px; color: #666; }
          .section-scores { margin: 20px 0; }
          .section-item { background: white; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #667eea; }
          .quality-metrics { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin: 20px 0; }
          .quality-item { padding: 10px; background: white; border-radius: 6px; text-align: center; }
          .responses-section { margin-top: 30px; }
          .response-item { background: white; padding: 15px; margin: 10px 0; border-radius: 8px; }
          .response-question { font-weight: bold; color: #667eea; margin-bottom: 8px; }
          .response-answer { color: #555; margin-left: 10px; }
          .footer { text-align: center; margin-top: 30px; padding: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎯 GTM Assessment Results</h1>
            <p>Comprehensive Performance Report</p>
          </div>
          
          <div class="content">
            <div class="score-card">
              <h2 style="margin-top: 0;">Candidate Information</h2>
              <p><strong>Name:</strong> ${candidateInfo.name}</p>
              <p><strong>Email:</strong> ${candidateInfo.email}</p>
              ${candidateInfo.company ? `<p><strong>Company:</strong> ${candidateInfo.company}</p>` : ''}
              ${candidateInfo.role ? `<p><strong>Role:</strong> ${candidateInfo.role}</p>` : ''}
              <p><strong>Submitted:</strong> ${new Date(submittedAt).toLocaleString()}</p>
            </div>

            <div class="score-grid">
              <div class="score-item">
                <h3>${overallScore.percentage.toFixed(1)}%</h3>
                <p>Overall Score</p>
              </div>
              <div class="score-item">
                <h3>${grade}</h3>
                <p>Grade</p>
              </div>
              <div class="score-item">
                <h3>${Object.keys(responses).length}/${Object.keys(responses).length + 25}</h3>
                <p>Questions Answered</p>
              </div>
            </div>

            ${aggregateQuality.count > 0 ? `
            <div class="score-card">
              <h2>Response Quality Analysis (NLP)</h2>
              <div class="quality-metrics">
                <div class="quality-item">
                  <strong>Specificity</strong><br/>
                  <span style="font-size: 24px; color: ${aggregateQuality.specificity >= 70 ? '#10b981' : aggregateQuality.specificity >= 50 ? '#f59e0b' : '#ef4444'}">
                    ${aggregateQuality.specificity.toFixed(0)}%
                  </span>
                </div>
                <div class="quality-item">
                  <strong>Data-Driven</strong><br/>
                  <span style="font-size: 24px; color: ${aggregateQuality.dataOriented >= 70 ? '#10b981' : aggregateQuality.dataOriented >= 50 ? '#f59e0b' : '#ef4444'}">
                    ${aggregateQuality.dataOriented.toFixed(0)}%
                  </span>
                </div>
                <div class="quality-item">
                  <strong>Actionability</strong><br/>
                  <span style="font-size: 24px; color: ${aggregateQuality.actionability >= 70 ? '#10b981' : aggregateQuality.actionability >= 50 ? '#f59e0b' : '#ef4444'}">
                    ${aggregateQuality.actionability.toFixed(0)}%
                  </span>
                </div>
                <div class="quality-item">
                  <strong>Strategic Depth</strong><br/>
                  <span style="font-size: 24px; color: ${aggregateQuality.strategicDepth >= 70 ? '#10b981' : aggregateQuality.strategicDepth >= 50 ? '#f59e0b' : '#ef4444'}">
                    ${aggregateQuality.strategicDepth.toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
            ` : ''}

            <div class="section-scores">
              <h2>Section Performance</h2>
              ${Object.entries(sectionScores).map(([section, data]) => `
                <div class="section-item">
                  <strong>${section}</strong>
                  <p style="margin: 5px 0;">
                    Score: ${data.percentage.toFixed(1)}% | 
                    Answered: ${data.answered}/${data.total} questions
                  </p>
                </div>
              `).join('')}
            </div>

            <div class="responses-section">
              <h2>Detailed Responses</h2>
              ${Object.entries(responses).map(([questionId, answer]) => {
                // Format answer based on type
                let formattedAnswer = '';
                if (Array.isArray(answer)) {
                  formattedAnswer = answer.join(', ');
                } else if (typeof answer === 'object') {
                  formattedAnswer = `${answer.primary}${answer.followUp ? ' - ' + (Array.isArray(answer.followUp) ? answer.followUp.join(', ') : answer.followUp) : ''}`;
                } else {
                  formattedAnswer = answer;
                }
                
                return `
                  <div class="response-item">
                    <div class="response-question">Q${questionId}</div>
                    <div class="response-answer">${formattedAnswer}</div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <div class="footer">
            <p>This assessment was completed using the GTM Assessment Tool</p>
            <p>© ${new Date().getFullYear()} Acemates - All rights reserved</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email to admin (info@acemates.org)
    await resend.emails.send({
      from: 'GTM Assessment <noreply@acemates.org>',
      to: 'info@acemates.org',
      subject: `New GTM Assessment Submission - ${candidateInfo.name}`,
      html: emailHtml,
    });

    // Send confirmation email to candidate
    const candidateEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
          .score-card { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; text-align: center; }
          .score { font-size: 48px; font-weight: bold; color: #667eea; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You for Completing the Assessment! 🎉</h1>
          </div>
          
          <div class="content">
            <p>Hi ${candidateInfo.name},</p>
            
            <p>Thank you for completing the GTM Assessment. Your results have been successfully submitted.</p>

            <div class="score-card">
              <h2>Your Overall Score</h2>
              <div class="score">${overallScore.percentage.toFixed(1)}%</div>
              <p>Grade: <strong>${grade}</strong></p>
            </div>

            <p>Our team at Acemates will review your assessment and get back to you shortly with personalized feedback and recommendations.</p>

            <p>If you have any questions, feel free to reach out to us at info@acemates.org</p>

            <p>Best regards,<br/>The Acemates Team</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await resend.emails.send({
      from: 'GTM Assessment <noreply@acemates.org>',
      to: candidateInfo.email,
      subject: 'Your GTM Assessment Results',
      html: candidateEmailHtml,
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Assessment submitted successfully' 
    });

  } catch (error) {
    console.error('Error submitting assessment:', error);
    return res.status(500).json({ 
      error: 'Failed to submit assessment',
      details: error.message 
    });
  }
}
