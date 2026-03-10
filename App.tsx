import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';

import { FiltersProvider } from "./src/context/FiltersContext";

import './src/i18n/i18n';
import "./global.css";
import { AuthProvider } from './src/context/AuthContext';
import RootNavigator from './src/navigation/RootNavigator';
import { HomeProvider } from './src/context/HomeContext';
import { SnackbarProvider } from './src/context/SnackbarContext';
import { useEffect, useState } from 'react';
import { initI18n } from './src/i18n/i18n';

export default function App() {

   const [ready, setReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      await initI18n();
      setReady(true);
    };

    init();
  }, []);

  if (!ready) return null;

  return (
     <FiltersProvider>
       <SnackbarProvider>
    <AuthProvider>
      <HomeProvider>
        <RootNavigator />
    </HomeProvider>
    </AuthProvider>
       </SnackbarProvider>
    </FiltersProvider>
  );
}
