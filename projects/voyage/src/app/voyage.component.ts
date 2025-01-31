import { Component, computed, resource, signal } from '@angular/core';
import { File, NgxVoyageComponent } from 'ngx-voyage';

@Component({
  selector: 'app-root',
  imports: [NgxVoyageComponent],
  template: `<div class="h-full w-full"
    ><ngx-voyage
      [path]="path()"
      [files]="files()"
      (openFolder)="openFolder($event)"
    ></ngx-voyage
  ></div>`,
})
export class VoyageComponent {
  path = signal<string[]>([]);

  filesResource = resource({
    request: () => encodeURIComponent('/' + this.path().join('/')),
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

  openFolder(path: string[]) {
    this.path.set(path);
  }
}
