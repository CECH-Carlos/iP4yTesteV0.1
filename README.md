# iP4yTesteV0.1

----------------------------------------------------
## Resumo do projeto

Criar tela com formulário, contendo os campos:
- CPF
- Nome
- Sobrenome
- Data de nascimento
- E-mail
- Gênero
Tela deve ter os seguintes botões:
- Inserir
- Recomeçar
Criar banco de dados para armazenar as informações do formulário.
Criar no backend métodos para receber as informações do formulário e armazenar no
banco de dados.
Validações:
- Todos os campos são obrigatórios
- CPF: Deve ser um CPF válido
- Data de nascimento: Deve ser uma data válida
- E-Mail: deve ser um formato válido
- Não permitir cadastro se houver registro com o mesmo CPF inserido na tabela
Criar tela listando todos os registros inseridos.
- Criar opção para alteração de informações.
- Criar opção para exclusão de registro.
- Criar opção para envio de todas as informações para API.
Apenas simular envio de todas as informações, em json, para o endpoint
“https://api-teste.ip4y.com.br/cadastro”, utilizando o método POST.
Diferenciais:
- Back desenvolvido com o framework Laravel.
- App em react native com as mesmas funcionalidades descritas acima.


----------------------------------------------------

para rodar o projeto:

npm install --save express

npm install --save express-handlebars

npm install body-parser --save

npm i -g nodemon

npm install --save sequelize

npm install --save mysql2

npm install --save cors

npm install --save express-session

npm install --save connect-flash

npm install --save bcryptjs

nodemon app.js

