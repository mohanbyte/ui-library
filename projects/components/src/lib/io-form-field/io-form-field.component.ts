import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'lib-io-form-field',
  templateUrl: './io-form-field.component.html',
  styleUrls: ['./io-form-field.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
})
export class IoFormFieldComponent {
  @Input() appearance: 'outline' | 'fill' = 'outline';
  @Input() type: 'number' | 'text' | 'date' | 'password' | 'textarea' = 'text';
  @Input() label: string = '';
  @Input() suffixIcon: string = '';
  @Input() prefixIcon: string = '';
}
