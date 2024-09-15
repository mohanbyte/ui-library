import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { WidthSelectorComponent } from 'projects/components/src/lib/width-selector/width-selector.component';
@NgModule({
  declarations: [
    // other components
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    // other modules
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    AppRoutingModule,
    WidthSelectorComponent,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
