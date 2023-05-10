import { useMemo } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const { createContext, useState, useContext } = require('react');

const AppContext = createContext({
  showModal: false,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const AppContextProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [modalCallback, setModalCallback] = useState({
    onCancel: () => null,
    onSuccess: () => null,
  });



  const value = useMemo(
    () => ({
      showModal,
      modalCallback,
      showAuthModal,
      setShowAuthModal,
      setShowModal,
      setModalCallback,
    }),
    [showModal, showAuthModal, setShowModal, modalCallback, setModalCallback],
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={value}>{children}</AppContext.Provider>
    </QueryClientProvider>
  );
};

const useAppContext = () => {
  const background = useContext(AppContext);
  if (background === undefined) {
    throw new Error('useBackgoundContext was used outside of its Provider');
  }
  return background;
};

export { AppContext, AppContextProvider, useAppContext };
