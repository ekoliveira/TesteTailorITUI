import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appMaskCpf]'
})
export class MaskCpfDirective {

  constructor() {}

  public aplicarMascaraCpf(v: string) : string {
    // Remove tudo o que não é dígito
    v = v.replace(/\D/g, '');
    
    // Coloca um ponto entre o terceiro e o quarto dígitos
    v = v.replace(/(\d{3})(\d)/, '$1.$2');

    // Coloca um ponto entre o terceiro e o quarto dígitos
    // (para o segundo bloco de números)
    v = v.replace(/(\d{3})(\d)/, '$1.$2');

    // Coloca um hífen entre o terceiro e o quarto dígitos
    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return v;
}
  
  @HostListener('keyup', ['$event'])
  onKeyup($event: any) {
    $event.target.value = this.aplicarMascaraCpf($event.target.value);
  }
}
