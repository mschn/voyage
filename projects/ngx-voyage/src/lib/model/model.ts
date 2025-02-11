export interface File {
  isDirectory: boolean;
  isFile: boolean;
  isSymbolicLink: boolean;
  name: string;
  size: number;
  modifiedDate: Date;
}

export type FileSortKeys = 'name' | 'size' | 'modifiedDate';

export type FilePreviewOutput = { path: string; cb: (data: any) => void };

export function getFileExtension(file: File) {
  return getExtension(file.name);
}

export function getExtension(name: string) {
  return name.substring(name.lastIndexOf('.') + 1).toLowerCase();
}

export function sortFiles(
  files: File[],
  field?: FileSortKeys,
  order?: number,
): File[] {
  if (field == undefined || order == undefined) {
    return files;
  }

  return files.sort((f1, f2) => {
    let value1 = f1[field];
    let value2 = f2[field];
    let result = null;
    if (value1 == null && value2 != null) result = -1;
    else if (value1 != null && value2 == null) result = 1;
    else if (value1 == null && value2 == null) result = 0;
    else if (typeof value1 === 'string' && typeof value2 === 'string')
      result = value1.localeCompare(value2);
    else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
    return order * result;
  });
}
