import React, { useState, useEffect } from 'react';
import { Share2, ChevronDown, ChevronUp } from 'lucide-react';

export default function AgingParents() {
  const [currentAge, setCurrentAge] = useState<number>(50);
  const [plannedSupportAge, setPlannedSupportAge] = useState<number>(60);
  const [monthlyExpenditure, setMonthlyExpenditure] = useState<number>(100000);
  const [expectedInflation, setExpectedInflation] = useState<number>(6);
  const [expectedReturns, setExpectedReturns] = useState<number>(12);
  const [lifeExpectancy, setLifeExpectancy] = useState<number>(85);

  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  const [requiredCorpus, setRequiredCorpus] = useState<number>(0);
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(0);
  const [yearlyInvestment, setYearlyInvestment] = useState<number>(0);
  const [oneTimeInvestment, setOneTimeInvestment] = useState<number>(0);
  const [monthlyExpAfterRetirement, setMonthlyExpAfterRetirement] = useState<number>(0);

  useEffect(() => {
    const yearsToWait = Math.max(0, plannedSupportAge - currentAge);
    const supportDurationYears = Math.max(1, lifeExpectancy - plannedSupportAge);

    // Inflated monthly expense at start of support
    const inflatedMonthly = monthlyExpenditure * Math.pow(1 + expectedInflation / 100, yearsToWait);
    const firstYearAnnualExp = inflatedMonthly * 12;

    // Corpus required at start of support (Present Value of growing annuity during support years)
    const rNet = (1 + expectedReturns / 100) / (1 + expectedInflation / 100) - 1;
    let corpus = 0;
    if (Math.abs(rNet) > 0.0001) {
      corpus = firstYearAnnualExp * ((1 - Math.pow(1 + rNet, -supportDurationYears)) / rNet);
    } else {
      corpus = firstYearAnnualExp * supportDurationYears;
    }

    // Required One-time investment today
    const lumpsumToday = corpus / Math.pow(1 + expectedReturns / 100, Math.max(1, yearsToWait));

    // Required Monthly SIP today
    let monthlySip = 0;
    if (yearsToWait > 0) {
      const rMonthly = expectedReturns / 100 / 12;
      const totalMonths = yearsToWait * 12;
      monthlySip = corpus / (((Math.pow(1 + rMonthly, totalMonths) - 1) / rMonthly) * (1 + rMonthly));
    } else {
      monthlySip = corpus;
    }

    setRequiredCorpus(corpus);
    setMonthlyExpAfterRetirement(inflatedMonthly);
    setOneTimeInvestment(lumpsumToday);
    setMonthlyInvestment(monthlySip);
    setYearlyInvestment(monthlySip * 12);
  }, [currentAge, plannedSupportAge, monthlyExpenditure, expectedInflation, expectedReturns, lifeExpectancy]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };
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
      {/* Header */}
      <div className="bg-white pt-32 pb-10 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-[#113262] mb-4">Aging Parents Calculator</h1>
        <p className="text-slate-600 text-base">Calculate the investment required to secure your parents' future</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-8 mb-16">
          {/* Inputs Column */}
          <div className="flex-1 space-y-6">
            {/* Basic Details */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <h2 className="text-xl font-bold text-[#113262] mb-4">Basic Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-slate-700">Current Age of Your Parent</label>
                    <span className="text-sm font-semibold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md">{currentAge} Yr</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="100"
                    step="1"
                    value={currentAge}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setCurrentAge(val);
                      if (val >= plannedSupportAge) setPlannedSupportAge(val + 1);
                    }}

                    style={getSliderStyle(currentAge, "40", "100")}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#3b82f6] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#3b82f6] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-slate-700">Planned Support Age</label>
                    <span className="text-sm font-semibold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md">{plannedSupportAge} Yr</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="100"
                    step="1"
                    value={plannedSupportAge}
                    onChange={(e) => setPlannedSupportAge(Math.max(currentAge + 1, Number(e.target.value)))}

                    style={getSliderStyle(plannedSupportAge, "40", "100")}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#3b82f6] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#3b82f6] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
                  />
                </div>
              </div>
            </div>

            {/* Financial Details */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <h2 className="text-xl font-bold text-[#113262] mb-4">Financial Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Monthly Expenditure</label>
                  <input
                    type="number"
                    value={monthlyExpenditure}
                    onChange={(e) => setMonthlyExpenditure(Math.max(0, Number(e.target.value)))}
                  />
                  <div>
                    <input
                      type="range"
                      min="10000"
                      max="500000"
                      step="5000"
                      value={monthlyExpenditure}
                      onChange={(e) => setMonthlyExpenditure(Number(e.target.value))}

                      style={getSliderStyle(monthlyExpenditure, "10000", "500000")}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#3b82f6] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#3b82f6] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-slate-700">Expected Inflation (%)</label>
                    <span className="text-sm font-semibold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md">{expectedInflation}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    step="0.5"
                    value={expectedInflation}
                    onChange={(e) => setExpectedInflation(Number(e.target.value))}

                    style={getSliderStyle(expectedInflation, "0", "20")}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#3b82f6] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#3b82f6] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
                  />
                </div>
              </div>
            </div>

            {/* Investment Settings */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <h2 className="text-xl font-bold text-[#113262] mb-4">Investment Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-slate-700">Expected Returns (%)</label>
                    <span className="text-sm font-semibold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md">{expectedReturns}%</span>
                  </div>
                  <input
                    type="range"
                    min="6"
                    max="20"
                    step="0.5"
                    value={expectedReturns}
                    onChange={(e) => setExpectedReturns(Number(e.target.value))}

                    style={getSliderStyle(expectedReturns, "6", "20")}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#3b82f6] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#3b82f6] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-slate-700">Life Expectancy</label>
                    <span className="text-sm font-semibold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md">{lifeExpectancy} Yr</span>
                  </div>
                  <input
                    type="range"
                    min="70"
                    max="100"
                    step="1"
                    value={lifeExpectancy}
                    onChange={(e) => setLifeExpectancy(Math.max(plannedSupportAge + 1, Number(e.target.value)))}

                    style={getSliderStyle(lifeExpectancy, "70", "100")}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#3b82f6] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#3b82f6] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
                  />
                </div>
              </div>
            </div>

            {/* Advanced Settings */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full p-6 flex justify-between items-center font-semibold text-slate-900 hover:bg-slate-50 transition-colors"
              >
                <span>Advanced Settings</span>
                {showAdvanced ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
              </button>

              {showAdvanced && (
                <div className="p-6 pt-0 border-t border-slate-100 mt-4 text-xs text-slate-500">
                  Accounts for healthcare inflation (typically 10-12% p.a. in India) and post-retirement cash flow drawdowns.
                </div>
              )}
            </div>
          </div>

          {/* Results Sidebar */}
          <div className="w-full lg:w-[400px]">
            <div className="bg-[#1e2a4f] rounded-2xl shadow-xl p-6 md:p-8 text-white h-full flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-xl font-bold tracking-tight">Aging Parents Corpus</h2>
                  <button className="text-slate-400 hover:text-white transition-colors" title="Share">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="mb-8">
                  <div className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-1">
                    {formatCurrency(requiredCorpus)}
                  </div>
                  <div className="text-slate-300 text-sm font-medium">Required Amount (inflation adjusted)</div>
                </div>

                <div className="space-y-4 border-t border-slate-600/60 pt-6">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-300">Monthly Investment</span>
                    <span className="font-semibold text-white">{formatCurrency(monthlyInvestment)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-300">Yearly Investment</span>
                    <span className="font-semibold text-white">{formatCurrency(yearlyInvestment)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-300">One-Time Investment</span>
                    <span className="font-semibold text-white">{formatCurrency(oneTimeInvestment)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-600/40">
                    <span className="text-slate-300">Monthly Expense (After Retirement)</span>
                    <span className="font-semibold text-emerald-400">{formatCurrency(monthlyExpAfterRetirement)}</span>
                  </div>
                </div>
              </div>

              <button className="w-full py-2.5 px-4 bg-[#eaa33a] hover:bg-[#d4902d] text-white font-semibold rounded-xl transition-colors mt-6 flex justify-center items-center gap-2">
                Get Started <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </div>
        </div>

        {/* Informational Section */}
        <div className="max-w-4xl space-y-12 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-[#113262] mb-4">Understanding Aging Parents' Investment Planning</h2>
            <p className="text-slate-600">
              Securing your elderly parents' financial well-being requires a thoughtful investment strategy that safeguards their retirement years. A well-structured aging parents' investment plan ensures they can maintain their lifestyle without financial stress while having access to necessary resources for their care and comfort.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-slate-900 mb-2">Key Reasons for Creating an Aging Parents' Plan:</h3>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Provides financial security and peace of mind for both parents and children.</li>
              <li>Helps manage and anticipate future healthcare and living expenses.</li>
              <li>Ensures proper allocation of resources for long-term care needs.</li>
              <li>Protects against unexpected financial challenges.</li>
            </ul>
          </section>

          <section className="pt-6">
            <h2 className="text-xl font-bold text-[#113262] mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-6">
                <h3 className="font-semibold text-slate-900 mb-2">How much should I budget for elderly parent care?</h3>
                <p className="text-sm text-slate-600">Budget ₹20,000-50,000 per month for basic care (medications, regular check-ups, domestic help) and ₹50,000-2,00,000 per month for comprehensive care (home nursing, chronic illness management, assisted living). Healthcare costs for seniors in India are rising at 10-12% annually.</p>
              </div>

              <div className="pb-6">
                <h3 className="font-semibold text-slate-900 mb-2">Should I get health insurance for elderly parents?</h3>
                <p className="text-sm text-slate-600">Yes. Senior citizen health insurance (₹5-25 Lakh cover) costs ₹30,000-60,000+ annually depending on age and pre-existing conditions. Even with waiting periods for pre-existing conditions, it protects against catastrophic medical bills.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
