import { NgClass } from '@angular/common';
import { Component, input, output, ViewEncapsulation } from '@angular/core';
import { File } from './model';
import { TitleComponent } from './title.component';

@Component({
  selector: 'ngx-voyage',
  imports: [TitleComponent, NgClass],
  templateUrl: './ngx-voyage.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: 'ngx-voyage.component.css',
})
export class NgxVoyageComponent {
  path = input.required<string[]>();
  files = input.required<File[]>();
  openFolder = output<string[]>();

  titleNavigate(path: string) {
    const paths = path
      .split('/')
      .slice(1)
      .filter((p) => p !== '');
    this.openFolder.emit(paths);
  }

  onRowClick(file: File) {
    this.openFolder.emit([...this.path(), file.name]);
  }
}
