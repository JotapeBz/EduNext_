/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Target, BookOpen, PenTool, CheckCircle, Flame } from 'lucide-react';
import { Challenge, Language } from '../types';

interface ChallengesViewProps {
  challenges: Challenge[];
  lang: Language;
  onSolveChallenge: (challengeId: string) => void;
  langProgressPercent: number; // calculated weekly percentage
}

export default function ChallengesView({ challenges, lang, onSolveChallenge, langProgressPercent }: ChallengesViewProps) {
  
  const t = {
    es: {
      title: 'Desafíos Diarios',
      subtitle: 'Completa los retos para ganar diamantes y subir de nivel.',
      keepGoing: '¡Sigue así!',
      weeklyText: `Has completado el ${langProgressPercent}% de tus metas semanales.`,
      progressLabel: 'Progreso',
      continueBtn: 'Continuar',
      startBtn: 'Comenzar',
      completeBtn: 'Completar',
      almostBadge: '¡Casi!',
      completedBadge: '¡Completado!',
      unlockedBonus: '¡Bono de Diamantes Reclamado!'
    },
    en: {
      title: 'Daily Challenges',
      subtitle: 'Complete goals to earn diamonds and level up your progress.',
      keepGoing: 'Keep it up!',
      weeklyText: `You have completed ${langProgressPercent}% of your weekly goals.`,
      progressLabel: 'Progress',
      continueBtn: 'Continue',
      startBtn: 'Start',
      completeBtn: 'Complete',
      almostBadge: 'Almost!',
      completedBadge: 'Completed!',
      unlockedBonus: 'Diamond Bonus Claimed!'
    }
  }[lang];

  return (
    <div className="pb-6">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">
          {t.title}
        </h1>
        <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* Weekly Goal Card */}
      <div className="bg-brand-green rounded-3xl p-5 mb-6 text-white shadow-[0_8px_25px_rgba(0,105,63,0.15)] relative overflow-hidden">
        {/* Decorative ambient lights */}
        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-emerald-600 rounded-full opacity-40 pointer-events-none"></div>

        <div className="flex justify-between items-start mb-3.5 relative z-10">
          <div className="flex items-center space-x-2.5">
            <div className="bg-white/20 p-2 rounded-full">
              {langProgressPercent === 100 ? (
                <CheckCircle className="h-5.5 w-5.5 text-emerald-200 fill-emerald-800" />
              ) : (
                <Flame className="h-5.5 w-5.5 text-white fill-amber-400 stroke-amber-500" />
              )}
            </div>
            <span className="font-bold text-[17px]">
              {t.keepGoing}
            </span>
          </div>
          <span className="font-mono font-extrabold text-lg">
            {langProgressPercent}%
          </span>
        </div>
        
        <p className="text-emerald-100/90 text-[13px] mb-4.5 relative z-10 font-medium leading-normal">
          {t.weeklyText}
        </p>

        {/* Progress Bar Track */}
        <div className="h-3 bg-emerald-750/30 rounded-full overflow-hidden relative z-10">
          <div 
            className="h-full bg-white rounded-full transition-all duration-500"
            style={{ width: `${langProgressPercent}%` }}
          />
        </div>
      </div>

      {/* Challenges List */}
      <div className="space-y-4">
        {challenges.map((challenge) => {
          const isCompleted = challenge.progress >= challenge.target;
          const isAlmost = !isCompleted && (challenge.progress / challenge.target) >= 0.75;
          const isOrthography = challenge.id === 'orthography_challenge';

          return (
            <div 
              key={challenge.id} 
              className={`bg-white rounded-2xl p-4.5 shadow-[0_4px_16px_rgba(0,0,0,0.015)] border transition-all duration-200 flex flex-col space-y-4 relative overflow-hidden ${
                isAlmost ? 'border-amber-100 ring-1 ring-amber-50/50' : 'border-slate-100'
              }`}
            >
              {isAlmost && (
                <div className="absolute top-0 right-0 bg-orange-100 text-orange-600 text-[9px] font-extrabold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                  {t.almostBadge}
                </div>
              )}
              {isCompleted && (
                <div className="absolute top-0 right-0 bg-emerald-50 text-emerald-600 text-[9px] font-extrabold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                  {t.completedBadge}
                </div>
              )}

              <div className="flex items-start space-x-3.5">
                {/* Custom Icon wrapper */}
                <div className={`p-3 rounded-xl shrink-0 ${
                  isCompleted ? 'bg-emerald-50' : isAlmost ? 'bg-amber-50' : 'bg-slate-50'
                }`}>
                  {challenge.iconName === 'calculator' && (
                    <Target className={`h-6 w-6 ${isCompleted ? 'text-brand-green' : 'text-slate-500'}`} />
                  )}
                  {challenge.iconName === 'book' && (
                    <BookOpen className={`h-6 w-6 ${isCompleted ? 'text-brand-green' : 'text-slate-500'}`} />
                  )}
                  {challenge.iconName === 'pencil' && (
                    <PenTool className={`h-6 w-6 ${isCompleted ? 'text-brand-green' : 'text-orange-500'}`} />
                  )}
                </div>

                <div className="flex-1 min-w-0 pr-8">
                  <h3 className="font-extrabold text-gray-850 leading-tight text-sm md:text-base">
                    {lang === 'es' ? challenge.title : challenge.titleEn}
                  </h3>
                  
                  <div className="flex justify-between items-end mt-1.5 font-sans">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                      {t.progressLabel}
                    </span>
                    <span className={`text-xs font-extrabold ${isAlmost ? 'text-[#F5A623]' : 'text-gray-700'}`}>
                      {challenge.progress}/{challenge.target}
                    </span>
                  </div>

                  {/* Micro Progress Track */}
                  <div className="h-2 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        isCompleted ? 'bg-brand-green' : isAlmost ? 'bg-[#F5A623]' : 'bg-slate-300'
                      }`}
                      style={{ width: `${Math.min(100, (challenge.progress / challenge.target) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Button */}
              {!isCompleted ? (
                <button 
                  onClick={() => onSolveChallenge(challenge.id)}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs md:text-sm border-2 transition-colors cursor-pointer select-none ${
                    isAlmost 
                    ? 'bg-brand-green text-white hover:bg-brand-green-hover border-brand-green shadow-md shadow-emerald-700/5' 
                    : 'border-brand-green text-brand-green bg-white hover:bg-emerald-50'
                  }`}
                >
                  {challenge.id === 'algebra_equations' 
                    ? t.continueBtn 
                    : challenge.id === 'read_articles' 
                      ? t.startBtn 
                      : t.completeBtn
                  }
                </button>
              ) : (
                <span className="text-center font-bold text-xs text-brand-green bg-emerald-50 border border-emerald-100 py-2 rounded-xl block">
                  ✓ {t.unlockedBonus} (+{challenge.rewardDiamonds} 💎)
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
