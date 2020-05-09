import { Pipe, PipeTransform } from '@angular/core';
import { FuncionarioViewModel } from '../models/funcionario-view-model';
import { HabilidadeViewModel } from '../models/habilidade-view-model';

@Pipe({
  name: 'filtroFuncionario'
})
export class FiltroFuncionarioPipe implements PipeTransform {

  transform(funcionarios:FuncionarioViewModel[],searchString:string, tipoFiltro: any){

    if(!searchString){
      return funcionarios  
    }

    if(tipoFiltro == "idade"){
      return funcionarios.filter(funcionario=>{   
        const idade = funcionario.idade.toString().includes(searchString)
        return (idade);      
      })
    }

    if(tipoFiltro == "nome"){
      return funcionarios.filter(funcionario=>{   
        const nome = funcionario.nome.toLowerCase().includes(searchString.toLowerCase())
        return (nome);      
      })
    }

    if(tipoFiltro =="habilidade"){
      searchString = searchString.toLocaleLowerCase();
      return funcionarios.filter(funcionario=>{   
        if(funcionario.habilidades){
          const habilidades = this.habilidadesToString(funcionario.habilidades).toLocaleLowerCase().includes(searchString)
          return (habilidades);
        }
      })
    }
  }

 habilidadesToString(habilidades : HabilidadeViewModel[]) : string{
    let retorno = "";
    habilidades.forEach(e => {
      if(retorno == ""){
        retorno = e.descricao;
      }else{
        retorno = retorno + " " + e.descricao;
      }
    });
    return retorno;
  }
}
