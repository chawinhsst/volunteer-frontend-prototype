import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function VolunteerInfoPage() {
  const { t } = useTranslation();

  // Get the FAQ data directly from our translation file
  const faqItems = t('volunteerInfoPage.faq', { returnObjects: true });

  return (
    <motion.div 
      className="bg-white py-16 sm:py-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75 }}
    >
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
          {t('volunteerInfoPage.title')}
        </h1>
        <p className="mt-4 text-lg text-gray-600 text-center">
          {t('volunteerInfoPage.subtitle')}
        </p>

        <div className="mt-12 space-y-8">
          {faqItems.map((item, index) => (
            <motion.div 
              key={index} 
              className="p-6 bg-slate-50 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h2 className="text-xl font-semibold text-sky-700">{item.q}</h2>
              <p className="mt-2 text-slate-700">{item.a}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}