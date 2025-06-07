const alunosSelect = document.getElementById("seleciona-aluno");
const cursosSelect = document.getElementById("seleciona-curso");
const btnGerar = document.getElementById("gerar-certificado");


const preview = document.getElementById("certificado-preview");
const nomeCert = document.getElementById("aluno-nome-cert");
const cursoCert = document.getElementById("curso-nome-cert");
const dataCert = document.getElementById("data-emissao-cert");

let todosAlunosGlobal = [];
let todosCursosGlobal = [];

function preencherSelects() {
 todosAlunosGlobal = JSON.parse(localStorage.getItem("alunos")) || [];
 todosCursosGlobal = JSON.parse(localStorage.getItem("cursos")) || [];


 alunosSelect.innerHTML = '<option value="">Selecione um aluno...</option>';
 cursosSelect.innerHTML = '<option value="">Selecione um curso...</option>';

 todosAlunosGlobal.forEach(aluno => {
  const opt = document.createElement("option");
  opt.value = aluno.nome;
  opt.textContent = `${aluno.nome} (Matrícula: ${aluno.matricula || 'N/A'})`;   alunosSelect.appendChild(opt);
 });

 todosCursosGlobal.forEach(curso => {
  const opt = document.createElement("option");
  opt.value = curso.nome;
  opt.textContent = `${curso.nome} (Carga: ${curso.carga}h)`;
  cursosSelect.appendChild(opt);
 });
}

function formatarData(dataISO) {
  if (!dataISO) return 'Data não informada';
  const [ano, mes, dia] = dataISO.split('-');
  return `${dia}/${mes}/${ano}`;
}


function gerarCodigoAleatorio() {
    const timestamp = Date.now().toString(36);
    const aleatorio = Math.random().toString(36).substring(2, 8); 
    return `CERT-${timestamp}-${aleatorio}`.toUpperCase(); 
}



btnGerar.addEventListener("click", async () => {
 const alunoNomeSelecionado = alunosSelect.value;
 const cursoNomeSelecionado = cursosSelect.value;

 if (!alunoNomeSelecionado || alunoNomeSelecionado === "") {
  alert("Selecione um aluno para gerar o certificado.");
  return;
 }
 if (!cursoNomeSelecionado || cursoNomeSelecionado === "") {
  alert("Selecione um curso para gerar o certificado.");
  return;
 }


 const alunoObj = todosAlunosGlobal.find(a => a.nome === alunoNomeSelecionado);
 const cursoObj = todosCursosGlobal.find(c => c.nome === cursoNomeSelecionado);

 if (!alunoObj) {
  alert("Erro: Não foi possível encontrar os dados completos do aluno selecionado.");
  return;
 }
 if (!cursoObj) {
  alert("Erro: Não foi possível encontrar os dados completos do curso selecionado.");
  return;
 }

 const nomeAluno = alunoObj.nome || "Nome não disponível";
 const matriculaAluno = alunoObj.matricula || "Matrícula não disponível";
 const nomeCurso = cursoObj.nome || "Curso não disponível";
 const cargaHorariaCurso = cursoObj.carga || "Carga horária não informada";
 const dataRealizacaoCurso = formatarData(cursoObj.data);
  const codigoUnicoCertificado = gerarCodigoAleatorio(); 

 const dataEmissao = new Date().toLocaleDateString("pt-BR", {
  day: '2-digit',
  month: 'long',
  year: 'numeric'
 });
 const localEmissao = "Recife";


 if (preview && nomeCert && cursoCert && dataCert) {
  nomeCert.textContent = nomeAluno;
  cursoCert.textContent = nomeCurso;
  dataCert.textContent = dataEmissao;
  preview.style.display = "block";
 }


 const { jsPDF } = window.jspdf;
 const doc = new jsPDF({
  orientation: 'landscape',
  unit: 'mm',
  format: 'a4'
 });

 const pageWidth = doc.internal.pageSize.getWidth();
 const pageHeight = doc.internal.pageSize.getHeight();
 const margin = 20;


 doc.setFont("helvetica", "bold");
 doc.setFontSize(24);
 doc.setTextColor(22, 77, 45);
 doc.text("CERTIFICADO DE CONCLUSÃO", pageWidth / 2, margin + 15, { align: "center" });
 doc.text("DE ATIVIDADE DE EXTENSÃO", pageWidth / 2, margin + 25, { align: "center" });


 doc.setFont("times", "normal");
 doc.setFontSize(12);
 doc.setTextColor(50, 50, 50);

 const textoCorpo = `Declaramos, para os devidos fins, que o(a) discente ${nomeAluno.toUpperCase()}, portador(a) da matrícula nº ${matriculaAluno}, participou e concluiu com aproveitamento o curso de extensão "${nomeCurso.toUpperCase()}", promovido pela ESUDA - Faculdade de Ciências Humanas, realizado em ${dataRealizacaoCurso}, totalizando uma carga horária de ${cargaHorariaCurso} horas.`;


const linhasTextoCorpo = doc.splitTextToSize(textoCorpo, pageWidth - (margin * 2) - 20); 
doc.text(linhasTextoCorpo, margin + 10, margin + 55);


 doc.setFontSize(11);
 doc.text(`${localEmissao}, ${dataEmissao}.`, pageWidth - margin - 10, pageHeight - margin - 40, { align: "right" }); 


  doc.setFont("courier", "normal"); 
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100); 
  doc.text(`Código de Validação: ${codigoUnicoCertificado}`, margin + 10, pageHeight - margin - 10);
 



const yAssinatura = pageHeight - margin - 25; 
doc.setLineWidth(0.5);
doc.line(pageWidth / 2 - 40, yAssinatura, pageWidth / 2 + 40, yAssinatura); 


doc.setFontSize(10);
doc.text("Coordenação de Extensão", pageWidth / 2, yAssinatura + 5, { align: "center" });
doc.setFont("helvetica", "bold");
doc.text("ESUDA - Faculdade de Ciências Humanas", pageWidth / 2, yAssinatura + 10, { align: "center" });


doc.setLineWidth(0.5);
 doc.rect(margin / 2, margin / 2, pageWidth - margin, pageHeight - margin);

 doc.save(`Certificado-${nomeAluno.replace(/\s+/g, '_')}-${nomeCurso.replace(/\s+/g, '_')}.pdf`);


  
  const certificadosEmitidos = JSON.parse(localStorage.getItem("certificadosEmitidos")) || [];
  const novoCertificadoEmitido = {
    alunoNome: nomeAluno,
    alunoMatricula: matriculaAluno,
    cursoNome: nomeCurso,
    cursoCargaHoraria: cargaHorariaCurso,
    cursoDataRealizacao: dataRealizacaoCurso, 
    dataEmissao: dataEmissao,               
    codigoUnico: codigoUnicoCertificado     
  };
  certificadosEmitidos.push(novoCertificadoEmitido);
  localStorage.setItem("certificadosEmitidos", JSON.stringify(certificadosEmitidos));

  alert(`Certificado para ${nomeAluno} gerado com o código: ${codigoUnicoCertificado}`);
  
});


preencherSelects();