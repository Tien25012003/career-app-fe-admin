export namespace TextUtils {
  export const textFormatter = (str: string) => {
    if (!str) {
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
  export const prettyBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) {
      return '0 bytes';
    }
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
  };
}
