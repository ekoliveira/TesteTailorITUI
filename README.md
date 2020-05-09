

# Teste Younder

**Componentes utilizados**

Back-End:

 - .NET CORE 2.2
 - Arquitetura MVC
 - EntityFrameWorkCore 2.2.0
 - SQL Server Local DB
 - Swagger

Front-End:

 - Angular 8
 - NgxBootstrap
 - Bootstrap 4
 - HashLocationStrategy

Teste:

 - xUnit
 - EntityFrameworkCore.InMemory 2.2.0

**Passo-a-Passo para execução:**

Execução do back-end:

1º. Abra o projeto (**TesteYounder.sln**) no Visual Studio;

2º. Abra o Package Manager Console em **Tools > NuGet Package Manager > Package Manager Console**;

3º. No console selecione "**src\Api\TesteYounder.Api**" em Default Project;

4º. No console digite o seguinte comando sem aspas "**Update-Database**" depois pressione "**ENTER**"  e aguarde a criação do banco de dados;

5º. Feito isso, basta iniciar o projeto "**TesteYounder.Api**";

Execução do front-end:

1º. Na pasta em que o projeto foi clonado, navegue até o diretório: ".../TesteYounder/src/Ui/TesteYounder.Ui/ClientApp"

2º. Pressionando a tecla "**SHIFT**" clique com o botão direito do mouse dentro da pasta informada acima e selecione a opção "**Abrir Janela do Power Shell Aqui**";

3º. Digite o comando "**npm i**" e pressione "**ENTER**" e aguarde a instalação dos pacotes;

4º. Ainda no power shell, digite o comando "**ng serve**" e pressione "**ENTER**" e aguarde o projeto compilar.

5º. Feito isso, basta iniciar o navegador e entrar na seguinte url: "[http://localhost:4200/](http://localhost:4200/)"
