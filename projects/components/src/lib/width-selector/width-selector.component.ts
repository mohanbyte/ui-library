import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-width-selector',
  templateUrl: './width-selector.component.html',
  styleUrls: ['./width-selector.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class WidthSelectorComponent {
  width: number = 400;
  @Input() text = 'Welcome';
  @Input() placeholder = 'Input Field';

  increaseWidth() {
    this.width += 10;
  }

  decreaseWidth() {
    if (this.width > 10) {
      this.width -= 10;
    }
  }
}
