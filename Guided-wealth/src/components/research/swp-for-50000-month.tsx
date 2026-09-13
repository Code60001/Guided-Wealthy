import React from 'react';
import { Link } from 'react-router-dom';

export default function SwpFor50000Month() {
  return (
    <div className="bg-cream min-h-screen pt-36 md:pt-40 pb-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto mb-8 text-sm text-slate-500">
        <Link to="/" className="hover:text-[#2b4c8a] transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/resources" className="hover:text-[#2b4c8a] transition-colors">Resources</Link>
        <span className="mx-2">/</span>
        <span className="cursor-pointer hover:text-[#2b4c8a] transition-colors" onClick={() => window.history.back()}>Financial Planning Scenarios</span>
        <span className="mx-2">/</span>
        <span className="text-slate-800 font-medium">SWP for Rs 50,000 Monthly Income: Corpus and Duration Plan</span>
      </div>
      
      <article className="max-w-4xl mx-auto font-sans text-slate-700">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2b4c8a] mb-4">
            SWP for Rs 50,000 Monthly Income: Corpus and Duration Plan
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
              <span>A corpus of Rs 75-90 lakh can fund Rs 50,000 monthly withdrawal for 20 years.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-slate-400 mt-1.5">•</span>
              <span>Growth mutual funds with 60-70% equity typically sustain SWPs best over 20+ years.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-slate-400 mt-1.5">•</span>
              <span>Keep 2-3 years of withdrawals in liquid or debt funds to avoid selling equity in crashes.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-slate-400 mt-1.5">•</span>
              <span>SWP works best when the withdrawal rate is below the expected long-term return rate.</span>
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">How the Numbers Work</h2>
          <div className="space-y-4 leading-relaxed">
            <p>
              If you keep the withdrawal rate below 7-8% of the corpus annually, most plans survive 20+ years. Crossing 10% sharply increases the risk of running out of money in a bad market decade. The common mistake is underestimating how long retirement lasts and overestimating safe withdrawal rates.
            </p>
            <p>
              To run this calculation with your own inputs, use the SWP for Rs 50,000 Monthly Income: Corpus and Duration Plan calculator.
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
                  <td className="p-4 border border-slate-200">Rs 40,000</td>
                  <td className="p-4 border border-slate-200 text-center">Rs 80.00 L</td>
                  <td className="p-4 border border-slate-200 text-right">Forever (perpetuity)</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">Rs 50,000</td>
                  <td className="p-4 border border-slate-200 text-center">Rs 80.00 L</td>
                  <td className="p-4 border border-slate-200 text-right">Forever (perpetuity)</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">Rs 60,000</td>
                  <td className="p-4 border border-slate-200 text-center">Rs 80.00 L</td>
                  <td className="p-4 border border-slate-200 text-right">Forever (perpetuity)</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">Rs 75,000</td>
                  <td className="p-4 border border-slate-200 text-center">Rs 80.00 L</td>
                  <td className="p-4 border border-slate-200 text-right">22.1</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Common Questions</h2>
          <div className="space-y-6 leading-relaxed">
            <p>
              Yes. Rs 50 lakh at 10% returns can sustain Rs 50,000 monthly for around 12-14 years. Larger corpus extends the duration.
            </p>
            <p>
              A balanced portfolio (60:40 equity:debt) typically delivers 9-11% over long horizons. Plan on 9-10% to be conservative.
            </p>
            <p>
              Yes, increase by 6-7% annually to keep pace with inflation. This is what retirees in India need to maintain purchasing power.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-[#2b4c8a] font-medium text-lg mb-2">Can I start SWP with Rs 50 lakh?</h3>
              <p className="leading-relaxed">
                Yes. Rs 50 lakh at 10% returns can sustain Rs 50,000 monthly for around 12-14 years. Larger corpus extends the duration.
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-[#2b4c8a] font-medium text-lg mb-2">What return rate is realistic for SWP?</h3>
              <p className="leading-relaxed">
                A balanced portfolio (60:40 equity:debt) typically delivers 9-11% over long horizons. Plan on 9-10% to be conservative.
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-[#2b4c8a] font-medium text-lg mb-2">Should I increase SWP amount over time?</h3>
              <p className="leading-relaxed">
                Yes, increase by 6-7% annually to keep pace with inflation. This is what retirees in India need to maintain purchasing power.
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
