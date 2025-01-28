import { Component, input, ViewEncapsulation } from '@angular/core';
import { Folder } from './model';

@Component({
  selector: 'ngx-voyage',
  imports: [],
  templateUrl: './ngx-voyage.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: `
    @import 'tailwindcss';
  `,
})
export class NgxVoyageComponent {
  folder = input.required<Folder>();
}
