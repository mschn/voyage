import { Component, inject, model, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { Store } from '../model/store';
import { TranslatePipe } from '../i18n/translate.pipe';

@Component({
  selector: 'ngx-voyage-settings',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ToggleSwitchModule,
    TranslatePipe,
  ],
  templateUrl: './settings.component.html',
})
export class SettingsComponent {
  store = inject(Store);
}
