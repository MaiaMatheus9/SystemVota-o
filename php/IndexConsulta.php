<?php
// header("Access-Control-Allow-Origin: http://127.0.0.1:5500"); // Professor, mude de acordo com o seu ambiente de desenvolvimento
ini_set("display_errors", 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
error_log("Chegou na IndexConsulta.php");

session_start(); // Inicia a sessão

$json = file_get_contents('php://input');
$data = json_decode($json, true);
error_log(json_encode($data));
$usuario = isset($data['Usuario']) ? $data['Usuario'] : null;
error_log("Valor do usuário: " . $usuario);

$servername = "localhost";
$username = "root";
$password = "MatheusR9";
$dbname = "Eleicao";

// Criando a conexão
$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
    die("Conexão falhou: " . mysqli_connect_error());
}

header('Content-Type: application/json'); // Movido para o início

$query = "SELECT * FROM estudantes";
$result = mysqli_query($conn, $query);

$rows = [];
while ($row = $result->fetch_assoc()) {
    $rows[] = $row;
}

if (empty($rows)) {
    $response = array("status" => "error_empty", "message" => "Nenhum estudante encontrado.", "session" => null);
    echo json_encode(array("response" => $response));
    $conn->close();
    exit();
    return;
}

$email = '';

foreach ($rows as $row) {
    if ($row['nome_estudante'] == $usuario || $row['email'] == $usuario) {
        $email = $row['email'];
        break;
    }
}

error_log("Email encontrado: " . $email);

if (!empty($email)) {
    $_SESSION['Usuario'] = $email;
    $response = array("status" => "success", "message" => "Login bem-sucedido!", "session" => $_SESSION['Usuario']);
    error_log("Valor da sessão: " . $_SESSION['Usuario']);
} else {
    $response = array("status" => "error", "message" => "Usuário ou senha inválidos.", "session" => null);
}

echo json_encode(array("estudantes" => $rows, "response" => $response));
$conn->close();
?>
