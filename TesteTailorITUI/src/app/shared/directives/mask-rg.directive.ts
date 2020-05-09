import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appMaskRg]'
})
export class MaskRgDirective {

  constructor() {}
  
  public aplicarMascaraRg(v: string) : string {
    v=v.replace("-","");
    v=v.replace(".","");
    if(v.length <= 8){
      v = v.replace(/\D/g, '');
    }
    v=v.replace(/([0-9]{2})([0-9]{3})([0-9]{3})([0-9A-Za-z]{1})$/,"$1.$2.$3-$4");
    return v
  }

  @HostListener('keyup', ['$event'])
  onKeyup($event: any) {
    $event.target.value = this.aplicarMascaraRg($event.target.value);
  }
}
