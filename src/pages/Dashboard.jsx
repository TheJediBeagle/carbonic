import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { FootprintPieChart } from '../components/dashboard/FootprintPieChart';
import { ReductionChart } from '../components/dashboard/ReductionChart';
import { ArrowUpRight, TrendingDown, Globe, Lightbulb } from 'lucide-react';

export default function Dashboard() {
    const navigate = useNavigate();
    const [footprintData, setFootprintData] = useState(null);

    useEffect(() => {
        const data = localStorage.getItem('userFootprint');
        if (!data) {
            navigate('/onboarding');
            return;
        }
        setFootprintData(JSON.parse(data));
    }, [navigate]);

    if (!footprintData) return null;

    const totalFootprint = footprintData.totalScore;
    const globalAverage = 4500; // ~4.5 tons
    const comparison = ((totalFootprint - globalAverage) / globalAverage) * 100;
    const isLower = totalFootprint < globalAverage;

    return (
        <div className="min-h-screen bg-background text-text p-4 md:p-8">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-text">Dashboard</h1>
                    <p className="text-text/60 mt-1">Your environmental impact overview.</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate('/onboarding')}>
                    Retake Quiz
                </Button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Total Footprint Stats */}
                <Card className="md:col-span-2">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <h3 className="text-lg font-bold text-text/80">Annual Carbon Footprint</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${isLower ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                            {isLower ? 'Below Average' : 'Above Average'}
                        </span>
                    </div>
                    <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-5xl font-bold text-secondary">{totalFootprint}</span>
                        <span className="text-xl text-text/60">kg CO2e</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-text/70 mb-6">
                        <Globe className="w-4 h-4" />
                        <span>Global Average: {globalAverage} kg</span>
                        <span className={`flex items-center ml-2 ${isLower ? 'text-green-600' : 'text-orange-600'}`}>
                            ({Math.abs(comparison).toFixed(1)}% {isLower ? 'lower' : 'higher'})
                        </span>
                    </div>

                    <div className="mt-8">
                        <h4 className="text-sm font-semibold mb-3">Breakdown by Category</h4>
                        <div className="h-[250px]">
                            <FootprintPieChart data={footprintData.breakdown} />
                        </div>
                    </div>
                </Card>

                {/* Reduction Tips & Progress */}
                <div className="space-y-6">
                    <Card title="Reduction Progress">
                        <div className="mb-2 flex items-center gap-2 text-green-600">
                            <TrendingDown className="w-5 h-5" />
                            <span className="font-bold text-lg">12% Improved</span>
                        </div>
                        <p className="text-sm text-text/60 mb-4">You've reduced 1,200kg CO2 this year!</p>
                        <div className="h-[200px]">
                            <ReductionChart />
                        </div>
                    </Card>

                    <Card title="Quick Tips">
                        <div className="space-y-4">
                            <div className="flex gap-3 p-3 rounded-xl bg-orange-50 border border-orange-100">
                                <Lightbulb className="w-5 h-5 text-orange-500 flex-shrink-0" />
                                <div>
                                    <h5 className="font-semibold text-sm text-orange-900">Switch to LEDs</h5>
                                    <p className="text-xs text-orange-800/80 mt-1">Save up to 150kg CO2/year by changing 5 bulbs.</p>
                                </div>
                            </div>
                            <div className="flex gap-3 p-3 rounded-xl bg-blue-50 border border-blue-100">
                                <div className="w-5 h-5 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 text-xs font-bold">2</div>
                                <div>
                                    <h5 className="font-semibold text-sm text-blue-900">Reduce Shower Time</h5>
                                    <p className="text-xs text-blue-800/80 mt-1">Cut 2 mins to save 50kg CO2/year.</p>
                                </div>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm" className="w-full mt-4 text-primary">View All Tips <ArrowUpRight className="w-4 h-4 ml-1" /></Button>
                    </Card>
                </div>
            </div>
        </div>
    );
}
