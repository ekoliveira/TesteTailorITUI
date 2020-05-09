import { Component, OnInit } from '@angular/core';
import { FuncionarioViewModel } from 'src/app/core/models/funcionario-view-model';
import { FormGroup, FormBuilder, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FuncionarioService } from 'src/app/core/services/funcionario/funcionario.service';
import { EditarFuncionarioComponent as EditarFuncionarioComponent } from './editar-funcionario/editar-funcionario.component';
import { HabilidadeViewModel } from 'src/app/core/models/habilidade-view-model';
import { of } from 'rxjs';
import { Alert } from 'src/app/core/models/alerts';
import { CadastrarFuncionarioComponent } from './cadastrar-funcionario/cadastrar-funcionario.component';



@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {

  funcionarios : FuncionarioViewModel [] = [];
  funcionariosBkp : FuncionarioViewModel [] = [];
  alert : Alert;
  tipoFiltro : string = "nome";
  paginaAtual: number = 1;

  constructor(
    private _funcionarioService : FuncionarioService,
    private modalService : NgbModal
  ) 
  { 
  }

  ngOnInit() {
    this.getFuncionarios();
  }

  getFuncionarios(){
    this._funcionarioService.getFuncionarios().subscribe((resp:FuncionarioViewModel[]) => {
      resp.forEach(e => {
        e.idade = this.calcularIdade(e.dataNascimento);
      });
      this.funcionarios = resp;
      this.funcionariosBkp = this.funcionarios;
    });
  }

  updateFuncionario(funcionario : FuncionarioViewModel){
    let ngbModalOptions: NgbModalOptions = {
      backdrop : 'static',
      keyboard : false,
    }
    const modal = this.modalService.open(EditarFuncionarioComponent, ngbModalOptions);

    modal.componentInstance.funcionario = funcionario;

    modal.componentInstance.funcionarioEditado.subscribe((resp:any) => {
      this.funcionarios = null;
      this.getFuncionarios();
      this.alert = new Alert('info', 'Funcionário Editado!');
    });
  }

  insertFuncionario(){
    let ngbModalOptions: NgbModalOptions = {
      backdrop : 'static',
      keyboard : false,
    }
    const modal = this.modalService.open(CadastrarFuncionarioComponent, ngbModalOptions);

    modal.componentInstance.funcionarioCadastrado.subscribe((resp:FuncionarioViewModel) => {
      this.funcionarios = null;
      this.getFuncionarios();
      this.alert = new Alert('success', 'Funcionário cadastrado!');
    });
  }

  deleteFuncionario(id : number){
    this._funcionarioService.deleteFuncionario(id).subscribe((resp:any) => {
      this.funcionarios = null;
      this.getFuncionarios();
      this.alert = new Alert('danger', 'Funcionário Deletado!');
    });
  }

  dataFormatada(data : Date) : string{
      var ano  = data.toString().substr(0,4);
      var mes  = data.toString().substr(5,2);
      var dia = data.toString().substr(8,2);    
      var dataFormatada = dia+"/"+mes+"/"+ano
      return dataFormatada;
  }

  nomeFormatado(nome:string) : string{
      let retorno = "";
      let nomeSeparado = nome.split(" ");

      nomeSeparado.forEach(e => {
          e.toLocaleLowerCase().replace(/(?:^|\s)\S/g, function(a) { return a.toLocaleUpperCase(); });
          if(retorno == ""){
            retorno = retorno + e;
          }else{
            retorno = retorno + " " + e;
          }
      });

      return retorno;
  }

  habilidadesToString(habilidades : HabilidadeViewModel[]) : string{
    let retorno = "";
    habilidades.forEach(e => {
      if(retorno == ""){
        retorno = e.descricao;
      }else{
        retorno = retorno + ", " + e.descricao;
      }
    });
    return retorno;
  }

  calcularIdade(dataNascimento : Date) : number{

    let data = this.dataFormatada(dataNascimento);
    let hoje=new Date()
    
    var array_data = data.split("/")
    
    if (array_data.length!=3)
       return; 
  
    var ano
    ano = parseInt(array_data[2]);
    if (isNaN(ano))
       return;
  
    var mes
    mes = parseInt(array_data[1]);
    if (isNaN(mes))
       return;
  
    var dia
    dia = parseInt(array_data[0]);
    if (isNaN(dia))
       return;
  
    if (ano<=99)
       ano +=1900
  
    let idade =hoje.getFullYear() - ano - 1;

    if (hoje.getMonth() + 1 - mes < 0)
       return idade
    if (hoje.getMonth() + 1 - mes > 0)
       return idade+1
    if (hoje.getUTCDate() - dia >= 0)
       return idade + 1
  
    return idade
  }

  filtrarSexo(genero:string){
    if(genero == "F"){
      this.funcionarios = this.funcionariosBkp;
      this.funcionarios = this.funcionarios.filter(x => x.sexo == genero);
    }
    if(genero == "M"){
      this.funcionarios = this.funcionariosBkp;
      this.funcionarios = this.funcionarios.filter(x => x.sexo == genero);
    }
    if(genero == "T"){
      this.funcionarios = this.funcionariosBkp;
    }
  }

}
