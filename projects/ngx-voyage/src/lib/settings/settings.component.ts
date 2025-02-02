import { Component, inject, model, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'ngx-voyage-settings',
  imports: [FormsModule, ReactiveFormsModule, ToggleSwitchModule],
  templateUrl: './settings.component.html',
})
export class SettingsComponent {
  settingsService = inject(SettingsService);
}
