import React from 'react';
import { Link } from 'react-router-dom';

export default function GoldVsEquity10Year() {
  return (
    <div className="bg-cream min-h-screen pt-36 md:pt-40 pb-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto mb-8 text-sm text-slate-500">
        <Link to="/" className="hover:text-[#2b4c8a] transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/resources" className="hover:text-[#2b4c8a] transition-colors">Resources</Link>
        <span className="mx-2">/</span>
        <span className="cursor-pointer hover:text-[#2b4c8a] transition-colors" onClick={() => window.history.back()}>Financial Planning Scenarios</span>
        <span className="mx-2">/</span>
        <span className="text-slate-800 font-medium">Gold vs Equity Over 10 Years: Which Investment Wins in India</span>
      </div>
      
      <article className="max-w-4xl mx-auto font-sans text-slate-700">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2b4c8a] mb-4">
            Gold vs Equity Over 10 Years: Which Investment Wins in India
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span>Updated: 17 April 2026</span>
            <span>Source: Maxiom Wealth</span>
          </div>
        </header>

        <section className="bg-[#f4f6fb] border border-blue-100 rounded-lg p-6 md:p-8 mb-10">
          <h2 className="text-xl font-semibold text-[#2b4c8a] mb-4">Key Takeaways</h2>
          <ul className="space-y-3 list-none">
            <li className="flex items-start">
              <span className="mr-3 text-slate-400 mt-1.5">•</span>
              <span>Gold has delivered roughly 8-9% annualised returns in India over 20-year periods.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-slate-400 mt-1.5">•</span>
              <span>Nifty 50 has delivered around 12% annualised returns including dividends over 20 years.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-slate-400 mt-1.5">•</span>
              <span>Over 20 years, the equity vs gold wealth gap can be 2-3x on an identical investment.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-slate-400 mt-1.5">•</span>
              <span>Gold's role is diversification and downside protection, not wealth compounding.</span>
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">How the Numbers Work</h2>
          <div className="space-y-4 leading-relaxed">
            <p>
              The difference compounds dramatically over long periods. Over 20 years, the equity portfolio's lead widens significantly because of compounding. Gold tends to have its best years during equity bear markets and currency crises: making it a useful diversifier, not a primary wealth engine.
            </p>
            <p>
              To run this calculation with your own inputs, use the Gold vs Equity Over 10 Years: Which Investment Wins in India calculator.
            </p>
          </div>

          <div className="mt-8 overflow-x-auto border border-slate-200 rounded-sm">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-[#315096] text-white">
                  <th className="p-4 font-bold text-sm w-1/4">Horizon</th>
                  <th className="p-4 font-bold text-sm w-1/4">Gold @ 8.5%</th>
                  <th className="p-4 font-bold text-sm w-1/4">Equity @ 12.0%</th>
                  <th className="p-4 font-bold text-sm w-1/4">Difference</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">5 years</td>
                  <td className="p-4 border border-slate-200">Rs 15.04 L</td>
                  <td className="p-4 border border-slate-200">Rs 17.62 L</td>
                  <td className="p-4 border border-slate-200">Rs 2.59 L</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">10 years</td>
                  <td className="p-4 border border-slate-200">Rs 22.61 L</td>
                  <td className="p-4 border border-slate-200">Rs 31.06 L</td>
                  <td className="p-4 border border-slate-200">Rs 8.45 L</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">15 years</td>
                  <td className="p-4 border border-slate-200">Rs 34.00 L</td>
                  <td className="p-4 border border-slate-200">Rs 54.74 L</td>
                  <td className="p-4 border border-slate-200">Rs 20.74 L</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">20 years</td>
                  <td className="p-4 border border-slate-200">Rs 51.12 L</td>
                  <td className="p-4 border border-slate-200">Rs 96.46 L</td>
                  <td className="p-4 border border-slate-200">Rs 45.34 L</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">25 years</td>
                  <td className="p-4 border border-slate-200">Rs 76.87 L</td>
                  <td className="p-4 border border-slate-200">Rs 1.70 Cr</td>
                  <td className="p-4 border border-slate-200">Rs 93.13 L</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Common Questions</h2>
          <div className="space-y-6 leading-relaxed">
            <p>
              No. Over 10+ year windows, Indian equity (Nifty 50) has typically outperformed gold by a wide margin. Gold shines during specific crisis periods, not over long horizons.
            </p>
            <p>
              A common allocation is 5-15% of the portfolio, primarily for diversification and crisis hedging, not for returns.
            </p>
            <p>
              Yes, for most investors. SGBs offer 2.5% annual interest plus price appreciation, are tax-free at maturity, and avoid storage risk.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-[#2b4c8a] font-medium text-lg mb-2">Does gold beat equity in India over the long term?</h3>
              <p className="leading-relaxed">
                No. Over 10+ year windows, Indian equity (Nifty 50) has typically outperformed gold by a wide margin. Gold shines during specific crisis periods, not over long horizons.
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-[#2b4c8a] font-medium text-lg mb-2">What percentage of portfolio should be in gold?</h3>
              <p className="leading-relaxed">
                A common allocation is 5-15% of the portfolio, primarily for diversification and crisis hedging, not for returns.
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-[#2b4c8a] font-medium text-lg mb-2">Is sovereign gold bond (SGB) better than physical gold?</h3>
              <p className="leading-relaxed">
                Yes, for most investors. SGBs offer 2.5% annual interest plus price appreciation, are tax-free at maturity, and avoid storage risk.
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
