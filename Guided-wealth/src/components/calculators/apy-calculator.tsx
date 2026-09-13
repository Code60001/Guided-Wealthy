import React, { useState, useEffect } from 'react';
import { Share2, ChevronDown, ChevronUp } from 'lucide-react';

export default function ApyCalculator() {
  const [currentAge, setCurrentAge] = useState<number>(25);
  const [desiredPension, setDesiredPension] = useState<number>(5000);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  const [monthlyContributionRequired, setMonthlyContributionRequired] = useState<number>(0);
  const [yearsOfContribution, setYearsOfContribution] = useState<number>(0);
  const [totalInvestment, setTotalInvestment] = useState<number>(0);
  const [corpusToNominee, setCorpusToNominee] = useState<number>(0);

  // Official APY contribution matrix for 5000 pension
  const apyMatrix5k: Record<number, number> = {
    18: 210, 19: 228, 20: 248, 21: 269, 22: 292, 23: 318, 24: 346, 25: 376,
    26: 409, 27: 446, 28: 487, 29: 533, 30: 577, 31: 639, 32: 709, 33: 789,
    34: 877, 35: 902, 36: 1002, 37: 1115, 38: 1243, 39: 1391, 40: 1454
  };

  useEffect(() => {
    const yrs = Math.max(1, 60 - currentAge);
    const ageKey = Math.min(40, Math.max(18, currentAge));
    const base5kContrib = apyMatrix5k[ageKey] || 376;

    // Scale monthly contribution based on chosen pension (1000 to 5000)
    const reqContrib = Math.round(base5kContrib * (desiredPension / 5000));
    const totInv = reqContrib * 12 * yrs;
    const nomineeCorpus = desiredPension * 170; // Guaranteed return of corpus to nominee

    setYearsOfContribution(yrs);
    setMonthlyContributionRequired(reqContrib);
    setTotalInvestment(totInv);
    setCorpusToNominee(nomineeCorpus);
  }, [currentAge, desiredPension]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const tableRows = [
    { entryAge: 18, yrs: 42, contrib5k: 210 },
    { entryAge: 20, yrs: 40, contrib5k: 248 },
    { entryAge: 25, yrs: 35, contrib5k: 376 },
    { entryAge: 30, yrs: 30, contrib5k: 577 },
    { entryAge: 35, yrs: 25, contrib5k: 902 },
    { entryAge: 40, yrs: 20, contrib5k: 1454 },
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
      {/* Header */}
      <div className="bg-white pt-32 pb-10 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-[#113262] mb-4">APY Calculator</h1>
        <p className="text-slate-600 text-base">Calculate your Atal Pension Yojana contributions and benefits</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-8 mb-16">
          {/* Inputs Column */}
          <div className="flex-1 space-y-6">
            {/* Personal Details */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <h2 className="text-xl font-bold text-[#113262] mb-4">Personal Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-slate-700">Current Age</label>
                    <span className="text-sm font-semibold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md">{currentAge} Yr</span>
                  </div>
                  <input
                    type="range"
                    min="18"
                    max="40"
                    step="1"
                    value={currentAge}
                    onChange={(e) => setCurrentAge(Number(e.target.value))}

                    style={getSliderStyle(currentAge, "18", "40")}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#3b82f6] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#3b82f6] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1.5 font-medium">
                    <span>18 years</span>
                    <span>40 years</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Desired Monthly Pension</label>
                  <select
                    value={desiredPension}
                    onChange={(e) => setDesiredPension(Number(e.target.value))}
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none font-semibold text-slate-800 bg-white"
                  >
                    <option value={1000}>₹1,000 / month</option>
                    <option value={2000}>₹2,000 / month</option>
                    <option value={3000}>₹3,000 / month</option>
                    <option value={4000}>₹4,000 / month</option>
                    <option value={5000}>₹5,000 / month</option>
                  </select>
                </div>
              </div>
            </div>

            {/* APY Contribution Chart Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 overflow-x-auto">
              <h2 className="text-xl font-bold text-[#113262] mb-4">APY Contribution Chart</h2>
              <p className="text-xs text-slate-500 mb-4">Monthly contribution amounts based on entry age for your selected pension of {formatCurrency(desiredPension)}/month.</p>

              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50">
                    <th className="py-3 px-3">Entry Age</th>
                    <th className="py-3 px-3">Years</th>
                    <th className="py-3 px-3">Monthly Contribution</th>
                    <th className="py-3 px-3">Total Investment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {tableRows.map((row) => {
                    const scaledContrib = Math.round(row.contrib5k * (desiredPension / 5000));
                    const scaledTotal = scaledContrib * 12 * row.yrs;
                    const isUserAge = currentAge === row.entryAge;

                    return (
                      <tr key={row.entryAge} className={`${isUserAge ? 'bg-blue-50 text-blue-900 font-bold' : 'hover:bg-slate-50'} transition-colors`}>
                        <td className="py-3 px-3">{row.entryAge} years</td>
                        <td className="py-3 px-3">{row.yrs} years</td>
                        <td className="py-3 px-3 text-emerald-600">₹{scaledContrib}</td>
                        <td className="py-3 px-3">{formatCurrency(scaledTotal)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Scheme Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full p-6 flex justify-between items-center font-semibold text-slate-900 hover:bg-slate-50 transition-colors"
              >
                <span>Scheme Details</span>
                {showAdvanced ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
              </button>

              {showAdvanced && (
                <div className="p-6 pt-0 border-t border-slate-100 mt-4 text-xs text-slate-600 space-y-2">
                  <p>• Guaranteed by Govt of India.</p>
                  <p>• Spouse continues to receive same pension after subscriber's death.</p>
                  <p>• Accumulated corpus returned to nominee after both deaths.</p>
                </div>
              )}
            </div>
          </div>

          {/* Results Sidebar */}
          <div className="w-full lg:w-[400px]">
            <div className="bg-[#1e2a4f] rounded-2xl shadow-xl p-6 md:p-8 text-white h-full flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-xl font-bold tracking-tight">APY Summary</h2>
                  <button className="text-slate-400 hover:text-white transition-colors" title="Share">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="mb-8">
                  <div className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-1">
                    ₹{monthlyContributionRequired}/mo
                  </div>
                  <div className="text-slate-300 text-sm font-medium">Monthly Contribution Required</div>
                </div>

                <div className="space-y-4 border-t border-slate-600/60 pt-6">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-300">Years of Contribution</span>
                    <span className="font-semibold text-white">{yearsOfContribution} years</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-300">Total Investment</span>
                    <span className="font-semibold text-white">{formatCurrency(totalInvestment)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-300">Monthly Pension at 60</span>
                    <span className="font-semibold text-emerald-400">{formatCurrency(desiredPension)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-600/40">
                    <span className="text-slate-300">Corpus to Nominee</span>
                    <span className="font-semibold text-white">{formatCurrency(corpusToNominee)}</span>
                  </div>
                </div>
              </div>

              <button className="w-full py-2.5 px-4 bg-[#eaa33a] hover:bg-[#d4902d] text-white font-semibold rounded-xl transition-colors mt-6 flex justify-center items-center gap-2">
                Speak to a Specialist <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </div>
        </div>

        {/* Informational Section */}
        <div className="max-w-4xl space-y-12 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-[#113262] mb-4">What is Atal Pension Yojana (APY)?</h2>
            <p className="text-slate-600">
              Atal Pension Yojana (APY) is a government-backed pension scheme launched in 2015 under the National Pension System (NPS). It is designed primarily for workers in the unorganised sector, guaranteeing a fixed monthly pension of ₹1,000 to ₹5,000 after subscriber turns 60.
            </p>
          </section>

          <section className="pt-6">
            <h2 className="text-xl font-bold text-[#113262] mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-6">
                <h3 className="font-semibold text-slate-900 mb-2">Who is eligible for APY?</h3>
                <p className="text-sm text-slate-600">Any Indian citizen aged 18 to 40 with a savings bank account can enroll in APY.</p>
              </div>

              <div className="pb-6">
                <h3 className="font-semibold text-slate-900 mb-2">Is APY tax-free?</h3>
                <p className="text-sm text-slate-600">Contributions to APY qualify for tax deduction under Section 80CCD(1) within Section 80C.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
