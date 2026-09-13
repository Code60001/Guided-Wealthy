import React from 'react';
import { Link } from 'react-router-dom';

export default function HomeLoan20YearEmi() {
  return (
    <div className="bg-cream min-h-screen pt-36 md:pt-40 pb-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto mb-8 text-sm text-slate-500">
        <Link to="/" className="hover:text-[#2b4c8a] transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/resources" className="hover:text-[#2b4c8a] transition-colors">Resources</Link>
        <span className="mx-2">/</span>
        <span className="cursor-pointer hover:text-[#2b4c8a] transition-colors" onClick={() => window.history.back()}>Financial Planning Scenarios</span>
        <span className="mx-2">/</span>
        <span className="text-slate-800 font-medium">Home Loan EMI for 20 Years: India EMI Calculator Scenarios</span>
      </div>
      
      <article className="max-w-4xl mx-auto font-sans text-slate-700">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2b4c8a] mb-4">
            Home Loan EMI for 20 Years: India EMI Calculator Scenarios
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
              <span>A Rs 50 lakh home loan at 8.5% for 20 years has EMI of approximately Rs 43,391.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-slate-400 mt-1.5">•</span>
              <span>Shorter tenures save significant interest but raise the EMI burden.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-slate-400 mt-1.5">•</span>
              <span>Prepaying 1-2 EMIs per year can reduce 20-year loans to around 15 years.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-slate-400 mt-1.5">•</span>
              <span>Total interest on a 20-year loan is typically larger than the loan principal itself.</span>
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">How the Numbers Work</h2>
          <div className="space-y-4 leading-relaxed">
            <p>
              Two rules of thumb help: your EMI should not exceed 35-40% of your monthly take-home pay, and the total loan should not exceed 4-5 times your annual income. Going beyond these thresholds can leave you vulnerable to any income disruption.
            </p>
            <p>
              To run this calculation with your own inputs, use the Home Loan EMI for 20 Years: India EMI Calculator Scenarios calculator.
            </p>
          </div>

          <div className="mt-8 overflow-x-auto border border-slate-200 rounded-sm">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-[#315096] text-white">
                  <th className="p-4 font-bold text-sm w-1/5">Loan Amount</th>
                  <th className="p-4 font-bold text-sm w-1/5">10 years</th>
                  <th className="p-4 font-bold text-sm w-1/5">15 years</th>
                  <th className="p-4 font-bold text-sm w-1/5">20 years</th>
                  <th className="p-4 font-bold text-sm w-1/5">25 years</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">Rs 30.00 L</td>
                  <td className="p-4 border border-slate-200">Rs 37,196</td>
                  <td className="p-4 border border-slate-200">Rs 29,542</td>
                  <td className="p-4 border border-slate-200">Rs 26,035</td>
                  <td className="p-4 border border-slate-200">Rs 24,157</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">Rs 50.00 L</td>
                  <td className="p-4 border border-slate-200">Rs 61,993</td>
                  <td className="p-4 border border-slate-200">Rs 49,237</td>
                  <td className="p-4 border border-slate-200">Rs 43,391</td>
                  <td className="p-4 border border-slate-200">Rs 40,261</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">Rs 75.00 L</td>
                  <td className="p-4 border border-slate-200">Rs 92,989</td>
                  <td className="p-4 border border-slate-200">Rs 73,855</td>
                  <td className="p-4 border border-slate-200">Rs 65,087</td>
                  <td className="p-4 border border-slate-200">Rs 60,392</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">Rs 1.00 Cr</td>
                  <td className="p-4 border border-slate-200">Rs 1.24 L</td>
                  <td className="p-4 border border-slate-200">Rs 98,474</td>
                  <td className="p-4 border border-slate-200">Rs 86,782</td>
                  <td className="p-4 border border-slate-200">Rs 80,523</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">Rs 1.50 Cr</td>
                  <td className="p-4 border border-slate-200">Rs 1.86 L</td>
                  <td className="p-4 border border-slate-200">Rs 1.48 L</td>
                  <td className="p-4 border border-slate-200">Rs 1.30 L</td>
                  <td className="p-4 border border-slate-200">Rs 1.21 L</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">Rs 2.00 Cr</td>
                  <td className="p-4 border border-slate-200">Rs 2.48 L</td>
                  <td className="p-4 border border-slate-200">Rs 1.97 L</td>
                  <td className="p-4 border border-slate-200">Rs 1.74 L</td>
                  <td className="p-4 border border-slate-200">Rs 1.61 L</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Common Questions</h2>
          <div className="space-y-6 leading-relaxed">
            <p>
              At 8.5% interest, the EMI is approximately Rs 43,391. Total interest paid over 20 years is around Rs 54 lakh.
            </p>
            <p>
              If your expected equity returns (12%+) exceed your home loan rate (8.5%), investing usually wins. But tax benefits and peace of mind matter too.
            </p>
            <p>
              Most lenders offer up to 30 years. But longer tenures pay disproportionately more interest, so 20 years is often the sweet spot.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-[#2b4c8a] font-medium text-lg mb-2">What is the EMI on a Rs 50 lakh home loan for 20 years?</h3>
              <p className="leading-relaxed">
                At 8.5% interest, the EMI is approximately Rs 43,391. Total interest paid over 20 years is around Rs 54 lakh.
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-[#2b4c8a] font-medium text-lg mb-2">Is it better to prepay a home loan or invest extra money?</h3>
              <p className="leading-relaxed">
                If your expected equity returns (12%+) exceed your home loan rate (8.5%), investing usually wins. But tax benefits and peace of mind matter too.
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-[#2b4c8a] font-medium text-lg mb-2">What is the maximum home loan tenure in India?</h3>
              <p className="leading-relaxed">
                Most lenders offer up to 30 years. But longer tenures pay disproportionately more interest, so 20 years is often the sweet spot.
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
