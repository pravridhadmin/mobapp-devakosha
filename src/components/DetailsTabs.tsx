import React, { useState, ReactNode } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";

export type TabItem = {
  key: string;
  label: string;
  content: ReactNode;
};

type DetailsTabProps = {
  tabs: TabItem[];
  initialTabKey?: string;
};

export default function DetailsTab({
  tabs,
  initialTabKey,
}: DetailsTabProps) {
  const [activeTab, setActiveTab] = useState<string>(
    initialTabKey || tabs[0]?.key
  );

  const activeContent =
    tabs.find((tab) => tab.key === activeTab)?.content ?? null;

  return (
    <View className="flex-1">
      {/* Tab Header */}
      <View className="flex-row border-b">
        {tabs.map((tab) => {
          const isActive = tab.key === activeTab;

          return (
            <Pressable
              key={tab.key}
              onPress={() => setActiveTab(tab.key)}
              className={`flex-1 items-center py-3 ${
                isActive ? "border-b-2 border-blue-600" : ""
              }`}
            >
              <Text
                className={`text-lg font-medium ${
                  isActive ? "text-primary dark:text-primary-dark" : "text-gray-500 dark:text-gray-100"
                }`}
              >
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Tab Content */}
      <ScrollView className="flex-1 mt-4">
        {activeContent}
      </ScrollView>
    </View>
  );
}