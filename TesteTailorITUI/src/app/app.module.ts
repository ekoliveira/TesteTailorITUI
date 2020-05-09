import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DirectiveModule } from './shared/directives/directive.module';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { FuncionarioComponent } from './pages/funcionario/funcionario.component';
import { EditarFuncionarioComponent } from './pages/funcionario/editar-funcionario/editar-funcionario.component';
import { CadastrarFuncionarioComponent } from './pages/funcionario/cadastrar-funcionario/cadastrar-funcionario.component';
import { FiltroFuncionarioPipe } from './core/pipes/filtro-funcionario.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from './material.module';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    FuncionarioComponent,
    EditarFuncionarioComponent,
    CadastrarFuncionarioComponent,
    FiltroFuncionarioPipe,    
  ],
  imports: [
    BrowserModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DirectiveModule,
    NgxPaginationModule,
    NgxMaskModule.forRoot(options),
    MaterialModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],
  entryComponents: [EditarFuncionarioComponent, CadastrarFuncionarioComponent]
})
export class AppModule { }