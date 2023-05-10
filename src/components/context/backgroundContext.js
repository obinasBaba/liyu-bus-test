const { createContext, useState, useContext } = require('react');

const BackgroundContext = createContext();
const BackgroundContextSetter = createContext();

const BackgroundContextProvider = ({ children }) => {
  const [bgImg, setBgImg] = useState('test');

  return (
    <BackgroundContextSetter.Provider value={setBgImg}>
      <BackgroundContext.Provider value={bgImg}>
        {children}
      </BackgroundContext.Provider>
    </BackgroundContextSetter.Provider>
  );
};

const useBackgroundContext = () => {
  const background = useContext(BackgroundContext);
  if (background === undefined) {
    throw new Error('useBackgoundContext was used outside of its Provider');
  }
  return background;
};

const useBackgroundContextSetter = () => {
  const backgroundContextSetter = useContext(BackgroundContextSetter);
  if (backgroundContextSetter === undefined) {
    throw new Error('useBackgoundContext was used outside of its Provider');
  }
  return backgroundContextSetter;
};

export {
  BackgroundContext,
  BackgroundContextProvider,
  useBackgroundContext,
  useBackgroundContextSetter,
};
