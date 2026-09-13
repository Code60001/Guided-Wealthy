import React from 'react';
import { Link } from 'react-router-dom';

export default function SipForChildEducation() {
  return (
    <div className="bg-cream min-h-screen pt-36 md:pt-40 pb-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto mb-8 text-sm text-slate-500">
        <Link to="/" className="hover:text-[#2b4c8a] transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/resources" className="hover:text-[#2b4c8a] transition-colors">Resources</Link>
        <span className="mx-2">/</span>
        <span className="cursor-pointer hover:text-[#2b4c8a] transition-colors" onClick={() => window.history.back()}>Financial Planning Scenarios</span>
        <span className="mx-2">/</span>
        <span className="text-slate-800 font-medium">SIP Plan for Your Child's Higher Education in India</span>
      </div>
      <article className="max-w-4xl mx-auto font-sans text-slate-700">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#2b4c8a] mb-4">
          SIP Plan for Your Child's Higher Education in India
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
            <span>Engineering or medical education in India typically costs Rs 25-50 lakh including hostel and fees.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-3 text-slate-400 mt-1.5">•</span>
            <span>Overseas undergraduate courses can cost Rs 1.5-3 crore depending on country and course.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-3 text-slate-400 mt-1.5">•</span>
            <span>Starting when the child is born gives you 17-18 years of compounding: the earlier the better.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-3 text-slate-400 mt-1.5">•</span>
            <span>Inflation for education has historically run at 8-10%, higher than general CPI.</span>
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-slate-800 mb-4">How the Numbers Work</h2>
        <div className="space-y-4 leading-relaxed">
          <p>
            Equity mutual funds are well-suited for this goal because education inflation has historically run at 8-10% per year: above general CPI. A debt-only plan (like PPF) typically falls short unless contributions are very aggressive. A balanced portfolio with 70% equity and 30% debt offers a reasonable risk-return trade-off for this goal.
          </p>
          <p>
            To run this calculation with your own inputs, use the SIP Plan for Your Child's Higher Education in India calculator.
          </p>
        </div>

        <div className="mt-8 overflow-x-auto border border-slate-200 rounded-sm">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-[#315096] text-white">
                <th className="p-4 font-bold text-sm w-1/3">Target Corpus</th>
                <th className="p-4 font-bold text-sm">10 years</th>
                <th className="p-4 font-bold text-sm">15 years</th>
                <th className="p-4 font-bold text-sm">18 years</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="bg-white hover:bg-slate-50 transition-colors">
                <td className="p-4 border border-slate-200">Rs 25 lakh (engineering)</td>
                <td className="p-4 border border-slate-200">Rs 11,521</td>
                <td className="p-4 border border-slate-200">Rs 5,498</td>
                <td className="p-4 border border-slate-200">Rs 3,710</td>
              </tr>
              <tr className="bg-white hover:bg-slate-50 transition-colors">
                <td className="p-4 border border-slate-200">Rs 50 lakh (medical)</td>
                <td className="p-4 border border-slate-200">Rs 23,042</td>
                <td className="p-4 border border-slate-200">Rs 10,997</td>
                <td className="p-4 border border-slate-200">Rs 7,419</td>
              </tr>
              <tr className="bg-white hover:bg-slate-50 transition-colors">
                <td className="p-4 border border-slate-200">Rs 1 crore (overseas UG)</td>
                <td className="p-4 border border-slate-200">Rs 46,083</td>
                <td className="p-4 border border-slate-200">Rs 21,993</td>
                <td className="p-4 border border-slate-200">Rs 14,838</td>
              </tr>
              <tr className="bg-white hover:bg-slate-50 transition-colors">
                <td className="p-4 border border-slate-200">Rs 2 crore (overseas PG)</td>
                <td className="p-4 border border-slate-200">Rs 92,167</td>
                <td className="p-4 border border-slate-200">Rs 43,986</td>
                <td className="p-4 border border-slate-200">Rs 29,677</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-slate-800 mb-4">Common Questions</h2>
        <div className="space-y-6 leading-relaxed">
          <p>
            A private engineering college (like VIT or BITS) costs Rs 12-20 lakh for the four years. Top-tier colleges like IIT are subsidised but hostel, mess, and living adds around Rs 5-7 lakh.
          </p>
          <p>
            For a four-year US undergraduate course costing Rs 2 crore, a SIP of around Rs 50,000 per month over 15 years at 11% returns gets you there. Start early and stay disciplined.
          </p>
          <p>
            For horizons beyond 7-8 years, equity mutual funds typically outperform PPF. For the last 2-3 years before the goal, shift to safer debt instruments.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-slate-800 mb-6">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          <div className="bg-slate-50 rounded-lg p-6">
            <h3 className="text-[#2b4c8a] font-medium text-lg mb-2">How much does engineering education cost in India in 2026?</h3>
            <p className="leading-relaxed">
              A private engineering college (like VIT or BITS) costs Rs 12-20 lakh for the four years. Top-tier colleges like IIT are subsidised but hostel, mess, and living adds around Rs 5-7 lakh.
            </p>
          </div>

          <div className="bg-slate-50 rounded-lg p-6">
            <h3 className="text-[#2b4c8a] font-medium text-lg mb-2">Is an SIP enough to fund overseas education?</h3>
            <p className="leading-relaxed">
              For a four-year US undergraduate course costing Rs 2 crore, a SIP of around Rs 50,000 per month over 15 years at 11% returns gets you there. Start early and stay disciplined.
            </p>
          </div>

          <div className="bg-slate-50 rounded-lg p-6">
            <h3 className="text-[#2b4c8a] font-medium text-lg mb-2">Should I use PPF or equity mutual funds for child's education?</h3>
            <p className="leading-relaxed">
              For horizons beyond 7-8 years, equity mutual funds typically outperform PPF. For the last 2-3 years before the goal, shift to safer debt instruments.
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
