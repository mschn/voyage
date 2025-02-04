import { Component, computed, inject, input, output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'ngx-voyage-preview',
  imports: [ButtonModule],
  templateUrl: './preview.component.html',
})
export class PreviewComponent {
  #sanitizer = inject(DomSanitizer);

  url = input.required<string>();
  name = input<string>();
  close = output<void>();

  safeUrl = computed(() =>
    this.#sanitizer.bypassSecurityTrustResourceUrl(this.url()),
  );
}
