<?php
// header("Access-Control-Allow-Origin: http://127.0.0.1:5500"); // Professor, mude de acordo com o seu ambiente de desenvolvimento
ini_set("display_errors", 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Usando json_decode para obter os dados do corpo da solicitação
$data = json_decode(file_get_contents("php://input"), true);

session_start();

// Verifica se as chaves existem no JSON
if (isset($data['IdCandidato']) && isset($data['Email'])) {
    $IdCandidato = $data['IdCandidato'];
    $Email = $data['Email'];

    $hostname = "localhost"; 
    $user = "root";
    $password = "MatheusR9";
    $database = "Eleicao";

    $conn = mysqli_connect($hostname, $user, $password, $database);

    if (!$conn) {
        die(json_encode(array("status" => "error", "message" => "Conexão falhou: " . mysqli_connect_error())));
    }

    $checkQuery = "SELECT * FROM votantes WHERE email = '$Email'";
    $checkResult = mysqli_query($conn, $checkQuery);

    if (mysqli_num_rows($checkResult) > 0) {
        // O email já votou
        echo json_encode(array("status" => "error", "message" => "Email já votou."));
        exit(); // Encerra o script aqui para evitar a inserção duplicada
    }

    // O email ainda não votou, continue com a inserção na tabela votantes
    $insertQuery = "INSERT INTO votantes (num_candidato, email) VALUES ('$IdCandidato', '$Email')";
    $insertResult = mysqli_query($conn, $insertQuery);

    if ($insertResult) {
        echo json_encode(array("status" => "success", "message" => "Voto incluído com sucesso!!!"));
    } else {
        echo json_encode(array("status" => "error", "message" => "Erro ao incluir voto."));
    }

    // Fecha a conexão
    mysqli_close($conn);
    exit();
} else {
    // Se as chaves não existirem, retorna um erro JSON
    echo json_encode(array("status" => "error", "message" => "Chaves IdCandidato e/ou Email ausentes no JSON."));
    exit();
}
?>