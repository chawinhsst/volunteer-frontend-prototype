import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  // --- UPDATED FUNCTION ---
  // We make the function async to wait for the language change before reloading
  const changeLanguage = async (lng) => {
    await i18n.changeLanguage(lng); // 1. Wait for i18next to finish
    window.location.reload();      // 2. Then, force a page reload
  };

  const getButtonClasses = (lang) => {
    const isActive = i18n.language.startsWith(lang);
    return `
      cursor-pointer text-sm font-semibold transition-colors
      ${isActive ? 'text-sky-600' : 'text-slate-500 hover:text-sky-500'}
    `;
  };
  
  const getMobileButtonClasses = (lang) => {
    const isActive = i18n.language.startsWith(lang);
    return `
      cursor-pointer text-lg font-semibold transition-colors
      ${isActive ? 'text-sky-600' : 'text-slate-500 hover:text-sky-500'}
    `;
  };

  return (
    <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm border-b border-slate-900/10">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-sky-600" onClick={() => setIsMenuOpen(false)}>
          {t('navbar.brand')}
        </Link>

        {/* Desktop Menu Links */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink to="/" className={({ isActive }) => `text-slate-600 hover:text-sky-600 transition-colors ${isActive ? 'font-semibold text-sky-600' : ''}`}>{t('navbar.home')}</NavLink>
          <NavLink to="/about-the-study" className={({ isActive }) => `text-slate-600 hover:text-sky-600 transition-colors ${isActive ? 'font-semibold text-sky-600' : ''}`}>{t('navbar.about')}</NavLink>
          <NavLink to="/volunteer-information" className={({ isActive }) => `text-slate-600 hover:text-sky-600 transition-colors ${isActive ? 'font-semibold text-sky-600' : ''}`}>{t('navbar.volunteers')}</NavLink>
          <Link to="/register" className="bg-sky-500 text-white px-5 py-2 rounded-full font-semibold hover:bg-sky-600 transition-transform hover:scale-105">
            {t('navbar.register')}
          </Link>

          {/* Language Switcher */}
          <div className="flex items-center space-x-2 border-l ml-4 pl-4">
            <button onClick={() => changeLanguage('en')} className={getButtonClasses('en')}>EN</button>
            <button onClick={() => changeLanguage('th')} className={getButtonClasses('th')}>TH</button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <XMarkIcon className="h-7 w-7 text-slate-700" /> : <Bars3Icon className="h-7 w-7 text-slate-700" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-lg"
          >
            <div className="flex flex-col items-center space-y-4 py-6">
              <NavLink to="/" className="text-slate-700 hover:text-sky-600" onClick={() => setIsMenuOpen(false)}>{t('navbar.home')}</NavLink>
              <NavLink to="/about-the-study" className="text-slate-700 hover:text-sky-600" onClick={() => setIsMenuOpen(false)}>{t('navbar.about')}</NavLink>
              <NavLink to="/volunteer-information" className="text-slate-700 hover:text-sky-600" onClick={() => setIsMenuOpen(false)}>{t('navbar.volunteers')}</NavLink>
              <Link to="/register" className="bg-sky-500 text-white px-8 py-3 rounded-full font-semibold" onClick={() => setIsMenuOpen(false)}>
                {t('navbar.register')}
              </Link>
              {/* Language Switcher for Mobile */}
              <div className="flex items-center space-x-4 pt-4 border-t mt-4 w-full justify-center">
                <button onClick={() => changeLanguage('en')} className={getMobileButtonClasses('en')}>EN</button>
                <button onClick={() => changeLanguage('th')} className={getMobileButtonClasses('th')}>TH</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}