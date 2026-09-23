import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ShieldCheck } from 'lucide-react';
import axios from 'axios';
import { getRiskCategory } from '../constants/assessmentQuestions';

export default function Dashboard() {
  const { user, isLoggedIn } = useAuth();
  const [retirementData, setRetirementData] = useState<any>(null);
  const [riskData, setRiskData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'retirement' | 'risk'>('retirement');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!isLoggedIn || !user?.token) return;
      
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
        
        // Fetch retirement data
        try {
          const retRes = await axios.get(`${apiUrl}/retirement-analysis`, {
            headers: { Authorization: `Bearer ${user.token}` }
          });
          if (retRes.data && retRes.data.results) {
            setRetirementData(retRes.data.results);
          } else if (retRes.data && retRes.data.inputs) {
             // Fallback if results are at the root
             setRetirementData(retRes.data);
          }
        } catch (e) {
          console.error("No retirement data found");
        }

        // Fetch risk data
        if (user.hasCompletedRiskAssessment) {
          try {
            const riskRes = await axios.get(`${apiUrl}/assessment`, {
              headers: { Authorization: `Bearer ${user.token}` }
            });
            if (riskRes.data) {
              const { score, riskCategory } = riskRes.data;
              const { allocation } = getRiskCategory(score);
              setRiskData({ score, category: riskCategory, allocation });
            }
          } catch (e) {
            console.error("No risk data found");
          }
        }
      } catch (err) {
        console.error("Error fetching dashboard data", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [isLoggedIn, user]);

  useEffect(() => {
    if (!isLoading) {
      if (!retirementData && riskData) {
        setActiveTab('risk');
      } else {
        setActiveTab('retirement');
      }
    }
  }, [isLoading, retirementData, riskData]);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream/30 p-8 pt-28 font-sans flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const isRetirementValid = retirementData && retirementData.inputs && retirementData.inputs.currentAge !== '' && retirementData.inputs.currentAge > 0;
  const isRiskValid = riskData && riskData.score !== undefined;

  if (!isRetirementValid && !isRiskValid) {
    return (
      <div className="min-h-screen bg-cream/30 p-8 pt-28 font-sans flex items-center justify-center">
        <div className="max-w-4xl w-full animate-fade-in">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-serif font-bold text-ink mb-4">Welcome to Your Dashboard</h1>
            <p className="text-primary/70 text-lg">Please complete the assessments below to generate your personalized financial plan.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-primary/10 text-center flex flex-col h-full hover:shadow-2xl transition-shadow">
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </div>
              <h2 className="text-2xl font-bold text-ink mb-4">Retirement Analysis</h2>
              <p className="text-primary/60 mb-8 flex-grow">Plan your future and see how much you need to save to retire comfortably.</p>
              <Link to="/retirement-analysis" className="bg-primary text-cream hover:bg-ink flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold uppercase tracking-wide shadow-md hover:shadow-lg active:scale-95 transition-all w-full">
                Start Analysis
              </Link>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-primary/10 text-center flex flex-col h-full hover:shadow-2xl transition-shadow">
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-10 h-10 text-accent" />
              </div>
              <h2 className="text-2xl font-bold text-ink mb-4">Risk Profile</h2>
              <p className="text-primary/60 mb-8 flex-grow">Understand your investment risk appetite and get a personalized asset allocation.</p>
              <Link to="/assessment" className="bg-primary text-cream hover:bg-ink flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold uppercase tracking-wide shadow-md hover:shadow-lg active:scale-95 transition-all w-full">
                Start Assessment
              </Link>
            </div>
          </div>
        </div>
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 0.4s ease-out forwards;
          }
        `}</style>
      </div>
    );
  }

  const formatCurrency = (val: number) => {
    if (val < 0) {
      return `(₹${Math.abs(val).toLocaleString('en-IN')})`;
    }
    return `₹${val.toLocaleString('en-IN')}`;
  };

  const renderRetirementTab = () => {
    if (!isRetirementValid) {
      return (
        <div className="text-center p-12 bg-white border border-primary/10 rounded-3xl shadow-xl max-w-lg mx-auto mt-10 animate-fade-in">
          <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
          </div>
          <h2 className="text-3xl font-serif font-bold text-ink mb-4">No Analysis Found</h2>
          <p className="mb-8 text-primary/70">You haven't generated your retirement analysis yet. Please fill out the form to view your dashboard.</p>
          <Link to="/retirement-analysis" className="bg-primary text-cream hover:bg-ink inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-bold uppercase tracking-wide shadow-md hover:shadow-lg active:scale-95 transition-all">
            Start Analysis
          </Link>
        </div>
      );
    }

    const inputs = retirementData.inputs;

    const corpusAtRetirement = retirementData.corpusAtRetirement || 0;
    const corpusRequired = retirementData.corpusRequired || 0;
    const shortfall = retirementData.shortfall || 0;
    const isShortfall = shortfall > 0;
    const extraMonthlySip = retirementData.requiredSip || 0;
    const existingCorpus = inputs.existingInvestments || 0;

    // --- Dynamic Calculations based on inputs ---
    // 1. Insurance Premiums
    const healthPremium = (inputs.healthInsuranceCover / 100000) * (inputs.healthPremiumRate || 0);
    const lifePremium = (inputs.lifeInsuranceCover / 100000) * (inputs.lifePremiumRate || 0);
    const annualInsurance = healthPremium + lifePremium;

    // 2. Parent Support
    const parentMedFundSip = (inputs.parentsMedicalFund || 0) / (Math.max(1, inputs.yearsToBuildMedicalFund || 8) * 12);
    const annualParentSupport = (inputs.monthlySupportParents * 12) + (parentMedFundSip * 12);

    // 3. Goal SIP Calculations
    const calculateSip = (currentCost: number, years: number, inflation: number, returnRate: number) => {
      if (!currentCost || years <= 0) return 0;
      const fv = currentCost * Math.pow(1 + inflation / 100, years);
      const monthlyRate = returnRate / 100 / 12;
      const months = years * 12;
      return monthlyRate > 0 ? (fv * monthlyRate) / (Math.pow(1 + monthlyRate, months) - 1) : fv / months;
    };

    const genInflation = inputs.generalInflation || 6;
    const edInflation = inputs.educationInflation || 9;
    const invReturn = inputs.preRetirementReturn || 11;

    const sipHouse = inputs.buyHouse === 'Yes' ? calculateSip((inputs.houseCost || 0) * ((inputs.downPaymentPct || 0) / 100), inputs.yearsToHouse || 8, genInflation, invReturn) : 0;
    const sipCar1 = calculateSip(inputs.carCost || 0, inputs.yearsToFirstCar || 4, genInflation, invReturn);
    const sipCar2 = calculateSip(inputs.carCost || 0, (inputs.yearsToFirstCar || 4) + (inputs.carReplacementGap || 10), genInflation, invReturn);
    const sipHigherEd = calculateSip(inputs.higherEdCost || 0, Math.max(1, (inputs.higherEdStartAge || 18) - (inputs.childrenAvgAge || 3)), edInflation, invReturn) * (inputs.numChildren || 1);
    const sipWedding = calculateSip(inputs.weddingCost || 0, inputs.yearsToWedding || 24, genInflation, invReturn);
    const sipVacations = (inputs.domesticVacationCost || 0) / 12 + ((inputs.foreignVacationCost || 0) / (inputs.foreignVacationFreq || 3) / 12);
    const sipEmergency = calculateSip(((inputs.monthlyIncome || 0) * (inputs.emergencyFundTarget || 6)), 3, genInflation, invReturn);
    const sipParentsMed = calculateSip(inputs.parentsMedicalFund || 0, inputs.yearsToBuildMedicalFund || 8, genInflation, invReturn);

    const sipData = [
      { name: 'House — Down Payment', value: sipHouse, color: '#4F81BD' },
      { name: 'Car #1 Purchase', value: sipCar1, color: '#C0504D' },
      { name: 'Car #2 (Replacement)', value: sipCar2, color: '#9BBB59' },
      { name: 'Higher Education (all kids, total)', value: sipHigherEd, color: '#4BACC6' },
      { name: 'Children\'s Wedding(s)', value: sipWedding, color: '#F79646' },
      { name: 'Vacations (annual, ongoing)', value: sipVacations, color: '#95B3D7' },
      { name: 'Emergency Fund (one-time build)', value: sipEmergency, color: '#C3D69B' },
      { name: 'Parents\' Medical Emergency Fund', value: sipParentsMed, color: '#B2A2C7' },
    ].filter(d => d.value > 0);

    const totalMonthlySip = sipData.reduce((acc, curr) => acc + curr.value, 0);

    // 4. Generate Corpus Data (Age 18 to 90)
    const corpusData = [];
    let currentCorpus = 0;
    for (let age = 18; age <= 90; age++) {
      if (age < inputs.currentAge) {
        currentCorpus = inputs.existingInvestments * Math.pow(age / inputs.currentAge, 2);
      } else if (age === inputs.currentAge) {
        currentCorpus = inputs.existingInvestments;
      } else if (age <= inputs.retirementAge) {
        const annualInvestment = (totalMonthlySip + extraMonthlySip) * 12;
        currentCorpus = currentCorpus * (1 + (inputs.preRetirementReturn / 100)) + annualInvestment;
      } else {
        const annualRetirementExpense = (corpusRequired * ((inputs.postRetirementReturn - inputs.generalInflation) / 100));
        currentCorpus = currentCorpus * (1 + (inputs.postRetirementReturn / 100)) - annualRetirementExpense;
      }
      corpusData.push({ age, corpus: Math.round(currentCorpus) });
    }

    // 5. Generate Income vs Outflow Data
    const incomeOutflowData = [];
    let currentIncome = (inputs.monthlyIncome + (inputs.spouseIncome || 0) + (inputs.otherIncome || 0)) * 12;
    let currentExpenses = (inputs.rentEmi + inputs.groceries + inputs.utilities + inputs.transport + inputs.householdHelp + inputs.phoneInternet + inputs.personalCare + inputs.entertainment + inputs.miscellaneous + inputs.monthlySupportParents) * 12;

    for (let age = inputs.currentAge; age <= inputs.retirementAge - 1; age++) {
      incomeOutflowData.push({
        age,
        Income: Math.round(currentIncome),
        Outflow: Math.round(currentExpenses + (totalMonthlySip * 12))
      });
      currentIncome *= 1.08;
      currentExpenses *= (1 + (inputs.generalInflation / 100));
    }

    return (
      <div className="mt-20 animate-fade-in">
        {/* YOUR PROFILE */}
        <div className="mb-4">
          <div className="bg-[#4472c4] text-white font-bold p-1 px-2 flex justify-between items-center">
            <span>YOUR PROFILE</span>
            <Link to="/retirement-analysis" className="text-[11px] bg-white text-[#4472c4] px-2 py-0.5 rounded shadow-sm hover:bg-gray-100 transition-colors flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
              Edit / Recalculate
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row w-full border-l border-r border-b border-gray-300">
            <div className="flex-1 flex border-b sm:border-b-0 sm:border-r border-gray-300">
              <div className="flex-[2] p-1 px-2 text-[#1f3864]">Current Age</div>
              <div className="flex-1 p-1 px-2 text-center text-[#00b050] font-bold border-l border-gray-300 bg-white">{inputs.currentAge} yrs</div>
            </div>
            <div className="flex-1 flex border-b sm:border-b-0 sm:border-r border-gray-300">
              <div className="flex-[2] p-1 px-2 text-[#1f3864]">Retirement Age</div>
              <div className="flex-1 p-1 px-2 text-center text-[#00b050] font-bold border-l border-gray-300 bg-white">{inputs.retirementAge} yrs</div>
            </div>
            <div className="flex-1 flex">
              <div className="flex-[2] p-1 px-2 text-[#1f3864]">Life Expectancy</div>
              <div className="flex-1 p-1 px-2 text-center text-[#00b050] font-bold border-l border-gray-300 bg-white">{inputs.lifeExpectancy} yrs</div>
            </div>
          </div>
        </div>

        {/* KEY RESULTS */}
        <div className="mb-4 overflow-x-auto">
          <div className="bg-[#4472c4] text-white font-bold p-1 px-2">
            KEY RESULTS
          </div>
          <table className="w-full min-w-[800px] border-collapse border border-gray-300 text-[13px]">
            <tbody>
              <tr>
                <td className="border border-gray-300 p-1 px-2 text-[#1f3864] w-[20%]">Corpus at Retirement</td>
                <td className="border border-gray-300 p-1 px-2 text-center text-[#00b050] font-bold w-[13.33%]">{formatCurrency(corpusAtRetirement)}</td>
                <td className="border border-gray-300 p-1 px-2 text-[#1f3864] w-[20%]">Corpus Required at Retirement</td>
                <td className="border border-gray-300 p-1 px-2 text-center text-[#00b050] font-bold w-[13.33%]">{formatCurrency(corpusRequired)}</td>
                <td className="border border-gray-300 p-1 px-2 text-[#1f3864] w-[20%] font-bold">Surplus/(Shortfall)</td>
                <td className="border border-gray-300 p-1 px-2 text-center text-red-600 font-bold bg-[#fce4d6] w-[13.33%]">{isShortfall ? `(${formatCurrency(shortfall)})` : formatCurrency(-shortfall)}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-1 px-2 text-[#1f3864]">Status</td>
                <td className="border border-gray-300 p-1 px-2 text-center text-red-600 font-bold bg-[#fce4d6]">
                  {isShortfall ? 'SHORTFALL - see Section 4 below' : 'SURPLUS'}
                </td>
                <td className="border border-gray-300 p-1 px-2 text-[#1f3864]">Extra Monthly SIP to Close Gap</td>
                <td className="border border-gray-300 p-1 px-2 text-center text-[#00b050] font-bold">{formatCurrency(extraMonthlySip)}</td>
                <td className="border border-gray-300 p-1 px-2 text-[#1f3864] font-bold">Money Lasts to 90?</td>
                <td className="border border-gray-300 p-1 px-2 text-center text-red-600 font-bold bg-[#fce4d6]">
                  {isShortfall ? 'NO - Shortfall (see red rows above)' : 'YES'}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-1 px-2 text-[#1f3864] font-bold">Total Monthly SIP — All Goals (excl. school)</td>
                <td className="border border-gray-300 p-1 px-2 text-center text-[#00b050] font-bold">{formatCurrency(totalMonthlySip)}</td>
                <td className="border border-gray-300 p-1 px-2 text-[#1f3864]">Existing Corpus (today)</td>
                <td className="border border-gray-300 p-1 px-2 text-center text-[#00b050] font-bold">{formatCurrency(existingCorpus)}</td>
                <td colSpan={2} rowSpan={2} className="border border-gray-300 p-1 px-2 bg-white"></td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-1 px-2 text-[#1f3864] font-bold">Annual Insurance Premiums (today)</td>
                <td className="border border-gray-300 p-1 px-2 text-center text-[#00b050] font-bold">{formatCurrency(annualInsurance)}</td>
                <td className="border border-gray-300 p-1 px-2 text-[#1f3864] font-bold">Annual Parent Support + Med. Fund (today)</td>
                <td className="border border-gray-300 p-1 px-2 text-center text-[#00b050] font-bold">{formatCurrency(annualParentSupport)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 1. Corpus Growth */}
        <div className="mb-6 bg-white overflow-hidden shadow-sm">
          <div className="bg-[#224A8C] text-white font-bold p-1 px-2">
            CORPUS GROWTH OVER YOUR LIFETIME (Age 18–90)
          </div>
          <div className="border border-gray-300 border-t-0 p-4">
            <h3 className="text-center text-sm font-bold text-gray-500 mb-2">Year-End Corpus by Age</h3>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={corpusData} margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
                  <CartesianGrid stroke="#d1d5db" vertical={false} />
                  <XAxis
                    dataKey="age"
                    type="number"
                    domain={[18, 90]}
                    tickCount={37}
                    tick={{ fontSize: 11, fill: '#000' }}
                    axisLine={{ stroke: '#000' }}
                    tickLine={false}
                    label={{ value: "Age", position: "bottom", offset: 0, style: { fontWeight: 'bold', fontSize: 12 } }}
                  />
                  <YAxis
                    tickFormatter={(val) => formatCurrency(val)}
                    tick={{ fontSize: 11, fill: '#000' }}
                    axisLine={false}
                    tickLine={false}
                    width={100}
                    label={{ value: "Corpus (₹)", angle: -90, position: "left", style: { fontWeight: 'bold', fontSize: 12 } }}
                  />
                  <RechartsTooltip formatter={(value: number) => formatCurrency(value)} labelFormatter={(label) => `Age: ${label}`} />
                  <Line type="monotone" dataKey="corpus" stroke="#224A8C" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 2. Income vs Outflow */}
        <div className="mb-6 bg-white overflow-hidden shadow-sm">
          <div className="bg-[#224A8C] text-white font-bold p-1 px-2">
            INCOME vs. TOTAL OUTFLOW (WORKING YEARS)
          </div>
          <div className="border border-gray-300 border-t-0 p-4">
            <h3 className="text-center text-sm font-bold text-gray-500 mb-2">Annual Income vs Annual Outflow (Savings-eligible years)</h3>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={incomeOutflowData} margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
                  <CartesianGrid stroke="#d1d5db" vertical={false} />
                  <XAxis
                    dataKey="age"
                    tick={{ fontSize: 11, fill: '#000' }}
                    axisLine={{ stroke: '#000' }}
                    tickLine={false}
                    label={{ value: "Age", position: "bottom", offset: 0, style: { fontWeight: 'bold', fontSize: 12 } }}
                  />
                  <YAxis
                    tickFormatter={(val) => formatCurrency(val)}
                    tick={{ fontSize: 11, fill: '#000' }}
                    axisLine={false}
                    tickLine={false}
                    width={100}
                    label={{ value: "₹ per year", angle: -90, position: "left", style: { fontWeight: 'bold', fontSize: 12 } }}
                  />
                  <RechartsTooltip formatter={(value: number) => formatCurrency(value)} labelFormatter={(label) => `Age: ${label}`} />
                  <Legend verticalAlign="middle" align="right" layout="vertical" iconType="square" />
                  <Bar dataKey="Income" name="Annual Income (₹)" fill="#2F5597" radius={0} barSize={8} />
                  <Bar dataKey="Outflow" name="Total Goal Funding (₹/yr)" fill="#C00000" radius={0} barSize={8} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 3. Monthly SIP Required By Goal */}
        <div className="mb-6 bg-white overflow-hidden shadow-sm">
          <div className="bg-[#224A8C] text-white font-bold p-1 px-2">
            MONTHLY SIP REQUIRED BY GOAL
          </div>
          <div className="border border-gray-300 border-t-0 p-4">
            <h3 className="text-center text-sm font-bold text-gray-500 mb-2">Monthly SIP by Goal (₹)</h3>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sipData}
                    cx="40%"
                    cy="50%"
                    innerRadius={0}
                    outerRadius={140}
                    dataKey="value"
                    stroke="#fff"
                  >
                    {sipData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip formatter={(value: number) => formatCurrency(value)} />
                  <Legend
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    iconType="square"
                    wrapperStyle={{ fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderRiskTab = () => {
    if (!isRiskValid) {
      return (
        <div className="text-center p-12 bg-white border border-primary/10 rounded-3xl shadow-xl max-w-lg mx-auto mt-10 animate-fade-in">
          <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
             <ShieldCheck className="w-10 h-10 text-accent" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-ink mb-4">No Risk Profile Found</h2>
          <p className="mb-8 text-primary/70">You haven't completed your risk assessment yet.</p>
          <Link to="/assessment" className="bg-primary text-cream hover:bg-ink inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-bold uppercase tracking-wide shadow-md hover:shadow-lg active:scale-95 transition-all">
            Start Assessment
          </Link>
        </div>
      );
    }
    return (
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-primary/10 max-w-2xl mx-auto mt-10 text-center animate-fade-in">
        <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="w-10 h-10 text-accent" />
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-ink mb-4">Your Risk Profile</h1>
        <p className="text-primary/70 mb-8 max-w-md mx-auto">
          Based on your answers, we've analyzed your investment risk appetite and prepared a recommended allocation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-left">
          <div className="bg-cream/50 p-6 rounded-2xl border border-primary/5">
            <span className="text-xs uppercase tracking-widest text-primary/50 font-bold mb-1 block">Risk Category</span>
            <span className="text-2xl font-bold text-accent">{riskData.category}</span>
          </div>
          <div className="bg-cream/50 p-6 rounded-2xl border border-primary/5">
            <span className="text-xs uppercase tracking-widest text-primary/50 font-bold mb-1 block">Total Score</span>
            <span className="text-2xl font-bold text-primary">{riskData.score} <span className="text-sm font-normal text-primary/60">/ 50</span></span>
          </div>
        </div>

        <div className="bg-ink text-cream p-6 rounded-2xl text-left">
          <span className="text-xs uppercase tracking-widest text-cream/50 font-bold mb-3 block">Suggested Broad Asset Allocation</span>
          <div className="font-medium leading-relaxed">
            {riskData.allocation?.split('|').map((part: string, idx: number) => (
              <div key={idx} className="flex items-center gap-2 mb-2 last:mb-0">
                <div className="w-2 h-2 rounded-full bg-accent" />
                {part.trim()}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-primary/10">
          <Link to="/assessment?retake=true" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold uppercase tracking-wide text-primary bg-primary/5 hover:bg-primary/10 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            Retake Assessment
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-cream/30 p-4 pt-28 font-sans">
      <div className="max-w-[1200px] mx-auto text-[13px]">
        {/* DASHBOARD Tabs Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-ink text-cream p-3 mb-6 rounded-2xl shadow-xl gap-4">
          <div className="text-xl sm:text-2xl font-serif font-bold px-3 whitespace-nowrap">DASHBOARD <span className="text-accent">—</span> Your Financial Plan</div>
          <div className="flex gap-2 p-1 bg-primary/20 rounded-xl shrink-0 overflow-x-auto w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('retirement')}
              className={`flex-1 sm:flex-none px-5 py-2.5 rounded-lg font-bold text-sm tracking-wide transition-all ${activeTab === 'retirement' ? 'bg-accent text-ink shadow-md' : 'text-cream hover:bg-white/10'}`}
            >
              Retirement Analysis
            </button>
            <button
              onClick={() => setActiveTab('risk')}
              className={`flex-1 sm:flex-none px-5 py-2.5 rounded-lg font-bold text-sm tracking-wide transition-all ${activeTab === 'risk' ? 'bg-accent text-ink shadow-md' : 'text-cream hover:bg-white/10'}`}
            >
              Risk Profile
            </button>
          </div>
        </div>

        {activeTab === 'retirement' ? renderRetirementTab() : renderRiskTab()}
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
