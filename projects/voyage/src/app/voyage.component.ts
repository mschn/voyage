import {
  Component,
  computed,
  DestroyRef,
  inject,
  resource,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { File, FilePreviewOutput, NgxVoyageComponent } from 'ngx-voyage';
import { filter } from 'rxjs';
import { API_URL } from './model';

@Component({
  selector: 'app-root',
  imports: [NgxVoyageComponent],
  templateUrl: './voyage.component.html',
})
export class VoyageComponent {
  #router = inject(Router);
  #destroyRef = inject(DestroyRef);
  path = signal<string>('/');

  filesResource = resource({
    request: () => encodeURIComponent(this.path()),
    loader: async ({ request, abortSignal }) => {
      const response = await fetch(`${API_URL}/ls/${request}`, {
        signal: abortSignal,
      });
      const json = await response.json();
      return json.map((file: File) => ({
        ...file,
        modifiedDate: new Date(file.modifiedDate),
      })) as File[];
    },
  });

  version = resource({
    loader: async () => {
      const response = await fetch(`${API_URL}/version`);
      return await response.text();
    },
  });

  files = computed<File[]>(() => {
    if (this.filesResource.hasValue()) {
      return this.filesResource.value() ?? [];
    }
    return [];
  });

  constructor() {
    this.#router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(this.#destroyRef),
      )
      .subscribe((event) => {
        this.path.set(event.url);
      });
  }

  openFolder(path: string) {
    this.path.set(path);
    this.#router.navigateByUrl(path);
  }

  openFile(path: string) {
    const url = encodeURIComponent(path);
    window.open(`${API_URL}/open/${url}`, '_blank')?.focus();
  }

  getFileContent({ path, cb }: FilePreviewOutput) {
    const url = encodeURIComponent(path);
    cb(`${API_URL}/open/${url}`);
  }
}
