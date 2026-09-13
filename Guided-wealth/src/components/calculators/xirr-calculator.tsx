import React, { useState, useEffect } from 'react';
import { Share2, Plus, Trash2, AlertCircle } from 'lucide-react';

interface CashFlowRow {
  id: string;
  date: string;
  amount: number;
}

export default function XirrCalculator() {
  const [cashFlows, setCashFlows] = useState<CashFlowRow[]>([
    { id: '1', date: '2025-09-12', amount: -100000 },
    { id: '2', date: '2026-03-12', amount: -50000 },
    { id: '3', date: '2026-09-12', amount: 175000 },
  ]);

  const [xirrResult, setXirrResult] = useState<number | null>(null);
  const [totalInvestment, setTotalInvestment] = useState<number>(0);
  const [totalRedemption, setTotalRedemption] = useState<number>(0);
  const [netProfitLoss, setNetProfitLoss] = useState<number>(0);
  const [durationText, setDurationText] = useState<string>('0d');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Validate inputs
    let totalInv = 0;
    let totalRed = 0;
    let validEntries: { date: Date; amount: number }[] = [];

    for (const cf of cashFlows) {
      if (!cf.date || isNaN(cf.amount) || cf.amount === 0) continue;
      const d = new Date(cf.date);
      if (isNaN(d.getTime())) continue;

      validEntries.push({ date: d, amount: cf.amount });

      if (cf.amount < 0) totalInv += Math.abs(cf.amount);
      else if (cf.amount > 0) totalRed += cf.amount;
    }

    setTotalInvestment(totalInv);
    setTotalRedemption(totalRed);
    setNetProfitLoss(totalRed - totalInv);

    if (validEntries.length < 2) {
      setXirrResult(null);
      setErrorMessage('At least one investment (negative) and one redemption (positive) entry are required.');
      return;
    }

    const hasOutflow = validEntries.some((e) => e.amount < 0);
    const hasInflow = validEntries.some((e) => e.amount > 0);

    if (!hasOutflow || !hasInflow) {
      setXirrResult(null);
      setErrorMessage('Cash flows must contain both positive (inflow) and negative (outflow) amounts.');
      return;
    }

    // Sort by date
    validEntries.sort((a, b) => a.date.getTime() - b.date.getTime());
    const minDate = validEntries[0].date;
    const maxDate = validEntries[validEntries.length - 1].date;

    const diffDays = Math.round((maxDate.getTime() - minDate.getTime()) / (1000 * 3600 * 24));
    const yrs = Math.floor(diffDays / 365);
    const remainingDays = diffDays % 365;
    setDurationText(`${yrs > 0 ? `${yrs}y ` : ''}${remainingDays}d`);

    // XIRR Calculation via Newton-Raphson
    const calcXIRR = (entries: { date: Date; amount: number }[]) => {
      const d0 = entries[0].date.getTime();
      const items = entries.map((e) => ({
        t: (e.date.getTime() - d0) / (1000 * 3600 * 24 * 365),
        amount: e.amount,
      }));

      let rate = 0.1; // initial guess 10%
      for (let iter = 0; iter < 100; iter++) {
        let f = 0;
        let df = 0;
        for (const item of items) {
          const factor = Math.pow(1 + rate, item.t);
          if (factor === 0) continue;
          f += item.amount / factor;
          df -= (item.t * item.amount) / (factor * (1 + rate));
        }

        if (Math.abs(df) < 1e-10) break;
        const newRate = rate - f / df;
        if (Math.abs(newRate - rate) < 1e-7) {
          return newRate * 100;
        }
        rate = newRate;
        if (rate <= -0.99) rate = -0.9;
      }
      return rate * 100;
    };

    try {
      const result = calcXIRR(validEntries);
      if (isNaN(result) || !isFinite(result)) {
        setXirrResult(null);
        setErrorMessage('Unable to converge XIRR for the given cash flows.');
      } else {
        setXirrResult(result);
        setErrorMessage(null);
      }
    } catch {
      setXirrResult(null);
      setErrorMessage('Calculation error.');
    }
  }, [cashFlows]);

  const handleAddRow = () => {
    const today = new Date().toISOString().split('T')[0];
    setCashFlows((prev) => [
      ...prev,
      { id: String(Date.now()), date: today, amount: 10000 },
    ]);
  };

  const handleRemoveRow = (id: string) => {
    if (cashFlows.length <= 2) return;
    setCashFlows((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateRow = (id: string, field: 'date' | 'amount', value: string | number) => {
    setCashFlows((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      {/* Header */}
      <div className="bg-white pt-32 pb-10 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-[#113262] mb-4">XIRR Calculator</h1>
        <p className="text-slate-600 text-base">Calculate annualized returns on irregular cash flows</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Main Section */}
        <div className="flex flex-col lg:flex-row gap-8 mb-16">
          {/* Left Column: Cash Flow Inputs */}
          <div className="flex-1 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-bold text-slate-900">Cash Flow Entries</h2>
                <button
                  onClick={handleAddRow}
                  className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add Cash Row
                </button>
              </div>

              <p className="text-xs text-slate-500 mb-4">
                Use negative amounts for investments (outflow) and positive amounts for redemptions (inflow).
              </p>

              <div className="space-y-3">
                {cashFlows.map((row) => (
                  <div key={row.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <input
                      type="date"
                      value={row.date}
                      onChange={(e) => handleUpdateRow(row.id, 'date', e.target.value)}
                      className="p-2 border border-slate-300 rounded-md font-semibold text-slate-800 text-sm bg-white"
                    />
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-2 text-slate-400 text-sm">₹</span>
                      <input
                        type="number"
                        value={row.amount}
                        onChange={(e) => handleUpdateRow(row.id, 'amount', Number(e.target.value))}
                        className={`w-full pl-7 pr-3 py-1.5 border rounded-md text-sm font-semibold bg-white ${row.amount < 0 ? 'text-rose-600 border-rose-200' : 'text-emerald-600 border-emerald-200'
                          }`}
                      />
                    </div>
                    <span className="text-xs text-slate-400 min-w-[70px]">
                      {row.amount < 0 ? '(Outflow)' : '(Inflow)'}
                    </span>
                    <button
                      onClick={() => handleRemoveRow(row.id)}
                      disabled={cashFlows.length <= 2}
                      className="text-slate-400 hover:text-rose-500 disabled:opacity-30 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {errorMessage && (
                <div className="flex items-center gap-2 text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-200 text-xs mt-4">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {errorMessage}
                </div>
              )}
            </div>

            {/* How to Use Helper Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-2 text-xs text-slate-600">
              <h3 className="font-bold text-slate-900 text-sm mb-1">How to Use</h3>
              <p><strong className="text-rose-600">Negative:</strong> Enter investments as negative values (e.g., -100000 for a ₹1 Lakh SIP installment).</p>
              <p><strong className="text-emerald-600">Positive:</strong> Enter redemptions or current value as positive values (e.g., 175000 for the final portfolio amount).</p>
              <p><strong className="text-slate-800">Dates:</strong> Ensure at least one investment and one redemption entry with valid dates.</p>
            </div>
          </div>

          {/* Results Sidebar */}
          <div className="w-full lg:w-[400px]">
            <div className="bg-[#1e2a4f] rounded-2xl shadow-xl p-6 md:p-8 text-white h-full flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-xl font-bold tracking-tight">XIRR Results</h2>
                  <button className="text-slate-400 hover:text-white transition-colors" title="Share">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="mb-8">
                  <div className={`text-3xl md:text-4xl font-extrabold tracking-tight mb-1 ${xirrResult !== null && xirrResult >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {xirrResult !== null ? `${xirrResult.toFixed(2)}%` : 'N/A'}
                  </div>
                  <div className="text-slate-300 text-sm font-medium">Annualized Return (XIRR)</div>
                </div>

                <div className="space-y-4 border-t border-slate-600/60 pt-6">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-300">Total Investment</span>
                    <span className="font-semibold text-white">{formatCurrency(totalInvestment)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-300">Total Redemption</span>
                    <span className="font-semibold text-white">{formatCurrency(totalRedemption)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-300">Net Profit / Loss</span>
                    <span className={`font-semibold ${netProfitLoss >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {formatCurrency(netProfitLoss)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-600/40">
                    <span className="text-slate-300">Investment Duration</span>
                    <span className="font-semibold text-white">{durationText}</span>
                  </div>
                </div>
              </div>

              <button className="w-full py-2.5 px-4 bg-[#eaa33a] hover:bg-[#d4902d] text-white font-semibold rounded-xl transition-colors mt-6 flex justify-center items-center gap-2">
                Portfolio Review <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </div>
        </div>

        {/* Informational Section */}
        <div className="max-w-4xl space-y-12 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-[#113262] mb-4">XIRR Calculator</h2>
            <p className="text-slate-600">
              The XIRR (Extended Internal Rate of Return) Calculator helps investors calculate the annualized return on investments with irregular cash flows. Unlike simple return calculations, XIRR accounts for the exact timing of each investment and redemption, giving you the most accurate picture of your portfolio performance.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-slate-900 mb-2">Key Components</h3>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Cash Flow Dates (Exact dates of transactions).</li>
              <li>Cash Flow Amounts (Negative for investments, positive for withdrawals).</li>
              <li>Annualized Return Rate (XIRR percentage).</li>
              <li>Total Investment and Redemption.</li>
              <li>Net Profit/Loss.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold text-[#113262] mb-4">Why XIRR is Essential for SIP Investors</h3>
            <p className="text-slate-600">
              Mutual fund statements often show absolute returns, which can be misleading for SIP investments. XIRR gives you the true annualized return accounting for the timing and amount of each investment. Enter your SIP dates and amounts along with the current portfolio value to see your real returns.
            </p>
          </section>

          <section className="pt-6">
            <h2 className="text-xl font-bold text-[#113262] mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-6">
                <h3 className="font-semibold text-slate-900 mb-2">What is XIRR?</h3>
                <p className="text-sm text-slate-600">XIRR (Extended Internal Rate of Return) calculates the annualized return on investments with irregular cash flows. It is the most accurate return metric for SIP investments where money is invested at different dates and amounts over time.</p>
              </div>

              <div className="border-b border-slate-200 pb-6">
                <h3 className="font-semibold text-slate-900 mb-2">How is XIRR different from CAGR?</h3>
                <p className="text-sm text-slate-600">CAGR works for a single lump sum investment with one start and end date. XIRR handles multiple cash flows at different dates (like monthly SIPs, additional purchases, partial redemptions).</p>
              </div>

              <div className="pb-6">
                <h3 className="font-semibold text-slate-900 mb-2">What is a good XIRR for SIP investments?</h3>
                <p className="text-sm text-slate-600">For equity mutual fund SIPs held over 5+ years, an XIRR of 12-15% is good, and above 15% is excellent. XIRR can be misleading for very short periods; co-evaluate only for SIPs running at least 2-3 years.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
