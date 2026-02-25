import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';

import { FiltersProvider } from "./src/context/FiltersContext";

import './src/i18n/i18n';
import "./global.css";

export default function App() {
  return (
     <FiltersProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </FiltersProvider>
  );
}
