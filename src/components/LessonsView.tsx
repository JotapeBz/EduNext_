/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowLeft, Check, Play, Lock, ChevronRight, Award } from 'lucide-react';
import { Lesson, Language } from '../types';

interface LessonsViewProps {
  lessons: Lesson[];
  lang: Language;
  onSelectLesson: (lesson: Lesson) => void;
  xpProgress: number;
}

export default function LessonsView({ lessons, lang, onSelectLesson, xpProgress }: LessonsViewProps) {
  
  const t = {
    es: {
      unitTitle: 'Unidad 2: Álgebra',
      currentModule: 'MÓDULO ACTUAL',
      moduleName: 'Conceptos Básicos',
      completedText: 'Completado',
      lessonsHeader: 'Lecciones',
      lessonWord: 'Lección',
      nextWord: 'Siguiente',
      lockedWord: 'Bloqueado',
      playTooltip: 'Click para resolver ecuaciones y ganar diamantes'
    },
    en: {
      unitTitle: 'Unit 2: Algebra',
      currentModule: 'CURRENT MODULE',
      moduleName: 'Basic Concepts',
      completedText: 'Completed',
      lessonsHeader: 'Lessons',
      lessonWord: 'Lesson',
      nextWord: 'Next',
      lockedWord: 'Locked',
      playTooltip: 'Click to solve equations and earn diamonds'
    }
  }[lang];

  return (
    <div className="flex flex-col pb-6">
      {/* Unit Header */}
      <div className="flex items-center gap-3.5 mt-2 mb-6">
        <button 
          className="w-10 h-10 rounded-full bg-emerald-100/70 hover:bg-emerald-100 flex items-center justify-center text-emerald-900 shadow-sm transition active:scale-95 cursor-pointer"
          title={lang === 'es' ? 'Volver al Inicio' : 'Back to Home'}
        >
          <ArrowLeft className="h-5 w-5 stroke-[2.5]" />
        </button>
        <h1 className="text-[21px] font-extrabold text-gray-800 tracking-tight">
          {t.unitTitle}
        </h1>
      </div>

      {/* Module Progress Card */}
      <section className="bg-white rounded-3xl p-5 shadow-[0_8px_30px_rgba(0,105,63,0.03)] mb-6 border border-emerald-500/5 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-emerald-50 rounded-full opacity-40 pointer-events-none"></div>

        <span className="inline-block px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-3 relative z-10">
          {t.currentModule}
        </span>
        
        <div className="flex justify-between items-end mb-4 relative z-10">
          <h2 className="text-lg font-bold text-gray-850 leading-tight">
            {t.moduleName}
          </h2>
          <div className="text-right flex flex-col items-end">
            <span className="block text-2xl font-black text-brand-green leading-none mb-0.5">
              {xpProgress}%
            </span>
            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">
              {t.completedText}
            </span>
          </div>
        </div>

        {/* Progress Bar Track */}
        <div className="h-3.5 bg-slate-100 rounded-full overflow-hidden w-full relative z-10">
          {/* Progress Fill */}
          <div 
            className="h-full bg-brand-green rounded-full relative transition-all duration-500"
            style={{ width: `${xpProgress}%` }}
          >
            {/* Shine effect on progress bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-white/20 rounded-t-full"></div>
          </div>
        </div>
      </section>

      {/* Lessons List */}
      <section>
        <h3 className="text-[12px] text-gray-405 font-bold uppercase tracking-wider mb-3.5 ml-1">
          {t.lessonsHeader}
        </h3>
        
        <div className="flex flex-col gap-3.5">
          {lessons.map((lesson) => {
            const isCompleted = lesson.status === 'completed';
            const isActive = lesson.status === 'active';
            const isLocked = lesson.status === 'locked';

            if (isCompleted) {
              return (
                <article 
                  key={lesson.id} 
                  className="bg-white rounded-2xl p-2 pr-5 flex items-center gap-4 border border-slate-100 shadow-[0_4px_15px_rgba(0,0,0,0.01)]"
                >
                  <div className="w-14 h-14 shrink-0 rounded-full flex items-center justify-center bg-white border-2 border-emerald-100/70 relative">
                    <div className="w-9 h-9 rounded-full bg-brand-green flex items-center justify-center text-white">
                      <Check className="h-5 w-5 stroke-[3]" />
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-400 font-bold mb-0.5">
                      {t.lessonWord} {lesson.number}
                    </div>
                    <div className="font-bold text-gray-700 text-sm">
                      {lang === 'es' ? lesson.title : lesson.titleEn}
                    </div>
                  </div>
                </article>
              );
            }

            if (isActive) {
              return (
                <article 
                  key={lesson.id}
                  onClick={() => onSelectLesson(lesson)}
                  className="bg-brand-green rounded-2xl p-2 pr-5 flex items-center gap-4 shadow-[0_8px_22px_rgba(0,105,63,0.18)] relative cursor-pointer active:scale-[0.98] transition hover:bg-brand-green-hover group"
                  title={t.playTooltip}
                >
                  {/* Subtle inner glow */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-white/10 pointer-events-none"></div>
                  
                  <div className="w-14 h-14 shrink-0 rounded-full flex items-center justify-center bg-emerald-600/50">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-brand-green shadow-sm pl-0.5 group-hover:scale-105 transition-transform duration-150">
                      <Play className="h-5 w-5 fill-current" />
                    </div>
                  </div>
                  
                  <div className="flex-1 py-1">
                    <div className="text-[11px] text-emerald-100 font-semibold mb-0.5 flex items-center gap-1.5 font-sans">
                      {t.lessonWord} {lesson.number}
                      <span className="w-1 h-1 rounded-full bg-emerald-100"></span>
                      {t.nextWord}
                    </div>
                    <div className="font-extrabold text-white text-[15px] leading-tight">
                      {lang === 'es' ? lesson.title : lesson.titleEn}
                    </div>
                  </div>
                  
                  <div className="text-white/80 pr-1 group-hover:translate-x-1 transition-transform">
                    <ChevronRight className="h-5 w-5 stroke-[2.5]" />
                  </div>
                </article>
              );
            }

            // Locked
            return (
              <article 
                key={lesson.id} 
                className="bg-emerald-50/20 rounded-2xl p-2 pr-5 flex items-center gap-4 opacity-55 border border-dashed border-slate-200"
              >
                <div className="w-14 h-14 shrink-0 rounded-full flex items-center justify-center border-2 border-dashed border-slate-300">
                  <div className="text-slate-400">
                    <Lock className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-gray-400 font-bold mb-0.5">
                    {t.lessonWord} {lesson.number}
                  </div>
                  <div className="font-bold text-slate-500 text-sm">
                    {lang === 'es' ? lesson.title : lesson.titleEn}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
