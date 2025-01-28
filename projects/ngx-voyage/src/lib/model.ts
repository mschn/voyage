export type Item = Folder | File;

export interface Folder {
  type: 'folder';
  children: Item[];
  name: string;
  modifiedDate: Date;
}

export interface File {
  type: 'file';
  size: number;
  name: string;
  modifiedDate: Date;
}
