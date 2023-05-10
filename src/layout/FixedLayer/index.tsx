import React from 'react';
import s from './fixed.module.scss';
import { AnimatePresence } from 'framer-motion';
import RegistrationModal from './RegistrationModal';
import { useAppContext } from '../../components/context/AppContext';

const FixedLayer = () => {
  const { showAuthModal } = useAppContext();

  return (
    <div className={s.container}>
      <AnimatePresence mode="wait">
        {showAuthModal && <RegistrationModal />}
      </AnimatePresence>
    </div>
  );
};

export default FixedLayer;
