export namespace SchemaUtils {
  export const vaidator = {
    isNonEmptyHtml: (str: string) => !!str.replace(/(<([^>]+)>)/gi, '').trim(),
    isNonEmptyString: (str: string) => !!str.trim(),
    isNonNullFile: (file: File | null) => file !== null,
  };
  export const message = {
    nonempty: 'Vui lòng không bỏ trống!',
    invalidEmail: 'Email không hợp lệ!',
    invalidLink: 'Liên kết không hợp lệ!',
    invalidNumber: 'Vui lòng nhập giá trị số!',
  };
}
