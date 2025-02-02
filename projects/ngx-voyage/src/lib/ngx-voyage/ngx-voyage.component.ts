import { Component, input, output, ViewEncapsulation } from '@angular/core';
import { ListComponent } from '../list/list.component';
import { File } from '../model/model';
import { TitleComponent } from '../title/title.component';

@Component({
  selector: 'ngx-voyage',
  imports: [TitleComponent, ListComponent],
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
}
