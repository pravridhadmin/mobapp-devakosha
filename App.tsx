import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';

import { FiltersProvider } from "./src/context/FiltersContext";

import './src/i18n/i18n';
import "./global.css";
import { AuthProvider } from './src/context/AuthContext';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <AuthProvider>
     <FiltersProvider>
        <RootNavigator />
    </FiltersProvider>
    </AuthProvider>
  );
}
