var camara;
let BrokerMQTT = 'broker.shiftr.io';
let PuertoMQTT = 80;
let ClienteIDMQTT = "ServerX";
let UsuarioMQTT = "ServerX2019";
let ContrasenaMQTT = "Exporical734";

client = new Paho.MQTT.Client(BrokerMQTT, PuertoMQTT, ClienteIDMQTT);

let textoTemperatura;
let textoHumedad;
let textoIndividuo;
let BotonEncender;
let BotonApagar;
let puedoenviar = true;
let BotonTomarFoto;

let CanvasDafaul;
// set callback handlers
client.onConnectionLost = MQTTPerder;
client.onMessageArrived = MQTTMensaje;

client.connect({
  onSuccess: CuandoConectadoMQTT,
  userName: UsuarioMQTT,
  password: ContrasenaMQTT
});

function MQTTPerder(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("MQTT Perdio coneccion Error:" + responseObject.errorMessage);
  }
}

function MQTTMensaje(message) {
  console.log("Mensaje recibido:" + message.payloadString + " tema:" + message.destinationName);

  if (message.destinationName == "SX/Sensor/Temperatura") {
    textoTemperatura.html("Temperatura: " + message.payloadString + "°C");
  } else if (message.destinationName == "SX/Sensor/Humedad") {
    textoHumedad.html("Humedad: " + message.payloadString + "%");
  } else if (message.destinationName == "SX/Sensor/Alarma") {
    textoIndividuo.html("Alarma: " + message.payloadString);
    if (message.payloadString == "1") {
      if (puedoenviar) {
        var tiempo = Date.now();
        puedoenviar = false;
        console.log(tiempo)
        NombreFoto = tiempo + '.jpg';
        save(NombreFoto); // save a specific canvas with a filenam
        setTimeout(saveimage, 3000);
        setTimeout(ResetiarFoto, 15000);
        console.log("Tomando Foto");
        //saveFrames("image", 'png', 1,1);
        ///saveCanvas(foto, 'myCanvas', 'jpg');
      }
    }
  }
}

function ResetiarFoto() {

  puedoenviar = true;
}


function CuandoConectadoMQTT() {
  console.log("MQTT Conectado");
  client.subscribe("SX/Sensor/Humedad");
  client.subscribe("SX/Sensor/Temperatura");
  client.subscribe("SX/Sensor/Alarma");

}

function setup() {
  createCanvas(640, 350);  //320*240
  Camara = createCapture(VIDEO);
  Camara.size(640, 350);   //320*240
  Camara.hide();


  createP('<h2><i class="fas fa-fan"></i> Control de Ventilador <i class="fas fa-fan"></i></h2>')

  let canvas2 = createDiv('')
  canvas2.id('canvas2')
  canvas2.style('width', '50%')
  canvas2.addClass('rounded bg-light pt-5 pb-4 d-flex justify-content-center align-items-center text-dark flex-column')

  var BotonEncender = createButton("Encender");
  BotonEncender.addClass('btn btn-success')
  BotonEncender.mousePressed(Encenderventilador)
  BotonEncender.parent(canvas2)

  var BotonApagar = createButton("Apagar");
  BotonApagar.addClass('btn btn-danger mt-3')
  BotonApagar.mousePressed(Apagarventilador)
  BotonApagar.parent(canvas2)

  let textos = createDiv('')
  textos.addClass('d-block')
  textos.parent(canvas2)

  textoHumedad = createP('<i class="fas fa-tint"></i> Humedad:--');
  textoHumedad.addClass('mt-4 text-center')
  textoHumedad.parent(textos)

  textoTemperatura = createP('<i class="fas fa-thermometer-quarter"></i> Temperatura:--');
  textoTemperatura.addClass('mt-4 text-center')
  textoTemperatura.parent(textos)
  
  textoIndividuo = createP('<i class="fas fa-exclamation-triangle"></i> Alerta:--');
  textoIndividuo.addClass('mt-4 text-center')
  textoIndividuo.parent(textos)

  BotonTomarFoto = select('#screen');//htm
  console.log(BotonTomarFoto);
  BotonTomarFoto.mousePressed(PrecionarBoton);//htm
  
  /*
  createP("Control ventilador")

  BotonTomarFoto = select('#screen');//htm
  //console.log(BotonEncender);
  BotonTomarFoto.mousePressed(PrecionarBoton);//htm

  BotonEncender = select('#on')
  BotonEncender.mousePressed(Encenderventilador);//htm

  BotonApagar = select('#off')
  BotonApagar.mousePressed(Apagarventilador);//htm

  //var BotonApagar = createButton("Apagar"); //los antiguos creados por js
  //BotonApagar.mousePressed(Apagarventilador); //los antiguos creados por js
textoHumedad = select('#TextoTemperatura'); //htm
textoTemperatura = select('#TextoTemperatura');//htm
textoIndividuo = select('#TextoIndividuo');//htm


   //textos de alertas js
  /*
  textoHumedad = createP('Humedad:--');//los antiguos creados por js
  textoTemperatura = createP('Temperatura:--');//los antiguos creados por js
  textoIndividuo = createP('Alerta:--');//los antiguos creados por js
  */
  


}

let NombreFoto;

function PrecionarBoton() {
  console.log("Se preciono boton");
  // var canvas1 = document.getElementById("defaultCanvas0");
  // var image = canvas1.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
  // window.location.href=image; // it will save locally

  var tiempo = Date.now();
  console.log(tiempo)

  NombreFoto = tiempo + '.jpg';
  save(NombreFoto); // save a specific canvas with a filename

  setTimeout(saveimage, 3000);

  //  console.log(canvas1);

}

function saveimage() {
  var message = new Paho.MQTT.Message(NombreFoto);
  message.destinationName = "SX/Camara/Alerta";
  client.send(message);
}

function draw() {
  image(Camara, 0, 0, 640, 350); //320*240
}

function Encenderventilador() {
  var message = new Paho.MQTT.Message('1');
  message.destinationName = "SX/ventilador/mensaje";
  client.send(message);

}

function Apagarventilador() {
  var message = new Paho.MQTT.Message('0');
  message.destinationName = "SX/ventilador/mensaje";
  client.send(message);

}
