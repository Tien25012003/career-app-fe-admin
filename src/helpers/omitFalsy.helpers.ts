// removes properties from an object where the value is "falsy" except for boolean values
export const omitFalsy = (obj: Record<string, string | number>) => {
  for (const key in obj) {
    if (typeof obj[key] !== 'boolean' && !obj[key]) {
      delete obj[key];
    }
  }
  return obj;
};
