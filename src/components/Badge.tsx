import { View, Text } from "react-native"

const Badge = ({ text, color }: { text: string, color?: string }) => {
    return (
        <View className={`px-3 py-1 rounded-lg ${color || 'bg-accent'}`}>
            <Text className="text-primary text-sm font-medium">
                {text}
            </Text>
        </View>
    )
}

export default Badge
