export namespace TextUtils {
  export const textFormatter = (str: string) => {
    if (!!!str) {
      return '_';
    }
    return str;
  };
  export const slugize = (str: string) =>
    [
      str
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .replace(/đ/g, 'd')
        .replace(/ /g, '-'),
      Math.random().toString(36).substring(2, 7),
    ]
      .filter(Boolean)
      .join('-');
}
