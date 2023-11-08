const checkData = {
    email: false,
    IdCandidato: false,
  };
  
  const Data = {
    email: '',
    IdCandidato: '',
  };

button = document.querySelector('#button');

let linhaEmail = document.querySelector('#Email');
let linhaIdCandidato = document.querySelector('#IdCandidato');

msgError = document.querySelector('#msgError');
msgSucess = document.querySelector('#msgSucess');

  document.getElementById('IdCandidato').addEventListener('input', function (e) {
    const IdCandidato = e.target.value;
    if (IdCandidato.length >= 2) {
      console.log('Número de candidato deve ter 1 caracter');
      checkData.IdCandidato = false;
    } else {
      Data.IdCandidato = IdCandidato;
      checkData.IdCandidato = true;
    }
    if (checkData.IdCandidato == true && checkData.senha == true) {
      button.removeAttribute('disabled');
    } else {
        button.setAttribute('disabled', 'disabled');
    }
    console.log(Data);
  });


    document.getElementById('Email').addEventListener('input', function (e) {  
        const email = e.target.value;
        if (email.length < 1 || email.length > 100) {
            console.log('O Email deve ter entre 1 e 100 caracteres');
            checkData.email = false;
            } else {
            //document.getElementById('erro-senha').style.display = 'none';
            Data.email = email;
            checkData.email = true;
            }
            if (checkData.IdCandidato == true && checkData.email == true) {
                button.removeAttribute('disabled');
            } else {
                button.setAttribute('disabled', 'disabled');
            }
        console.log(Data);
    });

function getDados() {
    fetch('../php/VotacaoConsulta.php')
    .then((response) => {
    if(response.status >= 200 && response.status < 300) {
        return response.json();
    }
    throw new Error(response.statusText);
    })
    .then((Data) => {
        // Acessa os numeros dos candidatos da tabela candidatos
        const IDCANDIDATO = Data.num_candidato;

        // Acessa os emails da tabela estudantes
        const EMAIL = Data.email;

        votar(EMAIL, IDCANDIDATO);
    })
    .catch((error) => {
    console.log(error);
    });
} 

function votar(EMAIL, IDCANDIDATO) {
    const email = e.target.value;
    const IdCandidato = e.target.value;
    let checkE = false;
    let checkI = false;

    let novoVoto = {
        email: email,
        IdCandidato: IdCandidato,
    };

    if(email == EMAIL){
        console.log('Email correto');
        linhaEmail.setAttribute('style', 'border-color: green;');
        checkE = true;
    } else {
        console.log('Email incorreto, use o que foi cadastrado');
        linhaEmail.setAttribute('style', 'border-color: red;');
        checkE = false;
    }

    if(IdCandidato == IDCANDIDATO){
        console.log('IdCandidato correto');
        linhaIdCandidato.setAttribute('style', 'border-color: red;');
        checkI = true;
    } else {
        console.log('IdCandidato incorreto, use o que está na página de candidatos');
        linhaIdCandidato.setAttribute('style', 'border-color: red;');
        checkI = false;
    }

    

    if (checkE == true && checkI == true) {
        fetch('../php/VotacaoGrava.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoVoto)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Dados enviados com sucesso:', data);
        })
        .catch(error => {
            console.error('Erro ao enviar dados:', error);
        });
        
        setTimeout(() => {
           window.location.href = '../Pages/Candidatos.html';
        }, 3000);
    } else {
        msgError.style.display = 'block';
        msgError.innerHTML = '<strong>Email ou Número do candidato estão errados</strong';
    }
}