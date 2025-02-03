import { Component, inject, model, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { Store } from '../model/store';

@Component({
  selector: 'ngx-voyage-settings',
  imports: [FormsModule, ReactiveFormsModule, ToggleSwitchModule],
  templateUrl: './settings.component.html',
})
export class SettingsComponent {
  store = inject(Store);
}
