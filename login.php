<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>Login Server X</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'>
<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/typicons/2.0.9/typicons.min.css'>
<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css'>
<link rel="stylesheet" href="./style.css">
</head>
<body>
<?php
$conexion=mysqli_connect("localhost", "root", "");
?>

<!-- partial:index.partial.html -->
<body id="particles-js"></body>
<div class="animated bounceInDown">
  <div class="container">
    <span class="error animated tada" id="msg"></span>
    
    <form action="validar.php" name="form1"  method="post" class="box" >
      <h4>Administrador <span>Server X</span></h4>
      <h5>Iniciar sesión en su cuenta
      </h5>
        
        <input type="text" name="email" placeholder="Nombre usuario" autocomplete="off">
        <i class="typcn typcn-eye" id="eye"></i>
        <input type="password" name="password" placeholder="Contraseña" id="pwd" autocomplete="off">
        <label>
          
         

        </label>
        
        <input type="submit" value="Iniciar Sesion" class="btn1">
      </form>
       
  </div> 
       
</div>
<!-- partial -->
  <script src='https://cldup.com/S6Ptkwu_qA.js'></script>
<script  src="./script.js"></script>

</body>
</html>