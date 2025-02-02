import { DatePipe, NgClass } from '@angular/common';
import { Component, computed, inject, input, output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { getFileIcon } from '../model/icon';
import { File } from '../model/model';
import { prettyBytes } from '../model/utils';
import { SettingsService } from '../services/settings.service';
@Component({
  selector: 'ngx-voyage-list',
  templateUrl: './list.component.html',
  imports: [NgClass, TableModule, DatePipe],
})
export class ListComponent {
  #settingsService = inject(SettingsService);

  path = input.required<string>();
  files = input.required<File[]>();
  filteredFiles = computed(() => {
    if (this.#settingsService.showHiddenFiles()) {
      return this.files();
    } else {
      return this.files().filter(({ name }) => !name.startsWith('.'));
    }
  });

  openFolder = output<string>();
  openFile = output<string>();

  prettyBytes = prettyBytes;
  getFileIcon = getFileIcon;

  onRowClick(file: File) {
    const targetPath = `${this.path()}/${file.name}`.replaceAll('//', '/');
    if (file.isDirectory) {
      this.openFolder.emit(targetPath);
    } else {
      this.openFile.emit(targetPath);
    }
  }
}
