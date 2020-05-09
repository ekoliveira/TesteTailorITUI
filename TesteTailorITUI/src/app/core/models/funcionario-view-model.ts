import { HabilidadeViewModel } from './habilidade-view-model';

export class FuncionarioViewModel{
    id : number;
    nome : string;
    email: string;
    sexo: string;
    dataNascimento: Date;
    idade: number;
    habilidades: HabilidadeViewModel[];
}