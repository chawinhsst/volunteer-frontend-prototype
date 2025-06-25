import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';
import { 
  HeartIcon, 
  UserGroupIcon, 
  ShieldCheckIcon, 
  AcademicCapIcon,
  ClipboardDocumentListIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';

const iconMap = {
  HeartIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  ClipboardDocumentListIcon,
  ArrowTrendingUpIcon,
  AcademicCapIcon
};

const SectionTitle = ({ subtitle, title }) => (
  <motion.div 
    className="mx-auto max-w-2xl lg:text-center"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.5 }}
  >
    <p className="text-base font-semibold leading-7 text-sky-600">{subtitle}</p>
    <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
      {title}
    </h2>
  </motion.div>
);

export default function HomePage() {
  const { t } = useTranslation();

  const features = t('homePage.featuresSection.features', { returnObjects: true });
  const howItWorks = t('homePage.howItWorksSection.steps', { returnObjects: true });

  return (
    <div className="overflow-hidden bg-white">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-3xl py-20 sm:py-24 lg:py-32">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
          >
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
              <span className="bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">
                {t('homePage.heroSection.title1')}
              </span>
              <br />
              {t('homePage.heroSection.title2')}
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 max-w-2xl mx-auto">
              {t('homePage.heroSection.subtitle')}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/register"
                className="rounded-md bg-sky-600 px-7 py-3 text-lg font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 transition-all duration-300 transform hover:scale-105"
              >
                {t('homePage.heroSection.ctaButton')}
              </Link>
              <Link to="/about-the-study" className="text-base font-semibold leading-7 text-slate-700 hover:text-slate-900">
                {t('homePage.heroSection.learnMore')} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionTitle subtitle={t('homePage.featuresSection.subtitle')} title={t('homePage.featuresSection.title')} />
          <motion.div 
            className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.2 }}
          >
            <dl className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
              {features.map((feature) => {
                const IconComponent = iconMap[feature.icon];
                return (
                  <motion.div 
                    key={feature.name} 
                    className="relative pl-16"
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                  >
                    <dt className="text-base font-semibold leading-7 text-gray-900">
                      <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-sky-600">
                        {IconComponent && <IconComponent className="h-6 w-6 text-white" aria-hidden="true" />}
                      </div>
                      {feature.name}
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                  </motion.div>
                );
              })}
            </dl>
          </motion.div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionTitle subtitle={t('homePage.howItWorksSection.subtitle')} title={t('homePage.howItWorksSection.title')} />
          <div className="mx-auto mt-16 flow-root sm:mt-20">
            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
               <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {howItWorks.map((step) => {
                  const IconComponent = iconMap[step.icon];
                  return (
                      <div key={step.name} className="rounded-xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 text-center">
                          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sky-100">
                              {IconComponent && <IconComponent className="h-8 w-8 text-sky-600" aria-hidden="true" />}
                          </div>
                          <h3 className="mt-5 text-lg font-semibold leading-7 text-gray-900">{step.name}</h3>
                          <p className="mt-2 text-base leading-7 text-gray-600">{step.description}</p>
                      </div>
                  );
                })}
               </div>
            </div>
          </div>
        </div>
      </div>

       {/* Trust & Transparency Section */}
      <div className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <SectionTitle subtitle={t('homePage.trustSection.subtitle')} title={t('homePage.trustSection.title')} />
            <div className="mx-auto mt-16 max-w-4xl rounded-3xl ring-1 ring-gray-200 bg-white p-8 sm:mt-20 lg:p-10 shadow-lg">
                <div className="flex flex-col items-center gap-y-6 sm:flex-row sm:gap-x-10">
                    <div className="flex-shrink-0">
                        <ShieldCheckIcon className="h-24 w-24 text-green-500" />
                    </div>
                    <div className="text-center sm:text-left">
                        <h3 className="text-xl font-bold tracking-tight text-gray-900">{t('homePage.trustSection.irbTitle')}</h3>
                        <p className="mt-2 text-lg text-gray-600">
                          {t('homePage.trustSection.irbDescription')}
                        </p>
                        <p className="mt-4 text-sm text-gray-500">
                          {t('homePage.trustSection.irbInfo')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Meet the Researcher Section */}
      <div className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <SectionTitle subtitle={t('homePage.researcherSection.subtitle')} title={t('homePage.researcherSection.title')} />
            <div className="mx-auto mt-16 max-w-3xl text-center">
                <p className="text-lg text-gray-600">
                  <Trans i18nKey="homePage.researcherSection.bio">
                    This research is being conducted as the primary component of his thesis for the <strong className="text-gray-900">Master of Science in Software Engineering at Chulalongkorn University</strong>. Combining his background as a university athlete with his professional experience as a Product Owner, Chawin is focused on applying machine learning to solve real-world challenges in sports science.
                  </Trans>
                </p>
                <div className="mt-8 flex items-center justify-center gap-x-6">
                    <a href="https://chawin.netlify.app/" target="_blank" rel="noopener noreferrer" className="rounded-md bg-slate-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-600">{t('homePage.researcherSection.personalSite')}</a>
                    <a href="https://www.linkedin.com/in/chawin-hansasuta/" target="_blank" rel="noopener noreferrer" className="rounded-md bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-500">{t('homePage.researcherSection.linkedIn')}</a>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}