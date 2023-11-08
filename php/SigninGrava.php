<?php
// Recebe os dados enviados via POST
$estudante = json_decode(file_get_contents("php://input"), true);

$usuario = $estudante['usuario'];
$email = $estudante['email'];
$senha = $estudante['senha'];

$servername = "localhost";
$username = "root";
//$password = "ifsp";
$password = "MatheusR9";
$dbname = "Eleicao";

// Criando a conexão
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Verificando a conexão
if (!$conn) {
    die("Conexão falhou: " . mysqli_connect_error());
}

// Insererindo os dados no banco de dados
$sql = "INSERT INTO estudantes (nome_estudante, email, senha) VALUES ('$usuario', '$email', '$senha')";
$result = $conn->query($sql);

// Fechando a conexão
$conn->close();

// Envia uma resposta para o JavaScript com um JSON
echo json_encode(['mensagem' => 'Dados inseridos com sucesso']);
?>