/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, BookOpen, ThumbsUp } from 'lucide-react';
import { Language } from '../types';

interface ArticleModalProps {
  onClose: () => void;
  onFinished: () => void;
  lang: Language;
}

export default function ArticleModal({ onClose, onFinished, lang }: ArticleModalProps) {
  
  const content = {
    es: {
      category: 'ARTÍCULO CIENTÍFICO',
      title: 'La magia de las variables en la vida real',
      body: `Probablemente te has preguntado: ¿Por qué usamos letras como "x" o "y" en matemáticas? ¿Acaso no bastaba con los números? 

Las variables no son más que "cajas vacías" que nos permiten describir relaciones universales en nuestro mundo físico y digital. Por ejemplo, la velocidad de un bólido, la trayectoria del satélite espacial de Google, o la cantidad de diamantes que necesitas para comprar ese avatar legendario que tanto quieres en EduNext.

Al usar una variable, estás creando una fórmula que funciona hoy, mañana y siempre, sin importar los valores exactos. Es el motor detrás de toda la computación moderna, desde los videojuegos en 3D hasta los algoritmos que guían la inteligencia artificial.`,
      action: 'He leído y comprendido el artículo'
    },
    en: {
      category: 'SCIENTIFIC ARTICLE',
      title: 'The Magic of Variables in Real Life',
      body: `You might have wondered: Why do we use letters like "x" or "y" in mathematics? Weren't numbers enough? 

Variables are simply "empty boxes" that allow us to describe universal relationships in our physical and digital world. For example, the speed of a racing car, the trajectory of a spacecraft satellite, or the amount of diamonds you need to purchase that legendary avatar you want in EduNext.

By using a variable, you are creating a formula that works today, tomorrow, and forever, no matter the exact values. It is the engine behind all modern computing, from 3D video games to algorithms that guide artificial intelligence.`,
      action: 'I have read and understood the article'
    }
  }[lang];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-[380px] rounded-3xl p-6 shadow-2xl relative border-2 border-emerald-100 overflow-hidden animate-fade-in">
        {/* Top brand line */}
        <div className="absolute top-0 inset-x-0 h-2 bg-emerald-600"></div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col">
          <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest mb-1.5 flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            {content.category}
          </span>

          <h3 className="text-xl font-extrabold text-slate-850 leading-tight mb-4">
            {content.title}
          </h3>

          <div className="text-sm font-medium text-slate-600 leading-relaxed max-h-[220px] overflow-y-auto mb-6 pr-2 scrollbar-hide whitespace-pre-line">
            {content.body}
          </div>

          <button 
            onClick={() => {
              onFinished();
              onClose();
            }}
            className="w-full bg-brand-green hover:bg-brand-green-hover text-white py-3 rounded-xl font-bold text-center text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 border-b-4 border-[#004d2e]"
          >
            <ThumbsUp className="w-4 h-4" />
            {content.action}
          </button>
        </div>
      </div>
    </div>
  );
}
