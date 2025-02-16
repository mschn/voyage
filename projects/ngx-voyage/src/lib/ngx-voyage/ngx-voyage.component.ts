import { Component, input, output, ViewEncapsulation } from '@angular/core';
import { ListComponent } from '../list/list.component';
import { File, FilePreviewOutput, Message } from '../model/model';
import { TitleComponent } from '../title/title.component';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'ngx-voyage',
  imports: [TitleComponent, ListComponent, MessageComponent],
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
  files = input.required<File[]>();
  message = input<Message>();

  openFolder = output<string>();
  openFile = output<string>();
  previewFile = output<FilePreviewOutput>();
}
