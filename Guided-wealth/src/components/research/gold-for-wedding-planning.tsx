import React from 'react';
import { Link } from 'react-router-dom';

export default function GoldForWeddingPlanning() {
  return (
    <div className="bg-cream min-h-screen pt-36 md:pt-40 pb-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto mb-8 text-sm text-slate-500">
        <Link to="/" className="hover:text-[#2b4c8a] transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/resources" className="hover:text-[#2b4c8a] transition-colors">Resources</Link>
        <span className="mx-2">/</span>
        <span className="cursor-pointer hover:text-[#2b4c8a] transition-colors" onClick={() => window.history.back()}>Financial Planning Scenarios</span>
        <span className="mx-2">/</span>
        <span className="text-slate-800 font-medium">How Much Gold to Buy for an Indian Wedding: A Financial Plan</span>
      </div>
      
      <article className="max-w-4xl mx-auto font-sans text-slate-700">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2b4c8a] mb-4">
            How Much Gold to Buy for an Indian Wedding: A Financial Plan
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
              <span>A typical Indian wedding includes 100-300 grams of gold jewellery depending on region and custom.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-slate-400 mt-1.5">•</span>
              <span>Gold prices have risen 8-9% per year in India over long periods.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-slate-400 mt-1.5">•</span>
              <span>Starting 5-7 years in advance via SGBs or gold mutual funds can cushion price rises.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-slate-400 mt-1.5">•</span>
              <span>Avoid making charges of 15-25% by planning gold purchases during non-wedding months.</span>
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">How the Numbers Work</h2>
          <div className="space-y-4 leading-relaxed">
            <p>
              Starting early lets you take advantage of Sovereign Gold Bonds (SGBs), which pay 2.5% annual interest on top of gold price appreciation. SGBs held to maturity are also tax-free, making them significantly more efficient than physical gold for long-term accumulation.
            </p>
            <p>
              To run this calculation with your own inputs, use the How Much Gold to Buy for an Indian Wedding: A Financial Plan calculator.
            </p>
          </div>

          <div className="mt-8 overflow-x-auto border border-slate-200 rounded-sm">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-[#315096] text-white">
                  <th className="p-4 font-bold text-sm w-1/4">Target (grams)</th>
                  <th className="p-4 font-bold text-sm w-1/4">Today's Cost*</th>
                  <th className="p-4 font-bold text-sm w-1/4">Projected 5-yr Cost</th>
                  <th className="p-4 font-bold text-sm w-1/4">Monthly SIP (5 yrs, SGB)</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">50g</td>
                  <td className="p-4 border border-slate-200">Rs 3.75 L</td>
                  <td className="p-4 border border-slate-200">Rs 5.62 L</td>
                  <td className="p-4 border border-slate-200">Rs 7,458</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">100g</td>
                  <td className="p-4 border border-slate-200">Rs 7.50 L</td>
                  <td className="p-4 border border-slate-200">Rs 11.25 L</td>
                  <td className="p-4 border border-slate-200">Rs 14,916</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">200g</td>
                  <td className="p-4 border border-slate-200">Rs 15.00 L</td>
                  <td className="p-4 border border-slate-200">Rs 22.50 L</td>
                  <td className="p-4 border border-slate-200">Rs 29,831</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">300g</td>
                  <td className="p-4 border border-slate-200">Rs 22.50 L</td>
                  <td className="p-4 border border-slate-200">Rs 33.75 L</td>
                  <td className="p-4 border border-slate-200">Rs 44,747</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Common Questions</h2>
          <div className="space-y-6 leading-relaxed">
            <p>
              It varies widely: from 50 grams for modest weddings to 300+ grams for elaborate ones. Regional customs, family traditions, and budget all matter.
            </p>
            <p>
              SGBs are great for accumulating gold value, but they cannot be converted into physical jewellery. Buy physical gold in the final year, SGBs for long-horizon savings.
            </p>
            <p>
              Historically, gold prices tend to be softer in monsoon months (July-September) and ahead of budget announcements. But timing the market is hard: SIP into gold funds instead.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-[#2b4c8a] font-medium text-lg mb-2">How much gold jewellery is typical for an Indian wedding?</h3>
              <p className="leading-relaxed">
                It varies widely: from 50 grams for modest weddings to 300+ grams for elaborate ones. Regional customs, family traditions, and budget all matter.
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-[#2b4c8a] font-medium text-lg mb-2">Can I use SGBs for wedding gold?</h3>
              <p className="leading-relaxed">
                SGBs are great for accumulating gold value, but they cannot be converted into physical jewellery. Buy physical gold in the final year, SGBs for long-horizon savings.
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-[#2b4c8a] font-medium text-lg mb-2">When are gold prices lowest in India?</h3>
              <p className="leading-relaxed">
                Historically, gold prices tend to be softer in monsoon months (July-September) and ahead of budget announcements. But timing the market is hard: SIP into gold funds instead.
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
