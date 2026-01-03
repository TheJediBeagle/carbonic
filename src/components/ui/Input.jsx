import React from 'react';

export const Input = ({ label, className = '', error, ...props }) => {
    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            {label && <label className="text-sm font-medium text-text/80 ml-1">{label}</label>}
            <input
                className="px-4 py-3 rounded-xl border border-black/10 bg-white/50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200"
                {...props}
            />
            {error && <span className="text-red-500 text-xs ml-1">{error}</span>}
        </div>
    );
};
