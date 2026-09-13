import React, { useState, useEffect } from 'react';
import { Share2, ChevronDown, X, Plus } from 'lucide-react';

interface Investment {
  id: string;
  amount: number;
  rate: number;
}

export default function WeightedAverageReturns() {
  const [years, setYears] = useState<number>(10);
  const [investments, setInvestments] = useState<Investment[]>([
    { id: '1', amount: 10000, rate: 12 },
    { id: '2', amount: 10000, rate: 12 },
  ]);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  
  const [totalInvested, setTotalInvested] = useState<number>(0);
  const [weightedReturn, setWeightedReturn] = useState<number>(0);
  const [projectedValue, setProjectedValue] = useState<number>(0);

  useEffect(() => {
    let totalAmt = 0;
    let sumProduct = 0;
    
    investments.forEach(inv => {
      totalAmt += inv.amount;
      sumProduct += inv.amount * inv.rate;
    });
    
    const wReturn = totalAmt > 0 ? sumProduct / totalAmt : 0;
    
    setTotalInvested(totalAmt);
    setWeightedReturn(wReturn);
    
    if (totalAmt > 0 && years > 0) {
      setProjectedValue(totalAmt * Math.pow(1 + wReturn / 100, years));
    } else {
      setProjectedValue(totalAmt);
    }
  }, [investments, years]);

  const addInvestment = () => {
    setInvestments([
      ...investments,
      { id: Date.now().toString(), amount: 10000, rate: 12 }
    ]);
  };

  const removeInvestment = (id: string) => {
    if (investments.length > 1) {
      setInvestments(investments.filter(inv => inv.id !== id));
    }
  };

  const updateInvestment = (id: string, field: 'amount' | 'rate', value: number) => {
    setInvestments(investments.map(inv => 
      inv.id === id ? { ...inv, [field]: value } : inv
    ));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };
  const getSliderStyle = (value: number, min: number | string, max: number | string) => {
    const minNum = typeof min === 'string' ? parseFloat(min) : min;
    const maxNum = typeof max === 'string' ? parseFloat(max) : max;
    const percentage = Math.min(100, Math.max(0, ((value - minNum) / (maxNum - minNum)) * 100));
    return {
      background: `linear-gradient(to right, #3b82f6 ${percentage}%, #e2e8f0 ${percentage}%)`
    };
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      <div className="bg-white pt-32 pb-10 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-[#113262] mb-4">Weighted Returns Calculator</h1>
        <p className="text-slate-600 text-base">Calculate portfolio returns based on investment weights</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex flex-col lg:flex-row gap-8 mb-16">
          <div className="flex-1 space-y-6">
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <h2 className="text-xl font-bold text-[#113262] mb-4">Investment Horizon</h2>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Years</label>
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                />
                <div>
                  <input
                    type="range"
                    min="1"
                    max="40"
                    step="1"
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                  
                      style={getSliderStyle(years, "1", "40")}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#3b82f6] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#3b82f6] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
                    />
                  <div className="flex justify-between text-xs text-slate-400 mt-1.5 font-medium">
                    <span>1 Year</span>
                    <span>40 Years</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {investments.map((inv, index) => (
                <div key={inv.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 relative group">
                  {investments.length > 1 && (
                    <button 
                      onClick={() => removeInvestment(inv.id)}
                      className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors"
                      title="Remove Investment"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Investment Amount</label>
                      <input
                        type="number"
                        value={inv.amount}
                        onChange={(e) => updateInvestment(inv.id, 'amount', Number(e.target.value))}
                      />
                      <div>
                        <input
                          type="range"
                          min="1000"
                          max="10000000"
                          step="1000"
                          value={inv.amount}
                          onChange={(e) => updateInvestment(inv.id, 'amount', Number(e.target.value))}
                        
                      style={getSliderStyle(inv.amount, "1000", "10000000")}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#3b82f6] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#3b82f6] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
                    />
                        <div className="flex justify-between text-xs text-slate-400 mt-1.5 font-medium">
                          <span>₹1K</span>
                          <span>₹1Cr</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Expected Returns (%)</label>
                      <input
                        type="number"
                        value={inv.rate}
                        onChange={(e) => updateInvestment(inv.id, 'rate', Number(e.target.value))}
                      />
                      <div>
                        <input
                          type="range"
                          min="0"
                          max="30"
                          step="0.1"
                          value={inv.rate}
                          onChange={(e) => updateInvestment(inv.id, 'rate', Number(e.target.value))}
                        
                      style={getSliderStyle(inv.rate, "0", "30")}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#3b82f6] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#3b82f6] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
                    />
                        <div className="flex justify-between text-xs text-slate-400 mt-1.5 font-medium">
                          <span>0%</span>
                          <span>30%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={addInvestment}
              className="w-full py-4 border-2 border-dashed border-slate-300 rounded-2xl text-slate-500 font-medium hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" /> Add Investment
            </button>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <button 
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full p-6 flex justify-between items-center text-left hover:bg-slate-50 transition-colors"
              >
                <h2 className="text-lg font-bold text-slate-900">Advanced Settings</h2>
                <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
              </button>
              
              {showAdvanced && (
                <div className="p-6 pt-0 border-t border-slate-100">
                  <p className="text-sm text-slate-600">Advanced settings for inflation adjustment or taxation can be added here.</p>
                </div>
              )}
            </div>

          </div>

          <div className="w-full lg:w-[400px]">
            <div className="bg-[#1e2a4f] rounded-2xl shadow-lg p-5 text-white h-full flex flex-col">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold">Portfolio Returns</h2>
                <button className="text-slate-300 hover:text-white transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              <div className="text-center mb-10">
                <div className="text-4xl font-bold mb-1">{formatCurrency(projectedValue)}</div>
                <div className="text-slate-300 text-sm">Projected Value</div>
              </div>

              <div className="flex-1">
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-600">
                    <span className="text-slate-300 text-sm">Weighted Returns</span>
                    <span className="font-semibold">{weightedReturn.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-slate-600">
                    <span className="text-slate-300 text-sm">Total Invested</span>
                    <span className="font-semibold">{formatCurrency(totalInvested)}</span>
                  </div>
                </div>
              </div>

              <button className="w-full py-2.5 px-4 bg-[#eaa33a] hover:bg-[#d4902d] text-white font-semibold rounded-xl transition-colors mt-6 flex justify-center items-center gap-2">
                Portfolio Review <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-4xl space-y-12 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-[#113262] mb-4">Understanding Weighted Average Returns</h2>
            <p className="text-sm mb-6">
              Weighted average returns provide a comprehensive method to evaluate the performance of an investment portfolio by considering the relative importance of each investment.
            </p>

            <h3 className="text-lg font-bold text-[#113262] mb-4">What Are Weighted Average Returns?</h3>
            <p className="text-sm mb-6">
              A weighted average return calculates the overall portfolio performance by assigning different weights to investments based on their market value or capital allocation. This approach recognizes that not all investments contribute equally to the portfolio's performance.
            </p>

            <h3 className="text-lg font-bold text-[#113262] mb-4">Calculation Method</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm mb-6">
              <li><span className="font-semibold text-slate-900">Weighting Process:</span> Each investment is assigned a weight proportional to its size in the total portfolio.</li>
              <li><span className="font-semibold text-slate-900">Return Calculation:</span> Multiply each investment's return by its specific weight.</li>
              <li><span className="font-semibold text-slate-900">Aggregation:</span> Sum the weighted returns to determine the overall portfolio performance.</li>
            </ul>

            <h3 className="text-lg font-bold text-[#113262] mb-4">Benefits of Weighted Average Returns Analysis</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm mb-6">
              <li>Provides a more accurate representation of portfolio performance</li>
              <li>Highlights the impact of larger investments on overall returns</li>
              <li>Enables more informed investment decision-making</li>
              <li>Allows comparison of performance across different investment periods</li>
              <li>Helps in understanding portfolio diversification and risk management</li>
            </ul>
            
            <div className="bg-white border-l-4 border-blue-600 p-4 text-sm italic shadow-sm">
              Use this calculator to gain insights into your investment portfolio's true performance by considering the relative significance of each investment.
            </div>
          </section>

          <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-slate-200 mt-8">
            <section>
              <h2 className="text-xl font-bold text-[#113262] mb-4">Why Weighted Returns Matter</h2>
              <div className="bg-white p-6 rounded-xl border border-slate-100 h-full shadow-sm">
                <p className="text-sm text-slate-700">
                  If you invested Rs 10 lakh in Fund A and Rs 1 lakh in Fund B, a simple average of their returns would be misleading. Weighted returns reflect the actual impact on your total portfolio by weighting each fund's return by the amount invested. This is the correct way to measure portfolio performance.
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-[#113262] mb-8">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">What are weighted returns?</h3>
                  <p className="text-sm text-slate-600">Weighted returns account for the different amounts invested at different times. Unlike simple average returns, weighted returns give more importance to larger investments, providing a more accurate picture of your overall portfolio performance.</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
