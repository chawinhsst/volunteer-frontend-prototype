import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { LightBulbIcon, CpuChipIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';

export default function AboutStudyPage() {
  const { t } = useTranslation();

  // Get all data directly from the translation file
  const objectivesList = t('aboutStudyPage.objectives.list', { returnObjects: true });
  const algorithms = t('aboutStudyPage.methodology.algorithms', { returnObjects: true });
  const timeline = t('aboutStudyPage.timeline.timelineData', { returnObjects: true });

  return (
    <motion.div 
      className="bg-white py-16 sm:py-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75 }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="text-base font-semibold leading-7 text-sky-600">{t('aboutStudyPage.hero.subtitle')}</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t('aboutStudyPage.hero.title')}
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {t('aboutStudyPage.hero.description')}
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-4xl sm:mt-20">
          {/* Objectives */}
          <div className="p-8 rounded-lg shadow-lg bg-slate-50 mb-12">
            <div className="flex items-center gap-4">
              <LightBulbIcon className="w-10 h-10 text-sky-600" />
              <h2 className="text-2xl font-bold text-slate-800">{t('aboutStudyPage.objectives.title')}</h2>
            </div>
            <ul className="mt-4 list-disc list-outside pl-5 space-y-2 text-slate-700">
              {objectivesList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Methodology */}
          <div className="p-8 rounded-lg shadow-lg bg-slate-50 mb-12">
            <div className="flex items-center gap-4">
              <CpuChipIcon className="w-10 h-10 text-sky-600" />
              <h2 className="text-2xl font-bold text-slate-800">{t('aboutStudyPage.methodology.title')}</h2>
            </div>
            <p className="mt-4 text-slate-700">
              {t('aboutStudyPage.methodology.description')}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {algorithms.map(algo => (
                <span key={algo} className="inline-block bg-sky-100 text-sky-800 text-sm font-medium px-3 py-1 rounded-full">{algo}</span>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="p-8 rounded-lg shadow-lg bg-slate-50">
            <div className="flex items-center gap-4">
              <CalendarDaysIcon className="w-10 h-10 text-sky-600" />
              <h2 className="text-2xl font-bold text-slate-800">{t('aboutStudyPage.timeline.title')}</h2>
            </div>
            <ul className="mt-4 space-y-3 text-slate-700">
              {timeline.map(item => (
                <li key={item.phase} className="flex justify-between border-b pb-2">
                  <span className="font-semibold">{item.phase}</span>
                  <span className="text-slate-500">{item.duration}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}