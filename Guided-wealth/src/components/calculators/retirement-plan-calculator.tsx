import React, { useState, useEffect } from 'react';
import { Share2, ChevronDown, ChevronUp } from 'lucide-react';

export default function RetirementPlanCalculator() {
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(55);
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(100000);
  const [expectedInflation, setExpectedInflation] = useState<number>(6);
  const [expectedReturnsPre, setExpectedReturnsPre] = useState<number>(12);
  const [lifeExpectancy, setLifeExpectancy] = useState<number>(85);

  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [expectedReturnsPost, setExpectedReturnsPost] = useState<number>(8);

  const [requiredCorpus, setRequiredCorpus] = useState<number>(0);
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(0);
  const [yearlyInvestment, setYearlyInvestment] = useState<number>(0);
  const [oneTimeInvestment, setOneTimeInvestment] = useState<number>(0);
  const [monthlyExpAtRetirement, setMonthlyExpAtRetirement] = useState<number>(0);

  useEffect(() => {
    const yearsToRetire = Math.max(1, retirementAge - currentAge);
    const retirementDuration = Math.max(1, lifeExpectancy - retirementAge);

    // Monthly expense at retirement start
    const inflatedMonthly = monthlyExpenses * Math.pow(1 + expectedInflation / 100, yearsToRetire);
    const firstYearAnnualExp = inflatedMonthly * 12;

    // Post-retirement net real return rate
    const rNet = (1 + expectedReturnsPost / 100) / (1 + expectedInflation / 100) - 1;
    let corpus = 0;
    if (Math.abs(rNet) > 0.0001) {
      corpus = firstYearAnnualExp * ((1 - Math.pow(1 + rNet, -retirementDuration)) / rNet);
    } else {
      corpus = firstYearAnnualExp * retirementDuration;
    }

    // One-time investment required today
    const lumpsum = corpus / Math.pow(1 + expectedReturnsPre / 100, yearsToRetire);

    // Monthly SIP required
    const rPreMonthly = expectedReturnsPre / 100 / 12;
    const totalMonths = yearsToRetire * 12;
    let monthlySip = 0;
    if (rPreMonthly > 0) {
      monthlySip = corpus / (((Math.pow(1 + rPreMonthly, totalMonths) - 1) / rPreMonthly) * (1 + rPreMonthly));
    } else {
      monthlySip = corpus / totalMonths;
    }

    setRequiredCorpus(corpus);
    setMonthlyExpAtRetirement(inflatedMonthly);
    setOneTimeInvestment(lumpsum);
    setMonthlyInvestment(monthlySip);
    setYearlyInvestment(monthlySip * 12);
  }, [currentAge, retirementAge, monthlyExpenses, expectedInflation, expectedReturnsPre, lifeExpectancy, expectedReturnsPost]);

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
        <h1 className="text-2xl md:text-3xl font-bold text-[#113262] mb-4">Retirement Calculator</h1>
        <p className="text-slate-600 text-base">Plan your retirement fund with our calculator</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-8 mb-16">
          {/* Inputs Column */}
          <div className="flex-1 space-y-6">
            {/* Age Details */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <h2 className="text-xl font-bold text-[#113262] mb-4">Age Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-slate-700">Current Age</label>
                    <span className="text-sm font-semibold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md">{currentAge} Yr</span>
                  </div>
                  <input
                    type="range"
                    min="18"
                    max="70"
                    step="1"
                    value={currentAge}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setCurrentAge(val);
                      if (val >= retirementAge) setRetirementAge(val + 1);
                    }}

                    style={getSliderStyle(currentAge, "18", "70")}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#3b82f6] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#3b82f6] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1.5 font-medium">
                    <span>18 years</span>
                    <span>70 years</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-slate-700">Retirement Age</label>
                    <span className="text-sm font-semibold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md">{retirementAge} Yr</span>
                  </div>
                  <input
                    type="range"
                    min="35"
                    max="70"
                    step="1"
                    value={retirementAge}
                    onChange={(e) => setRetirementAge(Math.max(currentAge + 1, Number(e.target.value)))}

                    style={getSliderStyle(retirementAge, "35", "70")}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#3b82f6] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#3b82f6] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1.5 font-medium">
                    <span>35 years</span>
                    <span>70 years</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Details */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <h2 className="text-xl font-bold text-[#113262] mb-4">Financial Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Monthly Expenses</label>
                  <input
                    type="number"
                    value={monthlyExpenses}
                    onChange={(e) => setMonthlyExpenses(Math.max(0, Number(e.target.value)))}
                  />
                  <div>
                    <input
                      type="range"
                      min="10000"
                      max="500000"
                      step="5000"
                      value={monthlyExpenses}
                      onChange={(e) => setMonthlyExpenses(Number(e.target.value))}

                      style={getSliderStyle(monthlyExpenses, "10000", "500000")}
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
                  <div className="flex justify-between text-xs text-slate-400 mt-1.5 font-medium">
                    <span>0%</span>
                    <span>20%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Investment Details */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <h2 className="text-xl font-bold text-[#113262] mb-4">Investment Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-slate-700">Expected Returns before Retirement (%)</label>
                    <span className="text-sm font-semibold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md">{expectedReturnsPre}%</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="20"
                    step="0.5"
                    value={expectedReturnsPre}
                    onChange={(e) => setExpectedReturnsPre(Number(e.target.value))}

                    style={getSliderStyle(expectedReturnsPre, "4", "20")}
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
                    onChange={(e) => setLifeExpectancy(Math.max(retirementAge + 1, Number(e.target.value)))}

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
                <div className="p-6 pt-0 border-t border-slate-100 mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Expected Returns after Retirement (%)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={expectedReturnsPost}
                      onChange={(e) => setExpectedReturnsPost(Number(e.target.value))}
                      className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none font-semibold text-slate-800"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Results Sidebar */}
          <div className="w-full lg:w-[400px]">
            <div className="bg-[#1e2a4f] rounded-2xl shadow-xl p-6 md:p-8 text-white h-full flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-xl font-bold tracking-tight">Retirement Plan</h2>
                  <button className="text-slate-400 hover:text-white transition-colors" title="Share">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="mb-8">
                  <div className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-1">
                    {formatCurrency(requiredCorpus)}
                  </div>
                  <div className="text-slate-300 text-sm font-medium">Required retirement corpus</div>
                </div>

                <div className="space-y-4 border-t border-slate-600/60 pt-6">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-300">Monthly Investment</span>
                    <span className="font-semibold text-emerald-400">{formatCurrency(monthlyInvestment)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-300">Yearly Investment</span>
                    <span className="font-semibold text-white">{formatCurrency(yearlyInvestment)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-300">One Time Investment</span>
                    <span className="font-semibold text-white">{formatCurrency(oneTimeInvestment)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-600/40">
                    <span className="text-slate-300">Monthly Expense (At Retirement)</span>
                    <span className="font-semibold text-amber-400">{formatCurrency(monthlyExpAtRetirement)}</span>
                  </div>
                </div>
              </div>

              <button className="w-full py-2.5 px-4 bg-[#eaa33a] hover:bg-[#d4902d] text-white font-semibold rounded-xl transition-colors mt-6 flex justify-center items-center gap-2">
                Create Retirement Plan <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </div>
        </div>

        {/* Informational Section */}
        <div className="max-w-4xl space-y-12 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-[#113262] mb-4">Understanding Retirement Planning</h2>
            <p className="text-slate-600">
              Planning for retirement is one of the most crucial financial decisions you'll make. It's about creating a roadmap for your financial future that ensures comfort and security in your golden years.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-slate-900 mb-2">How This Calculator Works</h3>
            <p className="text-sm text-slate-600">
              Enter your current age, planned retirement age, current monthly expenses, expected inflation rate, and expected return on investments. The calculator computes your inflation-adjusted expenses at retirement, total corpus needed, and the monthly SIP required to reach that corpus.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-slate-900 mb-2">The Retirement Planning Gap in India</h3>
            <p className="text-sm text-slate-600">
              According to HSBC research, only 20% of working Indians have a formal retirement plan. The average Indian retiree has savings that last 5-7 years, while life expectancy continues to rise. Without systematic planning, many retirees face a significant shortfall in their later years.
            </p>
          </section>

          <section className="pt-6">
            <h2 className="text-xl font-bold text-[#113262] mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-6">
                <h3 className="font-semibold text-slate-900 mb-2">How much money do I need to retire in India?</h3>
                <p className="text-sm text-slate-600">A common rule of thumb is 25 times your annual expenses at retirement. If you spend ₹75,000 per month today and plan to retire in 20 years, your inflation-adjusted monthly expense will be approximately ₹2.4 Lakh (at 6% inflation), requiring a corpus of about ₹7.2 Crore.</p>
              </div>

              <div className="border-b border-slate-200 pb-6">
                <h3 className="font-semibold text-slate-900 mb-2">What is the 4% withdrawal rule?</h3>
                <p className="text-sm text-slate-600">The 4% rule suggests you can withdraw 4% of your retirement corpus annually (adjusted for inflation) without running out of money over a 30-year retirement.</p>
              </div>

              <div className="pb-6">
                <h3 className="font-semibold text-slate-900 mb-2">At what age should I start retirement planning?</h3>
                <p className="text-sm text-slate-600">Starting at age 25 versus 35 roughly halves the monthly SIP needed for the same retirement corpus, thanks to compounding.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
