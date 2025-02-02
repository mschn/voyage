import { Component, computed, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'ngx-voyage-title',
  templateUrl: './title.component.html',
  imports: [ButtonModule],
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
