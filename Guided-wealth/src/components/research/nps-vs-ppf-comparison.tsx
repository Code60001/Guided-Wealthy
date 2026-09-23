import React from 'react';
import { Link } from 'react-router-dom';

export default function NpsVsPpfComparison() {
  return (
    <div className="bg-cream min-h-screen pt-36 md:pt-40 pb-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto mb-8 text-sm text-slate-500">
        <Link to="/" className="hover:text-[#2b4c8a] transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/resources" className="hover:text-[#2b4c8a] transition-colors">Resources</Link>
        <span className="mx-2">/</span>
        <span className="cursor-pointer hover:text-[#2b4c8a] transition-colors" onClick={() => window.history.back()}>Financial Planning Scenarios</span>
        <span className="mx-2">/</span>
        <span className="text-slate-800 font-medium">NPS vs PPF: Which Is Better for Long-Term Retirement Savings</span>
      </div>
      
      <article className="max-w-4xl mx-auto font-sans text-slate-700">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2b4c8a] mb-4">
            NPS vs PPF: Which Is Better for Long-Term Retirement Savings
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
              <span>PPF offers fixed 7.1% tax-free returns with 15-year lock-in.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-slate-400 mt-1.5">•</span>
              <span>NPS offers 9-10% expected returns with market risk; 60% tax-free at exit, 40% mandatory annuity.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-slate-400 mt-1.5">•</span>
              <span>For long horizons (25+ years), NPS typically builds a larger corpus than PPF.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-slate-400 mt-1.5">•</span>
              <span>A balanced approach often uses both: PPF for stable debt allocation, NPS for equity growth.</span>
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">How the Numbers Work</h2>
          <div className="space-y-4 leading-relaxed">
            <p>
              NPS's higher expected returns come from its equity exposure (up to 75% in active choice). Over 25 years, this compounds to a meaningfully larger corpus. The trade-off is that 40% of your NPS corpus must buy an annuity at exit, and annuity rates in India are currently low at 6-7%.
            </p>
            <p>
              To run this calculation with your own inputs, use the NPS vs PPF: Which Is Better for Long-Term Retirement Savings calculator.
            </p>
          </div>

          <div className="mt-8 overflow-x-auto border border-slate-200 rounded-sm">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-[#315096] text-white">
                  <th className="p-4 font-bold text-sm w-1/3">Monthly Contribution</th>
                  <th className="p-4 font-bold text-sm w-1/3 text-center">PPF @ 7.1%</th>
                  <th className="p-4 font-bold text-sm w-1/3 text-right">NPS @ 10.0%</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">Rs 5,000</td>
                  <td className="p-4 border border-slate-200 text-center">Rs 41.15 L</td>
                  <td className="p-4 border border-slate-200 text-right">Rs 66.34 L</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">Rs 10,000</td>
                  <td className="p-4 border border-slate-200 text-center">Rs 82.30 L</td>
                  <td className="p-4 border border-slate-200 text-right">Rs 1.33 Cr</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">Rs 12,500</td>
                  <td className="p-4 border border-slate-200 text-center">Rs 1.03 Cr</td>
                  <td className="p-4 border border-slate-200 text-right">Rs 1.66 Cr</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">Rs 25,000</td>
                  <td className="p-4 border border-slate-200 text-center">Rs 2.06 Cr</td>
                  <td className="p-4 border border-slate-200 text-right">Rs 3.32 Cr</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Common Questions</h2>
          <div className="space-y-6 leading-relaxed">
            <p>
              For long horizons (20+ years), NPS can build a larger corpus due to higher expected returns. PPF is safer and fully tax-free at maturity. Many investors use both.
            </p>
            <p>
              You can get up to Rs 2 lakh deduction: Rs 1.5 lakh under 80C and an additional Rs 50,000 under 80CCD(1B).
            </p>
            <p>
              Partial withdrawal (up to 25%) is allowed after 3 years for specific needs like child's education or first home. Full withdrawal triggers 80% mandatory annuity if before 60.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-[#2b4c8a] font-medium text-lg mb-2">Is NPS better than PPF?</h3>
              <p className="leading-relaxed">
                For long horizons (20+ years), NPS can build a larger corpus due to higher expected returns. PPF is safer and fully tax-free at maturity. Many investors use both.
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-[#2b4c8a] font-medium text-lg mb-2">How much can I invest in NPS for tax benefits?</h3>
              <p className="leading-relaxed">
                You can get up to Rs 2 lakh deduction: Rs 1.5 lakh under 80C and an additional Rs 50,000 under 80CCD(1B).
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-[#2b4c8a] font-medium text-lg mb-2">Can I withdraw from NPS before 60?</h3>
              <p className="leading-relaxed">
                Partial withdrawal (up to 25%) is allowed after 3 years for specific needs like child's education or first home. Full withdrawal triggers 80% mandatory annuity if before 60.
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
