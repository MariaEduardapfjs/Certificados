document.addEventListener("DOMContentLoaded", () => {
  
  const formAluno = document.getElementById("form-aluno");
  const nomeAlunoInput = document.getElementById("nome-aluno");
  const emailAlunoInput = document.getElementById("email-aluno");
  const cpfInput = document.getElementById("cpf");
  const matriculaInput = document.getElementById("matricula");
  

 
  const campoBusca = document.getElementById("busca-aluno");
  const alunosListaUl = document.getElementById("alunos-ul");

  let alunos = []; 
  let editandoAlunoOriginal = null; 

  function carregarAlunos() {
    const alunosJSON = localStorage.getItem("alunos");
    alunos = alunosJSON ? JSON.parse(alunosJSON) : [];
  }

  function salvarAlunos() {
    localStorage.setItem("alunos", JSON.stringify(alunos));
  }

  function renderizarAlunos(filtro = "") {
    alunosListaUl.innerHTML = ""; 

    const filtroLowerCase = filtro.toLowerCase();
    const alunosFiltrados = alunos.filter(
      (aluno) =>
        aluno.nome.toLowerCase().includes(filtroLowerCase) ||
        aluno.matricula.toLowerCase().includes(filtroLowerCase) ||
        aluno.email.toLowerCase().includes(filtroLowerCase)
    );

    if (alunosFiltrados.length === 0) {
      alunosListaUl.innerHTML = `<p>${filtro ? "Nenhum aluno encontrado com este filtro." : "Nenhum aluno cadastrado."}</p>`;
      return;
    }

    alunosFiltrados.forEach((aluno, indexNoArrayFiltrado) => {
      
      const indexOriginal = alunos.findIndex(a => a.matricula === aluno.matricula && a.cpf === aluno.cpf); 

      const li = document.createElement("li");
      li.setAttribute('id', `aluno-item-${indexOriginal}`); 
      li.innerHTML = `
        <div><strong>Nome:</strong> <span class="aluno-nome">${aluno.nome}</span></div>
        <div><strong>Matrícula:</strong> <span class="aluno-matricula">${aluno.matricula}</span></div>
        <div><strong>E-mail:</strong> <span class="aluno-email">${aluno.email}</span></div>
        <div><strong>CPF:</strong> <span class="aluno-cpf">${aluno.cpf}</span></div>
        <div class="acoes" style="margin-top: 10px;">
          <button class="btn-acao editar-btn" data-index="${indexOriginal}">Editar</button>
          <button class="btn-acao excluir-btn" data-index="${indexOriginal}">Excluir</button>
        </div>
      `;
      alunosListaUl.appendChild(li);
    });
  }

  window.iniciarEdicaoInline = function(index) { 
    const aluno = alunos[index];
    const itemLi = document.getElementById(`aluno-item-${index}`);

    if (!aluno || !itemLi) return;
    editandoAlunoOriginal = { ...aluno }; 

    itemLi.innerHTML = `
      <div>
        <label for="edit-nome-${index}">Nome Completo</label>
        <input type="text" id="edit-nome-${index}" value="${aluno.nome}" required>
      </div>
      <div>
        <label for="edit-email-${index}">E-mail</label>
        <input type="email" id="edit-email-${index}" value="${aluno.email}" required>
      </div>
      <div>
        <label for="edit-cpf-${index}">CPF</label>
        <input type="text" id="edit-cpf-${index}" value="${aluno.cpf}" placeholder="000.000.000-00" required>
      </div>
      <div>
        <label for="edit-matricula-${index}">Matrícula</label>
        <input type="text" id="edit-matricula-${index}" value="${aluno.matricula}" required>
      </div>
      <div class="acoes" style="margin-top: 10px;">
        <button class="btn-acao" style="background-color: #4CAF50;" onclick="salvarAlteracoesInline(${index})">Salvar</button>
        <button class="btn-acao" style="background-color: #aaa;" onclick="cancelarEdicaoInline(${index})">Cancelar</button>
      </div>
    `;
  }

  window.salvarAlteracoesInline = function(index) { 
    const nome = document.getElementById(`edit-nome-${index}`).value.trim();
    const email = document.getElementById(`edit-email-${index}`).value.trim();
    const cpf = document.getElementById(`edit-cpf-${index}`).value.trim();
    const matricula = document.getElementById(`edit-matricula-${index}`).value.trim();

    if (!nome || !email || !cpf || !matricula) {
      alert("Preencha todos os campos para salvar a edição.");
      return;
    }

    
    const conflitoMatricula = alunos.find((a, i) => i !== index && a.matricula === matricula);
    const conflitoCpf = alunos.find((a, i) => i !== index && a.cpf === cpf);

    if (conflitoMatricula) {
        alert("Erro: Matrícula já cadastrada para outro aluno.");
        return;
    }
    if (conflitoCpf) {
        alert("Erro: CPF já cadastrado para outro aluno.");
        return;
    }

    alunos[index] = { nome, email, cpf, matricula };
    salvarAlunos();
    editandoAlunoOriginal = null; 
    renderizarAlunos(campoBusca.value);
  }

  window.cancelarEdicaoInline = function(index) { 
    
    editandoAlunoOriginal = null;
    renderizarAlunos(campoBusca.value);
  }

  window.deletarAluno = function(index) { 
    if (confirm(`Tem certeza que deseja excluir o aluno "${alunos[index].nome}"?`)) {
      alunos.splice(index, 1);
      salvarAlunos();
      renderizarAlunos(campoBusca.value);
    }
  }
  
  
  if (formAluno) {
    formAluno.addEventListener("submit", function (e) {
      e.preventDefault();

      const novoAluno = {
        nome: nomeAlunoInput.value.trim(),
        email: emailAlunoInput.value.trim(),
        cpf: cpfInput.value.trim(),
        matricula: matriculaInput.value.trim(),
      };

      if (!novoAluno.nome || !novoAluno.email || !novoAluno.cpf || !novoAluno.matricula) {
        alert("Preencha todos os campos obrigatórios.");
        return;
      }

      
      if (alunos.some(aluno => aluno.matricula === novoAluno.matricula)) {
        alert("Erro: Matrícula já cadastrada.");
        return;
      }
      if (alunos.some(aluno => aluno.cpf === novoAluno.cpf)) {
        alert("Erro: CPF já cadastrado.");
        return;
      }

      alunos.push(novoAluno);
      salvarAlunos();
      renderizarAlunos(campoBusca.value); 
      formAluno.reset(); 
      nomeAlunoInput.focus(); 
    });
  }

 
  if (campoBusca) {
    campoBusca.addEventListener("input", () => {
      renderizarAlunos(campoBusca.value);
    });
  }

  
  if (alunosListaUl) {
      alunosListaUl.addEventListener('click', function(e) {
          const target = e.target;
          if (target.classList.contains('editar-btn')) {
              const index = parseInt(target.dataset.index);
              iniciarEdicaoInline(index);
          } else if (target.classList.contains('excluir-btn')) {
              const index = parseInt(target.dataset.index);
              deletarAluno(index);
          }
      });
  }

  carregarAlunos();
  renderizarAlunos();
});