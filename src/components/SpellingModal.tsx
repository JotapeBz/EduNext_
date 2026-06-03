/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, PenTool, CheckCircle, HelpCircle, Gem } from 'lucide-react';
import { Language } from '../types';

interface SpellingModalProps {
  onClose: () => void;
  onFinished: () => void;
  lang: Language;
}

export default function SpellingModal({ onClose, onFinished, lang }: SpellingModalProps) {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const t = {
    es: {
      title: 'Ortografía perfecta',
      label: 'Selecciona la palabra correctamente acentuada y escrita en español:',
      action: 'Comprobar',
      next: 'Completar desafío',
      correctFeedback: '¡Correcto! "Álgebra" es una palabra esdrújula, por tanto, siempre se acentúa en la primera "Á".',
      wrongFeedback: '¡Ups! Inténtalo de nuevo. Recuerda las reglas de acentuación de las palabras esdrújulas.'
    },
    en: {
      title: 'Perfect Spelling',
      label: 'Select the correctly spelled and accented word in Spanish:',
      action: 'Verify',
      next: 'Complete challenge',
      correctFeedback: 'Correct! "Álgebra" has its main stress on the first syllable so it requires a written accent: "Á".',
      wrongFeedback: 'Oops! Let\'s try again. Remember esdrújula words are always accented.'
    }
  }[lang];

  const words = ['Algebra', 'Álgebra', 'Algebla'];
  const correctWord = 'Álgebra';

  const handleSelect = (word: string) => {
    if (submitted) return;
    setSelectedWord(word);
  };

  const handleVerify = () => {
    if (!selectedWord) return;
    const correct = selectedWord === correctWord;
    setIsCorrect(correct);
    setSubmitted(true);
  };

  const handleFinish = () => {
    if (isCorrect) {
      onFinished();
      onClose();
    } else {
      // Allow re-trying
      setSelectedWord(null);
      setSubmitted(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-[380px] rounded-3xl p-6 shadow-2xl relative border-2 border-emerald-100 overflow-hidden animate-fade-in">
        {/* Top accent border */}
        <div className="absolute top-0 inset-x-0 h-2 bg-emerald-600"></div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1.5 flex items-center gap-1">
            <PenTool className="w-3.5 h-3.5" />
            {t.title}
          </span>

          <p className="text-sm font-bold text-slate-700 leading-snug mb-5">
            {t.label}
          </p>

          {/* Words selector */}
          <div className="space-y-2.5 mb-5">
            {words.map((word) => {
              const selected = selectedWord === word;
              let style = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100';

              if (submitted) {
                if (word === correctWord) {
                  style = 'bg-emerald-50 border-emerald-500 text-emerald-700 font-extrabold';
                } else if (selected) {
                  style = 'bg-rose-50 border-rose-400 text-rose-700';
                } else {
                  style = 'bg-slate-50 border-slate-100 text-slate-400 opacity-60';
                }
              } else if (selected) {
                style = 'bg-emerald-50 border-brand-green text-brand-green font-extrabold';
              }

              return (
                <button
                  key={word}
                  disabled={submitted}
                  onClick={() => handleSelect(word)}
                  className={`w-full py-3.5 px-4 font-mono font-bold text-center border-2 rounded-xl transition cursor-pointer ${style}`}
                >
                  {word}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {submitted && (
            <div className={`p-3.5 rounded-xl text-xs font-semibold mb-6 border ${
              isCorrect ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-rose-50 border-rose-100 text-rose-700'
            }`}>
              <p className="flex items-center gap-1.5 mb-0.5">
                <HelpCircle className="w-4 h-4" />
                {isCorrect ? '¡Excelente!' : '¡Oops!'}
              </p>
              <p className="font-normal font-sans leading-relaxed">{isCorrect ? t.correctFeedback : t.wrongFeedback}</p>
            </div>
          )}

          {/* Action buttons */}
          {!submitted ? (
            <button
              onClick={handleVerify}
              disabled={selectedWord === null}
              className={`w-full py-3 rounded-xl font-bold font-sans text-sm tracking-wide text-white border-b-4 transition cursor-pointer select-none ${
                selectedWord === null 
                  ? 'bg-slate-300 border-slate-400 cursor-not-allowed opacity-70' 
                  : 'bg-brand-green hover:bg-brand-green-hover border-[#004d2e]'
              }`}
            >
              {t.action}
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="w-full bg-brand-green hover:bg-brand-green-hover text-white py-3 rounded-xl font-bold font-sans text-center text-sm shadow-md cursor-pointer border-b-4 border-[#004d2e] select-none"
            >
              {isCorrect ? t.next : (lang === 'es' ? 'Intentar de nuevo' : 'Retry')}
            </button>
          )}

        </div>
      </div>
    </div>
  );
}
