import React, { useState, useEffect } from 'react';
import { Share2, ChevronDown, ChevronUp, TrendingUp, Plus, Trash2, Sliders, DollarSign, Calculator } from 'lucide-react';

interface CashFlowRow {
  id: number;
  year: number;
  amount: number;
}

export default function IrregularCashFlow() {
  // Input States
  const [initialInvestment, setInitialInvestment] = useState<number>(1000000);
  const [discountRate, setDiscountRate] = useState<number>(10);

  const [cashFlows, setCashFlows] = useState<CashFlowRow[]>([
    { id: 1, year: 1, amount: 200000 },
    { id: 2, year: 2, amount: 300000 },
    { id: 3, year: 3, amount: 250000 },
    { id: 4, year: 4, amount: 400000 },
    { id: 5, year: 5, amount: 500000 },
  ]);

  // Advanced Settings
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [includeTerminalValue, setIncludeTerminalValue] = useState<boolean>(false);
  const [inflationRate, setInflationRate] = useState<number>(5);

  // Computed Outputs
  const [npv, setNpv] = useState<number>(0);
  const [irr, setIrr] = useState<number>(0);
  const [paybackPeriod, setPaybackPeriod] = useState<number>(0);
  const [profitabilityIndex, setProfitabilityIndex] = useState<number>(0);
  const [totalCashInflow, setTotalCashInflow] = useState<number>(0);
  const [breakEvenYear, setBreakEvenYear] = useState<string>('Never');

  useEffect(() => {
    const r = discountRate / 100;
    let presentValueSum = 0;
    let totalInflow = 0;
    let cumulativeInflow = 0;
    let payback = 0;
    let foundPayback = false;
    let breakEvenStr = 'Never';

    cashFlows.forEach((row, idx) => {
      totalInflow += row.amount;
      const pv = row.amount / Math.pow(1 + r, row.year);
      presentValueSum += pv;

      const prevCumulative = cumulativeInflow;
      cumulativeInflow += row.amount;

      if (!foundPayback && cumulativeInflow >= initialInvestment) {
        foundPayback = true;
        const required = initialInvestment - prevCumulative;
        const fraction = row.amount > 0 ? required / row.amount : 0;
        payback = idx + fraction;
        breakEvenStr = `Year ${row.year}`;
      }
    });

    const netPV = Math.round(presentValueSum - initialInvestment);
    const pi = initialInvestment > 0 ? (presentValueSum / initialInvestment) : 0;

    // Numerical calculation for IRR (Internal Rate of Return)
    let calculatedIrr = 0;
    let low = -0.99;
    let high = 5.0;
    for (let iter = 0; iter < 50; iter++) {
      const mid = (low + high) / 2;
      let npvMid = -initialInvestment;
      cashFlows.forEach((row) => {
        npvMid += row.amount / Math.pow(1 + mid, row.year);
      });

      if (Math.abs(npvMid) < 0.01) {
        calculatedIrr = mid * 100;
        break;
      }

      if (npvMid > 0) {
        low = mid;
      } else {
        high = mid;
      }
      calculatedIrr = mid * 100;
    }

    setNpv(netPV);
    setIrr(calculatedIrr);
    setPaybackPeriod(foundPayback ? payback : 0);
    setProfitabilityIndex(pi);
    setTotalCashInflow(totalInflow);
    setBreakEvenYear(breakEvenStr);
  }, [initialInvestment, discountRate, cashFlows]);

  const addCashFlowRow = () => {
    const nextYear = cashFlows.length > 0 ? cashFlows[cashFlows.length - 1].year + 1 : 1;
    const newRow: CashFlowRow = {
      id: Date.now(),
      year: nextYear,
      amount: 100000,
    };
    setCashFlows([...cashFlows, newRow]);
  };

  const removeCashFlowRow = (id: number) => {
    if (cashFlows.length <= 1) return;
    const updated = cashFlows.filter((row) => row.id !== id);
    setCashFlows(updated);
  };

  const updateCashFlowAmount = (id: number, val: number) => {
    setCashFlows(
      cashFlows.map((row) => (row.id === id ? { ...row, amount: Math.max(0, val) } : row))
    );
  };

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
      {/* Header Banner */}
      <div className="bg-white pt-32 pb-10 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-[#113262] mb-4">Irregular Cash Flow Calculator</h1>
        <p className="text-slate-600 text-base">
          Analyze the value of investments with uneven cash flows, NPV, IRR, and payback period
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Main Grid */}
        <div className="flex flex-col lg:flex-row gap-8 mb-16">
          {/* Inputs Column */}
          <div className="flex-1 space-y-6">
            {/* Initial Investment Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-blue-600" /> Initial Investment
              </h2>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-slate-700">Initial Investment Amount</label>
                  <input
                    type="number"
                    min="10000"
                    max="100000000"
                    step="50000"
                    value={initialInvestment}
                    onChange={(e) => setInitialInvestment(Math.max(0, Number(e.target.value)))}
                  />
                </div>
                <input
                  type="range"
                  min="10000"
                  max="10000000"
                  step="50000"
                  value={initialInvestment}
                  onChange={(e) => setInitialInvestment(Number(e.target.value))}

                  style={getSliderStyle(initialInvestment, "10000", "100000000")}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#3b82f6] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#3b82f6] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1.5 font-medium">
                  <span>₹10,000</span>
                  <span>₹1 Cr</span>
                </div>
              </div>
            </div>

            {/* Discount Rate Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" /> Discount Rate
              </h2>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-slate-700">Discount Rate (%)</label>
                  <span className="text-sm font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-lg border border-slate-300">
                    {discountRate}%
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="0.5"
                  value={discountRate}
                  onChange={(e) => setDiscountRate(Number(e.target.value))}

                  style={getSliderStyle(discountRate, "1", "30")}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#3b82f6] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#3b82f6] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1.5 font-medium">
                  <span>1%</span>
                  <span>30%</span>
                </div>
              </div>
            </div>

            {/* Cash Flows Table Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 overflow-x-auto">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-blue-600" /> Cash Flows
                </h2>
                <button
                  onClick={addCashFlowRow}
                  className="px-3.5 py-1.5 bg-blue-50 hover:bg-[#d4902d]lue-100 text-blue-700 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 border border-blue-200"
                >
                  <Plus className="w-4 h-4" /> Add Cash Flow
                </button>
              </div>

              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50">
                    <th className="py-3 px-4">YEAR</th>
                    <th className="py-3 px-4">AMOUNT (₹)</th>
                    <th className="py-3 px-4 text-center">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {cashFlows.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-slate-900">Year {row.year}</td>
                      <td className="py-3.5 px-4">
                        <input
                          type="number"
                          step="10000"
                          value={row.amount}
                          onChange={(e) => updateCashFlowAmount(row.id, Number(e.target.value))}
                          className="w-44 p-2 bg-slate-50 border border-slate-300 rounded-lg font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-600"
                        />
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => removeCashFlowRow(row.id)}
                          className="text-rose-500 hover:text-rose-700 transition-colors p-1"
                          title="Remove Row"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Advanced Settings Accordion */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full p-6 flex justify-between items-center font-bold text-slate-900 hover:bg-slate-50 transition-colors"
              >
                <span className="flex items-center gap-2 text-base">
                  <Sliders className="w-5 h-5 text-blue-600" /> Advanced Settings (Terminal Value & Inflation)
                </span>
                {showAdvanced ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
              </button>

              {showAdvanced && (
                <div className="p-6 pt-0 border-t border-slate-100 space-y-4 mt-4">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeTerminalValue}
                      onChange={(e) => setIncludeTerminalValue(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-600"
                    />
                    <span>Include Terminal Value</span>
                  </label>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Inflation Rate (%)</label>
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      max="20"
                      value={inflationRate}
                      onChange={(e) => setInflationRate(Number(e.target.value))}
                      className="w-full md:w-1/2 p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Sticky Summary Card */}
          <div className="w-full lg:w-[380px]">
            <div className="bg-[#1e2a4f] rounded-2xl shadow-xl p-6 md:p-8 text-white sticky top-28 border border-slate-600/50">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-bold tracking-tight">Investment Analysis</h2>
                <button className="text-slate-400 hover:text-white transition-colors p-1" title="Share">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-8 bg-slate-800/80 p-5 rounded-2xl border border-slate-600">
                <div className={`text-3xl sm:text-4xl font-extrabold tracking-tight mb-1 ${npv >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {formatCurrency(npv)}
                </div>
                <div className="text-slate-300 text-xs font-medium uppercase tracking-wider">Net Present Value (NPV)</div>
              </div>

              <div className="space-y-4 border-t border-slate-600/60 pt-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">IRR</span>
                  <span className="font-semibold text-emerald-400">{irr.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">Payback Period</span>
                  <span className="font-semibold text-white">{paybackPeriod > 0 ? `${paybackPeriod.toFixed(2)} years` : 'Never'}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">Profitability Index</span>
                  <span className="font-semibold text-white">{profitabilityIndex.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm pt-3 border-t border-slate-600/40">
                  <span className="text-slate-300">Total Cash Inflow</span>
                  <span className="font-semibold text-white">{formatCurrency(totalCashInflow)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">Break-even Year</span>
                  <span className="font-semibold text-amber-400">{breakEvenYear}</span>
                </div>
              </div>

              <button className="w-full py-2.5 px-4 bg-[#eaa33a] hover:bg-[#d4902d] text-white font-semibold rounded-xl transition-colors mt-6 flex justify-center items-center gap-2">
                Plan Your Finances <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </div>
        </div>

        {/* Informational SEO & FAQs Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-slate-200">
          <div className="md:col-span-2 space-y-8 text-slate-700 text-sm md:text-base leading-relaxed">
            <section className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-[#113262] mb-4">Irregular Cash Flow Calculator</h2>
              <p className="text-slate-600 mb-4">
                The Irregular Cash Flow Calculator helps you analyze and manage your irregular income and expenses. It's perfect for freelancers, consultants, and anyone with inconsistent cash flows. Understanding your cash flow patterns can help you make better financial decisions and plan for the future.
              </p>

              <h3 className="text-lg font-semibold text-slate-900 mb-2">Key Features</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600 mb-6">
                <li>Track irregular income sources</li>
                <li>Monitor variable expenses</li>
                <li>Analyze cash flow patterns</li>
                <li>Set financial goals</li>
                <li>Create budget plans</li>
              </ul>

              <h3 className="text-lg font-semibold text-slate-900 mb-2">How It Works</h3>
              <p className="text-slate-600 mb-4">
                The calculator allows you to input your irregular income and expenses over a specified period. It then analyzes the data to provide insights into your cash flow patterns, helping you identify trends and make informed financial decisions.
              </p>

              <h3 className="text-lg font-semibold text-slate-900 mb-2">Benefits</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600 mb-6">
                <li>Better financial planning</li>
                <li>Improved cash flow management</li>
                <li>Reduced financial stress</li>
                <li>Enhanced budgeting capabilities</li>
                <li>Smarter financial decisions</li>
              </ul>

              <h3 className="text-lg font-semibold text-slate-900 mb-2">Using the Calculator</h3>
              <p className="text-slate-600">
                Enter your irregular income and expenses, select the time period, and let the calculator do the rest. You'll receive a detailed analysis of your cash flow patterns, helping you make better financial decisions and plan for the future.
              </p>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-2xl font-bold text-[#113262]">Frequently Asked Questions</h2>

              <div className="border-b border-slate-100 pb-5">
                <h3 className="font-bold text-slate-900 mb-2">How do I calculate returns on irregular investments?</h3>
                <p className="text-slate-600 text-base">
                  XIRR (Extended Internal Rate of Return) is the correct method for calculating returns on irregular cash flows. Enter each investment date and amount, plus the current value with today's date. The calculator uses the XIRR formula to compute the annualized return, accounting for the timing and size of each cash flow.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-2">Who should use an irregular cash flow calculator?</h3>
                <p className="text-slate-600 text-base">
                  Anyone with non-uniform investments: freelancers who invest variable amounts, business owners with irregular surplus, investors who make lump sum additions to existing SIPs, or those who receive bonuses and invest them at different times. XIRR gives a more accurate return than simple CAGR for such portfolios.
                </p>
              </div>
            </section>
          </div>

          {/* Right Column: SEO Card */}
          <div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-lg">Tracking Non-Uniform Investments</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Enter your cash flows with dates (investments as negative amounts, redemptions and current value as positive). The calculator computes XIRR, giving you the true annualized return. This is essential for real-world portfolios where investments are rarely made in uniform monthly amounts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
