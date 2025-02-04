export interface File {
  isDirectory: boolean;
  isFile: boolean;
  isSymbolicLink: boolean;
  name: string;
  size: number;
  modifiedDate: Date;
}

export type FilePreviewOutput = { path: string; cb: (url: string) => void };

export function getFileExtension(file: File) {
  return file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase();
}

export function canPreviewFile(file: File) {
  const previewExtensions = ['pdf', 'jpg', 'jpeg', 'svg', 'html', 'png'];
  const ext = getFileExtension(file);
  return previewExtensions.includes(ext);
}
