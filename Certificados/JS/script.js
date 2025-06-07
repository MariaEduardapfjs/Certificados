

document.addEventListener('DOMContentLoaded', function() {

    const formLogin = document.getElementById('form-login');
    const loginEmailInput = document.getElementById('login-email-adm');
    const loginSenhaInput = document.getElementById('login-senha-adm');

    let administradores = JSON.parse(localStorage.getItem('administradores')) || [];

    function criarAdmBase() {
        const emailBase = "adm@esuda.edu.br";
        const senhaBase = "123456";

        const admJaExiste = administradores.some(adm => adm.email === emailBase);

        if (administradores.length === 0 || !admJaExiste) {
            const admBase = {
                nome: "Administrador ESUDA",
                email: emailBase,
                senha: senhaBase
            };
            administradores.push(admBase);
            localStorage.setItem('administradores', JSON.stringify(administradores));
            console.log("Administrador base (adm@esuda.edu.br) cadastrado automaticamente.");
           
            administradores = JSON.parse(localStorage.getItem('administradores'));
        }
    }

    criarAdmBase();

    if (formLogin) {
        formLogin.addEventListener('submit', function(event) {
            event.preventDefault(); 

         
            const email = loginEmailInput.value.trim(); 
            const senha = loginSenhaInput.value;         

            if (!email || !senha) {
                alert('Por favor, preencha e-mail e senha para login.');
                return;
            }
            
           
            const adminEncontrado = administradores.find(adm => adm.email.toLowerCase() === email.toLowerCase() && adm.senha === senha.trim());


            if (adminEncontrado) {
                localStorage.setItem('adminLogado', 'true');
                alert(`Login bem-sucedido! Bem-vindo(a), ${adminEncontrado.nome}!`);
                
                
                window.location.href = 'inicio.html'; 
                
                formLogin.reset();
            } else {
                alert('E-mail ou senha incorretos.');
            }
        });
    }
});