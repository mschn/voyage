import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  HostListener,
  input,
  output,
  viewChild,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'ngx-voyage-preview',
  imports: [ButtonModule],
  templateUrl: './preview.component.html',
})
export class PreviewComponent implements AfterViewInit {
  data = input.required<any>();
  name = input<string>();
  close = output<void>();

  iframe = viewChild<ElementRef<HTMLIFrameElement>>('iframe');

  constructor() {
    effect(() => {});
  }

  ngAfterViewInit(): void {
    const objectUrl = URL.createObjectURL(this.data());
    const elt = this.iframe()?.nativeElement;
    if (elt) {
      elt.src = objectUrl;
    }
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler() {
    this.close.emit();
  }
}
