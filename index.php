
<?php
session_start(); 	
$varsesion = $_SESSION['usuario'];

if ($varsesion == null || $varsesion = '') {
    header('location: http://localhost/sitios%20web/login.php'); 

  //header(location: http://localhost/sitios%20web/login.php);
      die();

}

	?>

<html>



<!-- hojas de estilo -->

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
  integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
<link rel="stylesheet" href="style.css">

<head>
	


	<!-- librerias p5 y njs -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/p5.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/addons/p5.dom.min.js"></script>
  <script src="https://unpkg.com/ml5@0.2.1/dist/ml5.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.js" type="text/javascript"></script>
  
<!-- Bootstrap -->
  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
    integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
    crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
    integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
    crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
    integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
    crossorigin="anonymous"></script>
  <script src="https://kit.fontawesome.com/3fd0b0b587.js" crossorigin="anonymous"></script>





  <!-- llamada al archivo js -->
  <script src="sketch.js"></script>
</head>


<body>

<body class="bg-dark text-white">
  <nav class="navbar navbar-dark bg-dark">
    <h3 class="text-right w-100">
      <!-- Al <a> le podes poner el click y llamar una funcion, ese seria como el boton -->
      <a onclick="location.href='cerrarsesion.php'" style="cursor: pointer;">
        Server2019x <i class="fas fa-user-circle"></i>
      </a>
    </h3>
  </nav>
  <div id="contenido"></div>
  
	<input type="button" value="Tomar foto" id="screen">

<!--
	//lo que estaba antes
<button onclick="location.href='cerrarsesion.php'">  Cerrar sesion</button>
<input type="button" value="Tomar foto" id="screen">
<input type="button" value="Encender" id="on">
<input type="button" value="Apagar" id="off">
<p id="TextoTemperatura">Temperatura:--</p>
<p id="TextoHumedad">Humedad:--</p>
<p id="TextoIndividuo">Alerta:--</p>
-->
</body>

</html>
