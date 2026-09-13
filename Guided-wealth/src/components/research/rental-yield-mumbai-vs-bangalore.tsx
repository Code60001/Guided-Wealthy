import React from 'react';
import { Link } from 'react-router-dom';

export default function RentalYieldMumbaiVsBangalore() {
  return (
    <div className="bg-cream min-h-screen pt-36 md:pt-40 pb-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto mb-8 text-sm text-slate-500">
        <Link to="/" className="hover:text-[#2b4c8a] transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/resources" className="hover:text-[#2b4c8a] transition-colors">Resources</Link>
        <span className="mx-2">/</span>
        <span className="cursor-pointer hover:text-[#2b4c8a] transition-colors" onClick={() => window.history.back()}>Financial Planning Scenarios</span>
        <span className="mx-2">/</span>
        <span className="text-slate-800 font-medium">Rental Yield Mumbai vs Bangalore: City-Wise Comparison</span>
      </div>
      
      <article className="max-w-4xl mx-auto font-sans text-slate-700">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2b4c8a] mb-4">
            Rental Yield Mumbai vs Bangalore: City-Wise Comparison
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
              <span>Indian metros typically offer gross rental yields of 2-4%, far lower than the 6-8% global average.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-slate-400 mt-1.5">•</span>
              <span>Bangalore and Hyderabad offer slightly higher yields than Mumbai and Delhi.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-slate-400 mt-1.5">•</span>
              <span>Commercial property typically yields 7-9%, much higher than residential.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-slate-400 mt-1.5">•</span>
              <span>Rental yield alone is not enough: property appreciation and tax benefits matter too.</span>
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">How the Numbers Work</h2>
          <div className="space-y-4 leading-relaxed">
            <p>
              Low rental yields in Indian metros are partly due to speculative demand pushing property prices faster than rent growth. For real estate investors, commercial property typically offers 7-9% yields: far better than residential. But commercial carries higher vacancy risk and needs larger ticket sizes.
            </p>
            <p>
              To run this calculation with your own inputs, use the Rental Yield Mumbai vs Bangalore: City-Wise Comparison calculator.
            </p>
          </div>

          <div className="mt-8 overflow-x-auto border border-slate-200 rounded-sm">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-[#315096] text-white">
                  <th className="p-4 font-bold text-sm w-1/4">City</th>
                  <th className="p-4 font-bold text-sm w-1/4 text-center">Typical Monthly Rent</th>
                  <th className="p-4 font-bold text-sm w-1/4 text-center">Property Value</th>
                  <th className="p-4 font-bold text-sm w-1/4 text-right">Gross Yield (%)</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">Mumbai (2BHK, Andheri)</td>
                  <td className="p-4 border border-slate-200 text-center">Rs 60,000</td>
                  <td className="p-4 border border-slate-200 text-center">Rs 2.50 Cr</td>
                  <td className="p-4 border border-slate-200 text-right">2.88</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">Bangalore (2BHK, HSR)</td>
                  <td className="p-4 border border-slate-200 text-center">Rs 45,000</td>
                  <td className="p-4 border border-slate-200 text-center">Rs 1.50 Cr</td>
                  <td className="p-4 border border-slate-200 text-right">3.6</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">Delhi (2BHK, Dwarka)</td>
                  <td className="p-4 border border-slate-200 text-center">Rs 40,000</td>
                  <td className="p-4 border border-slate-200 text-center">Rs 1.40 Cr</td>
                  <td className="p-4 border border-slate-200 text-right">3.43</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">Hyderabad (2BHK, Gachibowli)</td>
                  <td className="p-4 border border-slate-200 text-center">Rs 35,000</td>
                  <td className="p-4 border border-slate-200 text-center">Rs 1.20 Cr</td>
                  <td className="p-4 border border-slate-200 text-right">3.5</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border border-slate-200">Pune (2BHK, Baner)</td>
                  <td className="p-4 border border-slate-200 text-center">Rs 30,000</td>
                  <td className="p-4 border border-slate-200 text-center">Rs 1.10 Cr</td>
                  <td className="p-4 border border-slate-200 text-right">3.27</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Common Questions</h2>
          <div className="space-y-6 leading-relaxed">
            <p>
              Gross rental yields of 3.5% or higher are considered good for Indian residential property. Commercial property typically offers 7-9%.
            </p>
            <p>
              Property prices have risen faster than rents due to speculative demand, making yields compressed. Until rents catch up, yields will remain around 2-4% in most metros.
            </p>
            <p>
              Commercial offers higher rental yields but has longer vacancy periods and higher ticket sizes. Residential is easier to finance and sell but yields less.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-[#2b4c8a] font-medium text-lg mb-2">What is a good rental yield in India?</h3>
              <p className="leading-relaxed">
                Gross rental yields of 3.5% or higher are considered good for Indian residential property. Commercial property typically offers 7-9%.
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-[#2b4c8a] font-medium text-lg mb-2">Why are Indian rental yields so low?</h3>
              <p className="leading-relaxed">
                Property prices have risen faster than rents due to speculative demand, making yields compressed. Until rents catch up, yields will remain around 2-4% in most metros.
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-[#2b4c8a] font-medium text-lg mb-2">Is residential or commercial real estate a better investment?</h3>
              <p className="leading-relaxed">
                Commercial offers higher rental yields but has longer vacancy periods and higher ticket sizes. Residential is easier to finance and sell but yields less.
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
