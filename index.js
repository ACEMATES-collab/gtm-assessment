import React, { useState } from 'react';
import { CheckCircle, AlertCircle, TrendingUp, Award } from 'lucide-react';

export default function GTMAssessment() {
  const [responses, setResponses] = useState({});
  const [currentSection, setCurrentSection] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [candidateInfo, setCandidateInfo] = useState({
    name: '',
    email: '',
    company: '',
    role: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const questions = [
    {
      id: 9,
      section: "Company & ICP Profile",
      question: "What industry does your company belong to?",
      type: "text",
      placeholder: "e.g., SaaS, FinTech, Healthcare, Manufacturing...",
      weight: 5,
      scoringCriteria: { minLength: 10, keywords: ['industry', 'sector', 'vertical'] }
    },
    {
      id: 11,
      section: "Company & ICP Profile",
      question: "What is the management level of your buyer(s)?",
      type: "multiselect",
      options: ["C-Level", "VP Level", "Director Level", "Manager Level", "Individual Contributor"],
      weight: 5
    },
    {
      id: 12,
      section: "Company & ICP Profile",
      question: "What Department(s) and Job Function(s) do you sell to?",
      type: "text",
      placeholder: "e.g., Sales, Marketing, IT, Operations, Finance...",
      weight: 6,
      scoringCriteria: { minLength: 20, requiresMultiple: true }
    },
    {
      id: 13,
      section: "Company & ICP Profile",
      question: "Which Industries do you sell to?",
      type: "text",
      placeholder: "List the industries you target...",
      weight: 6,
      scoringCriteria: { minLength: 20, requiresMultiple: true }
    },
    {
      id: 14,
      section: "Company & ICP Profile",
      question: "What location(s) do you sell in?",
      type: "text",
      placeholder: "e.g., North America, EMEA, APAC, specific countries...",
      weight: 5,
      scoringCriteria: { minLength: 15 }
    },
    {
      id: 15,
      section: "Company & ICP Profile",
      question: "What is the company size you sell to?",
      type: "multiselect",
      options: ["1-10 employees", "11-50 employees", "51-200 employees", "201-500 employees", "501-1000 employees", "1000+ employees"],
      weight: 5
    },
    {
      id: 16,
      section: "Company & ICP Profile",
      question: "What is the typical annual revenue run rate (ARR) of your ICP?",
      type: "text",
      placeholder: "e.g., $1M-$5M, $5M-$20M...",
      weight: 6,
      scoringCriteria: { minLength: 10 }
    },
    {
      id: 7,
      section: "Channels & Acquisition",
      question: "What are the best channels to get these clients today for you?",
      type: "text",
      placeholder: "e.g., LinkedIn, Cold Email, Referrals, Events, Content Marketing...",
      weight: 8,
      scoringCriteria: { minLength: 30, requiresMultiple: true }
    },
    {
      id: 18,
      section: "Channels & Acquisition",
      question: "Can you list 5 names of your typical clients that are most similar to your ICP?",
      type: "textarea",
      placeholder: "List 5 client names...",
      weight: 7,
      scoringCriteria: { minLength: 30, requiresCount: 5 }
    },
    {
      id: 19,
      section: "Buyer Journey",
      question: "What is your ICP's typical buying journey? Are there any patterns across your clients in their respective buyer journeys?",
      type: "textarea",
      placeholder: "Describe the typical steps, timeline, decision-makers involved...",
      weight: 10,
      scoringCriteria: { minLength: 100, keywords: ['stage', 'process', 'timeline', 'decision'] }
    },
    {
      id: 20,
      section: "Lead Sources",
      question: "Forums, Channels or Groups where you have gotten relevant leads from in the past",
      type: "textarea",
      placeholder: "List specific forums, Slack groups, LinkedIn groups, etc...",
      weight: 7,
      scoringCriteria: { minLength: 40, requiresMultiple: true }
    },
    {
      id: 21,
      section: "Lead Sources",
      question: "How do your potential customers express their problems in social groups related to your products or services?",
      type: "textarea",
      placeholder: "Describe the language, pain points, and questions they use...",
      weight: 8,
      scoringCriteria: { minLength: 80, keywords: ['pain', 'problem', 'challenge', 'need'] }
    },
    {
      id: 22,
      section: "Lead Sources",
      question: "Websites / Forums from where you have got leads in the past",
      type: "textarea",
      placeholder: "List specific websites and URLs...",
      weight: 6,
      scoringCriteria: { minLength: 30 }
    },
    {
      id: 23,
      section: "SEO & Search",
      question: "Please give a list of keywords that you optimize for getting SEO traffic",
      type: "textarea",
      placeholder: "List your target keywords...",
      weight: 6,
      scoringCriteria: { minLength: 40, requiresMultiple: true }
    },
    {
      id: 24,
      section: "SEO & Search",
      question: "Please give a couple of sample search queries that you use on LinkedIn or Google to find your prospects",
      type: "textarea",
      placeholder: "e.g., 'VP Sales SaaS company 50-200 employees'",
      weight: 7,
      scoringCriteria: { minLength: 50, requiresCount: 2 }
    },
    {
      id: 25,
      section: "Buying Triggers",
      question: "Company raising money or getting funded - is it a good trigger for you?",
      subtext: "With money in the bank, recently funded companies typically spend to ensure rapid growth",
      type: "conditional",
      options: ["Yes", "No"],
      followUp: {
        question: "What is the funding stage?",
        type: "multiselect",
        options: ["Pre-Seed", "Seed", "Series A", "Series B", "Series C+"]
      },
      weight: 6
    },
    {
      id: 26,
      section: "Buying Triggers",
      question: "Company hiring - is it a good trigger for you?",
      subtext: "If the company is hiring for job roles that might need your product, then it might be a good trigger",
      type: "conditional",
      options: ["Yes", "No"],
      followUp: {
        question: "What roles is a good trigger?",
        type: "text",
        placeholder: "e.g., Sales Development Reps, Marketing Manager..."
      },
      weight: 6
    },
    {
      id: 27,
      section: "Buying Triggers",
      question: "Company expanding into a new geography or launching a new product or service - Is it a good trigger for you?",
      subtext: "If the company is expanding, or launching something new, it may require your services",
      type: "conditional",
      options: ["Yes", "No"],
      followUp: {
        question: "Can you give examples of your prospects' expansion or launches that led you to get new business in the past?",
        type: "textarea",
        placeholder: "Provide specific examples..."
      },
      weight: 7
    },
    {
      id: 28,
      section: "Buying Triggers",
      question: "Internal champion moving out - is it a good trigger for you?",
      type: "conditional",
      options: ["Yes", "No"],
      followUp: {
        question: "Please share a few LinkedIn URLs of your current champions that you want to track",
        type: "textarea",
        placeholder: "Paste LinkedIn profile URLs..."
      },
      weight: 5
    },
    {
      id: 29,
      section: "Product & Competition",
      question: "Are there any complementary products or services that your prospects use that increases your chances of closing a deal?",
      subtext: "e.g., For security and pen testing companies, compliance platforms are very complementary",
      type: "conditional",
      options: ["Yes", "No"],
      followUp: {
        question: "Can you give examples of such complementary products/services in your business?",
        type: "textarea",
        placeholder: "List complementary products and explain why..."
      },
      weight: 7
    },
    {
      id: 30,
      section: "Product & Competition",
      question: "Are there any competing or complementary networks that your prospects might be part of?",
      type: "conditional",
      options: ["Yes", "No"],
      followUp: {
        question: "Can you give some examples of such networks where your prospects might aggregate?",
        type: "textarea",
        placeholder: "e.g., industry associations, professional networks..."
      },
      weight: 6
    },
    {
      id: 31,
      section: "Product & Competition",
      question: "Companies evaluating or starting to use your competition - Is it a good trigger for you?",
      type: "conditional",
      options: ["Yes", "No"],
      followUp: {
        question: "Please give a list of competitors that you want to track (names and websites, especially those that are declining)",
        type: "textarea",
        placeholder: "List competitor names and websites..."
      },
      weight: 8
    },
    {
      id: 32,
      section: "Reviews & Reputation",
      question: "Your Product/Service getting a positive or negative review - Is it a good trigger for you?",
      type: "conditional",
      options: ["Yes", "No"],
      followUp: {
        question: "Are there any specific websites/apps/forums where you get reviews from your customers today?",
        type: "text",
        placeholder: "e.g., G2, Capterra, TrustPilot..."
      },
      weight: 6
    },
    {
      id: 33,
      section: "Additional Triggers",
      question: "Are any of these relevant triggers as well?",
      type: "multiselect",
      options: [
        "Companies undergoing rapid revenue or client growth",
        "Companies undergoing Merger or Acquisition",
        "Companies announcing new partnerships",
        "Companies cutting costs",
        "Companies getting awards or recognition",
        "Companies experiencing changes in web traffic",
        "Companies that have experienced a recent IT Security Incident",
        "Job changes of key personnel in existing Client companies (Promotions, Transfers)",
        "Government Tenders and 3rd party enterprise RFPs",
        "Companies experiencing litigation and legal disputes",
        "Companies going through industry specific audits and penalties",
        "Regulatory/Legislation changes in your industry"
      ],
      weight: 8
    },
    {
      id: 34,
      section: "Additional Triggers",
      question: "Are there any other offline triggers that you can think of that can help you identify prospects who might be in the market?",
      type: "textarea",
      placeholder: "Describe any other triggers, events, or signals...",
      weight: 6,
      scoringCriteria: { minLength: 50 }
    }
  ];

  const sections = [...new Set(questions.map(q => q.section))];

  // NLP Analysis Function
  const analyzeTextQuality = (text) => {
    const analysis = {
      specificity: 0,
      actionability: 0,
      dataOriented: 0,
      strategicDepth: 0,
      concreteness: 0,
      insights: []
    };

    if (!text || text.length === 0) return analysis;

    const lowerText = text.toLowerCase();
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
    const words = text.split(/\s+/).filter(w => w.length > 0);

    // Specificity patterns
    const specificityPatterns = {
      numbers: /\b\d+[\d,]*\.?\d*%?\b/g,
      dollarAmounts: /\$[\d,]+\.?\d*/g,
      percentages: /\d+%/g,
      timeframes: /\b(month|quarter|year|week|day)s?\b/gi,
      companyNames: /\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*(?:\s+(?:Inc|LLC|Corp|Ltd|Co))?\b/g,
      urls: /https?:\/\/[^\s]+/g,
      emails: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g
    };

    let specificityScore = 0;
    Object.entries(specificityPatterns).forEach(([key, pattern]) => {
      const matches = text.match(pattern);
      if (matches) {
        specificityScore += matches.length * 0.15;
        if (key === 'numbers' || key === 'percentages') {
          analysis.insights.push(`✓ Includes quantifiable metrics (${matches.length})`);
        }
      }
    });
    analysis.specificity = Math.min(specificityScore, 1);

    // Data-oriented keywords
    const dataKeywords = [
      'metric', 'kpi', 'roi', 'conversion', 'revenue', 'growth', 'rate',
      'average', 'median', 'total', 'sum', 'increase', 'decrease',
      'analytics', 'data', 'measure', 'track', 'monitor', 'benchmark'
    ];
    const dataMatches = dataKeywords.filter(kw => lowerText.includes(kw)).length;
    analysis.dataOriented = Math.min(dataMatches / 5, 1);
    if (dataMatches >= 2) {
      analysis.insights.push('✓ Data-driven approach mentioned');
    }

    // Actionability patterns
    const actionPatterns = [
      /\b(we|i|our team)\s+(use|implement|track|monitor|measure|analyze|test|optimize|target|focus|prioritize)/gi,
      /\b(strategy|approach|method|process|system|framework|plan)\b/gi,
      /\b(will|would|can|should)\s+\w+/gi
    ];
    let actionMatches = 0;
    actionPatterns.forEach(pattern => {
      const matches = text.match(pattern);
      if (matches) actionMatches += matches.length;
    });
    analysis.actionability = Math.min(actionMatches / 3, 1);
    if (actionMatches >= 2) {
      analysis.insights.push('✓ Action-oriented response');
    }

    // Strategic depth patterns
    const strategicPatterns = [
      /\b(because|since|due to|as a result|therefore|thus|consequently|leads to|results in)\b/gi,
      /\b(strategy|strategic|goal|objective|vision|mission|purpose)\b/gi,
      /\b(opportunity|challenge|threat|risk|advantage|competitive)\b/gi,
      /\b(if|when|then|while|unless)\b/gi
    ];
    let strategicMatches = 0;
    strategicPatterns.forEach(pattern => {
      const matches = text.match(pattern);
      if (matches) strategicMatches += matches.length;
    });
    analysis.strategicDepth = Math.min(strategicMatches / 4, 1);
    if (strategicMatches >= 3) {
      analysis.insights.push('✓ Strategic thinking demonstrated');
    }

    // Concreteness patterns
    const examplePatterns = [
      /\b(for example|for instance|such as|like|including|e\.g\.|i\.e\.)\b/gi,
      /\b(specifically|particularly|especially|notably)\b/gi,
      /\b(case|example|instance|scenario|situation)\b/gi
    ];
    let concreteMatches = 0;
    examplePatterns.forEach(pattern => {
      const matches = text.match(pattern);
      if (matches) concreteMatches += matches.length;
    });
    analysis.concreteness = Math.min(concreteMatches / 2, 1);
    if (concreteMatches >= 1) {
      analysis.insights.push('✓ Concrete examples provided');
    }

    if (sentences.length >= 3) {
      analysis.insights.push('✓ Well-structured response');
    }
    if (words.length >= 50) {
      analysis.insights.push('✓ Comprehensive detail');
    }

    const vagueTerms = ['things', 'stuff', 'various', 'some', 'many', 'often', 'usually', 'generally'];
    const vagueCount = vagueTerms.filter(term => lowerText.includes(term)).length;
    if (vagueCount > 3) {
      analysis.insights.push('⚠ Consider being more specific');
    }

    return analysis;
  };

  const scoreResponse = (question, response) => {
    if (!response || (Array.isArray(response) && response.length === 0)) {
      return { score: 0, analysis: null };
    }

    const { type, weight, scoringCriteria } = question;
    let score = 0;
    const maxScore = weight * 10;
    let textAnalysis = null;

    score += maxScore * 0.2;

    if (type === 'text' || type === 'textarea') {
      const text = response.toString();
      const length = text.length;

      textAnalysis = analyzeTextQuality(text);

      if (scoringCriteria?.minLength) {
        const lengthScore = Math.min(length / scoringCriteria.minLength, 1);
        score += maxScore * 0.15 * lengthScore;
      }

      if (scoringCriteria?.requiresMultiple) {
        const items = text.split(/[,;\n]/).filter(item => item.trim().length > 2);
        const multipleScore = Math.min(items.length / 3, 1);
        score += maxScore * 0.1 * multipleScore;
      }

      if (scoringCriteria?.requiresCount) {
        const items = text.split(/[,;\n]/).filter(item => item.trim().length > 2);
        const countScore = Math.min(items.length / scoringCriteria.requiresCount, 1);
        score += maxScore * 0.1 * countScore;
      }

      if (scoringCriteria?.keywords) {
        const lowerText = text.toLowerCase();
        const keywordMatches = scoringCriteria.keywords.filter(kw => 
          lowerText.includes(kw.toLowerCase())
        ).length;
        const keywordScore = keywordMatches / scoringCriteria.keywords.length;
        score += maxScore * 0.1 * keywordScore;
      }

      const nlpScore = (
        textAnalysis.specificity * 0.25 +
        textAnalysis.dataOriented * 0.2 +
        textAnalysis.actionability * 0.2 +
        textAnalysis.strategicDepth * 0.2 +
        textAnalysis.concreteness * 0.15
      );
      score += maxScore * 0.35 * nlpScore;

    } else if (type === 'multiselect') {
      const selections = Array.isArray(response) ? response : [];
      const selectionScore = Math.min(selections.length / 2, 1);
      score += maxScore * 0.8 * selectionScore;
    } else if (type === 'conditional') {
      if (response.primary === 'Yes') {
        score += maxScore * 0.2;
        if (response.followUp) {
          const followUpText = response.followUp.toString();
          if (followUpText.length > 20) {
            textAnalysis = analyzeTextQuality(followUpText);
            const followUpLength = followUpText.length;
            const lengthScore = Math.min(followUpLength / 50, 1);
            
            const nlpScore = (
              textAnalysis.specificity * 0.3 +
              textAnalysis.concreteness * 0.3 +
              textAnalysis.actionability * 0.2 +
              textAnalysis.dataOriented * 0.2
            );
            
            score += maxScore * 0.3 * lengthScore;
            score += maxScore * 0.3 * nlpScore;
          }
        }
      } else {
        score += maxScore * 0.6;
      }
    }

    return { score: Math.min(score, maxScore), analysis: textAnalysis };
  };

  const calculateOverallScore = () => {
    let totalScore = 0;
    let maxPossibleScore = 0;

    questions.forEach(question => {
      const response = responses[question.id];
      const result = scoreResponse(question, response);
      const questionScore = result.score;
      const maxScore = question.weight * 10;
      
      totalScore += questionScore;
      maxPossibleScore += maxScore;
    });

    return {
      score: totalScore,
      maxScore: maxPossibleScore,
      percentage: (totalScore / maxPossibleScore) * 100
    };
  };

  const getCompletionBySection = () => {
    const sectionScores = {};
    
    sections.forEach(section => {
      const sectionQuestions = questions.filter(q => q.section === section);
      let sectionTotal = 0;
      let sectionMax = 0;

      sectionQuestions.forEach(question => {
        const response = responses[question.id];
        const result = scoreResponse(question, response);
        sectionTotal += result.score;
        sectionMax += question.weight * 10;
      });

      sectionScores[section] = {
        score: sectionTotal,
        maxScore: sectionMax,
        percentage: sectionMax > 0 ? (sectionTotal / sectionMax) * 100 : 0,
        answered: sectionQuestions.filter(q => responses[q.id]).length,
        total: sectionQuestions.length
      };
    });

    return sectionScores;
  };

  const handleInputChange = (questionId, value) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleMultiSelectChange = (questionId, option) => {
    setResponses(prev => {
      const current = prev[questionId] || [];
      const updated = current.includes(option)
        ? current.filter(item => item !== option)
        : [...current, option];
      return { ...prev, [questionId]: updated };
    });
  };

  const handleConditionalChange = (questionId, type, value) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [type]: value
      }
    }));
  };

  const handleSubmitAssessment = async () => {
    if (!candidateInfo.name || !candidateInfo.email) {
      alert('Please provide your name and email before submitting.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    const overallScore = calculateOverallScore();
    const sectionScores = getCompletionBySection();

    // Calculate aggregate quality
    const aggregateQuality = {
      specificity: 0,
      dataOriented: 0,
      actionability: 0,
      strategicDepth: 0,
      concreteness: 0,
      count: 0
    };

    questions.forEach(question => {
      const response = responses[question.id];
      if (response && (question.type === 'text' || question.type === 'textarea' || question.type === 'conditional')) {
        const result = scoreResponse(question, response);
        if (result.analysis) {
          aggregateQuality.specificity += result.analysis.specificity;
          aggregateQuality.dataOriented += result.analysis.dataOriented;
          aggregateQuality.actionability += result.analysis.actionability;
          aggregateQuality.strategicDepth += result.analysis.strategicDepth;
          aggregateQuality.concreteness += result.analysis.concreteness;
          aggregateQuality.count++;
        }
      }
    });

    if (aggregateQuality.count > 0) {
      aggregateQuality.specificity = (aggregateQuality.specificity / aggregateQuality.count) * 100;
      aggregateQuality.dataOriented = (aggregateQuality.dataOriented / aggregateQuality.count) * 100;
      aggregateQuality.actionability = (aggregateQuality.actionability / aggregateQuality.count) * 100;
      aggregateQuality.strategicDepth = (aggregateQuality.strategicDepth / aggregateQuality.count) * 100;
      aggregateQuality.concreteness = (aggregateQuality.concreteness / aggregateQuality.count) * 100;
    }

    const assessmentData = {
      candidateInfo,
      responses,
      overallScore,
      sectionScores,
      aggregateQuality,
      submittedAt: new Date().toISOString()
    };

    try {
      const response = await fetch('/api/submit-assessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(assessmentData),
      });

      if (response.ok) {
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting assessment:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render functions remain similar but won't include them all here for brevity
  // The key change is adding email submission at the results page

  const renderQuestion = (question) => {
    const response = responses[question.id];
    const result = scoreResponse(question, response);
    const score = result.score;
    const analysis = result.analysis;
    const maxScore = question.weight * 10;
    const scorePercentage = (score / maxScore) * 100;

    return (
      <div key={question.id} className="mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Q{question.id}. {question.question}
            </h3>
            {question.subtext && (
              <p className="text-sm text-gray-600 italic">{question.subtext}</p>
            )}
          </div>
          <div className="ml-4 text-right">
            <div className="text-xs text-gray-500">Question Score</div>
            <div className={`text-lg font-bold ${
              scorePercentage >= 80 ? 'text-green-600' :
              scorePercentage >= 60 ? 'text-yellow-600' :
              scorePercentage >= 40 ? 'text-orange-600' : 'text-red-600'
            }`}>
              {score.toFixed(0)}/{maxScore}
            </div>
          </div>
        </div>

        {question.type === 'text' && (
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={question.placeholder}
            value={response || ''}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
          />
        )}

        {question.type === 'textarea' && (
          <textarea
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={question.placeholder}
            rows="4"
            value={response || ''}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
          />
        )}

        {question.type === 'multiselect' && (
          <div className="space-y-2">
            {question.options.map(option => (
              <label key={option} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(response || []).includes(option)}
                  onChange={() => handleMultiSelectChange(question.id, option)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        )}

        {question.type === 'conditional' && (
          <div className="space-y-4">
            <div className="flex space-x-4">
              {question.options.map(option => (
                <label key={option} className="flex items-center space-x-2 p-3 border-2 border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name={`q${question.id}`}
                    checked={response?.primary === option}
                    onChange={() => handleConditionalChange(question.id, 'primary', option)}
                    className="w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="font-medium text-gray-700">{option}</span>
                </label>
              ))}
            </div>

            {response?.primary === 'Yes' && question.followUp && (
              <div className="mt-4 pl-4 border-l-4 border-blue-500">
                <p className="text-sm font-medium text-gray-700 mb-2">{question.followUp.question}</p>
                {question.followUp.type === 'text' && (
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder={question.followUp.placeholder}
                    value={response?.followUp || ''}
                    onChange={(e) => handleConditionalChange(question.id, 'followUp', e.target.value)}
                  />
                )}
                {question.followUp.type === 'textarea' && (
                  <textarea
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder={question.followUp.placeholder}
                    rows="3"
                    value={response?.followUp || ''}
                    onChange={(e) => handleConditionalChange(question.id, 'followUp', e.target.value)}
                  />
                )}
                {question.followUp.type === 'multiselect' && (
                  <div className="space-y-2">
                    {question.followUp.options.map(option => (
                      <label key={option} className="flex items-center space-x-3 p-2 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={(response?.followUp || []).includes(option)}
                          onChange={() => {
                            const current = response?.followUp || [];
                            const updated = current.includes(option)
                              ? current.filter(item => item !== option)
                              : [...current, option];
                            handleConditionalChange(question.id, 'followUp', updated);
                          }}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {response && analysis && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  scorePercentage >= 80 ? 'bg-green-500' :
                  scorePercentage >= 60 ? 'bg-yellow-500' :
                  scorePercentage >= 40 ? 'bg-orange-500' : 'bg-red-500'
                }`}
                style={{ width: `${scorePercentage}%` }}
              />
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
              <div className="text-sm font-semibold text-gray-700 mb-3">Response Quality Analysis</div>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-3">
                <div className="text-center">
                  <div className="text-xs text-gray-600 mb-1">Specificity</div>
                  <div className={`text-lg font-bold ${
                    analysis.specificity >= 0.7 ? 'text-green-600' :
                    analysis.specificity >= 0.4 ? 'text-yellow-600' : 'text-orange-600'
                  }`}>
                    {(analysis.specificity * 100).toFixed(0)}%
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-600 mb-1">Data-Driven</div>
                  <div className={`text-lg font-bold ${
                    analysis.dataOriented >= 0.7 ? 'text-green-600' :
                    analysis.dataOriented >= 0.4 ? 'text-yellow-600' : 'text-orange-600'
                  }`}>
                    {(analysis.dataOriented * 100).toFixed(0)}%
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-600 mb-1">Actionable</div>
                  <div className={`text-lg font-bold ${
                    analysis.actionability >= 0.7 ? 'text-green-600' :
                    analysis.actionability >= 0.4 ? 'text-yellow-600' : 'text-orange-600'
                  }`}>
                    {(analysis.actionability * 100).toFixed(0)}%
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-600 mb-1">Strategic</div>
                  <div className={`text-lg font-bold ${
                    analysis.strategicDepth >= 0.7 ? 'text-green-600' :
                    analysis.strategicDepth >= 0.4 ? 'text-yellow-600' : 'text-orange-600'
                  }`}>
                    {(analysis.strategicDepth * 100).toFixed(0)}%
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-600 mb-1">Concrete</div>
                  <div className={`text-lg font-bold ${
                    analysis.concreteness >= 0.7 ? 'text-green-600' :
                    analysis.concreteness >= 0.4 ? 'text-yellow-600' : 'text-orange-600'
                  }`}>
                    {(analysis.concreteness * 100).toFixed(0)}%
                  </div>
                </div>
              </div>

              {analysis.insights.length > 0 && (
                <div className="space-y-1">
                  {analysis.insights.slice(0, 3).map((insight, idx) => (
                    <div key={idx} className={`text-xs flex items-start ${
                      insight.startsWith('✓') ? 'text-green-700' : 'text-orange-700'
                    }`}>
                      <span className="mr-1">{insight}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const overallScore = calculateOverallScore();
  const sectionScores = getCompletionBySection();
  const currentSectionQuestions = questions.filter(q => q.section === sections[currentSection]);

  if (showResults) {
    const getGrade = (percentage) => {
      if (percentage >= 90) return { grade: 'A+', color: 'text-green-600', bg: 'bg-green-100' };
      if (percentage >= 80) return { grade: 'A', color: 'text-green-600', bg: 'bg-green-100' };
      if (percentage >= 70) return { grade: 'B', color: 'text-blue-600', bg: 'bg-blue-100' };
      if (percentage >= 60) return { grade: 'C', color: 'text-yellow-600', bg: 'bg-yellow-100' };
      if (percentage >= 50) return { grade: 'D', color: 'text-orange-600', bg: 'bg-orange-100' };
      return { grade: 'F', color: 'text-red-600', bg: 'bg-red-100' };
    };

    const overallGrade = getGrade(overallScore.percentage);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <Award className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Assessment Complete!</h1>
              <p className="text-gray-600">Enter your details to receive your results</p>
            </div>

            {!submitStatus && (
              <div className="mb-8 bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Your Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name *"
                    value={candidateInfo.name}
                    onChange={(e) => setCandidateInfo({...candidateInfo, name: e.target.value})}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your Email *"
                    value={candidateInfo.email}
                    onChange={(e) => setCandidateInfo({...candidateInfo, email: e.target.value})}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Company (Optional)"
                    value={candidateInfo.company}
                    onChange={(e) => setCandidateInfo({...candidateInfo, company: e.target.value})}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Role (Optional)"
                    value={candidateInfo.role}
                    onChange={(e) => setCandidateInfo({...candidateInfo, role: e.target.value})}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
                <div className="text-sm opacity-90 mb-1">Overall Score</div>
                <div className="text-4xl font-bold mb-2">
                  {overallScore.percentage.toFixed(1)}%
                </div>
                <div className="text-sm opacity-90">
                  {overallScore.score.toFixed(0)} / {overallScore.maxScore} points
                </div>
              </div>

              <div className={`${overallGrade.bg} rounded-xl p-6`}>
                <div className="text-sm text-gray-600 mb-1">Grade</div>
                <div className={`text-5xl font-bold ${overallGrade.color}`}>
                  {overallGrade.grade}
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white">
                <div className="text-sm opacity-90 mb-1">Completion</div>
                <div className="text-4xl font-bold mb-2">
                  {Object.keys(responses).length}
                </div>
                <div className="text-sm opacity-90">
                  of {questions.length} questions
                </div>
              </div>
            </div>

            {submitStatus === 'success' ? (
              <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 text-center">
                <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-600" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Successfully Submitted!</h3>
                <p className="text-gray-600">
                  Your assessment results have been sent to info@acemates.org and to your email ({candidateInfo.email}).
                </p>
              </div>
            ) : submitStatus === 'error' ? (
              <div className="bg-red-50 border-2 border-red-500 rounded-lg p-6 text-center">
                <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-600" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Submission Failed</h3>
                <p className="text-gray-600 mb-4">
                  There was an error submitting your assessment. Please try again.
                </p>
                <button
                  onClick={handleSubmitAssessment}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
                >
                  Retry Submission
                </button>
              </div>
            ) : (
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setShowResults(false)}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium"
                >
                  Back to Assessment
                </button>
                <button
                  onClick={handleSubmitAssessment}
                  disabled={isSubmitting || !candidateInfo.name || !candidateInfo.email}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Assessment'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">GTM Team Assessment</h1>
          <p className="text-gray-600 mb-6">
            Complete this assessment to identify areas for improvement in your go-to-market strategy
          </p>

          <div className="flex items-center justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Overall Progress</span>
                <span>{Object.keys(responses).length} / {questions.length} questions</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${(Object.keys(responses).length / questions.length) * 100}%` }}
                />
              </div>
            </div>
            <div className="ml-8 text-right">
              <div className="text-sm text-gray-600">Current Score</div>
              <div className="text-2xl font-bold text-indigo-600">
                {overallScore.percentage.toFixed(0)}%
              </div>
            </div>
          </div>

          <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
            {sections.map((section, idx) => {
              const sectionData = sectionScores[section];
              const isActive = idx === currentSection;
              
              return (
                <button
                  key={section}
                  onClick={() => setCurrentSection(idx)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {section}
                  <div className="text-xs mt-1 opacity-75">
                    {sectionData.answered}/{sectionData.total}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          {currentSectionQuestions.map(renderQuestion)}
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
            disabled={currentSection === 0}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            Previous Section
          </button>
          
          {currentSection < sections.length - 1 ? (
            <button
              onClick={() => setCurrentSection(currentSection + 1)}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
            >
              Next Section
            </button>
          ) : (
            <button
              onClick={() => setShowResults(true)}
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold text-lg"
            >
              View Results
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
