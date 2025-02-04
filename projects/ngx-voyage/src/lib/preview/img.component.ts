import {
  AfterViewInit,
  Component,
  ElementRef,
  input,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'ngx-voyage-img',
  template: ` <img #img class="mx-auto" /> `,
  styles: `
    img {
      max-width: 90vw;
      max-height: 90vh;
    }
  `,
})
export class ImgComponent implements AfterViewInit {
  data = input.required<Blob>();
  iframe = viewChild<ElementRef<HTMLIFrameElement>>('img');

  ngAfterViewInit(): void {
    const objectUrl = URL.createObjectURL(this.data());
    const elt = this.iframe()?.nativeElement;
    if (elt) {
      elt.src = objectUrl;
    }
  }
}
