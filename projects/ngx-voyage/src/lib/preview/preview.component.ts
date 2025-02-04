import { Component, HostListener, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PdfComponent } from './pdf.component';
import { getExtension } from '../model/model';
import { ImgComponent } from './img.component';

@Component({
  selector: 'ngx-voyage-preview',
  imports: [ButtonModule, PdfComponent, ImgComponent],
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
    // TODO move extensions to .model.ts
    const imageExt = ['png', 'jpg', 'jpeg', 'gif', 'svg'];
    const ext = getExtension(this.name());
    return imageExt.includes(ext);
  }
}
