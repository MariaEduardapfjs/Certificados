document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("form-curso");
    const btnSubmitForm = document.getElementById("btn-submit-curso");
    const listaUl = document.getElementById("cursos-ul");
    const inputPesquisa = document.getElementById("input-pesquisa-curso");


    const nomeInput = document.getElementById("curso-nome");
    const cargaInput = document.getElementById("carga-horaria");
    const descricaoInput = document.getElementById("descricao");
    const dataInput = document.getElementById("data");
    const palestranteInput = document.getElementById("palestrante");

    let cursos = [];
    let editandoIndex = null; 

    function carregarCursosDoLocalStorage() {
        const cursosJSON = localStorage.getItem("cursos");
        cursos = cursosJSON ? JSON.parse(cursosJSON) : [];
    }

    function salvarCursosNoLocalStorage() {
        localStorage.setItem("cursos", JSON.stringify(cursos));
    }

    function formatarDataParaExibicao(dataISO) {
        if (!dataISO) return '';
        const [ano, mes, dia] = dataISO.split('-');
        return `${dia}/${mes}/${ano}`;
    }

    function exibirCursos(cursosParaExibir = cursos) {
        listaUl.innerHTML = ""; 

        if (cursosParaExibir.length === 0 && !inputPesquisa.value) {
            listaUl.innerHTML = "<p>Nenhum curso cadastrado.</p>";
            return;
        }
        if (cursosParaExibir.length === 0 && inputPesquisa.value) {
            listaUl.innerHTML = "<p>Nenhum curso encontrado com este termo de pesquisa.</p>";
            return;
        }

        cursosParaExibir.forEach((curso, indexOriginal) => {
            
            const indexNoArrayPrincipal = cursos.findIndex(c => c === curso);

            const item = document.createElement("li");
            item.innerHTML = `
                <strong>${curso.nome}</strong><br>
                Carga Horária: ${curso.carga}h<br>
                Descrição: <small>${curso.descricao}</small><br>
                Data: ${formatarDataParaExibicao(curso.data)}<br>
                Palestrante: ${curso.palestrante}<br>
                <div class="acoes">
                    <button class="btn-acao btn-editar" data-index="${indexNoArrayPrincipal}">Editar</button>
                    <button class="btn-acao btn-excluir" data-index="${indexNoArrayPrincipal}">Excluir</button>
                </div>
            `;
            listaUl.appendChild(item);
        });
    }

    function limparFormulario() {
        form.reset();
        nomeInput.value = ''; 
        cargaInput.value = '';
        descricaoInput.value = '';
        dataInput.value = '';
        palestranteInput.value = '';
        editandoIndex = null;
        btnSubmitForm.textContent = "Cadastrar Curso";
        nomeInput.focus();
    }

    function prepararEdicao(index) {
        if (index < 0 || index >= cursos.length) return;

        editandoIndex = index;
        const curso = cursos[index];

        nomeInput.value = curso.nome;
        cargaInput.value = curso.carga;
        descricaoInput.value = curso.descricao;
        dataInput.value = curso.data; 
        palestranteInput.value = curso.palestrante;

        btnSubmitForm.textContent = "Salvar Alterações";
        window.scrollTo({ top: form.offsetTop - 20, behavior: 'smooth' }); 
        nomeInput.focus();
    }

    function excluirCurso(index) {
        if (index < 0 || index >= cursos.length) return;

        if (confirm(`Tem certeza que deseja excluir o curso "${cursos[index].nome}"?`)) {
            cursos.splice(index, 1);
            salvarCursosNoLocalStorage();
            aplicarFiltroEPesquisa(); 
            if (editandoIndex === index) { 
                limparFormulario();
            }
        }
    }
    
    function aplicarFiltroEPesquisa() {
        const termoPesquisa = inputPesquisa.value.toLowerCase();
        if (termoPesquisa) {
            const cursosFiltrados = cursos.filter(curso =>
                curso.nome.toLowerCase().includes(termoPesquisa) ||
                (curso.palestrante && curso.palestrante.toLowerCase().includes(termoPesquisa)) // Exemplo: pesquisar por palestrante também
            );
            exibirCursos(cursosFiltrados);
        } else {
            exibirCursos(cursos);
        }
    }

    
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const cursoData = {
            nome: nomeInput.value.trim(),
            carga: cargaInput.value,
            descricao: descricaoInput.value.trim(),
            data: dataInput.value,
            palestrante: palestranteInput.value.trim(),
        };

        
        if (!cursoData.nome || !cursoData.carga || !cursoData.data) {
            alert("Por favor, preencha os campos obrigatórios: Nome do Curso, Carga Horária e Data.");
            return;
        }

        if (editandoIndex !== null) {
            
            cursos[editandoIndex] = cursoData;
        } else {
            
            cursos.push(cursoData);
        }

        salvarCursosNoLocalStorage();
        limparFormulario();
        aplicarFiltroEPesquisa(); 
    });

    listaUl.addEventListener('click', function(e) {
        const target = e.target;
        if (target.classList.contains('btn-editar')) {
            const index = parseInt(target.dataset.index);
            prepararEdicao(index);
        } else if (target.classList.contains('btn-excluir')) {
            const index = parseInt(target.dataset.index);
            excluirCurso(index);
        }
    });

    inputPesquisa.addEventListener('input', aplicarFiltroEPesquisa);

    
    carregarCursosDoLocalStorage();
    exibirCursos(); 
});
