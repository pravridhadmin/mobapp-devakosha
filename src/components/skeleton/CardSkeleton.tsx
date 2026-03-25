// components/skeleton/TempleCardSkeleton.tsx
import React from "react";
import { View } from "react-native";
import Skeleton from "./Skeleton";

interface TempleCardSkeletonProps {
  cardWidth?: string;
  cardHeight?: string;
}

const CardSkeleton: React.FC<TempleCardSkeletonProps> = ({
  cardWidth = "",
  cardHeight = "h-48",
}) => {
  return (
    <View
      className={`mb-6 rounded-3xl overflow-hidden bg-surface dark:bg-surface-dark shadow ${cardWidth}`}
    >
      {/* Image Skeleton */}
      <Skeleton className={`w-full ${cardHeight}`} />

      {/* Content */}
      <View className="p-4">
        {/* Temple Name */}
        <Skeleton className="h-6 w-3/4 rounded-md mb-3" />

        {/* District + State Row */}
        <View className="flex-row items-center mb-3">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-4 w-10 rounded-md mx-2" />
          <Skeleton className="h-4 w-16 rounded-md" />
        </View>

        {/* Address */}
        <Skeleton className="h-4 w-full rounded-md mb-2" />
        <Skeleton className="h-4 w-5/6 rounded-md" />
      </View>
    </View>
  );
};

export default CardSkeleton;
