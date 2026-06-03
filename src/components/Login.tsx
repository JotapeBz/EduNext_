/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, School, Globe } from 'lucide-react';
import { Language } from '../types';

interface LoginProps {
  onLoginSuccess: (name: string, email: string) => void;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function Login({ onLoginSuccess, lang, onLanguageChange }: LoginProps) {
  const [email, setEmail] = useState('tu@email.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrors(lang === 'es' ? 'Introduce un correo válido' : 'Please enter a valid email');
      return;
    }
    if (password.length < 4) {
      setErrors(lang === 'es' ? 'La contraseña debe tener al menos 4 caracteres' : 'Password must be at least 4 characters');
      return;
    }
    // Success simulation
    setErrors(null);
    onLoginSuccess('Fabian Alvarez', email);
  };

  const handleGoogleLogin = () => {
    onLoginSuccess('Fabian Alvarez', 'fabian.alvarez@gmail.com');
  };

  // Translations
  const t = {
    es: {
      subtitle: 'Continúa tu aventura de aprendizaje.',
      emailLabel: 'Correo Electrónico',
      passLabel: 'Contraseña',
      forgot: '¿Olvidaste tu contraseña?',
      action: 'Iniciar Sesión',
      or: 'O',
      googleAction: 'Continuar con Google',
      noAcct: '¿No tienes una cuenta?',
      signUp: 'Regístrate ahora',
      guestBtn: 'Iniciar como Invitado (Fabián)',
    },
    en: {
      subtitle: 'Continue your learning adventure.',
      emailLabel: 'Email Address',
      passLabel: 'Password',
      forgot: 'Forgot password?',
      action: 'Log In',
      or: 'OR',
      googleAction: 'Continue with Google',
      noAcct: "Don't have an account?",
      signUp: 'Sign up now',
      guestBtn: 'Log In as Guest (Fabian)',
    }
  }[lang];

  return (
    <div className="w-full max-w-[420px] px-5 py-6 mx-auto flex flex-col justify-between min-h-[90vh]">
      {/* Language Bar */}
      <div className="flex justify-end mb-4">
        <button 
          onClick={() => onLanguageChange(lang === 'es' ? 'en' : 'es')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/70 hover:bg-white rounded-full text-xs font-semibold text-brand-green border border-emerald-100 transition shadow-sm cursor-pointer"
        >
          <Globe className="w-3.5 h-3.5" />
          {lang === 'es' ? 'English' : 'Español'}
        </button>
      </div>

      {/* Logo Header */}
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="w-16 h-16 bg-emerald-700/10 rounded-2xl flex items-center justify-center mb-3 shadow-[0_8px_24px_rgba(0,105,63,0.1)] border border-emerald-500/20">
          <School className="w-8 h-8 text-brand-green" />
        </div>
        <h1 className="text-2xl font-black text-brand-green tracking-tight transition duration-150">EduNext</h1>
      </div>

      {/* Login Card */}
      <div className="bg-white rounded-3xl p-6 shadow-[0_12px_45px_rgba(0,105,63,0.06)] border-2 border-emerald-100/50">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-850 mb-1">
            {lang === 'es' ? 'Bienvenido de nuevo' : 'Welcome back'}
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed">{t.subtitle}</p>
        </div>

        {errors && (
          <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 text-xs rounded-xl font-medium">
            {errors}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1" htmlFor="email">
              {t.emailLabel}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Mail className="w-4 h-4 text-emerald-850 opacity-40" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border-2 border-transparent focus:border-brand-green focus:bg-white rounded-xl py-3 pl-10 pr-4 text-sm font-medium text-gray-800 placeholder:text-gray-400 transition-all duration-150 outline-none"
                placeholder="tu@email.com"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <div className="flex justify-between items-center mb-1.5 ml-1">
              <label className="block text-xs font-bold text-gray-700" htmlFor="password">
                {t.passLabel}
              </label>
              <a href="#forgot" className="text-xs font-bold text-brand-green hover:text-brand-green-hover transition">
                {t.forgot}
              </a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Lock className="w-4 h-4 text-emerald-850 opacity-40" />
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border-2 border-transparent focus:border-brand-green focus:bg-white rounded-xl py-3 pl-10 pr-10 text-sm font-medium text-gray-800 placeholder:text-gray-450 transition-all duration-150 outline-none"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition"
              >
                {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
              </button>
            </div>
          </div>

          {/* Primary Login Button */}
          <button
            type="submit"
            className="squishy-btn w-full bg-brand-green hover:bg-brand-green-hover text-white rounded-2xl py-3.5 font-bold text-base text-center border-b-[4px] border-[#004d2e] shadow-lg shadow-emerald-700/10 mt-6 mb-2 cursor-pointer"
          >
            {t.action}
          </button>
        </form>

        <div className="relative flex items-center py-4">
          <div className="flex-grow border-t border-slate-100"></div>
          <span className="flex-shrink-0 mx-3 text-gray-400 text-[10px] font-bold uppercase tracking-wider">
            {t.or}
          </span>
          <div className="flex-grow border-t border-slate-100"></div>
        </div>

        {/* Google Authentication Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="squishy-btn w-full bg-white text-gray-700 rounded-2xl py-3 font-semibold text-xs text-center border mr-2 border-slate-200 flex items-center justify-center gap-2.5 hover:bg-slate-50 transition cursor-pointer"
        >
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
          </svg>
          {t.googleAction}
        </button>
      </div>

      {/* Sign Up Link */}
      <p className="text-center mt-6 text-xs font-semibold text-gray-500">
        {t.noAcct}
        <a href="#signup" className="font-bold text-brand-green hover:text-brand-green-hover transition ml-1.5 inline-block">
          {t.signUp}
        </a>
      </p>
    </div>
  );
}
