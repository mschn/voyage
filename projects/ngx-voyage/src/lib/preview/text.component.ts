import { AfterViewInit, Component, input, signal } from '@angular/core';

@Component({
  selector: 'ngx-voyage-text',
  template: ` <div
    class="bg-white mx-auto max-w-[90vw] h-[90vh] overflow-y-auto p-3"
  >
    <pre class="whitespace-pre-wrap text-sm">{{ text() }}</pre>
  </div>`,
})
export class TextComponent implements AfterViewInit {
  data = input.required<Blob>();
  text = signal<string>('');

  ngAfterViewInit(): void {
    var reader = new FileReader();
    reader.onload = () => {
      this.text.set(reader.result?.toString() ?? '');
    };
    reader.readAsText(this.data());
  }
}
