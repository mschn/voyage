import { formatDate, NgClass } from '@angular/common';
import {
  Component,
  computed,
  inject,
  input,
  LOCALE_ID,
  model,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import { isToday, isYesterday } from 'date-fns';
import { MenuItem } from 'primeng/api';
import { ContextMenu, ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { getFileIcon } from '../model/icon';
import { File, FilePreviewOutput } from '../model/model';
import { Store } from '../model/store';
import { prettyBytes } from '../model/utils';
import { PreviewComponent } from '../preview/preview.component';
@Component({
  selector: 'ngx-voyage-list',
  templateUrl: './list.component.html',
  imports: [
    NgClass,
    TableModule,
    ContextMenu,
    ContextMenuModule,
    DialogModule,
    PreviewComponent,
  ],
})
export class ListComponent {
  #locale = inject(LOCALE_ID);
  #store = inject(Store);

  @ViewChild('cm') cm: ContextMenu | undefined = undefined;

  path = input.required<string>();
  files = input.required<File[]>();
  filteredFiles = computed(() => {
    if (this.#store.showHiddenFiles()) {
      return this.files();
    } else {
      return this.files().filter(({ name }) => !name.startsWith('.'));
    }
  });

  openFolder = output<string>();
  openFile = output<string>();
  previewFile = output<FilePreviewOutput>();

  prettyBytes = prettyBytes;
  getFileIcon = getFileIcon;

  selectedFile = model<File | undefined>(undefined);

  showPreview = model(false);
  previewUrl = signal<string | undefined>(undefined);

  menuItems: MenuItem[] = [
    {
      label: 'Open',
      command: (event) => {
        const f = this.selectedFile();
        f && this.openFileOrFolder(f);
      },
    },
    {
      label: 'Preview',
      command: () => {
        const f = this.selectedFile();
        if (f) {
          const path = this.getTargetPath(f);
          this.previewFile.emit({
            path,
            cb: (url) => {
              this.previewUrl.set(url);
              this.showPreview.set(true);
            },
          });
        }
      },
    },
  ];

  onRowClick(event: MouseEvent, file: File) {
    if (event.ctrlKey || event.metaKey) {
      this.openFileOrFolder(file);
    }
  }

  preventSelectionOnDblClick(event: MouseEvent) {
    if (event.detail > 1) {
      event.preventDefault();
    }
  }

  openFileOrFolder(file: File) {
    const targetPath = this.getTargetPath(file);
    if (file.isDirectory) {
      this.openFolder.emit(targetPath);
    } else {
      this.openFile.emit(targetPath);
    }
  }

  onContextMenu(event: MouseEvent, file: File) {
    if (this.cm && event?.currentTarget && file) {
      this.selectedFile.set(file);
      this.cm.target = event.currentTarget as HTMLElement;
      this.cm.show(event);
    }
  }

  formatDate(file: File) {
    const time = formatDate(file.modifiedDate, 'H:mm', this.#locale);
    if (isToday(file.modifiedDate)) {
      return `Today at ${time}`;
    } else if (isYesterday(file.modifiedDate)) {
      return `Yesterday at ${time}`;
    } else {
      return `${formatDate(file.modifiedDate, 'd LLL YYYY', this.#locale)} at ${time}`;
    }
  }

  getTargetPath(file: File) {
    return `${this.path()}/${file.name}`.replaceAll('//', '/');
  }
}
