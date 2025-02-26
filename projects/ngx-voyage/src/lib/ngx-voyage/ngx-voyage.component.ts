import { Component, input, output, ViewEncapsulation } from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';
import { ListComponent } from '../list/list.component';
import { Message } from '../model/message';
import { addType, File, FilePreviewOutput } from '../model/model';
import { TitleComponent } from '../title/title.component';

@Component({
  selector: 'ngx-voyage',
  imports: [TitleComponent, ListComponent, ProgressBarModule],
  templateUrl: './ngx-voyage.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'flex flex-col overflow-hidden',
  },
  styleUrls: [
    'ngx-voyage.component.css',
    '../../../../../node_modules/@fortawesome/fontawesome-free/css/fontawesome.css',
    '../../../../../node_modules/@fortawesome/fontawesome-free/css/solid.css',
    '../../../../../node_modules/@fortawesome/fontawesome-free/css/regular.css',
    '../../../../../node_modules/@fortawesome/fontawesome-free/css/brands.css',
  ],
})
export class NgxVoyageComponent {
  path = input.required<string>();
  files = input.required<File[], File[]>({
    transform: (files) => {
      files.forEach((f) => addType(f));
      return files;
    },
  });
  message = input<Message>();
  loading = input<boolean>(false);

  openFolder = output<string>();
  openFile = output<string>();
  previewFile = output<FilePreviewOutput>();
}
