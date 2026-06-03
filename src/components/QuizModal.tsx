/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, CheckCircle, Gem, ThumbsUp, AlertCircle } from 'lucide-react';
import { Language } from '../types';

interface QuizModalProps {
  onClose: () => void;
  onSuccess: (diamondsEarned: number, xpAdded: number) => void;
  lang: Language;
}

interface Question {
  id: number;
  question: string;
  questionEn: string;
  options: string[];
  correctIndex: number;
}

export default function QuizModal({ onClose, onSuccess, lang }: QuizModalProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: 'Resuelve para x: 2x + 5 = 11',
      questionEn: 'Solve for x: 2x + 5 = 11',
      options: ['x = 2', 'x = 3', 'x = 4', 'x = 6'],
      correctIndex: 1, // x = 3
    },
    {
      id: 2,
      question: 'Resuelve para y: 3y - 4 = y + 8',
      questionEn: 'Solve for y: 3y - 4 = y + 8',
      options: ['y = 3', 'y = 4', 'y = 6', 'y = 12'],
      correctIndex: 2, // y = 6
    },
  ];

  const currentQuestion = questions[currentIdx];

  const handleOptionSelect = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOpt(idx);
  };

  const handleSubmit = () => {
    if (selectedOpt === null) return;
    const correct = selectedOpt === currentQuestion.correctIndex;
    setIsCorrect(correct);
    setIsSubmitted(true);
  };

  const handleNext = () => {
    setSelectedOpt(null);
    setIsSubmitted(false);
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setQuizCompleted(true);
      // Earn 20 diamonds & increase XP metrics
      onSuccess(20, 30);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-[380px] rounded-3xl p-6 shadow-2xl relative border-2 border-emerald-100 overflow-hidden animate-fade-in">
        {/* Shine */}
        <div className="absolute top-0 inset-x-0 h-2 bg-brand-green"></div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {!quizCompleted ? (
          <div>
            {/* Header progress */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-[10px] font-extrabold bg-emerald-100 text-brand-green px-2.5 py-1 rounded-full uppercase tracking-wider">
                {lang === 'es' ? `Pregunta ${currentIdx + 1} de ${questions.length}` : `Question ${currentIdx + 1} of ${questions.length}`}
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-slate-500 font-mono">
                +20 <Gem className="w-3.5 h-3.5 text-brand-green" />
              </span>
            </div>

            {/* Question Text */}
            <h3 className="text-lg font-extrabold text-slate-800 mb-5 leading-snug">
              {lang === 'es' ? currentQuestion.question : currentQuestion.questionEn}
            </h3>

            {/* Options List */}
            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((opt, idx) => {
                const isSelected = selectedOpt === idx;
                const isItemCorrect = currentQuestion.correctIndex === idx;
                let btnStyle = 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-gray-700';

                if (isSubmitted) {
                  if (isItemCorrect) {
                    btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-700';
                  } else if (isSelected) {
                    btnStyle = 'border-rose-300 bg-rose-50 text-rose-700';
                  } else {
                    btnStyle = 'border-slate-100 opacity-60 text-slate-400';
                  }
                } else if (isSelected) {
                  btnStyle = 'border-brand-green bg-emerald-50 text-brand-green ring-1 ring-brand-green/35';
                }

                return (
                  <button
                    key={idx}
                    disabled={isSubmitted}
                    onClick={() => handleOptionSelect(idx)}
                    className={`w-full py-3.5 px-4 rounded-xl border-2 text-sm font-bold text-left transition-all cursor-pointer ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Answer Feedbacks */}
            {isSubmitted && (
              <div className={`mb-6 p-4 rounded-xl flex items-start gap-2.5 text-xs font-semibold ${
                isCorrect ? 'bg-emerald-50 border border-emerald-100 text-emerald-700' : 'bg-rose-50 border border-rose-100 text-rose-700'
              }`}>
                {isCorrect ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <p className="font-bold">{lang === 'es' ? '¡Excelente trabajo!' : 'Excellent job!'}</p>
                      <p className="font-normal mt-0.5">{lang === 'es' ? 'Has resuelto la ecuación correctamente.' : 'You resolved the equation correctly.'}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    <div>
                      <p className="font-bold">{lang === 'es' ? '¡Vaya! Respuesta incorrecta' : 'Incorrect answer'}</p>
                      <p className="font-normal mt-0.5">{lang === 'es' ? '¡No te rindas! Inténtalo de nuevo' : 'Do not give up! Try again'}</p>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Footer Buttons */}
            {!isSubmitted ? (
              <button
                onClick={handleSubmit}
                disabled={selectedOpt === null}
                className={`w-full py-3.5 rounded-2xl font-bold text-sm tracking-wide text-white border-b-4 transition select-none ${
                  selectedOpt === null 
                    ? 'bg-slate-300 border-slate-400 cursor-not-allowed opacity-70' 
                    : 'bg-brand-green hover:bg-brand-green-hover border-[#004d2e] cursor-pointer'
                }`}
              >
                {lang === 'es' ? 'Comprobar' : 'Check Code'}
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="w-full py-3.5 rounded-2xl font-bold text-sm tracking-wide text-white bg-brand-green hover:bg-brand-green-hover border-b-4 border-[#004d2e] cursor-pointer select-none"
              >
                {lang === 'es' ? 'Siguiente' : 'Next'}
              </button>
            )}
          </div>
        ) : (
          /* Victory celebration! */
          <div className="text-center py-4 flex flex-col items-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-brand-green mb-4">
              <CheckCircle className="w-10 h-10 fill-emerald-600 text-white" />
            </div>
            
            <h3 className="text-xl font-extrabold text-slate-850 mb-2">
              {lang === 'es' ? '¡Lección Completada!' : 'Lesson Completed!'}
            </h3>
            
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              {lang === 'es' 
                ? 'Has dominado el concepto de Ecuaciones Lineales. ¡Sigue así, las matemáticas son tu superpoder!' 
                : 'You have mastered Linear Equations. Keep it up, algebra is your superpower!'}
            </p>

            <div className="bg-emerald-50 rounded-2xl p-4 w-full flex justify-around mb-8 border border-emerald-100">
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">{lang === 'es' ? 'Experiencia' : 'Experience'}</span>
                <span className="text-lg font-extrabold text-gray-800 font-mono">+30 XP</span>
              </div>
              <div className="w-px bg-emerald-100"></div>
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">{lang === 'es' ? 'Premios' : 'Rewards'}</span>
                <span className="text-lg font-extrabold text-[#F5A623] flex items-center gap-1 font-mono">
                  +20 <Gem className="w-4 h-4 text-brand-green fill-brand-green" />
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-brand-green hover:bg-brand-green-hover text-white py-3.5 rounded-2xl font-black text-center shadow-md shadow-emerald-700/10 cursor-pointer border-b-4 border-[#004d2e]"
            >
              {lang === 'es' ? '¡Entendido!' : 'Got It!'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
