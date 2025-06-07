

document.addEventListener('DOMContentLoaded', () => {
    const inputCodigo = document.getElementById('codigo-validacao-input');
    const btnValidar = document.getElementById('btn-validar-codigo');
    const divResultado = document.getElementById('resultado-validacao');

    
    function exibirResultado(isValid, certificado = null, codigoDigitado = "") {
        divResultado.innerHTML = ''; 
        divResultado.className = 'resultado-box'; 

        if (isValid && certificado) {
            divResultado.classList.add('valido');
            divResultado.innerHTML = `
                <h3>Certificado Válido!</h3>
                <p><strong>Status:</strong> Autêntico</p>
                <p><strong>Aluno(a):</strong> ${certificado.alunoNome}</p>
                <p><strong>Matrícula:</strong> ${certificado.alunoMatricula}</p>
                <p><strong>Curso:</strong> ${certificado.cursoNome}</p>
                <p><strong>Carga Horária:</strong> ${certificado.cursoCargaHoraria} horas</p>
                <p><strong>Data de Realização do Curso:</strong> ${certificado.cursoDataRealizacao}</p>
                <p><strong>Data de Emissão do Certificado:</strong> ${certificado.dataEmissao}</p>
                <p><strong>Código de Validação:</strong> ${certificado.codigoUnico}</p>
            `;
        } else {
            divResultado.classList.add('invalido');
            divResultado.innerHTML = `
                <h3>Certificado Inválido</h3>
                <p>O código "${codigoDigitado}" não foi encontrado em nossos registros ou é inválido.</p>
                <p>Por favor, verifique o código e tente novamente.</p>
            `;
        }
    }

    if (btnValidar) {
        btnValidar.addEventListener('click', () => {
            const codigoParaValidar = inputCodigo.value.trim().toUpperCase(); 

            if (!codigoParaValidar) {
                exibirResultado(false, null, ""); 
                divResultado.innerHTML = `<h3>Atenção!</h3><p>Por favor, digite o código do certificado.</p>`;
                divResultado.className = 'resultado-box invalido'; 
                return;
            }

           
            const certificadosEmitidos = JSON.parse(localStorage.getItem('certificadosEmitidos')) || [];

            
            const certificadoEncontrado = certificadosEmitidos.find(
                cert => cert.codigoUnico && cert.codigoUnico.toUpperCase() === codigoParaValidar
            );

            
            exibirResultado(!!certificadoEncontrado, certificadoEncontrado, codigoParaValidar);
        });
    }

    
    if (inputCodigo) {
        inputCodigo.addEventListener('input', () => {
            divResultado.innerHTML = '';
            divResultado.className = 'resultado-box'; 
        });
    }
});