import React, { useState, useEffect } from 'react';
import { useAuth, UserProfile as AuthUserProfile } from '../context/AuthContext';
import { User, Mail, Calendar, MapPin, Save, ShieldCheck, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';

export default function Profile() {
  const { user, isLoggedIn, loginWithData } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    dateOfBirth: '',
    gender: 'male'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Load existing user data on mount
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: (user as any).email || '',
        address: (user as any).personalInfo?.address || '',
        dateOfBirth: (user as any).personalInfo?.dateOfBirth ? new Date((user as any).personalInfo.dateOfBirth).toISOString().split('T')[0] : '',
        gender: (user as any).personalInfo?.gender || 'male',
      });
    }
  }, [user]);

  if (!isLoggedIn || !user) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
      const response = await axios.put(`${apiUrl}/users/profile`, {
        name: formData.name,
        email: formData.email,
        personalInfo: {
          address: formData.address,
          dateOfBirth: formData.dateOfBirth,
          gender: formData.gender,
        }
      }, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      
      const updatedData = response.data;
      // Keep the existing token
      updatedData.token = user.token;
      
      // Update local storage and context
      loginWithData(updatedData);
      
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err: any) {
      console.error(err);
      setMessage({ 
        type: 'error', 
        text: err.response?.data?.message || 'Failed to update profile. Please try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-cream/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/50 mb-8">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <ChevronRight size={14} />
          <span className="text-primary">My Profile</span>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-primary/10 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary-light p-8 md:p-10 text-cream">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-accent text-white flex items-center justify-center text-3xl font-bold shadow-lg border-4 border-white/20">
                {user.name ? user.name.charAt(0).toUpperCase() : <User size={40} />}
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-serif font-bold">{user.name || 'Complete Your Profile'}</h1>
                <p className="text-cream/80 mt-1 flex items-center justify-center md:justify-start gap-2">
                  <ShieldCheck size={16} className="text-accent" />
                  Verified Phone: {user.phone}
                </p>
                {user.isPending && (
                  <span className="inline-block mt-3 bg-amber-500/20 text-amber-200 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider border border-amber-500/30">
                    Account Pending Approval
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {message.text && (
                <div className={`p-4 rounded-2xl text-sm font-semibold border ${
                  message.type === 'success' 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                    : 'bg-red-50 text-red-600 border-red-200'
                }`}>
                  {message.text}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Personal Information Group */}
                <div className="space-y-6">
                  <h3 className="text-lg font-serif font-bold text-ink border-b border-primary/10 pb-2">Personal Information</h3>
                  
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-primary/40">
                        <User size={18} />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full pl-11 pr-4 py-3 bg-cream/40 border-2 border-primary/10 rounded-xl text-ink focus:outline-none focus:border-accent focus:bg-white transition-colors text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-primary/40">
                        <Mail size={18} />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full pl-11 pr-4 py-3 bg-cream/40 border-2 border-primary/10 rounded-xl text-ink focus:outline-none focus:border-accent focus:bg-white transition-colors text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-2">
                      Date of Birth
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-primary/40">
                        <Calendar size={18} />
                      </div>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-3 bg-cream/40 border-2 border-primary/10 rounded-xl text-ink focus:outline-none focus:border-accent focus:bg-white transition-colors text-sm font-medium"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-2">
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-cream/40 border-2 border-primary/10 rounded-xl text-ink focus:outline-none focus:border-accent focus:bg-white transition-colors text-sm font-medium appearance-none"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Contact & Address Group */}
                <div className="space-y-6">
                  <h3 className="text-lg font-serif font-bold text-ink border-b border-primary/10 pb-2">Contact Details</h3>
                  
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-2">
                      Phone Number
                    </label>
                    <div className="px-4 py-3 bg-primary/5 border-2 border-transparent rounded-xl text-primary/60 text-sm font-semibold cursor-not-allowed flex items-center gap-2">
                      <ShieldCheck size={16} className="text-emerald-600" />
                      {user.phone}
                    </div>
                    <p className="text-[10px] text-primary/50 mt-1.5 ml-1">Phone number is verified and cannot be changed here.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-2">
                      Full Address
                    </label>
                    <div className="relative">
                      <div className="absolute top-3.5 left-0 pl-4 pointer-events-none text-primary/40">
                        <MapPin size={18} />
                      </div>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="123 Wealthy Street, Financial District..."
                        rows={4}
                        className="w-full pl-11 pr-4 py-3 bg-cream/40 border-2 border-primary/10 rounded-xl text-ink focus:outline-none focus:border-accent focus:bg-white transition-colors text-sm font-medium resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-primary/10 flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-primary text-cream hover:bg-ink disabled:opacity-50 py-3.5 px-8 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl active:scale-[0.98]"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-cream border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Save size={16} className="text-accent" />
                  )}
                  {isLoading ? 'Saving...' : 'Save Profile'}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
