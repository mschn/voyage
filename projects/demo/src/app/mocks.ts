import { Folder } from 'ngx-voyage';

export const homeMock: Folder = {
  name: 'home',
  type: 'folder',
  modifiedDate: new Date('2020-10-10'),
  children: [
    {
      type: 'folder',
      name: 'documents',
      modifiedDate: new Date('2020-10-10'),
      children: [],
    },
    {
      type: 'folder',
      name: 'pictures',
      modifiedDate: new Date('2020-10-10'),
      children: [],
    },
    {
      type: 'folder',
      name: 'tmp',
      modifiedDate: new Date('2020-10-10'),
      children: [],
    },
    {
      type: 'file',
      name: 'angular.png',
      modifiedDate: new Date('2020-10-10'),
      size: 11235,
    },
    {
      type: 'file',
      name: 'README.md',
      modifiedDate: new Date('2020-10-10'),
      size: 1235,
    },
  ],
};
