import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BackgroundContextProvider } from './components/context/backgroundContext';
import HttpApi from 'i18next-http-backend';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';
import { ThemeProvider, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AppContextProvider } from './components/context/AppContext';
import ErrorBoundary from './components/ErrorBoundary';
import { theme } from './theme';
import './index.css';
import 'src/styles/global-style/index.scss';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { DevSupport } from '@react-buddy/ide-toolbox';
import { ComponentPreviews, useInitial } from './dev';

const options = {
  order: ['cookie', 'localStorage', 'htmlTag', 'path', 'subdomain'],
  caches: ['cookie'],
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    fallbackLng: 'en',
    detection: options,
    backend: {
      loadPath: '/assets/locale/{{lng}}/translation.json',
    },
  });

const languageFallBack = (
  <div className="w-full text-2xl text-center font-bold">
    <label>Loading...</label>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    {/*<Suspense fallback={languageFallBack}>*/}
    <React.StrictMode>
      <ErrorBoundary
        fallback={
          <Typography color="red">"Some Error happen in you app"</Typography>
        }
      >
        <AppContextProvider>
          <BackgroundContextProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <ThemeProvider theme={theme}>
                <DevSupport
                  ComponentPreviews={ComponentPreviews}
                  useInitialHook={useInitial}
                >
                  <App />
                </DevSupport>
              </ThemeProvider>
            </LocalizationProvider>
          </BackgroundContextProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </AppContextProvider>
      </ErrorBoundary>
    </React.StrictMode>
    {/*</Suspense>*/}
  </Provider>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
