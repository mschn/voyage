import { formatDate, NgClass } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  input,
  LOCALE_ID,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { isToday, isYesterday } from 'date-fns';
import { MenuItem, SortEvent } from 'primeng/api';
import { ContextMenu, ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { Table, TableModule } from 'primeng/table';
import { canPreviewFile, getFileIcon } from '../model/file-types';
import {
  File,
  FilePreviewOutput,
  FileSortFields,
  getSortFieldFromLocalstorage,
  getSortOrderFromLocalstorage,
  isFileSortField,
  sortFiles,
  writeSortToLocalstorage,
} from '../model/model';
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

  contextMenu = viewChild<ContextMenu>('contextMenu');
  dataTable = viewChild<Table>('dataTable');

  path = input.required<string>();
  files = input.required<File[]>();
  filteredFiles = computed(() => {
    if (this.#store.showHiddenFiles()) {
      return this.files();
    } else {
      return this.files().filter(({ name }) => !name.startsWith('.'));
    }
  });
  sortOrder = signal<number>(0);
  sortField = signal<FileSortFields | undefined>(undefined);
  sortedFiles = computed(() => {
    if (this.sortOrder() == undefined || this.sortField() == undefined) {
      return this.filteredFiles();
    }
    return sortFiles(
      [...this.filteredFiles()],
      this.sortField(),
      this.sortOrder(),
    );
  });

  openFolder = output<string>();
  openFile = output<string>();
  previewFile = output<FilePreviewOutput>();

  prettyBytes = prettyBytes;
  getFileIcon = getFileIcon;

  selectedFile = model<File | undefined>(undefined);

  showPreview = model(false);
  previewData = signal<any | undefined>(undefined);

  menuItems: MenuItem[] = [
    {
      label: 'Preview',
      visible: false,
      command: () => {
        const f = this.selectedFile();
        if (f) {
          this.openFilePreview(f);
        }
      },
    },
    {
      label: 'Open',
      command: (event) => {
        const f = this.selectedFile();
        f && this.openFileOrFolder(f);
      },
    },
  ];

  constructor() {
    this.sortField.set(getSortFieldFromLocalstorage());
    this.sortOrder.set(getSortOrderFromLocalstorage());

    effect(() => {
      writeSortToLocalstorage(this.sortOrder(), this.sortField());
    });
  }

  onDoubleClick(file: File) {
    if (canPreviewFile(file)) {
      this.selectedFile.set(file);
      this.openFilePreview(file);
    } else {
      this.openFileOrFolder(file);
    }
  }

  openFilePreview(file: File) {
    const path = this.getTargetPath(file);
    this.previewFile.emit({
      path,
      cb: (data) => {
        this.previewData.set(data);
        this.showPreview.set(true);
      },
    });
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
    const cm = this.contextMenu();
    if (cm && event?.currentTarget && file) {
      this.selectedFile.set(file);
      this.menuItems[0].visible = canPreviewFile(file);
      cm.target = event.currentTarget as HTMLElement;
      cm.show(event);
    }
  }

  onSort(event: SortEvent) {
    if (
      event.order === 1 &&
      this.sortOrder() === -1 &&
      this.sortField() === event.field
    ) {
      this.sortField.set(undefined);
      this.sortOrder.set(0);
      this.dataTable()?.reset();
    } else {
      if (isFileSortField(event.field)) {
        this.sortField.set(event.field);
      }
      this.sortOrder.set(event.order ?? 0);
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
