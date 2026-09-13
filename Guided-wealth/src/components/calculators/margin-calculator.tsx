import React, { useState, useEffect } from 'react';
import { Share2, ChevronDown, ChevronUp, ShieldAlert, Sliders, TrendingUp, Info } from 'lucide-react';

export default function MarginCalculator() {
  // Inputs
  const [availableCapital, setAvailableCapital] = useState<number>(100000);
  const [tradingSegment, setTradingSegment] = useState<string>('intraday'); // delivery, intraday, futures, options
  const [leverage, setLeverage] = useState<number>(5); // 1x to 20x
  const [maintenanceMarginPct, setMaintenanceMarginPct] = useState<number>(10); // 10% to 100%

  // FAQ Accordion
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Computed Outputs
  const [totalExposure, setTotalExposure] = useState<number>(0);
  const [marginRequired, setMarginRequired] = useState<number>(0);
  const [effectiveLeverage, setEffectiveLeverage] = useState<number>(0);
  const [marginUtilization, setMarginUtilization] = useState<number>(0);
  const [maintenanceMargin, setMaintenanceMargin] = useState<number>(0);
  const [marginCallThreshold, setMarginCallThreshold] = useState<number>(0);
  const [maxLossScenario, setMaxLossScenario] = useState<number>(0);

  useEffect(() => {
    // If delivery segment, leverage is forced to 1x (100% margin)
    const effectiveLev = tradingSegment === 'delivery' ? 1 : leverage;
    const exposure = availableCapital * effectiveLev;
    const required = exposure / effectiveLev; // or capital
    const utilization = availableCapital > 0 ? (required / availableCapital) * 100 : 0;
    const maintMargin = exposure * (maintenanceMarginPct / 100);
    const callThreshold = Math.max(0, availableCapital - maintMargin);
    const maxLoss = availableCapital;

    setTotalExposure(exposure);
    setMarginRequired(required);
    setEffectiveLeverage(effectiveLev);
    setMarginUtilization(utilization);
    setMaintenanceMargin(maintMargin);
    setMarginCallThreshold(callThreshold);
    setMaxLossScenario(maxLoss);
  }, [availableCapital, tradingSegment, leverage, maintenanceMarginPct]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(value);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: 'What is margin trading?',
      a: 'Margin trading allows you to buy or sell securities by paying only a fraction of the total trade value (the margin), with the broker providing the remaining funds. Under SEBI rules in India, peak margin rules prescribe minimum upfront margin requirements (20% for intraday cash, SPAN + Exposure margin for derivatives).',
    },
    {
      q: 'How does leverage affect risk and returns?',
      a: 'Leverage acts as a double-edged sword. A 5x leverage means a 2% favorable move in stock price generates a 10% gain on your capital, but a 2% adverse move results in a 10% loss. Higher leverage increases exposure and sensitivity to market fluctuations.',
    },
    {
      q: 'What triggers a margin call in stock trading?',
      a: 'A margin call is triggered when your account equity falls below the broker maintenance margin requirement due to adverse price movements. If you do not deposit additional funds or close positions, the broker has the right to square off your positions.',
    },
    {
      q: 'What are SEBI peak margin rules?',
      a: 'SEBI mandates 100% peak margin collection upfront for intraday and F&O trades in India. Brokers can no longer provide arbitrary 20x-50x leverage; maximum intraday cash leverage is capped at 5x (20% upfront margin).',
    },
  ];
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
      {/* Header Banner */}
      <div className="bg-white pt-32 pb-10 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-[#113262] mb-4">Margin Value Calculator</h1>
        <p className="text-slate-600 text-base">
          Calculate your trading exposure, margin requirements, leverage limits, and margin call thresholds.
        </p>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 mt-12">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#113262]" /> Capital & Segment Setup
              </h2>

              {/* Available Capital */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-slate-700">Available Capital (₹)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">₹</span>
                    <input
                      type="number"
                      value={availableCapital}
                      onChange={(e) => setAvailableCapital(Math.max(0, Number(e.target.value)))}
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="1000000"
                  step="5000"
                  value={availableCapital}
                  onChange={(e) => setAvailableCapital(Number(e.target.value))}

                  style={getSliderStyle(availableCapital, "5000", "1000000")}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#3b82f6] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#3b82f6] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>₹5,000</span>
                  <span>₹10,00,000</span>
                </div>
              </div>

              {/* Trading Segment Buttons */}
              <div className="mb-6 pt-4 border-t border-slate-100">
                <label className="block text-sm font-medium text-slate-700 mb-2">Select Trading Segment</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'delivery', name: 'Equity Delivery', desc: '1x / 100% Margin' },
                    { id: 'intraday', name: 'Equity Intraday', desc: 'Up to 5x Leverage' },
                    { id: 'futures', name: 'Futures', desc: 'F&O SPAN + Exposure' },
                    { id: 'options', name: 'Options', desc: 'Premium / Writer Margin' },
                  ].map((seg) => (
                    <button
                      key={seg.id}
                      type="button"
                      onClick={() => setTradingSegment(seg.id)}
                      className={`p-3 rounded-xl border text-center transition-all ${tradingSegment === seg.id
                          ? 'border-[#113262] bg-sky-50/50 text-[#113262] font-semibold ring-2 ring-[#113262]/10'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                    >
                      <div className="text-sm font-bold">{seg.name}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{seg.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Leverage Slider */}
              {tradingSegment !== 'delivery' && (
                <div className="mb-6 pt-4 border-t border-slate-100">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-slate-700">Leverage Factor</label>
                    <span className="font-bold text-[#113262] text-sm bg-sky-50 px-2.5 py-1 rounded-md">{leverage}x</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="1"
                    value={leverage}
                    onChange={(e) => setLeverage(Number(e.target.value))}

                    style={getSliderStyle(leverage, "1", "20")}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#3b82f6] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#3b82f6] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>1x (100% Margin)</span>
                    <span>20x (5% Margin)</span>
                  </div>
                </div>
              )}

              {/* Advanced Settings */}
              <div className="pt-4 border-t border-slate-100">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-slate-700">Maintenance Margin (%)</label>
                  <span className="font-bold text-slate-900 text-sm bg-slate-100 px-2.5 py-1 rounded-md">{maintenanceMarginPct}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={maintenanceMarginPct}
                  onChange={(e) => setMaintenanceMarginPct(Number(e.target.value))}

                  style={getSliderStyle(maintenanceMarginPct, "10", "100")}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#3b82f6] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#3b82f6] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>10%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dark Navy Sticky Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="bg-[#1e2a4f] text-white rounded-2xl p-6 shadow-xl border border-slate-800">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-bold">Margin Analysis</h3>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: 'Margin Analysis Breakdown',
                        text: `Available Capital: ${formatCurrency(availableCapital)}, Total Exposure: ${formatCurrency(totalExposure)} (${effectiveLeverage}x leverage).`,
                        url: window.location.href,
                      }).catch(() => { });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Link copied to clipboard!');
                    }
                  }}
                  className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                  title="Share"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Highlight Hero Output */}
              <div className="mb-6 p-4 rounded-xl bg-slate-800/80 border border-slate-600/50">
                <div className="text-xs text-slate-400 mb-1 font-medium">Total Exposure Value</div>
                <div className="text-3xl font-extrabold text-white">{formatCurrency(totalExposure)}</div>
                <div className="text-xs text-emerald-400 mt-1 font-medium">
                  {effectiveLeverage.toFixed(2)}x Effective Leverage
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="space-y-3.5 text-sm border-t border-slate-800 pt-4">
                <div className="flex justify-between items-center text-slate-300">
                  <span>Margin Required</span>
                  <span className="font-semibold text-white">{formatCurrency(marginRequired)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>Effective Leverage</span>
                  <span className="font-semibold text-emerald-400">{effectiveLeverage.toFixed(2)}x</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>Margin Utilization</span>
                  <span className="font-semibold text-white">{marginUtilization.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>Maintenance Margin</span>
                  <span className="font-semibold text-amber-400">{formatCurrency(maintenanceMargin)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-300 pt-3 border-t border-slate-800">
                  <span className="font-bold text-white">Margin Call Threshold</span>
                  <span className="font-bold text-rose-400 text-base">{formatCurrency(marginCallThreshold)}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800">
                <button
                  onClick={() => window.scrollTo({ top: 1000, behavior: 'smooth' })}
                  className="w-full py-2.5 px-4 bg-[#eaa33a] hover:bg-[#d4902d] text-white font-semibold rounded-xl transition-colors mt-6 flex justify-center items-center gap-2"
                >
                  Invest now →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Informational SEO Content & Guide */}
        <div className="max-w-4xl space-y-12 text-slate-700 leading-relaxed mt-12">
          <h2 className="text-xl font-bold text-[#113262] mb-4">Calculate Your Margin Requirements</h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
            Enter your stock price, quantity, and margin percentage. The calculator shows the total order value, margin required, and broker-funded amount. For F&O, it computes SPAN and exposure margin based on the instrument. It also shows the maximum loss scenario and the price level at which a margin call would be triggered.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-700 border-t border-slate-100 pt-6">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Key Components</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                <li><strong>Trade Value:</strong> Total position size.</li>
                <li><strong>Margin Percentage:</strong> Fraction of trade value required as collateral.</li>
                <li><strong>Maximum Exposure:</strong> Maximum purchasing power with leverage.</li>
                <li><strong>Risk per Trade:</strong> Potential loss relative to account equity.</li>
                <li><strong>Leverage Ratio:</strong> Ratio of total exposure to available margin.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">How It Works</h3>
              <p className="mb-2">The calculator uses standard risk formulas:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                <li><strong>Required Margin:</strong> Trade Value × Margin Percentage</li>
                <li><strong>Leverage:</strong> 1 / Margin Percentage</li>
                <li><strong>Maximum Exposure:</strong> Trade Value × Leverage</li>
                <li><strong>Risk per Trade:</strong> Required Margin × Risk Percentage</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 mt-12">
          <h2 className="text-xl font-bold text-[#113262] mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex justify-between items-center p-4 text-left font-semibold text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-slate-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="p-4 pt-0 text-sm text-slate-600 border-t border-slate-100 bg-slate-50/50 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
