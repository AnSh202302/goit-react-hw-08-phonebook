export const normalizeName = value => {
  return value.trim().replace(/\s+/gu, ' ');
};
export const getPhoneKey = value => {
  return value.replace(/\D/gu, '');
};

export const normalizePhone = value => {
  return value.replace(/\s+/gu, '');
};

export const isValidName = value => {
  return /^\p{L}+(?:[ '’-]\p{L}+)*$/u.test(value);
};

export const isValidPhone = value => {
  return /^\+?[\d().-]+$/u.test(value) && /\d/u.test(value);
};
