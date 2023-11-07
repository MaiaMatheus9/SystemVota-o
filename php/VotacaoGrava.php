<?php
ini_set("display_errors", 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

echo '<pre>Inicio da script PHP</pre>';

$IdCandidato = $_GET['IdCandidato'];
$Email = $_GET['Email'];

$hostname = "localhost"; 
$user = "root";
$password = "MatheusR9";
$database = "Eleicao";

$conn = mysqli_connect($hostname, $user, $password, $database);

if (!$conn) {
    die("Conexão falhou: " . mysqli_connect_error());
}
echo "Conexão feita com sucesso";

$query = "insert into votantes (num_candidato, email) values ('$IdCandidato', '$Email')";

$res = mysqli_query($conn, $query);
if($res){
    echo '<h2>Voto incluído com sucesso!!!</h2>';
} else {
    echo '<h2>Voto não incluido!!!</h2>';
    var_dump(mysqli_error($conn));
}

// Close the connection
mysqli_close($conn);
header('Location: Pages/Results.html');
exit();


?>