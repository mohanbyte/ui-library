import { Component } from '@angular/core';

@Component({
  selector: 'app-width-selector',
  templateUrl: './width-selector.component.html',
  styleUrls: ['./width-selector.component.scss'],
})
export class WidthSelectorComponent {
  width: number = 400;

  increaseWidth() {
    this.width += 10;
  }

  decreaseWidth() {
    if (this.width > 10) {
      this.width -= 10;
    }
  }
}
