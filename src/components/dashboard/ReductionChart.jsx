import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const ReductionChart = () => {
    // Mock data for history
    const data = [
        { name: 'Jan', reduction: 120 },
        { name: 'Feb', reduction: 150 },
        { name: 'Mar', reduction: 180 },
        { name: 'Apr', reduction: 220 },
        { name: 'May', reduction: 250 },
        { name: 'Jun', reduction: 300 },
    ];

    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                    <Tooltip
                        cursor={{ fill: '#F3F4F6' }}
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="reduction" fill="#10B981" radius={[4, 4, 0, 0]} name="kg CO2 Reduced" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
