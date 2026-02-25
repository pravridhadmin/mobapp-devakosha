import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import { useColorScheme } from 'react-native';
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config.js"; // adjust path
import ListingScreen from '../screens/ListingScreen';
import { District, State } from '../types/models';
import TabNavigator from './TabNavigator';
import ProfileScreen from '../screens/ProfileScreen';

export type RootStackParamList = {
  MainTabs: undefined;
  Profile: undefined;
  Details: { itemId: number };
  Listing: { searchFilters: { state: State; district: District; search: string } };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const fullConfig = resolveConfig(tailwindConfig);
  const colors = fullConfig.theme.colors;

  return (
    <Stack.Navigator id="main"
      initialRouteName="MainTabs"
      
      screenOptions={{
         headerShown: false,
        headerStyle: {
          backgroundColor: isDark ? colors["background-dark"] : colors.background,
        },
        headerTitleStyle: {
          color: isDark ? colors["text-dark"] : colors.text,
        },
        headerTintColor: isDark ? colors["text-dark"] : colors.text,
      }}
    >
       <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}