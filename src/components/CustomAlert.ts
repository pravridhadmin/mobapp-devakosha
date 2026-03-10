
import { Alert, AlertButton, AlertOptions } from "react-native";



export const CustomAlert = (
    title: string,
    message?: string,
    buttons?: AlertButton[],
    options?: AlertOptions) => {
    Alert.alert(title, message, buttons, options);
};