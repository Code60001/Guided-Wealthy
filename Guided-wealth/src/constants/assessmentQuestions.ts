export const assessmentQuestions = [
  {
    id: 1,
    question: "What are your estimated Investable Assets (Financial Portfolio)? (Total assets excluding primary residence and business assets)",
    options: [
      { text: "Less than ₹50 lacs", points: 1 },
      { text: "₹50 lacs – ₹2 crores", points: 2 },
      { text: "₹2 crores – ₹5 crores", points: 3 },
      { text: "Over ₹5 crores", points: 4 }
    ]
  },
  {
    id: 2,
    question: "What is your expected annual household income (pre-tax) over the next 3 years?",
    options: [
      { text: "Up to ₹20 lacs", points: 1 },
      { text: "₹20 lacs – ₹50 lacs", points: 2 },
      { text: "₹50 lacs – ₹1 crore", points: 3 },
      { text: "₹1 crore – ₹1.5 crores", points: 4 },
      { text: "₹1.5 crores and above", points: 5 }
    ]
  },
  {
    id: 3,
    question: "How long would you invest the majority of your portfolio before you think you would need to withdraw it? (Assuming you already have plans in place to meet short-term cash flow needs and emergencies)",
    options: [
      { text: "Less than 1 year", points: 1 },
      { text: "1 year – 2 years", points: 2 },
      { text: "2 years – 3 years", points: 3 },
      { text: "More than 3 years", points: 4 }
    ]
  },
  {
    id: 4,
    question: "How much decline in a single investment could you tolerate over a 1-year period?",
    options: [
      { text: "No decline", points: 1 },
      { text: "Up to 5% decline", points: 2 },
      { text: "Up to 10% decline", points: 3 },
      { text: "Up to 20% decline", points: 4 },
      { text: "More than 20% decline", points: 5 }
    ]
  },
  {
    id: 5,
    question: "Select the investment scenario you would be most comfortable with:",
    options: [
      { text: "No loss; gain of 6%", points: 1 },
      { text: "Loss of 3%; gain of 9%", points: 2 },
      { text: "Loss of 4%; gain of 11%", points: 3 },
      { text: "Loss of 7%; gain of 18%", points: 4 },
      { text: "Loss of 10%; gain of 25%", points: 5 }
    ]
  },
  {
    id: 6,
    question: "What is your investment objective?",
    options: [
      { text: "To preserve capital", points: 1 },
      { text: "Generate income with some capital appreciation", points: 2 },
      { text: "Achieve moderate capital growth and income", points: 3 },
      { text: "Achieve strong capital growth with modest income", points: 4 },
      { text: "Achieve maximum capital growth", points: 5 }
    ]
  },
  {
    id: 7,
    question: "Based on your investment experience, please select the category in which you have taken the HIGHEST level of risk:",
    options: [
      { text: "Preferably fixed returns viz. bank deposits, high-quality debt funds, tax-free bonds", points: 1 },
      { text: "Some variability in returns viz. dynamic debt funds, balanced funds, index funds, large-cap PMS, PSU bonds", points: 2 },
      { text: "Moderate risk and variability viz. high-yield debt funds, equity funds, mid-cap PMS, large-cap stocks, AAA-rated bonds", points: 3 },
      { text: "High risk and variability viz. equity funds, alternate funds (long/short, structured credit), PMS products, large & mid-cap stocks, AA-rated bonds", points: 4 },
      { text: "High risk, lock-in, leverage and potentially higher returns viz. alternative funds (Private Equity, Real Estate, Venture Capital), small & mid-cap stocks, equity and currency derivatives", points: 5 }
    ]
  },
  {
    id: 8,
    question: "Which age bracket does the primary investor fall into?",
    options: [
      { text: "Above 60 years", points: 1 },
      { text: "51 – 60 years", points: 2 },
      { text: "41 – 50 years", points: 3 },
      { text: "31 – 40 years", points: 4 },
      { text: "30 years and below", points: 5 }
    ]
  },
  {
    id: 9,
    question: "How many years of investment experience do you have across market-linked products (equity, mutual funds, PMS, AIF, etc.)?",
    options: [
      { text: "No prior experience", points: 1 },
      { text: "Less than 1 year", points: 2 },
      { text: "1 – 3 years", points: 3 },
      { text: "3 – 10 years", points: 4 },
      { text: "More than 10 years", points: 5 }
    ]
  },
  {
    id: 10,
    question: "If your investment portfolio fell by 15% in value within a single month, what would you most likely do?",
    options: [
      { text: "Sell the entire portfolio immediately to avoid further loss", points: 1 },
      { text: "Sell a significant portion to reduce risk", points: 2 },
      { text: "Do nothing and wait for the market to recover", points: 3 },
      { text: "Stay invested and consider adding a small additional amount", points: 4 },
      { text: "Treat it as a buying opportunity and invest significantly more", points: 5 }
    ]
  }
];

export const getRiskCategory = (score: number) => {
  if (score >= 10 && score <= 17) return { category: "Conservative", allocation: "Debt/Cash 75-90% | Equity 0-15% | Alternatives 0-10%" };
  if (score >= 18 && score <= 25) return { category: "Moderately Conservative", allocation: "Debt/Cash 55-70% | Equity 20-35% | Alternatives 0-15%" };
  if (score >= 26 && score <= 33) return { category: "Moderate", allocation: "Debt/Cash 35-50% | Equity 35-50% | Alternatives 5-20%" };
  if (score >= 34 && score <= 41) return { category: "Moderately Aggressive", allocation: "Debt/Cash 15-30% | Equity 50-65% | Alternatives 10-25%" };
  if (score >= 42) return { category: "Aggressive", allocation: "Debt/Cash 0-15% | Equity 60-80% | Alternatives 15-30%" };
  return { category: "Unknown", allocation: "N/A" };
};
