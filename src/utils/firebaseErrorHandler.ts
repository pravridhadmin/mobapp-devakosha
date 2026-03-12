export const getFirebaseOtpError = (code: string, t: any) => {
  const errorMap: Record<string, { title: string; message?: string }> = {
    "auth/invalid-verification-code": {
      title: t("otpScreen.invalid_otp"),
    },
    "auth/code-expired": {
      title: t("otpScreen.otp_expired"),
      message: t("otpScreen.request_new_otp"),
    },
    "auth/too-many-requests": {
      title: t("otpScreen.too_many_requests"),
      message: t("otpScreen.try_again_after_some_time"),
    },
    "auth/session-expired": {
      title: t("otpScreen.invalid_otp"),
    },
  };

  return errorMap[code] || {
    title: t("otpScreen.error"),
    message: t("otpScreen.something_went_wrong"),
  };
};


export const getFirebaseSendOtpError = (code: string, t: any) => {
  const map: Record<string, { title: string; message?: string }> = {
    "auth/invalid-phone-number": {
      title: t("signin.invalid_mobile_number"),
      message: t("signin.please_enter_valid_mobile_number"),
    },
    "auth/too-many-requests": {
      title: t("otpScreen.please_enter_valid_mobile_number"),
      message: t("otpScreen.try_again_after_some_time"),
    },
    "auth/network-request-failed": {
      title: t("generic.network_error"),
    },
  };

  return (
    map[code] || {
      title: t("otpScreen.error"),
      message: t("otpScreen.something_went_wrong"),
    }
  );
};