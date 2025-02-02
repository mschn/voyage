import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { File } from '../model/model';
import { prettyBytes } from '../model/utils';

@Component({
  selector: 'ngx-voyage-list',
  templateUrl: './list.component.html',
  imports: [NgClass],
})
export class ListComponent {
  path = input.required<string>();
  files = input.required<File[]>();

  openFolder = output<string>();
  openFile = output<string>();

  prettyBytes = prettyBytes;

  onRowClick(file: File) {
    const targetPath = `${this.path()}/${file.name}`.replaceAll('//', '/');
    if (file.isDirectory) {
      this.openFolder.emit(targetPath);
    } else {
      this.openFile.emit(targetPath);
    }
  }
}
