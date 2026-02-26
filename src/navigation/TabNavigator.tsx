import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useColorScheme } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from '../screens/HomeScreen';
import ListingScreen from '../screens/ListingScreen';
import { useTranslation } from "react-i18next";

export type TabParamList = {
  Home: undefined;
  Listing: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Tab.Navigator id="MainTab"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: isDark ? "#fff" : "#000",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: isDark ? "#111" : "#fff",
          height: 65,
          paddingTop: 8,
          paddingBottom: 10,
          borderTopWidth: 0,
          elevation: 8, // Android shadow
        },
              tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: "600",
      },

      tabBarItemStyle: {
        justifyContent: "center",
        alignItems: "center",
      },
        tabBarIcon: ({ color, size }) => {
          if (route.name === "Home") {
            return <Ionicons name="home-outline" size={size} color={color} />;
          }
          if (route.name === "Listing") {
            return <Ionicons name="search-outline" size={size} color={color} />;
          }
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: t("home") }}
      />
      <Tab.Screen
        name="Listing"
        component={ListingScreen}
        options={{ title: t("explore") }}
      />
    </Tab.Navigator>
  );
}