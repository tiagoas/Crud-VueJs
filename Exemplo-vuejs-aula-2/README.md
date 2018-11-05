# exemplo-vuejs

## Instale o CLI do Vuejs

``` bash
npm install -g vue-cli
```
## Inicie um novo projeto

``` bash
vue init browserify-simple exemplo-vuejs
```

> é possível utiizar vários templates, veja os disponíveis em: https://github.com/vuejs/vue-cli

## Execução

``` bash
# Instalar dependências do projeto
npm install

# Inicie o servidor de desenvolvimento, com hot reload em localhost:8080
npm run dev

# Compile para produção com minificação
npm run build
```

## Aula 1

> Antes de iniciar, precisamos criar/conseguir uma API que fornecerá os dados e operações para nossa aplicação web. Para facilitar, vamos utilizar o json-server, que é uma aplicacação que simula uma API RESTfull a partir de uma base pré-formatada em um arquivo json.

``` bash
# Instale o json-server
npm install -g json-server 
```

### Utilizando o json-server

> Depois de instalado, crie um arquivo db.json com o conteúdo:
``` json
{
    "tarefas":[
        {"id":1, "titulo": "tarefa 1", "terminada": false},
        {"id":2, "titulo": "tarefa 2", "terminada": true},
        {"id":3, "titulo": "tarefa 3", "terminada": false}
    ],
    "usuario":[
        {"id":1, "nome": "Fulano", "email": "fulano@mail.com"},
        {"id":2, "nome": "Beltrano", "email": "beltrano@mail.com"}
    ]
}
```
> Então, execute, na mesma pasta em que o arquivo db.json foi criado:
``` bash
json-server --watch db.json
```
> Mais informações em: https://github.com/typicode/json-server

### Alterando a execução do projeto para contemplar a inicialização do json-server
> Adicione a dependência de desenvolvimento:
``` bash
npm install --save-dev json-server
```

> Acesse o arquivo package.json do projeto e altere o script serve para:
``` json
"serve": "json-server --watch db.json --port 8080 --static ./",
```

## Aula 2
> Antes de começar a desenvolver, installe o vue-devtools:

- [Exensão do Chrome](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)

- [Addon do Firefox](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)

Veja orientações em: https://github.com/vuejs/vue-devtools

> Link de apoio: https://br.vuejs.org/v2/guide/instance.html

> Novas dependências
``` bash
npm install --save vue-router vue-resource bootstrap
```
