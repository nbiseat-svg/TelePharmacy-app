import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageTest = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>{t('welcome')}</h1>
      <p>{t('medicationCatalog')}</p>
      <p>{t('prescriptionManagement')}</p>
      <p>{t('consultationBooking')}</p>
      
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => changeLanguage('en')}>{t('english')}</button>
        <button onClick={() => changeLanguage('am')}>{t('amharic')}</button>
        <button onClick={() => changeLanguage('ti')}>{t('tigrigna')}</button>
        <button onClick={() => changeLanguage('om')}>{t('oromo')}</button>
      </div>
    </div>
  );
};

export default LanguageTest;