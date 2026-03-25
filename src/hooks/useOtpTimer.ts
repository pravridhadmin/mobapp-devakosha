import { useEffect, useState, useRef } from "react";
import { RESEND_OTP_TIME } from "../utils/constants";

export const useOtpTimer = (duration: number = RESEND_OTP_TIME) => {
  const [timer, setTimer] = useState(duration);
  const [canResend, setCanResend] = useState(false);

  const expiryRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    expiryRef.current = Date.now() + duration * 1000;
    setCanResend(false);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      if (!expiryRef.current) return;

      const remaining = Math.max(
        0,
        Math.floor((expiryRef.current - Date.now()) / 1000)
      );

      setTimer(remaining);

      if (remaining === 0) {
        setCanResend(true);
        clearInterval(intervalRef.current!);
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return {
    timer,
    canResend,
    startTimer,
  };
};