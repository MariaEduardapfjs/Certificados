document.addEventListener('DOMContentLoaded', function() {
    const formCadastroAdm = document.getElementById('form-cadastro-adm');
    const cadNomeAdmInput = document.getElementById('cad-nome-adm');
    const cadEmailAdmInput = document.getElementById('cad-email-adm');
    const cadSenhaAdmInput = document.getElementById('cad-senha-adm');
    const cadConfirmaSenhaAdmInput = document.getElementById('cad-confirma-senha-adm');

   
    let administradores = JSON.parse(localStorage.getItem('administradores')) || [];

    
    function salvarAdministradores() {
        localStorage.setItem('administradores', JSON.stringify(administradores));
    }

   
    if (formCadastroAdm) {
        formCadastroAdm.addEventListener('submit', function(event) {
            event.preventDefault(); 

            const nome = cadNomeAdmInput.value.trim();
            const email = cadEmailAdmInput.value.trim();
            const senha = cadSenhaAdmInput.value; 
            const confirmaSenha = cadConfirmaSenhaAdmInput.value;

      
            if (!nome || !email || !senha || !confirmaSenha) {
                alert('Por favor, preencha todos os campos do cadastro.');
                return;
            }

            if (senha !== confirmaSenha) {
                alert('As senhas não coincidem.');
                return;
            }

            
            const emailExistente = administradores.find(adm => adm.email === email);
            if (emailExistente) {
                alert('Este e-mail já está cadastrado.');
                return;
            }

            
            const novoAdm = {
                nome: nome,
                email: email,
                senha: senha 
            };

            administradores.push(novoAdm);
            salvarAdministradores(); 

            alert('Administrador cadastrado com sucesso! Agora você pode fazer login.');
            formCadastroAdm.reset(); 
            
        });
    }
});
    
   
