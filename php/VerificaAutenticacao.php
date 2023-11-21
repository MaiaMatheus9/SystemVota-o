<?php
ini_set("display_errors", 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();

if (!isset($_SESSION['Usuario'])) {
    echo json_encode(array("status" => "error", "message" => "Faça login para continuar."));
    header("location: ../Index.html");
    exit();
}

$emailAutenticado = $_SESSION['Usuario'];

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

$query = "SELECT * FROM votantes";
$results = mysqli_query($conn, $query);

$rows = [];
while ($row = $results->fetch_assoc()) {
    $rows[] = $row;
}

$error = false;

foreach ($rows as $row) {
    if ($row['email'] == $emailAutenticado) {
        $error = true;
    }
}

if ($error) {
    $response = array("status" => "error", "message" => "Email já votou.");
} else {
    $response = array("status" => "success", "message" => "Email ainda não votou.");
}
echo json_encode(array("status" => "sucess", "emailAutenticado" => $_SESSION['Usuario'], "Response" => $response));
?>