import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Input, Output, EventEmitter } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-width-selector',
  templateUrl: './width-selector.component.html',
  styleUrls: ['./width-selector.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
  ],
})
export class WidthSelectorComponent {
  width: number = 400;
  @Input() type = 'text';
  @Input() placeholder = 'Input Field';
  @Input() prefixIcon = 'add';
  @Input() suffixIcon = 'remove';
  increaseWidth() {
    this.width += 10;
  }

  decreaseWidth() {
    if (this.width > 10) {
      this.width -= 10;
    }
  }
}
