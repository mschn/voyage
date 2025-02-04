import {
  AfterViewInit,
  Component,
  ElementRef,
  input,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'ngx-voyage-pdf',
  template: `
    <iframe
      #iframe
      class="mx-auto w-full lg:w-5xl xl:w-7xl"
      width="1024px"
      style="height: 90vh"
    ></iframe>
  `,
})
export class PdfComponent implements AfterViewInit {
  data = input.required<Blob>();

  iframe = viewChild<ElementRef<HTMLIFrameElement>>('iframe');

  ngAfterViewInit(): void {
    const objectUrl = URL.createObjectURL(this.data());
    const elt = this.iframe()?.nativeElement;
    if (elt) {
      elt.src = objectUrl;
    }
  }
}
