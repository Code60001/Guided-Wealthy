import React, { useState, useEffect } from 'react';
import { Share2, ChevronDown, ChevronUp, Heart, Users, Utensils, Sparkles, Camera, Shirt, Gift, ShieldAlert } from 'lucide-react';

export default function WeddingBudgetPlanner() {
  // Input States
  const [numberOfGuests, setNumberOfGuests] = useState<number>(200);
  const [weddingType, setWeddingType] = useState<string>('Traditional');
  const [weddingCityType, setWeddingCityType] = useState<string>('Tier 1 City');

  const [venueBudget, setVenueBudget] = useState<number>(200000);
  const [cateringCostPerPlate, setCateringCostPerPlate] = useState<number>(1200);

  const [decorationBudget, setDecorationBudget] = useState<number>(100000);
  const [photographyBudget, setPhotographyBudget] = useState<number>(75000);

  // Additional Expenses
  const [showAdditional, setShowAdditional] = useState<boolean>(false);
  const [attireJewellery, setAttireJewellery] = useState<number>(500000);
  const [invitationsGifts, setInvitationsGifts] = useState<number>(50000);
  const [entertainmentMusic, setEntertainmentMusic] = useState<number>(50000);
  const [contingencyBufferPercent, setContingencyBufferPercent] = useState<number>(10);

  // Computed Outputs
  const [totalCatering, setTotalCatering] = useState<number>(0);
  const [subtotalBudget, setSubtotalBudget] = useState<number>(0);
  const [contingencyAmount, setContingencyAmount] = useState<number>(0);
  const [totalWeddingBudget, setTotalWeddingBudget] = useState<number>(0);
  const [costPerGuest, setCostPerGuest] = useState<number>(0);

  useEffect(() => {
    const cateringTot = cateringCostPerPlate * numberOfGuests;
    const subtotal =
      venueBudget +
      cateringTot +
      decorationBudget +
      photographyBudget +
      attireJewellery +
      invitationsGifts +
      entertainmentMusic;

    const buffer = Math.round(subtotal * (contingencyBufferPercent / 100));
    const total = subtotal + buffer;
    const perGuest = Math.round(total / (numberOfGuests || 1));

    setTotalCatering(cateringTot);
    setSubtotalBudget(subtotal);
    setContingencyAmount(buffer);
    setTotalWeddingBudget(total);
    setCostPerGuest(perGuest);
  }, [
    numberOfGuests,
    venueBudget,
    cateringCostPerPlate,
    decorationBudget,
    photographyBudget,
    attireJewellery,
    invitationsGifts,
    entertainmentMusic,
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
        <h1 className="text-2xl md:text-3xl font-bold text-[#113262] mb-4">Wedding Budget Planner</h1>
        <p className="text-slate-600 text-base">
          Break down wedding costs with this comprehensive budget calculator
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Main Grid */}
        <div className="flex flex-col lg:flex-row gap-8 mb-16">
          {/* Inputs Column */}
          <div className="flex-1 space-y-6">
            {/* Wedding Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500" /> Wedding Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-slate-700">Number of Guests</label>
                    <input
                      type="number"
                      min="20"
                      max="2000"
                      value={numberOfGuests}
                      onChange={(e) => setNumberOfGuests(Math.max(1, Number(e.target.value)))}
                    />
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="2000"
                    step="10"
                    value={numberOfGuests}
                    onChange={(e) => setNumberOfGuests(Number(e.target.value))}

                    style={getSliderStyle(numberOfGuests, "20", "2000")}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#3b82f6] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#3b82f6] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Wedding Type</label>
                  <select
                    value={weddingType}
                    onChange={(e) => setWeddingType(e.target.value)}
                    className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-semibold text-slate-800 bg-white text-sm"
                  >
                    <option value="Traditional">Traditional Wedding</option>
                    <option value="Destination">Destination Wedding</option>
                    <option value="Intimate">Intimate Ceremony</option>
                    <option value="Grand Royal">Grand Royal Wedding</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Wedding City Type</label>
                <select
                  value={weddingCityType}
                  onChange={(e) => setWeddingCityType(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-semibold text-slate-800 bg-white text-sm"
                >
                  <option value="Tier 1 City">Tier 1 City (Mumbai, Delhi, Bangalore)</option>
                  <option value="Tier 2 City">Tier 2 City (Jaipur, Lucknow, Chandigarh)</option>
                  <option value="Tier 3 City">Tier 3 City / Hometown</option>
                  <option value="Destination Resort">Destination Resort (Udaipur, Goa, Kerala)</option>
                </select>
              </div>
            </div>

            {/* Venue & Catering */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Utensils className="w-5 h-5 text-blue-600" /> Venue & Catering
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-slate-700">Venue Budget</label>
                    <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-300">
                      {formatCurrency(venueBudget)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="2000000"
                    step="10000"
                    value={venueBudget}
                    onChange={(e) => setVenueBudget(Number(e.target.value))}

                    style={getSliderStyle(venueBudget, "10000", "2000000")}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#3b82f6] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#3b82f6] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-slate-700">Catering Cost (per plate)</label>
                    <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-300">
                      {formatCurrency(cateringCostPerPlate)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="300"
                    max="5000"
                    step="50"
                    value={cateringCostPerPlate}
                    onChange={(e) => setCateringCostPerPlate(Number(e.target.value))}

                    style={getSliderStyle(cateringCostPerPlate, "300", "5000")}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#3b82f6] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#3b82f6] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
                  />
                </div>
              </div>
            </div>

            {/* Essential Services */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" /> Essential Services
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-slate-700">Decoration Budget</label>
                    <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-300">
                      {formatCurrency(decorationBudget)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="1000000"
                    step="10000"
                    value={decorationBudget}
                    onChange={(e) => setDecorationBudget(Number(e.target.value))}

                    style={getSliderStyle(decorationBudget, "10000", "1000000")}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#3b82f6] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#3b82f6] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-slate-700">Photography & Videography</label>
                    <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-300">
                      {formatCurrency(photographyBudget)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="500000"
                    step="5000"
                    value={photographyBudget}
                    onChange={(e) => setPhotographyBudget(Number(e.target.value))}

                    style={getSliderStyle(photographyBudget, "10000", "500000")}
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
                  <Shirt className="w-5 h-5 text-blue-600" /> Additional Expenses (Attire, Gifts, Music, Buffer)
                </span>
                {showAdditional ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
              </button>

              {showAdditional && (
                <div className="p-6 pt-0 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Attire & Jewellery</label>
                    <input
                      type="number"
                      step="10000"
                      min="0"
                      value={attireJewellery}
                      onChange={(e) => setAttireJewellery(Number(e.target.value))}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Invitations & Gifts</label>
                    <input
                      type="number"
                      step="5000"
                      min="0"
                      value={invitationsGifts}
                      onChange={(e) => setInvitationsGifts(Number(e.target.value))}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Entertainment & DJ</label>
                    <input
                      type="number"
                      step="5000"
                      min="0"
                      value={entertainmentMusic}
                      onChange={(e) => setEntertainmentMusic(Number(e.target.value))}
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
                      <option value={5}>5% Buffer</option>
                      <option value={10}>10% Buffer (Recommended)</option>
                      <option value={15}>15% Buffer</option>
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
                <h2 className="text-xl font-bold tracking-tight">Wedding Budget Summary</h2>
                <button className="text-slate-400 hover:text-white transition-colors p-1" title="Share">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-8 bg-slate-800/80 p-5 rounded-2xl border border-slate-600">
                <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-1">
                  {formatCurrency(totalWeddingBudget)}
                </div>
                <div className="text-slate-300 text-xs font-medium uppercase tracking-wider">Total Wedding Budget</div>
              </div>

              <div className="space-y-4 border-t border-slate-600/60 pt-6">
                <div className="flex justify-between items-center text-sm font-semibold text-amber-400">
                  <span>Budget Breakdown</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">Cost per Guest</span>
                  <span className="font-semibold text-white">{formatCurrency(costPerGuest)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">Catering Total</span>
                  <span className="font-semibold text-white">{formatCurrency(totalCatering)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">Venue & Decor</span>
                  <span className="font-semibold text-slate-200">{formatCurrency(venueBudget + decorationBudget)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">Contingency Amount</span>
                  <span className="font-semibold text-emerald-400">{formatCurrency(contingencyAmount)}</span>
                </div>
              </div>

              <button className="w-full py-2.5 px-4 bg-[#eaa33a] hover:bg-[#d4902d] text-white font-semibold rounded-xl transition-colors mt-6 flex justify-center items-center gap-2">
                Start Wedding Planning <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </div>
        </div>

        {/* Informational SEO & FAQs Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-slate-200">
          <div className="md:col-span-2 space-y-8 text-slate-700 text-sm md:text-base leading-relaxed">
            <section className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-[#113262] mb-4">Understanding Wedding Budget Planning</h2>
              <p className="text-slate-600 mb-4">
                Planning a wedding budget is crucial for creating your dream celebration while maintaining financial stability. A well-structured wedding budget helps you prioritize expenses and make informed decisions about your special day.
              </p>

              <h3 className="text-lg font-semibold text-slate-900 mb-2">Key Benefits of Wedding Budget Planning</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600 mb-6">
                <li>Ensures your dream wedding stays financially manageable</li>
                <li>Helps prioritize spending on what matters most</li>
                <li>Reduces stress by providing clear financial guidelines</li>
                <li>Prevents unexpected costs and overspending</li>
              </ul>

              <h3 className="text-lg font-semibold text-slate-900 mb-2">Essential Steps for Wedding Budget Planning</h3>

              <div className="space-y-4 text-slate-600">
                <div>
                  <h4 className="font-bold text-slate-800">1. Initial Planning</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm mt-1">
                    <li>Determine your total budget capacity</li>
                    <li>Estimate guest count and venue requirements</li>
                    <li>Set priorities for different aspects of the wedding</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-slate-800">2. Cost Breakdown</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm mt-1">
                    <li>Allocate budget for venue and catering</li>
                    <li>Plan for attire, decorations, and entertainment</li>
                    <li>Include photography, flowers, and other services</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-slate-800">3. Financial Strategy</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm mt-1">
                    <li>Create a savings timeline leading up to the wedding</li>
                    <li>Build an emergency buffer for unexpected expenses</li>
                    <li>Track expenses and adjust plans as needed</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-2xl font-bold text-[#113262]">Frequently Asked Questions</h2>

              <div className="border-b border-slate-100 pb-5">
                <h3 className="font-bold text-slate-900 mb-2">How should I allocate my wedding budget?</h3>
                <p className="text-slate-600 text-base">
                  Typical allocation: venue and decor (25-35%), food and catering (20-30%), jewellery and clothing (15-20%), photography and video (8-12%), entertainment and music (5-8%), invitations and gifts (3-5%), and contingency (10%). Adjust based on your priorities and regional customs.
                </p>
              </div>

              <div className="border-b border-slate-100 pb-5">
                <h3 className="font-bold text-slate-900 mb-2">What is the average wedding cost in Indian metros?</h3>
                <p className="text-slate-600 text-base">
                  Delhi NCR: Rs 15-50 lakh (mid-range). Mumbai: Rs 15-40 lakh. Bangalore: Rs 10-30 lakh. Chennai/Hyderabad: Rs 8-25 lakh. These are for 200-500 guest weddings. Intimate weddings (50-100 guests) can cost 40-50% less. Destination weddings in Goa, Udaipur, or Kerala add 20-30% premium.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-2">How can I reduce wedding costs without compromising?</h3>
                <p className="text-slate-600 text-base">
                  Book venue and vendors in off-season (April-August). Negotiate package deals. Choose buffet over plated service. Use seasonal flowers for decor. Opt for digital invitations. Limit the guest list. Skip unnecessary functions. A well-planned wedding can be memorable at half the cost of an unplanned one.
                </p>
              </div>
            </section>
          </div>

          {/* Right Column: SEO Card */}
          <div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-lg">Plan Your Wedding Budget</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Enter your total budget and number of guests. The calculator allocates the budget across venue, catering, jewellery, photography, entertainment, and other categories based on standard ratios. Adjust each category to match your priorities and see real-time impact on the overall budget.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
