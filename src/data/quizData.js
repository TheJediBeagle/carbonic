import { Lightbulb, Droplets, Plane, Utensils } from 'lucide-react';

export const categories = [
    { id: 'electricity', label: 'Electricity', icon: Lightbulb, color: 'text-yellow-500' },
    { id: 'water', label: 'Water', icon: Droplets, color: 'text-blue-500' },
    { id: 'travel', label: 'Traveling', icon: Plane, color: 'text-purple-500' },
    { id: 'food', label: 'Food', icon: Utensils, color: 'text-green-500' },
];

export const questions = [
    {
        id: 'electricity_usage',
        category: 'electricity',
        question: 'How would you describe your household electricity usage?',
        options: [
            { label: 'Low (I turn off lights, use efficient appliances)', value: 0.8, score: 500 },
            { label: 'Average', value: 1.0, score: 1200 },
            { label: 'High (AC all day, many devices)', value: 1.5, score: 2500 },
        ],
    },
    {
        id: 'water_usage',
        category: 'water',
        question: 'How long represent your daily showers?',
        options: [
            { label: 'Short (< 5 mins)', value: 0.8, score: 300 },
            { label: 'Average (5-10 mins)', value: 1.0, score: 500 },
            { label: 'Long (> 15 mins)', value: 1.5, score: 1000 },
        ],
    },
    {
        id: 'travel_habits',
        category: 'travel',
        question: 'How do you mostly commute?',
        options: [
            { label: 'Public Transport / Walk / Bike', value: 0.3, score: 400 },
            { label: 'Hybrid / Electric Car', value: 0.7, score: 1500 },
            { label: 'Gasoline Car (Daily)', value: 1.2, score: 3500 },
        ],
    },
    {
        id: 'diet',
        category: 'food',
        question: 'What describes your diet best?',
        options: [
            { label: 'Vegan', value: 0.5, score: 1500 },
            { label: 'Vegetarian', value: 0.7, score: 1700 },
            { label: 'Meat Eater', value: 1.2, score: 3300 },
        ],
    },
];

export const calculateFootprint = (answers) => {
    let totalScore = 0;
    const breakdown = { electricity: 0, water: 0, travel: 0, food: 0 };

    questions.forEach((q) => {
        const answerIndex = answers[q.id];
        if (answerIndex !== undefined) {
            const option = q.options[answerIndex];
            totalScore += option.score;
            breakdown[q.category] += option.score;
        }
    });

    return { totalScore, breakdown };
};
