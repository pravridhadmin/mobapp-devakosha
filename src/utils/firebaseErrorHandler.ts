export const getFirebaseError = (code: string, t: any) => {
  const errorMap: Record<string, { title: string; message?: string }> = {
    "auth/invalid-verification-code": {
      title: t("firebaseError.invalid_otp"),
    },
    "auth/session-expired": {
      title: t("firebaseError.invalid_otp"),
    },
    "auth/code-expired": {
      title: t("firebaseError.otp_expired"),
      message: t("firebaseError.request_new_otp"),
    },
    "auth/invalid-phone-number": {
      title: t("firebaseError.invalid_mobile_number"),
      message: t("firebaseError.please_enter_valid_mobile_number"),
    },
    "auth/too-many-requests": {
      title: t("firebaseError.too_many_requests"),
      message: t("firebaseError.try_again_after_some_time"),
    },
    "auth/quota-exceeded": {
      title: t("firebaseError.quota_exceeded"),
      message: t("firebaseError.try_again_after_some_time"),
    },
    "auth/missing-phone-number": {
    title: t("firebaseError.invalid_mobile_number"),
      message: t("firebaseError.please_enter_valid_mobile_number"),
    },
    "auth/captcha-check-failed": {
    title: t("firebaseError.captcha_check_failed"),
      message: t("firebaseError.try_again_after_some_time"),
    },
    "auth/network-request-failed": {
      title: t("generic.network_error"),
    },
  };

  return (
    errorMap[code] || {
      title: t("firebaseError.error"),
      message: t("firebaseError.something_went_wrong"),
    }
  );
};