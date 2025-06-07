document.addEventListener("DOMContentLoaded", () => {

  const todasAtividades = JSON.parse(localStorage.getItem("atividades")) || [];
  let atividadesPendentesCount = 0;
  if (Array.isArray(todasAtividades)) {
    atividadesPendentesCount = todasAtividades.filter(
      (atividade) => atividade && atividade.status === "pendente" 
    ).length;
  }
  
  const atividadesPendentesEl = document.getElementById("atividades-pendentes-count");
  if (atividadesPendentesEl) {
    atividadesPendentesEl.textContent = atividadesPendentesCount;
  }


 
  const certificadosPendentesArray = JSON.parse(localStorage.getItem("certificadosPendentes")) || [];
  let certificadosPendentesCount = 0;
  if (Array.isArray(certificadosPendentesArray)) {
    certificadosPendentesCount = certificadosPendentesArray.length;
  }
 
  const certificadosPendentesEl = document.getElementById("certificados-pendentes-count");
  if (certificadosPendentesEl) {
    certificadosPendentesEl.textContent = certificadosPendentesCount;
  }

});



document.addEventListener("DOMContentLoaded", () => {
  const alunos = JSON.parse(localStorage.getItem("alunos")) || [];
  const cursos = JSON.parse(localStorage.getItem("cursos")) || [];
  const certificados = JSON.parse(localStorage.getItem("certificadosEmitidos")) || [];

  document.getElementById("total-alunos").textContent = alunos.length;
  document.getElementById("total-cursos").textContent = cursos.length;
  document.getElementById("total-certificados").textContent = certificados.length;
});

document.addEventListener('DOMContentLoaded', function() {
  const mobileMenu = document.querySelector('.mobile-menu');
  const navLista = document.querySelector('.nav-lista');

  mobileMenu.addEventListener('click', function() {
   
    navLista.classList.toggle('active');

    
    mobileMenu.classList.toggle('active');

    
    document.body.style.overflowY = navLista.classList.contains('active') ? 'hidden' : 'auto';
  });

  
  navLista.querySelectorAll('a').forEach(item => {
    item.addEventListener('click', () => {
      navLista.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflowY = 'auto'; 
    });
  });
});

