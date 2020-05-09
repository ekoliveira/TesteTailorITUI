import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FuncionarioViewModel } from '../../models/funcionario-view-model';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  httpOptions = {
		headers: new HttpHeaders({
		  'Content-Type':  'application/json'
		})
	}

  constructor(
    private httpClient: HttpClient, 
  ) { }

  getFuncionarios(){
    return this.httpClient.get(environment.serverUrl + 'Funcionario/ObterLista');
  }

  getHabilidades(){
    return this.httpClient.get(environment.serverUrl + 'Funcionario/ObterHabilidades');
  }

  getClientesById(id:number){
    return this.httpClient.get(environment.serverUrl + 'Funcionario/ObterPorId', {
			params : { 
				id : id.toString(), 
			}
		});
  }

  postFuncionario(cliente : FuncionarioViewModel){
    return this.httpClient.post(environment.serverUrl + 'Funcionario/Inserir', cliente, this.httpOptions);
  }

  putFuncionario(cliente:FuncionarioViewModel){
    return this.httpClient.put(environment.serverUrl + 'Funcionario/Alterar', cliente, this.httpOptions);
  }

  deleteFuncionario(id:number){
    return this.httpClient.delete(environment.serverUrl + 'Funcionario/Excluir', {
			params : { 
				id : id.toString(), 
			}
		});
  }
  
}
