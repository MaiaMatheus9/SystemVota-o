<?php
// header("Access-Control-Allow-Origin: http://127.0.0.1:5500"); // Professor, mude de acordo com o seu ambiente de desenvolvimento
ini_set("display_errors", 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
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

$query = "SELECT * FROM estudantes";
$results = mysqli_query($conn, $query);

$rows = [];
while ($row = $results->fetch_assoc()) {
    $rows[] = $row;
}

$errorDois = false;
$errorNome = false;
$errorEmail = false;

foreach ($rows as $row) {
    if ($row['nome_estudante'] == $usuario && $row['email'] == $email) {
        $errorDois = true;
    } elseif ($row['nome_estudante'] == $usuario) {
        $errorNome = true;
    } elseif ($row['email'] == $email) {
        $errorEmail = true;
    }
}

if ($errorDois) {
    $response = array("status" => "error_dois", "message" => "Nome e email já cadastrados, por favor, vá para a área de login.", "session" => null);
} elseif ($errorNome) {
    $response = array("status" => "error_nome", "message" => "Nome já cadastrado, por favor digite nome completo.", "session" => null);
} elseif ($errorEmail) {
    $response = array("status" => "error_email", "message" => "Email já cadastrado, por favor digite outro.", "session" => null);
} else {
    $response = array("status" => "success", "message" => "Cadastro bem-sucedido!");
}

// Insererindo os dados no banco de dados
if($response['status'] == "success"){
    $sql = "INSERT INTO estudantes (nome_estudante, email, senha) VALUES ('$usuario', '$email', '$senha')";
    $result = $conn->query($sql);

    session_start();
    if (!empty($email)) 
        $_SESSION['Usuario'] = $email;

    error_log("Valor da sessão: " . $_SESSION['Usuario']);
}
echo json_encode(array("response" => $response));

// Fechando a conexão
$conn->close();

// Envia uma resposta para o JavaScript com um JSON
// echo json_encode(array("estudantes" => $rows, "response" => $response));
?>