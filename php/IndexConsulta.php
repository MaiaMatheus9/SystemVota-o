<?php
$servername = "localhost";
$username = "root";
$password = "MatheusR9";
$dbname = "Eleicao";

// Criando a conexão
$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
    die("Conexão falhou: " . mysqli_connect_error());
}

$query = "SELECT * FROM estudantes";
$result = mysqli_query($conn, $query);

// Prepara os resultados para envio como JSON
$rows = [];
while ($row = $result->fetch_assoc()) {
    $rows[] = $row;
}

// Fecha a conexão
$conn->close();

// Envia os dados como JSON
echo json_encode($rows);
?>