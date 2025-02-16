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
import {
  File,
  FilePreviewOutput,
  NgxVoyageComponent,
  isMessage,
} from 'ngx-voyage';
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

      if (json.error) {
        return {
          text: json.error,
          type: 'error',
        };
      }
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

  message = computed(() => {
    const value = this.filesResource.value();
    if (isMessage(value)) {
      return value;
    }
    return undefined;
  });

  files = computed<File[]>(() => {
    const value = this.filesResource.value();
    if (this.filesResource.hasValue() && Array.isArray(value)) {
      return value ?? [];
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
    fetch(`${API_URL}/open/${url}`).then(async (value) => {
      const blob = await value.blob();
      cb(blob);
    });
  }
}
