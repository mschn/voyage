import { Component, input, output, ViewEncapsulation } from '@angular/core';
import { File } from './model';
import { NgClass } from '@angular/common';
import { TitleComponent } from './title.component';

@Component({
  selector: 'ngx-voyage',
  imports: [TitleComponent, NgClass],
  templateUrl: './ngx-voyage.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: `
    @import 'tailwindcss';
  `,
})
export class NgxVoyageComponent {
  path = input.required<string[]>();
  files = input.required<File[]>();
  openFolder = output<string[]>();

  onRowClick(file: File) {
    this.openFolder.emit([...this.path(), file.name]);
  }
}
