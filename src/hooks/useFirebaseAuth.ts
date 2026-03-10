import { useContext, useEffect, useState } from "react";
import { getAuth, signInWithPhoneNumber, FirebaseAuthTypes, onAuthStateChanged } from "@react-native-firebase/auth";
import { getApp } from '@react-native-firebase/app';
import { AuthContext } from "../context/AuthContext";



export const useFirebaseAuth = () => {
    const auth = getAuth(getApp());
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);


    /**
     * Listen for authentication state changes.
     * If OTP is auto-verified (mostly on Android),
     * Firebase logs in automatically and this listener triggers.
     */
    useEffect(() => {
        const subscriber = onAuthStateChanged(auth, (user) => {
            if (user) {
                login(user.phoneNumber || "");
            }
        });

        // cleanup listener when component unmounts
        return subscriber;
    }, [login]);

    /**
     * Send OTP to the given phone number.
     * returns the confirmation object which will be used later to verify OTP.
     */
    const sendOtp = async (phoneNumber: string) => {
        try {

            setLoading(true);
            const confirmation = await signInWithPhoneNumber(auth, phoneNumber);
            setLoading(false);
            return confirmation;
        } catch (error) {
            setLoading(false);
            return error;
        }
    };

    /**
     * Verify the OTP entered by the user.
     * Uses the confirmation object received during OTP sending.
     */
    const verifyOtp = async (otp: string, confirmation?: FirebaseAuthTypes.ConfirmationResult) => {
        try {
            setLoading(true);
            if (!confirmation) {
                throw new Error("OTP confirmation not found");
            }
            const userCredential = await confirmation.confirm(otp);
            setLoading(false);
            return userCredential;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const resendOtp = async (phoneNumber: string) => {
        try {
            setLoading(true);
            const confirmation = await signInWithPhoneNumber(auth, phoneNumber);
            return confirmation;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        sendOtp,
        verifyOtp,
        resendOtp,
        loading
    };
};