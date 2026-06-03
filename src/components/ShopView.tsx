/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Shield, Dices, Gift, Bolt, User, Medal, Gem } from 'lucide-react';
import { RewardItem, Language } from '../types';

interface ShopViewProps {
  diamonds: number;
  onPurchaseReward: (itemId: string, cost: number) => void;
  purchasedRewards: string[];
  lang: Language;
}

export default function ShopView({ diamonds, onPurchaseReward, purchasedRewards, lang }: ShopViewProps) {
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [errorToast, setErrorToast] = useState<string | null>(null);

  const t = {
    es: {
      title: 'Tienda de Recompensas',
      subtitle: 'Canjea tus diamantes por ventajas exclusivas. Potencia tu aprendizaje.',
      buyBtn: 'Canjear',
      popularBadge: 'Popular',
      successMsg: '¡Pase canjeado con éxito!',
      insufficientMsg: '¡No tienes suficientes diamantes!',
      alreadyOwned: 'Adquirido',
    },
    en: {
      title: 'Reward Shop',
      subtitle: 'Exchange your diamonds for exclusive perks. Power up your learning.',
      buyBtn: 'Redeem',
      popularBadge: 'Popular',
      successMsg: 'Perk unlocked successfully!',
      insufficientMsg: 'Not enough diamonds!',
      alreadyOwned: 'Purchased',
    }
  }[lang];

  const initialItems: RewardItem[] = [
    {
      id: 'racha_shield',
      name: 'Protector de Racha',
      nameEn: 'Streak Shield',
      description: 'Evita perder tu racha un día',
      descriptionEn: "Keeps streak alive for one inactive day",
      cost: 50,
      icon: 'shield',
    },
    {
      id: 'double_nothing',
      name: 'Doble o Nada',
      nameEn: 'Double or Nothing',
      description: 'Apuesta tu progreso diario',
      descriptionEn: 'Double your daily progress stake',
      cost: 5,
      icon: 'dice',
      badge: 'Popular',
      badgeEn: 'Popular',
    },
    {
      id: 'mystery_chest',
      name: 'Cofre Misterioso',
      nameEn: 'Mystery Chest',
      description: 'Premios sorpresa aleatorios',
      descriptionEn: 'Random exciting bonus rewards',
      cost: 25,
      icon: 'gift',
    },
    {
      id: 'xp_boost',
      name: 'Vitamina de XP',
      nameEn: 'XP Booster',
      description: 'Experiencia x1.5 por 24h',
      descriptionEn: '1.5x experience points boost for 24h',
      cost: 40,
      icon: 'bolt',
    },
    {
      id: 'legendary_avatar',
      name: 'Avatar Legendario',
      nameEn: 'Legendary Avatar',
      description: 'Personalización exclusiva',
      descriptionEn: 'Exclusive custom portrait border style',
      cost: 100,
      icon: 'profile',
    },
    {
      id: 'exam_pass',
      name: 'Pase de Examen',
      nameEn: 'Exam Pass',
      description: 'Repite una prueba fallada',
      descriptionEn: 'Get a re-do safety check on failed exams',
      cost: 150,
      icon: 'medal',
    },
  ];

  const handlePurchase = (item: RewardItem) => {
    if (diamonds >= item.cost) {
      onPurchaseReward(item.id, item.cost);
      setSuccessToast(`${t.successMsg} - ${lang === 'es' ? item.name : item.nameEn}`);
      setErrorToast(null);
      setTimeout(() => setSuccessToast(null), 3000);
    } else {
      setErrorToast(`${t.insufficientMsg} (${diamonds}/${item.cost} 💎)`);
      setSuccessToast(null);
      setTimeout(() => setErrorToast(null), 3500);
    }
  };

  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case 'shield':
        return <Shield className="w-9 h-9 text-[#006D44]" />;
      case 'dice':
        return <Dices className="w-9 h-9 text-[#F5A623]" />;
      case 'gift':
        return <Gift className="w-9 h-9 text-slate-500" />;
      case 'bolt':
        return <Bolt className="w-9 h-9 text-[#006D44]" />;
      case 'profile':
        return <User className="w-9 h-9 text-[#F5A623]" />;
      case 'medal':
        return <Medal className="w-9 h-9 text-slate-500" />;
      default:
        return <Gift className="w-9 h-9 text-slate-500" />;
    }
  };

  return (
    <div className="pb-6">
      {/* Toast notifications */}
      {successToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[340px] bg-emerald-600 border border-emerald-500 text-white text-xs py-3 px-4 rounded-xl shadow-lg flex items-center justify-center font-bold text-center gap-2 animate-bounce">
          <Gem className="w-4 h-4 fill-white" />
          {successToast}
        </div>
      )}
      {errorToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[340px] bg-red-600 border border-red-500 text-white text-xs py-3 px-4 rounded-xl shadow-lg flex items-center justify-center font-bold text-center gap-1">
          {errorToast}
        </div>
      )}

      {/* Header Section */}
      <section className="text-center mb-8 mt-2">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2 leading-tight">
          {lang === 'es' ? <>Tienda de<br/>Recompensas</> : <>Reward<br/>Shop</>}
        </h1>
        <p className="text-slate-600 text-xs md:text-sm px-4">
          {t.subtitle}
        </p>
      </section>

      {/* Store Items Grid */}
      <section className="grid grid-cols-2 gap-3.5">
        {initialItems.map((item) => {
          const isPopular = item.badge && lang === 'es' ? true : !!item.badgeEn;
          const isOwned = purchasedRewards.includes(item.id);

          return (
            <article 
              key={item.id} 
              className="bg-white rounded-2xl p-4 flex flex-col items-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 relative group transition hover:scale-[1.01]"
            >
              {isPopular && (
                <div className="absolute -top-2.5 right-3.5 bg-[#F5A623] text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm z-10">
                  {lang === 'es' ? item.badge : item.badgeEn}
                </div>
              )}

              {/* Icon Container with background tint based on color theme of image */}
              <div className={`w-14 h-14 rounded-xl flex justify-center items-center mb-3.5 ${
                item.icon === 'shield' || item.icon === 'bolt' ? 'bg-[#E6F6ED]' : 
                item.icon === 'dice' || item.icon === 'profile' ? 'bg-[#FDF6E3]' : 'bg-[#F5F7FA]'
              }`}>
                {renderIcon(item.icon)}
              </div>

              <h2 className="font-extrabold text-gray-800 text-xs md:text-sm mb-1 leading-tight min-h-[32px] flex items-center justify-center">
                {lang === 'es' ? item.name : item.nameEn}
              </h2>
              
              <p className="text-[10px] md:text-xs text-slate-400 mb-4 h-6 leading-tight flex items-center justify-center">
                {lang === 'es' ? item.description : item.descriptionEn}
              </p>

              {/* Button */}
              {item.icon === 'medal' ? (
                // Secondary outline style for exam pass
                <button 
                  onClick={() => handlePurchase(item)}
                  className={`w-full py-2 px-3 rounded-xl flex justify-center items-center gap-1.5 font-bold text-xs transition cursor-pointer select-none ${
                    isOwned 
                    ? 'bg-slate-100 border border-slate-200 text-slate-500' 
                    : 'bg-transparent border-2 border-brand-green text-brand-green hover:bg-[#E6F6ED]'
                  }`}
                >
                  <span className="font-mono">{item.cost}</span>
                  <Gem className="w-3.5 h-3.5" />
                </button>
              ) : (
                // Consumed, popular, or primary style
                <button 
                  onClick={() => handlePurchase(item)}
                  className={`squishy-btn w-full text-white font-bold py-2 px-3 rounded-2xl flex justify-center items-center gap-1.5 transition cursor-pointer z-10 select-none ${
                    isOwned 
                    ? 'bg-slate-400 border-b-[3px] border-slate-500' 
                    : 'bg-brand-green hover:bg-brand-green-hover border-b-[3px] border-[#004d2e]'
                  }`}
                >
                  <span className="font-mono">{item.cost}</span>
                  <Gem className="w-3.5 h-3.5 fill-white" />
                </button>
              )}
            </article>
          );
        })}
      </section>
    </div>
  );
}
