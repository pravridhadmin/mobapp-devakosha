import { View, Text } from "react-native"

const Badge = ({ text, color }: { text: string, color?: string }) => {
    return (
        <View className={`${color || 'bg-warning'} px-3 py-1 rounded-md`}>
            <Text className="text-text-primary-dark text-sm font-medium">
                {text}
            </Text>
        </View>
    )
}

export default Badge
