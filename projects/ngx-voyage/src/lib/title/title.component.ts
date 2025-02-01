import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'ngx-voyage-title',
  template: `
    <div class="p-3 bg-gray-200 flex flex-row">
      @for (fragment of pathWithRoot(); track fragment; let isLast = $last) {
        <button
          class="px-2 py-1 border border-r-0 last:border-r border-gray-400
          bg-gray-300 hover:bg-gray-200 text-gray-800
          transition duration-300
           first:rounded-l-md last:rounded-r-md"
          (click)="navigate.emit(fragment.path)"
          >{{ fragment.name }}</button
        >
      }
    </div>
  `,
})
export class TitleComponent {
  path = input.required<string>();

  pathWithRoot = computed(() => {
    if (this.path() === '/') {
      return [{ name: '/', path: '/' }];
    }
    return decodeURIComponent(this.path())
      .split('/')
      .reduce((acc: { name: string; path: string }[], cur, i) => {
        if (i === 0) {
          return [{ name: '/', path: '/' }];
        }
        const prevPath = acc[acc.length - 1].path;
        acc.push({
          path: `${prevPath !== '/' ? prevPath : ''}/${cur}`,
          name: cur,
        });
        return acc;
      }, []);
  });

  navigate = output<string>();
}
