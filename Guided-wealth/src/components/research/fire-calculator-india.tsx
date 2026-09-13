import React from 'react';
import { Link } from 'react-router-dom';

export default function FireCalculatorIndia() {
  return (
    <div className="bg-cream min-h-screen pt-36 md:pt-40 pb-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto mb-8 text-sm text-slate-500">
        <Link to="/" className="hover:text-[#2b4c8a] transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/resources" className="hover:text-[#2b4c8a] transition-colors">Resources</Link>
        <span className="mx-2">/</span>
        <span className="cursor-pointer hover:text-[#2b4c8a] transition-colors" onClick={() => window.history.back()}>Financial Planning Scenarios</span>
        <span className="mx-2">/</span>
        <span className="text-slate-800 font-medium">FIRE Calculator India: Financial Independence Retire Early</span>
      </div>
      
      <article className="max-w-4xl mx-auto font-sans text-slate-700">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2b4c8a] mb-4">
            FIRE Calculator India: Financial Independence Retire Early
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
              <span>FIRE corpus rule of thumb: 25x your annual expenses (based on 4% safe withdrawal).</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-slate-400 mt-1.5">•</span>
              <span>Many Indian FIRE seekers prefer 30x given higher inflation and longer retirement periods.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-slate-400 mt-1.5">•</span>
              <span>Achieving FIRE in India typically requires 40-55% savings rate over 12-15 years.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-slate-400 mt-1.5">•</span>
              <span>Post-FIRE, keep 60-70% equity to combat long-term inflation.</span>
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">How the Numbers Work</h2>
          <div className="space-y-4 leading-relaxed">
            <p>
              Achieving FIRE in India is difficult but not impossible. It typically requires saving 40-55% of your income for 12-15 years, while investing aggressively in equity mutual funds or direct stocks. The bigger challenge is post-FIRE: keeping your portfolio growing enough to beat inflation for 30-40 years.
            </p>
            <p>
              To run this calculation with your own inputs, use the FIRE Calculator India: Financial Independence Retire Early calculator.
            </p>
          </div>

          <div className="mt-8 overflow-x-auto border border-slate-200 rounded-sm">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-[#315096] text-white">
                  <th className="p-4 font-bold text-sm w-1/3">Monthly Expenses</th>
                  <th className="p-4 font-bold text-sm w-1/3 text-center">Annual Expenses</th>
                  <th className="p-4 font-bold text-sm w-1/3 text-right">FIRE Corpus (25x)</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">Rs 50,000</td>
                  <td className="p-4 border border-slate-200 text-center">Rs 6.00 L</td>
                  <td className="p-4 border border-slate-200 text-right">Rs 1.50 Cr</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">Rs 75,000</td>
                  <td className="p-4 border border-slate-200 text-center">Rs 9.00 L</td>
                  <td className="p-4 border border-slate-200 text-right">Rs 2.25 Cr</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">Rs 1.00 L</td>
                  <td className="p-4 border border-slate-200 text-center">Rs 12.00 L</td>
                  <td className="p-4 border border-slate-200 text-right">Rs 3.00 Cr</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">Rs 1.50 L</td>
                  <td className="p-4 border border-slate-200 text-center">Rs 18.00 L</td>
                  <td className="p-4 border border-slate-200 text-right">Rs 4.50 Cr</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">Rs 2.00 L</td>
                  <td className="p-4 border border-slate-200 text-center">Rs 24.00 L</td>
                  <td className="p-4 border border-slate-200 text-right">Rs 6.00 Cr</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Common Questions</h2>
          <div className="space-y-6 leading-relaxed">
            <p>
              FIRE stands for Financial Independence, Retire Early. It means building a corpus large enough (typically 25x annual expenses) that you can live off investment returns.
            </p>
            <p>
              Yes, but challenging. It requires saving 40%+ of income, investing primarily in equity, and maintaining discipline for 10-15 years.
            </p>
            <p>
              The 4% rule says you can safely withdraw 4% of your portfolio in the first year of retirement, then adjust for inflation each year. Works for 30-year retirement horizons with 60:40 portfolios.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-[#2b4c8a] font-medium text-lg mb-2">What is FIRE in personal finance?</h3>
              <p className="leading-relaxed">
                FIRE stands for Financial Independence, Retire Early. It means building a corpus large enough (typically 25x annual expenses) that you can live off investment returns.
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-[#2b4c8a] font-medium text-lg mb-2">Is FIRE realistic in India?</h3>
              <p className="leading-relaxed">
                Yes, but challenging. It requires saving 40%+ of income, investing primarily in equity, and maintaining discipline for 10-15 years.
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-[#2b4c8a] font-medium text-lg mb-2">What is the 4% rule?</h3>
              <p className="leading-relaxed">
                The 4% rule says you can safely withdraw 4% of your portfolio in the first year of retirement, then adjust for inflation each year. Works for 30-year retirement horizons with 60:40 portfolios.
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
