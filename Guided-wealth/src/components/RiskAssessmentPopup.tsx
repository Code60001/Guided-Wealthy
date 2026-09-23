import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldAlert, X, ArrowRight } from 'lucide-react';

export default function RiskAssessmentPopup() {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [hiddenPaths, setHiddenPaths] = useState<Record<string, boolean>>({});

  const hasRisk = user?.hasCompletedRiskAssessment;
  const hasRet = user?.hasCompletedRetirementAnalysis;

  useEffect(() => {
    // Only show on home or dashboard
    const isAllowedRoute = location.pathname === '/' || location.pathname === '/dashboard';
    const isHiddenForThisPath = hiddenPaths[location.pathname];
    
    // Show popup if user is logged in, has not completed both assessments, and is on an allowed route
    if (isLoggedIn && user && !user.isPending && (!hasRisk || !hasRet) && isAllowedRoute && !isHiddenForThisPath) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000); // 1s delay
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isLoggedIn, user, hasRisk, hasRet, location.pathname, hiddenPaths]);

  const handleDismiss = () => {
    setIsVisible(false);
    setHiddenPaths(prev => ({ ...prev, [location.pathname]: true }));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-ink/40 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn"
        onClick={handleDismiss}
      />
      <div className="bg-white rounded-3xl shadow-2xl border border-primary/10 overflow-hidden w-full max-w-md relative z-10 animate-scaleUp">
        <button 
          onClick={handleDismiss}
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
              {!hasRisk && !hasRet ? "Complete Your Financial Profile" : 
               !hasRisk ? "Analyze Your Wealth Risk" : 
               "Plan Your Retirement"}
            </h3>
          </div>
          
          <p className="text-sm text-primary/70 mb-5">
            {!hasRisk && !hasRet ? "Discover your personalized investment risk profile and generate your retirement plan." : 
             !hasRisk ? "Discover your personalized investment risk profile to get tailored recommendations for your portfolio." : 
             "Plan your future and see how much you need to save to retire comfortably."}
          </p>
          
          <div className="space-y-3">
            {!hasRisk && (
              <button
                onClick={() => {
                  handleDismiss();
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
                  handleDismiss();
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
