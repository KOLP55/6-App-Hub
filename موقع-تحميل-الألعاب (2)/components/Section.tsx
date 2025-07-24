
import React from 'react';

interface SectionProps {
    title: string;
    subtitle?: string;
    showArrow?: boolean;
    children: React.ReactNode;
}

const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
);

const Section: React.FC<SectionProps> = ({ title, subtitle, showArrow = false, children }) => {
    return (
        <section>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                    {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
                </div>
                {showArrow && (
                    <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
                        <ArrowLeftIcon className="w-6 h-6" />
                    </button>
                )}
            </div>
            {children}
        </section>
    );
};

export default Section;
