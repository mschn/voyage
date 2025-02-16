import { Component, computed, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PopoverModule } from 'primeng/popover';
import { SettingsComponent } from '../settings/settings.component';

@Component({
  selector: 'ngx-voyage-title',
  templateUrl: './title.component.html',
  imports: [ButtonModule, PopoverModule, SettingsComponent],
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
