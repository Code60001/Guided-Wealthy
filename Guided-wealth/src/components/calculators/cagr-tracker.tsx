import React, { useState, useEffect, ChangeEvent } from 'react';
import { Share2 } from 'lucide-react';

export default function CagrTracker() {
  const [initialInvestment, setInitialInvestment] = useState<number>(2570000);
  const [futureValue, setFutureValue] = useState<number>(14440000);
  const [years, setYears] = useState<number>(12);
  const [cagr, setCagr] = useState<number>(0);

  useEffect(() => {
    if (initialInvestment > 0 && years > 0) {
      const result = (Math.pow(futureValue / initialInvestment, 1 / years) - 1) * 100;
      setCagr(result);
    } else {
      setCagr(0);
    }
  }, [initialInvestment, futureValue, years]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleInitialInvestmentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInitialInvestment(Number(e.target.value));
  };

  const handleFutureValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFutureValue(Number(e.target.value));
  };

  const handleYearsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setYears(Number(e.target.value));
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
        <h1 className="text-2xl md:text-3xl font-bold text-[#113262] mb-4">CAGR Tracker</h1>
        <p className="text-slate-600 text-base">Track Your Wealth Growth with CAGR Calculator</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Calculator Section */}
        <div className="flex flex-col lg:flex-row gap-8 mb-16">
          {/* Left Column: Inputs */}
          <div className="flex-1 space-y-4">
            {/* Investment Details */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Investment Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Initial Investment</label>
                  <input
                    type="number"
                    value={initialInvestment}
                    onChange={handleInitialInvestmentChange}
                  />
                  <div>
                    <input
                      type="range"
                      min="100000"
                      max="100000000"
                      step="100000"
                      value={initialInvestment}
                      onChange={handleInitialInvestmentChange}
                    
                      style={getSliderStyle(initialInvestment, "100000", "100000000")}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#3b82f6] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#3b82f6] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-1.5 font-medium">
                      <span>₹1L</span>
                      <span>₹10Cr</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Future Value</label>
                  <input
                    type="number"
                    value={futureValue}
                    onChange={handleFutureValueChange}
                  />
                  <div>
                    <input
                      type="range"
                      min="100000"
                      max="500000000"
                      step="100000"
                      value={futureValue}
                      onChange={handleFutureValueChange}
                    
                      style={getSliderStyle(futureValue, "100000", "500000000")}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#3b82f6] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#3b82f6] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-1.5 font-medium">
                      <span>₹1L</span>
                      <span>₹50Cr</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Time Period */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Time Period</h2>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Investment Period (Years)</label>
                <input
                  type="number"
                  value={years}
                  onChange={handleYearsChange}
                />
                <div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    step="1"
                    value={years}
                    onChange={handleYearsChange}
                  
                      style={getSliderStyle(years, "1", "50")}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#3b82f6] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#3b82f6] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
                    />
                  <div className="flex justify-between text-xs text-slate-400 mt-1.5 font-medium">
                    <span>1 year</span>
                    <span>50 years</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Results */}
          <div className="w-full lg:w-[400px]">
            <div className="bg-[#1e2a4f] rounded-2xl shadow-lg p-5 text-white h-full flex flex-col">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold">CAGR Summary</h2>
                <button className="text-slate-300 hover:text-white transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              <hr className="border-slate-600 mb-4" />

              <div className="mb-6">
                <div className="text-3xl font-bold mb-1">{isFinite(cagr) ? cagr.toFixed(2) : 0}%</div>
                <div className="text-slate-300 text-sm">Compound Annual Growth Rate</div>
              </div>

              <div className="flex-1">
                <div className="text-sm text-slate-300 mb-2">Investment Details</div>

                <div className="flex flex-col">
                  <div className="flex justify-between items-center py-2.5 border-t border-slate-600">
                    <span className="text-slate-300 text-sm">Initial Investment</span>
                    <span className="font-semibold">{formatCurrency(initialInvestment)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2.5 border-t border-slate-600">
                    <span className="text-slate-300 text-sm">Future Value</span>
                    <span className="font-semibold">{formatCurrency(futureValue)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2.5 border-t border-slate-600">
                    <span className="text-slate-300 text-sm">Time Period</span>
                    <span className="font-semibold">{years} Years</span>
                  </div>
                </div>
              </div>

              <button className="w-full py-2.5 px-4 bg-[#eaa33a] hover:bg-[#d4902d] text-white font-semibold rounded-xl transition-colors mt-6 flex justify-center items-center gap-2">
                Start Planning <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </div>
        </div>

        {/* Informational Content Section */}
        <div className="max-w-4xl space-y-12 text-slate-700 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-[#113262] mb-4">Understanding CAGR (Compound Annual Growth Rate)</h2>
            <p className="mb-6">
              CAGR represents the steady rate at which an investment would have grown if it had increased at a constant rate. This powerful metric accounts for the compounding effect of returns over time, making it an essential tool for evaluating investment performance and comparing different opportunities.
            </p>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
              <h3 className="font-semibold text-slate-900 mb-2">Practical Example</h3>
              <p className="text-sm">
                Consider an initial investment of ₹50,000 that grows to ₹82,000 over three years. While the total growth is 64%, the CAGR provides a more nuanced view by calculating the consistent annual rate needed to achieve this growth. In this case, the CAGR would be approximately 18% per year.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#113262] mb-4">The Value of CAGR in Investment Analysis</h2>
            <p className="mb-4">CAGR serves as a vital tool in investment analysis for several reasons:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>It smooths out investment returns, providing a clearer picture of performance over time</li>
              <li>Enables meaningful comparisons between different investment options</li>
              <li>Helps in setting realistic growth expectations and investment goals</li>
              <li>Accounts for the power of compound growth in long-term investments</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#113262] mb-4">Using Our CAGR Calculator</h2>
            <p className="mb-4">Our calculator simplifies the process of determining your investment's compound annual growth rate. Simply input:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Your initial investment amount</li>
              <li>The final value of your investment</li>
              <li>The investment period in years</li>
            </ul>
            <p>The calculator instantly computes the CAGR, helping you make informed investment decisions based on historical performance.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#113262] mb-4">CAGR Calculation Method</h2>
            <p className="mb-6">The CAGR formula takes into account three key elements:</p>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 font-mono text-sm mb-4">
              <p>CAGR = (Final Value / Initial Value)^(1/n) - 1</p>
              <p>Where 'n' represents the number of years</p>
            </div>
            <p>While this formula might seem complex, our calculator handles all the mathematical work, providing you with instant, accurate results.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#113262] mb-6">Advantages of CAGR Analysis</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                <h3 className="font-semibold text-slate-900 mb-4">For Individual Investors</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Track portfolio performance effectively</li>
                  <li>Make data-driven investment decisions</li>
                  <li>Set realistic investment goals</li>
                  <li>Compare different investment options</li>
                </ul>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                <h3 className="font-semibold text-slate-900 mb-4">For Financial Professionals</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Evaluate investment products objectively</li>
                  <li>Create comprehensive client reports</li>
                  <li>Develop investment strategies</li>
                  <li>Benchmark performance metrics</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-slate-50 p-8 rounded-2xl border border-slate-100 mt-12">
            <h3 className="text-lg font-bold text-[#113262] mb-4">When to Use CAGR</h3>
            <p className="text-sm">
              Use CAGR to compare investment performance across different time periods and asset classes. It is the standard metric used by mutual fund factsheets, portfolio managers, and financial analysts to report long-term returns. Always compare CAGR over the same time period for a fair comparison.
            </p>
          </section>

          <section className="pt-8">
            <h2 className="text-xl font-bold text-[#113262] mb-8">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-6">
                <h3 className="font-semibold text-slate-900 mb-2">What is CAGR?</h3>
                <p className="text-sm text-slate-600">CAGR (Compound Annual Growth Rate) is the average annual growth rate of an investment over a specified period longer than one year. It smooths out year-to-year fluctuations and tells you the rate at which your investment would have grown if it had grown at a steady rate every year.</p>
              </div>

              <div className="border-b border-slate-200 pb-6">
                <h3 className="font-semibold text-slate-900 mb-2">How is CAGR calculated?</h3>
                <p className="text-sm text-slate-600">CAGR = (Ending Value / Beginning Value)^(1/Number of Years) - 1. For example, if you invested Rs 1 lakh and it grew to Rs 2 lakh in 5 years, CAGR = (2,00,000/1,00,000)^(1/5) - 1 = 14.87%.</p>
              </div>

              <div className="border-b border-slate-200 pb-6">
                <h3 className="font-semibold text-slate-900 mb-2">Is CAGR the same as average return?</h3>
                <p className="text-sm text-slate-600">No. Average return is the simple arithmetic mean of annual returns, which can be misleading. CAGR accounts for compounding and gives the true annualised growth rate. A fund that returns +50% one year and -33% the next has a 0% CAGR but an 8.5% average return.</p>
              </div>

              <div className="pb-6">
                <h3 className="font-semibold text-slate-900 mb-2">What is a good CAGR for equity investments in India?</h3>
                <p className="text-sm text-slate-600">The Nifty 50 has delivered approximately 12-14% CAGR over the last 20 years. A well managed equity mutual fund might deliver 14-18% CAGR over a 10-year period. For debt investments, 6-8% CAGR is typical.</p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
