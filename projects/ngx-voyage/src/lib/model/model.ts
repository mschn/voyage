export interface File {
  isDirectory: boolean;
  isFile: boolean;
  isSymbolicLink: boolean;
  name: string;
  size: number;
  modifiedDate: Date;
}

export type FilePreviewOutput = { path: string; cb: (data: any) => void };

export function getFileExtension(file: File) {
  return getExtension(file.name);
}

export function getExtension(name: string) {
  return name.substring(name.lastIndexOf('.') + 1).toLowerCase();
}

export function canPreviewFile(file: File) {
  const previewExtensions = ['pdf', 'jpg', 'jpeg', 'svg', 'html', 'png'];
  const ext = getFileExtension(file);
  return previewExtensions.includes(ext);
}
