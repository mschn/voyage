import { Component, computed, input } from '@angular/core';
import { Message } from '../model/message';

@Component({
  selector: 'ngx-voyage-message',
  template: `
    @if (message()) {
      <div
        class="p-4 border rounded-md {{ bgColor }} {{
          textColor
        }} flex gap-2 items-center"
      >
        <i class="fa-solid {{ icon }} text-xl"></i>
        <span>{{ message()?.text }}</span>
      </div>
    }
  `,
})
export class MessageComponent {
  message = input<Message | undefined>();

  classes = {
    error: {
      bg: 'bg-red-100 dark:bg-red-800',
      text: 'text-red-700 dark:text-red-300',
      icon: 'fa-circle-xmark',
    },
    warn: {
      bg: 'bg-orange-100 dark:bg-orange-800',
      text: 'text-orange-700 dark:text-orange-300',
      icon: 'fa-triangle-exclamation',
    },
    info: {
      bg: 'bg-gray-100 dark:bg-gray-800',
      text: 'text-gray-700 dark:text-gray-300',
      icon: 'fa-circle-info',
    },
  };

  type = computed(() => this.message()?.type ?? 'info');

  get bgColor() {
    return this.classes[this.type()].bg;
  }

  get textColor() {
    return this.classes[this.type()].text;
  }

  get icon() {
    return this.classes[this.type()].icon;
  }
}
