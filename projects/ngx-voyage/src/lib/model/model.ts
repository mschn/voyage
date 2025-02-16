export interface File {
  isDirectory: boolean;
  isFile: boolean;
  isSymbolicLink: boolean;
  name: string;
  size: number;
  modifiedDate: Date;
}

export interface Message {
  text: string;
  type: 'info' | 'warn' | 'error';
}

export type FileSortFields = 'name' | 'size' | 'modifiedDate';

export function isFileEqual(f1: File, f2: File) {
  return (
    f1.name === f2.name &&
    f1.isDirectory === f2.isDirectory &&
    f1.isFile === f2.isFile &&
    f1.size === f2.size
  );
}

export function isFileSortField(
  field?: string | null,
): field is FileSortFields {
  return field === 'name' || field === 'size' || field === 'modifiedDate';
}

export type FilePreviewOutput = { path: string; cb: (data: any) => void };

export function getFileExtension(file: File) {
  return getExtension(file.name);
}

export function getExtension(name: string) {
  return name.substring(name.lastIndexOf('.') + 1).toLowerCase();
}

export function sortFiles(
  files: File[],
  field?: FileSortFields,
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

export const LocalstorageKeys = {
  sort: 'VOYAGE_SORT_ORDER',
  field: 'VOYAGE_SORT_FIELD',
};

export function getSortOrderFromLocalstorage(): number {
  const storageSort = localStorage.getItem(LocalstorageKeys.sort);
  if (storageSort == null) {
    return 0;
  }
  const sort = Number.parseInt(storageSort);
  if (isNaN(sort)) {
    return 0;
  }
  return sort;
}

export function getSortFieldFromLocalstorage(): FileSortFields | undefined {
  const storageField = localStorage.getItem(LocalstorageKeys.field);
  if (isFileSortField(storageField)) {
    return storageField;
  }
  return undefined;
}

export function writeSortToLocalstorage(
  order: number | undefined,
  field: string | undefined,
) {
  localStorage.setItem(LocalstorageKeys.field, `${field}`);
  localStorage.setItem(LocalstorageKeys.sort, `${order}`);

  console.log('sync to localstorage', order, field);
}
