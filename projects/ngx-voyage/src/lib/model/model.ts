export interface File {
  isDirectory: boolean;
  isFile: boolean;
  isSymbolicLink: boolean;
  name: string;
  size: number;
  modifiedDate: Date;
}
