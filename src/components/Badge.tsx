import { View, Text } from "react-native"

const Badge = ({ text, color }: { text: string, color?: string }) => {
    return (
        <View className={`${color || 'bg-warning'} px-3 py-1 rounded-lg items-center justify-center`}>
            <Text  className="text-text-primary-dark pb-1 text-sm font-medium"
            style={{ textAlignVertical: "center"}}>
                {text}
            </Text>
        </View>
    )
}

export default Badge
