import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HabilidadeViewModel } from 'src/app/core/models/habilidade-view-model';
import { FuncionarioService } from 'src/app/core/services/funcionario/funcionario.service';
import { FuncionarioViewModel } from 'src/app/core/models/funcionario-view-model';
import { Alert } from 'src/app/core/models/alerts';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cadastrar-funcionario',
  templateUrl: './cadastrar-funcionario.component.html',
  styleUrls: ['./cadastrar-funcionario.component.css']
})
export class CadastrarFuncionarioComponent implements OnInit {

  @Output() funcionarioCadastrado : EventEmitter<FuncionarioViewModel> = new EventEmitter();
  habilidades : HabilidadeViewModel [] = [];
  habilidadesDoFuncionario : HabilidadeViewModel [] = [];
  formFuncionario : FormGroup;
  alert : Alert;

  constructor
  (
    private _funcionarioService : FuncionarioService,
    private formBuilder : FormBuilder, 
    public activeModal: NgbActiveModal 
  ) { }

  ngOnInit() {
    this.getHabilidades();
    this.initializeForm();
  }

  getHabilidades(){
    this._funcionarioService.getHabilidades().subscribe((resp:HabilidadeViewModel[]) => {
      this.habilidades = resp;
    });
  }

  initializeForm(){
    let funcionario = new FuncionarioViewModel();
    this.formFuncionario = this.formBuilder.group({
      id : [funcionario.id],
      nome : [funcionario.nome],
      email : [funcionario.email],
      sexo : [funcionario.sexo],
      dataNascimento : [funcionario.dataNascimento],
      idHabilidade : Number
    });
  }

  insertFuncionario(funcionario : FuncionarioViewModel){
    funcionario.habilidades = this.habilidadesDoFuncionario;
    if(this.validateFuncionario(funcionario)){
      this._funcionarioService.postFuncionario(funcionario).subscribe((resp:FuncionarioViewModel) => {
        this.formFuncionario.reset();
        this.activeModal.close();
        this.funcionarioCadastrado.emit(resp);
      });
    }
  }

  disableSubmit(){
    if(this.formFuncionario.controls.nome.value == null || this.formFuncionario.controls.nome.value == ""){
      return true;
    }

    if(this.formFuncionario.controls.dataNascimento.value == null || this.formFuncionario.controls.dataNascimento.value == ""){
      return true;
    }

    if(this.formFuncionario.controls.sexo.value == null || this.formFuncionario.controls.sexo.value == ""){
      return true;
    }

    if(this.formFuncionario.controls.email.value == null || this.formFuncionario.controls.email.value == ""){
      return true;
    }
    return false;
  }

  validateTemSobrenome(nome : string) : boolean{
    let stringArray = nome.split(" ");

    if(stringArray.length > 1)
    {
        return true;
    }
    return false;
  }

  validateEmail(email:string) : boolean{
    var regExp = /(^[a-z0-9]([a-z0-9_\.]*)@([a-z_\.]*)(\.[a-z]{3})(\.[a-z]{2})*$)/i;
    var emailArray = email.split(';');
    if (emailArray && emailArray.length > 0) {
      for (let i = 0; i <= emailArray.length - 1; i++) {
        if (regExp.test(emailArray[i].trim())) {
          return true;
        } else {
          return false;
        }
      }
    }
    return false;
  }

  validateFuncionario(funcionario:FuncionarioViewModel) : boolean{
    if(!this.validateTemSobrenome(funcionario.nome)){
      this.alert = new Alert('success', 'Por favor informe o nome completo do funcionário!');
      return false;
    }
    if(!this.validateEmail(funcionario.email)){
      this.alert = new Alert('danger', 'O Email está inválido!');
      return false;
    }
    if(this.habilidadesDoFuncionario.length == 0){
      this.alert = new Alert('danger', 'O funcionário deve conter pelo menos uma habilidade!');
      return false;
    }
    return true;
  }

  adicionarHabilidade(idHabilidade : Number){
    let habil = this.habilidades.find(x => x.id == idHabilidade)
    if(habil != null || habil != undefined){
      if(this.habilidadesDoFuncionario.find(x => x.id == habil.id) == null)
      {
        this.habilidadesDoFuncionario.push(habil);
      }else
      {
        this.alert = new Alert('danger', 'O Funcionário já possui esta habilidade!');
      }
    }
  }

  removerHabilidade(habilidade:HabilidadeViewModel){
    this.habilidadesDoFuncionario.splice(this.habilidadesDoFuncionario.indexOf(habilidade),1);
  }

}
