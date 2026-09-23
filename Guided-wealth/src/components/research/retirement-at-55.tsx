import React from 'react';
import { Link } from 'react-router-dom';

export default function RetirementAt55() {
  return (
    <div className="bg-cream min-h-screen pt-36 md:pt-40 pb-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto mb-8 text-sm text-slate-500">
        <Link to="/" className="hover:text-[#2b4c8a] transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/resources" className="hover:text-[#2b4c8a] transition-colors">Resources</Link>
        <span className="mx-2">/</span>
        <span className="cursor-pointer hover:text-[#2b4c8a] transition-colors" onClick={() => window.history.back()}>Financial Planning Scenarios</span>
        <span className="mx-2">/</span>
        <span className="text-slate-800 font-medium">Retirement at 55 in India: Corpus Calculator and Plan</span>
      </div>
      
      <article className="max-w-4xl mx-auto font-sans text-slate-700">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2b4c8a] mb-4">
            Retirement at 55 in India: Corpus Calculator and Plan
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span>Updated: 17 April 2026</span>
            <span>Source: Guided Wealthy</span>
          </div>
        </header>

        <section className="bg-[#f4f6fb] border border-blue-100 rounded-lg p-6 md:p-8 mb-10">
          <h2 className="text-xl font-semibold text-[#2b4c8a] mb-4">Key Takeaways</h2>
          <ul className="space-y-3 list-none">
            <li className="flex items-start">
              <span className="mr-3 text-slate-400 mt-1.5">•</span>
              <span>Retiring at 55 gives you a 25-30 year retirement horizon; plan for 30 years.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-slate-400 mt-1.5">•</span>
              <span>A monthly spend of Rs 1 lakh today needs a corpus of roughly Rs 2.5-3 crore.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-slate-400 mt-1.5">•</span>
              <span>Post-55 portfolio should typically hold 40-60% equity to sustain through inflation.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-slate-400 mt-1.5">•</span>
              <span>EPF and NPS withdrawals can cover the first 5-7 years while equity compounds.</span>
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">How the Numbers Work</h2>
          <div className="space-y-4 leading-relaxed">
            <p>
              A 30-year horizon is long enough that your corpus must continue to compound even during retirement. This is why most retirement plans suggest keeping at least 40-60% in equity even after age 55. A pure debt portfolio will struggle to keep pace with 6-7% inflation over three decades.
            </p>
            <p>
              To run this calculation with your own inputs, use the Retirement at 55 in India: Corpus Calculator and Plan calculator.
            </p>
          </div>

          <div className="mt-8 overflow-x-auto border border-slate-200 rounded-sm">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-[#315096] text-white">
                  <th className="p-4 font-bold text-sm w-1/3">Monthly Expenses Today</th>
                  <th className="p-4 font-bold text-sm w-1/3 text-center">Corpus Needed (30 yrs)</th>
                  <th className="p-4 font-bold text-sm w-1/3 text-right">Assumed Real Return</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">Rs 50,000</td>
                  <td className="p-4 border border-slate-200 text-center">Rs 1.07 Cr</td>
                  <td className="p-4 border border-slate-200 text-right">4</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">Rs 1.00 L</td>
                  <td className="p-4 border border-slate-200 text-center">Rs 2.13 Cr</td>
                  <td className="p-4 border border-slate-200 text-right">4</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">Rs 1.50 L</td>
                  <td className="p-4 border border-slate-200 text-center">Rs 3.20 Cr</td>
                  <td className="p-4 border border-slate-200 text-right">4</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">Rs 2.00 L</td>
                  <td className="p-4 border border-slate-200 text-center">Rs 4.27 Cr</td>
                  <td className="p-4 border border-slate-200 text-right">4</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">Rs 3.00 L</td>
                  <td className="p-4 border border-slate-200 text-center">Rs 6.40 Cr</td>
                  <td className="p-4 border border-slate-200 text-right">4</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Common Questions</h2>
          <div className="space-y-6 leading-relaxed">
            <p>
              For a monthly expense of Rs 1 lakh in today's terms, plan for a corpus of around Rs 2.5-3 crore, assuming 30 years of retirement and 6% inflation.
            </p>
            <p>
              A common rule is 100 minus your age in equity: so at 55, around 45% equity. Adjust based on your total corpus, risk tolerance, and other income.
            </p>
            <p>
              NPS allows 60% lump sum tax-free at retirement age. The remaining 40% goes into an annuity. Evaluate annuity rates versus your own SWP plan from mutual funds.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-[#2b4c8a] font-medium text-lg mb-2">How much corpus is enough to retire at 55 in India?</h3>
              <p className="leading-relaxed">
                For a monthly expense of Rs 1 lakh in today's terms, plan for a corpus of around Rs 2.5-3 crore, assuming 30 years of retirement and 6% inflation.
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-[#2b4c8a] font-medium text-lg mb-2">What allocation should I hold at retirement?</h3>
              <p className="leading-relaxed">
                A common rule is 100 minus your age in equity: so at 55, around 45% equity. Adjust based on your total corpus, risk tolerance, and other income.
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-[#2b4c8a] font-medium text-lg mb-2">Should I take a lump sum from NPS at 55?</h3>
              <p className="leading-relaxed">
                NPS allows 60% lump sum tax-free at retirement age. The remaining 40% goes into an annuity. Evaluate annuity rates versus your own SWP plan from mutual funds.
              </p>
            </div>
          </div>
        </section>

        <div className="border-l-4 border-[#2b4c8a] pl-4 py-2 mb-8 bg-slate-50">
          <Link to="/calculators" className="text-slate-800 hover:text-[#2b4c8a] transition-colors inline-flex items-center gap-2">
            Try the live calculator <span className="text-[#2b4c8a]">Learn more &rarr;</span>
          </Link>
        </div>

        <div className="border-l-4 border-[#2b4c8a] pl-4 py-3 bg-slate-50 text-sm text-slate-500">
          <p>
            <strong>Disclaimer:</strong> This analysis is based on historical data and is intended for educational purposes only. Past performance does not guarantee future results. Investors should consult a SEBI registered portfolio manager or investment advisor before making investment decisions.
          </p>
        </div>
      </article>
    </div>
  );
}
