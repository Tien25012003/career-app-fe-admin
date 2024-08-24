import dayjs from 'dayjs';

export namespace DateUtils {
  export const fDate = (date: Date) => {
    return dayjs(date).format('DD/MM/YYYY');
  };
}
