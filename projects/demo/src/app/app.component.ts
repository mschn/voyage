import { Component, computed, resource, signal } from '@angular/core';
import { File, NgxVoyageComponent } from 'ngx-voyage';

@Component({
  selector: 'app-root',
  imports: [NgxVoyageComponent],
  template: '<ngx-voyage [files]="files()"></ngx-voyage>',
})
export class DemoComponent {
  path = signal('/');

  filesResource = resource({
    request: () => encodeURIComponent(this.path()),
    loader: async ({ request, abortSignal }) => {
      const response = await fetch(`http://localhost:3003/ls/${request}`, {
        signal: abortSignal,
      });
      return (await response.json()) as File[];
    },
  });

  files = computed<File[]>(() => {
    if (this.filesResource.hasValue()) {
      return this.filesResource.value() ?? [];
    }
    return [];
  });
}
