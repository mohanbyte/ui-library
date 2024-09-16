import { NgModule } from '@angular/core';
import { ComponentsComponent } from './components.component';
import { WidthSelectorComponent } from './width-selector/width-selector.component';

@NgModule({
  declarations: [ComponentsComponent],
  imports: [WidthSelectorComponent],
  exports: [ComponentsComponent],
})
export class ComponentsModule {}
