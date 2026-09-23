import React from 'react';
import { Link } from 'react-router-dom';

export default function SipFor1Crore() {
  return (
    <div className="bg-cream min-h-screen pt-36 md:pt-40 pb-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto mb-8 text-sm text-slate-500">
        <Link to="/" className="hover:text-[#2b4c8a] transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/resources" className="hover:text-[#2b4c8a] transition-colors">Resources</Link>
        <span className="mx-2">/</span>
        <span className="cursor-pointer hover:text-[#2b4c8a] transition-colors" onClick={() => window.history.back()}>Financial Planning Scenarios</span>
        <span className="mx-2">/</span>
        <span className="text-slate-800 font-medium">SIP Needed to Build Your First Crore in India</span>
      </div>
      
      <article className="max-w-4xl mx-auto font-sans text-slate-700">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2b4c8a] mb-4">
            SIP Needed to Build Your First Crore in India
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
              <span>To reach Rs 1 crore in 15 years at 12% returns, you need approximately Rs 20,000 per month.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-slate-400 mt-1.5">•</span>
              <span>Starting earlier matters more than investing larger amounts later.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-slate-400 mt-1.5">•</span>
              <span>A realistic equity mutual fund return assumption is 10-12% per annum over long horizons.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-slate-400 mt-1.5">•</span>
              <span>Inflation will eat into Rs 1 crore's real value, so review your target every 5 years.</span>
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">How the Numbers Work</h2>
          <div className="space-y-4 leading-relaxed">
            <p>
              The earlier you start, the less you need to invest each month. Over 20 years, a Rs 15,000 monthly SIP at 12% compounds to roughly Rs 1.5 crore: more than the target. Over 10 years, the same target requires more than Rs 45,000 per month. Time in the market is an investor's greatest lever.
            </p>
            <p>
              To run this calculation with your own inputs, use the SIP Needed to Build Your First Crore in India calculator.
            </p>
          </div>

          <div className="mt-8 overflow-x-auto border border-slate-200 rounded-sm">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-[#315096] text-white">
                  <th className="p-4 font-bold text-sm w-1/5">Years</th>
                  <th className="p-4 font-bold text-sm w-1/5">8% return</th>
                  <th className="p-4 font-bold text-sm w-1/5">10% return</th>
                  <th className="p-4 font-bold text-sm w-1/5">12% return</th>
                  <th className="p-4 font-bold text-sm w-1/5">15% return</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">10</td>
                  <td className="p-4 border border-slate-200">Rs 54,661</td>
                  <td className="p-4 border border-slate-200">Rs 48,817</td>
                  <td className="p-4 border border-slate-200">Rs 43,471</td>
                  <td className="p-4 border border-slate-200">Rs 36,335</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">15</td>
                  <td className="p-4 border border-slate-200">Rs 28,899</td>
                  <td className="p-4 border border-slate-200">Rs 24,127</td>
                  <td className="p-4 border border-slate-200">Rs 20,017</td>
                  <td className="p-4 border border-slate-200">Rs 14,959</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">20</td>
                  <td className="p-4 border border-slate-200">Rs 16,977</td>
                  <td className="p-4 border border-slate-200">Rs 13,169</td>
                  <td className="p-4 border border-slate-200">Rs 10,109</td>
                  <td className="p-4 border border-slate-200">Rs 6,679</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">25</td>
                  <td className="p-4 border border-slate-200">Rs 10,515</td>
                  <td className="p-4 border border-slate-200">Rs 7,537</td>
                  <td className="p-4 border border-slate-200">Rs 5,322</td>
                  <td className="p-4 border border-slate-200">Rs 3,083</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">30</td>
                  <td className="p-4 border border-slate-200">Rs 6,710</td>
                  <td className="p-4 border border-slate-200">Rs 4,424</td>
                  <td className="p-4 border border-slate-200">Rs 2,861</td>
                  <td className="p-4 border border-slate-200">Rs 1,444</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Common Questions</h2>
          <div className="space-y-6 leading-relaxed">
            <p>
              At 12% annual returns, you need around Rs 20,000 per month for 15 years to build a corpus of approximately Rs 1 crore. See the table for other horizons and rates.
            </p>
            <p>
              Over long periods (10+ years), well-diversified equity mutual funds in India have historically delivered 10-14% annualised returns. 12% is a reasonable central estimate for planning.
            </p>
            <p>
              Yes. A step-up SIP (increasing contributions by 10% each year) helps you reach goals faster and accounts for rising income and inflation.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-[#2b4c8a] font-medium text-lg mb-2">How much SIP do I need to reach 1 crore in 15 years?</h3>
              <p className="leading-relaxed">
                At 12% annual returns, you need around Rs 20,000 per month for 15 years to build a corpus of approximately Rs 1 crore. See the table for other horizons and rates.
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-[#2b4c8a] font-medium text-lg mb-2">Is 12% return realistic for Indian equity mutual funds?</h3>
              <p className="leading-relaxed">
                Over long periods (10+ years), well-diversified equity mutual funds in India have historically delivered 10-14% annualised returns. 12% is a reasonable central estimate for planning.
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-[#2b4c8a] font-medium text-lg mb-2">Should I increase my SIP every year?</h3>
              <p className="leading-relaxed">
                Yes. A step-up SIP (increasing contributions by 10% each year) helps you reach goals faster and accounts for rising income and inflation.
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
