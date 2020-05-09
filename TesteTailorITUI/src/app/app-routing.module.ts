import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { FuncionarioComponent } from './pages/funcionario/funcionario.component';

const routes: Routes = [
  { path: 'clientes', component: FuncionarioComponent },
  { path: '', component: FuncionarioComponent, pathMatch: 'full' },
  { path: '**', component: FuncionarioComponent},

];

export const routing : ModuleWithProviders = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
