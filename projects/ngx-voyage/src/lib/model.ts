export interface File {
  type: 'folder' | 'file';
  name: string;
  size: number;
  modifiedDate: Date;
}
