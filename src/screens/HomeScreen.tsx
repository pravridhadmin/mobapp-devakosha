import React, { useEffect, useState } from 'react';
import { View, Text, Button, Pressable, TouchableOpacity, StatusBar, ActivityIndicator, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Dropdown } from "react-native-element-dropdown";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useColorScheme } from "nativewind";
import { State } from "../types/models";
import { getStates } from '../api/cms';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { colorScheme, toggleColorScheme, setColorScheme } = useColorScheme();
  const [states, setStates] = useState<State[]>([]);
  const [selectedState, setSelectedState] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await getStates();
      setStates(data);
    } catch (err: any) {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-background dark:bg-background-dark">
        <ActivityIndicator size="large" />
        <Text className="mt-4 text-text dark:text-text-dark">
          Loading states...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-background dark:bg-background-dark">
        <Text className="text-red-500">{error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background dark:bg-background-dark">
      <StatusBar barStyle={colorScheme === "dark" ? "light-content" : "dark-content"} />

      {/* Header */}
      <View className="px-6 pt-16 pb-6">
        <Text className="text-3xl font-bold text-primary dark:text-primary-dark">
          Devakosha
        </Text>
        <Text className="mt-2 text-text dark:text-text-dark">
          System theme: {colorScheme}
        </Text>
      </View>

      {/* Content */}
      <View className="flex-1 px-6">

        {/* Card */}
        <View className="bg-surface dark:bg-surface-dark rounded-2xl p-6 shadow-md mb-6">
          <Text className="text-lg font-semibold text-text dark:text-text-dark mb-2">
            {t('welcome')} 👋
          </Text>
          <Text className="text-text dark:text-text-dark opacity-80">
            This screen uses semantic Tailwind colors and automatically adapts
            to light and dark mode.
          </Text>
        </View>

        <Text className="text-2xl font-bold text-primary dark:text-primary-dark mb-4">
          Select State
        </Text>

        <Dropdown
          style={{
            backgroundColor: "#fff",
            borderRadius: 12,
            padding: 16,
          }}
          containerStyle={{
            borderRadius: 12,
          }}
          placeholderStyle={{ color: "#6B7280" }}
          selectedTextStyle={{ color: "#111827" }}
          data={states}
          labelField="title"
          valueField="id"
          placeholder="Select a state"
          value={selectedState}
          onChange={(item) => {
            setSelectedState(item.id);
          }}
        />

        {selectedState && (
          <Text className="mt-6 text-text dark:text-text-dark">
            Selected State ID: {selectedState}
          </Text>
        )}

        <Pressable
          className="bg-blue-500 px-6 py-3 rounded-xl"
          onPress={() =>
            navigation.navigate('Details', { itemId: 42 })
          }
        >
          <Text className="text-white font-semibold">
            Go to Details
          </Text>
        </Pressable>
      </View>
    </View>
  );
}