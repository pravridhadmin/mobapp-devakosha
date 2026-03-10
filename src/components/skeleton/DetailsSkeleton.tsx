import { View, ScrollView } from "react-native";
import Skeleton from "./Skeleton";

export default function DetailsSkeleton() {
    return (
        <ScrollView
            className="flex-1 bg-background dark:bg-background-dark"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
        >
            {/* Hero Image Skeleton */}
            <Skeleton className="w-full h-96" />

            <View className="flex-1 bg-background dark:bg-background-dark rounded-t-3xl -mt-6 px-5 pt-6">

                {/* Title */}
                <Skeleton className="h-8 w-3/4 rounded-lg my-6" />

                {/* Address */}
                <Skeleton className="h-6 w-1/2 rounded-lg mb-6" />

                {/* Tabs Header */}
                <View className="flex-row justify-between gap-4 mb-6">
                    <Skeleton className="h-8 w-28 rounded-lg" />
                    <Skeleton className="h-8 w-28 rounded-lg" />
                    <Skeleton className="h-8 w-28 rounded-lg" />
                </View>

                {/* About content */}
                <View className="gap-5 pb-5">
                    <Skeleton className="h-5 w-full rounded" />
                    <Skeleton className="h-5 w-full rounded" />
                    <Skeleton className="h-5 w-full rounded" />
                    <Skeleton className="h-5 w-5/6 rounded" />
                    <Skeleton className="h-5 w-3/4 rounded" />
                </View>

            </View>
        </ScrollView>
    );
}