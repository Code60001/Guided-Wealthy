import React, { useState, useEffect } from 'react';
import { Share2, ChevronDown, ChevronUp, Info, ShieldCheck, TrendingUp, Calendar, DollarSign } from 'lucide-react';

export default function ScssCalculator() {
  const [investmentAmount, setInvestmentAmount] = useState<number>(1500000);
  const [interestRate, setInterestRate] = useState<number>(8.2);
  const [tenureYears, setTenureYears] = useState<number>(5);
  const [showSchemeDetails, setShowSchemeDetails] = useState<boolean>(false);

  const [quarterlyInterest, setQuarterlyInterest] = useState<number>(0);
  const [annualInterest, setAnnualInterest] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [maturityAmount, setMaturityAmount] = useState<number>(0);
  const [taxDeduction80C, setTaxDeduction80C] = useState<number>(0);
  const [tdsPerQuarter, setTdsPerQuarter] = useState<number>(0);
  const [netQuarterlyPayout, setNetQuarterlyPayout] = useState<number>(0);

  useEffect(() => {
    // SCSS Quarterly Interest Calculation: (P * R) / 4
    const qInterest = Math.round((investmentAmount * (interestRate / 100)) / 4);
    const aInterest = qInterest * 4;
    const totInterest = aInterest * tenureYears;
    const matAmt = investmentAmount;
    const tax80C = Math.min(investmentAmount, 150000);

    // TDS threshold for Senior Citizens on SCSS interest is Rs 50,000 per year
    // Standard TDS rate is 10%
    const tdsQ = aInterest > 50000 ? Math.round(qInterest * 0.10) : 0;
    const netQ = qInterest - tdsQ;

    setQuarterlyInterest(qInterest);
    setAnnualInterest(aInterest);
    setTotalInterest(totInterest);
    setMaturityAmount(matAmt);
    setTaxDeduction80C(tax80C);
    setTdsPerQuarter(tdsQ);
    setNetQuarterlyPayout(netQ);
  }, [investmentAmount, interestRate, tenureYears]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const quartersSchedule = [
    { quarter: 'Apr - Jun', label: 'Q1 Payout' },
    { quarter: 'Jul - Sep', label: 'Q2 Payout' },
    { quarter: 'Oct - Dec', label: 'Q3 Payout' },
    { quarter: 'Jan - Mar', label: 'Q4 Payout' },
  ];
  const getSliderStyle = (value: number, min: number | string, max: number | string) => {
    const minNum = typeof min === 'string' ? parseFloat(min) : min;
    const maxNum = typeof max === 'string' ? parseFloat(max) : max;
    const percentage = Math.min(100, Math.max(0, ((value - minNum) / (maxNum - minNum)) * 100));
    return {
      background: `linear-gradient(to right, #3b82f6 ${percentage}%, #e2e8f0 ${percentage}%)`
    };
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      {/* Header Banner */}
      <div className="bg-white pt-32 pb-10 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-[#113262] mb-4">SCSS Calculator</h1>
        <p className="text-slate-600 text-base">
          Calculate your Senior Citizen Savings Scheme returns, quarterly interest income, and tax benefits
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Main Grid Layout */}
        <div className="flex flex-col lg:flex-row gap-8 mb-16">
          {/* Left Column: Inputs & Schedule */}
          <div className="flex-1 space-y-6">
            {/* Investment Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" /> Investment Details
              </h2>

              <div className="space-y-6">
                {/* Investment Amount */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-slate-700">Investment Amount</label>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-slate-400">₹</span>
                      <input
                        type="number"
                        min="1000"
                        max="3000000"
                        step="1000"
                        value={investmentAmount}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setInvestmentAmount(Math.min(3000000, Math.max(0, val)));
                        }}
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="3000000"
                    step="10000"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(Number(e.target.value))}

                    style={getSliderStyle(investmentAmount, "1000", "3000000")}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#3b82f6] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#3b82f6] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1.5 font-medium">
                    <span>Rs. 1,000</span>
                    <span>Rs. 30 Lakhs (Max)</span>
                  </div>
                </div>

                {/* Interest Rate */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-slate-700">Interest Rate (%)</label>
                    <span className="text-sm font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-lg border border-slate-300">
                      {interestRate}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="7.0"
                    max="9.0"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}

                    style={getSliderStyle(interestRate, "7.0", "9.0")}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#3b82f6] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#3b82f6] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1.5 font-medium">
                    <span>7%</span>
                    <span>9%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tenure Settings */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" /> Tenure Settings
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Base Tenure</label>
                  <div className="p-3 bg-slate-100 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 text-center">
                    5 Years (Fixed)
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Extend by 3 Years?</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setTenureYears(5)}
                      className={`py-3 px-3 text-xs sm:text-sm font-semibold rounded-xl border transition-all ${tenureYears === 5
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                        }`}
                    >
                      5 Years
                    </button>
                    <button
                      onClick={() => setTenureYears(8)}
                      className={`py-3 px-3 text-xs sm:text-sm font-semibold rounded-xl border transition-all ${tenureYears === 8
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                        }`}
                    >
                      8 Years (Extended)
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1.5">
                    SCSS can be extended once for 3 additional years after maturity.
                  </p>
                </div>
              </div>
            </div>

            {/* Quarterly Interest Schedule Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 overflow-x-auto">
              <h2 className="text-xl font-bold text-slate-900 mb-1 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-600" /> Quarterly Interest Schedule (Year 1)
              </h2>
              <p className="text-xs text-slate-500 mb-4">Payout occurs on the 1st working day of April, July, October, and January.</p>

              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-600 font-semibold bg-slate-50">
                    <th className="py-3 px-4 rounded-l-lg">Quarter</th>
                    <th className="py-3 px-4">Interest Payout</th>
                    <th className="py-3 px-4">TDS Deducted</th>
                    <th className="py-3 px-4 rounded-r-lg">Net Payout</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {quartersSchedule.map((row) => (
                    <tr key={row.quarter} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-slate-900">{row.quarter}</td>
                      <td className="py-3.5 px-4 text-emerald-600 font-semibold">{formatCurrency(quarterlyInterest)}</td>
                      <td className="py-3.5 px-4 text-rose-600 font-medium">{formatCurrency(tdsPerQuarter)}</td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">{formatCurrency(netQuarterlyPayout)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>
                  *TDS at 10% is applicable as annual interest exceeds ₹50,000. Submit Form 15H to avoid TDS if your total taxable income is below exemption limits.
                </span>
              </div>
            </div>

            {/* Scheme Details Accordion */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <button
                onClick={() => setShowSchemeDetails(!showSchemeDetails)}
                className="w-full p-6 flex justify-between items-center font-bold text-slate-900 hover:bg-slate-50 transition-colors"
              >
                <span className="flex items-center gap-2 text-base">
                  <ShieldCheck className="w-5 h-5 text-blue-600" /> Scheme Details & Rules
                </span>
                {showSchemeDetails ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
              </button>

              {showSchemeDetails && (
                <div className="p-6 pt-0 border-t border-slate-100 text-xs sm:text-sm text-slate-600 space-y-3 leading-relaxed">
                  <p>• <strong>Eligibility:</strong> Individuals aged 60 years and above. Retired civilian employees aged 55–60 and defense retirees aged 50–60 are also eligible subject to conditions.</p>
                  <p>• <strong>Deposit Limits:</strong> Minimum ₹1,000 and maximum ₹30 Lakhs per individual across all accounts.</p>
                  <p>• <strong>Tenure:</strong> Fixed 5 years, extendable by 3 years within 1 year of maturity.</p>
                  <p>• <strong>Tax Benefits:</strong> Principal deposit qualifies for Section 80C deduction up to ₹1.5 Lakhs. Interest is taxable based on income slab.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Sticky Results Card */}
          <div className="w-full lg:w-[380px]">
            <div className="bg-[#1e2a4f] rounded-2xl shadow-xl p-6 md:p-8 text-white sticky top-28 border border-slate-600/50">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-bold tracking-tight">SCSS Returns</h2>
                <button className="text-slate-400 hover:text-white transition-colors p-1" title="Share">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-8 bg-slate-800/80 p-5 rounded-2xl border border-slate-600">
                <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-1">
                  {formatCurrency(quarterlyInterest)}<span className="text-sm font-normal text-slate-300">/qtr</span>
                </div>
                <div className="text-slate-300 text-xs font-medium uppercase tracking-wider">Quarterly Interest Payout</div>
              </div>

              <div className="space-y-4 border-t border-slate-600/60 pt-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">Annual Interest Income</span>
                  <span className="font-semibold text-white">{formatCurrency(annualInterest)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">Total Interest ({tenureYears} yr)</span>
                  <span className="font-semibold text-emerald-400">{formatCurrency(totalInterest)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">Maturity Amount</span>
                  <span className="font-semibold text-white">{formatCurrency(maturityAmount)}</span>
                </div>
                <div className="flex justify-between items-center text-sm pt-3 border-t border-slate-600/40">
                  <span className="text-slate-300">Tax Deduction (80C)</span>
                  <span className="font-semibold text-emerald-400">{formatCurrency(taxDeduction80C)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">TDS per Quarter</span>
                  <span className="font-semibold text-rose-400">{formatCurrency(tdsPerQuarter)}</span>
                </div>
              </div>

              <button className="w-full py-2.5 px-4 bg-[#eaa33a] hover:bg-[#d4902d] text-white font-semibold rounded-xl transition-colors mt-6 flex justify-center items-center gap-2">
                Speak to a Specialist <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </div>
        </div>

        {/* Informational SEO & FAQs Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-slate-200">
          <div className="md:col-span-2 space-y-8 text-slate-700 text-sm md:text-base leading-relaxed">
            <section className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-[#113262] mb-4">What is Senior Citizen Savings Scheme (SCSS)?</h2>
              <p className="text-slate-600 mb-4">
                The Senior Citizen Savings Scheme (SCSS) is a government-sponsored savings instrument designed exclusively for Indian citizens aged 60 years and above. It offers one of the highest interest rates among small savings schemes, providing a reliable source of regular income for retirees through quarterly interest payouts.
              </p>

              <h3 className="text-lg font-semibold text-slate-900 mb-2">Key Features</h3>
              <p className="text-slate-600 mb-4">
                SCSS has a maturity period of 5 years with an option to extend for an additional 3 years. The maximum investment limit is Rs 30 lakhs. Interest is paid quarterly, credited directly to the depositor's savings account. The current interest rate is 8.2% per annum, reviewed quarterly by the government.
              </p>

              <h3 className="text-lg font-semibold text-slate-900 mb-2">Benefits of SCSS</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                <li>Highest interest rate among government small savings schemes</li>
                <li>Quarterly interest payouts for regular income</li>
                <li>Tax deduction under Section 80C up to Rs 1.5 lakhs</li>
                <li>Government-backed, sovereign guarantee on investment</li>
                <li>Available at post offices and designated banks</li>
              </ul>

              <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Using the SCSS Calculator</h3>
              <p className="text-slate-600">
                Use our calculator to estimate your quarterly and annual interest income from SCSS. Enter your investment amount and see the total interest earned, maturity amount, tax benefits, and TDS implications for your retirement planning.
              </p>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-2xl font-bold text-[#113262]">Frequently Asked Questions</h2>

              <div className="border-b border-slate-100 pb-5">
                <h3 className="font-bold text-slate-900 mb-2">What is SCSS?</h3>
                <p className="text-slate-600 text-base">
                  Senior Citizen Savings Scheme (SCSS) is a government-backed savings instrument offering one of the highest interest rates for senior citizens. Currently earning approximately 8.2% per annum, it has a 5-year tenure (extendable by 3 years) and qualifies for Section 80C deduction. Maximum investment is Rs 30 lakh per individual.
                </p>
              </div>

              <div className="border-b border-slate-100 pb-5">
                <h3 className="font-bold text-slate-900 mb-2">Who is eligible for SCSS?</h3>
                <p className="text-slate-600 text-base">
                  Indian citizens aged 60 and above can invest in SCSS. Those who retire under VRS or superannuation at age 55-60 are also eligible within one month of receiving retirement benefits.
                </p>
              </div>

              <div className="border-b border-slate-100 pb-5">
                <h3 className="font-bold text-slate-900 mb-2">How is SCSS interest paid?</h3>
                <p className="text-slate-600 text-base">
                  SCSS interest is paid quarterly on April 1, July 1, October 1, and January 1. If the interest is not claimed, it does not earn additional interest. The interest is taxable at your slab rate and TDS is deducted if annual interest exceeds Rs 50,000.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-2">Can I withdraw SCSS prematurely?</h3>
                <p className="text-slate-600 text-base">
                  Premature withdrawal is allowed after 1 year with a penalty: 1.5% of the deposit if withdrawn after 1 year but before 2 years, and 1% if withdrawn after 2 years. After maturity, the scheme can be extended for 3 more years, with a withdrawal option in the first year of extension without penalty.
                </p>
              </div>
            </section>
          </div>

          {/* Right SEO Card */}
          <div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-lg">SCSS as a Retirement Income Tool</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                SCSS is one of the best fixed-income instruments for retirees in India, offering quarterly interest payments at rates higher than most bank FDs. With a Rs 30 lakh investment at 8.2%, you receive approximately Rs 61,500 per quarter (Rs 20,500 per month). Combined with other income sources, it provides a reliable cash flow foundation in retirement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
