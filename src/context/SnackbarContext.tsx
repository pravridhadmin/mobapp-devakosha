import React, { createContext, useContext, useEffect, useState } from "react";
import { setSnackbar } from "../utils/snackbar";
import Snackbar from "../components/Snackbar";

type SnackbarType = "success" | "error" | "warning" | "info";

interface SnackbarState {
    visible: boolean;
    message: string;
    type: SnackbarType;
}

interface SnackbarContextType {
    showSnackbar: (message: string, type?: SnackbarType) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const SnackbarProvider = ({ children }) => {
    const [snack, setSnack] = useState<SnackbarState>({
        visible: false,
        message: "",
        type: "info",
    });

    const showSnackbar = (message: string, type: SnackbarType = "info") => {
        setSnack({
            visible: true,
            message,
            type,
        });
    };


    const hideSnackbar = () => {
        setSnack((prev) => ({ ...prev, visible: false }));
    };

    // register global ref
    useEffect(() => {
        setSnackbar({ showSnackbar });
    }, []);

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}

            <Snackbar
                visible={snack.visible}
                message={snack.message}
                type={snack.type}
                onDismiss={hideSnackbar}
            />
        </SnackbarContext.Provider>
    );
};

export const useSnackbar = () => {
    const context = useContext(SnackbarContext);

    if (!context) {
        throw new Error("useSnackbar must be used inside SnackbarProvider");
    }

    return context;
};