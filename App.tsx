import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';

import { FiltersProvider } from "./src/context/FiltersContext";

import './src/i18n/i18n';
import "./global.css";
import { AuthProvider } from './src/context/AuthContext';
import RootNavigator from './src/navigation/RootNavigator';
import { HomeProvider } from './src/context/HomeContext';

export default function App() {
  return (
    <AuthProvider>
      <HomeProvider>
     <FiltersProvider>
        <RootNavigator />
    </FiltersProvider>
    </HomeProvider>
    </AuthProvider>
  );
}
