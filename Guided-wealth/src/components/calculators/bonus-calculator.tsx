import React, { useState, useEffect } from 'react';
import { Share2, ChevronDown, ChevronUp, Gift, DollarSign, Percent, Award, Info } from 'lucide-react';

export default function BonusCalculator() {
  // Input States
  const [monthlySalary, setMonthlySalary] = useState<number>(25000);
  const [bonusType, setBonusType] = useState<string>('statutory'); // statutory, performance, exgratia
  const [taxBracketPercent, setTaxBracketPercent] = useState<number>(5); // 0, 5, 20, 30

  // Statutory Bonus Parameters
  const [bonusPercentage, setBonusPercentage] = useState<number>(8.33); // 8.33% to 20%
  const [salaryCapType, setSalaryCapType] = useState<string>('7000'); // 7000, 21000, actual

  // Performance / Custom Bonus Parameters
  const [customBonusPercent, setCustomBonusPercent] = useState<number>(10);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Computed Outputs
  const [grossBonus, setGrossBonus] = useState<number>(0);
  const [baseTax, setBaseTax] = useState<number>(0);
  const [cessAmount, setCessAmount] = useState<number>(0);
  const [totalTaxOnBonus, setTotalTaxOnBonus] = useState<number>(0);
  const [netBonus, setNetBonus] = useState<number>(0);
  const [bonusPctOfAnnual, setBonusPctOfAnnual] = useState<number>(0);
  const [annualSalaryWithBonus, setAnnualSalaryWithBonus] = useState<number>(0);

  useEffect(() => {
    let calculatedGross = 0;

    if (bonusType === 'statutory') {
      let effectiveCap = 7000;
      if (salaryCapType === '21000') {
        effectiveCap = 21000;
      } else if (salaryCapType === 'actual') {
        effectiveCap = monthlySalary;
      } else {
        effectiveCap = 7000;
      }

      // Calculation base is lower of monthly salary or cap
      const baseForBonus = Math.min(monthlySalary, effectiveCap);
      calculatedGross = Math.round(baseForBonus * (bonusPercentage / 100) * 12);
    } else {
      const annualBase = monthlySalary * 12;
      calculatedGross = Math.round(annualBase * (customBonusPercent / 100));
    }

    const baseTaxVal = Math.round(calculatedGross * (taxBracketPercent / 100));
    const cessVal = Math.round(baseTaxVal * 0.04);
    const totalTaxVal = baseTaxVal + cessVal;
    const netBonusVal = Math.max(0, calculatedGross - totalTaxVal);

    const annualBaseSalary = monthlySalary * 12;
    const bonusPct = annualBaseSalary > 0 ? (calculatedGross / annualBaseSalary) * 100 : 0;
    const totalAnnual = annualBaseSalary + calculatedGross;

    setGrossBonus(calculatedGross);
    setBaseTax(baseTaxVal);
    setCessAmount(cessVal);
    setTotalTaxOnBonus(totalTaxVal);
    setNetBonus(netBonusVal);
    setBonusPctOfAnnual(bonusPct);
    setAnnualSalaryWithBonus(totalAnnual);
  }, [monthlySalary, bonusType, taxBracketPercent, bonusPercentage, salaryCapType, customBonusPercent]);

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
      q: 'How is bonus calculated under Payment of Bonus Act, 1965?',
      a: 'Under the Payment of Bonus Act, eligible employees (earning up to ₹21,000 per month) are entitled to a statutory minimum bonus of 8.33% and a maximum of 20% of their salary. For bonus calculation, salary is capped at ₹7,000 per month (or the minimum wage for the job, whichever is higher).',
    },
    {
      q: 'Is bonus income fully taxable in India?',
      a: 'Yes, bonus received from an employer (statutory, performance, or ex-gratia) is fully taxable under the head "Salaries" at the employee applicable income tax slab rate plus 4% Health & Education Cess.',
    },
    {
      q: 'What is the difference between statutory bonus and performance bonus?',
      a: 'Statutory bonus is a mandatory payment mandated by law for eligible employees based on company profits/minimum statutory rates (8.33%-20%). Performance bonus or ex-gratia is a discretionary variable payout offered by employers based on individual or company milestones.',
    },
    {
      q: 'When must statutory bonus be paid by employers?',
      a: 'Statutory bonus must be paid within 8 months from the close of the accounting year, usually around Diwali or festival seasons in India.',
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
        <h1 className="text-2xl md:text-3xl font-bold text-[#113262] mb-4">Bonus Calculator</h1>
        <p className="text-slate-600 text-base">
          Calculate your gross and net bonus along with exact income tax implications under Indian tax laws.
        </p>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Controls */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 mt-12">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Gift className="w-5 h-5 text-[#113262]" /> Salary & Bonus Details
              </h2>

              {/* Monthly Salary Input & Slider */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-slate-700">Monthly Salary (Basic + DA)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">₹</span>
                    <input
                      type="number"
                      value={monthlySalary}
                      onChange={(e) => setMonthlySalary(Math.max(0, Number(e.target.value)))}
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="200000"
                  step="1000"
                  value={monthlySalary}
                  onChange={(e) => setMonthlySalary(Number(e.target.value))}

                  style={getSliderStyle(monthlySalary, "5000", "200000")}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#3b82f6] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#3b82f6] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>₹5,000</span>
                  <span>₹2,00,000</span>
                </div>
              </div>

              {/* Bonus Type & Tax Bracket */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Bonus Type</label>
                  <select
                    value={bonusType}
                    onChange={(e) => setBonusType(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-[#113262] outline-none text-sm font-medium"
                  >
                    <option value="statutory">Statutory Bonus (Payment of Bonus Act)</option>
                    <option value="performance">Performance Bonus</option>
                    <option value="exgratia">Ex-gratia Payment</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Applicable Tax Bracket</label>
                  <select
                    value={taxBracketPercent}
                    onChange={(e) => setTaxBracketPercent(Number(e.target.value))}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-[#113262] outline-none text-sm font-medium"
                  >
                    <option value={0}>0% (Tax Free / Below Exemption Limit)</option>
                    <option value={5}>5% (Rs 4L - 8L Slab)</option>
                    <option value={20}>20% (Rs 12L - 16L Slab)</option>
                    <option value={30}>30% (Above Rs 24L Slab)</option>
                  </select>
                </div>
              </div>

              {/* Dynamic Controls based on Bonus Type */}
              {bonusType === 'statutory' ? (
                <div className="pt-4 border-t border-slate-100 space-y-6">
                  <h3 className="font-bold text-slate-900 text-sm">Statutory Bonus Rules (Payment of Bonus Act, 1965)</h3>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-slate-700">Bonus Percentage (%)</label>
                      <span className="font-bold text-slate-900 text-sm bg-slate-100 px-2.5 py-1 rounded-md">{bonusPercentage}%</span>
                    </div>
                    <input
                      type="range"
                      min="8.33"
                      max="20"
                      step="0.01"
                      value={bonusPercentage}
                      onChange={(e) => setBonusPercentage(Number(e.target.value))}

                      style={getSliderStyle(bonusPercentage, "8.33", "20")}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#3b82f6] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#3b82f6] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-1">
                      <span>Min: 8.33%</span>
                      <span>Max: 20%</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Salary Cap for Bonus Calculation</label>
                    <select
                      value={salaryCapType}
                      onChange={(e) => setSalaryCapType(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-[#113262] outline-none text-sm font-medium"
                    >
                      <option value="7000">Rs 7,000/month (Statutory Cap under Act)</option>
                      <option value="21000">Rs 21,000/month (Eligibility Ceiling)</option>
                      <option value="actual">Actual Monthly Salary</option>
                    </select>
                  </div>

                  <div className="p-4 bg-sky-50 rounded-xl border border-sky-100 text-xs text-sky-800 leading-relaxed flex items-start gap-2.5">
                    <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Payment of Bonus Act, 1965:</strong> Minimum bonus is 8.33% and maximum is 20% of salary. Applicable to employees earning up to ₹21,000/month. The salary cap for bonus calculation is ₹7,000/month (or minimum wage for the scheduled employment, whichever is higher).
                    </div>
                  </div>
                </div>
              ) : (
                <div className="pt-4 border-t border-slate-100 space-y-6">
                  <h3 className="font-bold text-slate-900 text-sm">Performance / Ex-gratia Bonus Calculation</h3>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-slate-700">Bonus Rate (% of Annual Salary)</label>
                      <span className="font-bold text-slate-900 text-sm bg-slate-100 px-2.5 py-1 rounded-md">{customBonusPercent}%</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      step="1"
                      value={customBonusPercent}
                      onChange={(e) => setCustomBonusPercent(Number(e.target.value))}

                      style={getSliderStyle(customBonusPercent, "1", "100")}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#3b82f6] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#3b82f6] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-1">
                      <span>1%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Tax Computation Breakdown */}
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 mt-12">
              <h2 className="text-xl font-bold text-[#113262] mb-4">Tax Computation</h2>
              <div className="divide-y divide-slate-100 text-sm">
                <div className="py-3 flex justify-between">
                  <span className="text-slate-600">Gross Bonus</span>
                  <span className="font-bold text-slate-900">{formatCurrency(grossBonus)}</span>
                </div>
                <div className="py-3 flex justify-between">
                  <span className="text-slate-600">Tax at {taxBracketPercent}%</span>
                  <span className="font-medium text-rose-600">- {formatCurrency(baseTax)}</span>
                </div>
                <div className="py-3 flex justify-between">
                  <span className="text-slate-600">Health & Education Cess (4% on Tax)</span>
                  <span className="font-medium text-rose-600">- {formatCurrency(cessAmount)}</span>
                </div>
                <div className="py-3 flex justify-between font-bold text-slate-900 text-base bg-slate-50 px-3 rounded-lg mt-2">
                  <span className="text-slate-900">Net Bonus (After Tax)</span>
                  <span className="text-emerald-600">{formatCurrency(netBonus)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dark Navy Sticky Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="bg-[#1e2a4f] text-white rounded-2xl p-6 shadow-xl border border-slate-800">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-bold">Bonus Summary</h3>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: 'Bonus Calculation Summary',
                        text: `My Gross Bonus is ${formatCurrency(grossBonus)} and Net Bonus after tax is ${formatCurrency(netBonus)}.`,
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

              {/* Hero Metric Output */}
              <div className="mb-6 p-4 rounded-xl bg-slate-800/80 border border-slate-600/50">
                <div className="text-xs text-slate-400 mb-1 font-medium">Gross Bonus</div>
                <div className="text-3xl font-extrabold text-white">{formatCurrency(grossBonus)}</div>
                <div className="text-xs text-emerald-400 mt-1 font-medium">
                  Net Bonus: {formatCurrency(netBonus)}
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="space-y-3.5 text-sm border-t border-slate-800 pt-4">
                <div className="flex justify-between items-center text-slate-300">
                  <span>Tax on Bonus</span>
                  <span className="font-semibold text-rose-400">- {formatCurrency(totalTaxOnBonus)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>Net Bonus</span>
                  <span className="font-semibold text-emerald-400">{formatCurrency(netBonus)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>Bonus % of Annual Salary</span>
                  <span className="font-semibold text-white">{bonusPctOfAnnual.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between items-center text-slate-300 pt-3 border-t border-slate-800">
                  <span className="font-bold text-white">Annual Salary (Inc. Bonus)</span>
                  <span className="font-bold text-[#EAB308] text-lg">{formatCurrency(annualSalaryWithBonus)}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800">
                <button
                  onClick={() => window.scrollTo({ top: 1000, behavior: 'smooth' })}
                  className="w-full py-2.5 px-4 bg-[#eaa33a] hover:bg-[#d4902d] text-white font-semibold rounded-xl transition-colors mt-6 flex justify-center items-center gap-2"
                >
                  Start Investing →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Informational SEO Content & Guide */}
        <div className="max-w-4xl space-y-12 text-slate-700 leading-relaxed mt-12">
          <h2 className="text-xl font-bold text-[#113262] mb-4">Understanding Your Bonus</h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
            Enter your monthly salary, applicable bonus percentage, and tax bracket. The calculator shows your statutory bonus amount and the tax impact on your overall income. It helps you plan how to allocate your bonus across debt repayment, investments, and discretionary spending.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-700 border-t border-slate-100 pt-6">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Key Components</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                <li><strong>Monthly Salary (Basic + DA):</strong> Base for bonus calculations.</li>
                <li><strong>Bonus Type:</strong> Statutory, Performance, or Ex-gratia.</li>
                <li><strong>Statutory Bonus Rules:</strong> Minimum 8.33%, Maximum 20%.</li>
                <li><strong>Tax Slab Rate:</strong> Applicable tax rate + 4% cess.</li>
                <li><strong>Net Bonus:</strong> Post-tax payout received in hand.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Statutory Bonus Rules</h3>
              <p className="mb-2">As per the Payment of Bonus Act, 1965:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                <li><strong>Minimum Bonus:</strong> 8.33% of salary</li>
                <li><strong>Maximum Bonus:</strong> 20% of salary</li>
                <li><strong>Salary Cap:</strong> Capped at ₹7,000/month for computation.</li>
                <li><strong>Eligibility:</strong> Employees drawing up to ₹21,000/month.</li>
                <li><strong>Coverage:</strong> Establishments with 20 or more employees.</li>
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
