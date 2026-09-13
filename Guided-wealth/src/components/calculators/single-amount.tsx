import React, { useState, useEffect } from 'react';
import { Share2, ChevronDown, ChevronUp, TrendingUp, DollarSign, Calendar, Percent, Sliders, Info } from 'lucide-react';

export default function SingleAmount() {
  // Investment Details Inputs
  const [initialInvestment, setInitialInvestment] = useState<number>(100000);
  const [expectedReturnRate, setExpectedReturnRate] = useState<number>(12);
  const [investmentPeriodYears, setInvestmentPeriodYears] = useState<number>(10);

  // Advanced Inputs
  const [showAdvanced, setShowAdvanced] = useState<boolean>(true);
  const [inflationRate, setInflationRate] = useState<number>(6);
  const [taxRate, setTaxRate] = useState<number>(10);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Computed Outputs
  const [futureValue, setFutureValue] = useState<number>(0);
  const [absoluteReturn, setAbsoluteReturn] = useState<number>(0);
  const [realValueAfterInflation, setRealValueAfterInflation] = useState<number>(0);
  const [realReturnAfterInflation, setRealReturnAfterInflation] = useState<number>(0);
  const [taxOnGains, setTaxOnGains] = useState<number>(0);
  const [postTaxFutureValue, setPostTaxFutureValue] = useState<number>(0);

  useEffect(() => {
    const r = expectedReturnRate / 100;
    const n = Math.max(1, investmentPeriodYears);
    const inf = inflationRate / 100;

    const futVal = Math.round(initialInvestment * Math.pow(1 + r, n));
    const absRet = futVal - initialInvestment;

    const realVal = Math.round(futVal / Math.pow(1 + inf, n));
    const realRet = ((1 + r) / (1 + inf) - 1) * 100;

    const taxAmt = Math.round(absRet * (taxRate / 100));
    const postTaxFut = initialInvestment + (absRet - taxAmt);

    setFutureValue(futVal);
    setAbsoluteReturn(absRet);
    setRealValueAfterInflation(realVal);
    setRealReturnAfterInflation(realRet);
    setTaxOnGains(taxAmt);
    setPostTaxFutureValue(postTaxFut);
  }, [initialInvestment, expectedReturnRate, investmentPeriodYears, inflationRate, taxRate]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: 'How do I calculate the future value of a single lump sum amount?',
      a: 'Future Value (FV) = Present Value × (1 + Rate of Return)^Years. For example, ₹1 Lakh invested at 12% for 10 years grows to ₹3.10 Lakh. This formula assumes compound annual growth.',
    },
    {
      q: 'How long does it take to double a single investment?',
      a: 'Use the Rule of 72: divide 72 by the annual return rate. At 8% return, money doubles in 9 years. At 12%, in 6 years. At 15%, in approximately 4.8 years. For tripling, use the Rule of 114.',
    },
    {
      q: 'Is a lump sum investment better than SIP for mutual funds?',
      a: 'Lump sum investment works best when market valuations are attractive or during market dips, maximizing time in the market. SIP (Systematic Investment Plan) is better for regular cash flows and rupee cost averaging during volatile markets.',
    },
    {
      q: 'How are capital gains taxed on single mutual fund investments in India?',
      a: 'For Equity Mutual Funds: Long Term Capital Gains (LTCG held > 1 yr) above ₹1.25 Lakh per financial year are taxed at 12.5%. Short Term Capital Gains (STCG held < 1 yr) are taxed at 20%. Debt funds are taxed at your applicable income tax slab rate.',
    },
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
        <h1 className="text-2xl md:text-3xl font-bold text-[#113262] mb-4">Single Amount Investment Calculator</h1>
        <p className="text-slate-600 text-base">
          Calculate future returns, CAGR, real inflation-adjusted wealth, and capital gains tax on a lump sum investment.
        </p>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 mt-12">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#113262]" /> Investment Details
              </h2>

              {/* Initial Investment */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-slate-700">Initial Investment (₹)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">₹</span>
                    <input
                      type="number"
                      value={initialInvestment}
                      onChange={(e) => setInitialInvestment(Math.max(0, Number(e.target.value)))}
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="10000000"
                  step="10000"
                  value={initialInvestment}
                  onChange={(e) => setInitialInvestment(Number(e.target.value))}

                  style={getSliderStyle(initialInvestment, "1000", "10000000")}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#3b82f6] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#3b82f6] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
                />
              </div>

              {/* Expected Return & Investment Period */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-slate-700">Expected Annual Return (% p.a.)</label>
                    <span className="font-bold text-[#113262] text-sm bg-sky-50 px-2.5 py-1 rounded-md">{expectedReturnRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="0.5"
                    value={expectedReturnRate}
                    onChange={(e) => setExpectedReturnRate(Number(e.target.value))}

                    style={getSliderStyle(expectedReturnRate, "1", "30")}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#3b82f6] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#3b82f6] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-slate-700">Investment Period (Years)</label>
                    <span className="font-bold text-slate-900 text-sm bg-slate-100 px-2.5 py-1 rounded-md">{investmentPeriodYears} Years</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    step="1"
                    value={investmentPeriodYears}
                    onChange={(e) => setInvestmentPeriodYears(Number(e.target.value))}

                    style={getSliderStyle(investmentPeriodYears, "1", "50")}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#3b82f6] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#3b82f6] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
                  />
                </div>
              </div>

              {/* Collapsible Advanced Settings */}
              <div className="pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center justify-between w-full text-sm font-bold text-slate-800 hover:text-[#113262] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[#113262]" /> Inflation & Tax Adjustments
                  </span>
                  {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {showAdvanced && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-medium text-slate-700">Inflation Rate (%)</label>
                        <span className="font-bold text-slate-900 text-xs">{inflationRate}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="15"
                        step="0.5"
                        value={inflationRate}
                        onChange={(e) => setInflationRate(Number(e.target.value))}

                        style={getSliderStyle(inflationRate, "0", "15")}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#3b82f6] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#3b82f6] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-medium text-slate-700">Capital Gains Tax Rate (%)</label>
                        <span className="font-bold text-slate-900 text-xs">{taxRate}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="30"
                        step="1"
                        value={taxRate}
                        onChange={(e) => setTaxRate(Number(e.target.value))}

                        style={getSliderStyle(taxRate, "0", "30")}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#3b82f6] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#3b82f6] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Dark Navy Sticky Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="bg-[#1e2a4f] text-white rounded-2xl p-6 shadow-xl border border-slate-800">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-bold">Investment Returns</h3>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: 'Lump Sum Investment Returns Summary',
                        text: `Future Value of ${formatCurrency(initialInvestment)} at ${expectedReturnRate}% for ${investmentPeriodYears} years is ${formatCurrency(futureValue)}.`,
                        url: window.location.href,
                      }).catch(() => { });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Link copied to clipboard!');
                    }
                  }}
                  className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                  title="Share"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Highlight Hero Output */}
              <div className="mb-6 p-4 rounded-xl bg-slate-800/80 border border-slate-600/50">
                <div className="text-xs text-slate-400 mb-1 font-medium">Future Value</div>
                <div className="text-3xl font-extrabold text-white">{formatCurrency(futureValue)}</div>
                <div className="text-xs text-emerald-400 mt-1 font-medium">
                  + {formatCurrency(absoluteReturn)} gain
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="space-y-3.5 text-sm border-t border-slate-800 pt-4">
                <div className="flex justify-between items-center text-slate-300">
                  <span>Initial Investment</span>
                  <span className="font-semibold text-white">{formatCurrency(initialInvestment)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>Absolute Return</span>
                  <span className="font-semibold text-emerald-400">{formatCurrency(absoluteReturn)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>CAGR (Annual Growth)</span>
                  <span className="font-semibold text-white">{expectedReturnRate}%</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>Real Value After Inflation</span>
                  <span className="font-semibold text-white">{formatCurrency(realValueAfterInflation)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>Real Return After Inflation</span>
                  <span className="font-semibold text-white">{realReturnAfterInflation.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between items-center text-slate-300 pt-3 border-t border-slate-800">
                  <span className="font-bold text-white">Tax on Gains</span>
                  <span className="font-bold text-rose-400 text-base">{formatCurrency(taxOnGains)}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800">
                <button
                  onClick={() => window.scrollTo({ top: 1000, behavior: 'smooth' })}
                  className="w-full py-2.5 px-4 bg-[#eaa33a] hover:bg-[#d4902d] text-white font-semibold rounded-xl transition-colors mt-6 flex justify-center items-center gap-2"
                >
                  Start Investing Now →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Informational SEO Content & Guide */}
        <div className="max-w-4xl space-y-12 text-slate-700 leading-relaxed mt-12">
          <h2 className="text-xl font-bold text-[#113262] mb-4">Project Your Lump Sum Growth</h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
            Enter a single investment amount, expected annual return, and investment period. The calculator shows the future value with a detailed breakdown. It helps you understand the impact of compounding on a one-time investment and compare returns under different rate assumptions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-700 border-t border-slate-100 pt-6">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Key Components</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                <li><strong>Initial Investment Amount:</strong> One-time capital deployed.</li>
                <li><strong>Investment Period:</strong> Duration in years.</li>
                <li><strong>Annual Interest Rate:</strong> Compounded annual return.</li>
                <li><strong>Real Value:</strong> Inflation-adjusted purchasing power.</li>
                <li><strong>Capital Gains Tax:</strong> Applicable tax on gains.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">How It Works</h3>
              <p className="mb-2">The calculator uses compound interest formula:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                <li><strong>Future Value:</strong> Present Value × (1 + Rate)ⁿ</li>
                <li><strong>Real Value:</strong> Future Value / (1 + Inflation)ⁿ</li>
                <li><strong>Post-Tax Value:</strong> Initial + (Gains × (1 - Tax Rate))</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 mt-12">
          <h2 className="text-xl font-bold text-[#113262] mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex justify-between items-center p-4 text-left font-semibold text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-slate-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="p-4 pt-0 text-sm text-slate-600 border-t border-slate-100 bg-slate-50/50 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
