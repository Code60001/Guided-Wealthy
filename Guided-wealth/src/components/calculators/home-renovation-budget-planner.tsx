import React, { useState, useEffect } from 'react';
import { Share2, ChevronDown, ChevronUp, Home, Hammer, Paintbrush, Zap, Sliders, ShieldAlert } from 'lucide-react';

export default function HomeRenovationBudgetPlanner() {
  // Input States
  const [totalAreaSqFt, setTotalAreaSqFt] = useState<number>(1000);
  const [renovationType, setRenovationType] = useState<string>('Full Home Renovation');
  const [propertyAge, setPropertyAge] = useState<string>('0-5 years');

  // Core Renovation Costs (per sq ft)
  const [flooringCostPerSqFt, setFlooringCostPerSqFt] = useState<number>(200);
  const [wallsPaintingPerSqFt, setWallsPaintingPerSqFt] = useState<number>(100);
  const [electricalWorkPerSqFt, setElectricalWorkPerSqFt] = useState<number>(50);

  // Additional Expenses
  const [showAdditional, setShowAdditional] = useState<boolean>(false);
  const [modularKitchenWoodwork, setModularKitchenWoodwork] = useState<number>(250000);
  const [bathroomsSanitary, setBathroomsSanitary] = useState<number>(100000);
  const [falseCeilingLighting, setFalseCeilingLighting] = useState<number>(50000);
  const [architectFeePercent, setArchitectFeePercent] = useState<number>(10);
  const [contingencyBufferPercent, setContingencyBufferPercent] = useState<number>(15);

  // Computed Outputs
  const [areaBasedCosts, setAreaBasedCosts] = useState<number>(0);
  const [fixedInteriorCosts, setFixedInteriorCosts] = useState<number>(0);
  const [designerFeeAmount, setDesignerFeeAmount] = useState<number>(0);
  const [contingencyAmount, setContingencyAmount] = useState<number>(0);
  const [totalRenovationBudget, setTotalRenovationBudget] = useState<number>(0);
  const [costPerSqFt, setCostPerSqFt] = useState<number>(0);

  useEffect(() => {
    const areaCosts = (flooringCostPerSqFt + wallsPaintingPerSqFt + electricalWorkPerSqFt) * totalAreaSqFt;
    const fixedCosts = modularKitchenWoodwork + bathroomsSanitary + falseCeilingLighting;
    const baseSubtotal = areaCosts + fixedCosts;

    const fee = Math.round(baseSubtotal * (architectFeePercent / 100));
    const subtotalWithFee = baseSubtotal + fee;
    const buffer = Math.round(subtotalWithFee * (contingencyBufferPercent / 100));
    const total = subtotalWithFee + buffer;
    const perSqFt = Math.round(total / (totalAreaSqFt || 1));

    setAreaBasedCosts(areaCosts);
    setFixedInteriorCosts(fixedCosts);
    setDesignerFeeAmount(fee);
    setContingencyAmount(buffer);
    setTotalRenovationBudget(total);
    setCostPerSqFt(perSqFt);
  }, [
    totalAreaSqFt,
    flooringCostPerSqFt,
    wallsPaintingPerSqFt,
    electricalWorkPerSqFt,
    modularKitchenWoodwork,
    bathroomsSanitary,
    falseCeilingLighting,
    architectFeePercent,
    contingencyBufferPercent,
  ]);

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
      {/* Header Banner */}
      <div className="bg-white pt-32 pb-10 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-[#113262] mb-4">Home Renovation Budget Planner</h1>
        <p className="text-slate-600 text-base">
          Plan Your Home Renovation Within Budget with instant per sq ft cost estimates
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Main Grid */}
        <div className="flex flex-col lg:flex-row gap-8 mb-16">
          {/* Inputs Column */}
          <div className="flex-1 space-y-6">
            {/* Property Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Home className="w-5 h-5 text-blue-600" /> Property Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-slate-700">Total Area (sq ft)</label>
                    <input
                      type="number"
                      min="100"
                      max="10000"
                      value={totalAreaSqFt}
                      onChange={(e) => setTotalAreaSqFt(Math.max(1, Number(e.target.value)))}
                    />
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="5000"
                    step="50"
                    value={totalAreaSqFt}
                    onChange={(e) => setTotalAreaSqFt(Number(e.target.value))}

                    style={getSliderStyle(totalAreaSqFt, "100", "10000")}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#3b82f6] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#3b82f6] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Renovation Type</label>
                  <select
                    value={renovationType}
                    onChange={(e) => setRenovationType(e.target.value)}
                    className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-semibold text-slate-800 bg-white text-sm"
                  >
                    <option value="Full Home Renovation">Full Home Renovation</option>
                    <option value="Kitchen & Bath">Kitchen & Bath Focus</option>
                    <option value="Interior Decoration">Interior Decoration & Woodwork</option>
                    <option value="Painting & Flooring">Painting & Flooring Refresh</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Property Age</label>
                <select
                  value={propertyAge}
                  onChange={(e) => setPropertyAge(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-semibold text-slate-800 bg-white text-sm"
                >
                  <option value="0-5 years">0-5 years (Newer Construction)</option>
                  <option value="5-15 years">5-15 years (Moderate Maintenance Needed)</option>
                  <option value="15+ years">15+ years (Complete Plumbing & Wiring Overhaul)</option>
                </select>
              </div>
            </div>

            {/* Core Renovation Costs */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Hammer className="w-5 h-5 text-blue-600" /> Core Renovation Costs (per sq ft)
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-slate-700">Flooring Cost (per sq ft)</label>
                    <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-300">
                      ₹{flooringCostPerSqFt}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="20"
                    value={flooringCostPerSqFt}
                    onChange={(e) => setFlooringCostPerSqFt(Number(e.target.value))}

                    style={getSliderStyle(flooringCostPerSqFt, "0", "1000")}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#3b82f6] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#3b82f6] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-slate-700">Walls & Painting (per sq ft)</label>
                    <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-300">
                      ₹{wallsPaintingPerSqFt}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    step="10"
                    value={wallsPaintingPerSqFt}
                    onChange={(e) => setWallsPaintingPerSqFt(Number(e.target.value))}

                    style={getSliderStyle(wallsPaintingPerSqFt, "0", "500")}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#3b82f6] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#3b82f6] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-slate-700">Electrical Work (per sq ft)</label>
                    <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-300">
                      ₹{electricalWorkPerSqFt}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="400"
                    step="10"
                    value={electricalWorkPerSqFt}
                    onChange={(e) => setElectricalWorkPerSqFt(Number(e.target.value))}

                    style={getSliderStyle(electricalWorkPerSqFt, "0", "400")}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#3b82f6] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#3b82f6] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
                  />
                </div>
              </div>
            </div>

            {/* Additional Expenses Accordion */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <button
                onClick={() => setShowAdditional(!showAdditional)}
                className="w-full p-6 flex justify-between items-center font-bold text-slate-900 hover:bg-slate-50 transition-colors"
              >
                <span className="flex items-center gap-2 text-base">
                  <Paintbrush className="w-5 h-5 text-blue-600" /> Additional Expenses (Kitchen, Bath, Ceiling, Fees)
                </span>
                {showAdditional ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
              </button>

              {showAdditional && (
                <div className="p-6 pt-0 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Modular Kitchen & Woodwork</label>
                    <input
                      type="number"
                      step="10000"
                      min="0"
                      value={modularKitchenWoodwork}
                      onChange={(e) => setModularKitchenWoodwork(Number(e.target.value))}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Bathrooms & Sanitaryware</label>
                    <input
                      type="number"
                      step="10000"
                      min="0"
                      value={bathroomsSanitary}
                      onChange={(e) => setBathroomsSanitary(Number(e.target.value))}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">False Ceiling & Lighting</label>
                    <input
                      type="number"
                      step="5000"
                      min="0"
                      value={falseCeilingLighting}
                      onChange={(e) => setFalseCeilingLighting(Number(e.target.value))}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Architect / Designer Fee (%)</label>
                    <input
                      type="number"
                      step="1"
                      min="0"
                      max="25"
                      value={architectFeePercent}
                      onChange={(e) => setArchitectFeePercent(Number(e.target.value))}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Contingency Buffer (%)</label>
                    <select
                      value={contingencyBufferPercent}
                      onChange={(e) => setContingencyBufferPercent(Number(e.target.value))}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value={10}>10% Buffer</option>
                      <option value={15}>15% Buffer (Recommended)</option>
                      <option value={20}>20% Buffer</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Sticky Summary Card */}
          <div className="w-full lg:w-[380px]">
            <div className="bg-[#1e2a4f] rounded-2xl shadow-xl p-6 md:p-8 text-white sticky top-28 border border-slate-600/50">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-bold tracking-tight">Renovation Budget Summary</h2>
                <button className="text-slate-400 hover:text-white transition-colors p-1" title="Share">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-8 bg-slate-800/80 p-5 rounded-2xl border border-slate-600">
                <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-1">
                  {formatCurrency(totalRenovationBudget)}
                </div>
                <div className="text-slate-300 text-xs font-medium uppercase tracking-wider">Total Renovation Budget</div>
              </div>

              <div className="space-y-4 border-t border-slate-600/60 pt-6">
                <div className="flex justify-between items-center text-sm font-semibold text-amber-400">
                  <span>Budget Breakdown</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">Cost per Sq Ft</span>
                  <span className="font-semibold text-white">{formatCurrency(costPerSqFt)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">Area Based Costs</span>
                  <span className="font-semibold text-white">{formatCurrency(areaBasedCosts)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">Interiors & Woodwork</span>
                  <span className="font-semibold text-slate-200">{formatCurrency(fixedInteriorCosts)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">Contingency Amount</span>
                  <span className="font-semibold text-emerald-400">{formatCurrency(contingencyAmount)}</span>
                </div>
              </div>

              <button className="w-full py-2.5 px-4 bg-[#eaa33a] hover:bg-[#d4902d] text-white font-semibold rounded-xl transition-colors mt-6 flex justify-center items-center gap-2">
                Start Renovation Planning <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </div>
        </div>

        {/* Informational SEO & FAQs Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-slate-200">
          <div className="md:col-span-2 space-y-8 text-slate-700 text-sm md:text-base leading-relaxed">
            <section className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-[#113262] mb-4">Understanding Home Renovation Planning</h2>
              <p className="text-slate-600 mb-4">
                Planning a home renovation project requires careful budgeting and consideration of various factors. A well-structured renovation budget helps you transform your living space while maintaining financial control and ensuring quality results.
              </p>

              <h3 className="text-lg font-semibold text-slate-900 mb-2">Key Benefits of Renovation Planning:</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600 mb-6">
                <li>Ensures realistic cost expectations for your renovation project</li>
                <li>Helps prioritize improvements based on budget constraints</li>
                <li>Prevents cost overruns and unexpected expenses</li>
                <li>Maximizes return on investment for home improvements</li>
              </ul>

              <h3 className="text-lg font-semibold text-slate-900 mb-2">Essential Steps for Renovation Planning:</h3>

              <div className="space-y-4 text-slate-600">
                <div>
                  <h4 className="font-bold text-slate-800">1. Project Assessment</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm mt-1">
                    <li>Evaluate the scope of renovation needed</li>
                    <li>Identify priority areas for improvement</li>
                    <li>Consider structural requirements and permissions</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-slate-800">2. Cost Estimation</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm mt-1">
                    <li>Research material and labor costs</li>
                    <li>Get multiple contractor quotes</li>
                    <li>Include permits and inspection fees</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-slate-800">3. Financial Planning</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm mt-1">
                    <li>Set aside contingency funds for unexpected issues</li>
                    <li>Consider financing options if needed</li>
                    <li>Plan for temporary accommodation if required</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-2xl font-bold text-[#113262]">Frequently Asked Questions</h2>

              <div className="border-b border-slate-100 pb-5">
                <h3 className="font-bold text-slate-900 mb-2">How much does home renovation cost in India?</h3>
                <p className="text-slate-600 text-base">
                  Renovation costs vary widely: painting (Rs 15-30 per sq ft), modular kitchen (Rs 1-5 lakh), bathroom renovation (Rs 50,000-3 lakh per bathroom), flooring (Rs 30-150 per sq ft), and complete interior work (Rs 500-2,000 per sq ft). A full renovation of a 2BHK apartment typically costs Rs 3-10 lakh depending on material quality and city.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-2">How should I finance a home renovation?</h3>
                <p className="text-slate-600 text-base">
                  Ideally, save in advance through a dedicated SIP for 1-2 years. If you need financing, a home loan top-up (8.5-10%) is cheaper than a personal loan (12-18%). Gold loans (10-12%) are another option. Avoid credit card financing as interest rates are 36-42% annually.
                </p>
              </div>
            </section>
          </div>

          {/* Right Column: SEO Card */}
          <div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-lg">Planning Your Renovation</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Enter the renovation scope (painting, kitchen, bathroom, flooring, full renovation) and property size. The calculator estimates the cost range and shows the monthly SIP needed to save for it. If you plan to finance the renovation, it compares the EMI across different loan types (top-up, personal, gold loan).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
