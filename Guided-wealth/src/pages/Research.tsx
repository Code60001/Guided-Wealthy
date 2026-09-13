import React from 'react';
import { BookOpen } from 'lucide-react';

export default function Research() {
    return (
        <div className="bg-cream min-h-screen">
            <section className="pt-36 md:pt-40 pb-24 px-6 md:px-12 lg:px-20">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 space-y-6">
                        <div className="inline-flex items-center justify-center p-4 bg-primary/5 rounded-full text-primary mb-4">
                            <BookOpen size={40} />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-primary tracking-tight">
                            Research & Insights
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            Deep dive into market trends, economic analysis, and investment strategies.
                        </p>
                    </div>
                    {/* Placeholder for actual research content */}
                    <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-200 text-center text-slate-500">
                        Research content coming soon...
                    </div>
                </div>
            </section>
        </div>
    );
}
