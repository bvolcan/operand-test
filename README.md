# Gerenciador de tarefas - Vue.js 3

Simples gerenciador de tarefas construído com o framework Vue.js 3 em TypeScript. 
Configuração local realizada com o pacote Vite, autenticação e armazenamento de dados realizados no Supabase, roteamento feito através do vue-router, componentes utilizados do Element Plus e estilização auxiliada pelo pacote UnoCSS. Além do Pinia para controle de estados e contextos entre as diferentes telas e funcionalidades da aplicação.

# Configurações
Breve guia de como configurar todas as partes necessárias para o funcionamento da aplicação.

## Banco de dados e autenticação - Supabase
1. Crie um projeto hospedado no [Supabase](https://supabase.com). Após a criação do projeto, seram fornecidas duas variáveis de conexão: `Project URL` e `API Key`. Estas informações serão necessárias para a configuração do ambiente do projeto.
2. Utilize do template Quickstart Todo List, encontrado no menu lateral SQL Editor.
3. Altere o nome das colunas "task" e "is_completed" para "title" e "status", respectivamente.
4. Desative a confirmação de e-mail nas configurações do projeto.

## Instalando e rodando o projeto
1. Com o projeto devidamente clonado, utilize do comando `yarn install` na pasta raiz para instalar todos os pacotes e suas dependências.
2. Mude o nome do arquivo `.env.example` para `.env` e preencha as duas váriaveis com o `Project URL` e `API Key` do seu projeto Supabase.
3. Para rodar o projeto, execute o comando `yarn dev`. Uma porta localhost será utilizada para a hospedagem local.

#
O projeto pode ser encontrado e testado no link: https://task-manager---operand.web.app/login

# Detalhes de implementação
Todo o projeto foi construído utilizando o Element Plus, em conjunto com o UnoCSS.

UnoCSS foi escolhido por conta da sua ótima funcionalidade chamada "attributify mode", onde possibilita a aplicação de estilizações diretamente nos atributos dos componentes, reduzindo a necessidade de criar diferentes arquivos e trechos de códigos exclusivamente dedicados para estilização.

De forma a armazenar, manipular e manter as informações e os controles necessários entre as diferentes telas do projeto, foi utilizado o Pinia em conjunto com o pacote pinia-plugin-persistedstate.

## Login, Criação de conta e Recuperação de senha
Toda autenticação foi realizada através do Supabase, utilizando de seus enpoints disponibilizados diretamente para o projeto.
Manutenção e verificação de sessão feitas com auxílio do Pinia.

![image](https://github.com/user-attachments/assets/aa6465c0-854d-4538-a80d-d5bb16ed85d1)

## Lista e manutenção de tarefas
Tela responsável por listar todas as tarefas criadas pelo usuário logado, além de possibilitar a modificação e exclusão das informações das mesmas.

![image](https://github.com/user-attachments/assets/9d99f2aa-40eb-47a6-9b82-b41714500598)

## Outros
Destaque importante para alguns pacotes de configuração e abstrações: 
- VueUse: coleção utilitários do Vue Compositions
- VueQuery: hooks para lidar com o acesso assíncrono a diferentes dados
- unplugin-auto-import: abstração para a importações automática de componentes
- vite-plugin-pages: abstração para configuração de páginas e rotas
