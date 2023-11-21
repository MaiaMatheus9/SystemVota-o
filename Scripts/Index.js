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

let usuario = document.querySelector('#usuario');
let senha = document.querySelector('#senha');

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
        console.log('Usuário deve ter entre 1 e 105 caracteres');
        checkData.usuario = false;
    } else {
        Data.usuario = usuario;
        checkData.usuario = true;
    }
    enableButton();
    console.log(Data);
});

document.getElementById('senha').addEventListener('input', function (e) {
    const senha = e.target.value;
    if (senha.length < 1 || senha.length > 1024) {
        console.log('Senha deve ter entre 1 e 1024 caracteres');
        checkData.senha = false;
    } else {
        Data.senha = senha;
        checkData.senha = true;
    }
    enableButton();
    console.log(Data);
});

function enableButton() {
    if (checkData.usuario && checkData.senha) {
        button.removeAttribute('disabled');
    } else {
        button.setAttribute('disabled', 'disabled');
    }
}

function getStudents() {
    fetch('http://localhost:5400/php/IndexConsulta.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Usuario: Data.usuario }),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log("Esse é o Usuário no sucesso: ", Data.usuario);
             console.log("Valor da Sessão: ", data.response.session);
            console.log(data);
            if(data.response.status === "error_empty"){
                msgSucess.innerHTML = '';
                msgSucess.style.display = 'none';
                msgError.style.display = 'block';
                msgError.innerHTML = '<strong>Usuário inexistente</strong';
            } 
            logar(data.estudantes);
        })
        // .catch((error) => {
        //     console.log("Esse é o Usuário no erro: ", Data.usuario);
        //     console.error('Erro na requisição:', error);
        //     return error.text(); // Altere de .json() para .text()
        // })
        .catch((error) => {
            console.log("Esse é o Usuário no erro: ", Data.usuario);
            console.error('Erro na requisição:', error);
        
            if (error instanceof Response) {
                // Verifica se a resposta é um objeto Response
                return error.json().then((json) => {
                    console.log('JSON da resposta de erro:', json);
                    if (json && json.message) {
                        throw new Error(json.message);
                    } else {
                        throw new Error('Erro na requisição');
                    }
                }).catch((error) => {
                    console.error('Erro no tratamento da resposta de erro (json):', error);
                    throw new Error('Erro na requisição');
                });
            } else {
                console.error('Resposta de erro não é um objeto Response:', error);
                throw new Error('Erro na requisição');
            }
        })
}

function logar(estudantes) {
    if (Array.isArray(estudantes)) {
        const usuarioValido = estudantes.some(estudante => estudante.nome_estudante == usuario.value || estudante.email == usuario.value);
        const senhaValida = estudantes.some(estudante => estudante.senha == senha.value);

        if (usuarioValido && senhaValida) {                    
            let Usuario = Data.usuario;
            console.log('Usuario:', Usuario);

            console.log('Antes do fetch');

            fetch('http://localhost:5400/php/IndexConsulta.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Usuario })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Dados enviados com sucesso:', data);
                console.log("Valor da Sessão: ", data.response.session);

                if (data.response.status === "success") {
                    msgError.innerHTML = '';
                    msgError.style.display = 'none';
                    msgSucess.innerHTML = '<strong>Entrando...</strong';
                    msgSucess.style.display = 'block';

                    setTimeout(() => {
                        window.location.href = '../Pages/Votacao.html';
                        msgError.innerHTML = '';
                        msgError.style.display = 'none';
                        msgSucess.innerHTML = '';
                        msgSucess.style.display = 'none';
                    }, 3000);
                } else if (data.response.status === "error"){
                    msgSucess.innerHTML = '';
                    msgSucess.style.display = 'none';
                    msgError.style.display = 'block';
                    msgError.innerHTML = '<strong>Usuário/nome/email ou senha inválido</strong';
                }
            })
            .catch(error => {
                console.error('Erro ao enviar dados:', error);
            });

        } else {
            msgSucess.innerHTML = '';
            msgSucess.style.display = 'none';
            msgError.style.display = 'block';
            msgError.innerHTML = '<strong>Usuário/nome/email ou senha inválido</strong';
        }
    } else {
        msgSucess.innerHTML = '';
        msgSucess.style.display = 'none';
    }
}
    