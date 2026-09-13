import React, { useState, useEffect } from 'react';
import { Share2, ChevronDown, ChevronUp, Briefcase, DollarSign, Sliders, MapPin } from 'lucide-react';

export default function CtcToTakeHomeSalaryCalculator() {
  // Input States
  const [annualCtc, setAnnualCtc] = useState<number>(1200000);
  const [cityType, setCityType] = useState<string>('metro'); // 'metro' or 'non-metro'
  const [includeEmployerPf, setIncludeEmployerPf] = useState<boolean>(true);
  const [basicSalaryPercent, setBasicSalaryPercent] = useState<number>(40);
  const [selectedState, setSelectedState] = useState<string>('Maharashtra');

  // Computed Salary Breakdown
  const [annualBasic, setAnnualBasic] = useState<number>(0);
  const [annualHra, setAnnualHra] = useState<number>(0);
  const [annualSpecialAllowance, setAnnualSpecialAllowance] = useState<number>(0);
  const [employerEpfAnnual, setEmployerEpfAnnual] = useState<number>(0);

  // Deductions
  const [employeeEpfAnnual, setEmployeeEpfAnnual] = useState<number>(0);
  const [professionalTaxAnnual, setProfessionalTaxAnnual] = useState<number>(0);
  const [incomeTaxAnnual, setIncomeTaxAnnual] = useState<number>(0);
  const [totalDeductionsAnnual, setTotalDeductionsAnnual] = useState<number>(0);

  // Take-Home Outputs
  const [monthlyTakeHome, setMonthlyTakeHome] = useState<number>(0);
  const [annualTakeHome, setAnnualTakeHome] = useState<number>(0);

  useEffect(() => {
    // 1. Salary Component Breakdown
    const basic = Math.round(annualCtc * (basicSalaryPercent / 100));
    const hraPct = cityType === 'metro' ? 0.50 : 0.40;
    const hra = Math.round(basic * hraPct);

    // Employer EPF: 12% of Basic Salary
    const employerPf = includeEmployerPf ? Math.round(basic * 0.12) : 0;

    // Special Allowance fills the remaining gap in CTC
    const special = Math.max(0, annualCtc - basic - hra - employerPf);

    // Gross Salary = Annual CTC - Employer PF
    const grossSalary = annualCtc - employerPf;

    // 2. Deductions Breakdown
    // Employee EPF = 12% of Basic
    const employeePf = Math.round(basic * 0.12);

    // Professional Tax (Standard Maharashtra = ₹2,400 / yr, Karnataka = ₹2,400, Nil in Delhi/Haryana)
    let pt = 2400;
    if (selectedState === 'Delhi' || selectedState === 'Haryana' || selectedState === 'Uttar Pradesh') {
      pt = 0;
    }

    // New Tax Regime Calculation (FY 2025-26 rules)
    const stdDeduction = 75000;
    const taxableIncome = Math.max(0, grossSalary - stdDeduction);

    let tax = 0;
    if (taxableIncome > 2400000) {
      tax = (taxableIncome - 2400000) * 0.30 + 300000;
    } else if (taxableIncome > 2000000) {
      tax = (taxableIncome - 2000000) * 0.25 + 200000;
    } else if (taxableIncome > 1600000) {
      tax = (taxableIncome - 1600000) * 0.20 + 120000;
    } else if (taxableIncome > 1200000) {
      tax = (taxableIncome - 1200000) * 0.15 + 60000;
    } else if (taxableIncome > 800000) {
      tax = (taxableIncome - 800000) * 0.10 + 20000;
    } else if (taxableIncome > 400000) {
      tax = (taxableIncome - 400000) * 0.05;
    }

    // Section 87A rebate for taxable income <= 12 Lakhs
    if (taxableIncome <= 1200000) {
      tax = 0;
    }
    const incomeTaxIncCess = Math.round(tax * 1.04);

    const totalDeductions = employeePf + pt + incomeTaxIncCess;
    const annualHand = grossSalary - totalDeductions;
    const monthlyHand = Math.round(annualHand / 12);

    setAnnualBasic(basic);
    setAnnualHra(hra);
    setAnnualSpecialAllowance(special);
    setEmployerEpfAnnual(employerPf);

    setEmployeeEpfAnnual(employeePf);
    setProfessionalTaxAnnual(pt);
    setIncomeTaxAnnual(incomeTaxIncCess);
    setTotalDeductionsAnnual(totalDeductions);

    setMonthlyTakeHome(monthlyHand);
    setAnnualTakeHome(annualHand);
  }, [
    annualCtc,
    cityType,
    includeEmployerPf,
    basicSalaryPercent,
    selectedState,
  ]);

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
        <h1 className="text-2xl md:text-3xl font-bold text-[#113262] mb-4">CTC / Salary Calculator</h1>
        <p className="text-slate-600 text-base">
          Calculate your take-home pay from your CTC (New Regime FY 2025-26)
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Main Grid */}
        <div className="flex flex-col lg:flex-row gap-8 mb-16">
          {/* Inputs Column */}
          <div className="flex-1 space-y-6">
            {/* CTC Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-600" /> CTC Details
              </h2>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-slate-700">Annual CTC</label>
                  <input
                    type="number"
                    min="100000"
                    max="10000000"
                    step="50000"
                    value={annualCtc}
                    onChange={(e) => setAnnualCtc(Math.max(0, Number(e.target.value)))}
                  />
                </div>
                <input
                  type="range"
                  min="100000"
                  max="5000000"
                  step="50000"
                  value={annualCtc}
                  onChange={(e) => setAnnualCtc(Number(e.target.value))}

                  style={getSliderStyle(annualCtc, "100000", "10000000")}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#3b82f6] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#3b82f6] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1.5 font-medium">
                  <span>₹1 Lakh</span>
                  <span>₹50 Lakhs</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">City Type</label>
                  <select
                    value={cityType}
                    onChange={(e) => setCityType(e.target.value)}
                    className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-semibold text-slate-800 bg-white text-sm"
                  >
                    <option value="metro">Metro (Delhi, Mumbai, Chennai, Kolkata)</option>
                    <option value="non-metro">Non-Metro (Other cities)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">CTC Contribution (Employer EPF)</label>
                  <div className="flex items-center gap-6 mt-3">
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-800 cursor-pointer">
                      <input
                        type="radio"
                        name="includeEmployerPf"
                        checked={includeEmployerPf}
                        onChange={() => setIncludeEmployerPf(true)}
                      />
                      <span>Yes (12% of Basic)</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="includeEmployerPf"
                        checked={!includeEmployerPf}
                        onChange={() => setIncludeEmployerPf(false)}
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* CTC Breakdown Card */}
            <div>
              <h2>
                <Sliders /> CTC Breakdown
              </h2>

              <div>
                <div>
                  <label>Basic Salary (% of CTC)</label>
                  <span>
                    {basicSalaryPercent}%
                  </span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="60"
                  step="5"
                  value={basicSalaryPercent}
                  onChange={(e) => setBasicSalaryPercent(Number(e.target.value))}

                  style={getSliderStyle(basicSalaryPercent, "30", "60")}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#3b82f6] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#3b82f6] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
                />
              </div>

              <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
                <div className="flex justify-between items-center text-slate-700">
                  <span>Basic Salary (Annual)</span>
                  <span className="font-semibold text-slate-900">{formatCurrency(annualBasic)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-700">
                  <span>HRA ({cityType === 'metro' ? '50%' : '40%'} of Basic)</span>
                  <span className="font-semibold text-slate-900">{formatCurrency(annualHra)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-700">
                  <span>Special Allowance</span>
                  <span className="font-semibold text-slate-900">{formatCurrency(annualSpecialAllowance)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-700">
                  <span>Employer EPF</span>
                  <span className="font-semibold text-slate-900">{formatCurrency(employerEpfAnnual)}</span>
                </div>
                <div className="flex justify-between items-center font-bold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total CTC</span>
                  <span>{formatCurrency(annualCtc)}</span>
                </div>
              </div>
            </div>

            {/* Deductions Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" /> Deductions
              </h2>

              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">State (for Professional Tax)</label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-semibold text-slate-800 bg-white text-sm"
                >
                  <option value="Maharashtra">Maharashtra (PT ₹2,400/yr)</option>
                  <option value="Karnataka">Karnataka (PT ₹2,400/yr)</option>
                  <option value="Tamil Nadu">Tamil Nadu (PT ₹2,500/yr)</option>
                  <option value="West Bengal">West Bengal (PT ₹2,400/yr)</option>
                  <option value="Delhi">Delhi (No PT)</option>
                  <option value="Haryana">Haryana (No PT)</option>
                </select>
              </div>

              <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
                <div className="flex justify-between items-center text-rose-600">
                  <span>Employee EPF (Annual)</span>
                  <span className="font-semibold">-{formatCurrency(employeeEpfAnnual)}</span>
                </div>
                <div className="flex justify-between items-center text-rose-600">
                  <span>Professional Tax</span>
                  <span className="font-semibold">-{formatCurrency(professionalTaxAnnual)}</span>
                </div>
                <div className="flex justify-between items-center text-rose-600">
                  <span>Income Tax (New Regime)</span>
                  <span className="font-semibold">-{formatCurrency(incomeTaxAnnual)}</span>
                </div>
                <div className="flex justify-between items-center font-bold text-rose-700 pt-2 border-t border-slate-200">
                  <span>Total Deductions</span>
                  <span>-{formatCurrency(totalDeductionsAnnual)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Summary Card */}
          <div className="w-full lg:w-[380px]">
            <div className="bg-[#1e2a4f] rounded-2xl shadow-xl p-6 md:p-8 text-white sticky top-28 border border-slate-600/50">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-bold tracking-tight">Salary Breakdown</h2>
                <button className="text-slate-400 hover:text-white transition-colors p-1" title="Share">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-8 bg-slate-800/80 p-5 rounded-2xl border border-slate-600">
                <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 tracking-tight mb-1">
                  {formatCurrency(monthlyTakeHome)}
                </div>
                <div className="text-slate-300 text-xs font-medium uppercase tracking-wider">Monthly Take-Home Pay</div>
              </div>

              <div className="space-y-4 border-t border-slate-600/60 pt-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">Annual Take-Home</span>
                  <span className="font-semibold text-white">{formatCurrency(annualTakeHome)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">Monthly EPF</span>
                  <span className="font-semibold text-slate-200">{formatCurrency(Math.round(employeeEpfAnnual / 12))}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">Monthly Prof Tax</span>
                  <span className="font-semibold text-slate-200">{formatCurrency(Math.round(professionalTaxAnnual / 12))}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">Monthly Income Tax</span>
                  <span className="font-semibold text-emerald-400">{formatCurrency(Math.round(incomeTaxAnnual / 12))}</span>
                </div>
                <div className="flex justify-between items-center text-sm pt-3 border-t border-slate-600/40">
                  <span className="text-slate-300">Employer EPF (Monthly)</span>
                  <span className="font-semibold text-white">{formatCurrency(Math.round(employerEpfAnnual / 12))}</span>
                </div>
              </div>

              <button className="w-full py-2.5 px-4 bg-[#eaa33a] hover:bg-[#d4902d] text-white font-semibold rounded-xl transition-colors mt-6 flex justify-center items-center gap-2">
                Start Investing <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </div>
        </div>

        {/* Informational SEO & FAQs Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-slate-200">
          <div className="md:col-span-2 space-y-8 text-slate-700 text-sm md:text-base leading-relaxed">
            <section className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-[#113262] mb-4">CTC / Salary Calculator</h2>
              <p className="text-slate-600 mb-4">
                The CTC (Cost to Company) / Salary Calculator helps you understand your actual take-home pay from your total CTC. It breaks down your salary into components like Basic, HRA, Special Allowance, and calculates deductions such as EPF, Professional Tax, and Income Tax under the New Tax Regime (FY 2025-26).
              </p>

              <h3 className="text-lg font-semibold text-slate-900 mb-2">Key Components</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600 mb-6">
                <li>Basic Salary (configurable % of CTC)</li>
                <li>House Rent Allowance (HRA)</li>
                <li>Special Allowance</li>
                <li>EPF (Employee Provident Fund) Contribution</li>
                <li>Professional Tax</li>
                <li>Income Tax (New Regime FY 2025-26)</li>
              </ul>

              <h3 className="text-lg font-semibold text-slate-900 mb-2">How It Works</h3>
              <p className="text-slate-600 mb-2">The calculator uses the following approach to compute your take-home salary:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600 mb-6">
                <li>Basic Salary = CTC × Basic %</li>
                <li>HRA = Basic × HRA % (50% for Metro, 40% for Non-Metro)</li>
                <li>Special Allowance = CTC - Basic - HRA - Employer EPF</li>
                <li>EPF = 12% of Basic (capped at Rs 10,000 base salary)</li>
                <li>Income Tax computed on New Regime slabs with Rs 75,000 standard deduction</li>
                <li>Take-home = CTC - Employee EPF - Professional Tax - Income Tax - Employer EPF</li>
              </ul>

              <h3 className="text-lg font-semibold text-slate-900 mb-2">New Tax Regime Slabs (FY 2025-26)</h3>
              <ul className="list-disc pl-5 space-y-1 text-slate-600 mb-6 text-sm">
                <li>Up to Rs 4,000,00 - Nil</li>
                <li>Rs 4,00,001 to Rs 8,00,000 - 5%</li>
                <li>Rs 8,00,001 to Rs 12,00,000 - 10%</li>
                <li>Rs 12,00,001 to Rs 16,00,000 - 15%</li>
                <li>Rs 16,00,001 to Rs 20,00,000 - 20%</li>
                <li>Rs 20,00,001 to Rs 24,00,000 - 25%</li>
                <li>Above Rs 24,00,000 - 30%</li>
              </ul>

              <h3 className="text-lg font-semibold text-slate-900 mb-2">Benefits</h3>
              <ul className="list-disc pl-5 space-y-1 text-slate-600 mb-6">
                <li>Understand your actual in-hand salary</li>
                <li>Compare job offers effectively</li>
                <li>Plan monthly budgets accurately</li>
                <li>Estimate tax liability under new regime</li>
                <li>Understand employer vs employee contributions</li>
              </ul>

              <h3 className="text-lg font-semibold text-slate-900 mb-2">Using the Calculator</h3>
              <p className="text-slate-600">
                Enter your annual CTC, select your city type (Metro or Non-Metro for HRA calculation), and configure your Basic Salary percentage. The calculator will automatically compute your complete salary breakdown including all deductions and your monthly take-home pay.
              </p>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-2xl font-bold text-[#113262]">Frequently Asked Questions</h2>

              <div className="border-b border-slate-100 pb-5">
                <h3 className="font-bold text-slate-900 mb-2">How do I calculate take-home salary from CTC?</h3>
                <p className="text-slate-600 text-base">
                  Take-home salary = CTC minus employer PF contribution (12% of basic), minus gratuity provision (4.81% of basic), minus employee PF (12% of basic), minus professional tax (Rs 200/month in most states), minus income tax (TDS). The gap between CTC and take-home is typically 25-40% depending on the salary structure.
                </p>
              </div>

              <div className="border-b border-slate-100 pb-5">
                <h3 className="font-bold text-slate-900 mb-2">What is a good CTC to in-hand salary ratio?</h3>
                <p className="text-slate-600 text-base">
                  For a CTC of Rs 10 lakh, expect an in-hand salary of Rs 55,000-65,000 per month (after all deductions including tax). Higher CTCs have a lower ratio due to higher tax brackets. The ratio depends heavily on the company's salary structure (proportion of basic, allowances, and variable pay).
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-2">How can I optimise my salary structure?</h3>
                <p className="text-slate-600 text-base">
                  Request higher HRA if you pay rent (tax-exempt under old regime). Opt for meal vouchers (exempt up to Rs 50 per meal). Choose NPS employer contribution (tax-free up to 14% of basic for central govt, 10% for others). Claim LTA for domestic travel. Use fuel and driver allowance if applicable. All these are legitimate ways to reduce taxable income under the old regime.
                </p>
              </div>
            </section>
          </div>

          {/* Right Column: SEO Card */}
          <div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-lg">Decoding Your CTC</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Enter your annual CTC and the salary structure breakdown (basic, HRA, special allowance, PF, gratuity, variable pay). The calculator shows your monthly and annual take-home salary after all deductions. It compares your tax liability under both old and new tax regimes to help you choose the better option.
              </p>

              <h4 className="font-bold text-slate-800 text-sm">Understanding CTC Components</h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                CTC includes direct benefits (basic salary, HRA, special allowance), indirect benefits (employer PF, gratuity, insurance), and variable pay (performance bonus). Only direct benefits form your gross monthly salary. Indirect benefits are real costs to the company but do not appear in your bank account directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
