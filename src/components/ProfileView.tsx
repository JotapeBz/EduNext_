/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Flame, Gem, Edit3, Award, Languages, Bell, HelpCircle, ShieldAlert, LogOut, User, ChevronRight, Check } from 'lucide-react';
import { UserProfile, Language } from '../types';

interface ProfileViewProps {
  user: UserProfile;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onUpdateProfile: (name: string) => void;
  onLogout: () => void;
}

export default function ProfileView({ user, lang, onLanguageChange, onUpdateProfile, onLogout }: ProfileViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(user.name);

  const t = {
    es: {
      profileTitle: 'Perfil',
      memberSince: 'Miembro desde Enero 2024',
      streakTitle: 'Racha de Fuego',
      diamondsTitle: 'Diamantes Totales',
      achievementsHeader: 'Logros',
      allBtn: 'Ver todos',
      badgeOne: 'Primeros Pasos',
      badgeTwo: 'Maestro de Álgebra',
      badgeThree: 'Racha de Fuego 30',
      badgeFour: 'Políglota',
      editLabel: 'Editar Perfil',
      notifLabel: 'Notificaciones',
      langLabel: 'Idioma',
      currentLang: 'Español',
      helpLabel: 'Ayuda y Soporte',
      logoutLabel: 'Cerrar Sesión',
      save: 'Guardar',
      cancel: 'Cancelar'
    },
    en: {
      profileTitle: 'Profile',
      memberSince: 'Member since January 2024',
      streakTitle: 'Flame Streak',
      diamondsTitle: 'Total Diamonds',
      achievementsHeader: 'Achievements',
      allBtn: 'See all',
      badgeOne: 'First Steps',
      badgeTwo: 'Algebra Master',
      badgeThree: 'Flame Streak 30',
      badgeFour: 'Polyglot',
      editLabel: 'Edit Profile',
      notifLabel: 'Notifications',
      langLabel: 'Language',
      currentLang: 'English',
      helpLabel: 'Help & Support',
      logoutLabel: 'Log Out',
      save: 'Save',
      cancel: 'Cancel'
    }
  }[lang];

  const handleSaveProfile = () => {
    if (nameInput.trim()) {
      onUpdateProfile(nameInput);
    }
    setIsEditing(false);
  };

  return (
    <div className="pb-6">
      {/* Header Profile Info */}
      <section className="flex flex-col items-center text-center pt-3 mb-6 relative">
        <div className="relative w-24 h-24 mb-4">
          <img 
            alt={user.name} 
            src={user.avatarUrl} 
            referrerPolicy="no-referrer"
            className="w-full h-full rounded-full object-cover border-4 border-white shadow-[0_8px_24px_rgba(35,131,84,0.12)]"
          />
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="absolute bottom-0 right-0 w-8 h-8 bg-brand-green hover:bg-brand-green-hover text-white rounded-full flex items-center justify-center border-2 border-white shadow-sm transition-colors cursor-pointer"
            title={t.editLabel}
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
        </div>

        {isEditing ? (
          <div className="w-full max-w-[280px] flex flex-col gap-2 mt-2">
            <input 
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-center font-bold text-gray-800 focus:outline-none focus:border-brand-green"
              placeholder={user.name}
            />
            <div className="flex gap-2 justify-center">
              <button 
                onClick={handleSaveProfile}
                className="bg-brand-green text-white px-3 py-1 text-xs rounded-lg font-bold hover:bg-brand-green-hover cursor-pointer"
              >
                {t.save}
              </button>
              <button 
                onClick={() => { setIsEditing(false); setNameInput(user.name); }}
                className="bg-slate-200 text-gray-700 px-3 py-1 text-xs rounded-lg font-bold hover:bg-slate-300 cursor-pointer"
              >
                {t.cancel}
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold text-gray-850 leading-snug">
              {user.name}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {lang === 'es' ? user.memberSince : user.memberSinceEn}
            </p>
          </>
        )}
      </section>

      {/* Stats Cards Grid */}
      <section className="grid grid-cols-2 gap-3.5 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-[0_4px_16px_rgba(35,131,84,0.04)] border border-emerald-100/50 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-2.5">
            <Flame className="w-5.5 h-5.5 text-[#F5A623] fill-[#F5A623]" />
          </div>
          <h3 className="font-extrabold text-[#1a1c1e] text-base leading-none mb-1 font-mono">
            {user.streak} {lang === 'es' ? 'días' : 'days'}
          </h3>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            {t.streakTitle}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-[0_4px_16px_rgba(35,131,84,0.04)] border border-emerald-100/50 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-emerald-100/70 rounded-full flex items-center justify-center mb-2.5">
            <Gem className="w-5.5 h-5.5 text-brand-green fill-brand-green" />
          </div>
          <h3 className="font-extrabold text-[#1a1c1e] text-base leading-none mb-1 font-mono">
            {user.diamonds}
          </h3>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            {t.diamondsTitle}
          </p>
        </div>
      </section>

      {/* Achievements Badges Tray */}
      <section className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-[15px] font-bold text-gray-800 uppercase tracking-tight">
            {t.achievementsHeader}
          </h3>
          <button className="text-[11px] font-extrabold text-brand-green hover:text-brand-green-hover transition">
            {t.allBtn}
          </button>
        </div>
        
        {/* Horizontal scroll containers */}
        <div className="flex gap-3.5 overflow-x-auto no-scrollbar pb-3 -mx-4 px-4">
          
          {/* Badge 1: Completed */}
          <div className="shrink-0 w-28 flex flex-col items-center group">
            <div className="w-18 h-18 bg-emerald-100/55 rounded-full flex items-center justify-center mb-2 border-4 border-white shadow-[0_4px_12px_rgba(35,131,84,0.06)] group-hover:scale-105 transition-transform">
              <Award className="w-10 h-10 text-brand-green" />
            </div>
            <p className="text-[10.5px] font-extrabold text-gray-800 text-center leading-tight">
              {t.badgeOne}
            </p>
          </div>

          {/* Badge 2: Completed / Dynamic based on progress */}
          <div className="shrink-0 w-28 flex flex-col items-center group">
            <div className={`w-18 h-18 rounded-full flex items-center justify-center mb-2 border-4 border-white shadow-[0_4px_12px_rgba(35,131,84,0.06)] group-hover:scale-105 transition-transform ${
              user.xpProgress >= 70 ? 'bg-amber-100' : 'bg-slate-100 opacity-60 grayscale'
            }`}>
              <span className="font-mono text-2xl font-black text-amber-600">∑</span>
            </div>
            <p className="text-[10.5px] font-extrabold text-gray-800 text-center leading-tight">
              {t.badgeTwo}
            </p>
          </div>

          {/* Badge 3: Locked */}
          <div className="shrink-0 w-28 flex flex-col items-center opacity-40 grayscale">
            <div className="w-18 h-18 bg-red-100 rounded-full flex items-center justify-center mb-2 border-4 border-white shadow-sm">
              <Flame className="w-10 h-10 text-rose-500 fill-rose-500" />
            </div>
            <p className="text-[10.5px] font-extrabold text-slate-500 text-center leading-tight">
              {t.badgeThree}
            </p>
          </div>

          {/* Badge 4: Locked */}
          <div className="shrink-0 w-28 flex flex-col items-center opacity-40 grayscale">
            <div className="w-18 h-18 bg-slate-100 rounded-full flex items-center justify-center mb-2 border-4 border-white shadow-sm">
              <Languages className="w-10 h-10 text-slate-400" />
            </div>
            <p className="text-[10.5px] font-extrabold text-slate-500 text-center leading-tight">
              {t.badgeFour}
            </p>
          </div>
        </div>
      </section>

      {/* Settings List Menu */}
      <section className="bg-white rounded-2xl shadow-[0_4px_16px_rgba(35,131,84,0.02)] border border-slate-100 overflow-hidden mb-4">
        <ul className="divide-y divide-slate-100">
          
          {/* Edit info trigger */}
          <li>
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="w-full flex items-center justify-between p-3.5 hover:bg-slate-50 transition active:scale-[0.99] cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-brand-green">
                  <User className="w-4.5 h-4.5" />
                </div>
                <span className="text-[14px] font-semibold text-gray-750">
                  {t.editLabel}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-350" />
            </button>
          </li>

          {/* Notifications config */}
          <li>
            <button className="w-full flex items-center justify-between p-3.5 hover:bg-slate-50 transition active:scale-[0.99] cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-brand-green">
                  <Bell className="w-4.5 h-4.5" />
                </div>
                <span className="text-[14px] font-semibold text-gray-750">
                  {t.notifLabel}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-350" />
            </button>
          </li>

          {/* Interactive Language Selector */}
          <li>
            <button 
              onClick={() => onLanguageChange(lang === 'es' ? 'en' : 'es')}
              className="w-full flex items-center justify-between p-3.5 hover:bg-slate-50 transition active:scale-[0.99] cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-brand-green">
                  <Languages className="w-4.5 h-4.5" />
                </div>
                <span className="text-[14px] font-semibold text-gray-750">
                  {t.langLabel}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-400">
                  {t.currentLang}
                </span>
                <ChevronRight className="w-4 h-4 text-slate-350" />
              </div>
            </button>
          </li>

          {/* Support */}
          <li>
            <button className="w-full flex items-center justify-between p-3.5 hover:bg-slate-50 transition active:scale-[0.99] cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-brand-green">
                  <HelpCircle className="w-4.5 h-4.5" />
                </div>
                <span className="text-[14px] font-semibold text-gray-750">
                  {t.helpLabel}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-350" />
            </button>
          </li>

          {/* Log Out */}
          <li>
            <button 
              onClick={onLogout}
              className="w-full flex items-center gap-3 p-3.5 hover:bg-rose-50/50 transition active:scale-[0.99] text-rose-600 cursor-pointer font-bold"
            >
              <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center">
                <LogOut className="w-4.5 h-4.5" />
              </div>
              <span className="text-[14px]">
                {t.logoutLabel}
              </span>
            </button>
          </li>
          
        </ul>
      </section>
    </div>
  );
}
