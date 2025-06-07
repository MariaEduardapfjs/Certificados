# 🎓 Emissor de Certificados

Sistema web para cadastro de cursos e alunos, emissão de certificados em PDF e validação de certificados por código único.

## ✅ Funcionalidades

* Cadastro e login de administradores
* Cadastro, edição e exclusão de alunos e cursos
* Emissão de certificados em PDF com código único
* Página pública para validar certificado por código
* Interface simples, organizada e intuitiva
* Dados salvos no LocalStorage

## 🛠 Tecnologias

* HTML
* CSS
* JavaScript
* jsPDF (geração do PDF)
* LocalStorage

## 📂 Páginas do Projeto

* `index.html` – Página inicial de login do sistema
* `adm.html` – Página para cadastro de novos administradores
* `usuarios.html` – Gerenciamento de alunos (cadastro, edição, exclusão e pesquisa)
* `cursos.html` – Gerenciamento de cursos (cadastro, edição, exclusão e pesquisa)
* `certificados.html` – Página para emissão de certificados
* `validacao.html` – Página pública para validação de certificados por código único
* `inicio.html` – Dashboard principal do sistema, acessível após o login
## 📌 Como Usar

Para rodar o projeto localmente após baixá-lo do Google Drive, siga os passos abaixo:

1.  **Baixe o projeto:**
    Faça o download do arquivo `.zip` do projeto que foi compartilhado no Google Drive.
2.  **Descompacte o arquivo:**
    Após o download, descompacte o arquivo `.zip` em uma pasta de sua preferência no seu computador.
3.  **Abra o arquivo `index.html`:**
    Navegue até a pasta descompactada (provavelmente `Certificados-6919e1f65defdafe5dc1e63d9705b47c76c28abf/atv2/`) e abra o arquivo `index.html` no seu navegador web de preferência.
4.  **Navegue pelo sistema:**
    Utilize o login base para acessar o dashboard e as funcionalidades do sistema.

## 🔑 Login Base

Para acessar o sistema como administrador:
* **E-mail:** `adm@esuda.edu.br`
* **Senha:** `123456`

📝 Documentação da API (Lógica de Dados)

Este projeto utiliza o **LocalStorage** do navegador para persistir os dados, funcionando como uma "API" local para o sistema. Os dados são manipulados diretamente via JavaScript nas páginas HTML.

### Estrutura de Dados no LocalStorage

* **`administradores`**: Array de objetos de administradores.
    * `{ nome: string, email: string, senha: string }`
* **`alunos`**: Array de objetos de alunos.
    * `{ nome: string, email: string, cpf: string, matricula: string, curso: string }`
* **`cursos`**: Array de objetos de cursos.
    * `{ nome: string, carga: number, descricao: string, data: string (ISO 8601), palestrante: string }`
* **`certificadosEmitidos`**: Array de objetos de certificados gerados.
    * `{ alunoNome: string, alunoMatricula: string, cursoNome: string, cursoCargaHoraria: string, cursoDataRealizacao: string, dataEmissao: string, codigoUnico: string }`

### Interações (via JavaScript)

As operações de CRUD (Create, Read, Update, Delete) são realizadas diretamente nos arquivos JavaScript (`adm.js`, `usuarios.js`, `cursos.js`, `certificados.js`, `validacao.js`) através das funções de manipulação do `localStorage.`:
* `localStorage.setItem(key, value)`: Salva ou atualiza dados.
* `localStorage.getItem(key)`: Recupera dados.
* `JSON.parse()` e `JSON.stringify()`: Utilizados para converter objetos JavaScript para strings JSON e vice-versa, permitindo o armazenamento de estruturas de dados complexas.

Exemplos de operações:
* **Cadastro de Administrador:** Os dados são coletados do formulário em `adm.html` e o novo administrador é adicionado ao array `administradores` no LocalStorage via `adm.js`.
* **Gerenciamento de Alunos:** As páginas `usuarios.html` e `usuarios.js` permitem adicionar, buscar, editar e excluir alunos, atualizando o array `alunos` no LocalStorage.
* **Gerenciamento de Cursos:** Da mesma forma, `cursos.html` e `cursos.js` lidam com a manipulação do array `cursos`.
* **Emissão de Certificados:** Em `certificados.html`, a lógica em `certificados.js` gera um PDF usando `jsPDF` e registra os detalhes do certificado, incluindo um `codigoUnico`, no array `certificadosEmitidos` do LocalStorage.
* **Validação de Certificados:** A página `validacao.html` utiliza `validacao.js` para buscar um certificado pelo `codigoUnico` no `certificadosEmitidos` do LocalStorage.

## 👩‍💻 Equipe

* Maria Eduarda Pires Ferreira Jorge da Silva
* Diego Henrique Vieira da Cunha
* Marco Antônio Silveira da Rocha Leão Filho
* Alice Grasielly Ferreira da Silva 

## 💚 Projeto acadêmico — Faculdade ESUDA, 2025
