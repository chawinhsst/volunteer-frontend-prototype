import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';
import { UserPlusIcon, CheckCircleIcon, InformationCircleIcon, DocumentArrowDownIcon } from '@heroicons/react/24/solid';
import NationalityInput from '../components/NationalityInput';

const Spinner = () => (
  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const calculateAge = (dobString) => {
    if (!dobString) return null;
    const dob = new Date(dobString);
    if (isNaN(dob.getTime())) return null;
    const today = new Date();
    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    let days = today.getDate() - dob.getDate();
    if (days < 0) { months--; days += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }
    return { years, months, days };
};

export default function RegisterPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: '', middleName: '', lastName: '',
    email: '', phone: '', gender: '', nationality: '',
    dob: '', platform: '', smartwatch: '', runFrequency: '',
    consent: false,
  });
  const [status, setStatus] = useState('idle');
  const age = useMemo(() => calculateAge(formData.dob), [formData.dob]);
  const [errors, setErrors] = useState({});

  const genderOptions = t('registerPage.options.gender', { returnObjects: true });
  const platformOptions = t('registerPage.options.platforms', { returnObjects: true });
  const brandOptions = t('registerPage.options.brands', { returnObjects: true });
  const frequencyOptions = t('registerPage.options.frequencies', { returnObjects: true });
  
  const todayString = new Date().toISOString().split('T')[0];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const validateForm = () => {
    const newErrors = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!formData.firstName.trim()) newErrors.firstName = t('registerPage.errors.required');
    if (!formData.lastName.trim()) newErrors.lastName = t('registerPage.errors.required');
    if (!formData.email.trim()) {
      newErrors.email = t('registerPage.errors.required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('registerPage.errors.invalidEmail');
    }
    if (!formData.gender) newErrors.gender = t('registerPage.errors.required');
    if (!formData.nationality) newErrors.nationality = t('registerPage.errors.required');
    
    if (!formData.dob) {
      newErrors.dob = t('registerPage.errors.required');
    } else {
      const selectedDate = new Date(formData.dob);
      if (selectedDate > today) {
        newErrors.dob = t('registerPage.errors.invalidDobFuture');
      }
    }

    if (!formData.platform) newErrors.platform = t('registerPage.errors.required');
    if (!formData.smartwatch) newErrors.smartwatch = t('registerPage.errors.required');
    if (!formData.runFrequency) newErrors.runFrequency = t('registerPage.errors.required');
    if (!formData.consent) newErrors.consent = t('registerPage.errors.consentRequired');
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setErrors({});
    setStatus('submitting');
    setTimeout(() => { setStatus('success'); }, 1500);
  };

  if (status === 'success') {
    return (
      <motion.div className="py-24 sm:py-32" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
        <div className="max-w-lg mx-auto bg-white shadow-xl rounded-lg p-8 text-center">
          <CheckCircleIcon className="w-16 h-16 mx-auto text-green-500" />
          <h1 className="text-3xl font-bold text-green-600 mt-4 mb-2">{t('registerPage.success.title')}</h1>
          <p className="text-slate-600">{t('registerPage.success.message')}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div className="flex min-h-full flex-1 flex-col justify-center px-4 sm:px-6 py-12 lg:px-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <div className="sm:mx-auto sm:w-full sm:max-w-3xl">
        <UserPlusIcon className="mx-auto h-12 w-auto text-sky-600" />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          {t('registerPage.title')}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-3xl">
        <div className="bg-white px-6 py-8 shadow-lg rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            
            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-3">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">{t('registerPage.labels.firstName')}</label>
                <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required 
                  className={`mt-2 block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-sky-600 ${errors.firstName ? 'ring-red-500' : 'ring-gray-300'}`}/>
                {errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>}
              </div>
              <div>
                <label htmlFor="middleName" className="block text-sm font-medium leading-6 text-gray-900">{t('registerPage.labels.middleName')} <span className="text-gray-400">{t('registerPage.labels.optional')}</span></label>
                <input type="text" id="middleName" name="middleName" value={formData.middleName} onChange={handleChange} className="mt-2 block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600"/>
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">{t('registerPage.labels.lastName')}</label>
                <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required 
                  className={`mt-2 block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-sky-600 ${errors.lastName ? 'ring-red-500' : 'ring-gray-300'}`}/>
                {errors.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>}
              </div>
            </div>
            
            <div className="flex items-start text-xs text-gray-500 bg-slate-50 p-3 rounded-md">
                <InformationCircleIcon className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                <span>{t('registerPage.info.nameCollection')}</span>
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">{t('registerPage.labels.contactEmail')}</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required 
                  className={`mt-2 block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-sky-600 ${errors.email ? 'ring-red-500' : 'ring-gray-300'}`}/>
                {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">{t('registerPage.labels.telephone')} <span className="text-gray-400">{t('registerPage.labels.optional')}</span></label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="mt-2 block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600"/>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-3">
               <div>
                <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">{t('registerPage.labels.gender')}</label>
                <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required 
                  className={`mt-2 block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-sky-600 ${errors.gender ? 'ring-red-500' : 'ring-gray-300'}`}>
                  <option value="">{t('registerPage.placeholders.select')}</option>
                  {genderOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
                {errors.gender && <p className="mt-1 text-xs text-red-600">{errors.gender}</p>}
              </div>
              <div className="sm:col-span-2">
                 <NationalityInput value={formData.nationality} onChange={handleChange} />
                 {errors.nationality && <p className="mt-1 text-xs text-red-600">{errors.nationality}</p>}
              </div>
            </div>
            
            <div>
              <label htmlFor="dob" className="block text-sm font-medium leading-6 text-gray-900">{t('registerPage.labels.dob')}</label>
              <input 
                type="date" 
                id="dob" 
                name="dob" 
                value={formData.dob} 
                onChange={handleChange} 
                required 
                max={todayString}
                className={`mt-2 block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-sky-600 ${errors.dob ? 'ring-red-500' : 'ring-gray-300'}`}/>
              {errors.dob && <p className="mt-1 text-xs text-red-600">{errors.dob}</p>}
            </div>
            {age && (
                <div className="text-sm text-gray-600 bg-slate-50 p-3 rounded-md -mt-2">
                    <Trans i18nKey="registerPage.age.calculatedAge" values={age} components={[<span className="font-semibold" />]} />
                </div>
            )}
            
            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-3">
              <div>
                <label htmlFor="platform" className="block text-sm font-medium leading-6 text-gray-900">{t('registerPage.labels.platform')}</label>
                 <select id="platform" name="platform" value={formData.platform} onChange={handleChange} required 
                  className={`mt-2 block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-sky-600 ${errors.platform ? 'ring-red-500' : 'ring-gray-300'}`}>
                    <option value="">{t('registerPage.placeholders.selectPlatform')}</option>
                    {platformOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                 </select>
                 {errors.platform && <p className="mt-1 text-xs text-red-600">{errors.platform}</p>}
              </div>
              <div>
                <label htmlFor="smartwatch" className="block text-sm font-medium leading-6 text-gray-900">{t('registerPage.labels.smartwatch')}</label>
                <select id="smartwatch" name="smartwatch" value={formData.smartwatch} onChange={handleChange} required 
                  className={`mt-2 block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-sky-600 ${errors.smartwatch ? 'ring-red-500' : 'ring-gray-300'}`}>
                    <option value="">{t('registerPage.placeholders.selectBrand')}</option>
                    {brandOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                 </select>
                 {errors.smartwatch && <p className="mt-1 text-xs text-red-600">{errors.smartwatch}</p>}
              </div>
               <div>
                <label htmlFor="runFrequency" className="block text-sm font-medium leading-6 text-gray-900">{t('registerPage.labels.runFrequency')}</label>
                <select id="runFrequency" name="runFrequency" value={formData.runFrequency} onChange={handleChange} required 
                  className={`mt-2 block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-sky-600 ${errors.runFrequency ? 'ring-red-500' : 'ring-gray-300'}`}>
                    <option value="">{t('registerPage.placeholders.selectFrequency')}</option>
                    {frequencyOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                {errors.runFrequency && <p className="mt-1 text-xs text-red-600">{errors.runFrequency}</p>}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 space-y-5">
                <div className="relative flex items-center justify-center">
                    <a 
                        href="/AF-03-06-Official-IRB.pdf" 
                        download="Official-IRB-Consent-Form.pdf" 
                        className="inline-flex items-center gap-x-2 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                        <DocumentArrowDownIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                        {t('registerPage.consent.downloadButton')}
                    </a>
                </div>
                 <div className="relative flex items-start">
                    <div className="flex h-6 items-center">
                        <input type="checkbox" id="consent" name="consent" checked={formData.consent} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-600" />
                    </div>
                    <div className="ml-3 text-sm leading-6">
                        <label htmlFor="consent" className="font-medium text-gray-900">
                          {t('registerPage.labels.consent')}
                        </label>
                        <p className="text-gray-500">{t('registerPage.consent.description')}</p>
                    </div>
                </div>
                {errors.consent && <p className="mt-1 ml-9 text-xs text-red-600">{errors.consent}</p>}
            </div>

            <div>
              <button type="submit" disabled={status === 'submitting'} className="flex w-full justify-center rounded-md bg-sky-600 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 disabled:bg-sky-400 disabled:cursor-not-allowed">
                {status === 'submitting' ? <><Spinner /> {t('registerPage.buttons.submitting')}</> : t('registerPage.buttons.submit')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}