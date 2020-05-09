import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaskRgDirective } from './mask-rg.directive';
import { MaskCpfDirective } from './mask-cpf.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MaskCpfDirective,
    MaskRgDirective
  ],
  exports: [
    MaskCpfDirective,
    MaskRgDirective
  ]
})
export class DirectiveModule { }
