import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import * as Icons from 'lucide-react';

const calculatorData = [
  {
    "title": "Investment Calculators",
    "items": [
      {
        "name": "CAGR Tracker",
        "desc": "Track Your Wealth Growth with CAGR Calculator",
        "icon": "TrendingUp",
        "slug": "cagr-tracker"
      },
      {
        "name": "Compound Interest Tool",
        "desc": "Boost Savings with Compound Interest Calculator",
        "icon": "PiggyBank",
        "slug": "compound-interest-tool"
      },
      {
        "name": "FD Returns Estimator",
        "desc": "Maximise FD Returns with Fixed Deposit Calculator",
        "icon": "Landmark",
        "slug": "fd-returns-estimator"
      },
      {
        "name": "PPF Planner",
        "desc": "Secure Your Future with PPF Calculator",
        "icon": "ShieldCheck",
        "slug": "ppf-planner"
      },
      {
        "name": "Recurring Deposit Planner",
        "desc": "Save Consistently with Recurring Deposit Calculator",
        "icon": "CalendarDays",
        "slug": "recurring-deposit-planner"
      },
      {
        "name": "Simple Interest",
        "desc": "Know your Payment Plan",
        "icon": "Percent",
        "slug": "simple-interest"
      },
      {
        "name": "SIP",
        "desc": "Calculate how much you can make if you invest a fixed amount per month for \"n\" years",
        "icon": "RefreshCw",
        "slug": "sip"
      },
      {
        "name": "SIP Delay Cost",
        "desc": "Calculate how much you would potentially lose if you delay your SIP by a few years",
        "icon": "Hourglass",
        "slug": "sip-delay-cost"
      },
      {
        "name": "SIP Growth Calculator",
        "desc": "Calculate the growth of your SIP over time",
        "icon": "TrendingUp",
        "slug": "sip-growth-calculator"
      },
      {
        "name": "Step Up SIP Calculator",
        "desc": "Grow your SIP every year in line with your income with the Step Up SIP Calculator",
        "icon": "ArrowUpRight",
        "slug": "step-up-sip-calculator"
      },
      {
        "name": "Weighted Average Returns",
        "desc": "Calculate the weighted average returns of your investments",
        "icon": "Sigma",
        "slug": "weighted-average-returns"
      },
      {
        "name": "Mutual Fund Calculator",
        "desc": "Calculate returns and growth of your mutual fund investments",
        "icon": "BarChart",
        "slug": "mutual-fund-calculator"
      },
      {
        "name": "ELSS Calculator",
        "desc": "Calculate returns on tax-saving ELSS mutual fund investments",
        "icon": "Percent",
        "slug": "elss-calculator"
      },
      {
        "name": "Lumpsum Investment Calculator",
        "desc": "Calculate returns on one-time investment amounts",
        "icon": "Briefcase",
        "slug": "lumpsum-investment-calculator"
      },
      {
        "name": "SWP Calculator",
        "desc": "Calculate Systematic Withdrawal Plan returns",
        "icon": "ArrowRightCircle",
        "slug": "swp-calculator"
      },
      {
        "name": "Future Value Calculator",
        "desc": "Calculate the future value of your investments",
        "icon": "Rocket",
        "slug": "future-value-calculator"
      },
      {
        "name": "Custom Goal Tracker",
        "desc": "Achieve Any Financial Goals with Custom Goal Calculator",
        "icon": "Target",
        "slug": "custom-goal-tracker"
      },
      {
        "name": "EPF Calculator",
        "desc": "Calculate your Employee Provident Fund returns",
        "icon": "Briefcase",
        "slug": "epf-calculator"
      },
      {
        "name": "Sukanya Samruddi Yojana",
        "desc": "Calculate returns from Sukanya Samriddhi Yojana investment",
        "icon": "Baby",
        "slug": "sukanya-samruddi-yojana"
      },
      {
        "name": "Portfolio Rebalancing Calculator",
        "desc": "Analyze investments with this rebalancing calculator.",
        "icon": "ArrowUpDown",
        "slug": "portfolio-rebalancing-calculator"
      },
      {
        "name": "Stock Return Calculator",
        "desc": "Calculate returns from stock investments",
        "icon": "TrendingUp",
        "slug": "stock-return-calculator"
      },
      {
        "name": "Dividend Yield Calculator",
        "desc": "Estimate dividend yields with this calculator.",
        "icon": "CircleDollarSign",
        "slug": "dividend-yield-calculator"
      },
      {
        "name": "Gold Investment Calculator",
        "desc": "Calculate gold returns with this calculator.",
        "icon": "Coins",
        "slug": "gold-investment-calculator"
      },
      {
        "name": "Silver Investment Calculator",
        "desc": "Calculate silver returns with this calculator.",
        "icon": "Coins",
        "slug": "silver-investment-calculator"
      },
      {
        "name": "Better Funds Checker",
        "desc": "Check impact of getting stuck in bad investments with Better Funds Calculator",
        "icon": "BarChart2",
        "slug": "better-funds-checker"
      },
      {
        "name": "NSC Calculator",
        "desc": "Calculate National Savings Certificate maturity value and interest",
        "icon": "Landmark",
        "slug": "nsc-calculator"
      },
      {
        "name": "SGB Calculator",
        "desc": "Calculate Sovereign Gold Bond returns with interest and appreciation",
        "icon": "Coins",
        "slug": "sgb-calculator"
      },
      {
        "name": "XIRR Calculator",
        "desc": "Calculate actual annualized returns on irregular cash flow investments",
        "icon": "TrendingUp",
        "slug": "xirr-calculator"
      }
    ]
  },
  {
    "title": "Personal Finance Calculators",
    "items": [
      {
        "name": "Savings Goal Calculator",
        "desc": "Estimate savings with this calculator.",
        "icon": "PiggyBank",
        "slug": "savings-goal-calculator"
      },
      {
        "name": "Emergency Fund Calculator",
        "desc": "Determine emergency savings with this calculator.",
        "icon": "ShieldAlert",
        "slug": "emergency-fund-calculator"
      },
      {
        "name": "Debt Repayment Calculator",
        "desc": "Plan debt repayments with this calculator.",
        "icon": "CreditCard",
        "slug": "debt-repayment-calculator"
      },
      {
        "name": "Credit Card Payoff Calculator",
        "desc": "Calculate credit card payoff with this calculator.",
        "icon": "CreditCard",
        "slug": "credit-card-payoff-calculator"
      },
      {
        "name": "Net Worth Calculator",
        "desc": "Assess financial health with this calculator.",
        "icon": "BarChart3",
        "slug": "net-worth-calculator"
      }
    ]
  },
  {
    "title": "Children & Family Calculators",
    "items": [
      {
        "name": "Aging Parents",
        "desc": "Calculate how much you need to secure for your aging parents",
        "icon": "HeartHandshake",
        "slug": "aging-parents"
      },
      {
        "name": "Child Education",
        "desc": "Calculate how much you need to secure for your child's education",
        "icon": "GraduationCap",
        "slug": "child-education"
      },
      {
        "name": "Child Marriage",
        "desc": "Calculate how much you need to secure for your child's marriage",
        "icon": "Gift",
        "slug": "child-marriage"
      }
    ]
  },
  {
    "title": "Retirement Calculators",
    "items": [
      {
        "name": "Retirement Plan Calculator",
        "desc": "Plan your retirement savings and estimate your retirement corpus",
        "icon": "Briefcase",
        "slug": "retirement-plan-calculator"
      },
      {
        "name": "Superannuation",
        "desc": "Calculate your superannuation benefits and retirement savings",
        "icon": "CircleDollarSign",
        "slug": "superannuation"
      },
      {
        "name": "Achieve early fire retirement",
        "desc": "Plan your path to financial independence and early retirement",
        "icon": "Rocket",
        "slug": "achieve-early-fire-retirement"
      },
      {
        "name": "Gratuity Estimator",
        "desc": "Know how much you will get from your employer with Gratuity Calculator",
        "icon": "HandCoins",
        "slug": "gratuity-estimator"
      },
      {
        "name": "Pension Calculator",
        "desc": "Estimate retirement pensions with this calculator.",
        "icon": "CircleDollarSign",
        "slug": "pension-calculator"
      },
      {
        "name": "Post-Retirement Expenses Calculator",
        "desc": "Plan retirement expenses with this calculator.",
        "icon": "Receipt",
        "slug": "post-retirement-expenses-calculator"
      },
      {
        "name": "Reverse Mortgage Calculator",
        "desc": "Evaluate reverse mortgage benefits with this calculator.",
        "icon": "Home",
        "slug": "reverse-mortgage-calculator"
      },
      {
        "name": "NPS Reinvestment in annuity",
        "desc": "Calculate returns on NPS reinvestment in annuity schemes",
        "icon": "RefreshCcw",
        "slug": "nps-reinvestment-in-annuity"
      },
      {
        "name": "NPS Calculator",
        "desc": "Calculate returns on National Pension System investments",
        "icon": "CircleDollarSign",
        "slug": "nps-calculator"
      },
      {
        "name": "APY Calculator",
        "desc": "Calculate Atal Pension Yojana contribution and pension amount",
        "icon": "Users",
        "slug": "apy-calculator"
      },
      {
        "name": "SCSS Calculator",
        "desc": "Calculate Senior Citizen Savings Scheme quarterly interest and returns",
        "icon": "CircleDollarSign",
        "slug": "scss-calculator"
      }
    ]
  },
  {
    "title": "Education and Career Calculators",
    "items": [
      {
        "name": "Student Loan Calculator",
        "desc": "Plan student loan repayments with this calculator.",
        "icon": "GraduationCap",
        "slug": "student-loan-calculator"
      },
      {
        "name": "Career Growth Planner",
        "desc": "Estimate career growth benefits with this calculator.",
        "icon": "TrendingUp",
        "slug": "career-growth-planner"
      }
    ]
  },
  {
    "title": "Lifestyle and Goal Planning Calculators",
    "items": [
      {
        "name": "Travel Budget Calculator",
        "desc": "Plan travel budgets with this calculator",
        "icon": "Plane",
        "slug": "travel-budget-calculator"
      },
      {
        "name": "Wedding Budget Planner",
        "desc": "Break down wedding costs with this calculator",
        "icon": "ClipboardList",
        "slug": "wedding-budget-planner"
      },
      {
        "name": "Home Renovation Budget Planner",
        "desc": "Calculate renovation costs with this calculator.",
        "icon": "Wrench",
        "slug": "home-renovation-budget-planner"
      },
      {
        "name": "Dream Wedding Fund",
        "desc": "Plan a memorable wedding with Dream Wedding Fund Calculator",
        "icon": "Heart",
        "slug": "dream-wedding-fund"
      },
      {
        "name": "First Car Planner",
        "desc": "Get moving with First Car Calculator",
        "icon": "Car",
        "slug": "first-car-planner"
      },
      {
        "name": "First Crore Goal",
        "desc": "Become a Crorepati with First Crore Goal Calculator",
        "icon": "Target",
        "slug": "first-crore-goal"
      },
      {
        "name": "Home Purchase Planner",
        "desc": "Secure your dream home with Home Goal Calculator",
        "icon": "Home",
        "slug": "home-purchase-planner"
      },
      {
        "name": "Vacation Goal Planner",
        "desc": "Become a Jetsetter with Overseas Vacation Goal Calculator",
        "icon": "Globe",
        "slug": "vacation-goal-planner"
      },
      {
        "name": "Recurring Vacation Fund",
        "desc": "Become a Frequent Flying Jetsetter with Recurring Vacation Goal Calculator",
        "icon": "Map",
        "slug": "recurring-vacation-fund"
      }
    ]
  },
  {
    "title": "Tax Calculators",
    "items": [
      {
        "name": "GST Calculator",
        "desc": "Calculate GST amounts with this calculator.",
        "icon": "Percent",
        "slug": "gst-calculator"
      },
      {
        "name": "HRA Exemption Calculator",
        "desc": "Maximize HRA exemptions with this calculator.",
        "icon": "Building",
        "slug": "hra-exemption-calculator"
      },
      {
        "name": "Capital Gains Tax Calculator",
        "desc": "Calculate capital gains taxes with this calculator.",
        "icon": "PieChart",
        "slug": "capital-gains-tax-calculator"
      },
      {
        "name": "Freelancer Income Tax Calculator",
        "desc": "Calculate freelancer taxes with this calculator.",
        "icon": "Briefcase",
        "slug": "freelancer-income-tax-calculator"
      },
      {
        "name": "Income Tax Calculator",
        "desc": "Compare income tax under Old vs New regime for FY 2025-26",
        "icon": "FileText",
        "slug": "income-tax-calculator"
      },
      {
        "name": "TDS Calculator",
        "desc": "Calculate Tax Deducted at Source for various payment types",
        "icon": "Percent",
        "slug": "tds-calculator"
      },
      {
        "name": "Section 80C Tax Saving Calculator",
        "desc": "Maximize your 80C deductions and calculate tax savings",
        "icon": "ShieldCheck",
        "slug": "section-80c-tax-saving-calculator"
      }
    ]
  },
  {
    "title": "Income & Cashflow Calculators",
    "items": [
      {
        "name": "Irregular Cash Flow",
        "desc": "Calculate returns for irregular cash flow investments",
        "icon": "Activity",
        "slug": "irregular-cash-flow"
      },
      {
        "name": "Rental Yield Calculator",
        "desc": "Calculate the yield from your rental property",
        "icon": "Building2",
        "slug": "rental-yield-calculator"
      },
      {
        "name": "CTC to Take-Home Salary Calculator",
        "desc": "Calculate your in-hand salary from CTC with full breakdown",
        "icon": "IndianRupee",
        "slug": "ctc-to-take-home-salary-calculator"
      },
      {
        "name": "DA Calculator",
        "desc": "Calculate dearness allowance for govt employees with HRA",
        "icon": "Banknote",
        "slug": "da-calculator"
      },
      {
        "name": "Bonus Calculator",
        "desc": "Calculate statutory, performance, and ex-gratia bonus with tax",
        "icon": "Gift",
        "slug": "bonus-calculator"
      }
    ]
  },
  {
    "title": "Trading Calculators",
    "items": [
      {
        "name": "Brokerage Cost Tool",
        "desc": "Know costs of trading with Brokerage Calculator",
        "icon": "DollarSign",
        "slug": "brokerage-cost-tool"
      },
      {
        "name": "Margin Calculator",
        "desc": "Plan your trading better with Margin Calculator",
        "icon": "Maximize2",
        "slug": "margin-calculator"
      },
      {
        "name": "Option Value Estimator",
        "desc": "Plan your derivatives better with Option Value Calculator",
        "icon": "Menu",
        "slug": "option-value-estimator"
      },
      {
        "name": "Stock Average Calculator",
        "desc": "Calculate weighted average stock price across multiple purchases",
        "icon": "BarChart2",
        "slug": "stock-average-calculator"
      }
    ]
  },
  {
    "title": "Loan Calculators",
    "items": [
      {
        "name": "Car Loan EMI",
        "desc": "Calculate your monthly EMI for car loan",
        "icon": "Car",
        "slug": "car-loan-emi"
      },
      {
        "name": "EMI",
        "desc": "Calculate Equated Monthly Installments for your loan",
        "icon": "FileText",
        "slug": "emi"
      },
      {
        "name": "Home Loan EMI",
        "desc": "Calculate your monthly EMI for home loan",
        "icon": "Home",
        "slug": "home-loan-emi"
      },
      {
        "name": "Personal Loan EMI",
        "desc": "Calculate your monthly EMI for personal loan",
        "icon": "Wallet",
        "slug": "personal-loan-emi"
      },
      {
        "name": "Education Loan EMI",
        "desc": "Calculate your monthly EMI for education loan",
        "icon": "GraduationCap",
        "slug": "education-loan-emi"
      },
      {
        "name": "Home Extension Renovation",
        "desc": "Calculate loan EMI for your home renovation or extension",
        "icon": "Hammer",
        "slug": "home-extension-renovation"
      },
      {
        "name": "Land Construction Loan Calculator",
        "desc": "Calculate loan EMI for land construction",
        "icon": "Building2",
        "slug": "land-construction-loan-calculator"
      },
      {
        "name": "Marriage Loan Calculator",
        "desc": "Calculate loan EMI for marriage expenses",
        "icon": "Gift",
        "slug": "marriage-loan-calculator"
      },
      {
        "name": "Loan Eligibility Calculator",
        "desc": "Assess loan eligibility with this calculator.",
        "icon": "Scale",
        "slug": "loan-eligibility-calculator"
      },
      {
        "name": "Top-Up Loan Calculator",
        "desc": "Calculate loan EMI for top-up expenses",
        "icon": "DollarSign",
        "slug": "top-up-loan-calculator"
      },
      {
        "name": "Balance Transfer Calculator",
        "desc": "Calculate loan EMI for balance transfer expenses",
        "icon": "RefreshCw",
        "slug": "balance-transfer-calculator"
      }
    ]
  },
  {
    "title": "Miscellaneous Calculators",
    "items": [
      {
        "name": "Inflation",
        "desc": "Calculate the impact of inflation on your money",
        "icon": "TrendingDown",
        "slug": "inflation"
      },
      {
        "name": "Single Amount",
        "desc": "Calculate returns for one-time investments",
        "icon": "PieChart",
        "slug": "single-amount"
      },
      {
        "name": "EBIDTA Margin Calculator",
        "desc": "Calculate Earnings Before Interest, Depreciation, Taxes, and Amortization margin",
        "icon": "BarChart",
        "slug": "ebidta-margin-calculator"
      },
      {
        "name": "Moving from poor funds to better funds",
        "desc": "Calculate the benefit of switching from underperforming to better performing funds",
        "icon": "ArrowUpRight",
        "slug": "moving-from-poor-funds-to-better-funds"
      },
      {
        "name": "Stamp Duty Calculator",
        "desc": "Calculate state-wise stamp duty and registration charges for property",
        "icon": "Stamp",
        "slug": "stamp-duty-calculator"
      }
    ]
  }
];

export default function Calculators() {
    const [searchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState('');

    const sectionTitle = searchParams.get('title') || searchParams.get('calc') || 'All Calculators';

    useEffect(() => {
        if (sectionTitle && sectionTitle !== 'All Calculators') {
            setTimeout(() => {
                const elementId = sectionTitle.toLowerCase().replace(/\s+/g, '-');
                const element = document.getElementById(elementId);
                if (element) {
                    const yOffset = -140;
                    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }, 100);
        }
    }, [sectionTitle]);

    const filteredData = calculatorData.map(section => ({
        ...section,
        items: section.items.filter(item => 
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            item.desc.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(section => section.items.length > 0);

    return (
        <div className="bg-slate-50 min-h-screen pt-32 md:pt-36 pb-24 px-6 md:px-12 lg:px-20 font-sans">
            <div className="max-w-7xl mx-auto">
                {/* Top Bar Navigation & Search Input */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
                    <Link
                        to="/resources"
                        className="inline-flex items-center text-[#c08226] hover:text-[#a0681a] font-medium text-sm md:text-base transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Resources
                    </Link>

                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search calculators..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 shadow-xs transition-all placeholder:text-slate-400"
                        />
                    </div>
                </div>

                {/* Centered Main Hero Header */}
                <div className="text-center mb-14">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#113262] tracking-tight relative inline-block">
                        Calculators
                        <span className="block w-24 md:w-28 h-1 bg-gradient-to-r from-transparent via-[#113262] to-transparent mx-auto mt-2 rounded-full opacity-80" />
                    </h1>
                    <p className="text-slate-500 text-base md:text-lg mt-4 max-w-xl mx-auto font-normal">
                        Try our free calculators to plan your finances and investments
                    </p>
                </div>

                {/* Sections */}
                <div className="space-y-16">
                    {filteredData.map((section, index) => (
                        <div key={index} id={section.title.toLowerCase().replace(/\s+/g, '-')}>
                            <h2 className="text-xl md:text-2xl font-semibold text-[#c08226] tracking-tight mb-6">
                                {section.title}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {section.items.map((item, idx) => {
                                    const IconComponent = (Icons as any)[item.icon] || Icons.Calculator;
                                    return (
                                        <Link 
                                            key={idx} 
                                            to={`/calculators/${item.slug}`} 
                                            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-100 transition-all group flex flex-col h-full"
                                        >
                                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                                                <IconComponent className="w-6 h-6 text-[#113262]" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-slate-800 mb-2 group-hover:text-[#113262] transition-colors">
                                                {item.name}
                                            </h3>
                                            <p className="text-slate-500 text-sm leading-relaxed flex-grow">
                                                {item.desc}
                                            </p>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                    {filteredData.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-slate-500 text-lg">No calculators found matching your search.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
