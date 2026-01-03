import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useNavigate } from 'react-router-dom';
import { questions, calculateFootprint, categories } from '../data/quizData';
import { Leaf, ArrowRight } from 'lucide-react';

export default function Onboarding() {
    const navigate = useNavigate();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isCompleted, setIsCompleted] = useState(false);

    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex) / questions.length) * 100;

    const handleOptionSelect = (optionIndex) => {
        const newAnswers = { ...answers, [currentQuestion.id]: optionIndex };
        setAnswers(newAnswers);

        if (currentQuestionIndex < questions.length - 1) {
            setTimeout(() => setCurrentQuestionIndex(currentQuestionIndex + 1), 300);
        } else {
            completeQuiz(newAnswers);
        }
    };

    const completeQuiz = (finalAnswers) => {
        const result = calculateFootprint(finalAnswers);
        localStorage.setItem('userFootprint', JSON.stringify(result));
        setIsCompleted(true);
        setTimeout(() => navigate('/dashboard'), 2000);
    };

    if (isCompleted) {
        return (
            <div className="min-h-screen bg-background text-text flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <div className="inline-block p-4 rounded-full bg-primary/10 mb-6">
                        <Leaf className="w-16 h-16 text-primary animate-pulse" />
                    </div>
                    <h2 className="text-3xl font-bold mb-2">Calculating Impact...</h2>
                    <p className="text-text/70">Building your personal eco-profile.</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-text flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
            </div>

            <div className="w-full max-w-xl z-10">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between text-sm font-medium text-text/60 mb-2">
                        <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="h-2 bg-black/5 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-primary"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestion.id}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -20, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Card className="min-h-[400px] flex flex-col justify-center">
                            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold self-start mb-4 uppercase tracking-wide">
                                {categories.find(c => c.id === currentQuestion.category)?.label}
                            </span>

                            <h2 className="text-2xl md:text-3xl font-bold mb-8 leading-tight">
                                {currentQuestion.question}
                            </h2>

                            <div className="space-y-3">
                                {currentQuestion.options.map((option, index) => (
                                    <Button
                                        key={index}
                                        variant="ghost"
                                        className="w-full justify-between items-center text-left hover:bg-black/5 border border-black/5 p-4 h-auto group"
                                        onClick={() => handleOptionSelect(index)}
                                    >
                                        <span className="font-medium">{option.label}</span>
                                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                                    </Button>
                                ))}
                            </div>
                        </Card>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
