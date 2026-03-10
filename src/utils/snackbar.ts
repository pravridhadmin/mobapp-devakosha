let snackbarRef: any;

export const setSnackbar = (ref: any) => {
  snackbarRef = ref;
};

export const showSnackbar = (message: string, type = "info") => {
  snackbarRef?.showSnackbar(message, type);
};