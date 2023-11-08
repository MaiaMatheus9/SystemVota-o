<?php
$servername = "localhost";
$username = "root";
//$password = "ifsp";
$password = "MatheusR9";
$dbname = "Eleicao";

// Criando a conexão
$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
    die("Conexão falhou: " . mysqli_connect_error());
}

// Prepara o numero do candidato na tabela candidatos para envio como JSON
// Consulta para a primeira tabela
$queryNumCandidato = mysqli_query($conn, "SELECT num_candidato FROM candidatos");
$resultadoNumCandidato = mysqli_fetch_assoc($queryNumCandidato);

// Prepara o email da tabela estudantes para envio como JSON
// Consulta para a primeira tabela
$queryEmail = mysqli_query($conn, "SELECT email FROM estudantes");
$resultadoEmail= mysqli_fetch_assoc($queryEmail);

// Fecha a conexão
$conn->close();

// Envia os dados como JSON
//header('Content-Type: application/json');
echo json_encode(array("num_candidato" => $resultadoNumCandidato, "email" => $resultadoEmail));
?>