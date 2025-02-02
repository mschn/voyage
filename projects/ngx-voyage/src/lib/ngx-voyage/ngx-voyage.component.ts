import { NgClass } from '@angular/common';
import { Component, input, output, ViewEncapsulation } from '@angular/core';
import { File } from '../model/model';
import { prettyBytes } from '../model/utils';
import { TitleComponent } from '../title/title.component';

@Component({
  selector: 'ngx-voyage',
  imports: [TitleComponent, NgClass],
  templateUrl: './ngx-voyage.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: 'ngx-voyage.component.css',
  host: {
    class: 'flex flex-col overflow-hidden',
  },
})
export class NgxVoyageComponent {
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
