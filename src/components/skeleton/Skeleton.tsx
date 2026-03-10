// components/skeleton/Skeleton.tsx
import { View } from "react-native";

const Skeleton = ({ className }: { className?: string }) => {
    return (
        <View
            className={`bg-gray-300 dark:bg-slate-700 animate-pulse ${className}`}
        />
    );
};

export default Skeleton;