import { Component } from '@angular/core';
import { NgxVoyageComponent } from 'ngx-voyage';
import { homeMock } from './mocks';

@Component({
  selector: 'app-root',
  imports: [NgxVoyageComponent],
  template: '<ngx-voyage [folder]="folder"></ngx-voyage>',
})
export class DemoComponent {
  folder = homeMock;
}
