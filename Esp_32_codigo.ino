#ifdef ARDUINO_ARCH_ESP32
#include <WiFi.h>
#include <WiFiMulti.h>
WiFiMulti wifiMulti;
#else
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
ESP8266WiFiMulti wifiMulti;
#endif

#include <MQTT.h>
#include "DHT.h"
#define DHTTYPE DHT11
int trigPin = 13;    // Trigger
int echoPin = 12;    // Echo
long duration, Distancia;
int EstadoAlarma = 0;
int EstadoAnterior = 0;
const char ssid1[] = "ALSW";
const char pass1[] = "25264897";
const char ssid2[] = "Valle Network";
const char pass2[] = "Mercury734";
const char ssid3[] = "Casaotra";
const char pass3[] = "Quito22$";

WiFiClient net;
MQTTClient client;
float temperatura;
float humedad;
float distancia = 50;
long tiempo = 0;


int releventilador = 14;
uint8_t sensorh = 4;

DHT dht(sensorh, DHTTYPE);

void setup () {
  Serial.begin(115200);
  pinMode(sensorh, INPUT);
  pinMode(releventilador, OUTPUT);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  dht.begin();

  Serial.println("iniciando sistema");
  WiFi.mode(WIFI_STA);//Cambiar modo del Wi-Fi
  delay(100);
  wifiMulti.addAP(ssid1, pass1);
  wifiMulti.addAP(ssid2, pass2);
  wifiMulti.addAP(ssid3, pass3);
Serial.println("wifi configurado");
  client.begin("broker.shiftr.io", net);
  client.onMessage(RecibirMQTT);
  Conectar();

}

void loop() {
  client.loop();
  delay(10);

  if (!client.connected()) {
    Conectar();
  }

  if (tiempo + 1000 < millis()) {
    tiempo = millis();
    humedad = dht.readHumidity();
    temperatura = dht.readTemperature();
    String mensajeHumedad = String(humedad);
    String mensajeTemperatura = String(temperatura);
    client.publish("SX/Sensor/Humedad", mensajeHumedad);
    client.publish("SX/Sensor/Temperatura", mensajeTemperatura);
    Serial.print("humedad:");
    Serial.println(humedad);
    Serial.print("temperatura:");
    Serial.println(temperatura);
  }
  digitalWrite(trigPin, LOW);
  delayMicroseconds(5);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  pinMode(echoPin, INPUT);
  duration = pulseIn(echoPin, HIGH);
  Distancia = (duration / 2) / 29.1;   // Divide by 29.1 or multiply by 0.0343
Serial.println (distancia);
  if (Distancia < 100) {
    EstadoAlarma = 1;
  } else {
    EstadoAlarma = 0;
  }
  if (EstadoAlarma != EstadoAnterior ) {
    EstadoAnterior = EstadoAlarma;
    Serial.print("Sensor de alarma:");
    Serial.println (EstadoAlarma);
    String mensajeAlarma = String(EstadoAlarma);
    client.publish("SX/Sensor/Alarma", mensajeAlarma);
  }
}

void Conectar() {
  Serial.print("Conectando a Wifi...");
  while (wifiMulti.run() != WL_CONNECTED) {
    Serial.print(".");
    delay(1000);
  }
  Serial.print("\nConectado a MQTT...");

  while (!client.connect("EspMonitor", "ServerX2019", "Exporical734")) {
    Serial.print("*");
    delay(1000);
  }

  Serial.println("\nConectado MQTT!");

  client.subscribe("/SX/ventilador/mensaje");

}
void RecibirMQTT(String &topic, String &payload) {
  Serial.println("Recivio: " + topic + " - " + payload);
  //if (payload == "Encender") {

}
