# WebApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


|-- modules

    |-- module1
        |-- [+] components
        |-- module1.service.ts
        |-- module1.module.ts
        |-- module1.routes.ts

    |-- module2 
        |-- [+] components
        |-- module2.service.ts
        |-- module2.module.ts
        |-- module2.routes.ts

    |-- pedido // Module
        |-- novo
            |-- novo-pedido.component .|html|scss|spec|.ts
        |-- editar
            |-- editar-pedido.component .|html|scss|spec|.ts
        |-- detalhes
            |-- detalhes-pedido.component .|html|scss|spec|.ts
        |-- pedido.service.ts
        |-- pedido.module.ts
        |-- pedido.routes.ts

|-- shared
        |-- [+] components
        |-- [+] mocks
        |-- [+] models
        |-- [+] directives
        |-- [+] pipes

|-- core
        |-- [+] authentication
        |-- [+] footer
        |-- [+] guards
        |-- [+] http
        |-- [+] interceptors
        |-- [+] mocks
        |-- [+] services
        |-- [+] header

|-- app.module.ts
|-- app.component.ts