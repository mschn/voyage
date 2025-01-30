import { Component, input } from '@angular/core';

@Component({
  selector: 'ngx-voyage-title',
  template: `
    <div class="p-3 bg-gray-200">
      <div
        class="bg-white border border-gray-400 rounded-md p-2 flex flex-row gap-1"
      >
        <span>/</span>
        @for (fragment of path(); track fragment; let isLast = $last) {
          <span>{{ fragment }}</span>
          @if (!isLast) {
            <span>/</span>
          }
        }
      </div>
    </div>
  `,
})
export class TitleComponent {
  path = input.required<string[]>();
}
