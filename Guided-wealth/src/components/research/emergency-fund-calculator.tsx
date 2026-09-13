import React from 'react';
import { Link } from 'react-router-dom';

export default function EmergencyFundCalculator() {
  return (
    <div className="bg-cream min-h-screen pt-36 md:pt-40 pb-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto mb-8 text-sm text-slate-500">
        <Link to="/" className="hover:text-[#2b4c8a] transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/resources" className="hover:text-[#2b4c8a] transition-colors">Resources</Link>
        <span className="mx-2">/</span>
        <span className="cursor-pointer hover:text-[#2b4c8a] transition-colors" onClick={() => window.history.back()}>Financial Planning Scenarios</span>
        <span className="mx-2">/</span>
        <span className="text-slate-800 font-medium">Emergency Fund Calculator India: How Much You Should Save</span>
      </div>
      
      <article className="max-w-4xl mx-auto font-sans text-slate-700">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2b4c8a] mb-4">
            Emergency Fund Calculator India: How Much You Should Save
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
              <span>A typical emergency fund should cover 6 months of expenses for salaried employees.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-slate-400 mt-1.5">•</span>
              <span>Self-employed and single-income households should aim for 9-12 months.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-slate-400 mt-1.5">•</span>
              <span>Keep emergency funds in liquid instruments: savings account, liquid mutual funds, or sweep FDs.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-slate-400 mt-1.5">•</span>
              <span>Review your emergency fund annually as expenses and life situation change.</span>
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">How the Numbers Work</h2>
          <div className="space-y-4 leading-relaxed">
            <p>
              The right size depends on your job stability and number of income sources. A dual-income household with stable jobs can get away with 3-4 months. A single-income self-employed person should aim for 9-12 months. Update the fund annually: your expenses rise with lifestyle.
            </p>
            <p>
              To run this calculation with your own inputs, use the Emergency Fund Calculator India: How Much You Should Save calculator.
            </p>
          </div>

          <div className="mt-8 overflow-x-auto border border-slate-200 rounded-sm">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-[#315096] text-white">
                  <th className="p-4 font-bold text-sm w-1/5">Monthly Expenses</th>
                  <th className="p-4 font-bold text-sm w-1/5">3 months</th>
                  <th className="p-4 font-bold text-sm w-1/5">6 months</th>
                  <th className="p-4 font-bold text-sm w-1/5">9 months</th>
                  <th className="p-4 font-bold text-sm w-1/5">12 months</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">Rs 40,000</td>
                  <td className="p-4 border border-slate-200">Rs 1.20 L</td>
                  <td className="p-4 border border-slate-200">Rs 2.40 L</td>
                  <td className="p-4 border border-slate-200">Rs 3.60 L</td>
                  <td className="p-4 border border-slate-200">Rs 4.80 L</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">Rs 75,000</td>
                  <td className="p-4 border border-slate-200">Rs 2.25 L</td>
                  <td className="p-4 border border-slate-200">Rs 4.50 L</td>
                  <td className="p-4 border border-slate-200">Rs 6.75 L</td>
                  <td className="p-4 border border-slate-200">Rs 9.00 L</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">Rs 1.00 L</td>
                  <td className="p-4 border border-slate-200">Rs 3.00 L</td>
                  <td className="p-4 border border-slate-200">Rs 6.00 L</td>
                  <td className="p-4 border border-slate-200">Rs 9.00 L</td>
                  <td className="p-4 border border-slate-200">Rs 12.00 L</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">Rs 1.50 L</td>
                  <td className="p-4 border border-slate-200">Rs 4.50 L</td>
                  <td className="p-4 border border-slate-200">Rs 9.00 L</td>
                  <td className="p-4 border border-slate-200">Rs 13.50 L</td>
                  <td className="p-4 border border-slate-200">Rs 18.00 L</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">Rs 2.00 L</td>
                  <td className="p-4 border border-slate-200">Rs 6.00 L</td>
                  <td className="p-4 border border-slate-200">Rs 12.00 L</td>
                  <td className="p-4 border border-slate-200">Rs 18.00 L</td>
                  <td className="p-4 border border-slate-200">Rs 24.00 L</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Common Questions</h2>
          <div className="space-y-6 leading-relaxed">
            <p>
              For most salaried households, 6 months of expenses is adequate. If you are self-employed or single-income, go for 9-12 months.
            </p>
            <p>
              A mix of savings account (1 month), sweep FD (2 months), and liquid mutual fund (3+ months) works well. Balance liquidity and returns.
            </p>
            <p>
              No. Emergency funds need stability. Keep them in debt instruments and top up from regular savings if they get deployed.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-[#2b4c8a] font-medium text-lg mb-2">How much emergency fund do I need in India?</h3>
              <p className="leading-relaxed">
                For most salaried households, 6 months of expenses is adequate. If you are self-employed or single-income, go for 9-12 months.
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-[#2b4c8a] font-medium text-lg mb-2">Where should I keep my emergency fund?</h3>
              <p className="leading-relaxed">
                A mix of savings account (1 month), sweep FD (2 months), and liquid mutual fund (3+ months) works well. Balance liquidity and returns.
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-[#2b4c8a] font-medium text-lg mb-2">Should I invest my emergency fund in equity?</h3>
              <p className="leading-relaxed">
                No. Emergency funds need stability. Keep them in debt instruments and top up from regular savings if they get deployed.
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
