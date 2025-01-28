import { Component, input, ViewEncapsulation } from '@angular/core';
import { File } from './model';

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
  files = input.required<File[]>();
}
