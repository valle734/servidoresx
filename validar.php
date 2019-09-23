<?php  
$email=$_POST['email'];
$password=md5($_POST['password']);

//conectar a la base de datos 
$conexion=mysqli_connect("localhost", "root", "", "sxdb");
$consulta="SELECT * FROM sxusuarios where usuario='$email' and clave='$password'";
$resultado=mysqli_query($conexion, $consulta);

$filas=mysqli_num_rows($resultado);
 
 if ($filas>0) {
 	session_start();
 	$_SESSION['usuario'] = $email;
 	header('location: http://localhost/sitios%20web/index.php');
 }

 else {
 	header('location: http://localhost/sitios%20web/login.php');
 }

 mysqli_free_result($resultado);
 mysqli_close($conexion); 



 ?>