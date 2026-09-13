import React from 'react';
import { Link } from 'react-router-dom';

export default function ElssVsPpfTaxSaving() {
  return (
    <div className="bg-cream min-h-screen pt-36 md:pt-40 pb-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto mb-8 text-sm text-slate-500">
        <Link to="/" className="hover:text-[#2b4c8a] transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/resources" className="hover:text-[#2b4c8a] transition-colors">Resources</Link>
        <span className="mx-2">/</span>
        <span className="cursor-pointer hover:text-[#2b4c8a] transition-colors" onClick={() => window.history.back()}>Financial Planning Scenarios</span>
        <span className="mx-2">/</span>
        <span className="text-slate-800 font-medium">ELSS vs PPF for 80C Tax Saving: Compare Returns and Lock-In</span>
      </div>
      
      <article className="max-w-4xl mx-auto font-sans text-slate-700">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2b4c8a] mb-4">
            ELSS vs PPF for 80C Tax Saving: Compare Returns and Lock-In
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
              <span>ELSS has the shortest lock-in among 80C options: just 3 years.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-slate-400 mt-1.5">•</span>
              <span>PPF has 15-year lock-in but offers guaranteed 7.1% tax-free returns.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-slate-400 mt-1.5">•</span>
              <span>ELSS has delivered 12-15% annualised over long periods, but comes with equity risk.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-slate-400 mt-1.5">•</span>
              <span>For investors under 45 with a long horizon, ELSS typically builds a larger corpus than PPF.</span>
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">How the Numbers Work</h2>
          <div className="space-y-4 leading-relaxed">
            <p>
              For investors under 45 with long horizons, ELSS often wins on returns. But PPF guarantees: no capital loss, tax-free returns, government backing: make it psychologically easier to stay invested for 15 years. Many investors split Rs 1.5 lakh across both to get the best of both worlds.
            </p>
            <p>
              To run this calculation with your own inputs, use the ELSS vs PPF for 80C Tax Saving: Compare Returns and Lock-In calculator.
            </p>
          </div>

          <div className="mt-8 overflow-x-auto border border-slate-200 rounded-sm">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-[#315096] text-white">
                  <th className="p-4 font-bold text-sm w-1/3">Annual Investment</th>
                  <th className="p-4 font-bold text-sm w-1/3 text-center">PPF (15 yrs, 7.1%)</th>
                  <th className="p-4 font-bold text-sm w-1/3 text-right">ELSS (15 yrs, 12%)</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">Rs 50,000</td>
                  <td className="p-4 border border-slate-200 text-center">Rs 13.32 L</td>
                  <td className="p-4 border border-slate-200 text-right">Rs 20.82 L</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">Rs 1 lakh</td>
                  <td className="p-4 border border-slate-200 text-center">Rs 26.64 L</td>
                  <td className="p-4 border border-slate-200 text-right">Rs 41.63 L</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">Rs 1.5 lakh (80C max)</td>
                  <td className="p-4 border border-slate-200 text-center">Rs 39.97 L</td>
                  <td className="p-4 border border-slate-200 text-right">Rs 62.45 L</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Common Questions</h2>
          <div className="space-y-6 leading-relaxed">
            <p>
              For risk-tolerant investors with long horizons, ELSS typically wins on returns. For those preferring capital safety, PPF is better. Many investors split across both.
            </p>
            <p>
              Gains above Rs 1 lakh per year are taxed at 10% LTCG. Within the Rs 1 lakh limit, gains are tax-free.
            </p>
            <p>
              Under the new regime, you don't get 80C deduction, making PPF less attractive. But existing PPF accounts still earn tax-free returns.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-[#2b4c8a] font-medium text-lg mb-2">Which is better for 80C: ELSS or PPF?</h3>
              <p className="leading-relaxed">
                For risk-tolerant investors with long horizons, ELSS typically wins on returns. For those preferring capital safety, PPF is better. Many investors split across both.
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-[#2b4c8a] font-medium text-lg mb-2">How does ELSS taxation work after 3-year lock-in?</h3>
              <p className="leading-relaxed">
                Gains above Rs 1 lakh per year are taxed at 10% LTCG. Within the Rs 1 lakh limit, gains are tax-free.
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-[#2b4c8a] font-medium text-lg mb-2">Is PPF still relevant with the new tax regime?</h3>
              <p className="leading-relaxed">
                Under the new regime, you don't get 80C deduction, making PPF less attractive. But existing PPF accounts still earn tax-free returns.
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
