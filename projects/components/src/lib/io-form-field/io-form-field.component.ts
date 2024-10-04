import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  SimpleChanges,
} from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
    ReactiveFormsModule,
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IoFormFieldComponent {
  @Input() appearance: 'outline' | 'fill' = 'outline';
  @Input() type: 'number' | 'text' | 'date' | 'password' | 'textarea' = 'text';
  @Input() label: string = '';
  @Input() suffixIcon: string = '';
  @Input() prefixIcon: string = '';
  @Input() hint: string = '';
  @Input() showHint: boolean = true;
  @Input() showLabel: boolean = true;
  @Input() showCounter: boolean = false;
  @Input() counterLimit: number = 20;
  @Input() errorText: string = 'This field is a required';
  @Input() requiredField: boolean = false;
  @Input() placeholder: string = 'Placeholder';
  @Input() prefixText: string = '';
  @Input() suffixText: string = '';
  @Input() prefixType: 'none' | 'icon' | 'text';
  @Input() suffixType: 'none' | 'icon' | 'text';
  @Input() disabled: boolean = false;
  userForm = new FormControl('');
  ngOnInit() {
    if (this.requiredField) {
      this.userForm.setValidators([Validators.required]);
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if (this.requiredField) {
      this.userForm.setValidators(Validators.required);
    }
    if (this.disabled) {
      this.userForm.disable();
    }
  }
}
