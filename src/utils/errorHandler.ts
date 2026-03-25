import i18n from "../i18n/i18n";
import { showSnackbar } from "./snackbar";

export const handleApiError = (error: any) => {
  const status = error?.response?.status;

  const backendMessage = error?.response?.data?.message;

  let message = i18n.t("errors.something_went_wrong");

  switch (status) {
    case 400:
      message = backendMessage || i18n.t("errors.bad_request");
      break;

    case 401:
      message = i18n.t("errors.session_expired");
      break;

    case 403:
      message = i18n.t("errors.not_authorized");
      break;

    case 404:
      message = i18n.t("errors.not_found");
      break;

    case 500:
      message = i18n.t("errors.server_error");
      break;

    default:
      message = backendMessage || i18n.t("errors.something_went_wrong");
  }

  showSnackbar(message);

  return message;
};