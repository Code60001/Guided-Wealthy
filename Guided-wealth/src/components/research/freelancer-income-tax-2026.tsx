import React from 'react';
import { Link } from 'react-router-dom';

export default function FreelancerIncomeTax2026() {
  return (
    <div className="bg-cream min-h-screen pt-36 md:pt-40 pb-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto mb-8 text-sm text-slate-500">
        <Link to="/" className="hover:text-[#2b4c8a] transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/resources" className="hover:text-[#2b4c8a] transition-colors">Resources</Link>
        <span className="mx-2">/</span>
        <span className="cursor-pointer hover:text-[#2b4c8a] transition-colors" onClick={() => window.history.back()}>Financial Planning Scenarios</span>
        <span className="mx-2">/</span>
        <span className="text-slate-800 font-medium">Freelancer Income Tax in India: 2026 Calculator Guide</span>
      </div>
      
      <article className="max-w-4xl mx-auto font-sans text-slate-700">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2b4c8a] mb-4">
            Freelancer Income Tax in India: 2026 Calculator Guide
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
              <span>Section 44ADA lets professionals declare 50% of receipts as taxable income.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-slate-400 mt-1.5">•</span>
              <span>Under the new regime, freelancers earning up to Rs 12 lakh may pay zero tax after deductions.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-slate-400 mt-1.5">•</span>
              <span>Advance tax is due quarterly: missing it triggers interest under Section 234C.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-slate-400 mt-1.5">•</span>
              <span>GST registration is mandatory if annual turnover exceeds Rs 20 lakh.</span>
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">How the Numbers Work</h2>
          <div className="space-y-4 leading-relaxed">
            <p>
              The new tax regime is particularly beneficial for freelancers because of its wider slabs, making it attractive up to about Rs 75 lakh in receipts. Beyond that, complex deductions under the old regime sometimes tip the balance back. Professional tax advice is worth the cost at higher income levels.
            </p>
            <p>
              To run this calculation with your own inputs, use the Freelancer Income Tax in India: 2026 Calculator Guide calculator.
            </p>
          </div>

          <div className="mt-8 overflow-x-auto border border-slate-200 rounded-sm">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-[#315096] text-white">
                  <th className="p-4 font-bold text-sm w-1/4">Annual Receipts</th>
                  <th className="p-4 font-bold text-sm w-1/4">Deemed Profit (50%)</th>
                  <th className="p-4 font-bold text-sm w-1/4">Tax (New Regime)</th>
                  <th className="p-4 font-bold text-sm w-1/4">Tax (Old Regime, est.)</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">Rs 10 lakh</td>
                  <td className="p-4 border border-slate-200">Rs 5.00 L</td>
                  <td className="p-4 border border-slate-200">Rs 0</td>
                  <td className="p-4 border border-slate-200">Rs 12,500</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">Rs 15 lakh</td>
                  <td className="p-4 border border-slate-200">Rs 7.50 L</td>
                  <td className="p-4 border border-slate-200">Rs 26,000</td>
                  <td className="p-4 border border-slate-200">Rs 62,500</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">Rs 20 lakh</td>
                  <td className="p-4 border border-slate-200">Rs 10.00 L</td>
                  <td className="p-4 border border-slate-200">Rs 54,000</td>
                  <td className="p-4 border border-slate-200">Rs 1.12 L</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">Rs 30 lakh</td>
                  <td className="p-4 border border-slate-200">Rs 15.00 L</td>
                  <td className="p-4 border border-slate-200">Rs 1.50 L</td>
                  <td className="p-4 border border-slate-200">Rs 2.62 L</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">Rs 50 lakh</td>
                  <td className="p-4 border border-slate-200">Rs 25.00 L</td>
                  <td className="p-4 border border-slate-200">Rs 3.90 L</td>
                  <td className="p-4 border border-slate-200">Rs 5.62 L</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">Rs 75 lakh (44ADA limit)</td>
                  <td className="p-4 border border-slate-200">Rs 37.50 L</td>
                  <td className="p-4 border border-slate-200">Rs 8.57 L</td>
                  <td className="p-4 border border-slate-200">Rs 11.00 L</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Common Questions</h2>
          <div className="space-y-6 leading-relaxed">
            <p>
              Section 44ADA lets specified professionals (consultants, architects, doctors, etc.) with gross receipts up to Rs 75 lakh declare 50% as taxable profit without maintaining books.
            </p>
            <p>
              For most freelancers with receipts above Rs 15 lakh, the new regime is more favourable because of the wider slabs and no-deduction simplicity.
            </p>
            <p>
              Advance tax is due in four installments: 15 June (15%), 15 September (45%), 15 December (75%), and 15 March (100%).
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-[#2b4c8a] font-medium text-lg mb-2">What is Section 44ADA for freelancers?</h3>
              <p className="leading-relaxed">
                Section 44ADA lets specified professionals (consultants, architects, doctors, etc.) with gross receipts up to Rs 75 lakh declare 50% as taxable profit without maintaining books.
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-[#2b4c8a] font-medium text-lg mb-2">Should freelancers opt for new or old tax regime?</h3>
              <p className="leading-relaxed">
                For most freelancers with receipts above Rs 15 lakh, the new regime is more favourable because of the wider slabs and no-deduction simplicity.
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-[#2b4c8a] font-medium text-lg mb-2">When do freelancers pay advance tax?</h3>
              <p className="leading-relaxed">
                Advance tax is due in four installments: 15 June (15%), 15 September (45%), 15 December (75%), and 15 March (100%).
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
