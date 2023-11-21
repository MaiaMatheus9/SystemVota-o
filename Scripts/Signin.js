let btn = document.querySelector('#verSenha');
let btnConfirm = document.querySelector('#verConfirmSenha');

let usuario = document.querySelector('#usuario');
let linhaUsuario = document.querySelector('#linhaUsuario');
let CheckUsuario = false;

let email = document.querySelector('#email');
let linhaEmail = document.querySelector('#linhaEmail');
let CheckEmail = false;

let senha = document.querySelector('#senha');
let linhaSenha = document.querySelector('#linhaSenha');
let CheckSenha = false;

let confirmSenha = document.querySelector('#confirmSenha');
let linhaConfirmSenha = document.querySelector('#linhaConfirmSenha');
let CheckConfirmSenha = false;

let msgError = document.querySelector('#msgError');
let msgSucess = document.querySelector('#msgSucess');

usuario.addEventListener('keyup', ()=> {
    if(usuario.value.length <= 1){
        linhaUsuario.setAttribute('style', 'color: red;')
        linhaUsuario.innerHTML = '<strong>Usuário/nome muito curto</strong>'
        usuario.setAttribute('style', 'border-color: red;')
        CheckUsuario = false;
    }else{      
        linhaUsuario.setAttribute('style', 'color: green;')
        linhaUsuario.innerHTML = 'Usuario/nome'
        usuario.setAttribute('style', 'border-color: green;')
        CheckUsuario = true;
    }
});

email.addEventListener('keyup', ()=> {
    if(!email.checkValidity()){
        linhaEmail.setAttribute('style', 'color: red;')
        linhaEmail.innerHTML = '<strong>Email inválido</strong>'
        email.setAttribute('style', 'border-color: red;')
        CheckEmail = false;
    }else{      
        linhaEmail.setAttribute('style', 'color: green;')
        linhaEmail.innerHTML = 'Email'
        email.setAttribute('style', 'border-color: green;')
        CheckEmail = true;
    }
})

senha.addEventListener('keyup', ()=> { 
    if(senha.value.length <= 4){
        linhaSenha.setAttribute('style', 'color: red;')
        linhaSenha.innerHTML = '<strong>Senha muito curta, mínimo 5 caracteres</strong>'
        senha.setAttribute('style', 'border-color: red;')
        CheckSenha= false;
    }else{      
        linhaSenha.setAttribute('style', 'color: green;')
        linhaSenha.innerHTML = 'Senha'
        senha.setAttribute('style', 'border-color: green;')
        CheckSenha = true;
    }
});

confirmSenha.addEventListener('keyup', ()=> {
    if(senha.value != confirmSenha.value){
        linhaConfirmSenha.setAttribute('style', 'color: red;')
        linhaConfirmSenha.innerHTML = '<strong>Confirmar Senha *Senhas não coincidem</strong>'
        confirmSenha.setAttribute('style', 'border-color: red;')
        CheckConfirmSenha = false;
    }else{      
        linhaConfirmSenha.setAttribute('style', 'color: green;')
        linhaConfirmSenha.innerHTML = 'Confirmar Senha'
        confirmSenha.setAttribute('style', 'border-color: green;')
        CheckConfirmSenha = true;
    }
});

btn.addEventListener('click', () => {
    let inputSenha = document.querySelector('#senha');

    if (inputSenha.type === 'password') {
        inputSenha.type = 'text';
    } else {
        inputSenha.type = 'password';
    }
});

btnConfirm.addEventListener('click', () => {   
    let inputConfirmSenha = document.querySelector('#confirmSenha');

    if (inputConfirmSenha.type === 'password') {
        inputConfirmSenha.type = 'text';
    } else {
        inputConfirmSenha.type = 'password';
    }
});

function cadastrar(){
    if(CheckUsuario && CheckEmail && CheckSenha && CheckConfirmSenha){
        let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]');
        listaUser.push({
            usuario: usuario.value,
            email: email.value,
            senha: senha.value
        });

        localStorage.setItem('listaUser', JSON.stringify(listaUser));

        let novoUsuario = {
            usuario: usuario.value,
            email: email.value,
            senha: senha.value
        };

        fetch('http://localhost:5400/php/SigninGrava.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoUsuario)  // Envia apenas o novo usuário, não a lista inteira
        })
        .then(response => response.json())
        .then(data => {
            console.log('Dados enviados com sucesso:', data);
            if(data.response.status === "success"){
                msgError.innerHTML = '';
                msgError.setAttribute('style', 'display: none;');
                msgSucess.innerHTML = '<strong>Cadastrado usuário...</strong';
                msgSucess.setAttribute('style', 'display: block;');
                setTimeout(() => {
                    window.location.href = '../Pages/Votacao.html';
                    msgError.innerHTML = '';
                    msgError.style.display = 'none';
                    msgSucess.innerHTML = '';
                    msgSucess.style.display = 'none';
                }, 3000);
            }else if(data.response.status === "error_dois"){
                msgSucess.innerHTML = '';
                msgSucess.setAttribute('style', 'display: none;');
                msgError.setAttribute('style', 'display: block;');
                msgError.innerHTML = '<strong>Usuário já cadastrado, vá para a página de login</strong';
            }else if(data.response.status === "error_email"){
                msgSucess.innerHTML = '';
                msgSucess.setAttribute('style', 'display: none;');
                msgError.setAttribute('style', 'display: block;');
                msgError.innerHTML = '<strong>Email já cadastrado, insira outro válido</strong';

            }else if(data.response.status === "error_nome"){
                msgSucess.innerHTML = '';
                msgSucess.setAttribute('style', 'display: none;');
                msgError.setAttribute('style', 'display: block;');
                msgError.innerHTML = '<strong>Nome já cadastrado, insira nome completo</strong';
            }
        })
        .catch(error => {
            console.error('Erro ao enviar dados:', error);
        });      
    }else{
        msgSucess.innerHTML = '';
        msgSucess.setAttribute('style', 'display: none;');
        msgError.setAttribute('style', 'display: block;');
        msgError.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar</strong';
    }
}

