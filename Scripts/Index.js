let btn = document.querySelector('.fa-eye');

btn.addEventListener('click', () => {
    let inputSenha = document.querySelector('#senha');
    if (inputSenha.type === 'password') {
        inputSenha.type = 'text';
    } else {
        inputSenha.type = 'password';
    }
});

let usuario = document.querySelector('#usuario');
let linhaUsuario = document.querySelector('#linhaUsuario');
let CheckUsuario = false;

let senha = document.querySelector('#senha');
let linhaSenha = document.querySelector('#linhaSenha');
let CheckSenha = false;

let msgError = document.querySelector('#msgError');
let msgSucess = document.querySelector('#msgSucess');

/*fetch('php/IndexConsulta.php')
    .then((response) => {
      if(response.status >= 200 && response.status < 300) {
        return response.json();
      }
      throw new Error(response.statusText);
    }).then((estudantes) => {
      console.log(estudantes);
      function logar() {

        if (usuario.value == '') {
            linhaUsuario.setAttribute('style', 'color: red;')
            linhaUsuario.innerHTML = '<strong>Usuário/nome ou email *Campo Obrigatório</strong>'
            usuario.setAttribute('style', 'border-color: red;')
            CheckUsuario = false;
        } else {
            linhaUsuario.setAttribute('style', 'color: green;')
            linhaUsuario.innerHTML = 'Usuario/nome ou email'
            usuario.setAttribute('style', 'border-color: green;')
            CheckUsuario = true;
        }

        if (senha.value == '') {
            linhaSenha.setAttribute('style', 'color: red;')
            linhaSenha.innerHTML = '<strong>Senha *Campo Obrigatório</strong>'
            senha.setAttribute('style', 'border-color: red;')
            CheckSenha= false;
        } else {
            linhaSenha.setAttribute('style', 'color: green;')
            linhaSenha.innerHTML = 'Senha'
            senha.setAttribute('style', 'border-color: green;')
            CheckSenha = true;
        }

        if (CheckUsuario == true && CheckSenha == true) {
            if (estudantes.some(estudante => estudante.nome_estudante == usuario.value || estudante.email == email.value)) {
                if (estudantes.some(estudante => estudante.senha == senha.value)) {
                    msgError.innerHTML = '';
                    msgError.setAttribute('style', 'display: none;');
                    msgSucess.innerHTML = '<strong>Entrando...</strong';
                    msgSucess.setAttribute('style', 'display: block;');

                    setTimeout(() => {
                        window.location.href = '../Pages/Votacao.html';
                     }, 3000);
                } else {
                    msgSucess.innerHTML = '';
                    msgSucess.setAttribute('style', 'display: none;');
                    msgError.setAttribute('style', 'display: block;');
                    msgError.innerHTML = '<strong>Senha inválida</strong';
                }
            } else {
                msgSucess.innerHTML = '';
                msgSucess.setAttribute('style', 'display: none;');
                msgError.setAttribute('style', 'display: block;');
                msgError.innerHTML = '<strong>Usuário/nome/email inválido</strong';
            }
        } else {
            msgSucess.innerHTML = '';
            msgSucess.setAttribute('style', 'display: none;');
            msgError.setAttribute('style', 'display: block;');
            msgError.innerHTML = '<strong>Por favor, preencha todos os campos obrigatórios</strong';
        }
    }
    })
    .catch((error) => {
      console.log(error);
    });*/

    function logar(estudantes) {
        if (usuario.value == '') {
            linhaUsuario.setAttribute('style', 'color: red;')
            linhaUsuario.innerHTML = '<strong>Usuário/nome ou email *Campo Obrigatório</strong>'
            usuario.setAttribute('style', 'border-color: red;');
            CheckUsuario = false;
        } else {
            linhaUsuario.setAttribute('style', 'color: green;');
            linhaUsuario.innerHTML = 'Usuario/nome ou email';
            usuario.setAttribute('style', 'border-color: green;');
            CheckUsuario = true;
        }
    
        if (senha.value == '') {
            linhaSenha.setAttribute('style', 'color: red;');
            linhaSenha.innerHTML = '<strong>Senha *Campo Obrigatório</strong>';
            senha.setAttribute('style', 'border-color: red;');
            CheckSenha = false;
        } else {
            linhaSenha.setAttribute('style', 'color: green;');
            linhaSenha.innerHTML = 'Senha';
            senha.setAttribute('style', 'border-color: green;');
            CheckSenha = true;
        }
    
        if (CheckUsuario && CheckSenha) {
            if (Array.isArray(estudantes) && estudantes.some(estudante => estudante.nome_estudante == usuario.value || estudante.email == usuario.value)) {
                const usuarioValido = estudantes.some(estudante => estudante.nome_estudante == usuario.value || estudante.email == email.value);
                const senhaValida = estudantes.some(estudante => estudante.senha == senha.value);
        
                if (usuarioValido && senhaValida) {
                    msgError.innerHTML = '';
                    msgError.style.display = 'none';
                    msgSucess.innerHTML = '<strong>Entrando...</strong';
                    msgSucess.style.display = 'block';
        
                    setTimeout(() => {
                        window.location.href = '../Pages/Votacao.html';
                    }, 3000);
                } else {
                    msgSucess.innerHTML = '';
                    msgSucess.style.display = 'none';
                    msgError.style.display = 'block';
                    msgError.innerHTML = '<strong>Usuário/nome/email ou senha inválido</strong';
                }
            } else {
                msgSucess.innerHTML = '';
                msgSucess.style.display = 'none';
                msgError.style.display = 'block';
                msgError.innerHTML = '<strong>Por favor, preencha todos os campos obrigatórios</strong';
            }
        }
    }
    
    (async () => {
        try {
            const response = await fetch('../php/IndexConsulta.php');
            console.log(response);
            if (response.status >= 200 && response.status < 300) {
                const estudantes = await response.json();
                logar(estudantes);
            } else {
                throw new Error(response.statusText);
            }
        } catch (error) {
            console.log(error);
        }
    })();