const checkData = {
    email: false,
    IdCandidato: false,
};
  
const Data = {
    email: '',
    IdCandidato: '',
};

fetch('http://localhost:5400/php/VerificaAutenticacao.php')
    .then((response) => {
        if (response.status >= 200 && response.status < 300) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then((data) => {
        if (data.status === "error") {
            console.log('Não autenticado:', data.message);
            alert("Você não está autenticado! Faça o login para votar");
            window.location.href = '../Pages/Login.html';
        } else {
            // console.log('Autenticado');
            // document.getElementById('Email').value = data.emailAutenticado;
            // Data.email = data.emailAutenticado;
            // checkData.email = true;
            // console.log(Data.email, "Esse é o email que está no Data");

            console.log('Autenticado');
            
            // Certifique-se de que data.emailAutenticado existe
            if (data.emailAutenticado) {
                document.getElementById('Email').value = data.emailAutenticado;
                Data.email = data.emailAutenticado;
                checkData.email = true;
                console.log('Email no Data:', Data.email);

                if(data.Response.status === "error"){
                    console.log('Usuário já votou', data.message);
                    alert("Você já votou! Acompanhe os resultados na página de candidatos");
                    window.location.href = '../Pages/Results.html';
                }
            }
        }
    })
    .catch((error) => {
        console.log(error);
});

button = document.querySelector('#button');

let linhaEmail = document.querySelector('#Email');
let linhaIdCandidato = document.querySelector('#IdCandidato');

msgError = document.querySelector('#msgError');
msgSucess = document.querySelector('#msgSucess');

document.getElementById('IdCandidato').addEventListener('input', function (e) {
    const IdCandidato = e.target.value;

    let IdCandidatoString = IdCandidato.toString();

    if (IdCandidatoString.length !== 1) {
      console.log('Número de candidato deve ter 1 caracter');
      checkData.IdCandidato = false;
    } else {
      Data.IdCandidato = IdCandidato;
      checkData.IdCandidato = true;
    }

    console.log("checkData.IdCandidato:", checkData.IdCandidato);
    console.log("checkData.email:", checkData.email);
    if (checkData.IdCandidato == true && checkData.email == true) {
      button.removeAttribute('disabled');
    } else {
        button.setAttribute('disabled', 'disabled');
        console.log('Botão desabilitado');
    }
    console.log(Data);
});

function getDados() {
    fetch('http://localhost:5400/php/VotacaoConsulta.php')
    .then((response) => {
        if (response.status >= 200 && response.status < 300) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then((DATA) => {
        console.log('Resposta do servidor:', DATA);
        const IDCANDIDATO = DATA.num_candidato;
        console.log(IDCANDIDATO);
        votar(IDCANDIDATO);
    })
    .catch((error) => {
        console.log('Erro na requisição:', error);
    });
}

function votar(IDCANDIDATO) {
    const email = Data.email;
    const IdCandidato = Data.IdCandidato;
    let checkI = false;

    console.log(Data.IdCandidato, Data.email + 'Esses são os valores que estão no Data');
    console.log(IDCANDIDATO + 'Esses são os valores que estão no banco');

    // if(email == EMAIL){
    //     console.log('Email correto');
    //     linhaEmail.setAttribute('style', 'border-color: green;');
    //     checkE = true;
    // } else {
    //     console.log('Email incorreto, use o que foi cadastrado');
    //     linhaEmail.setAttribute('style', 'border-color: red;');
    //     checkE = false;
    // }

    // if(IdCandidato == IDCANDIDATO){
    //     console.log('IdCandidato correto');
    //     linhaIdCandidato.setAttribute('style', 'border-color: red;');
    //     checkI = true;
    // } else {
    //     console.log('IdCandidato incorreto, use o que está na página de candidatos');
    //     linhaIdCandidato.setAttribute('style', 'border-color: red;');
    //     checkI = false;
    // }

    // console.log(checkE, checkI);

    // Itera sobre os emails
    // for (const emailDB of Object.values(EMAIL)) {
    //     if (email === emailDB) {
    //         console.log('Email correto');
    //         linhaEmail.setAttribute('style', 'border-color: green;');
    //         checkE = true;
    //         break;
    //     }
    // }

    for (const numCandidatoDB of Object.values(IDCANDIDATO)) {
        if (IdCandidato == numCandidatoDB) {
            console.log('IdCandidato correto');
            linhaIdCandidato.setAttribute('style', 'border-color: green;');
            linhaEmail.setAttribute('style', 'border-color: green;');
            checkI = true;
            break; 
        }else{
            console.log('IdCandidato incorreto, use o que está na página de candidatos');
            linhaIdCandidato.setAttribute('style', 'border-color: red;');
            linhaEmail.setAttribute('style', 'border-color: red;');
            msgSucess.style.display = 'none';
            msgSucess.innerHTML = '';
            msgError.style.display = 'block';
            msgError.innerHTML = '<strong>Número do candidato está errado</strong';
            checkI = false;
        }
    }



    if (checkI == true) {
        let novoVoto = {
            IdCandidato: IdCandidato,
            Email: email,
        };

        fetch('http://localhost:5400/php/VotacaoGrava.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoVoto)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "error") {
                setTimeout(() => {
                    alert("O Email inserido já votou! Acompanhe os resultados na página de candidatos");
                    window.location.href = '../Pages/Results.html';
                 }, 1000);
            } else {
                console.log('Voto registrado com sucesso:', data.message);
                setTimeout(() => {
                    alert("Voto incluído com sucesso! Acompanhe os resultados na página de candidatos");
                    window.location.href = '../Pages/Results.html';
                 }, 1000);
            }
        })
        .catch(error => {
            console.error('Erro ao enviar dados:', error);
        });
    } else {
        msgError.style.display = 'block';
        msgError.innerHTML = '<strong>Número do candidato está errados</strong';
    }
}