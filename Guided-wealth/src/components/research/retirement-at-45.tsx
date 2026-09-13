import React from 'react';
import { Link } from 'react-router-dom';

export default function RetirementAt45() {
  return (
    <div className="bg-cream min-h-screen pt-36 md:pt-40 pb-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto mb-8 text-sm text-slate-500">
        <Link to="/" className="hover:text-[#2b4c8a] transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/resources" className="hover:text-[#2b4c8a] transition-colors">Resources</Link>
        <span className="mx-2">/</span>
        <span className="cursor-pointer hover:text-[#2b4c8a] transition-colors" onClick={() => window.history.back()}>Financial Planning Scenarios</span>
        <span className="mx-2">/</span>
        <span className="text-slate-800 font-medium">Retirement at 45 in India: Corpus You Need and How to Get There</span>
      </div>
      
      <article className="max-w-4xl mx-auto font-sans text-slate-700">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2b4c8a] mb-4">
            Retirement at 45 in India: Corpus You Need and How to Get There
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
              <span>Retiring at 45 needs 35-40 years of post-retirement funding; assume 40 years.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-slate-400 mt-1.5">•</span>
              <span>A Rs 1 lakh per month lifestyle needs roughly Rs 3-4 crore in today's rupees as corpus.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-slate-400 mt-1.5">•</span>
              <span>Withdrawal rate should not exceed 3.5% annually to handle sequence-of-returns risk.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-slate-400 mt-1.5">•</span>
              <span>Equity exposure should remain above 50% even post-retirement to fight inflation over 40 years.</span>
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">How the Numbers Work</h2>
          <div className="space-y-4 leading-relaxed">
            <p>
              To retire at 45 with Rs 1 lakh per month in today's rupees (which will need to rise with inflation over 40 years), you need approximately Rs 3.5-4 crore as corpus. This is based on a 3.5% safe withdrawal rate, which is more conservative than the traditional 4% rule because of the longer horizon.
            </p>
            <p>
              To run this calculation with your own inputs, use the Retirement at 45 in India: Corpus You Need and How to Get There calculator.
            </p>
          </div>

          <div className="mt-8 overflow-x-auto border border-slate-200 rounded-sm">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-[#315096] text-white">
                  <th className="p-4 font-bold text-sm w-1/3">Monthly Expenses Today</th>
                  <th className="p-4 font-bold text-sm w-1/3 text-center">Corpus Needed (40 yrs)</th>
                  <th className="p-4 font-bold text-sm w-1/3 text-right">Assumed Real Return</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">Rs 50,000</td>
                  <td className="p-4 border border-slate-200 text-center">Rs 1.23 Cr</td>
                  <td className="p-4 border border-slate-200 text-right">4</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">Rs 1.00 L</td>
                  <td className="p-4 border border-slate-200 text-center">Rs 2.46 Cr</td>
                  <td className="p-4 border border-slate-200 text-right">4</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">Rs 1.50 L</td>
                  <td className="p-4 border border-slate-200 text-center">Rs 3.69 Cr</td>
                  <td className="p-4 border border-slate-200 text-right">4</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">Rs 2.00 L</td>
                  <td className="p-4 border border-slate-200 text-center">Rs 4.91 Cr</td>
                  <td className="p-4 border border-slate-200 text-right">4</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">Rs 3.00 L</td>
                  <td className="p-4 border border-slate-200 text-center">Rs 7.37 Cr</td>
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
              Yes, but only if you save aggressively (45-55% of income) and invest in equity. You need roughly 30-40x your annual expenses as corpus.
            </p>
            <p>
              The 4% rule suggests you can safely withdraw 4% of your corpus in year one, then inflation-adjust each year. For a 40-year horizon, a more conservative 3.5% is prudent.
            </p>
            <p>
              No. Continue SIPs from your corpus's generated returns into equity. This keeps your portfolio growing through the long retirement phase.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-[#2b4c8a] font-medium text-lg mb-2">Is it realistic to retire at 45 in India?</h3>
              <p className="leading-relaxed">
                Yes, but only if you save aggressively (45-55% of income) and invest in equity. You need roughly 30-40x your annual expenses as corpus.
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-[#2b4c8a] font-medium text-lg mb-2">What is the 4% rule for retirement?</h3>
              <p className="leading-relaxed">
                The 4% rule suggests you can safely withdraw 4% of your corpus in year one, then inflation-adjust each year. For a 40-year horizon, a more conservative 3.5% is prudent.
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-[#2b4c8a] font-medium text-lg mb-2">Should I stop SIPs after retiring at 45?</h3>
              <p className="leading-relaxed">
                No. Continue SIPs from your corpus's generated returns into equity. This keeps your portfolio growing through the long retirement phase.
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
