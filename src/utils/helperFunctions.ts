import { Linking } from "react-native";

export const formattedPhoneNumber = (number: string) => `+91${number}`;

export const handleCall = (contact_number: string) : void => {
    Linking.openURL(`tel:${contact_number}`);
};

export const handleEmail = (contact_email: string) : void => {
        Linking.openURL(`mailto:${contact_email}`);
};
export const handleMap = (lat, long) => {
        Linking.openURL(`https://maps.google.com/?q=${lat},${long}`);
};