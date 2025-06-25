import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { useTranslation } from 'react-i18next';

export default function NationalityInput({ value, onChange }) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Get the translated list of countries
  const countries = t('countries', { returnObjects: true });

  const filteredCountries = value === ''
    ? countries
    : countries.filter((country) =>
        country.toLowerCase().startsWith(value.toLowerCase())
      );

  const handleSelect = (country) => {
    onChange({ target: { name: 'nationality', value: country } });
    setIsOpen(false);
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <label htmlFor="nationality-input" className="block text-sm font-medium leading-6 text-gray-900">
        {t('registerPage.labels.nationality')}
      </label>
      <div className="relative mt-2">
        <input
          id="nationality-input"
          type="text"
          name="nationality"
          value={value}
          onChange={onChange}
          onFocus={() => setIsOpen(true)}
          className="w-full rounded-md border-0 bg-white py-2 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
          autoComplete="off"
          placeholder={t('registerPage.placeholders.nationalityInput')}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.1 }}
              className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => (
                  <li
                    key={country}
                    className="relative cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-sky-100"
                    onClick={() => handleSelect(country)}
                  >
                    {country}
                  </li>
                ))
              ) : (
                <li className="relative cursor-default select-none py-2 px-4 text-gray-500">
                  {t('registerPage.placeholders.noNationalityFound', { value: value })}
                </li>
              )}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}