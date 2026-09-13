import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ChevronDown,
    ChevronRight,
    TrendingUp,
    Monitor,
    Users,
    Clock,
    GraduationCap,
    ShieldCheck,
    Scale,
    Coins,
    BarChart3,
    CreditCard,
    Calculator,
    Target,
    Wallet,
    Home,
    Building2,
    Sparkles,
    FileText,
    CheckCircle2,
    Star
} from 'lucide-react';

interface CardItem {
    title: string;
    description: string;
    icon: React.ElementType;
    path?: string;
}

interface CategorySection {
    id: string;
    title: string;
    badge: string;
    items: CardItem[];
}

export default function Resources() {
    const navigate = useNavigate();
    const [activeId, setActiveId] = useState<string>('financial-calculators');

    const categories: CategorySection[] = [
        {
            id: 'financial-calculators',
            title: 'Financial Calculators',
            badge: 'FINANCIAL CALCULATORS',
            items: [
                { title: 'Investment Calculators', description: 'Plan and analyze your investments', icon: TrendingUp },
                { title: 'Personal Finance Calculators', description: 'Manage your personal finances', icon: Monitor },
                { title: 'Children & Family Calculators', description: "Plan your family's financial future", icon: Users },
                { title: 'Retirement Calculators', description: 'Plan your retirement savings', icon: Clock },
                { title: 'Education and Career Calculators', description: 'Plan your educational and career investments', icon: GraduationCap },
                { title: 'Lifestyle and Goal Calculators', description: 'Plan your lifestyle and financial goals', icon: ShieldCheck },
                { title: 'Tax Calculators', description: 'Calculate your tax liability', icon: Scale },
                { title: 'Income & Cashflow Calculators', description: 'Analyze and plan your cash flow', icon: Coins },
                { title: 'Trading Calculators', description: 'Analyze and plan your trading strategies', icon: BarChart3 },
                { title: 'Loan Calculators', description: 'Calculate loan details and EMIs', icon: CreditCard },
                { title: 'Miscellaneous Calculators', description: 'Diverse financial calculation tools', icon: Calculator }
            ]
        },
        {
            id: 'financial-planning-scenarios',
            title: 'Financial Planning Scenarios',
            badge: 'FINANCIAL PLANNING SCENARIOS',
            items: [
                { title: 'SIP for 1 Crore', description: 'How much SIP do you need to reach Rs 1 crore across horizons and return rates.', icon: TrendingUp, path: '/research/sip-for-1-crore' },
                { title: 'SIP for Child Education', description: 'Monthly SIP required to fund future undergrad or postgrad costs.', icon: GraduationCap, path: '/research/sip-for-child-education' },
                { title: 'Retirement at 45', description: 'Early-retirement corpus and monthly savings targets.', icon: Clock, path: '/research/retirement-at-45' },
                { title: 'Retirement at 55', description: 'Corpus and SIP plan for retirement a decade before 65.', icon: Clock, path: '/research/retirement-at-55' },
                { title: 'FIRE Calculator India', description: 'Financial Independence / Retire Early targets for Indian households.', icon: Target, path: '/research/fire-calculator-india' },
                { title: 'SWP for ₹1 Lakh / Month', description: 'Corpus required to draw Rs 1 lakh monthly via SWP.', icon: Wallet, path: '/research/swp-for-1-lakh-month' },
                { title: 'SWP for ₹50,000 / Month', description: 'Corpus required to draw Rs 50,000 monthly via SWP.', icon: Wallet, path: '/research/swp-for-50000-month' },
                { title: 'Home Loan 20-Year EMI', description: 'EMI, total interest and amortisation across loan sizes and rates.', icon: Home, path: '/research/home-loan-20-year-emi' },
                { title: 'Gold vs Equity (10-Year)', description: 'Ten-year returns from gold vs equity mutual funds, compared side by side.', icon: BarChart3, path: '/research/gold-vs-equity-10-year' },
                { title: 'Gold for Wedding Planning', description: 'Grams of gold required and SIP plan for a future wedding budget.', icon: Sparkles, path: '/research/gold-for-wedding-planning' },
                { title: 'Rental Yield: Mumbai vs Bangalore', description: 'Buy-vs-rent yield and long-term math across both cities.', icon: Building2, path: '/research/rental-yield-mumbai-vs-bangalore' },
                { title: 'NPS vs PPF Comparison', description: 'Return, flexibility and tax differences between NPS and PPF.', icon: Monitor, path: '/research/nps-vs-ppf-comparison' },
                { title: 'ELSS vs PPF Tax Saving', description: 'Section 80C tax saving compared across ELSS and PPF.', icon: Coins, path: '/research/elss-vs-ppf-tax-saving' },
                { title: 'Freelancer Income Tax 2026', description: 'Freelancer/consultant tax liability under the 2026 regime.', icon: FileText, path: '/research/freelancer-income-tax-2026' },
                { title: 'Emergency Fund Calculator', description: 'How many months of expenses your emergency fund should cover.', icon: ShieldCheck, path: '/research/emergency-fund-calculator' }
            ]
        },
        {
            id: 'wealth-tracker',
            title: 'Wealth Tracker',
            badge: 'WEALTH TRACKER',
            items: [
                { title: 'Wealth Tracker', description: 'Track and manage your wealth portfolio', icon: Clock }
            ]
        },
        {
            id: 'financial-wellness-assessments',
            title: 'Financial Wellness Assessments',
            badge: 'FINANCIAL WELLNESS ASSESSMENTS',
            items: [
                { title: 'Money works hard for me', description: 'Check if your money is working for someone else', icon: Coins },
                { title: 'My Family is well protected', description: 'Assess your family\'s insurance needs', icon: ShieldCheck },
                { title: 'I can meet my goals', description: 'Will you be able to meet key life goals like childrens\' education?', icon: CheckCircle2 },
                { title: 'My retirement is sorted', description: 'Will you enjoy comfort and peace after your working years?', icon: Clock },
                { title: 'Am I safe online', description: 'Are you cyber savvy, or will scamsters get you?', icon: ShieldCheck }
            ]
        },
        {
            id: 'downloads',
            title: 'Downloads',
            badge: 'DOWNLOADS',
            items: [
                { title: 'Investor Charter', description: 'Ensuring Fair Investor Experience', icon: Star },
                { title: 'Redressal Greviances', description: 'Swift and transparent resolution of investor complaints', icon: Star }
            ]
        }
    ];

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 180;

            for (let i = categories.length - 1; i >= 0; i--) {
                const cat = categories[i];
                const element = document.getElementById(cat.id);
                if (element) {
                    const top = element.offsetTop;
                    if (scrollPosition >= top) {
                        setActiveId(cat.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [categories]);

    const scrollToSection = (id: string) => {
        setActiveId(id);
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -130;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <div className="bg-cream min-h-screen">
            <section className="pt-36 md:pt-40 pb-24 px-6 md:px-12 lg:px-20">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-8 relative">


                        <div className="w-full lg:w-96 flex-shrink-0 lg:sticky lg:top-28 self-start z-10">
                            <div className="p-2 lg:border-r border-slate-300 pr-4">
                                <ul className="space-y-2">
                                    {categories.map((cat) => {
                                        const isActive = activeId === cat.id;

                                        return (
                                            <button
                                                key={cat.id}
                                                onClick={() => scrollToSection(cat.id)}
                                                className={`w-full px-6 py-4 rounded-xl text-xl flex items-center justify-between transition-all duration-300 text-left font-medium cursor-pointer ${isActive
                                                    ? 'bg-gradient-to-r from-[#1c2b5e] via-[#263a79] to-[#324a92] text-white shadow-lg shadow-indigo-950/20'
                                                    : 'bg-transparent text-slate-700 hover:bg-blue-50/80 hover:text-indigo-900'
                                                    }`}
                                            >
                                                <span>{cat.title}</span>
                                                {isActive ? (
                                                    <ChevronDown size={18} className="text-amber-300 stroke-[2.5]" />
                                                ) : (
                                                    <ChevronRight size={18} className="text-slate-400" />
                                                )}
                                            </button>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>

                        <div className="w-full flex-grow ">
                            {categories.map((cat, index) => (
                                <div key={cat.id} id={cat.id} className="scroll-mt-32 space-y-6 mb-10">

                                    <h2 className={`text-md uppercase tracking-widest font-semibold text-[#c08226] font-sans ${index !== 0 ? 'border-t border-slate-200 pt-8' : ''}`}>
                                        {cat.badge}
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                                        {cat.items.map((card, idx) => {
                                            const CardIcon = card.icon;

                                            return (
                                                <div
                                                    key={idx}
                                                    onClick={() => {
                                                        if (card.path) {
                                                            navigate(card.path);
                                                        } else {
                                                            navigate(`/calculators?title=${encodeURIComponent(card.title)}&desc=${encodeURIComponent(card.description)}`);
                                                        }
                                                    }}
                                                    className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-300/80 transition-all duration-300 flex items-start gap-4 cursor-pointer group"
                                                >
                                                    <div className="text-[#113262] mt-1 flex-shrink-0 group-hover:scale-110 transition-transform">
                                                        <CardIcon size={20} />
                                                    </div>
                                                    <div className=" space-y-4">
                                                        <h3 className="font-semibold text-[#113262] text-lg leading-snug group-hover:text-[#111827] transition-colors">
                                                            {card.title}
                                                        </h3>
                                                        <p className="text-gray-500 text-md mt-2 leading-relaxed">
                                                            {card.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}