import dayjs from 'dayjs';

export namespace DateUtils {
  export const fDate = (date: Date | number, formatType: string = DATE_FORMAT) => {
    return dayjs(date).format(formatType);
  };
}

export const DATETIME_FORMAT = 'DD-MM-YYYY HH:mm:ss';
export const DATE_FORMAT = 'DD-MM-YYYY';
