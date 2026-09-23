import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, X, ArrowRight } from 'lucide-react';

export default function RiskAssessmentPopup() {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  const hasRisk = user?.hasCompletedRiskAssessment;
  
  const dataStr = localStorage.getItem('retirement_analysis');
  let hasRet = false;
  try {
    if (dataStr) {
      const d = JSON.parse(dataStr);
      hasRet = !!(d && d.inputs && d.inputs.currentAge !== '' && d.inputs.currentAge > 0);
    }
  } catch(e) {}

  useEffect(() => {
    // Show popup if user is logged in, has not completed both assessments, and is not pending
    if (isLoggedIn && user && !user.isPending && (!hasRisk || !hasRet)) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500); // Small delay after login for smooth UX
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isLoggedIn, user, hasRisk, hasRet]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-ink/40 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn"
        onClick={() => setIsVisible(false)}
      />
      <div className="bg-white rounded-3xl shadow-2xl border border-primary/10 overflow-hidden w-full max-w-md relative z-10 animate-scaleUp">
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-3 right-3 text-primary/40 hover:text-primary transition-colors bg-cream/50 rounded-full p-1"
        >
          <X size={16} />
        </button>
        
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
              <ShieldAlert size={20} />
            </div>
            <h3 className="font-serif font-bold text-ink text-lg leading-tight">
              Analyze Your Wealth Risk
            </h3>
          </div>
          
          <p className="text-sm text-primary/70 mb-5">
            Discover your personalized investment risk profile to get tailored recommendations for your portfolio.
          </p>
          
          <div className="space-y-3">
            {!hasRisk && (
              <button
                onClick={() => {
                  setIsVisible(false);
                  navigate('/assessment');
                }}
                className="w-full bg-primary hover:bg-ink text-cream py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                Start Risk Profiler
                <ArrowRight size={16} className="text-accent" />
              </button>
            )}
            {!hasRet && (
              <button
                onClick={() => {
                  setIsVisible(false);
                  navigate('/retirement-analysis');
                }}
                className="w-full bg-cream hover:bg-accent/10 text-primary border border-primary/20 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all hover:border-accent active:scale-95"
              >
                Start Retirement Analysis
                <ArrowRight size={16} className="text-accent" />
              </button>
            )}
          </div>
        </div>
        
        {/* Decorative bottom bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-primary via-accent to-accent-light" />
      </div>
    </div>
  );
}
