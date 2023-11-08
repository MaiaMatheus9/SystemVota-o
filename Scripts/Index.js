let btn = document.querySelector('.fa-eye');

btn.addEventListener('click', () => {
    let inputSenha = document.querySelector('#senha');
    if (inputSenha.type === 'password') {
        inputSenha.type = 'text';
    } else {
        inputSenha.type = 'password';
    }
});

let button = document.querySelector('#button');

//let usuario = document.querySelector('#usuario');
let linhaUsuario = document.querySelector('#linhaUsuario');
let CheckUsuario = false;

//let senha = document.querySelector('#senha');
let linhaSenha = document.querySelector('#linhaSenha');
let CheckSenha = false;

let msgError = document.querySelector('#msgError');
let msgSucess = document.querySelector('#msgSucess');

const checkData = {
    usuario: false,
    senha: false,
  };
  
  const Data = {
    usuario: '',
    senha: '',
  };

  document.getElementById('usuario').addEventListener('input', function (e) {
    const usuario = e.target.value;
    if (usuario.length < 1 || usuario.length > 105) {
      console.log('Título da questão deve ter entre 1 e 100 caracteres');
      //document.getElementById('erro-usuario').style.display = 'block';
      checkData.titulo = false;
    } else {
      //document.getElementById('erro-usuario').style.display = 'none';
      Data.usuario = usuario;
      checkData.usuario = true;
    }
    if (checkData.usuario == true && checkData.senha == true) {
      button.removeAttribute('disabled');
    } else {
        button.setAttribute('disabled', 'disabled');
    }
    console.log(Data);
  });


    document.getElementById('senha').addEventListener('input', function (e) {  
        const senha = e.target.value;
        if (senha.length < 1 || senha.length > 1024) {
            console.log('Descrição da questão deve ter entre 1 e 1024 caracteres');
            //document.getElementById('erro-senha').style.display = 'block';
            checkData.senha = false;
            } else {
            //document.getElementById('erro-senha').style.display = 'none';
            Data.senha = senha;
            checkData.senha = true;
            }
            if (checkData.usuario == true && checkData.senha == true) {
                button.removeAttribute('disabled');
            } else {
                button.setAttribute('disabled', 'disabled');
            }
        console.log(Data);
    });
/*fetch('php/IndexConsulta.php')
    .then((response) => {
      if(response.status >= 200 && response.status < 300) {
        return response.json();
      }
      throw new Error(response.statusText);
    }).then((estudantes) => {
      console.log(estudantes);
    }
    })
    .catch((error) => {
      console.log(error);
    });
    
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
    
console.log(CheckSenha, CheckUsuario)*/

    function getStudents() {
        fetch('../php/IndexConsulta.php')
        .then((response) => {
        if(response.status >= 200 && response.status < 300) {
            return response.json();
        }
        throw new Error(response.statusText);
        })
        .then((estudantes) => {
        console.log(estudantes);
        logar(estudantes);
        })
        .catch((error) => {
        console.log(error);
        });
    } 

function logar(estudantes) {
    if (Array.isArray(estudantes) && estudantes.some(estudante => estudante.nome_estudante == usuario.value || estudante.email == usuario.value)) {
        const usuarioValido = estudantes.some(estudante => estudante.nome_estudante == usuario.value || estudante.email == email.value);
        const senhaValida = estudantes.some(estudante => estudante.senha == senha.value);
                
        console.log('Ta passando por aqui 1');

        if (usuarioValido && senhaValida) {
            msgError.innerHTML = '';
            msgError.style.display = 'none';
            msgSucess.innerHTML = '<strong>Entrando...</strong';
            msgSucess.style.display = 'block';
                    
            console.log('Ta passando por aqui 2');

            setTimeout(() => {
                window.location.href = '../Pages/Votacao.html';
            }, 3000);
        } else {
            msgSucess.innerHTML = '';
            msgSucess.style.display = 'none';
            msgError.style.display = 'block';
            msgError.innerHTML = '<strong>Usuário/nome/email ou senha inválido</strong';

            console.log('Ta passando por aqui 3');
        }
    } else {
        msgSucess.innerHTML = '';
        msgSucess.style.display = 'none';
        msgError.style.display = 'block';
        msgError.innerHTML = '<strong>Por favor, preencha todos os campos obrigatórios</strong';

        console.log('Só ta passando por aqui');
    }
}
    