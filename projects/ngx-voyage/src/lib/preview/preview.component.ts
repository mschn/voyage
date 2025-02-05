import { Component, HostListener, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ImageExtensions, TextExtensions } from '../model/file-types';
import { getExtension } from '../model/model';
import { ImgComponent } from './img.component';
import { PdfComponent } from './pdf.component';
import { TextComponent } from './text.component';

@Component({
  selector: 'ngx-voyage-preview',
  imports: [ButtonModule, PdfComponent, ImgComponent, TextComponent],
  templateUrl: './preview.component.html',
})
export class PreviewComponent {
  data = input.required<any>();
  name = input.required<string>();
  close = output<void>();

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler() {
    this.close.emit();
  }

  isPdf() {
    return this.name()?.endsWith('.pdf');
  }

  isImage() {
    return ImageExtensions.includes(getExtension(this.name()));
  }

  isText() {
    return TextExtensions.includes(getExtension(this.name()));
  }
}
