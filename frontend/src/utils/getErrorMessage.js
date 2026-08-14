const getErrorMessage = (error, fallback = 'An unexpected error occurred.') => {
  if (typeof error === 'string') {
    return error;
  }

  const message = error?.data?.message ?? error?.message ?? error?.error;

  return typeof message === 'string' ? message : fallback;
};

export default getErrorMessage;
