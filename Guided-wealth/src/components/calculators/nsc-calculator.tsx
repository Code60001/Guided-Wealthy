import React, { useState, useEffect } from 'react';
import { Share2, ChevronDown, ChevronUp } from 'lucide-react';

interface YearBreakdown {
  year: number;
  openingBalance: number;
  interestEarned: number;
  closingBalance: number;
  eligible80C: string;
}

export default function NscCalculator() {
  const [investmentAmount, setInvestmentAmount] = useState<number>(150000);
  const [interestRate, setInterestRate] = useState<number>(7.7);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  const [maturityValue, setMaturityValue] = useState<number>(0);
  const [totalInterestEarned, setTotalInterestEarned] = useState<number>(0);
  const [deduction80C, setDeduction80C] = useState<number>(0);
  const [breakdown, setBreakdown] = useState<YearBreakdown[]>([]);

  useEffect(() => {
    if (investmentAmount <= 0 || interestRate <= 0) {
      setMaturityValue(0);
      setTotalInterestEarned(0);
      setDeduction80C(0);
      setBreakdown([]);
      return;
    }

    const r = interestRate / 100;
    let balance = investmentAmount;
    const rows: YearBreakdown[] = [];

    for (let y = 1; y <= 5; y++) {
      const opening = balance;
      const interest = opening * r;
      const closing = opening + interest;
      balance = closing;

      rows.push({
        year: y,
        openingBalance: opening,
        interestEarned: interest,
        closingBalance: closing,
        eligible80C: y < 5 ? 'Yes' : 'Taxable',
      });
    }

    const totInterest = balance - investmentAmount;
    // Section 80C deduction includes initial deposit + deemed reinvested interest up to Y4
    const eligible80CTotal = rows[3] ? rows[3].closingBalance : investmentAmount;

    setMaturityValue(balance);
    setTotalInterestEarned(totInterest);
    setDeduction80C(eligible80CTotal);
    setBreakdown(rows);
  }, [investmentAmount, interestRate]);

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
        <h1 className="text-2xl md:text-3xl font-bold text-[#113262] mb-4">NSC Calculator</h1>
        <p className="text-slate-600 text-base">Calculate your National Savings Certificate returns</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Main Section */}
        <div className="flex flex-col lg:flex-row gap-8 mb-16">
          {/* Inputs Column */}
          <div className="flex-1 space-y-6">
            {/* Investment Details */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <h2 className="text-xl font-bold text-[#113262] mb-4">Investment Details</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Investment Amount</label>
                    <input
                      type="number"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(Math.max(0, Number(e.target.value)))}
                    />
                    <div>
                      <input
                        type="range"
                        min="1000"
                        max="1500000"
                        step="5000"
                        value={investmentAmount}
                        onChange={(e) => setInvestmentAmount(Number(e.target.value))}

                        style={getSliderStyle(investmentAmount, "1000", "1500000")}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#3b82f6] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#3b82f6] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
                      />
                      <div className="flex justify-between text-xs text-slate-400 mt-1.5 font-medium">
                        <span>₹1,000</span>
                        <span>₹15 Lakh</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-slate-700">Interest Rate (%)</label>
                      <span className="text-sm font-semibold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md">{interestRate}%</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="10"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}

                      style={getSliderStyle(interestRate, "5", "10")}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#3b82f6] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#3b82f6] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-1.5 font-medium">
                      <span>5%</span>
                      <span>10%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Maturity Period</label>
                  <input
                    type="text"
                    disabled
                    value="5 Years (Fixed for NSC VIII)"
                    className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-lg text-slate-600 font-medium text-sm cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Year-wise Breakdown Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 overflow-x-auto">
              <h2 className="text-xl font-bold text-[#113262] mb-4">Year-wise Breakdown</h2>
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50">
                    <th className="py-3 px-3">Year</th>
                    <th className="py-3 px-3">Opening Balance</th>
                    <th className="py-3 px-3">Interest Earned</th>
                    <th className="py-3 px-3">Closing Balance</th>
                    <th className="py-3 px-3">80C Eligible</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {breakdown.map((row) => (
                    <tr key={row.year} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-3 text-slate-900 font-semibold">Year {row.year}</td>
                      <td className="py-3 px-3">{formatCurrency(row.openingBalance)}</td>
                      <td className="py-3 px-3 text-emerald-600">{formatCurrency(row.interestEarned)}</td>
                      <td className="py-3 px-3 text-slate-900 font-semibold">{formatCurrency(row.closingBalance)}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${row.eligible80C === 'Yes' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                          {row.eligible80C}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xs text-slate-400 mt-4 italic">
                *Interest from years 1–4 is deemed reinvested and qualifies for Section 80C deduction. Year 5 interest is taxable as income.
              </p>
            </div>

            {/* Tax Benefits Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full p-6 flex justify-between items-center font-semibold text-slate-900 hover:bg-slate-50 transition-colors"
              >
                <span>Tax Benefits Details</span>
                {showAdvanced ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
              </button>

              {showAdvanced && (
                <div className="p-6 pt-0 border-t border-slate-100 mt-4 text-xs text-slate-600 space-y-2">
                  <p>• Initial investment qualifies for Section 80C deduction up to ₹1.5 Lakh/yr.</p>
                  <p>• Annual interest earned for the first 4 years is automatically reinvested into NSC and qualifies for 80C.</p>
                  <p>• No TDS is deducted on NSC interest at source.</p>
                </div>
              )}
            </div>
          </div>

          {/* Results Sidebar */}
          <div className="w-full lg:w-[400px]">
            <div className="bg-[#1e2a4f] rounded-2xl shadow-xl p-6 md:p-8 text-white h-full flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-xl font-bold tracking-tight">NSC Returns</h2>
                  <button className="text-slate-400 hover:text-white transition-colors" title="Share">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="mb-8">
                  <div className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-1">
                    {formatCurrency(maturityValue)}
                  </div>
                  <div className="text-slate-300 text-sm font-medium">Maturity Value</div>
                </div>

                <div className="space-y-4 border-t border-slate-600/60 pt-6">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-300">Total Interest Earned</span>
                    <span className="font-semibold text-emerald-400">{formatCurrency(totalInterestEarned)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-300">Investment Amount</span>
                    <span className="font-semibold text-white">{formatCurrency(investmentAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-300">Tax Deduction (80C)</span>
                    <span className="font-semibold text-white">{formatCurrency(deduction80C)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-600/40">
                    <span className="text-slate-300">Effective Return Rate</span>
                    <span className="font-semibold text-emerald-400">{interestRate.toFixed(2)}%</span>
                  </div>
                </div>
              </div>

              <button className="w-full py-2.5 px-4 bg-[#eaa33a] hover:bg-[#d4902d] text-white font-semibold rounded-xl transition-colors mt-6 flex justify-center items-center gap-2">
                Start Investing <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </div>
        </div>

        {/* Informational Section */}
        <div className="max-w-4xl space-y-12 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-[#113262] mb-4">What is National Savings Certificate (NSC)?</h2>
            <p className="text-slate-600">
              National Savings Certificate (NSC) is a fixed-income investment scheme offered by Indian Post Offices. It is a popular small savings instrument backed by the Government of India, making it one of the safest investment options available. NSC VIII Issue currently offers a 5-year maturity period with interest compounded annually but paid at maturity.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-slate-900 mb-2">Key Features</h3>
            <p className="text-sm text-slate-600">
              NSC can be purchased from any post office with a minimum investment of ₹1,000 and no maximum limit. The interest rate is set by the government every quarter. Interest is compounded annually and deemed to be reinvested, which means only the final year's interest is taxable while previous years' interest qualifies for Section 80C deduction.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-slate-900 mb-2">Benefits of NSC</h3>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Government-backed, zero-risk investment.</li>
              <li>Tax deduction under Section 80C on investment and reinvested interest.</li>
              <li>No TDS on interest income.</li>
              <li>Can be used as collateral for securing loans from banks.</li>
              <li>Available at all post offices across India.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold text-[#113262] mb-4">NSC as a Tax-Saving Tool</h3>
            <p className="text-slate-600">
              NSC combines reasonable returns with sovereign guarantee and tax benefits. The reinvested interest qualifies for 80C deduction, effectively reducing the tax burden in years 1-4. It suits conservative investors who prefer government-backed instruments over market-linked options.
            </p>
          </section>

          <section className="pt-6">
            <h2 className="text-xl font-bold text-[#113262] mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-6">
                <h3 className="font-semibold text-slate-900 mb-2">What is NSC?</h3>
                <p className="text-sm text-slate-600">National Savings Certificate (NSC) is a government-backed savings instrument available at post offices. It has a 5-year lock-in, currently earns 7.7% interest compounded annually, and qualifies for Section 80C tax deduction.</p>
              </div>

              <div className="pb-6">
                <h3 className="font-semibold text-slate-900 mb-2">Is NSC interest taxable?</h3>
                <p className="text-sm text-slate-600">NSC interest is taxable at your slab rate. However, the interest earned in years 1-4 is deemed to be reinvested and qualifies for 80C deduction (within the ₹1.5 Lakh limit). Only the interest in the final year is taxable without 80C benefit.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
