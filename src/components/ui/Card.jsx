import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({ children, className = '', title, ...props }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6 ${className}`}
            {...props}
        >
            {title && <h3 className="text-xl font-bold text-text mb-4">{title}</h3>}
            {children}
        </motion.div>
    );
};
