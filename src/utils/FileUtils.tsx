export type FileAndPath = File & { path?: string };

export namespace FileUtils {
  export const fetchFileFromPath = async (filePath: string): Promise<FileAndPath> => {
    const response = await fetch(filePath);
    const blob = await response.blob();

    const file: FileAndPath = new File([blob], 'Image', { type: blob.type });
    file.path = filePath;

    return file;
  };
}
