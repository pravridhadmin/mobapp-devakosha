import React from 'react';
import { View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export default function DetailsScreen({ route }: Props) {
  const { itemId } = route.params;

  return (
    <View className="flex-1 justify-center items-center bg-green-500">
      <Text className="text-white text-xl">Details for item {itemId}</Text>
    </View>
  );
}