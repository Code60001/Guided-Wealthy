import React from 'react';
import { Link } from 'react-router-dom';

export default function SwpFor1LakhMonth() {
  return (
    <div className="bg-cream min-h-screen pt-36 md:pt-40 pb-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto mb-8 text-sm text-slate-500">
        <Link to="/" className="hover:text-[#2b4c8a] transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/resources" className="hover:text-[#2b4c8a] transition-colors">Resources</Link>
        <span className="mx-2">/</span>
        <span className="cursor-pointer hover:text-[#2b4c8a] transition-colors" onClick={() => window.history.back()}>Financial Planning Scenarios</span>
        <span className="mx-2">/</span>
        <span className="text-slate-800 font-medium">SWP for Rs 1 Lakh Monthly Income: Corpus You Need</span>
      </div>
      
      <article className="max-w-4xl mx-auto font-sans text-slate-700">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2b4c8a] mb-4">
            SWP for Rs 1 Lakh Monthly Income: Corpus You Need
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
              <span>A corpus of approximately Rs 1.5-1.8 crore can fund Rs 1 lakh monthly withdrawal for 20 years at 10% returns.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-slate-400 mt-1.5">•</span>
              <span>Higher equity allocation gives you better chances of outpacing inflation during withdrawal.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-slate-400 mt-1.5">•</span>
              <span>A conservative safe withdrawal rate is around 3.5-4% per year to handle bad market years.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-slate-400 mt-1.5">•</span>
              <span>SWP is more tax-efficient than annuity income for most Indian investors.</span>
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">How the Numbers Work</h2>
          <div className="space-y-4 leading-relaxed">
            <p>
              A balanced portfolio delivering 10% annually can sustain Rs 1 lakh monthly withdrawal from a Rs 1.5 crore corpus for roughly 25 years. Higher returns or lower withdrawals extend the horizon significantly. Keep 2-3 years of withdrawals in liquid instruments so you don't have to sell equity during market crashes.
            </p>
            <p>
              To run this calculation with your own inputs, use the SWP for Rs 1 Lakh Monthly Income: Corpus You Need calculator.
            </p>
          </div>

          <div className="mt-8 overflow-x-auto border border-slate-200 rounded-sm">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-[#315096] text-white">
                  <th className="p-4 font-bold text-sm w-1/3">Monthly Withdrawal</th>
                  <th className="p-4 font-bold text-sm w-1/3 text-center">Corpus</th>
                  <th className="p-4 font-bold text-sm w-1/3 text-right">Years Sustained @ 10%</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">Rs 75,000</td>
                  <td className="p-4 border border-slate-200 text-center">Rs 1.50 Cr</td>
                  <td className="p-4 border border-slate-200 text-right">Forever (perpetuity)</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">Rs 1.00 L</td>
                  <td className="p-4 border border-slate-200 text-center">Rs 1.50 Cr</td>
                  <td className="p-4 border border-slate-200 text-right">Forever (perpetuity)</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">Rs 1.50 L</td>
                  <td className="p-4 border border-slate-200 text-center">Rs 1.50 Cr</td>
                  <td className="p-4 border border-slate-200 text-right">18</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Common Questions</h2>
          <div className="space-y-6 leading-relaxed">
            <p>
              For a 25-year withdrawal horizon at 10% portfolio returns, you need approximately Rs 1.5 crore to sustain Rs 1 lakh per month. More if you want inflation protection.
            </p>
            <p>
              Each withdrawal from an equity mutual fund is treated as redemption. LTCG above Rs 1 lakh per year is taxed at 10%. Debt funds are taxed at slab rate post-2023.
            </p>
            <p>
              Yes, for most investors. SWP gives you control over withdrawal timing and amount, and is more tax-efficient than dividend income for equity funds.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-[#2b4c8a] font-medium text-lg mb-2">How much corpus do I need for Rs 1 lakh monthly SWP?</h3>
              <p className="leading-relaxed">
                For a 25-year withdrawal horizon at 10% portfolio returns, you need approximately Rs 1.5 crore to sustain Rs 1 lakh per month. More if you want inflation protection.
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-[#2b4c8a] font-medium text-lg mb-2">How is SWP taxed in India?</h3>
              <p className="leading-relaxed">
                Each withdrawal from an equity mutual fund is treated as redemption. LTCG above Rs 1 lakh per year is taxed at 10%. Debt funds are taxed at slab rate post-2023.
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-[#2b4c8a] font-medium text-lg mb-2">Is SWP better than dividend option for retirement income?</h3>
              <p className="leading-relaxed">
                Yes, for most investors. SWP gives you control over withdrawal timing and amount, and is more tax-efficient than dividend income for equity funds.
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
