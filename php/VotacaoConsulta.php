<?php
// header("Access-Control-Allow-Origin: http://127.0.0.1:5500"); // Professor, mude de acordo com o seu ambiente de desenvolvimento
ini_set("display_errors", 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

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

session_start();

if (!isset($_SESSION['Usuario'])) {
    echo json_encode(array("status" => "error", "message" => "Faça login para continuar."));
    header("location: ../Index.html");
    exit();
}

$emailAutenticado = $_SESSION['Usuario'];

// Prepara o numero do candidato na tabela candidatos para envio como JSON
// Consulta para a primeira tabela
$queryNumCandidato = mysqli_query($conn, "SELECT num_candidato FROM candidatos");
$resultadoNumCandidato = array();

while ($row = mysqli_fetch_assoc($queryNumCandidato)) {
    $resultadoNumCandidato[] = $row['num_candidato'];
}

// Retorna os resultados como JSON
echo json_encode(array("num_candidato" => $resultadoNumCandidato, "emailAutenticado" => $_SESSION['Usuario']));

// Fecha a conexão
mysqli_close($conn);
?>
